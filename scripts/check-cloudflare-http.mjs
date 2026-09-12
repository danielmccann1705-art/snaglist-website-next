// Real HTTP acceptance against an already-running LOCAL Wrangler server.
// node scripts/check-cloudflare-http.mjs [http://127.0.0.1:5188] [report.json]
// Alternatively: CLOUDFLARE_LOCAL_BASE_URL / CLOUDFLARE_HTTP_REPORT.
// No redirects are followed, browser JavaScript is never executed, and every
// network connection is constrained to the validated loopback address below.
import http from "node:http";
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createHash } from "node:crypto";
import { pages, ORIGIN } from "../app/content/pages.ts";

const repo = fileURLToPath(new URL("../", import.meta.url));
const build = path.join(repo, "build/client");
const base = new URL(process.argv[2] || process.env.CLOUDFLARE_LOCAL_BASE_URL || "http://127.0.0.1:5188");
if (base.protocol !== "http:" || !["127.0.0.1", "localhost", "[::1]"].includes(base.hostname) ||
    base.username || base.password || base.pathname !== "/" || base.search || base.hash) {
  throw new Error("Acceptance base must be an HTTP loopback origin without credentials, path or query.");
}
const output = path.resolve(process.argv[3] || process.env.CLOUDFLARE_HTTP_REPORT ||
  path.join(repo, "../../../outputs/website-release/LOCAL-CLOUDFLARE-HTTP.json"));
const startedAt = new Date().toISOString();
const checks = [], observations = [];
let requestCount = 0;
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const requireThat = (condition, message) => { if (!condition) throw new Error(message); };

async function snapshot(directory, prefix = "") {
  const result = {};
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const name = prefix + entry.name, file = path.join(directory, entry.name);
    if (entry.isDirectory()) Object.assign(result, await snapshot(file, name + "/"));
    else {
      requireThat(entry.isFile(), "Build contains an unsupported filesystem entry.");
      result[name] = digest(await readFile(file));
    }
  }
  return result;
}

function request(urlPath, { method = "GET", host } = {}) {
  requireThat(urlPath.startsWith("/") && !urlPath.startsWith("//"), "HTTP test path must be origin-relative.");
  requestCount += 1;
  return new Promise((resolve, reject) => {
    // Host tests exercise the same local Worker without resolving/contacting that
    // domain. No upstream, backend or live-domain request is made by this script.
    const req = http.request({ hostname: base.hostname.replace(/^\[|\]$/g, ""), port: base.port || 80,
      path: urlPath, method, headers: host ? { Host: host } : {}, agent: false }, (res) => {
      const chunks = []; let bytes = 0;
      res.on("data", (chunk) => {
        bytes += chunk.length;
        if (bytes > 8 * 1024 * 1024) { req.destroy(new Error("Response exceeded the 8 MiB acceptance limit.")); return; }
        chunks.push(chunk);
      });
      res.on("end", () => { clearTimeout(timer); resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }); });
      res.on("error", () => { clearTimeout(timer); reject(new Error("Local HTTP response interrupted.")); });
    });
    const timer = setTimeout(() => req.destroy(new Error("Local HTTP request timed out.")), 10_000);
    req.on("error", (error) => { clearTimeout(timer); reject(new Error(error.code ? "Local HTTP connection failed: " + error.code : "Local HTTP request failed or exceeded its bound.")); });
    req.end();
  });
}

async function check(name, operation) {
  try { const facts = await operation(); checks.push({ name, passed: true, ...(facts ? { facts } : {}) }); }
  catch (error) { checks.push({ name, passed: false, reason: error.message }); }
}

function noPrivateCaching(response) {
  requireThat(response.headers["cache-control"] === "private, no-store", "Private browser cache policy is missing.");
  requireThat(response.headers["cdn-cache-control"] === "no-store", "Private CDN cache policy is missing.");
  requireThat(response.headers["cloudflare-cdn-cache-control"] === "no-store", "Private Cloudflare cache policy is missing.");
  requireThat(/noindex/.test(response.headers["x-robots-tag"] || ""), "Private noindex header is missing.");
  requireThat(response.headers["referrer-policy"] === "no-referrer", "Private referrer policy is missing.");
  requireThat(!response.headers.etag && !response.headers["last-modified"], "Private response exposes cache validators.");
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g)]
    .map(([, key, double, single]) => [key.toLowerCase(), decode(double ?? single)]));
}
function decode(text) {
  const names = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
  return text.replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, name) => {
    if (name[0] !== "#") return names[name.toLowerCase()] || entity;
    return String.fromCodePoint(name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : Number(name.slice(1)));
  });
}
const plainText = (html) => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

const before = await snapshot(build);
const manifestBytes = await readFile(path.join(build, "route-manifest.json"));
const manifest = JSON.parse(manifestBytes);
await check("release manifest has all 27 current public pages and the approved canonical origin", async () => {
  requireThat(manifest.pages.length === 27 && Object.keys(pages).length === 27, "Expected 27 public pages.");
  requireThat(JSON.stringify([...manifest.pages].sort()) === JSON.stringify(Object.keys(pages).sort()), "Manifest and current page specification differ.");
  requireThat(manifest.origin === "https://usesnaglist.com" && ORIGIN === manifest.origin, "Canonical origin differs from the approved domain.");
  return { page_count: manifest.pages.length, built_indexable: manifest.indexable, origin: manifest.origin };
});

// Stop after one failed connection, with a useful report, rather than retrying
// every case when a different agent owns the local listener namespace.
let reachable = false;
await check("local Wrangler listener responds", async () => {
  const response = await request("/");
  requireThat(response.status === 200, "Local root did not return HTTP 200.");
  reachable = true;
  return { status: response.status };
});

if (reachable) {
  for (const page of manifest.pages) await check("public document " + page, async () => {
    const response = await request(page), html = response.body.toString("utf8");
    requireThat(response.status === 200, "Public document did not return HTTP 200.");
    requireThat(/^text\/html\b/.test(response.headers["content-type"] || ""), "Public document has the wrong media type.");
    const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => plainText(m[1]));
    const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/g)].map((m) => plainText(m[1]));
    const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attributes(m[0]));
    const canonicals = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attributes(m[0])).filter((a) => a.rel === "canonical");
    const descriptions = metas.filter((a) => a.name === "description");
    requireThat(h1s.length === 1 && h1s[0].length > 0, "Public document must contain one useful H1.");
    requireThat(titles.length === 1 && titles[0] === pages[page].title, "Public title does not match its current page specification.");
    requireThat(descriptions.length === 1 && descriptions[0].content === pages[page].description, "Public description does not match its current page specification.");
    requireThat(canonicals.length === 1 && canonicals[0].href === manifest.origin + page, "Public canonical is missing, duplicated or incorrect.");
    requireThat(/<html[^>]*lang="en-GB"/.test(html), "UK language marker is missing.");
    requireThat(/noindex/.test(response.headers["x-robots-tag"] || ""), "Local preview response must be noindex.");
    if (!manifest.indexable) requireThat(metas.some((a) => a.name === "robots" && /noindex/.test(a.content)), "Preview HTML must remain noindex.");
    const file = page === "/" ? "index.html" : page.slice(1) + "/index.html";
    requireThat(digest(response.body) === before[file], "HTTP document bytes do not match this build snapshot.");
    const facts = { path: page, status: response.status, h1: h1s[0], title: titles[0], canonical: canonicals[0].href, sha256: digest(response.body) };
    observations.push({ ...facts, description: descriptions[0].content });
    return facts;
  });

  await check("all 27 H1s, titles, descriptions and canonicals are unique", async () => {
    requireThat(observations.length === 27, "Not every page passed document inspection.");
    for (const key of ["h1", "title", "description", "canonical"]) requireThat(new Set(observations.map((p) => p[key])).size === 27, "Public " + key + " values are duplicated.");
    return { count: observations.length };
  });

  for (const [source, expected] of [["/magic-links", "/contractor-link"], ["/magic-links/", "/contractor-link"],
    ["/pricing/", "/pricing"], ["/index.html", "/"], ["/pricing/index.html", "/pricing"]]) {
    await check("local public redirect " + source, async () => {
      const response = await request(source + "?code=SYNTHETIC-NOT-A-REAL-CODE");
      requireThat(response.status === 308, "Public redirect must use HTTP 308.");
      requireThat(response.headers.location === base.origin + expected, "Public redirect is not a final query-free local destination.");
      return { status: response.status, final_path: expected, query_removed: true };
    });
  }
  for (const [host, source, expected] of [["snaglist.dev", "/magic-links/", "/contractor-link"],
    ["www.snaglist.dev", "/pricing/", "/pricing"], ["www.usesnaglist.com", "/", "/"]]) {
    await check("local Host-header canonical redirect for " + host, async () => {
      const response = await request(source, { host });
      requireThat(response.status === 308 && response.headers.location === manifest.origin + expected, "Host-header request did not redirect directly to the canonical public page.");
      return { host_header: host, status: response.status, redirects_followed: 0 };
    });
  }

  for (const urlPath of ["/missing-release-page", "/pricing/extra", "/magic-links/extra", "/route-manifest.json", "/__spa-fallback.html", "/404.html"]) {
    await check("real unknown/internal 404 " + urlPath, async () => {
      const response = await request(urlPath);
      requireThat(response.status === 404 && !response.headers.location, "Unknown/internal URL must be a non-redirecting 404.");
      noPrivateCaching(response);
      return { status: response.status };
    });
  }
  for (const urlPath of ["/auth/callback", "/api/status", "/m", "/m/"]) await check("private incomplete/unsupported route " + urlPath, async () => {
    const response = await request(urlPath + "?code=SYNTHETIC-NOT-A-REAL-CODE", { host: "snaglist.dev" });
    requireThat(response.status === 404 && !response.headers.location, "Private/unsupported route must remain a non-redirecting 404.");
    noPrivateCaching(response);
  });

  const syntheticToken = "SYNTHETIC-NOT-A-REAL-TOKEN";
  for (const host of [undefined, "snaglist.dev", "www.snaglist.dev", "www.usesnaglist.com"]) await check("private synthetic shell on " + (host || "loopback"), async () => {
    const response = await request("/m/" + syntheticToken + "/snags/example?pin=SYNTHETIC-NOT-A-REAL-PIN", { host });
    requireThat(response.status === 200 && !response.headers.location, "Private shell must remain on its issued path/host.");
    noPrivateCaching(response);
    const html = response.body.toString("utf8");
    requireThat(!html.includes(syntheticToken) && !html.includes("SYNTHETIC-NOT-A-REAL-PIN"), "Private shell reflects a capability or query value.");
    requireThat(/Contractor link/.test(html) && /noindex/.test(html), "Private shell is not neutral/non-indexable.");
    requireThat(!/rel="canonical"/.test(html), "Private shell must not publish a canonical public URL.");
    requireThat(digest(response.body) === before["__spa-fallback.html"], "Private shell bytes do not match the static neutral artifact.");
    return { status: response.status, sha256: digest(response.body), token_reflected: false, backend_requests: 0 };
  });

  const downloads = Object.keys(before).filter((p) => p.startsWith("downloads/"));
  const fonts = Object.keys(before).filter((p) => /^fonts\/.+\.woff2?$/.test(p));
  const resources = [...downloads, ...fonts, ".well-known/apple-app-site-association"];
  for (const file of resources) await check("served binary/file equality " + file, async () => {
    const response = await request("/" + file);
    requireThat(response.status === 200 && !response.headers.location, "Static resource did not return HTTP 200 without redirect.");
    const source = await readFile(path.join(repo, "public", file));
    const actual = digest(response.body);
    requireThat(actual === before[file] && actual === digest(source), "HTTP/build/source resource bytes do not match.");
    const type = response.headers["content-type"] || "";
    if (file.endsWith(".pdf")) requireThat(type.startsWith("application/pdf") && response.body.subarray(0, 4).toString() === "%PDF", "PDF type/signature is invalid.");
    if (file.endsWith(".xlsx")) requireThat(type.startsWith("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") && response.body.subarray(0, 2).toString() === "PK", "Workbook type/signature is invalid.");
    if (/\.woff2?$/.test(file)) requireThat(/^font\/woff2?$/.test(type) && ["wOFF", "wOF2"].includes(response.body.subarray(0, 4).toString()), "Font type/signature is invalid.");
    if (file.startsWith(".well-known/")) requireThat(type.startsWith("application/json"), "Apple association media type is not JSON.");
    if (file.startsWith("downloads/")) requireThat(/noindex/.test(response.headers["x-robots-tag"] || ""), "Download should not be indexed as a landing page.");
    return { status: response.status, bytes: response.body.length, content_type: type, sha256: actual };
  });
  await check("legacy Host-header Apple association bytes unchanged", async () => {
    const response = await request("/.well-known/apple-app-site-association", { host: "snaglist.dev" });
    requireThat(response.status === 200 && !response.headers.location && digest(response.body) === before[".well-known/apple-app-site-association"], "Legacy host changed/redirected Apple association.");
  });

  for (const urlPath of ["/pricing", "/pricing/", "/missing-release-page", "/auth/callback", "/m/" + syntheticToken,
    "/downloads/snag-list-template.pdf", "/.well-known/apple-app-site-association"]) await check("HEAD matches GET " + (urlPath.startsWith("/m/") ? "/m/[synthetic]" : urlPath), async () => {
    const get = await request(urlPath), head = await request(urlPath, { method: "HEAD" });
    requireThat(head.status === get.status && head.body.length === 0, "HEAD status/body differs from GET semantics.");
    for (const key of ["content-type", "cache-control", "x-robots-tag", "location", "referrer-policy"]) requireThat(head.headers[key] === get.headers[key], "HEAD response policy differs from GET: " + key);
    return { status: head.status, body_bytes: 0 };
  });

  for (const [name, rawPath] of [["encoded separator", "/m/synthetic%2Fsegment"], ["double encoding", "/m/%252e%252e"], ["malformed escape", "/bad%"]]) await check("raw HTTP path rejection: " + name, async () => {
    const response = await request(rawPath);
    requireThat(response.status === 400 && !response.headers.location, "Encoded/malformed request was not rejected before routing.");
    noPrivateCaching(response);
  });
}

const after = await snapshot(build);
await check("compiled asset snapshot remained unchanged throughout acceptance", async () => {
  requireThat(JSON.stringify(before) === JSON.stringify(after), "Build files changed during acceptance; rebuild/restart and rerun.");
  return { asset_count: Object.keys(before).length, snapshot_sha256: digest(JSON.stringify(before)) };
});
const failed = checks.filter((c) => !c.passed).length;
const report = {
  schema: 1, started_at_utc: startedAt, finished_at_utc: new Date().toISOString(), base_url: base.origin,
  status: failed ? "failed" : "passed", total: checks.length, passed: checks.length - failed, failed,
  requests: requestCount, redirects_followed: 0, network_scope: "loopback HTTP only; Host-header simulations use the same local socket",
  backend_requests: 0, browser_javascript_executed: false,
  build_manifest_sha256: digest(manifestBytes), build_snapshot_sha256: digest(JSON.stringify(before)),
  worker_sha256: digest(await readFile(path.join(repo, "worker.mjs"))),
  routing_module_sha256: digest(await readFile(path.join(repo, "scripts/routing.mjs"))),
  script_sha256: digest(await readFile(fileURLToPath(import.meta.url))), checks,
  limitations: ["Local Wrangler HTTP acceptance, not live DNS/TLS/Cloudflare-host acceptance.",
    "Synthetic Contractor shell only. No backend health, PIN, recipient data or completion submission tested.",
    "No browser rendering, JavaScript interaction or accessibility acceptance.",
    "Already-normalised upstream dot segments cannot be reconstructed by the Worker.",
    "Final changed downloads/assets require a matching rebuild, Worker restart and rerun."],
};
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, JSON.stringify(report, null, 2) + "\n");
console.log(`Local Cloudflare HTTP: ${report.passed}/${report.total} passed; report: ${output}`);
process.exitCode = failed ? 1 : 0;

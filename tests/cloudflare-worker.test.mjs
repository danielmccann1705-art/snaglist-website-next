import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import worker from "../worker.mjs";

const publicPages = ["/", "/pricing", "/contractor-link", "/privacy", "/snagging-app/site-managers"];
const association = await readFile(new URL("../public/.well-known/apple-app-site-association", import.meta.url));

function fixture({ indexable = true, pages = publicPages, replacements = {} } = {}) {
  const files = new Map([
    ["/route-manifest.json", JSON.stringify({ indexable, pages })],
    ["/index.html", "<h1>Public home</h1>"],
    ["/pricing/index.html", "<h1>Pricing</h1>"],
    ["/privacy/index.html", "<h1>Privacy</h1>"],
    ["/contractor-link/index.html", "<h1>Contractor link</h1>"],
    ["/snagging-app/site-managers/index.html", "<h1>Site managers</h1>"],
    ["/__spa-fallback.html", '<main>Contractor link</main><meta name="robots" content="noindex"/>'],
    ["/404.html", "<h1>Page not found</h1>"],
    ["/.well-known/apple-app-site-association", association],
    ["/assets/entry-ABcd12_9.js", "export{}"], ["/assets/style-ABcd1299.css", "body{}"],
    ["/assets/ordinary.js", "export{}"], ["/fonts/plex-sans-regular.woff", "font"],
    ["/brand/wordmark.svg", "<svg/>"], ["/brand/social.png", "image"],
    ["/downloads/template.pdf", "%PDF-synthetic"], ["/downloads/template.xlsx", "PK-synthetic"],
    ["/robots.txt", "User-agent: *"], ["/sitemap.xml", "<urlset/>"],
    ["/pricing.data", "public route data"], ["/_root.data", "root route data"],
    // Extra files must not turn reserved/unknown URLs into public routes.
    ["/auth/callback", "Must not be served"], ["/api/status", "Must not be served"],
    ["/assets/private.html", "Must not be served"], ["/.env", "Must not be served"],
    ...Object.entries(replacements),
  ]);
  const calls = [];
  const env = { ASSETS: { async fetch(request) {
    calls.push({ url: request.url, method: request.method, headers: Object.fromEntries(request.headers) });
    const file = files.get(new URL(request.url).pathname);
    if (typeof file === "function") return file(request);
    if (file === undefined) return new Response("Missing asset", { status: 404 });
    return new Response(request.method === "HEAD" ? null : file, {
      headers: { "Content-Type": "application/octet-stream", ETag: '"asset-etag"',
        "Last-Modified": "Fri, 11 Sep 2026 00:00:00 GMT", "Cache-Control": "public, max-age=600",
        "Set-Cookie": "unexpected=not-forwarded" },
    });
  } } };
  return { env, calls, files,
    fetch: (path, init) => worker.fetch(new Request("https://usesnaglist.com" + path, init), env),
    url: (url, init) => worker.fetch(new Request(url, init), env),
  };
}

function privateResponse(response) {
  assert.equal(response.headers.get("Cache-Control"), "private, no-store");
  assert.equal(response.headers.get("CDN-Cache-Control"), "no-store");
  assert.equal(response.headers.get("Cloudflare-CDN-Cache-Control"), "no-store");
  assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow");
  assert.equal(response.headers.get("Referrer-Policy"), "no-referrer");
  assert.equal(response.headers.get("X-Content-Type-Options"), "nosniff");
  assert.equal(response.headers.get("ETag"), null);
  assert.equal(response.headers.get("Last-Modified"), null);
  assert.equal(response.headers.get("Set-Cookie"), null);
}

test("explicit public routes fetch their own prerendered document, with no global SPA", async () => {
  const f = fixture();
  for (const [path, text] of [["/", "Public home"], ["/pricing", "Pricing"], ["/snagging-app/site-managers", "Site managers"]]) {
    const response = await f.fetch(path);
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(text));
    assert.equal(response.headers.get("Content-Type"), "text/html; charset=utf-8");
    assert.equal(response.headers.get("Cache-Control"), "public, max-age=0, must-revalidate");
    assert.equal(response.headers.get("X-Robots-Tag"), null);
    assert.equal(response.headers.get("Set-Cookie"), null);
  }
  assert.equal(f.calls.filter((call) => call.url.endsWith("route-manifest.json")).length, 1);
});

test("public aliases, legacy domains, www and trailing paths redirect to their final canonical URL in one hop", async () => {
  const f = fixture();
  for (const [source, destination] of [
    ["https://snaglist.dev/magic-links/", "https://usesnaglist.com/contractor-link"],
    ["https://www.snaglist.dev/pricing/", "https://usesnaglist.com/pricing"],
    ["https://www.usesnaglist.com/", "https://usesnaglist.com/"],
    ["http://snaglist.dev/", "https://usesnaglist.com/"],
    ["https://usesnaglist.com/magic-links", "https://usesnaglist.com/contractor-link"],
    ["https://usesnaglist.com/pricing/index.html", "https://usesnaglist.com/pricing"],
    ["https://snaglist.dev/index.html", "https://usesnaglist.com/"],
    ["https://preview.example.workers.dev/pricing/", "https://preview.example.workers.dev/pricing"],
  ]) {
    const response = await f.url(source + "?token=synthetic-secret&code=synthetic-code&utm_source=mail");
    assert.equal(response.status, 308, source);
    assert.equal(response.headers.get("Location"), destination);
    assert.equal(await response.text(), "");
    privateResponse(response);
    assert.equal((await f.url(destination)).status, 200);
  }
  assert.ok(f.calls.every((call) => !call.url.includes("synthetic-secret") && !call.url.includes("?")));
});

test("private Contractor links preserve host/path and only fetch the shared neutral shell", async () => {
  const f = fixture();
  for (const host of ["snaglist.dev", "www.snaglist.dev", "usesnaglist.com", "www.usesnaglist.com", "preview.example.workers.dev"]) {
    for (const suffix of ["", "/", "/snags/synthetic-snag"]) {
      const response = await f.url(`https://${host}/m/synthetic_capability-123${suffix}?pin=synthetic-secret`, {
        headers: { Cookie: "session=synthetic-cookie", Authorization: "Bearer synthetic-bearer", Referer: "https://secret.example/",
          "If-None-Match": '"old"', Range: "bytes=0-9" },
      });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("Location"), null);
      privateResponse(response);
      assert.match(await response.text(), /Contractor link/);
    }
  }
  assert.ok(f.calls.every((call) => call.url === "https://assets.local/__spa-fallback.html"));
  assert.ok(f.calls.every((call) => Object.keys(call.headers).length === 0));
});

test("incomplete, oversized and invalid Contractor link tokens do not get a public page", async () => {
  const f = fixture();
  for (const path of ["/m", "/m/", "/m/token.with.dot", "/m/" + "a".repeat(513)]) {
    const response = await f.fetch(path);
    assert.equal(response.status, 404, path.slice(0, 30));
    privateResponse(response);
    assert.equal(response.headers.get("Location"), null);
    assert.ok(!(await response.text()).includes("Public home"));
  }
  assert.equal(f.calls.length, 0);
});

test("auth, API and unknown well-known paths stay private 404s on every public host", async () => {
  const f = fixture();
  for (const host of ["snaglist.dev", "www.snaglist.dev", "www.usesnaglist.com"]) {
    for (const path of ["/auth", "/auth/callback", "/api", "/api/status", "/.well-known/unknown", "/.well-known/apple-app-site-association/"]) {
      const response = await f.url(`https://${host}${path}?code=synthetic-secret`);
      assert.equal(response.status, 404);
      assert.equal(response.headers.get("Location"), null);
      privateResponse(response);
      assert.ok(!(await response.text()).includes("synthetic-secret"));
    }
  }
  assert.equal(f.calls.length, 0);
});

test("Apple association bytes and media type are preserved without domain redirects", async () => {
  const f = fixture();
  for (const host of ["snaglist.dev", "www.snaglist.dev", "usesnaglist.com", "www.usesnaglist.com"]) {
    const response = await f.url(`https://${host}/.well-known/apple-app-site-association`);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("Content-Type"), "application/json");
    assert.equal(response.headers.get("Location"), null);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), association);
  }
  assert.ok(f.calls.every((call) => call.url === "https://assets.local/.well-known/apple-app-site-association"));
});

test("unknown pages and internal build artefacts are real non-indexable 404s", async () => {
  const f = fixture();
  for (const path of ["/missing", "/pricing/extra", "/magic-links/extra", "/404", "/404.html", "/__spa-fallback.html",
    "/route-manifest.json", "/assets/private.html", "/.env", "/missing.data", "/assets/missing.js"]) {
    const response = await f.url("https://snaglist.dev" + path);
    assert.equal(response.status, 404, path);
    assert.equal(response.headers.get("Location"), null);
    privateResponse(response);
    assert.match(await response.text(), /Page not found/);
  }
});

test("static files have correct types and only hashed bundles receive immutable caching", async () => {
  const f = fixture();
  for (const [path, type, immutable] of [
    ["/assets/entry-ABcd12_9.js", "text/javascript; charset=utf-8", true],
    ["/assets/style-ABcd1299.css", "text/css; charset=utf-8", true],
    ["/assets/ordinary.js", "text/javascript; charset=utf-8", false],
    ["/fonts/plex-sans-regular.woff", "font/woff", false], ["/brand/wordmark.svg", "image/svg+xml", false],
    ["/brand/social.png", "image/png", false], ["/downloads/template.pdf", "application/pdf", false],
    ["/downloads/template.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", false],
    ["/robots.txt", "text/plain; charset=utf-8", false], ["/sitemap.xml", "application/xml; charset=utf-8", false],
    ["/pricing.data", "text/x-script; charset=utf-8", false], ["/_root.data", "text/x-script; charset=utf-8", false],
  ]) {
    const response = await f.fetch(path);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get("Content-Type"), type);
    assert.equal(response.headers.get("Cache-Control").includes("immutable"), immutable, path);
    if (path.startsWith("/downloads/") || path.endsWith(".data")) assert.match(response.headers.get("X-Robots-Tag"), /noindex/);
  }
});

test("HEAD preserves GET status and headers without a body, including errors and private links", async () => {
  const f = fixture();
  for (const path of ["/pricing", "/pricing/", "/m/synthetic", "/m/", "/unknown", "/auth/callback", "/assets/entry-ABcd12_9.js", "/.well-known/apple-app-site-association"]) {
    const get = await f.fetch(path), head = await f.fetch(path, { method: "HEAD" });
    assert.equal(head.status, get.status, path);
    assert.deepEqual(Object.fromEntries(head.headers), Object.fromEntries(get.headers), path);
    assert.equal(await head.text(), "");
  }
});

test("write methods never mutate assets, redirect or reach an API", async () => {
  const f = fixture();
  for (const method of ["POST", "PUT", "PATCH", "DELETE", "OPTIONS"]) {
    for (const path of ["/", "/magic-links", "/m/synthetic", "/auth/callback"]) {
      const response = await f.fetch(path, { method });
      assert.equal(response.status, 405);
      assert.equal(response.headers.get("Allow"), "GET, HEAD");
      assert.equal(response.headers.get("Location"), null);
      privateResponse(response);
    }
  }
  assert.equal(f.calls.length, 0);
});

test("encoded separators, malformed escapes and traversal are rejected before asset resolution", async () => {
  const f = fixture();
  for (const path of ["/m/a%2Fb", "/m/%252e%252e", "/m/%5csecret", "/%00", "/bad%", "/%E0%A4%A", "/m/a//b", "/m/a/../../pricing", "/m/a/%2e%2e/pricing", "/assets/../index.html", "/a\\b", "/" + "x".repeat(2049)]) {
    // Raw-url fixture explicitly tests paths arriving unnormalised. Request/URL
    // constructors may already remove dot segments before a Worker sees them.
    const response = await worker.fetch({ url: "https://snaglist.dev" + path, method: "GET", headers: new Headers() }, f.env);
    assert.equal(response.status, 400, path.slice(0, 50));
    privateResponse(response);
    assert.equal(response.headers.get("Location"), null);
    assert.equal(await response.text(), "Invalid request.");
  }
  assert.equal(f.calls.length, 0);
});

test("manifest cache is shared within one binding, isolated across deployments and retried after failure", async () => {
  const first = fixture(), second = fixture({ indexable: false });
  await Promise.all([first.fetch("/pricing"), first.fetch("/privacy"), first.fetch("/brand/social.png")]);
  assert.equal(first.calls.filter((call) => call.url.endsWith("route-manifest.json")).length, 1);
  assert.match((await second.fetch("/pricing")).headers.get("X-Robots-Tag"), /noindex/);
  assert.equal(second.calls.filter((call) => call.url.endsWith("route-manifest.json")).length, 1);
  const retry = fixture({ replacements: { "/route-manifest.json": "invalid-json" } });
  privateResponse(await retry.fetch("/pricing"));
  retry.files.set("/route-manifest.json", JSON.stringify({ pages: publicPages, indexable: true }));
  assert.equal((await retry.fetch("/pricing")).status, 200);
  assert.equal(retry.calls.filter((call) => call.url.endsWith("route-manifest.json")).length, 2);
});

test("invalid route manifests fail closed, but do not break the independent private shell or association", async () => {
  for (const pages of [["/"], [...publicPages, "/auth/callback"], [...publicPages, "/m/secret"], [...publicPages, "/bad/../path"]]) {
    const f = fixture({ pages });
    const response = await f.fetch("/pricing");
    assert.equal(response.status, 503);
    privateResponse(response);
    assert.equal((await f.fetch("/m/synthetic")).status, 200);
    assert.equal((await f.fetch("/.well-known/apple-app-site-association")).status, 200);
  }
});

test("preview deployments stay noindex even if their production asset manifest is indexable", async () => {
  for (const f of [fixture(), fixture({ indexable: false })]) {
    for (const path of ["/", "/pricing", "/brand/social.png"]) {
      const response = await f.url("https://version.example.workers.dev" + path);
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow");
      assert.equal(response.headers.get("Location"), null);
    }
  }
});

test("public conditional/range headers survive without credentials; private requests never use validators", async () => {
  const f = fixture();
  const headers = { "If-None-Match": '"tag"', "If-Modified-Since": "Fri, 11 Sep 2026 00:00:00 GMT", Range: "bytes=0-1",
    "If-Range": '"tag"', Cookie: "private", Authorization: "private", Referer: "https://private.example/" };
  await f.fetch("/downloads/template.pdf?token=synthetic-secret", { headers });
  assert.deepEqual(f.calls.at(-1).headers, { "if-none-match": '"tag"', "if-modified-since": headers["If-Modified-Since"], range: "bytes=0-1", "if-range": '"tag"' });
  assert.equal(f.calls.at(-1).url, "https://assets.local/downloads/template.pdf");
  await f.fetch("/m/synthetic-secret", { headers });
  assert.deepEqual(f.calls.at(-1).headers, {});
});

test("asset 304 and 206 responses retain their semantics; private redirects and binding exceptions fail safely", async () => {
  const f = fixture({ replacements: {
    "/pricing/index.html": () => new Response(null, { status: 304, headers: { ETag: '"tag"' } }),
    "/downloads/template.pdf": () => new Response("%P", { status: 206, headers: { "Content-Range": "bytes 0-1/12" } }),
    "/__spa-fallback.html": () => new Response(null, { status: 302, headers: { Location: "https://unsafe.example/" } }),
  } });
  const html = await f.fetch("/pricing"); assert.equal(html.status, 304); assert.equal(await html.text(), "");
  const partial = await f.fetch("/downloads/template.pdf"); assert.equal(partial.status, 206); assert.equal(partial.headers.get("Content-Range"), "bytes 0-1/12");
  const privateFailure = await f.fetch("/m/synthetic-secret"); assert.equal(privateFailure.status, 503); privateResponse(privateFailure);
  assert.equal(privateFailure.headers.get("Location"), null);
  f.files.set("/__spa-fallback.html", () => { throw new Error("synthetic-secret https://private.example/"); });
  const failure = await f.fetch("/m/synthetic-secret", { method: "HEAD" });
  assert.equal(failure.status, 503); privateResponse(failure); assert.equal(await failure.text(), "");
});

test("missing 404 asset still returns an honest 404, while a missing known public page is unavailable", async () => {
  const f = fixture(); f.files.delete("/404.html"); f.files.delete("/pricing/index.html");
  assert.equal((await f.fetch("/missing")).status, 404);
  const missingPage = await f.fetch("/pricing"); assert.equal(missingPage.status, 503); privateResponse(missingPage);
  f.files.delete("/.well-known/apple-app-site-association");
  assert.equal((await f.url("https://snaglist.dev/.well-known/apple-app-site-association")).status, 404);
});

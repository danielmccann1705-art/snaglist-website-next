import { resolvePath } from "./scripts/routing.mjs";

// These URLs are routing policy, never an API proxy or a Contractor link origin.
const CANONICAL_ORIGIN = "https://usesnaglist.com";
const PUBLIC_HOSTS = new Set([
  "usesnaglist.com", "www.usesnaglist.com", "snaglist.dev", "www.snaglist.dev",
]);
const ASSOCIATION = "/.well-known/apple-app-site-association";
const manifests = new WeakMap();
const MIME = {
  html: "text/html; charset=utf-8", js: "text/javascript; charset=utf-8",
  css: "text/css; charset=utf-8", json: "application/json; charset=utf-8",
  svg: "image/svg+xml", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg",
  webp: "image/webp", avif: "image/avif", ico: "image/x-icon",
  woff: "font/woff", woff2: "font/woff2", pdf: "application/pdf",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  txt: "text/plain; charset=utf-8", xml: "application/xml; charset=utf-8",
  data: "text/x-script; charset=utf-8",
};

function safePath(path) {
  // All released routes, tokens and asset names use this ASCII alphabet. Reject
  // escapes rather than decoding separators/dot segments into different routes.
  return path.length <= 2048 && /^\/[A-Za-z0-9._~/-]*$/.test(path) &&
    !path.includes("//") && !path.split("/").some((part) => part === "." || part === "..");
}

function requestURL(request) {
  // Check the path as received as well as the URL parser's result. An upstream
  // browser/proxy may already have normalised dot segments; we cannot recover it.
  const rawPath = request.url.match(/^https?:\/\/[^/?#]+([^?#]*)/)?.[1] || "/";
  if (!safePath(rawPath)) return null;
  const url = new URL(request.url);
  return ["https:", "http:"].includes(url.protocol) && safePath(url.pathname) ? url : null;
}

function privateHeaders(headers = new Headers()) {
  headers.set("Cache-Control", "private, no-store");
  headers.set("CDN-Cache-Control", "no-store");
  headers.set("Cloudflare-CDN-Cache-Control", "no-store");
  headers.set("X-Robots-Tag", "noindex, nofollow");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("X-Content-Type-Options", "nosniff");
  for (const key of ["ETag", "Last-Modified", "Set-Cookie", "Location"]) headers.delete(key);
  return headers;
}

function plain(request, status, message) {
  const headers = privateHeaders();
  headers.set("Content-Type", "text/plain; charset=utf-8");
  if (status === 405) headers.set("Allow", "GET, HEAD");
  return new Response(request.method === "HEAD" ? null : message, { status, headers });
}

function assetRequest(path, request, conditional = false) {
  // Do not forward user URL/query/token, Cookie, Authorization or Referer to the
  // asset binding. The private shell request is the same for every recipient.
  const headers = new Headers();
  if (conditional) {
    for (const key of ["If-None-Match", "If-Modified-Since", "Range", "If-Range"]) {
      if (request.headers.has(key)) headers.set(key, request.headers.get(key));
    }
  }
  return new Request("https://assets.local" + path, {
    method: request?.method === "HEAD" ? "HEAD" : "GET", headers,
  });
}

async function manifestFor(binding) {
  // A deployment's ASSETS binding is immutable. Do not share cached manifests
  // across bindings/deployments, and allow retry after an incomplete asset upload.
  if (!manifests.has(binding)) {
    const pending = (async () => {
      const response = await binding.fetch(assetRequest("/route-manifest.json"));
      if (response.status !== 200) throw new Error("Manifest unavailable");
      const text = await response.text();
      if (text.length > 64 * 1024) throw new Error("Manifest too large");
      const data = JSON.parse(text);
      if (!Array.isArray(data.pages) || !data.pages.length || data.pages.length > 1000 ||
          !data.pages.includes("/") || !data.pages.includes("/contractor-link") ||
          data.pages.some((path) => typeof path !== "string" || !safePath(path) ||
            (path !== "/" && path.endsWith("/")) || path.includes(".") ||
            /^\/(?:m|auth|api|\.well-known)(?:\/|$)/.test(path))) {
        throw new Error("Invalid public route manifest");
      }
      return Object.freeze({ pages: Object.freeze([...new Set(data.pages)]), indexable: data.indexable === true });
    })().catch((error) => { manifests.delete(binding); throw error; });
    manifests.set(binding, pending);
  }
  return manifests.get(binding);
}

function publicPath(path, pages) {
  // Explicit .html entry points must not become duplicate public documents.
  if (path === "/index.html") return "/";
  if (path.endsWith("/index.html") && pages.includes(path.slice(0, -11))) return path.slice(0, -11);
  const route = resolvePath(path, pages);
  return route && !route.private ? (route.location || path) : null;
}

function staticPath(path, pages) {
  if (["/robots.txt", "/sitemap.xml", "/favicon.png", "/apple-touch-icon.png"].includes(path)) return true;
  if (/^\/(?:assets|brand|fonts|downloads)\/.+\.(?:js|css|svg|png|jpe?g|webp|avif|ico|woff2?|pdf|xlsx|txt)$/.test(path)) return true;
  // React Router's public prerender data is explicit too; never admit /m data.
  return path === "/_root.data" || (path.endsWith(".data") && pages.includes(path.slice(0, -5)));
}

function responseFromAsset(request, response, path, { privateResponse = false, indexable = false, status } = {}) {
  const headers = new Headers(response.headers);
  headers.delete("Set-Cookie");
  headers.delete("Location");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Content-Type", path === ASSOCIATION ? "application/json" : (MIME[path.split(".").at(-1)] || "application/octet-stream"));
  if (privateResponse) privateHeaders(headers);
  else {
    const immutable = /^\/assets\/[^/]+-[A-Za-z0-9_-]{8,}\.(?:js|css)$/.test(path);
    headers.set("Cache-Control", immutable ? "public, max-age=31536000, immutable" :
      path.endsWith(".html") ? "public, max-age=0, must-revalidate" : "public, max-age=3600");
    if (!indexable || path.startsWith("/downloads/") || path.endsWith(".data")) headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  const finalStatus = status || response.status;
  return new Response(request.method === "HEAD" || finalStatus === 304 ? null : response.body,
    { status: finalStatus, headers });
}

async function notFound(request, env) {
  const response = await env.ASSETS.fetch(assetRequest("/404.html", request));
  if (response.status !== 200) return plain(request, 404, "Page not found.");
  return responseFromAsset(request, response, "/404.html", { privateResponse: true, status: 404 });
}

export default {
  async fetch(request, env) {
    try {
      if (!["GET", "HEAD"].includes(request.method)) return plain(request, 405, "Method not allowed.");
      const url = requestURL(request);
      if (!url) return plain(request, 400, "Invalid request.");
      const path = url.pathname;
      if (/^\/m(?:\/|$)/.test(path)) {
        // Preserve both legacy and current hostnames, the path and any client
        // query state. No redirect, network API call, or token-derived cache key.
        if (!/^\/m\/[A-Za-z0-9_-]{1,512}(?:\/[A-Za-z0-9._~/-]*)?$/.test(path)) return plain(request, 404, "Contractor link not found.");
        const response = await env.ASSETS.fetch(assetRequest("/__spa-fallback.html", request));
        if (response.status !== 200) return plain(request, 503, "Contractor link temporarily unavailable.");
        return responseFromAsset(request, response, "/__spa-fallback.html", { privateResponse: true });
      }
      // The website never had an authentication/API server. These URLs must not
      // be turned into public home pages or redirected with credential queries.
      if (/^\/(?:auth|api)(?:\/|$)/.test(path)) return plain(request, 404, "Page not found.");
      if (/^\/\.well-known(?:\/|$)/.test(path)) {
        if (path !== ASSOCIATION) return plain(request, 404, "Page not found.");
        const response = await env.ASSETS.fetch(assetRequest(path, request, true));
        if (![200, 304].includes(response.status)) return plain(request, 404, "Page not found.");
        // Byte-for-byte static association; no host redirect or JSON rewriting.
        return responseFromAsset(request, response, path);
      }
      const manifest = await manifestFor(env.ASSETS);
      const canonical = publicPath(path, manifest.pages);
      const indexable = manifest.indexable && url.origin === CANONICAL_ORIGIN;
      if (canonical) {
        if (canonical !== path || (PUBLIC_HOSTS.has(url.hostname) && url.origin !== CANONICAL_ORIGIN)) {
          const origin = PUBLIC_HOSTS.has(url.hostname) ? CANONICAL_ORIGIN : url.origin;
          const headers = privateHeaders();
          // Public redirects deliberately drop queries rather than transporting
          // accidental authentication/capability values between hostnames.
          headers.set("Location", origin + canonical);
          return new Response(null, { status: 308, headers });
        }
        const file = canonical === "/" ? "/index.html" : canonical + "/index.html";
        const response = await env.ASSETS.fetch(assetRequest(file, request, true));
        if (![200, 304].includes(response.status)) return plain(request, 503, "Page temporarily unavailable.");
        return responseFromAsset(request, response, file, { indexable });
      }
      if (staticPath(path, manifest.pages)) {
        const response = await env.ASSETS.fetch(assetRequest(path, request, true));
        if ([200, 206, 304].includes(response.status)) return responseFromAsset(request, response, path, { indexable });
      }
      return await notFound(request, env);
    } catch {
      // Never log/reflect request URLs, tokens, headers or binding error messages.
      return plain(request, 503, "Site temporarily unavailable.");
    }
  },
};

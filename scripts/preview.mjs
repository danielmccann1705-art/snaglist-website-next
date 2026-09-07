import http from "node:http";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
import { resolvePath } from "./routing.mjs";
const root = path.resolve("build/client");
const manifest = JSON.parse(
  await readFile(path.join(root, "route-manifest.json"), "utf8"),
);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".data": "text/x-script",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".pdf": "application/pdf",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};
http
  .createServer(async (req, res) => {
    try {
      if (!["GET", "HEAD"].includes(req.method)) {
        res.writeHead(405);
        return res.end();
      }
      const url = new URL(req.url, "http://localhost");
      const pathname = decodeURIComponent(url.pathname);
      const route = resolvePath(pathname, manifest.pages);
      if (route?.location) {
        res.writeHead(route.status, { Location: route.location + url.search });
        return res.end();
      }
      const file = path.resolve(root, route?.file || "." + pathname);
      if (!file.startsWith(root + path.sep)) {
        res.writeHead(404);
        return res.end();
      }
      let status = route?.status || 200,
        actual = file;
      if (!(await stat(file).catch(() => null))?.isFile()) {
        status = 404;
        actual = path.join(root, "404.html");
      }
      const headers = {
        "Content-Type":
          mime[path.extname(actual)] ||
          (pathname === "/.well-known/apple-app-site-association"
            ? "application/json"
            : "application/octet-stream"),
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff",
      };
      if (
        !manifest.indexable ||
        route?.private ||
        pathname.startsWith("/downloads/") ||
        status === 404
      )
        headers["X-Robots-Tag"] = "noindex, nofollow";
      if (route?.private) headers["Cache-Control"] = "private, no-store";
      res.writeHead(status, headers);
      res.end(req.method === "HEAD" ? undefined : await readFile(actual));
    } catch {
      res.writeHead(400);
      res.end("Invalid request");
    }
  })
  .listen(Number(process.env.PORT || 5173), "0.0.0.0", () =>
    console.log("Snaglist preview ready on port " + (process.env.PORT || 5173)),
  );

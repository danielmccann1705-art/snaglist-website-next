import {
  readFile,
  writeFile,
  mkdir,
  copyFile,
  readdir,
} from "node:fs/promises";
import { pages, ORIGIN } from "../app/content/pages.ts";
import { releaseIndexable, redirectRoutes } from "./routing.mjs";

const root = new URL("../build/client/", import.meta.url);
await copyFile(new URL("404/index.html", root), new URL("404.html", root));
// Build artefacts are private previews by default. Enable public indexing only at
// the production release gate, and never for a Vercel preview deployment.
const indexable = releaseIndexable(process.env);
async function visit(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = new URL(entry.name + (entry.isDirectory() ? "/" : ""), dir);
    if (entry.isDirectory()) await visit(file);
    else if (entry.name.endsWith(".html")) {
      let html = await readFile(file, "utf8");
      if (!indexable || entry.name === "__spa-fallback.html") {
        html = html.replace(/<meta name="robots"[^>]*>/g, "");
        html = html.replace(
          "</head>",
          '<meta name="robots" content="noindex, nofollow"/></head>',
        );
      }
      if (entry.name === "__spa-fallback.html")
        html = html.replace(
          "</head>",
          '<title>Contractor link | Snaglist</title><meta name="description" content="Open the snag list shared with you."/></head>',
        );
      await writeFile(file, html);
    }
  }
}
await visit(root);
const urls = indexable ? Object.keys(pages) : [];
await writeFile(
  new URL("sitemap.xml", root),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((path) => `<url><loc>${ORIGIN}${path}</loc></url>`).join("\n") +
    "\n</urlset>\n",
);
await writeFile(
  new URL("robots.txt", root),
  indexable
    ? `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n",
);
await writeFile(
  new URL("route-manifest.json", root),
  JSON.stringify(
    {
      indexable,
      origin: ORIGIN,
      pages: Object.keys(pages),
      redirects: redirectRoutes,
    },
    null,
    2,
  ),
);
console.log(
  `Prepared ${Object.keys(pages).length} public pages; indexing ${indexable ? "enabled for production" : "disabled for preview"}.`,
);

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { pages, ORIGIN } from "../app/content/pages.ts";
const root = "build/client";
const manifest = JSON.parse(readFileSync(root + "/route-manifest.json"));
test("every public route has useful HTML and its own title, description, canonical and H1", () => {
  const titles = new Set();
  for (const [path, p] of Object.entries(pages)) {
    const html = readFileSync(
      root + (path === "/" ? "/index.html" : path + "/index.html"),
      "utf8",
    );
    assert.equal((html.match(/<h1\b/g) || []).length, 1, path);
    assert.ok(html.includes(p.title), path + " title");
    assert.ok(html.includes(`href="${ORIGIN}${path}"`), path + " canonical");
    assert.ok(html.includes('name="description"'), path + " description");
    assert.ok(html.includes('lang="en-GB"'), path + " language");
    assert.ok(
      html.includes('href="/contractor-link"'),
      path + " crawlable navigation",
    );
    assert.ok(!titles.has(p.title), path + " duplicate title");
    titles.add(p.title);
    if (!manifest.indexable)
      assert.match(html, /name="robots" content="noindex/);
  }
});
test("all internal public links and proof assets resolve to actual output", () => {
  for (const path of Object.keys(pages)) {
    const html = readFileSync(
      root + (path === "/" ? "/index.html" : path + "/index.html"),
      "utf8",
    );
    for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"?#]*)[^"]*"/g)) {
      assert.ok(
        pages[href] || existsSync(root + href),
        `${path}: missing ${href}`,
      );
    }
  }
});
test("private fallback is neutral and not indexable; downloads are real files", () => {
  const html = readFileSync(root + "/__spa-fallback.html", "utf8");
  assert.match(html, /noindex/);
  assert.ok(!html.includes("S-0042"));
  assert.ok(!html.includes("canonical"));
  for (const file of ["snag-list-template.pdf", "snag-list-worked-example.pdf"])
    assert.equal(
      readFileSync(root + "/downloads/" + file)
        .subarray(0, 4)
        .toString(),
      "%PDF",
    );
  assert.equal(
    readFileSync(root + "/downloads/snag-list-template.xlsx")
      .subarray(0, 2)
      .toString(),
    "PK",
  );
});
test("Vercel routes cover public pages, preserve the association file and have a real final 404", () => {
  const config = JSON.parse(readFileSync("vercel.json"));
  for (const p of Object.keys(pages).filter((p) => p !== "/"))
    assert.ok(
      config.routes.some((r) => r.src === p && r.dest === p + "/index.html"),
      p,
    );
  assert.equal(config.routes.at(-1).status, 404);
  assert.ok(
    config.routes.some(
      (r) =>
        r.src === "/m/[^/]+(?:/.*)?" &&
        r.headers["Cache-Control"] === "private, no-store",
    ),
  );
  const association = JSON.parse(
    readFileSync(root + "/.well-known/apple-app-site-association"),
  );
  assert.equal(association.applinks.details[0].components[0]["/"], "/m/*");
  const sitemap = readFileSync(root + "/sitemap.xml", "utf8");
  assert.ok(!sitemap.includes("/m/"));
  assert.ok(!sitemap.includes("/magic-links"));
  assert.ok(!sitemap.includes("/downloads/"));
  assert.equal(
    (sitemap.match(/<loc>/g) || []).length,
    manifest.indexable ? Object.keys(pages).length : 0,
  );
});

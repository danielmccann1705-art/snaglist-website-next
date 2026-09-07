import { test } from "node:test";
import assert from "node:assert/strict";
import { resolvePath, releaseIndexable } from "../scripts/routing.mjs";
const paths = [
  "/",
  "/pricing",
  "/contractor-link",
  "/snagging-app/site-managers",
];
test("public redirects preserve the new contractor-link destination", () => {
  assert.deepEqual(resolvePath("/magic-links/", paths), {
    status: 308,
    location: "/contractor-link",
  });
});
test("valid operational links use a private SPA; incomplete and unknown paths do not become home", () => {
  assert.equal(resolvePath("/m/synthetic-link", paths).private, true);
  assert.equal(resolvePath("/m/synthetic-link/snags/abc", paths).private, true);
  for (const path of [
    "/m/",
    "/missing",
    "/snagging-app/unknown",
    "/pricing/extra",
  ])
    assert.equal(resolvePath(path, paths), null);
});
test("public output and trailing slash redirect are explicit", () => {
  assert.deepEqual(resolvePath("/pricing", paths), {
    status: 200,
    file: "pricing/index.html",
  });
  assert.deepEqual(resolvePath("/pricing/", paths), {
    status: 308,
    location: "/pricing",
  });
});
test("indexing requires explicit production release flag and is never enabled on Vercel previews", () => {
  assert.equal(releaseIndexable({}), false);
  assert.equal(
    releaseIndexable({ INDEX_PUBLIC_SITE: "true", VERCEL_ENV: "preview" }),
    false,
  );
  assert.equal(
    releaseIndexable({ INDEX_PUBLIC_SITE: "true", VERCEL_ENV: "production" }),
    true,
  );
});

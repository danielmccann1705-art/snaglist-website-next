// The release route for the public website: `npm run release -- <proof.json>`.
//
// 1. Deletes build/ and builds fresh (INDEX_PUBLIC_SITE is passed through unchanged).
// 2. Runs the typecheck and the whole test suite against that fresh output.
// 3. Refuses unresolved required content in the built pages (open screenshot slots,
//    legal placeholders) and open slots still registered in the screenshot brief,
//    whether or not indexing is enabled. noindex is not publication protection.
// 4. Refuses if the manager portal the site links to does not answer, or if the working
//    tree has uncommitted changes (the upload proof names one commit).
// 5. Only then writes build/release-stamp.json and the Cloudflare upload proof through
//    scripts/prepare-cloudflare-assets.mjs, which refuses any build without that stamp.
//
// A preview stays separate: `npm run build:preview` then `npm run preview` serves a
// noindex build locally. It is never an upload candidate.
import { spawnSync } from "node:child_process";
import { rm, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { CLIENT, STAMP, unresolvedContent, hashTree, headCommit, workingTreeChanges, portalAnswers } from "./release-gates.mjs";
import { screenshotSlots } from "../app/content/screenshot-slots.ts";
import { PORTAL, PORTAL_SIGN_IN_AVAILABLE } from "../app/content/pages.ts";

const output = process.argv[2];
if (!output) throw new Error("Pass the upload proof path outside build/, e.g. npm run release -- ../release-proof.json");
if (path.resolve(output).startsWith(path.resolve("build") + path.sep)) throw new Error("Keep the upload proof outside build/.");

const results = [];
const record = (name, problems) => {
  results.push({ name, passed: problems.length === 0, problems });
  console.log(`${problems.length ? "FAIL" : "pass"}  ${name}`);
  for (const p of problems) console.log(`      ${p}`);
};
const run = (name, command, args) => {
  console.log(`\n$ ${[command, ...args].join(" ")}`);
  const r = spawnSync(command, args, { stdio: "inherit", env: process.env });
  record(name, r.status === 0 ? [] : [`exit ${r.status ?? r.signal}`]);
  return r.status === 0;
};

await rm(path.resolve("build"), { recursive: true, force: true });
const indexing = process.env.INDEX_PUBLIC_SITE === "true" ? "enabled" : "disabled";
console.log(`Release checks: fresh build, indexing ${indexing}. The content gates apply either way.`);
run("typecheck", "npm", ["run", "typecheck"]);
const built = run("fresh build", "npm", ["run", "build"]);
if (built) run("tests against the fresh build", "npm", ["test"]);
else record("tests against the fresh build", ["not run: the build failed"]);

console.log("");
record("no unresolved content in the built pages", built ? await unresolvedContent() : ["not checked: the build failed"]);
record(
  "no open slots in the screenshot brief",
  Object.entries(screenshotSlots).map(([id, s]) => `${id} (${s.page}) still needs its capture`),
);
if (PORTAL_SIGN_IN_AVAILABLE) {
  const portal = await portalAnswers(PORTAL);
  record(`manager portal ${PORTAL} answers`, portal ? [portal] : []);
} else {
  // The tests above verify the pre-launch notice and absence of portal links
  // in every public page. Do not advertise a destination that is not enabled.
  record("portal entrance intentionally unavailable until the iOS update", []);
}
const changes = workingTreeChanges();
record("working tree matches a commit", changes ? changes.split("\n").map((l) => `uncommitted: ${l.trim()}`) : []);

const failed = results.filter((r) => !r.passed);
if (failed.length) {
  console.error(`\nRELEASE REFUSED: ${failed.length} of ${results.length} checks failed. No release stamp or upload proof written.`);
  process.exit(1);
}
const manifest = JSON.parse(await readFile(path.join(CLIENT, "route-manifest.json"), "utf8"));
await writeFile(
  STAMP,
  JSON.stringify({ sourceCommit: headCommit(), createdAt: new Date().toISOString(), indexable: manifest.indexable, checks: results, files: await hashTree() }, null, 2) + "\n",
);
console.log(`\nAll ${results.length} release checks passed. Stamp: ${STAMP}`);
const proof = spawnSync("node", ["scripts/prepare-cloudflare-assets.mjs", output], { stdio: "inherit" });
process.exit(proof.status ?? 1);

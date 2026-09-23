// Release gates shared by scripts/release.mjs and scripts/prepare-cloudflare-assets.mjs.
// They refuse unresolved required content whatever INDEX_PUBLIC_SITE says: a noindex
// build is still a public website once it is uploaded, so noindex is not publication
// protection.
import { readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import path from "node:path";

export const CLIENT = path.resolve("build/client");
// Written by scripts/release.mjs after every check has passed, outside build/client so
// it is never uploaded. prepare-cloudflare-assets.mjs refuses a build without it.
export const STAMP = path.resolve("build/release-stamp.json");

// Markers of content that must be resolved before release. Each renders visibly in a
// preview build so a draft can never be read as finished.
const MARKERS = [
  [/data-screenshot-slot="([^"]*)"/g, (m) => `open screenshot slot “${m[1]}”`],
  [/data-legal-placeholder/g, () => "unresolved legal placeholder"],
  [/\[\s*DAN\s*:/g, () => "unresolved “[DAN:” placeholder"],
];
export function findUnresolved(html) {
  const found = new Set();
  for (const [re, label] of MARKERS) for (const m of html.matchAll(re)) found.add(label(m));
  return [...found];
}

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(file)));
    else if (entry.name.endsWith(".html")) out.push(file);
  }
  return out;
}
// Every unresolved marker in the built pages, as "path  problem".
export async function unresolvedContent(root = CLIENT) {
  const problems = [];
  for (const file of (await htmlFiles(root)).sort())
    for (const p of findUnresolved(await readFile(file, "utf8")))
      problems.push(`/${path.relative(root, file).split(path.sep).join("/")}  ${p}`);
  return problems;
}

// SHA-256 of every file that would be uploaded, keyed by public path.
export async function hashTree(root = CLIENT) {
  const files = {};
  async function visit(dir) {
    for (const entry of (await readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = path.join(dir, entry.name);
      if (entry.name === ".vite") continue;
      if (entry.isDirectory()) await visit(file);
      else files["/" + path.relative(root, file).split(path.sep).join("/")] = createHash("sha256").update(await readFile(file)).digest("hex");
    }
  }
  await visit(root);
  return files;
}

// Read-only Git state (no optional locks, so a check never leaves an index lock behind).
const git = (...args) => execFileSync("git", ["--no-optional-locks", ...args], { encoding: "utf8" }).trim();
export const headCommit = () => git("rev-parse", "HEAD");
export const workingTreeChanges = () => git("status", "--porcelain=v1", "--untracked-files=all");

// The manager portal the header and footer link to must answer before the site that
// links to it is published.
export async function portalAnswers(origin) {
  try {
    const res = await fetch(origin + "/", { redirect: "manual", signal: AbortSignal.timeout(10000) });
    return res.status >= 200 && res.status < 400 ? null : `answered HTTP ${res.status}`;
  } catch (error) {
    return `did not answer (${error.cause?.code || error.name || "error"})`;
  }
}

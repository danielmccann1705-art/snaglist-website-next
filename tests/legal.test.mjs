// Checks on the built privacy policy and terms. These pages are what App Store
// Connect and the app's purchase screen point at, so their wording is checked in the
// output a visitor receives, not in the source.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = "build/client";
const html = (path) => readFileSync(`${root}${path}/index.html`, "utf8");

// The visible text of the legal document only: from its root element to the
// copyright line, with tags and React's text separators removed.
function documentText(page) {
  const source = html(page);
  const start = source.indexOf(`data-legal-document="${page.slice(1)}"`);
  const end = source.indexOf("All rights reserved.", start);
  assert.ok(start > 0 && end > start, `${page}: legal document not found in the build`);
  return source
    .slice(start, end)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}
function metaDescription(page) {
  const match = html(page).match(/<meta name="description" content="([^"]*)"/);
  assert.ok(match, `${page}: description missing`);
  return match[1];
}

const legalPages = ["/privacy", "/terms"];
const banned = [
  [/offline/i, "describes the app as offline"],
  [/planned/i, "describes a feature as planned"],
  [/v2\.0/i, "refers to v2.0 as a future version"],
  [/coming with/i, "describes a feature as coming"],
  [/not (yet )?available/i, "describes a feature as unavailable"],
  [/\bplatform\b/i, "uses “platform”"],
  [/AI-powered/i, "uses “AI-powered”"],
  [/estate OS/i, "uses “estate OS”"],
  [/magic[ -]?links?/i, "uses “magic link”"],
  [/!/, "contains an exclamation mark"],
];

// Option B of the deletion-timeframe derivation. Dan has not yet confirmed it (C1).
const deletionTimeframe =
  "When you delete your account it stops working straight away, and your name, email address and sign-in details are erased immediately. The photographs and files in your projects are then removed from storage in the background, and we complete every deletion within 30 days. The app shows a completion receipt once yours has finished.";

test("legal pages use no banned or pre-release wording", () => {
  for (const page of legalPages) {
    const text = documentText(page);
    for (const [pattern, reason] of banned)
      assert.ok(!pattern.test(text), `${page} ${reason}: ${text.match(pattern)?.[0]}`);
  }
});

test("legal page descriptions describe the current service", () => {
  for (const page of legalPages) {
    const description = metaDescription(page);
    for (const [pattern, reason] of banned)
      assert.ok(!pattern.test(description), `${page} description ${reason}: ${description}`);
  }
});

test("“Contractor link” keeps its exact casing", () => {
  for (const page of legalPages) {
    for (const [found] of documentText(page).matchAll(/contractor links?/gi))
      assert.match(found, /^Contractor links?$/, `${page}: “${found}”`);
  }
});

test("the privacy policy names every processor the service runs with", () => {
  const text = documentText("/privacy");
  for (const name of ["Cloudflare", "Neon", "Apple", "Google", "RevenueCat", "Resend", "Google Workspace", "Apple Maps"])
    assert.ok(text.includes(name), `processor missing: ${name}`);
});

test("the privacy policy prints the chosen deletion timeframe verbatim", () => {
  assert.ok(documentText("/privacy").includes(deletionTimeframe));
});

test("the privacy policy states the site-location facts and the Contractor link disclosure", () => {
  const text = documentText("/privacy");
  for (const fact of [
    "full precision",
    "Snaglist never reads your device’s location",
    "Anyone who has the link",
    "does not need a Snaglist account",
    "What it does not show",
    "“Former member”",
  ])
    assert.ok(text.includes(fact), `missing: ${fact}`);
  const source = html("/privacy");
  for (const anchor of ["contractor-links", "delete-your-account"])
    assert.ok(source.includes(`id="${anchor}"`), `anchor missing: ${anchor}`);
});

// Governing law is Dan's open decision L2 (review M8, 23 September 2026). Until he
// settles it the section is a placeholder, so the production-build guard refuses to
// publish it and the placeholder test below lists it. Replace this check with the
// settled sentence when the placeholder is resolved.
test("governing law stays a placeholder until Dan decides it (L2)", () => {
  const text = documentText("/terms");
  assert.ok(text.includes("[DAN: L2: governing law and courts]"), "governing-law placeholder missing");
  assert.ok(!/Ireland/.test(text), "the hard-coded Ireland governing law has come back");
});

// Fails, by design, until every [DAN: …] placeholder has been replaced with
// settled wording. An indexable production build also refuses to prerender them.
test("legal pages carry no unresolved [DAN: …] placeholder", () => {
  const unresolved = legalPages.flatMap((page) =>
    [...html(page).matchAll(/\[DAN: ([^\]]*)\]/g)].map(([, text]) => `${page}: ${text}`),
  );
  assert.deepEqual(unresolved, []);
});

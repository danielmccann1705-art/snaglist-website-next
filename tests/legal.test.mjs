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

// The visible text of one section of a built page, from the element carrying `id`
// to the end of its <section>.
function sectionText(page, id) {
  const source = html(page);
  const start = source.indexOf(`id="${id}"`);
  assert.ok(start > 0, `${page}#${id} is missing`);
  const end = source.indexOf("</section>", start);
  return source
    .slice(start, end)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

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

// Deletion (legal handoff §3.1-3.2, 23 September 2026). The request stops sign-in and
// clears the active profile; an encrypted Apple credential is kept until revocation
// succeeds, so nothing is "erased immediately"; and 30 days is an aim tied to a
// monitored process, never an unconditional promise.
test("the deletion disclosure says what the request does and makes no absolute promise", () => {
  const text = documentText("/privacy");
  for (const sentence of [
    "When your deletion request is accepted, your Snaglist account stops accepting sign-ins and your active account profile is removed.",
    "Cleanup of your personal workspace and stored files continues in the background.",
    "If you used Sign in with Apple, we retain an encrypted credential only while it is needed to revoke Snaglist’s access, and erase that credential when revocation succeeds.",
    "Your deletion reference lets you check progress.",
  ])
    assert.ok(text.includes(sentence), `missing: ${sentence}`);
  assert.ok(
    !/\b(?:erased|deleted|removed)\s+immediately\b|\bimmediately\s+(?:erased|deleted|removed)\b/i.test(text),
    "an absolute immediate-erasure claim has come back",
  );
  assert.ok(!/\bevery deletion within\b/i.test(text), "the universal deletion guarantee has come back");
  for (const [sentence] of text.matchAll(/[^.]*\bwithin 30 days\b[^.]*\./gi))
    assert.match(sentence.trim(), /^We aim to complete background deletion within 30 days\b/, `unconditional 30-day promise: ${sentence.trim()}`);
});

test("the rights section states the statutory response period and how an extension works", () => {
  const text = documentText("/privacy");
  assert.ok(text.includes("within one calendar month of receiving your request"), "one-month response period missing");
  assert.ok(
    text.includes("we may take up to two further months; if so, we will tell you within the first month and explain why"),
    "extension explanation missing",
  );
  assert.ok(!/withdraw consent/i.test(text), "no processing this policy describes relies on consent");
});

// Photographs (legal handoff §3.3). Checked against PrivateMediaController (the
// original is served behind project read access) and ContractorGrantController (a
// Contractor link serves only the processed rendition).
test("the photo disclosure says originals are kept and who can download them", () => {
  const text = documentText("/privacy");
  for (const sentence of [
    "We keep the original privately with the project.",
    "people with the required project access can also download the original, which may still contain that information.",
    "A Contractor link shows only processed copies, never an original.",
  ])
    assert.ok(text.includes(sentence), `missing: ${sentence}`);
  assert.ok(!/is ever shown to anyone/i.test(text), "the superseded “never shown” photo claim has come back");
});

test("the policy states Snaglist’s role, a legal basis per purpose and non-absolute provider wording", () => {
  const text = documentText("/privacy");
  assert.ok(text.includes("For that information we act as a data controller."), "role paragraph missing");
  assert.ok(text.includes("we process those records on its instructions to provide the service"), "processor role missing");
  for (const basis of ["contract", "legitimate interests", "legal obligation"])
    assert.ok(text.includes(basis), `legal basis missing: ${basis}`);
  assert.ok(!/process information only on our instructions/i.test(text), "absolute provider wording has come back");
  assert.ok(text.includes("protect it at least as well as this policy does"), "equal-protection statement (5.1.1(i)) missing");
  assert.ok(text.includes("for its own purposes"), "providers’ own purposes not acknowledged");
});

// The provider's identity and the publication date each come from one source in
// pages/LegalPlaceholder.tsx, so the two pages cannot disagree. The company name Dan
// mentioned is unverified and the App Store seller is his individual account: until
// both are settled, no company name may reach either page.
test("both legal pages name the same provider and carry the same date", () => {
  const provider = (page) => documentText(page).match(/provided by (.+?) \(“Snaglist”/)?.[1];
  const version = (page) =>
    html(page)
      .match(/data-legal-version[^>]*>([\s\S]*?)<\/p>/)?.[1]
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  for (const [label, read] of [["provider", provider], ["publication date", version]]) {
    const [privacy, terms] = legalPages.map(read);
    assert.ok(privacy && terms, `${label} not found on both pages`);
    assert.equal(terms, privacy, `${label} differs between /privacy and /terms`);
  }
  for (const page of legalPages)
    assert.ok(!/\bReeve\b/.test(documentText(page)), `${page}: an unverified company name is on the page`);
});

// The Contractor link page's notice links here (/terms#contractor-links). The section
// must work on its own for someone with no account.
test("the terms carry the Contractor link section for people without an account", () => {
  const text = sectionText("/terms", "contractor-links");
  for (const fact of [
    "If you use a Contractor link without an account",
    "You do not need an account",
    "Upload only information you have permission to share.",
    "you authorise it to be added to the project",
    "Submission does not itself mean the work has been accepted.",
    "it cannot recall copies already saved or reports already sent",
  ])
    assert.ok(text.includes(fact), `missing from /terms#contractor-links: ${fact}`);
  assert.ok(html("/privacy").includes('href="/terms#contractor-links"'), "/privacy does not link the Contractor link terms");
});

// Terms §§8-10 (legal handoff §7): no blanket exclusions, no invented liability cap,
// no "continued use accepts any change", and the plain service description.
test("the terms use fair wording, keep consumer rights and invent no liability cap", () => {
  const text = documentText("/terms");
  for (const [pattern, reason] of [
    [/["“]as is["”]/i, "an “as is” disclaimer"],
    [/merchantability/i, "a merchantability disclaimer"],
    [/not liable for any loss arising from service downtime/i, "the downtime exclusion"],
    [/indirect, incidental, special, consequential/i, "the sweeping indirect-loss exclusion"],
    [/continued use[^.]*constitutes acceptance/i, "continued use as acceptance of any change"],
    [/liabilit[^.]*(?:£|\$|€)\s?\d/i, "a liability cap amount"],
  ])
    assert.ok(!pattern.test(text), `the terms contain ${reason}`);
  for (const fact of [
    "Nothing in these Terms removes rights or remedies that the law gives you.",
    "it is not an independent inspection, building-control approval or warranty from Snaglist",
    "You or the relevant rights holder keep ownership",
    "It does not give us permission to use your project content in advertising.",
  ])
    assert.ok(text.includes(fact), `missing: ${fact}`);
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

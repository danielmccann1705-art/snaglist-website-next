import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { pages, COMPANY_PLANS, PORTAL } from "../app/content/pages.ts";
import {
  screenshotSlots,
  productCaptures,
  removedSlots,
  CAPTURE_WIDTHS,
} from "../app/content/screenshot-slots.ts";
import { findUnresolved } from "../scripts/release-gates.mjs";

// Copy rules for the public site. The site describes Snaglist 2.0 as a product that
// exists, in the agreed voice, with the agreed prices and no placeholders. The tests
// read the built HTML (what ships) and the marketing source (for copy that renders
// only after hydration). Run `npm run build` first.

const root = "build/client";
const LEGAL = ["/privacy", "/terms"];
const MARKETING = [...Object.keys(pages).filter((p) => !LEGAL.includes(p)), "/404"];
const htmlFile = (path) =>
  root + (path === "/" ? "/index.html" : path === "/404" ? "/404.html" : path + "/index.html");
const built = (path) => readFileSync(htmlFile(path), "utf8");

// Marketing source files. The legal page bodies belong to the legal pages and are
// checked separately below.
const MARKETING_SOURCES = [
  "app/content/pages.ts",
  "app/content/screenshot-slots.ts",
  "app/components/Site.tsx",
  "app/components/Brand.tsx",
  "app/components/ScreenshotSlot.tsx",
  "app/components/ProductShot.tsx",
  "app/components/ExampleRecord.tsx",
  "app/routes/public.tsx",
  "app/routes/not-found.tsx",
  "app/routes/contractor.tsx",
  "app/root.tsx",
];
const LEGAL_SOURCES = ["pages/Privacy.tsx", "pages/Terms.tsx"];

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
// What a person or a search result can read: body text, the title and the readable
// attributes. Scripts, styles and URLs are not copy.
export function visibleText(html) {
  const attrs = [
    ...html.matchAll(/\s(?:content|alt|aria-label|title|placeholder)="([^"]*)"/g),
  ].map((m) => m[1]);
  const body = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return decode([body, ...attrs].join(" "))
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\s+/g, " ");
}

// Rules for every public page, legal pages included.
const ALWAYS = [
  ["banned word “platform”", /\bplatforms?\b/i],
  ["banned phrase “AI-powered”", /\bAI[\s-]?powered\b/i],
  ["banned phrase “estate OS”", /\bestate\s?OS\b/i],
  ["banned phrase “magic link”", /\bmagic[\s-]?links?\b/i],
  ["stale “planned for v2.0”", /\bplanned\s+(?:for\s+)?(?:snaglist\s+)?v?2\.0\b/i],
  ["stale “coming with v2.0”", /\bcoming\s+(?:with|in)\s+(?:snaglist\s+)?v?2\.0\b/i],
  ["stale “not yet available”", /\bnot\s+yet\s+available\b/i],
  ["stale “not available today”", /\bnot\s+available\s+(?:today|in\s+the\s+current\s+app)\b/i],
  // Dan's ruling (23 September 2026): no "coming soon", "coming later" or "soon", matching
  // the app and the store listing.
  ["later-release promise “coming soon”", /\bcoming\s+(?:soon|later)\b|\bsoon\b/i],
  ["unfinished “[DAN:” placeholder", /\[\s*DAN\s*:/i],
  ["unfinished placeholder", /\b(?:TODO|TBC|TBD|FIXME)\b|lorem ipsum/],
  ["unmeasured timing claim", /\b\d+\s*(?:seconds?|secs?)\b|\bin\s+seconds\b/i],
  ["time-saved claim", /\bhours?\s+saved\b|\bsaves?\s+(?:you\s+)?(?:time|hours|\d+)|\btime[\s-]sav(?:ed|ing|er)\b/i],
  ["unmeasured tap count", /\b(?:one|two|three|four|five|\d+)[\s-]taps?\b/i],
  ["unevidenced speed claim", /\b(?:fastest|instantly)\b/i],
  ["exclusivity claim", /\bthe\s+only\s+(?:snagging\s+)?(?:app|tool)\b|\bonly\s+app\s+(?:that|which|to)\b|\bno\s+other\s+app\b|\ball\s+other\s+apps\b|\bunlike\s+(?:any|every)\s+other\b/i],
  ["star rating", /[★☆]|\b\d(?:\.\d)?\s*(?:out\s+of\s+5\s*)?stars?\b|\brated\s+\d/i],
  ["user-count claim", /\b455(?:,?000|k)?\b|\b\d+(?:[,.]\d+)*\s*k?\+?\s+(?:users|customers|downloads|site managers|companies)\b|\b(?:thousands|hundreds|millions)\s+of\s+(?:users|customers|site managers|builders)\b/i],
  ["company price model", /\bper\s+(?:extra\s+)?(?:seat|user)\b|£[\d.,]+[^.£]{0,40}\bseats?\b/i],
  ["unconfirmed trial", /\bfree\s+trial\b|\b\d+[\s-]day\s+trial\b/i],
];
// Marketing pages: the site describes a product that exists.
const MARKETING_ONLY = [
  ["“v2.0” on a marketing page", /\bv2\.0\b/i],
  ["“planned” on a marketing page", /\bplanned\b/i],
  ["“forthcoming” or “upcoming” feature", /\b(?:forthcoming|upcoming)\b/i],
  ["“release date” language", /\brelease\s+date\b/i],
  ["1.2-era “current app” framing", /\bcurrent\s+(?:live\s+|offline\s+)?(?:snaglist\s+)?app\b/i],
  ["unevidenced “straight away”", /\bstraight\s+away\b/i],
  ["Free figure that differs from the agreed offer", /\b(?:two|three|2|3)\s+projects\b|\b(?:ten|10)\s+Contractor\s+links\b|\b50\s+snags\b/i],
];
// Rules for what a reader sees, not for source code, where "!" is an operator.
const READER_ONLY = [
  ["exclamation mark", /!/],
  ["American spelling", /\b(?:colors?|center(?:s|ed)?|organiz\w*|analyz\w*|favorite\w*|behavior\w*|gray|canceled|canceling|catalog|fulfill)\b/i],
];
const ALLOWED_PRICES = new Set(["£0", "£14.99", "£119.99"]);

export function violations(text, scope, { source = false } = {}) {
  const rules = [...ALWAYS, ...(scope === "legal" ? [] : MARKETING_ONLY), ...(source ? [] : READER_ONLY)];
  const found = [];
  for (const [label, re] of rules) {
    const m = text.match(re);
    if (m) found.push(`${label}: “${m[0]}”`);
  }
  for (const m of text.matchAll(/£\s?\d[\d,]*(?:\.\d+)?/g)) {
    const price = m[0].replace(/\s/g, "");
    if (!ALLOWED_PRICES.has(price)) found.push(`unapproved price: “${m[0]}”`);
  }
  // Dan's standing instruction: the feature is “Contractor link”, exactly.
  // Source text wraps across lines, so compare with its whitespace collapsed.
  for (const m of text.matchAll(/\bcontractor\s+links?\b/gi)) {
    const phrase = m[0].replace(/\s+/g, " ");
    if (!/^Contractor links?$/.test(phrase)) found.push(`casing: “${phrase}” should be “Contractor link”`);
  }
  return found;
}
const report = (problems) => "\n  " + problems.join("\n  ");

test("the copy rules catch what they exist for and pass the approved sentences", () => {
  for (const bad of [
    "Send Magic Links to your trades",
    "Logged in 5 seconds",
    "10+ hours saved every week",
    "Online services are coming with v2.0",
    "Paid company plans are coming soon.",
    "Uploading older projects to your account is coming soon.",
    "Coming soon: Android",
    "Company plans are coming later.",
    "Your account stops working as soon as the request is accepted.",
    "Contractor links are planned for v2.0",
    "This feature is not yet available",
    "Provided by [DAN: legal entity]",
    "An AI-powered platform",
    "Your estate OS",
    "Trusted by 455,000 users",
    "Rated 4.8 stars",
    "Three taps to a snag",
    "Start a £495 pilot",
    "£1,788 a year",
    "£49 a month for three seats",
    "£12 per extra seat",
    "Send a contractor link",
    "Free: three projects and ten Contractor links a month",
    "Get started today!",
    "Pick a color for your report",
  ])
    assert.ok(violations(bad, "marketing").length > 0, `not caught: ${bad}`);
  for (const good of [
    COMPANY_PLANS,
    "Trades open a link. No account.",
    "Snaglist Free covers one project, 20 snags per project, five photos per snag and five Contractor links a month.",
    "Snaglist Pro is £14.99 a month or £119.99 a year in the UK.",
    "Projects from an earlier version stay on the device they were made on and are not uploaded to your account.",
    "Your account stops working once the request is accepted.",
    "Snags closed in an earlier version show Legacy closure — unverified.",
    "A link expires after the period you choose, up to 90 days.",
    "If you used Snaglist before version 2.0, your earlier projects stay on your device.",
    "5. Companies",
    "Choose a colour for your report.",
  ])
    assert.deepEqual(violations(good, "marketing"), [], good);
});

test("marketing pages carry no banned words, stale v2.0 phrases, unmeasured claims, unapproved prices or placeholders", () => {
  const problems = [];
  for (const path of MARKETING)
    for (const v of violations(visibleText(built(path)), "marketing")) problems.push(`${path}  ${v}`);
  assert.deepEqual(problems, [], report(problems));
});

test("marketing source carries none of them either, including copy that renders only after hydration", () => {
  const problems = [];
  for (const file of MARKETING_SOURCES)
    for (const v of violations(readFileSync(file, "utf8"), "marketing", { source: true }))
      problems.push(`${file}  ${v}`);
  assert.deepEqual(problems, [], report(problems));
});

test("legal pages (/privacy, /terms) carry no banned words, stale v2.0 phrases or [DAN: placeholders", () => {
  const problems = [];
  for (const path of LEGAL)
    for (const v of violations(visibleText(built(path)), "legal")) problems.push(`${path}  ${v}`);
  for (const file of LEGAL_SOURCES)
    for (const v of violations(readFileSync(file, "utf8"), "legal", { source: true }))
      problems.push(`${file}  ${v}`);
  assert.deepEqual(problems, [], report(problems));
});

test("the four Free limits appear together wherever one is stated, and pricing carries the approved company sentence", () => {
  const limits = [
    /\bone project\b/i,
    /\b20 snags per project\b/i,
    /\bfive photos per snag\b/i,
    /\bfive Contractor links a month\b/i,
  ];
  for (const path of MARKETING) {
    const text = visibleText(built(path));
    const shown = limits.filter((re) => re.test(text)).length;
    assert.ok(shown === 0 || shown === limits.length, `${path} states ${shown} of the ${limits.length} Free limits`);
  }
  const pricing = visibleText(built("/pricing"));
  assert.ok(limits.every((re) => re.test(pricing)), "/pricing must state all four Free limits");
  assert.ok(pricing.includes(COMPANY_PLANS), "/pricing must carry the approved company sentence verbatim");
  for (const price of ["£14.99", "£119.99"]) assert.ok(pricing.includes(price), `/pricing must show ${price}`);
});

test("support carries the delete-account and older-work anchors and the legacy closure label", () => {
  const html = built("/support");
  for (const id of ["delete-account", "older-work", "contractor-links"])
    assert.ok(html.includes(`id="${id}"`), `/support#${id} is missing`);
  assert.ok(visibleText(html).includes("Legacy closure — unverified"), "legacy closure label is missing or reworded");
});

function placedSlots() {
  const placed = new Map();
  for (const path of MARKETING)
    for (const [, id] of built(path).matchAll(/data-screenshot-slot="([^"]+)"/g))
      placed.set(id, [...(placed.get(id) || []), path]);
  return placed;
}

test("screenshot slots: every placeholder in the build has a brief, and every brief is placed once", () => {
  const placed = placedSlots();
  for (const [id, paths] of placed) {
    const spec = screenshotSlots[id];
    assert.ok(spec, `slot ${id} on ${paths.join(", ")} has no entry in app/content/screenshot-slots.ts`);
    assert.deepEqual(paths, [spec.page.split("#")[0]], `slot ${id} should appear once, on ${spec.page}`);
    assert.ok(spec.shows.length > 40 && spec.alt && spec.device, `slot ${id} needs a device, a brief and alt text`);
  }
  for (const id of Object.keys(screenshotSlots))
    assert.ok(placed.has(id), `slot ${id} is registered but not on any page`);
  for (const id of Object.keys(removedSlots)) {
    assert.ok(!screenshotSlots[id], `slot ${id} is recorded as removed but is still in the brief`);
    assert.ok(!placed.has(id), `slot ${id} was removed on purpose but is back on ${placed.get(id)}`);
  }
});

test("real captures: placed where listed, with declared size, alt text, lazy loading below the fold and every variant built", () => {
  for (const [id, c] of Object.entries(productCaptures)) {
    assert.ok(!screenshotSlots[id], `${id} is filled, so its slot entry should be deleted`);
    assert.match(c.sha256, /^[0-9a-f]{64}$/, `${id} needs its source SHA-256`);
    assert.ok(c.alt.length > 40 && c.shows.length > 40, `${id} needs a description and alt text`);
    for (const w of CAPTURE_WIDTHS)
      assert.ok(existsSync(`${root}/screenshots/${id}-${w}.webp`), `${id}: missing ${id}-${w}.webp`);
    assert.ok(existsSync(`${root}/screenshots/${id}-720.png`), `${id}: missing ${id}-720.png`);
    for (const path of c.pages) {
      const html = built(path);
      const figure = html.match(new RegExp(`<figure[^>]*data-product-capture="${id}"[\\s\\S]*?</figure>`));
      assert.ok(figure, `${id} is listed for ${path} but not placed there`);
      const img = figure[0].match(/<img\b[^>]*>/)[0];
      const attr = (name) => img.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
      assert.equal(decode(attr("alt") || ""), c.alt, `${id} on ${path}: alt text`);
      assert.equal(Number(attr("width")), CAPTURE_WIDTHS[0], `${id} on ${path}: declared width`);
      assert.equal(Number(attr("height")), Math.round((c.height * CAPTURE_WIDTHS[0]) / c.width), `${id} on ${path}: declared height`);
      assert.ok(["lazy", "eager"].includes(attr("loading")), `${id} on ${path}: loading attribute`);
    }
  }
  // Only the first capture on a page loads eagerly; everything after it is lazy.
  for (const path of MARKETING) {
    const loads = [...built(path).matchAll(/data-product-capture="[^"]+"[\s\S]*?<img\b[^>]*\sloading="(\w+)"/g)].map((m) => m[1]);
    loads.slice(1).forEach((l, i) => assert.equal(l, "lazy", `${path}: capture ${i + 2} should load lazily`));
  }
});

test("the homepage leads with the Contractor link and keeps the brand line lower down", () => {
  const html = built("/");
  const h1 = visibleText(html.match(/<h1\b[\s\S]*?<\/h1>/)[0]).trim();
  assert.equal(h1, "Send the work. Skip the sign-up.");
  const text = visibleText(html);
  assert.ok(text.includes("Contractors open it in a browser. No app or account needed."), "no-account line missing");
  const brand = text.indexOf("Walk the job. Mark the snags. Hand over the record.");
  assert.ok(brand > text.indexOf(h1), "the brand line should stay on the page, below the hero");
  assert.ok(!/floor[\s-]plan/i.test(text.slice(0, brand)), "floor plans should not lead the homepage");
});

test("every marketing page gives the manager portal a Sign in entrance in the header and the footer", () => {
  for (const path of MARKETING) {
    const html = built(path);
    const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] || "";
    const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] || "";
    assert.ok(header.includes(`href="${PORTAL}"`) && />Sign in</.test(header), `${path}: header Sign in link`);
    assert.ok(footer.includes(`href="${PORTAL}"`), `${path}: footer portal link`);
  }
  assert.ok(visibleText(built("/")).includes("The portal does not offer Sign in with Apple."), "home must state the portal sign-in limit");
});

test("the release gate finds unresolved content whether or not the page is noindex", () => {
  const noindex = '<meta name="robots" content="noindex, nofollow"/>';
  assert.deepEqual(findUnresolved(`${noindex}<figure data-screenshot-slot="link-create"></figure>`), ["open screenshot slot “link-create”"]);
  assert.ok(findUnresolved(`${noindex}<mark data-legal-placeholder="">[DAN: company number]</mark>`).length === 2);
  assert.deepEqual(findUnresolved('<figure data-product-capture="home-hero"><img alt="x"/></figure>'), []);
});

test("RELEASE GATE: every screenshot slot is filled with a real 2.0 capture", () => {
  const open = [...placedSlots().keys()].map((id) => {
    const s = screenshotSlots[id] || { page: "?", device: "?", shows: "(unregistered)" };
    return `${id} (${s.page}) · ${s.device}: ${s.shows}`;
  });
  assert.equal(
    open.length,
    0,
    `${open.length} screenshot slot(s) still hold placeholders. Capture on the acceptance run before release:` +
      report(open),
  );
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PORTAL_SIGN_IN_AVAILABLE } from "../app/content/pages.ts";

const html = (path) => readFileSync(`build/client/${path}/index.html`, "utf8");
const text = (path) =>
  html(path)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

test("published legal pages state today's scope, operator, contact and publication date", () => {
  for (const page of ["privacy", "terms"]) {
    const content = text(page);
    for (const fact of [
      "24 September 2026",
      "Reeve Technologies Ltd",
      "17150847",
      "registered office is 66 Paul Street, London, EC2A 4NA, United Kingdom",
      "support@usesnaglist.com",
      "Screens on this website preview that update",
    ])
      assert.ok(content.includes(fact), `${page}: missing ${fact}`);
    assert.ok(html(page).includes('data-service-phase="prelaunch"'));
    assert.doesNotMatch(content, /\[DAN:|TODO|TBC|TBD/);
    assert.doesNotMatch(content, /support@snaglist\.(dev|app)/);
  }
});

test("portal activation cannot retain the pre-launch policy unnoticed", () => {
  assert.equal(
    PORTAL_SIGN_IN_AVAILABLE,
    false,
    "Online launch needs the settled online policies, privacy review and updated legal acceptance tests first",
  );
});

test("privacy names actual device services, operational requests and current providers", () => {
  for (const fact of [
    "RevenueCat",
    "Cloudflare",
    "Google Workspace",
    "Apple Maps",
    "speech recognition",
    "performance and crash diagnostics",
    "may attempt to send",
    "random app-installation identifier",
    "legitimate interests",
    "performing our contract",
    "legal obligation",
  ])
    assert.ok(text("privacy").includes(fact), `privacy: missing ${fact}`);
  assert.doesNotMatch(
    text("privacy"),
    /We use no analytics|stored in (?:Neon|R2)|all data stays in the UK/,
  );
});

test("privacy gives deletion help without an inactive account-deletion or deadline promise", () => {
  for (const fact of [
    "if an older in-app account-deletion control fails",
    "We do not promise one automatic deletion deadline",
    "Removing the app does not cancel an Apple subscription",
    "Your device or iCloud backup may include app data",
  ])
    assert.ok(text("privacy").includes(fact));
  assert.ok(html("privacy").includes('id="delete-your-account"'));
  assert.doesNotMatch(
    text("privacy"),
    /We aim to complete background deletion within 30 days/,
  );
});

test("privacy explains rights, retention criteria, transfers and complaints", () => {
  for (const fact of [
    "whether it remains open",
    "outside the UK",
    "UK addendum",
    "one calendar month",
    "up to two further months",
    "You can object",
    "Information Commissioner",
  ])
    assert.ok(text("privacy").includes(fact), `missing ${fact}`);
});

test("terms preserve consumer rights, content ownership and the Apple purchase boundary", () => {
  for (const fact of [
    "Nothing in these Terms removes rights or remedies",
    "You or the relevant rights holder keep ownership",
    "does not give us permission to use your project content in advertising",
    "does not change that listing",
    "Restore Purchases",
    "does not cancel an Apple subscription",
  ])
    assert.ok(text("terms").includes(fact), `missing ${fact}`);
  assert.doesNotMatch(
    text("terms"),
    /liabilit[^.]*(?:£|€|\$)\s?\d|continued use[^.]*constitutes acceptance|Ireland/,
  );
  assert.ok(html("terms").includes('id="contractor-links"'));
});

test("unlaunched online policies are not shipped in the public HTML", () => {
  assert.doesNotMatch(
    text("privacy"),
    /When your deletion request is accepted|encrypted credential|Neon|Resend/,
  );
  assert.doesNotMatch(text("terms"), /\[DAN:/);
});

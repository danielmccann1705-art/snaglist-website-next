import { test } from "node:test";
import assert from "node:assert/strict";
import { track } from "../app/lib/analytics.ts";
test("website events omit query strings, tokens and user input", () => {
  const events = [];
  globalThis.window = {
    location: { pathname: "/pricing", search: "?email=private@example.test" },
    dispatchEvent: (event) => events.push(event.detail),
  };
  track("app_store_click", "header");
  assert.deepEqual(events, [
    {
      name: "app_store_click",
      properties: { page: "/pricing", placement: "header" },
    },
  ]);
  track("app_store_click", "private-token");
  track("template_download_click", "template", "customer-report.pdf");
  assert.equal(events.length, 1);
  delete globalThis.window;
});
test("private routes expose only the completion acquisition event with a neutral page label", () => {
  const events = [];
  globalThis.window = {
    location: { pathname: "/m/secret-customer-token" },
    dispatchEvent: (event) => events.push(event.detail),
  };
  track("app_store_click", "header");
  track("contractor_get_app_click", "completion");
  assert.deepEqual(events, [
    {
      name: "contractor_get_app_click",
      properties: { page: "contractor_completion", placement: "completion" },
    },
  ]);
  delete globalThis.window;
});

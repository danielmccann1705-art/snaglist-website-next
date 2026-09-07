// Integration boundary for the existing analytics system. No SDK, network request,
// cookie, identifier or automatic pageview is installed by the website update.
// An approved host adapter can subscribe to this event after consent where required.
import { pages } from "../content/pages.ts";
export type MarketingEvent =
  | "app_store_click"
  | "template_download_click"
  | "workflow_step_viewed"
  | "contractor_get_app_click";
const placements = new Set([
  "body",
  "header",
  "final",
  "hero",
  "free-plan",
  "pro-plan",
  "contractor-intro",
  "template",
  "record",
  "completion",
]);
const assets = new Set([
  "snag-list-template.xlsx",
  "snag-list-template.pdf",
  "snag-list-worked-example.pdf",
  "capture",
  "share",
  "review",
]);
export function track(name: MarketingEvent, placement: string, asset?: string) {
  if (typeof window === "undefined") return;
  if (!placements.has(placement) || (asset && !assets.has(asset))) return;
  const privateRoute = window.location.pathname.startsWith("/m/");
  if (privateRoute && name !== "contractor_get_app_click") return;
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const page = privateRoute
    ? "contractor_completion"
    : pages[path]
      ? path
      : "unknown";
  const detail = {
    name,
    properties: { page, placement, ...(asset ? { asset } : {}) },
  };
  window.dispatchEvent(new CustomEvent("snaglist:marketing-event", { detail }));
}

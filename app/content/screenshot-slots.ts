// Screenshot slots: the places on the public site that still need a real Snaglist 2.0
// capture. Until a slot is filled the page shows a visibly marked placeholder, and the
// release gate (tests/copy-rules.test.mjs and `npm run release`) fails and names every
// open slot. This list is the screenshot brief for what is still missing.
//
// To fill a slot: add the capture to `productCaptures` below (variants in
// public/screenshots, declared size, the alt text), replace its <ScreenshotSlot id="…" />
// with <ProductShot id="…" /> and delete its entry here. Never fill a slot with a
// drawing, a mock-up or a screen from an earlier version of the app, never paint or
// change anything inside a capture, and never show a working link, a real PIN, or a
// customer's name, address or photograph.
export type ScreenshotSlotSpec = {
  /** The page, and section where useful, that shows the slot. */
  page: string;
  /** What to capture on. */
  device: string;
  /** What the capture must show. */
  shows: string;
  /** Alt text for the finished image. */
  alt: string;
};
export const screenshotSlots: Record<string, ScreenshotSlotSpec> = {
  // Not 03-contractor-link-creation-light.png: that is the legacy share chooser.
  "link-create": {
    page: "/contractor-link",
    device: "iPhone, Snaglist 2.0",
    shows:
      "Creating a Contractor link: the chosen snags, the contractor, the expiry setting and the optional PIN, before the link is shared. No working link and no real PIN on screen.",
    alt: "Creating a Contractor link in Snaglist on iPhone",
  },
  "link-browser": {
    page: "/contractor-link",
    device: "Phone browser, with the browser’s own address bar and controls visible",
    shows:
      "What the trade sees after opening a Contractor link: an assigned demo snag with its location, description and photo, and the control for adding a completion photo. No sign-in or account prompt. The address bar must not show a working link.",
    alt: "A Contractor link open in a phone browser, showing an assigned snag",
  },
  // Not 06-current-report-photo-page.png: its snag reads Awaiting approval, so it
  // cannot stand for an accepted fix.
  "report-with-fix": {
    page: "/features#reports",
    device: "PDF page exported from Snaglist 2.0",
    shows:
      "One page of a real exported PDF report: a snag’s reference, location and status, its original photo and the completion photo a manager accepted. Check the status on the page reads as accepted, and that any snag still awaiting review is labelled as such. Demo project only.",
    alt: "A Snaglist PDF report page showing a snag and its accepted completion photo",
  },
};

// Real Snaglist 2.0 captures now on the site. Each is an untouched native capture from
// the 23 September 2026 App Store capture set (outputs/app-store-2026-09-23/captures/
// iphone), resized only: public/screenshots/<id>-{360,720,1080}.webp and <id>-720.png.
// Synthetic data (Willow Mews · Plot 3, WM3-01). The components shown were unchanged
// between the capture base (iOS 8ab883b) and the 2.0 candidate checked on 23 September
// (6199c5a). A capture is product artwork, not evidence of production acceptance.
export type ProductCapture = {
  /** The pages that show the capture. */
  pages: string[];
  /** The raw capture it was resized from, and that file's SHA-256. */
  source: string;
  sha256: string;
  /** Native pixel size of the raw capture. */
  width: number;
  height: number;
  /** What the capture shows, as it is: no status or UI has been altered. */
  shows: string;
  alt: string;
};
export const CAPTURE_WIDTHS = [360, 720, 1080] as const;
export const productCaptures: Record<string, ProductCapture> = {
  "home-hero": {
    pages: ["/", "/contractor-link"],
    source: "iphone/01-current-contractor-context.png",
    sha256: "cd6113919abe346cc79a35b150a153dc6cbda7256d1e80cf13c32440e96dd693",
    width: 1320,
    height: 2868,
    shows:
      "The snag screen in the iPhone app: the before photo of a door edge, reference WM3-01, Awaiting approval, the description, location and contractor, with Share with contractor and Edit snag at the foot.",
    alt: "Snaglist on iPhone: snag WM3-01, Repair chipped paint by the hinge, with its before photo, location Plot 3 ground-floor hallway, contractor Sam Carter and the Share with contractor button",
  },
  "link-review": {
    pages: ["/", "/contractor-link"],
    source: "iphone/04-current-manager-review.png",
    sha256: "d0da7d12839aed3caf960a97efa39941a267c54fb468a64f1a327a1e2192abf6",
    width: 1320,
    height: 2868,
    // Amended 23 September 2026: the original brief asked for the original snag beside
    // the submission. This screen does not show it; the brief now describes the screen.
    shows:
      "Review completion in the iPhone app: the contractor’s note and submission time, one after photo, and the manager’s Send back and Accept work buttons, captured before either is tapped. It shows a submission awaiting a decision, not a closure.",
    alt: "Snaglist on iPhone: Review completion, showing the contractor’s note, an after photo, and the Send back and Accept work buttons",
  },
};

// Slots removed on purpose, not filled. Kept here so the decision is visible and a
// page cannot quietly bring the placeholder back (tests/copy-rules.test.mjs).
export const removedSlots: Record<string, string> = {
  "floor-plan-pin":
    "Optional in the website handoff (§9). Floor-plan pins work only in projects kept on the device, with Pro, and new shared-drawing work is deferred, so floor plans moved out of the central 2.0 story (visual review §6). /floor-plans states the scope in words instead of a capture.",
};

// Screenshot slots: the places on the public site that need a real Snaglist 2.0
// capture. None exists yet; they are taken during the acceptance run on a device.
// Until a slot is filled the page shows a visibly marked placeholder, and the release
// gate in tests/copy-rules.test.mjs fails and names every open slot. This list is the
// screenshot brief.
//
// To fill a slot: replace its <ScreenshotSlot id="…" /> with the real capture (square
// corners, the `alt` below) and delete its entry here. Never fill a slot with a
// drawing, a mock-up or a screen from an earlier version of the app, and never show a
// working link, a real PIN, or a customer's name, address or photograph.
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
  "home-hero": {
    page: "/",
    device: "iPhone, Snaglist 2.0",
    shows:
      "One demo snag in the app: its photo, reference, room and precise location, with the action that sends it as a Contractor link in view. Demo project and demo photo only.",
    alt: "A snag in Snaglist on iPhone, with its photo, location and the Contractor link action",
  },
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
  "link-review": {
    page: "/contractor-link",
    device: "iPhone, Snaglist 2.0",
    shows:
      "A submission under Awaiting review: the trade’s completion photo and note beside the original snag, with Accept work and Send back in view. Captured before either is tapped, so it shows a submission and not a closure.",
    alt: "A completion photo awaiting review in Snaglist, with Accept work and Send back",
  },
  "floor-plan-pin": {
    page: "/floor-plans",
    device: "iPhone, Snaglist 2.0 with Pro",
    shows:
      "A demo snag pinned on a readable demo floor plan, with the selected pin, its reference and the room around it. Capture it in a demo project kept on the device only: pins cannot be added in a project saved to a workspace.",
    alt: "A snag pinned on a floor plan in Snaglist",
  },
  "report-with-fix": {
    page: "/features#reports",
    device: "PDF page exported from Snaglist 2.0",
    shows:
      "One page of a real exported PDF report: a snag’s reference, location and status, its original photo and the completion photo a manager accepted. Check the status on the page reads as accepted, and that any snag still awaiting review is labelled as such. Demo project only.",
    alt: "A Snaglist PDF report page showing a snag and its accepted completion photo",
  },
};

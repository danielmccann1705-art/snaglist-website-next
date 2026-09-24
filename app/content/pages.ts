export const ORIGIN = "https://usesnaglist.com";
export const APP_STORE = "https://apps.apple.com/gb/app/snaglist/id6758858102";
export const SUPPORT = "support@usesnaglist.com";
// The manager portal's production origin, exactly as the backend configures it
// (SnagLinkBackend Infrastructure/cloudflare/wrangler.portal-production.jsonc,
// PORTAL_ORIGIN). Enable the entrance only when the iOS update and production
// portal are live; the release check then requires the destination to answer.
export const PORTAL = "https://app.usesnaglist.com";
// Dan authorised this pre-launch state on 23 September 2026.
export const PORTAL_SIGN_IN_AVAILABLE = false;
export const PORTAL_PENDING_LABEL = "Sign in — coming soon";
export const ONLINE_LAUNCH_NOTE =
  "Contractor links and portal sign-in open when the iOS app update is live. You can use the app on your device now.";
export const OFFER = {
  monthly: "£14.99",
  annual: "£119.99",
};
// The Free allowance as Dan approved it for the public site (Drive offer), with the
// five-photo cap the app enforces disclosed (Dan's decision on review M2, 23 September
// 2026). Show all four together wherever pricing is explained.
export const FREE_LIMITS =
  "one project, 20 snags per project, five photos per snag and five Contractor links a month";
// Dan's approved company statement (decision A5), in the present tense with no promise
// of a later release, as Dan ruled for the app and the store listing (23 September 2026).
// The only company pricing statement the site may carry: no company price appears anywhere.
export const COMPANY_PLANS =
  "Company membership is free. Snaglist Pro remains a separate subscription.";
export type PageSpec = {
  title: string;
  description: string;
  heading: string;
  kind: string;
  intro?: string;
  role?: string;
  notes?: string[];
};
export const pages: Record<string, PageSpec> = {
  "/": {
    title: "Snagging app for site managers and builders | Snaglist",
    description:
      "Send the work. Skip the sign-up. Send each trade a Contractor link: they open it in a browser with no account or app, and send the completion photo for your review.",
    heading: "Send the work. Skip the sign-up.",
    kind: "home",
  },
  "/features": {
    title: "How Snaglist works: snags, Contractor links and reports",
    description:
      "Capture each snag with a photo and location, send the trade a Contractor link, review their completion photo and export the handover record.",
    heading: "From the site walk to the handover record",
    kind: "features",
  },
  "/contractor-link": {
    title: "Contractor link: trades open it with no account | Snaglist",
    description:
      "Send a Contractor link for the snags you choose. The trade opens it in a browser, with no account or app, and sends a completion photo for your review.",
    heading: "Send the snags. Get the fix back.",
    kind: "contractor",
  },
  "/floor-plans": {
    title: "Snagging app with floor-plan pins | Snaglist",
    description:
      "With Snaglist Pro, projects kept on your device can put each snag on a floor-plan pin with a photo, so the right place is easy to find on the next walk.",
    heading: "Put the snag where the work is",
    kind: "plans",
  },
  "/pricing": {
    title: "Snaglist pricing: Free and Pro for iPhone and iPad",
    description: `Snaglist Free covers ${FREE_LIMITS}. Snaglist Pro is ${OFFER.monthly} a month or ${OFFER.annual} a year in the UK.`,
    heading: "Start free. Check Pro when you need more.",
    kind: "pricing",
  },
  "/snag-list-template": {
    title: "Free snag list template: Excel and PDF | Snaglist",
    description:
      "Download a free snag list template in Excel or PDF. Record locations, trades, due dates, photos and completion evidence. Includes a worked example.",
    heading: "Free snag list template",
    kind: "template",
  },
  "/vs-site-audit-pro": {
    title: "Snaglist vs Site Audit Pro: workflow comparison",
    description:
      "Compare your Site Audit Pro workflow with Snaglist, where the trade opens a Contractor link with no account and sends the completion photo for review.",
    heading: "Snaglist and Site Audit Pro: which fits your workflow?",
    kind: "comparison",
    role: "Site Audit Pro",
  },
  "/vs-fieldwire": {
    title: "Snaglist and Fieldwire: choosing a snagging workflow",
    description:
      "Compare Snaglist’s snag records and no-account Contractor links with your site management needs, and check Fieldwire’s own features directly.",
    heading: "Choose the workflow your job needs",
    kind: "comparison",
    role: "Fieldwire",
  },
  "/comparison": {
    title: "Choosing a snagging app | Snaglist",
    description:
      "Check the capture, location, contractor handoff and review your job needs before you choose a snagging app, with a checklist for each step.",
    heading: "Start with the handoff you need",
    kind: "comparison-hub",
  },
  "/about": {
    title: "About Snaglist: built from site experience",
    description:
      "Why Daniel McCann built Snaglist after ten years in site management and quantity surveying: a snag list that reaches the trade and comes back with the fix.",
    heading: "Built by someone who has walked the job",
    kind: "about",
  },
  "/support": {
    title: "Snaglist help and support",
    description:
      "Help with Contractor links, reviewing completion photos, older work from an earlier version, deleting your account, reports and Apple subscriptions.",
    heading: "What do you need help with?",
    kind: "support",
  },
  "/privacy": {
    title: "Snaglist privacy policy",
    description:
      "How the released Snaglist app, this website, subscriptions and support handle your information. Online services open with the iOS update.",
    heading: "Privacy policy",
    kind: "privacy",
  },
  "/terms": {
    title: "Snaglist terms of service",
    description:
      "Terms for the released Snaglist app, website and Apple subscriptions, with the online service launch clearly explained.",
    heading: "Terms of service",
    kind: "terms",
  },
  "/snagging-app": {
    title: "Snagging workflows for construction roles | Snaglist",
    description:
      "Snag records for each role on a construction job, with Contractor links the trade opens in a browser and completion photos you review.",
    heading: "A clear record for everyone involved in the job",
    kind: "roles",
    role: "snagging-app",
  },
  "/punch-list-app": {
    title: "Punch lists and snag lists explained | Snaglist",
    description:
      "A punch list records work needing attention before handover. Snaglist sends it to the trade as a Contractor link and keeps their completion photo for review.",
    heading: "A punch list, from capture to completion",
    kind: "roles",
    role: "punch-list-app",
  },
};
const rolePages: [string, string, string, string[]][] = [
  [
    "snagging-app/site-managers",
    "site managers",
    "Keep a practical snag record from the site walk to handover.",
    [
      "Record the room and a precise location while you are there.",
      "Send each contractor a Contractor link for the snags that are theirs.",
      "Review completion evidence before accepting the work.",
    ],
  ],
  [
    "snagging-app/clerk-of-works",
    "clerks of works",
    "Keep observations traceable through the inspection record.",
    [
      "Give each observation its own reference and location.",
      "Describe the visible issue and attach a clear photograph.",
      "Record follow-up evidence separately from the original observation.",
    ],
  ],
  [
    "snagging-app/project-managers",
    "project managers",
    "Keep open work visible as the handover approaches.",
    [
      "Group the record by the actual project.",
      "Assign responsibility and a due date to each item.",
      "Keep work awaiting review separate from work a manager has accepted.",
    ],
  ],
  [
    "snagging-app/quantity-surveyors",
    "quantity surveyors",
    "Keep a factual snag record alongside the project information.",
    [
      "Use stable references when discussing outstanding work.",
      "Keep photos with the description and location.",
      "Use the report as a record; it does not determine valuation or contractual entitlement.",
    ],
  ],
  [
    "snagging-app/subcontractors",
    "subcontractors",
    "Open your assigned snags in a browser, with no account and no app.",
    [
      "Open the Contractor link the site manager sends you. If it has a PIN, they give you that separately.",
      "Check the location, description and photographs before starting.",
      "Add a completion photo and a note when the work is done. The site manager reviews it before the snag is closed.",
    ],
  ],
  [
    "snagging-app/property-developers",
    "property developers",
    "Keep the outstanding work for each plot easy to follow.",
    [
      "Identify the plot clearly when creating a project.",
      "Record individual issues with locations and photos.",
      "Review the outstanding work before preparing the handover record.",
    ],
  ],
  [
    "punch-list-app/general-contractors",
    "general contractors",
    "Make the remaining work understandable to each trade.",
    [
      "Give each item one clear description.",
      "Send each trade a Contractor link for its own items.",
      "Keep a trade’s submitted evidence separate from the closure a manager accepts.",
    ],
  ],
  [
    "punch-list-app/subcontractors",
    "subcontractors",
    "Open your punch list in a browser, with no account and no app.",
    [
      "Open the Contractor link the site manager sends you.",
      "The page shows only the items the site manager has chosen for you.",
      "Send a completion photo when the work is done. It waits for the manager’s review; it does not close the item by itself.",
    ],
  ],
  [
    "punch-list-app/superintendents",
    "superintendents",
    "Carry a usable record from the site walk to the trade handoff.",
    [
      "Capture a separate item for each issue.",
      "Add a precise location so the next person can find it.",
      "Keep any follow-up evidence with the local project record.",
    ],
  ],
  [
    "punch-list-app/project-managers",
    "project managers",
    "Keep the handover discussion tied to specific open items.",
    [
      "Use a consistent reference for every item.",
      "Keep responsibility and due dates visible.",
      "Use the report to discuss outstanding work.",
    ],
  ],
  [
    "punch-list-app/construction-managers",
    "construction managers",
    "Record observations on site and get the trade’s response back in the same record.",
    [
      "Record what needs attention at the point of inspection.",
      "Send the selected work to the trade as a Contractor link.",
      "Accept the work only when the returned evidence shows it is done.",
    ],
  ],
  [
    "punch-list-app/architects",
    "architects",
    "Keep observations and follow-up evidence in a clear record.",
    [
      "Identify the room and exact location.",
      "Describe the observation without relying on a photograph alone.",
      "Keep inspection notes distinct from formal instructions or certification.",
    ],
  ],
];
for (const [path, role, intro, notes] of rolePages)
  pages["/" + path] = {
    title: `${path.startsWith("punch") ? "Punch lists" : "Snag lists"} for ${role} | Snaglist`,
    description:
      role === "subcontractors"
        ? `${intro} The site manager reviews your completion photo before the item closes.`
        : `${intro} Send the trade a Contractor link; they open it with no account.`,
    heading: `${path.startsWith("punch") ? "Punch lists" : "Snag lists"} for ${role}`,
    kind: "role",
    role,
    intro,
    notes,
  };

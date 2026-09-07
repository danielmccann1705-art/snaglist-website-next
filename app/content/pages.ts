export const ORIGIN = "https://snaglist.dev";
export const APP_STORE = "https://apps.apple.com/gb/app/snaglist/id6758858102";
export const SUPPORT = "Snaglistapp@gmail.com";
export const OFFER = {
  monthly: "£14.99",
  annual: "£119.99",
  projects: 1,
  snags: 20,
  links: 5,
};
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
      "Log snags with photos and floor-plan pins. Send a contractor link for browser updates and completion photos. Download Snaglist for iPhone.",
    heading: "Snagging app for site managers and small builders",
    kind: "home",
  },
  "/features": {
    title: "How Snaglist works: photos, plans and reports",
    description:
      "Follow a snag from the site walk to the handover record. Capture photos, locate it on a plan, share with a contractor and review completion.",
    heading: "From the site walk to the handover record",
    kind: "features",
  },
  "/contractor-link": {
    title: "Send a snag list by contractor link | Snaglist",
    description:
      "Share assigned snags with a contractor. They open a browser link and submit completion photos without installing an app or creating an account.",
    heading: "The list is a link. The next step is clear.",
    kind: "contractor",
  },
  "/floor-plans": {
    title: "Snagging app with floor-plan pins | Snaglist",
    description:
      "Put each snag in context with a floor-plan pin and photo. Help the person doing the work find the right place and understand what needs attention.",
    heading: "Put the snag where the work is",
    kind: "plans",
  },
  "/pricing": {
    title: "Snaglist pricing: Free and Pro for iPhone",
    description:
      "Start with Snaglist Free. Pro is £14.99 a month or £119.99 billed annually. Compare project, snag and contractor-link allowances.",
    heading: "Start with one job. Step up when you need to.",
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
      "Compare the workflow you need for snagging, reporting and contractor handoff. Use a practical checklist to assess Snaglist and Site Audit Pro.",
    heading: "Snaglist and Site Audit Pro: which fits your workflow?",
    kind: "comparison",
    role: "Site Audit Pro",
  },
  "/vs-fieldwire": {
    title: "Snaglist and Fieldwire: choosing a snagging workflow",
    description:
      "Assess the snag capture, contractor access and completion review you need before choosing Snaglist or a wider site management platform.",
    heading: "Choose the workflow your job needs",
    kind: "comparison",
    role: "Fieldwire",
  },
  "/comparison": {
    title: "Choosing a snagging app | Snaglist",
    description:
      "What to check when choosing a snagging app: capture, location, contractor access, completion evidence and a useful handover report.",
    heading: "Start with the handoff you need",
    kind: "comparison-hub",
  },
  "/about": {
    title: "About Snaglist: built from site experience",
    description:
      "Why Daniel McCann built Snaglist after ten years in site management and quantity surveying. A practical record from snag capture to contractor handoff.",
    heading: "Built by someone who has walked the job",
    kind: "about",
  },
  "/support": {
    title: "Snaglist help: contractor links, reports and subscriptions",
    description:
      "Get help with Snaglist installation, contractor links, completion photos, reports and subscriptions. Contact the founder with a product question.",
    heading: "What do you need help with?",
    kind: "support",
  },
  "/privacy": {
    title: "Snaglist privacy policy",
    description:
      "Read the Snaglist privacy policy, including account information, project records, contractor links and how to contact us about your data.",
    heading: "Privacy policy",
    kind: "privacy",
  },
  "/terms": {
    title: "Snaglist terms of service",
    description:
      "Read the terms for using Snaglist, sharing contractor links and managing your subscription.",
    heading: "Terms of service",
    kind: "terms",
  },
  "/snagging-app": {
    title: "Snagging workflows for construction roles | Snaglist",
    description:
      "Explore how a snag record supports the site walk, contractor handoff and handover review across construction roles.",
    heading: "A clear record for everyone involved in the job",
    kind: "roles",
    role: "snagging-app",
  },
  "/punch-list-app": {
    title: "Punch lists and snag lists explained | Snaglist",
    description:
      "A punch list records work that needs attention before handover. See the fields to include and how Snaglist supports capture and contractor updates.",
    heading: "A punch list, from capture to completion",
    kind: "roles",
    role: "punch-list-app",
  },
};
const rolePages: [string, string, string, string[]][] = [
  [
    "snagging-app/site-managers",
    "site managers",
    "Keep the walk, trade handoff and review connected.",
    [
      "Record the room and a precise location while you are there.",
      "Share the relevant snags with the contractor responsible.",
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
      "Separate reported completion from work that has been reviewed.",
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
    "Open your assigned list and send evidence back.",
    [
      "Use the contractor link sent by the site manager.",
      "Check the location, description and photographs before starting.",
      "Submit a completion photo for review when the work is ready.",
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
      "Share assigned work through a contractor link.",
      "Review submitted evidence against the original item.",
    ],
  ],
  [
    "punch-list-app/subcontractors",
    "subcontractors",
    "Keep the assigned punch list and your response together.",
    [
      "Open the list in your browser.",
      "Check what the site manager has asked you to address.",
      "Send a completion photo when the item is ready for review.",
    ],
  ],
  [
    "punch-list-app/superintendents",
    "superintendents",
    "Carry a usable record from the site walk to the trade handoff.",
    [
      "Capture a separate item for each issue.",
      "Add a precise location so the next person can find it.",
      "Check returned evidence before closing the review.",
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
    "Keep site observations and contractor responses connected.",
    [
      "Record what needs attention at the point of inspection.",
      "Send each contractor the relevant items.",
      "Review the completion evidence with the project team.",
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
    description: `${intro} Use photos, locations and contractor updates to keep a practical snag record.`,
    heading: `${path.startsWith("punch") ? "Punch lists" : "Snag lists"} for ${role}`,
    kind: "role",
    role,
    intro,
    notes,
  };

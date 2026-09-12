export const ORIGIN = "https://usesnaglist.com";
export const APP_STORE = "https://apps.apple.com/gb/app/snaglist/id6758858102";
export const SUPPORT = "support@usesnaglist.com";
export const OFFER = {
  monthly: "£14.99",
  annual: "£119.99",
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
      "Record snags, photos and locations offline on iPhone. Contractor links, account sync and the manager portal are planned for Snaglist v2.0.",
    heading: "Snagging app for site managers and builders",
    kind: "home",
  },
  "/features": {
    title: "How Snaglist works: photos, plans and reports",
    description:
      "Capture snags, photos and locations offline, then prepare a PDF record. See the current app workflow and the online features planned for v2.0.",
    heading: "From the site walk to the handover record",
    kind: "features",
  },
  "/contractor-link": {
    title: "Contractor links planned for v2.0 | Snaglist",
    description:
      "Preview the no-account Contractor links and completion review planned for Snaglist v2.0. The current app works offline and does not offer online sharing.",
    heading: "Contractor links are coming with v2.0",
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
      "Snaglist Pro is £14.99 monthly or £119.99 annually in the UK. The current app works offline; Pro does not unlock the online features planned for v2.0.",
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
      "Compare Snaglist’s current offline capture and reports with your Site Audit Pro workflow. Online Contractor links are planned for Snaglist v2.0.",
    heading: "Snaglist and Site Audit Pro: which fits your workflow?",
    kind: "comparison",
    role: "Site Audit Pro",
  },
  "/vs-fieldwire": {
    title: "Snaglist and Fieldwire: choosing a snagging workflow",
    description:
      "Compare Snaglist’s offline snag records with your site management needs. Contractor access and online review are planned for Snaglist v2.0.",
    heading: "Choose the workflow your job needs",
    kind: "comparison",
    role: "Fieldwire",
  },
  "/comparison": {
    title: "Choosing a snagging app | Snaglist",
    description:
      "Check the capture, location and PDF record you need today. Distinguish Snaglist’s offline app from online collaboration planned for v2.0.",
    heading: "Start with the handoff you need",
    kind: "comparison-hub",
  },
  "/about": {
    title: "About Snaglist: built from site experience",
    description:
      "Why Daniel McCann built Snaglist after ten years in site management and quantity surveying. Offline snag records today, with online collaboration planned for v2.0.",
    heading: "Built by someone who has walked the job",
    kind: "about",
  },
  "/support": {
    title: "Snaglist help: offline app and v2.0 plans",
    description:
      "Get help with the current offline Snaglist app, saved records, reports and Apple subscriptions. Read about online services planned for v2.0.",
    heading: "What do you need help with?",
    kind: "support",
  },
  "/privacy": {
    title: "Snaglist privacy policy",
    description:
      "Privacy information for Snaglist’s offline app and website, and the online features planned for v2.0. Find out how to contact us about your data.",
    heading: "Privacy policy",
    kind: "privacy",
  },
  "/terms": {
    title: "Snaglist terms of service",
    description:
      "Read the terms for Snaglist’s current offline app and Apple subscriptions, with online services planned for v2.0 clearly distinguished.",
    heading: "Terms of service",
    kind: "terms",
  },
  "/snagging-app": {
    title: "Snagging workflows for construction roles | Snaglist",
    description:
      "Explore offline snag records for different construction roles. Contractor links and shared online review are planned for Snaglist v2.0.",
    heading: "A clear record for everyone involved in the job",
    kind: "roles",
    role: "snagging-app",
  },
  "/punch-list-app": {
    title: "Punch lists and snag lists explained | Snaglist",
    description:
      "A punch list records work needing attention before handover. Use Snaglist for offline capture; online contractor updates are planned for v2.0.",
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
      "Use an exported report to discuss the relevant snags with the contractor.",
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
    "No-account Contractor links for subcontractors are planned for v2.0.",
    [
      "With v2.0, the planned Contractor link will let you open assigned work in a browser.",
      "Check the location, description and photographs before starting.",
      "Online completion-photo submission is planned for v2.0; it is not available today.",
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
      "Contractor links for sharing assigned work are planned for v2.0.",
      "The planned online review will keep submitted evidence separate from accepted closure.",
    ],
  ],
  [
    "punch-list-app/subcontractors",
    "subcontractors",
    "A browser handoff for your punch list is planned for v2.0.",
    [
      "With v2.0, open the assigned list through the planned Contractor link.",
      "The planned browser view will show the items the site manager has assigned to you.",
      "Completion-photo submission for manager review is planned for v2.0.",
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
    "Record observations offline; shared responses are planned for v2.0.",
    [
      "Record what needs attention at the point of inspection.",
      "Contractor links for sending selected work are planned for v2.0.",
      "Shared online review with the project team is planned for v2.0.",
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
    description: `${intro} Current Snaglist works offline; online collaboration is planned for v2.0.`,
    heading: `${path.startsWith("punch") ? "Punch lists" : "Snag lists"} for ${role}`,
    kind: "role",
    role,
    intro,
    notes,
  };

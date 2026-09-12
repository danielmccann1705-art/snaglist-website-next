import { useLocation } from "react-router";
import {
  pages,
  ORIGIN,
  OFFER,
  SUPPORT,
  APP_STORE,
  type PageSpec,
} from "../content/pages";
import {
  Header,
  Footer,
  StoreLink,
  FinalCTA,
  FAQ,
  ServiceNotice,
} from "../components/Site";
import { ExampleRecord } from "../components/ExampleRecord";
import { Pin } from "../components/Brand";
import { track } from "../lib/analytics";
import { Privacy } from "../../pages/Privacy";
import { Terms } from "../../pages/Terms";

export function meta({ location }: { location: { pathname: string } }) {
  const path = location.pathname.replace(/\/$/, "") || "/";
  const p = pages[path];
  if (!p)
    return [
      { title: "Page not found | Snaglist" },
      { name: "robots", content: "noindex" },
    ];
  return [
    { title: p.title },
    { name: "description", content: p.description },
    {
      tagName: "link",
      rel: "canonical",
      href: ORIGIN + (path === "/" ? "/" : path),
    },
    { property: "og:title", content: p.title },
    { property: "og:description", content: p.description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Snaglist" },
    { property: "og:locale", content: "en_GB" },
    { property: "og:url", content: ORIGIN + path },
    { property: "og:image", content: ORIGIN + "/brand/social.png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    {
      property: "og:image:alt",
      content: "Snaglist. Walk the job. Mark the snags. Hand over the record.",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: p.title,
        description: p.description,
        url: ORIGIN + path,
        isPartOf: { "@type": "WebSite", name: "Snaglist", url: ORIGIN },
      },
    },
  ];
}
const commonFAQ: [string, string][] = [
  [
    "Will contractors need an app or account in v2.0?",
    "The planned v2.0 Contractor links will let recipients open assigned work in a browser without installing an app or creating an account. Contractor links are not part of the current offline app.",
  ],
  [
    "Which devices can I use?",
    "The current offline Snaglist app is available on the App Store for iPhone and iPad. Check the listing for device compatibility. A browser companion for managers is planned for v2.0.",
  ],
  [
    "How will submission and approval differ in v2.0?",
    "In the planned online workflow, a contractor’s completion photo will submit the work for review. The manager will then accept it or request changes. Submission will not close the snag automatically. Online submissions and manager review are not available in the current app.",
  ],
  [
    "Can I start free?",
    `Yes. Snaglist is free to download, with optional Pro subscriptions. UK Pro prices are ${OFFER.monthly} monthly or ${OFFER.annual} annually. Check the current allowances and purchase terms in your installed app. Buying Pro today does not unlock the online features planned for v2.0.`,
  ],
  [
    "Will my projects sync with the manager portal?",
    "Account sync and a browser manager portal are planned for v2.0. Projects in the current app are stored on your device; they do not sync with a portal or another device. No v2.0 release date has been announced.",
  ],
];
const steps = [
  [
    "Capture it on the walk",
    "Give the snag a clear description and add a photo. Keep the original observation with the record.",
  ],
  [
    "Pin the location",
    "Use a floor-plan pin to show where the issue is. A room name and precise location help the next person find it.",
  ],
  [
    "Coming with v2.0: Contractor links",
    "The planned browser handoff will let contractors open assigned work without an account. The current app works offline and does not send Contractor links.",
  ],
  [
    "Coming with v2.0: online review",
    "Contractors will be able to submit evidence for manager review in the planned v2.0 workflow. Submitted, awaiting review and accepted closure will remain distinct.",
  ],
  [
    "Hand over the record",
    "Export a PDF record of the job. Use it to discuss outstanding items and document the handover.",
  ],
];
function Process() {
  return (
    <ol className="process">
      {steps.map(([heading, copy], i) => (
        <li key={heading}>
          <span className="step-number">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>{heading}</h3>
            <p>{copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
function Plans() {
  return (
    <div className="price-grid">
      <article className="price-card">
        <p className="eyebrow">Free</p>
        <h2>Start your snag record</h2>
        <p className="price">£0</p>
        <ul>
          <li>Free app download</li>
          <li>Check current Free allowances in the app</li>
          <li>Choose whether to subscribe to Pro</li>
        </ul>
        <StoreLink
          placement="free-plan"
          label="Start with Snaglist Free"
          secondary
        />
      </article>
      <article className="price-card pro">
        <p className="eyebrow">Pro</p>
        <h2>Room for the next job</h2>
        <p className="price">
          {OFFER.monthly}
          <span> / month</span>
        </p>
        <p>
          Or <strong>{OFFER.annual} billed annually</strong>
        </p>
        <ul>
          <li>Monthly or annual subscription</li>
          <li>Purchased and managed through Apple</li>
          <li>Check included features and limits before subscribing</li>
          <li>Buying Pro today does not unlock planned v2.0 online features</li>
        </ul>
        <StoreLink placement="pro-plan" label="Get Snaglist" />
      </article>
    </div>
  );
}
function Intro({
  page,
  children,
}: {
  page: PageSpec;
  children?: React.ReactNode;
}) {
  return (
    <section className="wrap page-intro">
      <p className="eyebrow">
        Snaglist /{" "}
        {page.kind === "plans"
          ? "Floor plans"
          : page.kind === "contractor"
            ? "Contractor link"
            : page.kind === "template"
              ? "Resources"
              : "The app"}
      </p>
      <h1>{page.heading}</h1>
      {children}
    </section>
  );
}
function Download({ filename, label }: { filename: string; label: string }) {
  return (
    <a
      className="button secondary"
      href={"/downloads/" + filename}
      download
      onClick={() => track("template_download_click", "template", filename)}
    >
      {label}
      <span aria-hidden="true">↓</span>
    </a>
  );
}

function Home({ page }: { page: PageSpec }) {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{page.heading}</h1>
            <p className="brand-line">
              Walk the job.
              <br />
              Mark the snags.
              <br />
              <span>
                Hand over
                <br className="desktop-break" /> the record.
              </span>
            </p>
            <p className="intro-copy">
              Keep the photo, description and location together. Take a clear
              offline snag record from the site walk to the handover discussion.
            </p>
            <div className="actions">
              <StoreLink placement="hero" />
              <a className="text-link" href="/contractor-link">
                Planned v2.0 Contractor links <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="caption">
              Free to download · Optional Pro subscriptions
            </p>
            <details className="desktop-qr">
              <summary>Open on your iPhone</summary>
              <img
                src="/brand/app-store-qr.svg"
                width="144"
                height="144"
                alt="QR code to the Snaglist App Store listing"
              />
              <p className="caption">
                Scan with your iPhone camera, or use the download link above.
              </p>
            </details>
          </div>
          <ExampleRecord />
        </div>
      </section>
      <section className="section dark-section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Planned for v2.0</p>
            <h2>
              A clear list.
              <br />A clear handoff.
            </h2>
          </div>
          <div>
            <p className="large-copy">
              Contractor links will bring the work details and the response
              together in the planned v2.0 workflow, without another app for the
              recipient.
            </p>
            <p>
              Contractor links, account sync and the manager portal are planned
              for v2.0. The current app works offline.
            </p>
            <a className="text-link" href="/contractor-link">
              Preview the planned handoff <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <p className="eyebrow">The working record</p>
          <h2>One snag. A clear next step.</h2>
          <p>
            Capture and report offline today. Online handoff and review are
            planned for v2.0.
          </p>
        </div>
        <Process />
        <a className="text-link" href="/features">
          Explore the workflow →
        </a>
      </section>
      <section className="section soft-section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Location and evidence</p>
            <h2>
              “Kitchen” is a room.
              <br />A pin is a place.
            </h2>
            <p>
              Show where the work is with a floor-plan pin, then use the photo
              and description to explain what needs attention.
            </p>
            <a className="text-link" href="/floor-plans">
              See floor-plan pinning →
            </a>
          </div>
          <div className="feature-note">
            <Pin />
            <h3>
              Keep the location
              <br />
              with the snag.
            </h3>
            <p>
              A reference you can follow. A place you can find. A record you can
              hand over.
            </p>
            <a href="/features#reports">Explore PDF reports →</a>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <p className="eyebrow">Free and Pro</p>
          <h2>Start on your next job.</h2>
        </div>
        <Plans />
        <p className="caption">
          Subscriptions are purchased and managed through Apple.{" "}
          <a href="/pricing">View pricing details</a>.
        </p>
      </section>
      <section className="section wrap founder-strip">
        <p className="eyebrow">Built from site experience</p>
        <h2>
          Ten years on site.
          <br />A practical reason to build it.
        </h2>
        <p>
          Daniel built Snaglist after ten years in site management and quantity
          surveying. The current app keeps a practical snag record on your
          device. Connecting that record with contractors and managers online is
          the next step, planned for v2.0.
        </p>
        <a className="text-link" href="/about">
          Why Snaglist exists →
        </a>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <h2>Before your next walk</h2>
        </div>
        <FAQ items={commonFAQ} />
      </section>
      <FinalCTA />
    </>
  );
}

function Content({ page, path }: { page: PageSpec; path: string }) {
  if (page.kind === "home") return <Home page={page} />;
  if (page.kind === "privacy")
    return (
      <div className="legal">
        <Privacy />
      </div>
    );
  if (page.kind === "terms")
    return (
      <div className="legal">
        <Terms />
      </div>
    );
  if (page.kind === "pricing")
    return (
      <>
        <Intro page={page}>
          <p>
            Choose Free or Pro in the iPhone app. There is no separate web
            checkout.
          </p>
        </Intro>
        <section className="wrap section compact-top">
          <Plans />
          <div className="prose billing">
            <h2>Choose how you pay for Pro</h2>
            <p>
              The current app works offline. Contractor links, account sync and
              the manager portal are planned for v2.0. Buying Pro does not
              unlock these online features today.
            </p>
            <p>
              Monthly: <strong>{OFFER.monthly} each month</strong>. Annual:{" "}
              <strong>{OFFER.annual} billed once a year</strong>. UK App Store
              prices. Your purchase screen shows the applicable price and
              subscription terms before you confirm.
            </p>
            <p>
              Subscriptions renew automatically unless cancelled. Manage or
              cancel in your Apple account’s subscription settings.{" "}
              <a href="https://support.apple.com/en-gb/118428" rel="noreferrer">
                Apple’s subscription cancellation guide
              </a>
              .
            </p>
            <p>
              Choose a subscription for the features available in your installed
              app today. The planned v2.0 Contractor links will not require the
              recipient to buy a subscription. No v2.0 release date has been
              announced.
            </p>
          </div>
          <FAQ items={commonFAQ} />
        </section>
        <FinalCTA />
      </>
    );
  if (page.kind === "contractor")
    return (
      <>
        <Intro page={page}>
          <p>
            Planned for v2.0: share assigned snags in a browser without a
            recipient account. The current app works offline and does not offer
            Contractor links. The fictional example below previews the planned
            handoff; it is not a live link.
          </p>
          <div className="actions">
            <StoreLink placement="contractor-intro" />
            <a href="#handoff">Preview the v2.0 handoff ↓</a>
          </div>
        </Intro>
        <section id="handoff" className="section wrap split">
          <div>
            <p className="eyebrow">Planned for v2.0</p>
            <h2>A preview of the online handoff.</h2>
            <ol className="plain-steps">
              <li>
                The site manager will capture the snag and share a Contractor
                link for the selected work.
              </li>
              <li>
                The contractor will open the link. If the sender requires a PIN,
                they will supply it separately.
              </li>
              <li>
                The contractor will check the assigned items and submit
                completion evidence when ready. The work will then await review.
              </li>
              <li>
                The site manager will review the evidence and accept the work or
                request changes. Accepted closure will follow that decision.
              </li>
            </ol>
            <p>
              This is a planned v2.0 workflow. A completion submission will be a
              request for review, not accepted closure.
            </p>
          </div>
          <ExampleRecord interactive />
        </section>
        <section className="section soft-section">
          <div className="wrap prose">
            <h2>Access controls planned for v2.0</h2>
            <p>
              The planned Contractor link controls include selected work,
              expiry, revocation and optional PIN protection. These online
              controls are not available in the current app. No release date has
              been announced for v2.0.
            </p>
            <a href="/support#service-help">Current app and v2.0 questions →</a>
          </div>
        </section>
        <section className="section wrap">
          <FAQ items={commonFAQ.slice(0, 3)} />
        </section>
        <FinalCTA />
      </>
    );
  if (page.kind === "features")
    return (
      <>
        <Intro page={page}>
          <p>
            Log each snag while you are there. Keep its photo, location,
            assigned contractor and follow-up in an offline record you can use.
            Contractor links, account sync and the manager portal are planned
            for v2.0.
          </p>
        </Intro>
        <section className="section wrap compact-top">
          <Process />
          <div className="actions">
            <a href="/contractor-link">Preview v2.0 Contractor links →</a>
            <a href="/floor-plans">Explore floor-plan pins →</a>
          </div>
        </section>
        <section id="reports" className="section soft-section">
          <div className="wrap split">
            <div>
              <p className="eyebrow">The handover record</p>
              <h2>
                A PDF you can
                <br />
                take to the discussion.
              </h2>
              <p>
                Export a PDF report from Snaglist to share the job record. Keep
                the snag reference, description, location, status and photo
                evidence understandable to the reader.
              </p>
              <p>
                Check outstanding items and the evidence you have recorded
                before issuing a report. Online contractor submissions and
                manager review are planned for v2.0.
              </p>
            </div>
            <div className="feature-note">
              <h3>What makes a useful record?</h3>
              <ul>
                <li>One reference per snag</li>
                <li>A clear location and description</li>
                <li>The contractor responsible</li>
                <li>Dates and the current status</li>
                <li>Original and completion evidence</li>
              </ul>
              <a href="/snag-list-template">Start with the free template →</a>
            </div>
          </div>
        </section>
        <FinalCTA />
      </>
    );
  if (page.kind === "plans")
    return (
      <>
        <Intro page={page}>
          <p>
            A room name narrows it down. A pin on the floor plan shows the
            place, while the snag’s photograph explains what needs attention.
          </p>
        </Intro>
        <section className="section wrap split compact-top">
          <div>
            <h2>Give the next person the context</h2>
            <ol className="plain-steps">
              <li>Add the relevant floor plan to the project.</li>
              <li>
                Locate the snag on the plan and keep its reference with the
                record.
              </li>
              <li>
                Add a close photograph and a written description of the issue.
              </li>
              <li>
                Use the exported record to discuss the relevant work with the
                contractor.
              </li>
            </ol>
            <p>
              Use a readable plan and a separate snag for each issue. Avoid
              placing several unrelated observations under one pin.
            </p>
            <a className="text-link" href="/contractor-link">
              Preview the v2.0 Contractor link handoff →
            </a>
          </div>
          <ExampleRecord />
        </section>
        <section className="section soft-section">
          <div className="wrap prose">
            <h2>Use the right drawing</h2>
            <p>
              Check the drawing’s revision before pinning the work. A floor-plan
              pin records a location; it does not confirm dimensions or replace
              the project’s drawing control process.
            </p>
            <p>
              Check the options available in your installed app before preparing
              files. <a href="/support">Ask about plan formats</a>.
            </p>
          </div>
        </section>
        <FinalCTA />
      </>
    );
  if (page.kind === "template")
    return (
      <>
        <Intro page={page}>
          <p>
            A practical record for a site walk and the follow-up. Download an
            editable Excel workbook or a printable PDF. Both include
            instructions; the worked examples use a fictional project.
          </p>
          <div className="actions">
            <Download
              filename="snag-list-template.xlsx"
              label="Download Excel template"
            />
            <Download
              filename="snag-list-template.pdf"
              label="Download printable PDF"
            />
          </div>
          <p className="caption">Free to download. No email address needed.</p>
        </Intro>
        <section className="wrap section compact-top">
          <div className="split">
            <div>
              <h2>What is in the template?</h2>
              <p>
                Project, snag reference, location, description, responsible
                trade, date raised, due date, status, photo reference,
                completion evidence and manager review.
              </p>
              <p>
                The Excel workbook has a blank register and a worked example.
                The PDF provides a blank writing sheet and a separate example
                page.
              </p>
              <Download
                filename="snag-list-worked-example.pdf"
                label="View worked example PDF"
              />
            </div>
            <div className="feature-note">
              <span className="snag-ref">S-0042</span>
              <h3>Make the instruction usable.</h3>
              <p>
                <strong>Location:</strong> Plot 14, kitchen, hob wall.
              </p>
              <p>
                <strong>Snag:</strong> Cracked tile behind the hob. Replace the
                damaged tile and make good the surrounding grout.
              </p>
              <p>
                <strong>Photo reference:</strong> S-0042-before.jpg
              </p>
              <p className="caption">
                Fictional example for filling in the template.
              </p>
            </div>
          </div>
          <div className="prose section">
            <h2>How to make a snag list that can be followed</h2>
            <ol className="plain-steps">
              <li>
                <strong>Name the project.</strong> Identify the plot or job
                before adding individual items.
              </li>
              <li>
                <strong>Give each snag a stable reference.</strong> Use the same
                reference in photos and follow-up messages.
              </li>
              <li>
                <strong>Describe the actual issue.</strong> Add the room and
                precise location. Include a close photo and a wider view if
                context is needed.
              </li>
              <li>
                <strong>Assign the next action.</strong> Record the trade or
                contractor and agree a due date.
              </li>
              <li>
                <strong>Keep the response.</strong> Record the completion photo
                reference and submission date.
              </li>
              <li>
                <strong>Review it.</strong> Separate “submitted for review” from
                “accepted”. Record who reviewed it and when.
              </li>
            </ol>
            <h2>Keep your photos with the record</h2>
            <p>
              The blank template does not upload or store photographs for you.
              Save your photos in an accessible project folder, use the snag
              reference in each filename and share only with the people who need
              them.
            </p>
            <h2>When the spreadsheet gets harder to keep up</h2>
            <p>
              Keep photos and plan pins together in the current offline app.{" "}
              <a href="/features">See how Snaglist works</a>. Online contractor
              updates are planned for v2.0; preview the{" "}
              <a href="/contractor-link">forthcoming Contractor link handoff</a>
              .
            </p>
          </div>
        </section>
        <FinalCTA />
      </>
    );
  if (page.kind === "about")
    return (
      <>
        <Intro page={page}>
          <p>
            Snaglist was built by Daniel McCann, a site manager and quantity
            surveyor with ten years of experience on multi-site programmes.
          </p>
        </Intro>
        <section className="wrap section compact-top prose">
          <h2>The list is only half the job</h2>
          <p>
            A useful snag list needs to reach the person doing the work. The
            return evidence then needs to make it back to the person reviewing
            it.
          </p>
          <p>
            That is the problem behind Snaglist. The current app captures the
            snag on the walk and keeps its location and photos together offline.
            Sending the contractor a browser link is part of the planned v2.0
            online workflow.
          </p>
          <h2>A site record you can follow</h2>
          <p>
            Snaglist is built around a practical record: a clear observation,
            its location and the evidence needed for a handover discussion.
            Contractor links, account sync and the manager portal will extend
            that record online with v2.0. These services are planned and are not
            available in the current app.
          </p>
          <h2>Tell Daniel what happens on your job</h2>
          <p>
            Questions and first-hand feedback help shape the app. Tell us the
            task you were trying to complete, the device and what happened.
          </p>
          <a className="button secondary" href={`mailto:${SUPPORT}`}>
            Email Daniel
          </a>
        </section>
        <FinalCTA />
      </>
    );
  if (page.kind === "support")
    return (
      <>
        <Intro page={page}>
          <p>
            Start with the question below. If you still need help, email{" "}
            <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>.
          </p>
        </Intro>
        <section className="wrap section compact-top">
          <div id="service-help" className="prose">
            <h2>The current app and what is planned for v2.0</h2>
            <p>
              The current live Snaglist app works offline. Project records and
              photos stay on your device; it has no online services. Contractor
              links, account sync and the manager portal are planned for v2.0.
              No release date has been announced.
            </p>
            <p>
              Buying Pro does not enable these upcoming online features today.
              For help with saved records or the current app, email{" "}
              <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>. Keep copies of
              important exported reports and photos. Reinstalling the app can
              remove records stored only on your device.
            </p>
          </div>
          <FAQ
            items={[
              [
                "Can I send a Contractor link from the current app?",
                "No. The current live app works offline and does not provide online Contractor links. Browser sharing without a recipient account is planned for v2.0. You can use your exported report to discuss the work with your contractor today.",
              ],
              [
                "Will Contractor links have PIN protection?",
                "Optional PIN protection is planned for v2.0 Contractor links. The sender will be able to share a PIN separately from the link. This is forthcoming functionality, not a feature available in the current offline app.",
              ],
              [
                "Can contractors submit completion photos online today?",
                "No. Online evidence submission and manager review are planned for v2.0. The current app does not receive contractor uploads. Keep follow-up photos and work notes with your project record and agree the work directly with the people involved.",
              ],
              ...commonFAQ.slice(1, 3),
              commonFAQ[4],
              [
                "How do I report an app problem?",
                "Email the app version, device model and the steps that caused the problem. Remove customer details, passwords, PINs and private link tokens from screenshots. We will ask for any additional information needed to investigate.",
              ],
            ]}
          />
          <div className="prose section">
            <h2>Reports and subscriptions</h2>
            <p>
              Check the export options in the app for your installed version and
              plan. If a report does not look right, tell us which part is
              missing or incorrect.
            </p>
            <p>
              For billing, refunds or cancellation, use your Apple account.{" "}
              <a href="https://support.apple.com/en-gb/118428" rel="noreferrer">
                Manage an Apple subscription
              </a>
              .
            </p>
          </div>
        </section>
      </>
    );
  if (page.kind === "comparison")
    return (
      <>
        <Intro page={page}>
          <p>
            Compare the whole task: recording the issue, getting it to the right
            person and reviewing what comes back. Use the same small example job
            in each app before deciding.
          </p>
        </Intro>
        <section className="wrap section compact-top">
          <h2>Questions to check in {page.role}</h2>
          <p>
            Snaglist’s current offline features and planned v2.0 services are
            distinguished below. Check the current edition and any add-ons in{" "}
            {page.role} directly. We have not verified equivalent features or
            current pricing in that product, so this is a buying checklist
            rather than an absence-of-features claim.
          </p>
          <div className="table-scroll">
            <table>
              <caption>Workflow checks for your own comparison</caption>
              <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col">Snaglist</th>
                  <th scope="col">Check in {page.role}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Capture",
                    "Photos and a snag description",
                    "Can you keep a clear reference and description with each issue?",
                  ],
                  [
                    "Location",
                    "Floor-plan pins",
                    "Which edition supports the location or drawing workflow you need?",
                  ],
                  [
                    "Contractor access",
                    "Planned for v2.0: no-account browser handoff. The current app works offline.",
                    "What does the recipient need to install, register for or pay for?",
                  ],
                  [
                    "Completion evidence",
                    "Planned for v2.0: online submission, awaiting review and accepted closure as separate steps.",
                    "How do photos and review decisions get back to the manager?",
                  ],
                  [
                    "Report",
                    "PDF export from the app",
                    "Check a real exported report and its included fields.",
                  ],
                  [
                    "Price",
                    `${OFFER.monthly}/month or ${OFFER.annual}/year for Pro. Buying Pro does not unlock planned v2.0 online features today.`,
                    "Check app price, subscriptions, add-ons and recipient charges.",
                  ],
                  [
                    "Device",
                    "Current offline iPhone and iPad app. Browser manager portal and Contractor links planned for v2.0.",
                    "Check your device and the contractor’s device.",
                  ],
                ].map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="prose section">
            <h2>Choose against the job you actually do</h2>
            <p>
              If an existing reporting app already produces the record you need,
              include that in your decision. If the difficult part is collecting
              contractor responses, check which online services are available
              today. Snaglist’s browser handoff and manager review are planned
              for v2.0 and cannot be used in the current app.
            </p>
            <p>
              Do not infer that an unlisted feature is unavailable. Ask the
              provider if the current edition or an add-on supports it.
            </p>
            <p>
              UK Snaglist listing and Pro prices checked 12 September 2026:{" "}
              <a href={APP_STORE}>UK App Store listing</a>.{" "}
              {page.role === "Fieldwire" ? (
                <a href="https://www.fieldwire.com/" rel="noreferrer">
                  Fieldwire’s official website
                </a>
              ) : (
                <a href="https://www.siteauditpro.com/" rel="noreferrer">
                  Site Audit Pro’s official website
                </a>
              )}{" "}
              gives the provider’s own product information. Check current
              features and prices directly before choosing.
            </p>
            <p>
              <a href={`mailto:${SUPPORT}`}>
                Send a correction or ask a question
              </a>
              .
            </p>
            <div className="actions">
              <a href="/contractor-link">Preview v2.0 Contractor links →</a>
              <a href="/pricing">Snaglist pricing →</a>
            </div>
          </div>
        </section>
        <FinalCTA />
      </>
    );
  if (page.kind === "comparison-hub")
    return (
      <>
        <Intro page={page}>
          <p>
            Decide what you need to record, who needs to receive it and how you
            will review the response.
          </p>
        </Intro>
        <section className="wrap section compact-top prose">
          <Process />
          <h2>Put two workflows side by side</h2>
          <p>
            <a href="/vs-site-audit-pro">
              Snaglist and Site Audit Pro: a workflow checklist
            </a>
          </p>
          <p>
            <a href="/vs-fieldwire">
              Snaglist and Fieldwire: questions to check
            </a>
          </p>
          <h2>Still using a spreadsheet?</h2>
          <p>
            Try the <a href="/snag-list-template">free snag list template</a> on
            one job. It gives you a clear set of fields to carry into any app
            you evaluate.
          </p>
        </section>
      </>
    );
  if (page.kind === "roles")
    return (
      <>
        <Intro page={page}>
          <p>
            {page.role === "punch-list-app"
              ? "A punch list records work that still needs attention. In UK construction, the same kind of working record is commonly called a snag list."
              : "The details someone needs depend on their role in the job. Start with a factual snag record and a clear next action."}
          </p>
        </Intro>
        <section className="wrap section compact-top">
          <h2>Choose your part in the job</h2>
          <div className="role-links">
            {Object.entries(pages)
              .filter(
                ([key, p]) => key.startsWith(path + "/") && p.kind === "role",
              )
              .map(([key, p]) => (
                <a href={key} key={key}>
                  <h3>{p.role}</h3>
                  <p>{p.intro}</p>
                  <span aria-hidden="true">→</span>
                </a>
              ))}
          </div>
          <p>
            <a href="/snag-list-template">Download a template</a> or{" "}
            <a href="/features">explore the Snaglist workflow</a>.
          </p>
        </section>
      </>
    );
  return (
    <>
      <Intro page={page}>
        <p>{page.intro}</p>
      </Intro>
      <section className="wrap section compact-top prose">
        <h2>Keep these details in the record</h2>
        <ol className="plain-steps">
          {page.notes?.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ol>
        <h2>Check the handoff</h2>
        <p>
          A list is useful when the person receiving it can identify the work
          and respond. The current app keeps your snag record offline; use an
          exported report to discuss the work. Contractor links, account sync
          and online manager review are planned for v2.0.
        </p>
        <div className="actions">
          <a href="/contractor-link">Preview the v2.0 Contractor link →</a>
          <a href="/snag-list-template">Use the free template →</a>
        </div>
        <p>
          Snaglist is available on the App Store. Check availability and pricing
          for your account’s region before purchasing.
        </p>
      </section>
      <FinalCTA />
    </>
  );
}
export default function PublicPage() {
  const path = useLocation().pathname.replace(/\/$/, "") || "/";
  const page = pages[path];
  return (
    <div className="marketing">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header path={path} />
      <ServiceNotice />
      {path !== "/" && (
        <nav aria-label="Breadcrumb" className="wrap breadcrumbs">
          <a href="/">Snaglist</a>
          <span aria-hidden="true">/</span>
          <span>{page.heading}</span>
        </nav>
      )}
      <main id="main">
        <Content page={page} path={path} />
      </main>
      <Footer />
    </div>
  );
}

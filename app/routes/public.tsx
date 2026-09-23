import { useLocation } from "react-router";
import {
  pages,
  ORIGIN,
  OFFER,
  SUPPORT,
  APP_STORE,
  FREE_LIMITS,
  COMPANY_PLANS,
  type PageSpec,
} from "../content/pages";
import {
  Header,
  Footer,
  StoreLink,
  FinalCTA,
  FAQ,
} from "../components/Site";
import { ScreenshotSlot } from "../components/ScreenshotSlot";
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
    "Do contractors need an app or an account?",
    "No. The trade opens the Contractor link in a web browser on their phone or computer. They do not install an app or create an account, and they never pay. If you set a PIN, give it to them separately.",
  ],
  [
    "Which devices can I use?",
    "Snaglist is on the App Store for iPhone and iPad. Check the listing for device compatibility. The trades you send Contractor links to only need a web browser.",
  ],
  [
    "What is the difference between submitted and accepted?",
    "When the trade sends a completion photo, the work is submitted and waits for your review. You then accept the work or send it back. The snag closes only on a manager’s decision; a submission never closes it by itself.",
  ],
  [
    "Can I start free?",
    `Yes. Snaglist Free covers ${FREE_LIMITS}. Snaglist Pro is ${OFFER.monthly} a month or ${OFFER.annual} a year in the UK, bought and managed through Apple.`,
  ],
  [
    "Do I need an account?",
    "Not to record snags: you can walk the job and build the record on your iPhone without one. To send Contractor links or work with colleagues, sign in and create the project in a workspace. Projects saved to a workspace are stored on our service and appear on your other signed-in devices.",
  ],
];
const steps = [
  [
    "Capture it on the walk",
    "Give the snag a clear description and add a photo. Keep the original observation with the record.",
  ],
  [
    "Record the location",
    "Name the room and the exact spot so the next person can find it.",
  ],
  [
    "Send a Contractor link",
    "Choose the snags and the contractor. The trade opens the link in a browser, with no account and no app, and sees the photo, location and description.",
  ],
  [
    "Review the completion photo",
    "The trade’s completion photo is a submission. It waits under Awaiting review until a manager accepts the work or sends it back. Only a manager’s decision closes the snag.",
  ],
  [
    "Hand over the record",
    "Export a PDF report of the job, with each snag’s photos, location and status, and completion photos beside the original.",
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
          <li>One project</li>
          <li>20 snags per project</li>
          <li>Five photos per snag</li>
          <li>Five Contractor links a month</li>
          <li>Trades open your links free, with no account</li>
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
          <li>Unlimited projects and snags</li>
          <li>Unlimited Contractor links</li>
          <li>Unlimited photos per snag</li>
          <li>Floor-plan pins (projects on your device)</li>
          <li>Custom report branding</li>
          <li>Monthly or annual, bought and managed through Apple</li>
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
              Send each trade a Contractor link to their snags. They open it in
              a browser, with no account and no app, and send the completion
              photo. The handover record includes the fix.
            </p>
            <div className="actions">
              <StoreLink placement="hero" />
              <a className="text-link" href="/contractor-link">
                How the Contractor link works <span aria-hidden="true">→</span>
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
          <div className="hero-shot">
            <ScreenshotSlot id="home-hero" />
            <p className="shot-line">Trades open a link. No account.</p>
          </div>
        </div>
      </section>
      <section className="section dark-section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">The Contractor link</p>
            <h2>
              A clear list.
              <br />A clear handoff.
            </h2>
          </div>
          <div>
            <p className="large-copy">
              Send the trade a link to the snags that are theirs. They open it
              in a browser, with no account and no app, and send the completion
              photo back to the same record.
            </p>
            <p>
              You choose the snags, add a PIN if you want one and set when the
              link expires. You can revoke it at any time.
            </p>
            <a className="text-link" href="/contractor-link">
              See how it works <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <p className="eyebrow">The working record</p>
          <h2>One snag. A clear next step.</h2>
          <p>
            The photo, the location, the trade’s response and your decision
            stay together, from the site walk to the handover record.
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
              Show where the work is with the room and the exact spot, then use
              the photo and description to explain what needs attention. With
              Snaglist Pro, projects kept on your device can also carry
              floor-plan pins.
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
          surveying, to get the snag list to the person doing the work and the
          evidence back to the person reviewing it.
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
            Choose Free or Pro in the Snaglist app for iPhone and iPad. There is
            no separate web checkout.
          </p>
        </Intro>
        <section className="wrap section compact-top">
          <Plans />
          <div className="prose billing">
            <h2>Choose how you pay for Pro</h2>
            <p>
              Snaglist Free covers {FREE_LIMITS}. Snaglist Pro removes those
              limits.
            </p>
            <p>
              If you already have more than the Free allowance, you keep it all;
              the limits only stop new projects, snags, photos and links being
              added. Company projects you are invited to don’t count toward it.
            </p>
            <p>
              Monthly: <strong>{OFFER.monthly} each month</strong>. Annual:{" "}
              <strong>{OFFER.annual} billed once a year</strong>. UK App Store
              prices. Your purchase screen shows the applicable price and
              subscription terms before you confirm.
            </p>
            <p>
              Payment is charged to your Apple account when you confirm the
              purchase. Subscriptions renew automatically unless cancelled at
              least 24 hours before the end of the current period. Manage or
              cancel in your Apple account’s subscription settings.{" "}
              <a href="https://support.apple.com/en-gb/118428" rel="noreferrer">
                Apple’s subscription cancellation guide
              </a>
              .
            </p>
            <p>
              The trades who open your Contractor links never need an account or
              a subscription.
            </p>
            <h2>Companies</h2>
            <p>{COMPANY_PLANS}</p>
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
            A Contractor link sends the trade the snags that are theirs. They
            open it in a browser, with no account and no app, check the
            location, description and photos, and send a completion photo when
            the work is done. You review it before anything closes.
          </p>
          <div className="actions">
            <StoreLink placement="contractor-intro" />
            <a href="#handoff">How it works ↓</a>
          </div>
        </Intro>
        <section id="handoff" className="section wrap split">
          <div>
            <p className="eyebrow">How it works</p>
            <h2>From your list to their phone, and back.</h2>
            <ol className="plain-steps">
              <li>
                Sign in and create the project in your workspace or your
                company’s: choose it under Save project when you create the
                project. Then choose the snags and the contractor, and send the
                link however you usually message them.
              </li>
              <li>
                The contractor opens the link in a browser. If you set a PIN,
                they enter it; give it to them separately from the link.
              </li>
              <li>
                They check each snag, then add a completion photo and a note.
                The work is now submitted and awaiting your review.
              </li>
              <li>
                You review the photo and accept the work or send it back with a
                reason. The snag closes only on a manager’s decision.
              </li>
            </ol>
            <p>
              A submission is a request for review, not a closure. The trade’s
              submission, the time it spends awaiting review and a manager’s
              acceptance stay separate in your record.
            </p>
          </div>
          <ScreenshotSlot id="link-browser" />
        </section>
        <section className="section soft-section">
          <div className="wrap split">
            <div className="prose">
              <h2>You control the link</h2>
              <p>
                A link shows the project’s name and address and the snags you
                chose for that contractor, up to 100 at a time, with their
                photos and any earlier submissions and feedback.
              </p>
              <p>
                Add a PIN of four to eight digits if you want one. A link
                expires after the period you choose, up to 90 days, and you can
                revoke it at any time. Anyone with the link, and the PIN if you
                set one, can open it, so send it only to the people doing the
                work.
              </p>
              <p>
                The trades who open your links never need an account, an app or
                a subscription.
              </p>
              <p>
                <a href="/support#contractor-links">Contractor link questions →</a>
              </p>
            </div>
            <ScreenshotSlot id="link-create" />
          </div>
        </section>
        <section className="section wrap split">
          <div>
            <h2>Review before anything closes</h2>
            <p>
              Submitted work appears under Awaiting review. Open it to see the
              trade’s photo and note beside the original snag, then accept the
              work or send it back. Accepted work is closed in your record with
              its completion photo, ready for the handover report.
            </p>
          </div>
          <ScreenshotSlot id="link-review" />
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
            Log each snag while you are there, with its photo, location and
            assigned contractor. Send the trade a Contractor link, review the
            completion photo they send back and export the handover record.
          </p>
        </Intro>
        <section className="section wrap compact-top">
          <Process />
          <div className="actions">
            <a href="/contractor-link">See the Contractor link →</a>
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
                Export a PDF report from Snaglist to share the job record: each
                snag’s reference, description, location, status and photos,
                with completion photos beside the original.
              </p>
              <p>
                Check outstanding items before issuing a report. Work awaiting
                review is not closed until a manager accepts it.
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
          <div className="wrap slot-row">
            <ScreenshotSlot id="report-with-fix" />
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
            </ol>
            <p>
              Floor-plan pins work in projects kept on your device. In a project
              saved to a workspace, yours or a company’s, you can view plans in
              the app but not yet add or move them, so pins and Contractor links
              cannot yet be used in the same project.
            </p>
            <p>
              Use a readable plan and a separate snag for each issue. Avoid
              placing several unrelated observations under one pin.
            </p>
            <p>
              Floor-plan pins are included with Snaglist Pro, in projects kept on
              your device.
            </p>
            <a className="text-link" href="/contractor-link">
              See how the Contractor link works →
            </a>
          </div>
          <ScreenshotSlot id="floor-plan-pin" />
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
              Keep each snag's photo and location together in the app, and send
              each trade a Contractor link instead of a spreadsheet.{" "}
              <a href="/features">See how Snaglist works</a> or{" "}
              <a href="/contractor-link">see the Contractor link</a>.
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
            That is the problem behind Snaglist. The app captures the snag on
            the walk and keeps its location and photos together. A Contractor
            link sends it to the trade, who opens it in a browser without an
            account and sends the completion photo back for review.
          </p>
          <h2>A site record you can follow</h2>
          <p>
            Snaglist is built around a practical record: a clear observation,
            its location, the trade’s response and the manager’s decision. That
            record is what goes into the handover.
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
          <div id="contractor-links" className="prose">
            <h2>Contractor links and reviews</h2>
            <p>
              Contractor links are sent from projects saved to a workspace. The
              workspace is chosen when you create a project, and a project kept
              on this device only cannot send one. The trade opens the link in a
              browser, with no account and no app, and sends a completion photo
              for your review.
            </p>
          </div>
          <FAQ
            items={[
              [
                "How do I send a Contractor link?",
                "Sign in and create the project in a workspace. Open it, choose Share with contractor, pick the snags and the contractor, set how long the link lasts and, if you want one, a PIN. Send the link the way you usually message the trade.",
              ],
              commonFAQ[0],
              [
                "How does the PIN work?",
                "A PIN is optional. It is four to eight digits, and the trade enters it when they open the link. Send it separately from the link. There is no account or password for the trade to reset; if the PIN does not match, they ask you for it.",
              ],
              commonFAQ[2],
              [
                "How do I stop a link working?",
                "Revoke it in the app. A link also stops working when it expires, after the period you chose, up to 90 days.",
              ],
            ]}
          />
          <div id="older-work" className="prose section">
            <h2>Older work from an earlier version</h2>
            <p>
              If you used Snaglist before version 2.0, your earlier projects
              stay on your device and are kept separately. Open{" "}
              <strong>Older device work</strong> at the top of Projects to use
              them. They work without an account or a connection, and you can
              save a copy to Files.
            </p>
            <p>
              Uploading older projects to your account is coming soon. Until
              then, they stay on the device they were made on.
            </p>
            <p>
              Snags closed in an earlier version show{" "}
              <strong>Legacy closure — unverified</strong>. Those closures were
              made before Snaglist recorded a manager’s review, so they are kept
              apart from work a manager has accepted.
            </p>
            <p>
              Keep copies of important exported reports and photos. Deleting the
              app can remove records stored only on your device.
            </p>
          </div>
          <div id="delete-account" className="prose section">
            <h2>Delete your account</h2>
            <p>
              In the app, open Settings and choose Delete account, under
              Account. You need to be signed in, and the app asks you to confirm
              before anything is deleted.
            </p>
            <ul>
              <li>
                Your account stops working as soon as the request is accepted.
              </li>
              <li>
                Your name, email address and sign-in details are erased. Your
                own projects, snags, drawings and photos are then removed in the
                background; the <a href="/privacy">privacy policy</a> explains
                how long that takes.
              </li>
              <li>
                You get a reference to check progress. Keep it private. The app
                shows when the deletion is complete.
              </li>
              <li>
                Work you did in a company that stays open remains with that
                company, shown as “Former member”.
              </li>
              <li>
                If you own a company that other people belong to, transfer
                ownership or close the company as part of the deletion. Closing
                a company deletes its projects, snags and shared files.
              </li>
              <li>
                Deleting your account does not cancel an Apple subscription.
                Cancel it in your Apple account’s subscription settings.
              </li>
            </ul>
            <p>
              If you cannot sign in to delete your account, email{" "}
              <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a> and we will help.
            </p>
          </div>
          <div className="prose section">
            <h2>Other questions</h2>
          </div>
          <FAQ
            items={[
              commonFAQ[4],
              commonFAQ[1],
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
            The Snaglist column describes the app as it works now. Check the
            current edition and any add-ons in{" "}
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
                    "Floor-plan pins with Snaglist Pro, in projects kept on the device",
                    "Which edition supports the location or drawing workflow you need?",
                  ],
                  [
                    "Contractor access",
                    "Contractor link: the trade opens it in a browser with no account or app.",
                    "What does the recipient need to install, register for or pay for?",
                  ],
                  [
                    "Completion evidence",
                    "The trade’s completion photo is submitted and awaits review. The snag closes only on a manager’s decision.",
                    "How do photos and review decisions get back to the manager?",
                  ],
                  [
                    "Report",
                    "PDF export from the app, with completion photos",
                    "Check a real exported report and its included fields.",
                  ],
                  [
                    "Price",
                    `Free: ${FREE_LIMITS}. Pro: ${OFFER.monthly}/month or ${OFFER.annual}/year.`,
                    "Check app price, subscriptions, add-ons and recipient charges.",
                  ],
                  [
                    "Device",
                    "iPhone and iPad app. Trades need only a web browser.",
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
              include that in your decision. If the difficult part is getting the
              list to the trade and the evidence back, check how each app handles
              that step.
            </p>
            {page.role === "Site Audit Pro" && (
              <p>
                Site Audit Pro may suit you if a branded PDF is the main output
                you need. Snaglist is built for jobs where subcontractors
                respond to the items and you want their completion photos in the
                same record.
              </p>
            )}
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
              <a href="/contractor-link">See the Contractor link →</a>
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
        {page.role === "subcontractors" ? (
          <p>
            When the work is done, add a completion photo and a note through
            the link. Your submission waits for the site manager’s review, and
            the item closes only on a manager’s decision.
          </p>
        ) : (
          <p>
            A list is useful when the person receiving it can identify the work
            and respond. Send the trade a Contractor link for their snags: they
            open it in a browser with no account and send a completion photo.
            The snag waits for review and closes only on a manager’s decision.
          </p>
        )}
        <div className="actions">
          <a href="/contractor-link">See how the Contractor link works →</a>
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

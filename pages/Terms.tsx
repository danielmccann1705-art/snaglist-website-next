import { CurrentLegalLayout, Operator, Support } from "./CurrentLegalLayout";

// Retain the future online-service terms in TermsOnlineDraft.tsx until that launch.
export function Terms() {
  return (
    <CurrentLegalLayout kind="terms" title="Terms of service">
      <section>
        <h2>1. About these terms</h2>
        <Operator />
        <p>
          These terms explain use of this website and the current Snaglist
          service. The App Store listing identifies the app’s seller; our
          website operator’s company name does not change that listing. Your app
          licence and purchases are also subject to the applicable Apple terms
          and any licence shown in the App Store.
        </p>
      </section>
      <section>
        <h2>2. What the current app provides</h2>
        <p>
          Snaglist helps you record snags, photographs, locations and progress,
          and produce reports. You can keep and use projects on your device
          without creating an account. Keep backups of work you need: the
          current service cannot recover a local project from a Snaglist server.
        </p>
        <p>
          A report records the information entered by its users; it is not an
          independent inspection, building-control approval or warranty from
          Snaglist. Check the content and status of work before relying on or
          sharing a report.
        </p>
      </section>
      <section id="contractor-links">
        <h2>3. Contractor links and portal sign-in</h2>
        <p>
          The website previews the online workflow that opens with the iOS app
          update. Portal sign-in and Contractor links are not active services
          today. Downloading the currently released app does not activate them.
        </p>
        <p>
          When the online service launches, a contractor’s submission will
          request a manager’s review; submission does not itself mean the work
          has been accepted. The launch policy and terms will describe access,
          sharing and stored project information before those services are
          offered.
        </p>
      </section>
      <section>
        <h2>4. Your content and responsibilities</h2>
        <p>
          You or the relevant rights holder keep ownership of your records,
          photographs and drawings. Only enter and share material you have
          permission to use. You are responsible for choosing recipients and
          checking what an exported report or backup contains. Sharing a file
          cannot recall copies someone has already saved.
        </p>
        <p>
          Using the app does not give us permission to use your project content
          in advertising. Do not use our website or app unlawfully, attempt
          unauthorised access or deliberately disrupt its operation.
        </p>
      </section>
      <section>
        <h2>5. Snaglist Pro and Apple subscriptions</h2>
        <p>
          Pro is an optional App Store subscription. The purchase screen shows
          the features, current price, billing period and any offer available to
          you before you confirm. Prices may vary by country and currency; the
          App Store purchase screen is authoritative.
        </p>
        <p>
          Subscriptions renew under the terms displayed by Apple. You can manage
          or cancel them in your Apple account’s subscriptions settings.
          Removing the app, deleting local work or contacting support does not
          cancel an Apple subscription. Use Restore Purchases with the Apple
          account that made the purchase; contact <Support /> if you need help.
          Apple handles refund requests under its refund process and your
          applicable legal rights.
        </p>
        <p>
          Do not buy Pro on the assumption that a previewed online feature is
          already available.
        </p>
      </section>
      <section>
        <h2>6. Service standards and your legal rights</h2>
        <p>
          We will use reasonable care and skill in providing our service.
          Software may require maintenance or corrections; contact us about a
          problem so we can investigate.
        </p>
        <p>
          Nothing in these Terms removes rights or remedies that the law gives
          you. We do not exclude or limit liability where doing so would be
          unlawful, including for fraud or death or personal injury caused by
          negligence. These terms do not impose an additional financial cap on
          our liability.
        </p>
      </section>
      <section>
        <h2>7. Changes, privacy and contact</h2>
        <p>
          The date above identifies this version. We will explain material
          changes when new services are introduced; merely continuing to browse
          this website does not mean you have accepted a new paid service. No
          subscription or company plan is sold through this website.
        </p>
        <p>
          Our <a href="/privacy">privacy policy</a> explains handling of
          information. For support, complaints or questions about these terms,
          contact <Support /> or write to our registered office above. Nothing
          here prevents you bringing a claim in a court available to you under
          applicable law.
        </p>
      </section>
    </CurrentLegalLayout>
  );
}

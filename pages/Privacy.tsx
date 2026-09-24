import { CurrentLegalLayout, Operator, Support } from "./CurrentLegalLayout";

// Publication scope approved by Dan: website now, online services with the iOS update.
// The fuller online policy is retained in PrivacyOnlineDraft.tsx and is not routed.
export function Privacy() {
  return (
    <CurrentLegalLayout kind="privacy" title="Privacy policy">
      <section>
        <h2>1. Who handles your information</h2>
        <Operator />
        <p>
          We act as a data controller for support correspondence and the
          information used to operate this website and administer subscriptions.
          Apple also handles information under its own privacy policy when you
          use the App Store or Apple services.
        </p>
      </section>
      <section>
        <h2>2. Projects on your device</h2>
        <p>
          You can use Snaglist without an account. Projects, snags, contact
          details, photos, drawings and notes you save on your device are stored
          there. The released app does not provide working online project
          storage or cross-device synchronisation. We cannot recover an
          on-device project from a Snaglist server.
        </p>
        <p>
          When you export a report or backup, you choose its destination through
          your device’s sharing controls. A recipient can keep their own copy.
          Your device or iCloud backup may include app data according to your
          Apple settings; that is separate from Snaglist online storage.
        </p>
        <p>
          Only record or share photographs and personal details you are entitled
          to use. Avoid including people or private information that is not
          needed for the job.
        </p>
      </section>
      <section>
        <h2>3. Device features and Apple services</h2>
        <ul>
          <li>
            <strong>Camera and photo library:</strong> the app asks for access
            when you use the relevant feature. Photos you attach are saved with
            your snag.
          </li>
          <li>
            <strong>Maps:</strong> Apple Maps receives address searches and map
            points you choose for a project. The app does not read your device’s
            current location to set the project location.
          </li>
          <li>
            <strong>Dictation:</strong> Apple’s speech recognition turns speech
            into text and may process audio on Apple’s servers, depending on
            your settings and device.
          </li>
          <li>
            <strong>Face ID:</strong> your device handles authentication;
            Snaglist does not receive your face data.
          </li>
          <li>
            <strong>Notifications:</strong> if you grant notification
            permission, the released app registers with Apple and may try to
            send a device push token to Snaglist. This does not mean online
            notifications are operating.
          </li>
        </ul>
        <p>
          You can change these permissions in iOS Settings. Refusing optional
          access affects the related feature, rather than preventing all use of
          the app.
        </p>
      </section>
      <section>
        <h2>4. Purchases and subscriptions</h2>
        <p>
          Apple processes App Store payments; we do not receive your
          payment-card details. RevenueCat helps the app check, restore and
          manage access to Snaglist Pro. It receives purchase and renewal
          information, an app-user identifier and information needed to check
          your entitlement, including when the app opens. An identifier may be
          associated with a previous sign-in. Subscription processing can occur
          even when you use projects only on your device.
        </p>
        <p>
          We use this information to provide your purchased features and answer
          purchase questions, on the basis of performing our contract with you.
          Apple and RevenueCat also explain their processing in their own
          notices.
        </p>
      </section>
      <section>
        <h2>5. Operational events and older online controls</h2>
        <p>
          The released app records usage events such as onboarding,
          project-creation milestones and purchase outcomes, together with a
          random app-installation identifier, app version and time. It also
          saves Apple performance and crash diagnostics. It may attempt to send
          these to Snaglist’s service; failed event requests can remain queued
          on the device.
        </p>
        <p>
          Older sign-in and online controls may attempt network requests when
          used, including the details you enter or an identity token from Apple.
          They do not establish that an account or shared project is available.
          Our hosting provider can process connection information even when a
          request fails. We use operational information that reaches us for the
          legitimate interests of finding faults and protecting the service, not
          advertising profiles.
        </p>
        <p>
          We do not sell personal information or track you across other
          companies’ apps and websites for advertising.
        </p>
      </section>
      <section>
        <h2>6. Website and support</h2>
        <p>
          Cloudflare hosts and protects this website. It processes connection
          and security information such as your IP address, requested page,
          browser information and request time. This serves our legitimate
          interests in delivering the website, preventing abuse and diagnosing
          faults.
        </p>
        <p>
          The website does not set advertising cookies, include a third-party
          marketing analytics script or require details to download the free
          templates. Its interface events stay in your browser. Hosting security
          and operational records are separate from those interface events.
        </p>
        <p>
          If you email us, Google Workspace processes your address, message and
          attachments for our support mailbox. We use these to answer your
          request and keep a record of its resolution: to perform our contract
          where the request concerns your service, or for our legitimate
          interests in responding to enquiries. Please do not email passwords,
          access links or unnecessary customer records.
        </p>
      </section>
      <section>
        <h2>7. Providers and international processing</h2>
        <p>
          Our current service providers include Cloudflare for hosting and
          security, Google Workspace for support email, and RevenueCat for
          subscription administration. Apple provides the App Store, payments
          and the optional device services described above. These providers may
          process information outside the UK, including in the United States.
        </p>
        <p>
          The providers’ published data-protection terms describe their
          international-transfer safeguards, including approved contractual
          clauses and the UK addendum where applicable:{" "}
          <a href="https://www.cloudflare.com/cloudflare-customer-dpa/">
            Cloudflare
          </a>
          ,{" "}
          <a href="https://cloud.google.com/terms/data-processing-addendum/">
            Google Workspace
          </a>{" "}
          and <a href="https://www.revenuecat.com/dpa">RevenueCat</a>. Apple
          explains its processing and international transfers in its{" "}
          <a href="https://www.apple.com/legal/privacy/en-ww/">
            privacy policy
          </a>
          . Contact us for information about the safeguards relevant to your
          information.
        </p>
        <p>
          We may also disclose information where a legal obligation requires it,
          or where necessary to establish or defend a legal claim. We do not
          give providers permission to use your project content for our
          advertising.
        </p>
      </section>
      <section id="delete-your-account">
        <h2>8. Keeping and deleting information</h2>
        <p>
          You control records kept on your device. Use the app’s deletion
          controls, and separately manage any exports and device backups.
          Deleting the app can remove its local data; export anything you need
          first. Removing the app does not cancel an Apple subscription.
        </p>
        <p>
          We keep support correspondence while resolving your enquiry and for as
          long afterwards as needed to explain the resolution, deal with a
          related dispute or meet a legal requirement. We consider the subject
          of the enquiry, whether it remains open and whether a specific record
          is needed. Purchase records may need to remain available for
          entitlement checks, restoration, accounting or disputes. Hosting
          providers keep operational information under their own service
          retention arrangements. We do not promise one automatic deletion
          deadline for all of these records.
        </p>
        <p>
          For information you previously sent to Snaglist, or if an older in-app
          account-deletion control fails, contact <Support />. We will identify
          what we hold and handle your request under the rights below. Do not
          rely on the previewed online account-deletion flow as an active
          service.
        </p>
      </section>
      <section>
        <h2>9. Your rights</h2>
        <p>
          Depending on the circumstances, you can ask to access, correct or
          delete your information, restrict its use, or receive a portable copy.{" "}
          <strong>
            You can object to processing based on our legitimate interests.
          </strong>{" "}
          Contact <Support />; we may ask for enough information to verify your
          identity.
        </p>
        <p>
          We normally respond within one calendar month of receiving your
          request. For complex or multiple requests, we may take up to two
          further months; if so, we will tell you within the first month and
          explain why. Some rights have legal exceptions, which we will explain
          if relevant.
        </p>
        <p>
          You may complain to the{" "}
          <a href="https://ico.org.uk/make-a-complaint/">
            Information Commissioner’s Office
          </a>
          . You do not have to contact us first. We do not use your information
          to make solely automated decisions with legal or similarly significant
          effects.
        </p>
      </section>
      <section id="contractor-links">
        <h2>10. The online update</h2>
        <p>
          Shared workspaces, portal sign-in and Contractor links introduce
          additional processing of project and account information. We will
          publish the relevant policy when those services launch. This notice
          does not describe them as running today. See the{" "}
          <a href="/terms#contractor-links">current service terms</a>.
        </p>
      </section>
    </CurrentLegalLayout>
  );
}

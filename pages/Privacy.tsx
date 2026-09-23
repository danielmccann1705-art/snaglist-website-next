import React from 'react';
import { Wordmark } from '../app/components/Brand';
import { Dan } from './LegalPlaceholder';

// Option B of the deletion-timeframe derivation, word for word. It is true in the
// worst case that the account-deletion worker's own schedule allows; it is not
// derived from storage throughput. Do not reword it without re-deriving that bound.
// tests/legal.test.mjs asserts it verbatim in the built page.
export const DELETION_TIMEFRAME =
  'When you delete your account it stops working straight away, and your name, email address and sign-in details are erased immediately. The photographs and files in your projects are then removed from storage in the background, and we complete every deletion within 30 days. The app shows a completion receipt once yours has finished.';

const h2 = 'text-lg font-bold text-[#1A1D23] mb-2';
const h3 = 'text-[15px] font-bold text-[#1A1D23] mb-1.5 mt-5';
const list = 'list-disc pl-5 space-y-1.5';
const link = 'text-primary hover:underline';
const Support = () => (
  <a href="mailto:support@usesnaglist.com" className={`${link} font-medium`}>support@usesnaglist.com</a>
);

export const Privacy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen" data-legal-document="privacy">
      {/* Branded header bar — visible when opened standalone from the app */}
      <div className="policy-header bg-background-light border-b border-gray-100 px-5 py-4 flex items-center gap-2">
        <Wordmark />

        <span className="text-gray-300 mx-1">|</span>
        <span className="text-sm text-gray-500">Privacy policy</span>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-black tracking-[-0.033em] text-[#1A1D23] mb-1">Privacy policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: <Dan>date this version is published</Dan></p>

        <div className="space-y-10 text-[#6B7280] text-[15px] md:text-base leading-[1.75]">
          <section>
            <p>
              This policy explains what personal information Snaglist handles, why, who processes it on our
              behalf, who else can see it, and how to delete it. It covers the Snaglist app, the Snaglist
              portal (the web browser version for companies), Contractor links and this website.
            </p>
            <p className="mt-3">
              The account, sharing and online storage services described here are part of Snaglist 2.0
              and later.
            </p>
          </section>

          <section>
            <h2 className={h2}>1. Who we are</h2>
            <p>
              Snaglist is provided by <Dan>legal name of the provider: a company name and registered number, or the full name of the sole trader</Dan> (“Snaglist”,
              “we”, “us”, “our”), whose postal address is <Dan>postal address of the provider</Dan>.
              For anything about this policy or your information, email <Support />.
            </p>
          </section>

          <section>
            <h2 className={h2}>2. In short</h2>
            <ul className={list}>
              <li>You can use the Snaglist app on your device without an account. A project set to “On this device only” is not uploaded to Snaglist.</li>
              <li>When you sign in and save a project to a workspace, the project and its snags, photographs and drawings are stored on our service, so that you and the people you give access to can use them on other devices and in the Snaglist portal.</li>
              <li>A Contractor link shows the snags you choose to anyone who holds the link, without an account. Section 4 sets out exactly what it shows.</li>
              <li>The site location you pick on a map is stored and uploaded at full precision. Snaglist never reads your device’s location.</li>
              <li>We do not sell personal information, show advertising, or track you across other companies’ apps and websites. We use no analytics services. The app includes Google’s sign-in software, which this version does not use.</li>
              <li>You can delete your account in the app or the portal (section 11).</li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>3. What we collect and why</h2>

            <h3 className={h3}>Using Snaglist without an account</h3>
            <p>
              Projects, snags, photographs and drawings you keep only on your device stay on your device;
              Snaglist does not receive them. Map searches, dictation and subscriptions work as described
              below whether or not you have an account.
            </p>

            <h3 className={h3}>Your account</h3>
            <p>When you create an account we collect:</p>
            <ul className={`${list} mt-2`}>
              <li>your name and email address;</li>
              <li>the identifier from the way you sign in: in the app, Sign in with Apple or a sign-in link sent to your email address; in the Snaglist portal, Sign in with Google or a sign-in link. If you use Hide My Email with Apple, we receive Apple’s relay address rather than your own;</li>
              <li>for Sign in with Apple, a token from Apple that we store encrypted, so that we can revoke Snaglist’s access to your Apple sign-in when you delete your account;</li>
              <li>the sessions that keep you signed in to the app and the portal;</li>
              <li>the companies you belong to and your role in each;</li>
              <li>whether you have Snaglist Pro, and when we last checked.</li>
            </ul>
            <p className="mt-2">We use this to run your account, keep it secure and give you the features you are entitled to.</p>

            <h3 className={h3}>Projects you save to a workspace</h3>
            <p>
              A project stays on your device unless you save it to a workspace, either your own or a
              company’s. When you do, we store the following so that it is available on your other devices,
              to the people with access to that workspace, and in the portal:
            </p>
            <ul className={`${list} mt-2`}>
              <li>the project’s name, reference, address, site location, type, dates, status and notes, and the client’s name, email address and phone number if you enter them;</li>
              <li>its snags: reference, title, description, location, trade, priority, due date, status, assigned contractor and history;</li>
              <li>photographs, drawings and the pins placed on them;</li>
              <li>comments, review decisions and a record of who did what and when;</li>
              <li>the contractors in your directory: company name, contact name, email address, phone number, trade and notes;</li>
              <li>a random identifier for the copy of the app on each of your devices, sent with every change so that our service can keep your devices in step and never apply the same change twice.</li>
            </ul>
            <p className="mt-2">A project’s cover photo, folders and tags stay on your device.</p>

            <h3 className={h3}>Photographs</h3>
            <p>
              Photographs you take or attach in the app are re-encoded on your device before they are saved,
              so the location and other details recorded by the camera are not kept. Photographs uploaded in
              a web browser, whether in the portal or by a contractor through a Contractor link, are stored as
              they were received, including any details the file itself contains, such as when and where it
              was taken. Only a new copy without those details is ever shown to anyone; the file as received
              is kept privately with the project.
            </p>

            <h3 className={h3}>Site location</h3>
            <p>
              When you set a project’s location you choose a point on a map, either by moving the map or by
              searching for an address. Snaglist stores that point’s coordinates at full precision, and
              uploads them unchanged when you save the project to a workspace. They are available to everyone
              with access to the project, and they are not included in Contractor links. To show the map,
              search for addresses and turn the point into an address, the app uses Apple Maps, which receives
              your search text and the point you chose. Snaglist never reads your device’s location and does
              not take locations from your photographs.
            </p>

            <h3 className={h3}>Dictation and Face ID</h3>
            <p>
              If you dictate a snag description, Apple’s speech recognition turns your speech into text and
              may send the audio to Apple to do so. Snaglist receives only the text. If you use Face ID to
              unlock the app, your device handles it and Snaglist receives no biometric information.
            </p>

            <h3 className={h3}>Subscriptions</h3>
            <p>
              Snaglist Pro is bought through the App Store. Apple takes the payment; we never see your card
              details. RevenueCat manages subscriptions for us: it receives the purchase and renewal details
              from Apple and an identifier for you (a random one until you sign in, and your Snaglist account
              identifier after that) so that your subscription follows your account. Our service checks your
              subscription with RevenueCat.
            </p>

            <h3 className={h3}>Emails</h3>
            <p>
              We send sign-in links and other service emails through Resend, which receives the recipient’s
              address and the message.
            </p>

            <h3 className={h3}>Support</h3>
            <p>
              If you email <Support />, your message and our replies are held in our Google Workspace mailbox.
            </p>

            <h3 className={h3}>Connecting to Snaglist</h3>
            <p>
              When your device or browser connects to this website, the portal or our service, the
              connection’s IP address, browser and device details and the time are processed to deliver and
              protect the service. We use IP addresses briefly to limit repeated requests, and some security
              records that include an IP address and browser details are kept for up to 90 days. This website
              sets no cookies and contains no advertising or analytics software.
            </p>
          </section>

          <section id="contractor-links">
            <h2 className={h2}>4. Contractor links: who can see what</h2>
            <p>
              A Contractor link lets you send selected snags to a contractor, who opens them in a web browser.
              Because a link shows project information to someone outside your account, this section sets out
              exactly who can see what.
            </p>

            <h3 className={h3}>Who can open a Contractor link</h3>
            <p>
              Anyone who has the link. The person who opens it does not need a Snaglist account or the app,
              and a link can be forwarded, so anyone it is passed to can open it too. If you add a PIN of 4 to
              8 digits, the PIN is needed as well; send it separately from the link. After five wrong attempts
              the link is locked for 15 minutes. We store the PIN only in hashed form, never as written.
            </p>

            <h3 className={h3}>What it shows</h3>
            <ul className={list}>
              <li>the project’s name and address;</li>
              <li>the name of the contractor company the link is for;</li>
              <li>for each snag you include, up to 100: its reference, title, description, location, priority, due date and status;</li>
              <li>the photographs of those snags that the link includes;</li>
              <li>the work submitted through that link: notes, photographs, the date and its status, and any reason given when work was sent back.</li>
            </ul>

            <h3 className={h3}>What it does not show</h3>
            <p>
              Other snags in the project, other contractors’ work, internal comments, client contact details,
              the site’s map location, drawings, or the names and contact details of you and your colleagues.
            </p>

            <h3 className={h3}>What the contractor can do</h3>
            <p>
              Mark work as started, and submit it with notes and photographs. A submission never closes a
              snag: it waits for you or a colleague to review it, and only a manager’s decision closes the
              snag.
            </p>

            <h3 className={h3}>What you see about the contractor</h3>
            <p>
              You and your colleagues with access to the project see the notes and photographs submitted, and
              when. We do not ask the person using a link for their name or email address, and we do not store
              their IP address with the link or with their submission.
            </p>

            <h3 className={h3}>How long it works</h3>
            <p>
              You choose an expiry of 1 to 90 days, and you can revoke a link at any time. A link also stops
              working if the person who created it loses permission to share the project or deletes their account, or if
              the contractor is archived in your directory. A snag drops out of a link if it is reassigned or
              archived. Once a link has expired or been revoked it shows nothing further, but anything the
              recipient has already saved or screenshotted stays with them.
            </p>

            <h3 className={h3}>How the page protects it</h3>
            <p>
              A Contractor link page asks search engines not to index it, loads nothing from other companies,
              and shows no project details until the link, and any PIN, has been checked. No photograph
              appears in the preview when the link is pasted into a messaging app. After the correct PIN is
              entered, a cookie keeps the link unlocked for up to two hours (section 12).
            </p>
          </section>

          <section>
            <h2 className={h2}>5. Company workspaces and the Snaglist portal</h2>
            <p>
              You can create a company, or be invited to join one. People who manage a company invite others by
              email address and choose which projects each person can access. An invitation can only be
              accepted by an account that has confirmed the invited address.
            </p>
            <p className="mt-3">
              Members see the projects they have access to, including photographs, drawings, contractor
              details and client details, in the app and in the Snaglist portal, the web browser version at
              app.usesnaglist.com. Work in a company is shown with the name of the member who did it: snags
              raised, comments, review decisions and changes.
            </p>
            <p className="mt-3">
              If a member leaves a company, their account continues and their name stays on the work they did.
              If a member deletes their account, their work stays in the company’s records with their name
              replaced by “Former member” (section 11).
            </p>
            <p className="mt-3">
              <Dan>L4: who is responsible (the controller) for the records in a company’s workspace. A lawyer should settle this; it decides what this section promises members</Dan>
            </p>
          </section>

          <section>
            <h2 className={h2}>6. People whose details our customers enter</h2>
            <p>
              Snaglist customers record details about people who do not use Snaglist themselves: contractors
              (company name, contact name, email address, phone number and notes) and clients (name, email
              address and phone number). These details are visible to the people with access to the project,
              and a contractor’s company name also appears on a Contractor link for that contractor. The
              customer who entered them can correct them in Snaglist. Earlier versions of a record can remain
              in the change history our service keeps so that every device stays in step, until the workspace
              the record belongs to is deleted.
            </p>
            <p className="mt-3">
              If your details have been entered and you want them corrected or removed, ask the customer who
              entered them, or email <Support />.
            </p>
            <p className="mt-3">
              <Dan>L4: whether Snaglist or the customer is responsible for these details, and what we will do when such a request reaches us</Dan>
            </p>
          </section>

          <section>
            <h2 className={h2}>7. Who processes information for us, and who else sees it</h2>
            <p>We use these providers to run Snaglist:</p>
            <ul className={`${list} mt-2`}>
              <li><strong>Cloudflare</strong> hosts this website, our service and the portal, and holds photographs, drawings and other files in private storage.</li>
              <li><strong>Neon</strong> hosts the database that holds account and project records.</li>
              <li><strong>Apple</strong> provides Sign in with Apple, App Store payments, Apple Maps for the map and address search, and speech recognition for dictation.</li>
              <li><strong>Google</strong> provides Sign in with Google in the Snaglist portal. The portal’s sign-in page loads Google’s sign-in button from Google, which then receives your browser’s details under Google’s own privacy policy.</li>
              <li><strong>RevenueCat</strong> manages subscriptions.</li>
              <li><strong>Resend</strong> delivers our emails.</li>
              <li><strong>Google Workspace</strong> holds our support mailbox.</li>
            </ul>
            <p className="mt-3">
              Cloudflare, Neon, RevenueCat, Resend and Google Workspace process information only on our
              instructions, under written terms that require them to protect it at least as well as this
              policy does. Apple and Google provide sign-in, and Apple provides Apple Maps, speech recognition
              and App Store payments, under their own terms and privacy policies.
            </p>
            <p className="mt-3">We also share information:</p>
            <ul className={`${list} mt-2`}>
              <li>with the people you share with: colleagues in a company, and whoever holds a Contractor link you send;</li>
              <li>with the recipients of reports and photographs you export and send, who keep their copy;</li>
              <li>where the law requires it.</li>
            </ul>
            <p className="mt-3">We do not sell personal information or share it for advertising.</p>
          </section>

          <section>
            <h2 className={h2}>8. Where information is held</h2>
            <p>
              <Dan>where the production database and file storage are held: read back the production database region and the storage location before stating either</Dan>
            </p>
            <p className="mt-3">
              Some of our providers are based in, or process information in, the United States.{' '}
              <Dan>L3: the safeguard relied on for these international transfers, confirmed by a lawyer</Dan>
            </p>
          </section>

          <section>
            <h2 className={h2}>9. Our legal bases</h2>
            <p>
              We use personal information to provide the service you ask for (your account, projects,
              sharing, Contractor links and the portal); to take and check subscriptions; to keep Snaglist
              secure and prevent abuse; to answer support requests; and to meet legal obligations.
            </p>
            <p className="mt-3">
              <Dan>L3: the lawful basis for each of these purposes, confirmed by a lawyer</Dan>
            </p>
          </section>

          <section>
            <h2 className={h2}>10. How long we keep information</h2>
            <ul className={list}>
              <li>Your account: until you delete it.</li>
              <li>Project records, their photographs and files, and the change history that keeps devices in step: until they are deleted, by you, by your company, or when the account or company they belong to is deleted.</li>
              <li>Sign-in: a sign-in link stops working after 15 minutes, and a portal session after 7 days. Records of your sign-ins are kept with your account and deleted when you delete it, if not before.</li>
              <li>Security records that include an IP address and browser details: 90 days.</li>
              <li>Records of visits to links in the format used before Snaglist 2.0, which include the visitor’s IP address and browser details: until the account or company the link belongs to is deleted.</li>
              <li>Support emails: we do not delete them on a fixed schedule. Ask us if you want yours deleted.</li>
              <li>Purchases: Apple and RevenueCat keep their own purchase records, which deleting your Snaglist account does not remove.</li>
            </ul>
          </section>

          <section id="delete-your-account">
            <h2 className={h2}>11. Deleting your account</h2>
            <p>
              You can delete your account in the app’s settings (Delete account) or in the Snaglist portal.
              You confirm once; there is no waiting period, and the account cannot be restored.
            </p>
            <p className="mt-3 text-[#1A1D23]">{DELETION_TIMEFRAME}</p>
            <p className="mt-3">In more detail:</p>
            <ul className={`${list} mt-2`}>
              <li>In the same step, access is revoked on every device and any Contractor links you created stop working. A device without a connection loses access when it next connects. We also ask Apple to revoke Snaglist’s access to your Apple sign-in.</li>
              <li>Your own workspace is deleted with its projects, snags, photographs and drawings. Photographs are made permanently unreadable in storage, and drawings and other files are deleted.</li>
              <li>Work you did in a company that stays open stays in that company’s records: the snags you raised, the photographs and drawings you added, your comments and your review decisions. Your name is replaced with “Former member” and your contact details are removed. The decision, the date and a reference remain, so this is not anonymous: the company can still see what was done and when.</li>
              <li>If you are the only owner of a company, you are asked to hand it to another member or to close it before your account can be deleted. Closing a company deletes its projects and records.</li>
              <li>You get a reference you can use to check progress.</li>
              <li>Deleting your account does not cancel an App Store subscription. Cancel it in your Apple account’s subscription settings.</li>
              <li>Copies already sent to other people, such as reports, photographs, or anything a Contractor link recipient saved, stay with them.</li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>12. Cookies and browser storage</h2>
            <p>This website sets no cookies. The portal and Contractor links use only the cookies they need to work:</p>
            <ul className={`${list} mt-2`}>
              <li><code>__Host-snaglist_session</code> keeps you signed in to the portal, for up to 7 days;</li>
              <li><code>__Host-snaglist_login</code>, and cookies whose names begin <code>__Host-snaglist_google_</code>, hold a sign-in while it is in progress, for 15 minutes and 10 minutes respectively;</li>
              <li>cookies whose names begin <code>__Host-snaglist_link_</code> keep a PIN-protected Contractor link unlocked after the correct PIN, for up to two hours and never beyond the link’s expiry. Links in the format used before Snaglist 2.0 use a cookie named <code>snaglist_pin</code> in the same way.</li>
            </ul>
            <p className="mt-3">
              All of them are secure cookies that scripts on the page cannot read, and none is used for
              advertising or analytics. The portal also keeps a small amount of working information in your
              browser’s storage, such as the reference for an account deletion.
            </p>
          </section>

          <section>
            <h2 className={h2}>13. Security</h2>
            <p>
              Information travels encrypted between your device or browser and our service. Photographs and
              files are held in private storage and shown only to people with access. Portal session tokens
              and Contractor link PINs are stored only in hashed form, and Apple sign-in tokens are stored
              encrypted.
            </p>
          </section>

          <section>
            <h2 className={h2}>14. Your rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className={`${list} mt-2`}>
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data</li>
              <li>Export your data in a portable format</li>
              <li>Object to or restrict certain processing</li>
              <li>Withdraw consent where processing is consent-based</li>
            </ul>
            <p className="mt-3">
              You can delete your account yourself (section 11). You may also complain to the data-protection
              authority in your country. In the UK, you can contact the{' '}
              <a href="https://ico.org.uk/make-a-complaint/" className={link}>Information Commissioner’s Office</a>.
            </p>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:support@usesnaglist.com" className={`${link} font-medium inline-block py-1`}>support@usesnaglist.com</a>.
            </p>
          </section>

          <section>
            <h2 className={h2}>15. Children’s privacy</h2>
            <p>
              Snaglist is not intended for anyone under 16. We do not knowingly collect personal
              information from children under 16.
            </p>
          </section>

          <section>
            <h2 className={h2}>16. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. We will notify you of material changes
              by email or through Snaglist where appropriate. The date above identifies the
              latest version; changes to this notice do not remove your data-protection rights.
            </p>
          </section>

          <section>
            <h2 className={h2}>17. Contact us</h2>
            <p>
              If you have questions about this policy or our data practices, contact us at:
            </p>
            <a href="mailto:support@usesnaglist.com" className={`${link} font-medium inline-block mt-1 py-2`}>support@usesnaglist.com</a>
          </section>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-6 text-center text-xs text-gray-400">
          &copy; 2026 Snaglist. All rights reserved.
        </div>
      </div>
    </div>
  );
};

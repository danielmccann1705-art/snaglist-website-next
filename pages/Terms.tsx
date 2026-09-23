import React from 'react';
import { Wordmark } from '../app/components/Brand';
import { Dan, LegalVersion, ProviderAddress, ProviderName } from './LegalPlaceholder';

const h2 = 'text-lg font-bold text-[#1A1D23] mb-2';
const h3 = 'text-[15px] font-bold text-[#1A1D23] mb-1.5 mt-5';
const list = 'list-disc pl-5 space-y-1.5';
const link = 'text-primary hover:underline';

export const Terms: React.FC = () => {
  return (
    <div className="bg-white min-h-screen" data-legal-document="terms">
      {/* Branded header bar — visible when opened standalone from the app */}
      <div className="policy-header bg-background-light border-b border-gray-100 px-5 py-4 flex items-center gap-2">
        <Wordmark />

        <span className="text-gray-300 mx-1">|</span>
        <span className="text-sm text-gray-500">Terms of service</span>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-black tracking-[-0.033em] text-[#1A1D23] mb-1">Terms of service</h1>
        <p className="text-gray-400 text-sm mb-10" data-legal-version="">Last updated: <LegalVersion /></p>

        <div className="space-y-10 text-[#6B7280] text-[15px] md:text-base leading-[1.75]">
          <section>
            <h2 className={h2}>1. Agreement to these terms</h2>
            <p>
              These terms (“Terms”) apply when you use Snaglist (“the Service”): the app, the Snaglist portal and
              Contractor links. The Service is provided by <ProviderName /> (“Snaglist”, “we”, “us”, “our”), whose
              postal address is <ProviderAddress />. You can contact us at{' '}
              <a href="mailto:support@usesnaglist.com" className={link}>support@usesnaglist.com</a>.
            </p>
            <p className="mt-2">
              By creating an account or using the Service you agree to these Terms. If you use a Contractor link
              without an account, the terms in <a href="#contractor-links" className={link}>section 5</a> are the
              ones that apply to you. Some terms differ depending on whether you use Snaglist as a consumer, for
              purposes outside your trade, business or profession, or for business; where that matters, we say so.
            </p>
          </section>

          <section>
            <h2 className={h2}>2. Description of the Service</h2>
            <p>
              Snaglist is an app for recording construction defects (“snags”) with descriptions, photographs,
              locations and drawings, and preparing a project record. You can use the app on your device
              without an account. With an account you can save projects to a workspace, so that they are stored
              on our service and available on your other devices; share selected snags with a contractor through
              a Contractor link; and work with colleagues in a company, in the app and in the Snaglist portal in a
              web browser. You can prepare PDF reports of your records. Available features depend on your
              installed app version and plan.
            </p>
            <p className="mt-2">
              Projects from an earlier version of Snaglist stay on your device, and you can open and export them
              without an account. Snags closed in an earlier version are shown as “Legacy closure — unverified”.
              Projects from an earlier version are not uploaded to your account.
            </p>
          </section>

          <section>
            <h2 className={h2}>3. Accounts and companies</h2>
            <p className="mb-2">
              You can create an account in the app by signing in with Apple or with a sign-in link sent to your
              email address, and in the Snaglist portal by signing in with Google or with a sign-in link. When you
              use an account:
            </p>
            <ul className={list}>
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You are responsible for all activity that occurs under your account</li>
              <li>You must tell us promptly if you think someone has used your account without permission</li>
              <li>You must be at least 16 years old to create an account</li>
            </ul>
            <p className="mt-2">
              If you create a company, you are responsible for who you invite and which projects you give them
              access to. When you accept an invitation, you can see and work on the company’s projects you are
              given access to, and the work you do there (snags, photographs, comments and review decisions)
              becomes part of that company’s records. If you leave the company, that work stays with it.
            </p>
          </section>

          <section>
            <h2 className={h2}>4. Your content</h2>
            <p>
              You or the relevant rights holder keep ownership of the photos, notes and other content you
              provide. You must have permission to upload and share that content, including photos of sites and
              of other people’s work. You give Snaglist permission to host, copy, process, display and include
              it in reports only as needed to provide and secure the service, follow authorised sharing
              instructions, and meet lawful retention requirements. This includes using our service providers
              for those purposes. It does not give us permission to use your project content in advertising.
            </p>
            <p className="mt-2">
              Authorised sharing includes showing content to the members of a company whose projects you work in
              and to the recipients of Contractor links you send. Content you add to a company’s projects stays in
              that company’s records if you leave the company or delete your account, as the{' '}
              <a href="/privacy#delete-your-account" className={link}>privacy policy</a> describes.
            </p>
            <p className="mt-2">
              This permission concerns rights in the content itself. How we handle personal information in it is
              explained in the <a href="/privacy" className={link}>privacy policy</a>.
            </p>
          </section>

          <section id="contractor-links">
            <h2 className={h2}>5. Contractor links</h2>
            <p>
              A Contractor link shares the snags you choose with a contractor, who opens them in a web browser
              without a Snaglist account. The{' '}
              <a href="/privacy#contractor-links" className={link}>privacy policy</a> sets out exactly what a
              Contractor link shows.
            </p>

            <h3 className={h3}>If you send a Contractor link</h3>
            <ul className={`${list} mt-2`}>
              <li>You choose the snags and the contractor, and you are responsible for sending the link only to the intended recipient.</li>
              <li>Anyone who has a link can open it, and a link can be forwarded. You are responsible for who you send it to. If you add a PIN, send it separately from the link.</li>
              <li>You control the link’s PIN, its expiry (1 to 90 days) and its revocation. Revoking a link stops it working; copies a recipient has already saved may remain with them.</li>
              <li>A contractor’s submission does not close a snag. Submitted work waits for review, and only a decision by you or a colleague closes the snag. You can also send work back with a reason.</li>
            </ul>

            <h3 className={h3}>If you use a Contractor link without an account</h3>
            <p>
              This part applies to you if someone has sent you a Contractor link. We, the provider named in
              section 1, run the link for the person or business that sent it to you. You do not need an account,
              and we do not charge you for using the link. By submitting work through the link, you agree to this
              section and to the acceptable-use rules in section 6.
            </p>
            <ul className={`${list} mt-2`}>
              <li>You can view the snags the link includes, mark work as started, and submit notes and photos for that work. Use the link only for the work it was sent for.</li>
              <li>Your photos and notes will be shared with the project team and may appear in project reports. Upload only information you have permission to share.</li>
              <li>When you submit evidence through a Contractor link, you authorise it to be added to the project and used by the project’s authorised users and report recipients for managing, reviewing and recording the work. You or the relevant rights holder keep ownership of it; section 4 describes our own limited permission to handle it.</li>
              <li>Submission does not itself mean the work has been accepted. The project team reviews it and may accept it or send it back with a reason; a submission never closes a snag.</li>
              <li>You cannot change or delete a submission through the link. Ask the person who sent it, or contact us.</li>
              <li>Revoking a link prevents future access through that link; it cannot recall copies already saved or reports already sent. A link also stops working when it expires.</li>
              <li>Share the link, and any PIN, only with the people doing the work. After five wrong PIN attempts the link is locked for 15 minutes.</li>
              <li>We do not ask for your name or email address. The <a href="/privacy#contractor-links" className={link}>privacy policy</a> explains what we collect when you use a link and whom to contact.</li>
              <li>For help, email <a href="mailto:support@usesnaglist.com" className={link}>support@usesnaglist.com</a>. Nothing in this section removes rights the law gives you.</li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>6. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className={`${list} mt-2`}>
              <li>Use the Service for any unlawful purpose</li>
              <li>Upload malicious content or attempt to compromise the Service</li>
              <li>Share Contractor links publicly or with unintended recipients in a way that exposes sensitive project data</li>
              <li>Attempt to access other users' accounts or data</li>
              <li>Use automated tools to scrape or extract data from the Service</li>
              <li>Interfere with the operation of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>7. Subscriptions and payment</h2>
            <p>
              Snaglist offers a free plan and a paid subscription, Snaglist Pro. The features included in
              Snaglist Pro are shown in the app before you buy.
            </p>
            <p className="mt-2">
              Company membership is free. Snaglist Pro remains a separate subscription.
            </p>
            <ul className={`${list} mt-2`}>
              <li>Snaglist Pro is sold through the Apple App Store, and the App Store listing shows the seller. This website has no subscription checkout.</li>
              <li>Payment is charged to your Apple account when you confirm the purchase.</li>
              <li>Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. You can cancel in your Apple account’s subscription settings.</li>
              <li>Refunds for App Store purchases are requested from Apple under its refund process. This does not limit any rights you have under consumer law.</li>
              <li>If we raise the price of Snaglist Pro, you will be told through Apple before the new price applies to your subscription, and you can cancel before it does.</li>
              <li>Deleting your account does not cancel a subscription; cancel it in your Apple account’s subscription settings.</li>
            </ul>
            <p className="mt-2">
              If you downloaded Snaglist from the App Store, Apple’s standard{' '}
              <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" className={link}>Licensed Application End User License Agreement</a>{' '}
              also applies.
            </p>
          </section>

          <section>
            <h2 className={h2}>8. What Snaglist does, and your legal rights</h2>
            <p>
              Snaglist helps you record and coordinate work. A manager’s acceptance records their decision in the
              project; it is not an independent inspection, building-control approval or warranty from Snaglist.
              You remain responsible for construction quality, safety and compliance decisions.
            </p>
            <p className="mt-2">
              We aim to provide a reliable service, but maintenance and faults can interrupt access. Keep copies
              of the reports and records you need to rely on, such as exported PDF reports.
            </p>
            <p className="mt-2">
              Nothing in these Terms removes rights or remedies that the law gives you. Nothing in these Terms
              limits liability for death or personal injury caused by negligence, for fraud, or for anything else
              that cannot be limited by law.
            </p>
            <p className="mt-2">
              If you are a consumer, we are responsible for loss or damage you suffer that is a foreseeable result
              of our breaking these Terms or failing to use reasonable care and skill. Loss or damage is
              foreseeable if it is obvious that it will happen, or if both we and you knew it might happen when
              you started using Snaglist. We are not responsible for loss or damage that is not foreseeable.
            </p>
            <p className="mt-2">
              If you use Snaglist for business:{' '}
              <Dan>business liability terms for business users, free and paid, including any cap and how loss of data is treated, to be settled with counsel (decision 5)</Dan>
            </p>
          </section>

          <section>
            <h2 className={h2}>9. Deleting your account, and suspension</h2>
            <p>
              You can delete your account in the app’s settings or in the Snaglist portal. If you are the only
              owner of a company, you must first hand it to another member or close it. Work you did in a
              company that stays open remains in that company’s records, shown as “Former member”. The{' '}
              <a href="/privacy#delete-your-account" className={link}>privacy policy</a> explains what is
              deleted and when. Deleting an account does not cancel an Apple subscription or remove copies
              already sent to others.
            </p>
            <p className="mt-2">
              We may suspend or close an account, or disable a Contractor link, if it is used in serious or
              repeated breach of these Terms, or where the law requires it. Unless there is a good reason not to,
              we will tell you first and explain why.
            </p>
          </section>

          <section>
            <h2 className={h2}>10. Changes to these terms</h2>
            <p>
              We may update these Terms, for example to reflect changes to the Service or to the law. If a change
              significantly affects you, we will tell you by email or in Snaglist before it takes effect. If you do
              not agree to a change, you can stop using Snaglist and delete your account before it takes effect,
              and cancel any subscription in your Apple account’s subscription settings.
            </p>
          </section>

          <section>
            <h2 className={h2}>11. Governing law</h2>
            <p>
              <Dan>L2: governing law and courts</Dan>
            </p>
          </section>

          <section>
            <h2 className={h2}>12. Contact</h2>
            <p>
              If you have questions about these Terms, contact us at:
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

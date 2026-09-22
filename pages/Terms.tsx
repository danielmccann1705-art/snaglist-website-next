import React from 'react';
import { Wordmark } from '../app/components/Brand';
import { Dan } from './LegalPlaceholder';

const h2 = 'text-lg font-bold text-[#1A1D23] mb-2';
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
        <p className="text-gray-400 text-sm mb-10">Last updated: <Dan>date this version is published</Dan></p>

        <div className="space-y-10 text-[#6B7280] text-[15px] md:text-base leading-[1.75]">
          <section>
            <h2 className={h2}>1. Agreement to these terms</h2>
            <p>
              By accessing or using Snaglist (“the Service”), you agree to be bound by these Terms of Service (“Terms”).
              If you do not agree to these Terms, do not use the Service. The Service is provided by{' '}
              <Dan>legal name of the provider, exactly as in the privacy policy</Dan> (“Snaglist”, “we”, “us”, “our”).
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
              Uploading older projects to your account is coming soon.
            </p>
          </section>

          <section>
            <h2 className={h2}>3. Accounts and companies</h2>
            <p className="mb-2">
              You can create an account by signing in with Apple, with Google, or with a sign-in link sent to your
              email address. When you use an account:
            </p>
            <ul className={list}>
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You are responsible for all activity that occurs under your account</li>
              <li>You must notify us immediately of any unauthorised use of your account</li>
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
              You retain ownership of all content you upload to the Service, including photos, project data,
              snag reports, and floor plans ("Your Content"). By using the Service, you grant us a limited
              licence to store, process, and display Your Content solely for the purpose of providing the Service to you.
            </p>
            <p className="mt-2">
              Content you add to a company’s projects stays in that company’s records if you leave the company
              or delete your account, as the <a href="/privacy#delete-your-account" className={link}>privacy policy</a> describes.
            </p>
            <p className="mt-2">
              <Dan>L5: who owns the photographs and notes a contractor submits through a Contractor link, and what licence Snaglist and the sender have to use them</Dan>
            </p>
            <p className="mt-2">
              You are responsible for ensuring you have the right to upload and share any content through the Service,
              including photos of construction sites.
            </p>
          </section>

          <section>
            <h2 className={h2}>5. Contractor links and sharing</h2>
            <p>
              A Contractor link shares the snags you choose with a contractor, who opens them in a web browser
              without a Snaglist account. The{' '}
              <a href="/privacy#contractor-links" className={link}>privacy policy</a> sets out exactly what a
              Contractor link shows.
            </p>
            <ul className={`${list} mt-2`}>
              <li>You choose the snags and the contractor, and you are responsible for sending the link only to the intended recipient.</li>
              <li>Anyone who has a link can open it, and a link can be forwarded. You are responsible for who you send it to. If you add a PIN, send it separately from the link.</li>
              <li>You control the link’s PIN, its expiry (1 to 90 days) and its revocation. Revoking a link stops it working; copies a recipient has already saved may remain with them.</li>
              <li>A contractor’s submission does not close a snag. Submitted work waits for review, and only your acceptance or a colleague’s closes the snag. You can also send work back with a reason.</li>
            </ul>
            <p className="mt-2">
              <Dan>L5: the terms that apply to someone who uses a Contractor link without a Snaglist account</Dan>
            </p>
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
              Company membership is free at launch. Paid company plans are coming soon. Snaglist Pro remains a separate subscription.
            </p>
            <ul className={`${list} mt-2`}>
              <li>Subscriptions offered in the iOS app are purchased and managed through the Apple App Store; this website has no subscription checkout</li>
              <li>Subscriptions renew automatically unless cancelled before the renewal date</li>
              <li>Refunds are subject to the applicable app store's refund policy</li>
              <li>We may change pricing with 30 days' notice</li>
              <li>Deleting your account does not cancel a subscription; cancel it in your Apple account’s subscription settings</li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>8. Service availability</h2>
            <p>
              We aim to provide a reliable service but do not guarantee uninterrupted access. The Service may
              be temporarily unavailable for maintenance, updates, or due to circumstances beyond our control.
              We are not liable for any loss arising from service downtime.
            </p>
          </section>

          <section>
            <h2 className={h2}>9. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Snaglist shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including loss of data, profits, or business opportunities,
              arising from your use of the Service.
            </p>
            <p className="mt-2">
              The Service is a tool for managing construction snag lists. It does not replace professional
              inspections, building control processes, or regulatory compliance. You remain responsible for
              all construction quality and safety decisions.
            </p>
          </section>

          <section>
            <h2 className={h2}>10. Disclaimer</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind, whether express
              or implied, including but not limited to warranties of merchantability, fitness for a particular
              purpose, and non-infringement.
            </p>
          </section>

          <section>
            <h2 className={h2}>11. Deleting your account and termination</h2>
            <p>
              You can delete your account in the app’s settings or in the Snaglist portal. If you are the only
              owner of a company, you must first hand it to another member or close it. Work you did in a
              company that stays open remains in that company’s records, shown as “Former member”. The{' '}
              <a href="/privacy#delete-your-account" className={link}>privacy policy</a> explains what is
              deleted and when. Deleting an account does not cancel an Apple subscription or remove copies
              already sent to others.
            </p>
            <p className="mt-2">
              We may suspend or terminate your account if you violate these Terms. Upon termination, your right
              to use the Service ceases immediately.
            </p>
          </section>

          <section>
            <h2 className={h2}>12. Changes to these terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material changes by email
              or through the Service. Continued use of the Service after changes take effect constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className={h2}>13. Governing law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of Ireland.
              Any disputes arising from these Terms or the Service shall be subject to the exclusive
              jurisdiction of the courts of Ireland.
            </p>
          </section>

          <section>
            <h2 className={h2}>14. Contact</h2>
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

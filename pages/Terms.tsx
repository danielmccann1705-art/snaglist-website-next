import React from 'react';
import { Wordmark } from '../app/components/Brand';

export const Terms: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Branded header bar — visible when opened standalone from the app */}
      <div className="policy-header bg-background-light border-b border-gray-100 px-5 py-4 flex items-center gap-2">
        <Wordmark />

        <span className="text-gray-300 mx-1">|</span>
        <span className="text-sm text-gray-500">Terms of Service</span>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-black tracking-[-0.033em] text-[#1A1D23] mb-1">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: 12 September 2026</p>

        <div className="space-y-10 text-[#6B7280] text-[15px] md:text-base leading-[1.75]">
          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing or using Snaglist ("the Service"), you agree to be bound by these Terms of Service ("Terms").
              If you do not agree to these Terms, do not use the Service. The Service is provided by Snaglist ("we", "us", "our").
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">2. Description of Service</h2>
            <p>
              Snaglist is an app for recording construction defects ("snags") with descriptions,
              photos and locations, and preparing a project record. Available features depend on
              your installed app version and plan. Online sharing requires the online service to
              be available. Website illustrations describe fictional examples; they are not screenshots
              or evidence that an unreleased feature is available.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">3. Accounts</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You are responsible for all activity that occurs under your account</li>
              <li>You must notify us immediately of any unauthorised use of your account</li>
              <li>You must be at least 16 years old to create an account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">4. Your Data</h2>
            <p>
              You retain ownership of all content you upload to the Service, including photos, project data,
              snag reports, and floor plans ("Your Content"). By using the Service, you grant us a limited
              licence to store, process, and display Your Content solely for the purpose of providing the Service to you.
            </p>
            <p className="mt-2">
              You are responsible for ensuring you have the right to upload and share any content through the Service,
              including photos of construction sites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">5. Contractor Links & Sharing</h2>
            <p>
              When you create a contractor link to share snag data with contractors or other parties:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>You are responsible for selecting the work and intended recipients to share with</li>
              <li>You are responsible for managing link expiry and PIN protection settings</li>
              <li>When the service is available, Contractor link recipients do not need to create an account to access the shared record</li>
              <li>Where link controls are available, use them to request revocation or expiry changes. A request is not confirmed until the service has processed it; downloaded copies may remain with recipients.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">6. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Use the Service for any unlawful purpose</li>
              <li>Upload malicious content or attempt to compromise the Service</li>
              <li>Share contractor links publicly or with unintended recipients in a way that exposes sensitive project data</li>
              <li>Attempt to access other users' accounts or data</li>
              <li>Use automated tools to scrape or extract data from the Service</li>
              <li>Interfere with the operation of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">7. Subscriptions & Payment</h2>
            <p>
              Snaglist offers free and paid subscription tiers. For paid subscriptions:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Subscriptions offered in the iOS app are purchased and managed through the Apple App Store; this website has no subscription checkout</li>
              <li>Subscriptions renew automatically unless cancelled before the renewal date</li>
              <li>Refunds are subject to the applicable app store's refund policy</li>
              <li>We may change pricing with 30 days' notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">8. Service Availability</h2>
            <p>
              We aim to provide a reliable service but do not guarantee uninterrupted access. The Service may
              be temporarily unavailable for maintenance, updates, or due to circumstances beyond our control.
              We are not liable for any loss arising from service downtime.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">9. Limitation of Liability</h2>
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
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">10. Disclaimer</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind, whether express
              or implied, including but not limited to warranties of merchantability, fitness for a particular
              purpose, and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">11. Termination</h2>
            <p>
              You may request account deletion using available account controls or by contacting support.
              If online controls are unavailable, email support@usesnaglist.com. We may suspend or terminate
              your account if you violate these Terms. Upon termination, your right to use the Service
              ceases immediately. Data requests are handled as described in the Privacy Policy;
              deleting an account does not cancel an Apple subscription or remove copies already sent to recipients.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">12. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material changes by email
              or through the Service. Continued use of the Service after changes take effect constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">13. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of Ireland.
              Any disputes arising from these Terms or the Service shall be subject to the exclusive
              jurisdiction of the courts of Ireland.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">14. Contact</h2>
            <p>
              If you have questions about these Terms, contact us at:
            </p>
            <a href="mailto:support@usesnaglist.com" className="text-primary hover:underline font-medium inline-block mt-1 py-2">support@usesnaglist.com</a>
          </section>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-6 text-center text-xs text-gray-400">
          &copy; 2026 Snaglist. All rights reserved.
        </div>
      </div>
    </div>
  );
};

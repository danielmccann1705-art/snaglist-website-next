import React from 'react';
import { Wordmark } from '../app/components/Brand';

export const Privacy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Branded header bar — visible when opened standalone from the app */}
      <div className="policy-header bg-background-light border-b border-gray-100 px-5 py-4 flex items-center gap-2">
        <Wordmark />

        <span className="text-gray-300 mx-1">|</span>
        <span className="text-sm text-gray-500">Privacy Policy</span>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-black tracking-[-0.033em] text-[#1A1D23] mb-1">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: 12 September 2026</p>

        <div className="space-y-10 text-[#6B7280] text-[15px] md:text-base leading-[1.75]">
          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">1. Who We Are</h2>
            <p>
              Snaglist ("we", "us", "our") is a construction snagging and punch list management platform.
              This Privacy Policy explains how we collect, use, and protect your personal information when
              you use our website (usesnaglist.com), mobile application, and related services (collectively, the "Service").
            </p>
            <p className="mt-3">
              The currently released app works offline and has no online project or account services.
              Online services, including account sync, Contractor links and the manager portal, are
              planned for v2.0. References to those features below describe their intended use when
              released; they do not mean that your current app uploads your project records.
              Website visits, support email and App Store subscriptions are separate from project sync.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">2. Information We Collect</h2>

            <h3 className="text-[15px] font-bold text-[#1A1D23] mb-1.5 mt-4">Information you provide</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Project data held on your device: project names, addresses, snag descriptions, photos and floor plans</li>
              <li>Communications: support requests, feedback</li>
              <li>Planned v2.0 account information: name, email address, sign-in identifier and any company/profile details you provide when using the online service</li>
              <li>Planned v2.0 shared project data: records and evidence you choose to make available through the online service</li>
            </ul>

            <h3 className="text-[15px] font-bold text-[#1A1D23] mb-1.5 mt-5">Information collected automatically</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Device information: device type, operating system, browser type</li>
              <li>Service requests and diagnostic information: pages or features requested, timestamps and errors</li>
              <li>IP address and browser request information processed when you connect to the website or online services</li>
            </ul>

            <h3 className="text-[15px] font-bold text-[#1A1D23] mb-1.5 mt-5">Planned v2.0 Contractor links</h3>
            <p>
              Contractor links are not available in the current app. The planned flow allows recipients
              to provide a name, completion notes and photos without creating an account, with basic
              device/browser information processed to operate the service. We will update this notice
              with the verified online data handling before launch.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To provide and maintain the Service</li>
              <li>To process snag reports, completions, and project data</li>
              <li>To send requested sign-in links, sharing messages and other service communications where those features are available</li>
              <li>To respond to support requests</li>
              <li>To improve our product and user experience</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">4. How We Share Your Information</h2>
            <p>We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>Service providers:</strong> providers used to deliver the website, operate available online features, handle support email and manage app subscriptions. Cloudflare delivers the website; Google Workspace handles support email; Apple handles App Store purchases and payments.</li>
              <li><strong>Recipients:</strong> when you send an exported report or photo, its recipient receives that copy. Scoped online project sharing is planned for v2.0.</li>
              <li><strong>Legal requirements:</strong> if required by law, regulation, or legal process</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">5. Data Storage & Security</h2>
            <p>
              The current app stores project records and files on your device and does not provide
              online project sync. Those records do not automatically appear in a browser or on another
              device. Online account and project storage are planned for v2.0.
              Keep copies of important records before changing devices or removing the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">6. Data Retention</h2>
            <p>
              Retention depends on the information and the service involved: device records remain
              in the app’s local storage; support correspondence is handled according to the purpose
              for which it was supplied and any applicable legal requirements. Contact us to request
              deletion of information we hold or to ask what records we can access. Online account and
              sharing retention will be described before those v2.0 services launch.
            </p>
            <p className="mt-2">
              Removing the app may remove device-only records. Cancelling an Apple subscription
              does not itself request account deletion. Copies you have sent to another person,
              including downloaded reports and photos, may remain with that recipient.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data</li>
              <li>Export your data in a portable format</li>
              <li>Object to or restrict certain processing</li>
              <li>Withdraw consent where processing is consent-based</li>
            </ul>
            <p className="mt-3">
              You may also complain to the data-protection authority in your country. In the UK,
              you can contact the <a href="https://ico.org.uk/make-a-complaint/" className="text-primary hover:underline">Information Commissioner’s Office</a>.
            </p>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:support@usesnaglist.com" className="text-primary hover:underline font-medium inline-block py-1">support@usesnaglist.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">8. Cookies</h2>
            <p>
              The public website does not require an account or a waitlist sign-up. Its app-download,
              template and illustration controls do not install an advertising or analytics SDK.
              Hosting services process requests to deliver and protect the site. Planned v2.0 account
              and Contractor link services will need session information to maintain access; those
              services are not part of the current app.
              Your browser settings let you inspect and manage stored site data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">9. Children's Privacy</h2>
            <p>
              The Service is not intended for anyone under 16. We do not knowingly collect personal
              information from children under 16.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes
              by email or through the Service where appropriate. The date above identifies the
              latest version; changes to this notice do not remove your data-protection rights.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1D23] mb-2">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, contact us at:
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

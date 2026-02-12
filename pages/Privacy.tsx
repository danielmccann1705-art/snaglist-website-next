import React from 'react';
import { ClipboardList } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Branded header bar — visible when opened standalone from the app */}
      <div className="bg-background-light border-b border-gray-100 px-5 py-4 flex items-center gap-2">
        <ClipboardList className="text-primary w-5 h-5" />
        <span className="font-bold text-sm text-[#181411]">Snaglist</span>
        <span className="text-gray-300 mx-1">|</span>
        <span className="text-sm text-gray-500">Privacy Policy</span>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-black tracking-[-0.033em] text-[#181411] mb-1">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: 11 February 2025</p>

        <div className="space-y-10 text-[#475569] text-[15px] md:text-base leading-[1.75]">
          <section>
            <h2 className="text-lg font-bold text-[#181411] mb-2">1. Who We Are</h2>
            <p>
              Snaglist ("we", "us", "our") is a construction snagging and punch list management platform.
              This Privacy Policy explains how we collect, use, and protect your personal information when
              you use our website (snaglist.dev), mobile application, and related services (collectively, the "Service").
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#181411] mb-2">2. Information We Collect</h2>

            <h3 className="text-[15px] font-bold text-[#181411] mb-1.5 mt-4">Information you provide</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Account details: name, email address, password</li>
              <li>Profile information: company name, job role</li>
              <li>Project data: project names, addresses, snag descriptions, photos, floor plans</li>
              <li>Communications: support requests, feedback</li>
              <li>Waitlist sign-ups: email address</li>
            </ul>

            <h3 className="text-[15px] font-bold text-[#181411] mb-1.5 mt-5">Information collected automatically</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Device information: device type, operating system, browser type</li>
              <li>Usage data: pages visited, features used, timestamps</li>
              <li>IP address and approximate location (country/region level)</li>
            </ul>

            <h3 className="text-[15px] font-bold text-[#181411] mb-1.5 mt-5">Information from Magic Links</h3>
            <p>
              When a contractor accesses a shared Magic Link, we collect their name (if provided),
              completion notes, uploaded photos, and basic device/browser information. Contractors
              do not need to create an account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#181411] mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To provide and maintain the Service</li>
              <li>To process snag reports, completions, and project data</li>
              <li>To send you service-related notifications (e.g. completion updates, PIN codes)</li>
              <li>To respond to support requests</li>
              <li>To improve our product and user experience</li>
              <li>To send waitlist updates and product launch notifications</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#181411] mb-2">4. How We Share Your Information</h2>
            <p>We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>Service providers:</strong> hosting (Fly.io), email delivery, cloud storage, analytics — only as needed to operate the Service</li>
              <li><strong>Project collaborators:</strong> when you share a Magic Link, the recipient can see the snag data you've chosen to share</li>
              <li><strong>Legal requirements:</strong> if required by law, regulation, or legal process</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#181411] mb-2">5. Data Storage & Security</h2>
            <p>
              Your data is stored on secure servers hosted by Fly.io. We use encryption in transit (TLS)
              and at rest. Project photos are stored in secure cloud storage with access controls.
              We implement industry-standard security measures, but no system is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#181411] mb-2">6. Data Retention</h2>
            <p>
              We retain your account data for as long as your account is active. Project data is retained
              for the duration of your subscription. If you delete your account, we will delete your personal
              data within 30 days, except where we are required to retain it by law.
            </p>
            <p className="mt-2">
              Waitlist email addresses are retained until we launch and you either sign up or unsubscribe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#181411] mb-2">7. Your Rights</h2>
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
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:Snaglistapp@gmail.com" className="text-primary hover:underline font-medium inline-block py-1">Snaglistapp@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#181411] mb-2">8. Cookies</h2>
            <p>
              We use essential cookies to keep you logged in and remember your preferences.
              We may use analytics cookies to understand how the Service is used. You can control
              cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#181411] mb-2">9. Children's Privacy</h2>
            <p>
              The Service is not intended for anyone under 16. We do not knowingly collect personal
              information from children under 16.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#181411] mb-2">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes
              by email or through the Service. Your continued use of the Service after changes take effect
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#181411] mb-2">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, contact us at:
            </p>
            <a href="mailto:Snaglistapp@gmail.com" className="text-primary hover:underline font-medium inline-block mt-1 py-2">Snaglistapp@gmail.com</a>
          </section>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-6 text-center text-xs text-gray-400">
          &copy; 2025 Snaglist. All rights reserved.
        </div>
      </div>
    </div>
  );
};

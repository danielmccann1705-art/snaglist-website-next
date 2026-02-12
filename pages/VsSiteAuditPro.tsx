import React from 'react';
import { CheckCircle2, X, ArrowLeft, HelpCircle } from 'lucide-react';
import { WaitlistForm } from '../components/WaitlistForm';
import { Page } from '../types';

interface VsSiteAuditProProps {
  onNavigate: (page: Page) => void;
}

const Check = () => <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />;

export const VsSiteAuditPro: React.FC<VsSiteAuditProProps> = ({ onNavigate }) => {
  return (
    <div className="bg-background-light">
      {/* Hero */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => onNavigate(Page.COMPARISON)}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All comparisons
          </button>
          <span className="text-primary font-bold tracking-wider uppercase text-xs">Honest Comparison</span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mt-3 mb-6">
            Snaglist vs Site Audit Pro
          </h1>
          <p className="text-lg text-[#475569] leading-relaxed max-w-2xl">
            Both built for snagging. Different approaches to getting the job done.
          </p>
        </div>
      </section>

      {/* TL;DR */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            TL;DR
          </h2>
          <p className="text-[#475569] leading-relaxed">
            Site Audit Pro is a solid, established snagging app with a 4.8-star rating and nearly 10,000 reviews.
            It's been around for years and does the basics well — capture issues, annotate photos, generate PDF
            reports. Snaglist does those same things, but adds Magic Links so your contractors can view and respond
            to snags without downloading anything. If you work alone and just need personal snag tracking, Site
            Audit Pro is a proven choice. If you need your subcontractors to actually <em>see and act on</em> the
            snags you log, that's what Snaglist was built for.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 overflow-x-auto">
          <h2 className="text-3xl font-bold text-center mb-10">At a Glance</h2>
          <table className="w-full min-w-[650px] border border-gray-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-[#f8f7f5]">
              <tr>
                <th className="px-5 py-4 text-left font-bold uppercase text-xs text-gray-500 w-[28%]">Feature</th>
                <th className="px-5 py-4 text-left text-primary font-bold text-base bg-primary/5 w-[36%]">Snaglist</th>
                <th className="px-5 py-4 text-left text-gray-500 font-bold text-base w-[36%]">Site Audit Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ['Built for', 'Site managers + their contractors', 'Individual auditors and inspectors'],
                ['Contractor access', 'Magic Links — no app, no login', 'Email PDF reports manually'],
                ['Photo markup', 'Yes, with annotations', 'Yes, with annotations'],
                ['PDF reports', 'One-tap, branded', 'Customisable templates (8 styles)'],
                ['GPS & timestamps', 'Yes', 'Yes (on photos)'],
                ['Offline mode', 'Yes', 'Yes'],
                ['Cloud sync', 'Included', 'Subscription add-on'],
                ['Status tracking', 'Real-time, 5-stage per snag', 'Basic completion tracking'],
                ['Pricing', 'Free / Pro at £14.99/mo', '~£10.50/mo or ~£52/year'],
                ['Platform', 'iOS (Android coming)', 'iOS only'],
              ].map(([feature, snaglist, sap], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf9]'}>
                  <td className="px-5 py-3.5 font-medium text-[#181411]">{feature}</td>
                  <td className="px-5 py-3.5 bg-primary/5 text-[#181411]">{snaglist}</td>
                  <td className="px-5 py-3.5 text-[#475569]">{sap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          <h2 className="text-3xl font-bold">Detailed Comparison</h2>

          {/* Core Difference */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#181411]">The Core Difference: One-Way vs Two-Way</h3>
            <p className="text-[#475569] leading-relaxed">
              Site Audit Pro is essentially a one-way tool. You capture snags, generate a report, and email
              the PDF to your contractor. What happens next is on them. You don't know if they've opened it,
              read it, or started the work — unless you ring them.
            </p>
            <p className="text-[#475569] leading-relaxed">
              Snaglist creates a two-way workflow. You capture snags, and your contractor receives a Magic Link.
              They open it in their browser, see the annotated photos with descriptions, and can submit completion
              evidence (photos, notes) directly. The snag status updates in real time. No chasing. No "did you
              get my email?"
            </p>
            <p className="text-[#475569] leading-relaxed">
              If you're a one-person operation doing home inspections or personal snag tracking, you might not
              need that. If you manage subcontractors and spend half your day chasing them for updates, it
              changes everything.
            </p>
          </div>

          {/* Report Quality */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#181411]">Report Quality</h3>
            <p className="text-[#475569] leading-relaxed">
              Both apps generate professional PDF reports. Site Audit Pro offers 8 report templates with
              branding, logos, and customisable layouts — it's been refining this for years and it shows.
              You get GPS stamps, timestamps, and clean formatting.
            </p>
            <p className="text-[#475569] leading-relaxed">
              Snaglist's PDF reports are one-tap exports with your branding, every photo, and every status
              update. Less template variety right now, but the report includes live status data (not just a
              snapshot), which matters if you're reporting on progress rather than a single audit.
            </p>
          </div>

          {/* Photo Markup */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#181411]">Photo Markup</h3>
            <p className="text-[#475569] leading-relaxed">
              Nearly identical. Both let you annotate images with highlights, drawings, and arrows to pinpoint
              defects. Site Audit Pro's markup tools are mature and well-tested. Snaglist's are designed for
              the same purpose with an emphasis on speed — fewer options, faster workflow.
            </p>
          </div>

          {/* Cloud Sync */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#181411]">Cloud Sync & Multi-Device</h3>
            <p className="text-[#475569] leading-relaxed">
              Site Audit Pro offers cloud sync as a subscription add-on. Without it, your data lives on one
              device. If your phone breaks or you want to access snags from your tablet at the office, you
              need the paid tier.
            </p>
            <p className="text-[#475569] leading-relaxed">
              Snaglist includes cloud sync from the start. Your snag data is accessible across devices, and
              Magic Link data is stored centrally — your contractors access it through the web, not a synced app.
            </p>
          </div>

          {/* Status Tracking */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#181411]">Status Tracking</h3>
            <p className="text-[#475569] leading-relaxed">
              Site Audit Pro tracks completion at a basic level — you can mark items as done. But there's no
              real-time status flow, no contractor-side updates, and no visibility into whether work is
              actually happening.
            </p>
            <p className="text-[#475569] leading-relaxed">
              Snaglist tracks five statuses per snag: Open, In Progress, Resolved, Verified, Closed. Contractors
              can update status through Magic Links. You see progress without picking up the phone.
            </p>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#181411]">Pricing</h3>
            <p className="text-[#475569] leading-relaxed">
              Site Audit Pro charges ~£10.50/month or ~£52/year for the full subscription (cloud, multi-device,
              multi-image). The base app is a one-time purchase of ~£10, but feature-limited.
            </p>
            <p className="text-[#475569] leading-relaxed">
              Snaglist Pro is £14.99/month with everything included — unlimited projects, PDF exports, photo
              markup, cloud sync, and unlimited Magic Links for contractors. No per-feature unlocks.
            </p>
            <p className="text-[#475569] leading-relaxed">
              For an individual, Site Audit Pro is cheaper. For someone managing a team of subcontractors, the
              Magic Link feature alone justifies the difference — you're not paying per contractor, and they
              don't need their own subscription.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's Best For */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Snaglist */}
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
              <h3 className="text-lg font-bold text-[#181411] mb-5">Snaglist is best for</h3>
              <ul className="space-y-3">
                {[
                  'Site managers coordinating subcontractors on snag lists',
                  'Anyone tired of emailing PDFs and waiting for replies',
                  'Teams that need real-time status tracking on defects',
                  'Professionals who want contractors to respond through the system',
                  'People who value speed of capture in the field',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#475569]">
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Site Audit Pro */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-[#181411] mb-5">Site Audit Pro is best for</h3>
              <ul className="space-y-3">
                {[
                  'Individual surveyors and inspectors doing solo audits',
                  'Home snagging professionals producing one-off reports',
                  'People who need maximum report template flexibility',
                  'Users who prefer a one-time purchase over a subscription',
                  'Anyone who doesn\'t need contractors to interact digitally',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#475569]">
                    <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Both are good snagging apps. The right choice depends on whether your workflow ends at
            "send the report" or continues through to "verify the fix."
          </p>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Pricing Comparison</h2>
          <table className="w-full min-w-[600px] border border-gray-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-[#f8f7f5]">
              <tr>
                <th className="px-5 py-4 text-left font-bold uppercase text-xs text-gray-500"></th>
                <th className="px-4 py-4 text-center font-bold text-xs bg-primary/5 text-primary">Snaglist Free</th>
                <th className="px-4 py-4 text-center font-bold text-xs bg-primary/5 text-primary">Snaglist Pro</th>
                <th className="px-4 py-4 text-center font-bold text-xs text-gray-500">Site Audit Pro (base)</th>
                <th className="px-4 py-4 text-center font-bold text-xs text-gray-500">Site Audit Pro (sub)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-center">
              {[
                ['Price', '£0/mo', '£14.99/mo', '~£10 one-time', '~£10.50/mo'],
                ['Cloud sync', 'Yes', 'Yes', 'No', 'Yes'],
                ['PDF reports', '—', 'Branded, one-tap', 'Basic', 'Full templates'],
                ['Contractor access', '—', 'Magic Links (unlimited)', '—', '—'],
                ['Multi-device', 'Yes', 'Yes', 'No', 'Yes'],
                ['Status tracking', 'Basic', '5-stage, real-time', 'Basic', 'Basic'],
              ].map(([label, ...values], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf9]'}>
                  <td className="px-5 py-3.5 text-left font-medium text-[#181411]">{label}</td>
                  {values.map((v, j) => (
                    <td key={j} className={`px-4 py-3.5 ${j < 2 ? 'bg-primary/5' : ''} text-[#475569]`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            <details className="group rounded-lg bg-background-light p-1 open:bg-white transition-all" open>
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-md p-4 font-medium text-[#181411] hover:bg-white/50">
                <span className="text-base font-bold">I already use Site Audit Pro. Is it worth switching?</span>
                <span className="transition group-open:rotate-180 text-gray-400">&#9660;</span>
              </summary>
              <div className="text-[#475569] px-4 pb-4 pt-0 text-sm leading-relaxed">
                If your workflow is: capture snags, export PDF, email it, done — Site Audit Pro does that
                job well and you may not need to switch. If you spend time chasing contractors for updates
                after sending reports, Snaglist's Magic Links and real-time status tracking solve that
                specific problem.
              </div>
            </details>
            <details className="group rounded-lg bg-background-light p-1 open:bg-white transition-all">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-md p-4 font-medium text-[#181411] hover:bg-white/50">
                <span className="text-base font-bold">Does Snaglist have as many report templates?</span>
                <span className="transition group-open:rotate-180 text-gray-400">&#9660;</span>
              </summary>
              <div className="text-[#475569] px-4 pb-4 pt-0 text-sm leading-relaxed">
                Not yet. Site Audit Pro has had years to build out 8 templates. Snaglist focuses on one
                clean, branded format that includes live status data. More customisation is planned.
              </div>
            </details>
            <details className="group rounded-lg bg-background-light p-1 open:bg-white transition-all">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-md p-4 font-medium text-[#181411] hover:bg-white/50">
                <span className="text-base font-bold">Can my contractors use Snaglist without paying?</span>
                <span className="transition group-open:rotate-180 text-gray-400">&#9660;</span>
              </summary>
              <div className="text-[#475569] px-4 pb-4 pt-0 text-sm leading-relaxed">
                Yes. Contractors access their snags through a Magic Link in their browser. No app download,
                no account, no licence fee.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#181411] py-16 md:py-20">
        <div className="max-w-[960px] mx-auto px-4 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] mb-4">
            Snagging that goes both ways.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Capture snags, share via Magic Links, track progress in real time.
            Join the waitlist for early access.
          </p>
          <div className="flex justify-center mb-4">
            <WaitlistForm variant="hero" darkMode />
          </div>
          <p className="text-gray-600 text-xs mt-2">iOS first. Android to follow.</p>
        </div>
      </section>
    </div>
  );
};

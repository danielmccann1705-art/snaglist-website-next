import React from 'react';
import { CheckCircle2, X, ArrowLeft, HelpCircle } from 'lucide-react';
import { WaitlistForm } from '../components/WaitlistForm';
import { Page } from '../types';

interface VsFieldwireProps {
  onNavigate: (page: Page) => void;
}

const Check = () => <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />;
const No = () => <X className="w-5 h-5 text-gray-300 shrink-0" />;

export const VsFieldwire: React.FC<VsFieldwireProps> = ({ onNavigate }) => {
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
            Snaglist vs Fieldwire
          </h1>
          <p className="text-lg text-[#475569] leading-relaxed max-w-2xl">
            Two different tools solving different problems. Here's how to decide.
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
            Fieldwire is a full-featured construction management platform — task scheduling, RFIs, submittals,
            plan viewing, and punch lists all in one. Snaglist does one thing: snagging. If you need a project
            management suite for your entire firm, Fieldwire is a strong option. If you're a site manager who
            needs to capture defects fast, share them with contractors who won't download an app, and generate
            PDF reports in one tap — Snaglist was built for that and nothing else.
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
                <th className="px-5 py-4 text-left text-gray-500 font-bold text-base w-[36%]">Fieldwire</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ['Built for', 'Site managers doing snagging', 'Project teams managing entire jobsites'],
                ['Capture speed', '5 seconds, one-handed', 'Multi-step task creation'],
                ['Contractor access', 'Magic Links — no app, no login', 'Requires Fieldwire account'],
                ['PDF reports', 'One-tap branded exports', 'Custom reports (Business plan+)'],
                ['Floor plans', 'Pin-to-plan (coming soon)', 'Full plan management with markup'],
                ['Offline mode', 'Yes', 'Yes'],
                ['Learning curve', 'Minutes', 'Hours to days'],
                ['Pro pricing', '£14.99/mo flat', '$54/user/mo'],
                ['Platform', 'iOS (Android coming)', 'iOS, Android, Web'],
              ].map(([feature, snaglist, fieldwire], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf9]'}>
                  <td className="px-5 py-3.5 font-medium text-[#181411]">{feature}</td>
                  <td className="px-5 py-3.5 bg-primary/5 text-[#181411]">{snaglist}</td>
                  <td className="px-5 py-3.5 text-[#475569]">{fieldwire}</td>
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

          {/* Snag Capture Speed */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#181411]">Snag Capture Speed</h3>
            <p className="text-[#475569] leading-relaxed">
              Snaglist was designed for one-handed use on a live construction site. Photograph a defect, mark it up,
              assign a trade, done — five seconds. Every screen was built to minimise taps when you're holding a
              torch in one hand and your phone in the other.
            </p>
            <p className="text-[#475569] leading-relaxed">
              Fieldwire's task creation is more structured. You select a plan, drop a pin, fill in fields, assign a
              category and priority. That structure is valuable for complex project tracking, but it's slower for
              rapid-fire defect capture when you're walking a floor and logging 30 snags in an hour.
            </p>
          </div>

          {/* Contractor Access */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#181411]">Contractor Access</h3>
            <p className="text-[#475569] leading-relaxed">
              This is the sharpest difference. Snaglist uses Magic Links — you send your subcontractor a link via
              text or WhatsApp, they tap it, and they see their assigned snags with annotated photos and clear
              descriptions. No account. No download. No password.
            </p>
            <p className="text-[#475569] leading-relaxed">
              Fieldwire requires contractors to create a Fieldwire account and be invited to a project. For large
              GC firms where everyone already uses Fieldwire, that's fine. For site managers working with small
              subbies who won't install another app, it's a dealbreaker. You know your contractors — if they
              struggle with email, a Magic Link is the difference between them seeing the snag and ignoring
              your message.
            </p>
          </div>

          {/* Reporting */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#181411]">Reporting</h3>
            <p className="text-[#475569] leading-relaxed">
              Snaglist generates branded PDF reports in one tap. Every photo, every status update, every note —
              formatted professionally and ready to send to your client from the front seat of your van.
            </p>
            <p className="text-[#475569] leading-relaxed">
              Fieldwire offers reporting too, but custom PDF exports are limited to the Business plan ($74/user/month)
              and above. On the Pro plan, you get basic spreadsheet exports. If client-facing reports matter to your
              workflow, check which Fieldwire tier you'd actually need.
            </p>
          </div>

          {/* Plan Management */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#181411]">Plan Management</h3>
            <p className="text-[#475569] leading-relaxed">
              This is where Fieldwire genuinely excels. Full 2D/3D plan viewing, version-controlled blueprints,
              hyperlinking between sheets, markup tools — it's a proper plan management system. If your workflow
              revolves around living inside drawings and managing RFIs, Fieldwire handles that well.
            </p>
            <p className="text-[#475569] leading-relaxed">
              Snaglist's floor plan feature (coming soon) will support pin-to-plan for snag locations, but it's
              not trying to be a full plan management tool. It shows your contractor <em>where</em> the snag is.
              That's it.
            </p>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#181411]">Pricing</h3>
            <p className="text-[#475569] leading-relaxed">
              Snaglist's Pro plan is £14.99/month — flat rate, not per user. Contractors accessing Magic Links
              don't need accounts or licences.
            </p>
            <p className="text-[#475569] leading-relaxed">
              Fieldwire's paid plans start at $54/user/month (Pro) and go up to $94/user/month (Business Plus).
              For a team of 5, that's $270–$470/month. The free tier caps at 5 users with limited features.
              Fieldwire's pricing makes sense for firms managing large, multi-trade projects — but if snagging
              is your primary use case, you're paying for a lot of functionality you won't touch.
            </p>
          </div>

          {/* Ease of Use */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#181411]">Ease of Use</h3>
            <p className="text-[#475569] leading-relaxed">
              Fieldwire is powerful, but users consistently mention a steep learning curve. Getting your team
              onboarded and your subcontractors comfortable takes time and sometimes dedicated training.
            </p>
            <p className="text-[#475569] leading-relaxed">
              Snaglist was built so there's nothing to learn. If you can take a photo, you can use Snaglist.
              Your contractors see a web page, not an app interface. Zero training.
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
                  'Site managers and clerk of works doing snagging and close-out',
                  'Small to mid-size contractors who need speed over project management',
                  'Anyone working with subcontractors who won\'t install apps',
                  'Teams that need professional PDF reports without an enterprise price tag',
                  'People tired of tracking snags in WhatsApp and spreadsheets',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#475569]">
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Fieldwire */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-[#181411] mb-5">Fieldwire is best for</h3>
              <ul className="space-y-3">
                {[
                  'General contractors managing complex, multi-trade jobsites',
                  'Firms that need full RFI, submittal, and scheduling workflows',
                  'Large teams where everyone is already on Fieldwire',
                  'Projects where plan management and markup are the primary workflow',
                  'Organisations with the budget and time for onboarding',
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
            Neither tool is "better" — they solve different problems at different scales.
          </p>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Pricing Comparison</h2>
          <table className="w-full min-w-[700px] border border-gray-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-[#f8f7f5]">
              <tr>
                <th className="px-5 py-4 text-left font-bold uppercase text-xs text-gray-500"></th>
                <th className="px-4 py-4 text-center font-bold text-xs bg-primary/5 text-primary">Snaglist Free</th>
                <th className="px-4 py-4 text-center font-bold text-xs bg-primary/5 text-primary">Snaglist Pro</th>
                <th className="px-4 py-4 text-center font-bold text-xs text-gray-500">Fieldwire Free</th>
                <th className="px-4 py-4 text-center font-bold text-xs text-gray-500">Fieldwire Pro</th>
                <th className="px-4 py-4 text-center font-bold text-xs text-gray-500">Fieldwire Business</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-center">
              {[
                ['Price', '£0/mo', '£14.99/mo', '$0/mo', '$54/user/mo', '$74/user/mo'],
                ['Users', '1', 'Unlimited links', 'Up to 5', 'Per-seat', 'Per-seat'],
                ['Projects', '1', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'],
                ['PDF Reports', '—', 'Yes', '—', 'Basic', 'Custom'],
                ['Cost for 5 users', '£0', '£14.99', '$0', '$270/mo', '$370/mo'],
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
                <span className="text-base font-bold">Can I use both Snaglist and Fieldwire?</span>
                <span className="transition group-open:rotate-180 text-gray-400">&#9660;</span>
              </summary>
              <div className="text-[#475569] px-4 pb-4 pt-0 text-sm leading-relaxed">
                Yes. Some teams use Fieldwire for overall project management and Snaglist specifically for
                snagging and close-out, since the Magic Link workflow is faster for getting subcontractors
                to act on defects.
              </div>
            </details>
            <details className="group rounded-lg bg-background-light p-1 open:bg-white transition-all">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-md p-4 font-medium text-[#181411] hover:bg-white/50">
                <span className="text-base font-bold">Is Fieldwire overkill for snagging?</span>
                <span className="transition group-open:rotate-180 text-gray-400">&#9660;</span>
              </summary>
              <div className="text-[#475569] px-4 pb-4 pt-0 text-sm leading-relaxed">
                If snagging and defect management is your primary use case, yes — you'd be paying for scheduling,
                RFIs, submittals, and plan management features you may not need. Snaglist is purpose-built for
                that one job.
              </div>
            </details>
            <details className="group rounded-lg bg-background-light p-1 open:bg-white transition-all">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-md p-4 font-medium text-[#181411] hover:bg-white/50">
                <span className="text-base font-bold">Does Snaglist work on Android?</span>
                <span className="transition group-open:rotate-180 text-gray-400">&#9660;</span>
              </summary>
              <div className="text-[#475569] px-4 pb-4 pt-0 text-sm leading-relaxed">
                Snaglist is launching on iOS first, with Android to follow. Join the waitlist for early access.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#181411] py-16 md:py-20">
        <div className="max-w-[960px] mx-auto px-4 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] mb-4">
            Purpose-built for snagging. Nothing else.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Capture snags in 5 seconds, share via Magic Links, generate PDF reports in one tap.
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

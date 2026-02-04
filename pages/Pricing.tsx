import React, { useState } from 'react';
import { Check, X, CheckCircle2 } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="flex-grow">
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-[#181411] text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
            Simple plans. <span className="text-primary">No hidden fees.</span>
          </h1>
          <p className="text-[#594a42] text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
            Manage your snag lists efficiently with tools built for site managers. Choose the plan that fits your project needs.
          </p>
        </div>
        {/* Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex h-12 items-center rounded-xl bg-[#e6dfdb] p-1.5 relative">
            <div className="absolute -top-3 -right-6 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-bounce">
              Save 33%
            </div>
            <button
              onClick={() => setBilling('monthly')}
              className={`h-full px-6 rounded-lg text-sm font-bold transition-all ${billing === 'monthly' ? 'bg-white shadow-sm text-[#181411]' : 'text-[#594a42]'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`h-full px-6 rounded-lg text-sm font-bold transition-all ${billing === 'yearly' ? 'bg-white shadow-sm text-[#181411]' : 'text-[#594a42]'}`}
            >
              Yearly
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Free */}
            <div className="flex flex-col gap-6 rounded-2xl border border-[#e6dfdb] bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <h3 className="text-[#181411] text-lg font-bold">Free</h3>
                <div className="flex items-baseline gap-1 text-[#181411]">
                  <span className="text-4xl font-black tracking-tight">£0</span>
                  <span className="text-base font-medium opacity-60">/mo</span>
                </div>
                <p className="text-sm text-[#594a42]">Perfect for individuals just getting started.</p>
              </div>
              <button className="w-full h-12 rounded-lg bg-[#f5f2f0] text-[#181411] text-sm font-bold hover:bg-[#e6dfdb] transition-colors">Sign up free</button>
              <div className="space-y-4 pt-2">
                <div className="flex gap-3 text-sm text-[#594a42]"><Check className="text-primary w-5 h-5" /> <span>For individuals</span></div>
                <div className="flex gap-3 text-sm text-[#594a42]"><Check className="text-primary w-5 h-5" /> <span>Basic snagging tools</span></div>
                <div className="flex gap-3 text-sm text-[#594a42]"><Check className="text-primary w-5 h-5" /> <span>1 Project limit</span></div>
                <div className="flex gap-3 text-sm text-[#594a42] opacity-50"><X className="w-5 h-5" /> <span>No PDF exports</span></div>
              </div>
            </div>

            {/* Pro */}
            <div className="relative flex flex-col gap-6 rounded-2xl border-2 border-primary bg-white p-8 shadow-xl md:-mt-4 md:mb-4 z-10">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-1/2">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">Popular</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-[#181411] text-lg font-bold">Pro</h3>
                <div className="flex items-baseline gap-1 text-[#181411]">
                  <span className="text-5xl font-black tracking-tight">£14.99</span>
                  <span className="text-base font-medium opacity-60">/mo</span>
                </div>
                <p className="text-sm text-[#594a42]">For professional site managers managing multiple sites.</p>
              </div>
              <button className="w-full h-12 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-md">Start Pro Trial</button>
              <p className="text-xs text-center text-[#8c725f] -mt-3">No credit card required</p>
              <div className="space-y-4 pt-2">
                {[
                  "Everything in Free",
                  "Unlimited projects",
                  "Professional PDF exports",
                  "Priority email support",
                  "Photo markup tools"
                ].map((item, i) => (
                   <div key={i} className="flex gap-3 text-sm text-[#181411] font-medium"><CheckCircle2 className="text-primary w-5 h-5" /> <span>{item}</span></div>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="flex flex-col gap-6 rounded-2xl border border-[#e6dfdb] bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <h3 className="text-[#181411] text-lg font-bold">Team</h3>
                <div className="flex items-baseline gap-1 text-[#181411]">
                  <span className="text-4xl font-black tracking-tight">£39.99</span>
                  <span className="text-base font-medium opacity-60">/mo</span>
                </div>
                <p className="text-sm text-[#594a42]">For growing construction firms needing control.</p>
              </div>
              <button className="w-full h-12 rounded-lg bg-[#f5f2f0] text-[#181411] text-sm font-bold hover:bg-[#e6dfdb] transition-colors">Contact Sales</button>
              <div className="space-y-4 pt-2">
                {[
                  "Everything in Pro",
                  "Admin controls & dashboard",
                  "Team assignment & roles",
                  "API Access",
                  "SSO Integration"
                ].map((item, i) => (
                   <div key={i} className="flex gap-3 text-sm text-[#594a42]"><Check className="text-primary w-5 h-5" /> <span>{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white border-t border-[#e6dfdb]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[#181411] text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
             <details className="group rounded-lg bg-background-light p-1 open:bg-white transition-all">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-md p-4 font-medium text-[#181411] transition-colors hover:bg-white/50">
                    <span className="text-base font-bold">Can I switch plans later?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <div className="text-[#594a42] px-4 pb-4 pt-0 text-sm leading-relaxed">
                    Absolutely. You can upgrade or downgrade your plan at any time from your account settings.
                </div>
             </details>
             <details className="group rounded-lg bg-background-light p-1 open:bg-white transition-all" open>
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-md p-4 font-medium text-[#181411] transition-colors hover:bg-white/50">
                    <span className="text-base font-bold">Is there a free trial for the Pro plan?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <div className="text-[#594a42] px-4 pb-4 pt-0 text-sm leading-relaxed">
                    Yes, we offer a 14-day free trial for the Pro plan with full access to all features. No credit card is required.
                </div>
             </details>
          </div>
        </div>
      </section>
    </div>
  );
};
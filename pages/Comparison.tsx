import React from 'react';
import { ArrowRight, CheckCircle2, Link, Camera, MapPin } from 'lucide-react';
import { Page } from '../types';
import { WaitlistForm } from '../components/WaitlistForm';

interface ComparisonProps {
  onNavigate: (page: Page) => void;
}

export const Comparison: React.FC<ComparisonProps> = ({ onNavigate }) => {
  const comparisons = [
    {
      page: Page.VS_FIELDWIRE,
      competitor: 'Fieldwire',
      tagline: 'Full project management platform vs purpose-built snagging',
      verdict: 'Fieldwire manages entire jobsites. Snaglist captures snags in 5 seconds and shares them via Magic Links. Different tools for different problems.',
      keyDiff: [
        'Magic Links vs requiring contractor accounts',
        '£14.99/mo flat vs $54+/user/mo',
        'Minutes to learn vs hours of onboarding',
      ],
    },
    {
      page: Page.VS_SITE_AUDIT_PRO,
      competitor: 'Site Audit Pro',
      tagline: 'Solo audit tool vs two-way contractor workflow',
      verdict: 'Site Audit Pro is great for individual inspectors. Snaglist adds real-time contractor collaboration so your subbies can see and respond to snags without downloading anything.',
      keyDiff: [
        'Two-way Magic Links vs one-way PDF exports',
        'Cloud sync included vs subscription add-on',
        '5-stage status tracking vs basic completion',
      ],
    },
  ];

  return (
    <div className="bg-background-light">
      {/* Hero */}
      <section className="py-16 md:py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-primary font-bold tracking-wider uppercase text-xs">Honest Comparisons</span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
            How Snaglist compares
          </h1>
          <p className="text-[#475569] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            No spin. No fake feature matrices. Just an honest look at what each tool does well
            and who it's built for.
          </p>
        </div>
      </section>

      {/* Comparison Cards */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {comparisons.map((c) => (
            <button
              key={c.page}
              onClick={() => onNavigate(c.page)}
              className="w-full text-left bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-[#181411] group-hover:text-primary transition-colors">
                    Snaglist vs {c.competitor}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{c.tagline}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </div>
              <p className="text-[#475569] leading-relaxed mb-6">{c.verdict}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                {c.keyDiff.map((diff, i) => (
                  <span key={i} className="text-xs font-medium text-primary bg-primary/5 px-3 py-1.5 rounded-full">
                    {diff}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Why Snaglist */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What sets Snaglist apart</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Link />, title: 'Magic Links', desc: 'Share live snag lists with contractors instantly. No app download, no account, no training.' },
              { icon: <Camera />, title: '5-Second Capture', desc: 'Photograph, annotate, assign — one-handed, offline, from a scaffold.' },
              { icon: <MapPin />, title: 'Pin-to-Plan', desc: 'Drop pins on floor plans so your subbies know exactly where to go. Coming soon.' },
            ].map((f, i) => (
              <div key={i} className="bg-background-light p-6 rounded-xl border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-primary mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#181411] py-16 md:py-20">
        <div className="max-w-[960px] mx-auto px-4 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] mb-4">
            Ready to see for yourself?
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Join the waitlist for early access to Snaglist.
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

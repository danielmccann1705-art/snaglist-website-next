import React from 'react';
import { ArrowRight } from 'lucide-react';
import { WaitlistForm } from '../components/WaitlistForm';
import { ukSnaggingPersonas } from '../data/personas';

interface SnaggingAppForProps {
  onSelectPersona: (slug: string) => void;
}

export const SnaggingAppFor: React.FC<SnaggingAppForProps> = ({ onSelectPersona }) => {
  return (
    <div className="bg-background-light">
      {/* Hero */}
      <section className="py-16 md:py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-primary font-bold tracking-wider uppercase text-xs">Built for Construction</span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
            Snagging app for every role on site
          </h1>
          <p className="text-[#475569] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you're a site manager capturing defects, a clerk of works running inspections,
            or a subcontractor fixing snags — Snaglist fits your workflow.
          </p>
        </div>
      </section>

      {/* Persona Cards */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {ukSnaggingPersonas.map((p) => (
            <button
              key={p.slug}
              onClick={() => onSelectPersona(p.slug)}
              className="text-left bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-xl font-black text-[#181411] group-hover:text-primary transition-colors">
                  {p.role}
                </h2>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
              <p className="text-sm text-[#475569] leading-relaxed line-clamp-2">{p.subheadline}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.topFeatures.slice(0, 2).map((f, i) => (
                  <span key={i} className="text-xs font-medium text-primary bg-primary/5 px-2.5 py-1 rounded-full">
                    {f.title}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#181411] py-16 md:py-20">
        <div className="max-w-[960px] mx-auto px-4 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] mb-4">
            The snagging app built on real construction sites.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
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

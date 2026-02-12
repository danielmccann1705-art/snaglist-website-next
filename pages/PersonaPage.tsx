import React from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, Camera, Link, FileText } from 'lucide-react';
import { WaitlistForm } from '../components/WaitlistForm';
import type { Persona } from '../data/personas';

interface PersonaPageProps {
  persona: Persona;
  onBack: () => void;
}

export const PersonaPage: React.FC<PersonaPageProps> = ({ persona, onBack }) => {
  const patternLabel = persona.pattern === 'snagging' ? 'Snagging App' : 'Punch List App';

  return (
    <div className="bg-background-light">
      {/* Hero */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All {persona.pattern === 'snagging' ? 'snagging' : 'punch list'} pages
          </button>
          <span className="text-primary font-bold tracking-wider uppercase text-xs">
            {patternLabel} for {persona.role}
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mt-3 mb-6">
            {persona.headline}
          </h1>
          <p className="text-lg text-[#475569] leading-relaxed max-w-2xl mb-8">
            {persona.subheadline}
          </p>
          <WaitlistForm variant="hero" id="waitlist-form" />
          <p className="text-xs text-gray-400 mt-3">
            {persona.market === 'uk' ? 'Launching soon on iOS. Android to follow.' : 'Launching soon. iOS first, Android to follow.'}
          </p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-4">
            {persona.role === 'Subcontractors' ? 'Sound familiar?' : 'The problems you know too well'}
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            {persona.market === 'uk'
              ? 'Every site manager knows these frustrations. Snaglist was built to fix them.'
              : 'These slow down every project. Snaglist eliminates them.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {persona.painPoints.map((pain, i) => (
              <div key={i} className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-background-light p-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-[#181411] text-lg font-bold">{pain.title}</h3>
                <p className="text-[#475569] text-sm leading-relaxed">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Snaglist Helps */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            How Snaglist works for {persona.role.toLowerCase()}
          </h2>
          <p className="text-[#475569] mb-12 max-w-2xl">
            Purpose-built features that match how you actually work on site.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {persona.topFeatures.map((feature, i) => {
              const icons = [
                <Camera className="w-6 h-6" />,
                <Link className="w-6 h-6" />,
                <FileText className="w-6 h-6" />,
              ];
              return (
                <div key={i} className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {icons[i] || icons[0]}
                  </div>
                  <h3 className="text-[#181411] text-lg font-bold">{feature.title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-4">A typical day with Snaglist</h2>
            <p className="text-[#475569] text-sm uppercase tracking-wider font-bold mb-6">
              For {persona.role}
            </p>
            <div className="bg-background-light rounded-2xl p-8 border border-gray-100">
              <p className="text-[#475569] leading-relaxed text-base">{persona.workflow}</p>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              <strong>You collaborate with:</strong> {persona.collaborators}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Feature Checklist */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-8 text-center">What {persona.role.toLowerCase()} get with Snaglist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              '5-second snag capture',
              'Photo markup & annotations',
              'Magic Links for contractors',
              'Real-time status tracking',
              'One-tap PDF reports',
              'Offline mode',
              'Cloud sync across devices',
              'GPS & timestamp on every photo',
              'No per-contractor fees',
              'Floor plan pins (coming soon)',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-[#475569]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#181411] py-16 md:py-20">
        <div className="max-w-[960px] mx-auto px-4 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] mb-4">
            {persona.cta.split(' — ')[0]}
          </h2>
          {persona.cta.includes(' — ') && (
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              {persona.cta.split(' — ')[1].charAt(0).toUpperCase() + persona.cta.split(' — ')[1].slice(1)}
            </p>
          )}
          <div className="flex justify-center mb-4">
            <WaitlistForm variant="hero" darkMode />
          </div>
          <p className="text-gray-600 text-xs mt-2">iOS first. Android to follow.</p>
        </div>
      </section>
    </div>
  );
};

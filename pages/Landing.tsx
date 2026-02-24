import React from 'react';
import { CheckCircle2, MessageSquare, Camera, Link, FileText, MapPin, Eye, Smartphone, Table, Hammer } from 'lucide-react';
import { WaitlistForm } from '../components/WaitlistForm';

export const Landing: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-white dark:bg-background-dark py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
          <div className="flex flex-col gap-10 lg:flex-row items-center">
            <div className="flex flex-col gap-6 lg:w-1/2 text-left items-start z-10">
              <h1 className="text-[#181411] text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em] animate-fade-in-up">
                Capture a snag in 5 seconds. Close out projects faster.
              </h1>
              <h2 className="text-[#475569] text-lg font-normal leading-relaxed max-w-xl animate-fade-in-up delay-[100ms] opacity-0 [animation-fill-mode:forwards]">
                Built by a site manager with 15 years in muddy boots. One-handed capture. Magic Links your contractors will actually open. PDF reports your clients will actually read.
              </h2>
              <div className="animate-fade-in-up delay-[200ms] opacity-0 [animation-fill-mode:forwards] w-full">
                <WaitlistForm variant="hero" id="waitlist-form" />
              </div>
              <div className="flex flex-col gap-1 pt-1 animate-fade-in-up delay-[300ms] opacity-0 [animation-fill-mode:forwards]">
                <span className="text-xs font-medium text-gray-400">Launching soon on iOS. Android to follow. Join the waitlist for early access.</span>
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
                  <Hammer className="w-4 h-4 text-primary" />
                  <span>Designed on real construction sites. Tested by real site managers.</span>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-0 animate-fade-in-right opacity-0 [animation-fill-mode:forwards] delay-300">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/50 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
              <div className="relative w-full max-w-[320px] bg-[#181411] rounded-[3rem] border-[10px] border-[#181411] shadow-2xl overflow-hidden ring-1 ring-gray-900/5 animate-float hover:scale-[1.02] transition-transform duration-500">
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-[26px] bg-black rounded-full z-20"></div>
                <img
                  src="/app-screenshot.jpeg"
                  alt="Snaglist app showing a project with snag list, status filters, and contractor tabs"
                  className="w-full h-auto block rounded-[2rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className="bg-background-light py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-center items-center">
              <h2 className="text-[#181411] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                Construction sites are messy. Your tools shouldn't be.
              </h2>
              <p className="text-[#475569] text-base md:text-lg font-normal leading-normal max-w-[720px]">
                Three tools. None of them built for you.
              </p>
            </div>
            {/* Three broken tools */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
              <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-2">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-[#181411] text-lg font-bold">WhatsApp</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Great for chatting. Terrible for tracking. Critical photos buried in 400 messages. Nobody knows what's done and what isn't.
                </p>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-2">
                  <Table className="w-6 h-6" />
                </div>
                <h3 className="text-[#181411] text-lg font-bold">Spreadsheets</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Fine at your desk. Useless on a scaffold. Late nights formatting cells. Version control nightmares — v2_final_FINAL.xlsx.
                </p>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-2">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-[#181411] text-lg font-bold">Enterprise software</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Built for the IT department, not the person holding a torch in a basement. Your subbies won't touch it.
                </p>
              </div>
            </div>

            {/* The Snaglist Way */}
            <div className="max-w-4xl mx-auto w-full mt-4">
              <div className="flex flex-col gap-6 rounded-2xl border-2 border-primary/20 bg-white p-8 md:p-10 shadow-md relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none duration-500">
                  <CheckCircle2 size={140} className="text-primary transform rotate-12" />
                </div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-[#181411] text-2xl font-bold">One app. Built on real sites. Used with one hand.</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-primary font-black text-lg">1. Capture</span>
                    <p className="text-[#475569] text-sm leading-relaxed">Photograph a defect, mark it up, assign it to a trade. Five seconds.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-primary font-black text-lg">2. Share</span>
                    <p className="text-[#475569] text-sm leading-relaxed">Send your contractor a Magic Link. They see exactly what to fix. No app. No login.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-primary font-black text-lg">3. Report</span>
                    <p className="text-[#475569] text-sm leading-relaxed">Generate a branded PDF for your client. One tap. Done.</p>
                  </div>
                </div>
                <p className="text-[#475569] text-sm relative z-10">
                  No project management suite. No Gantt charts. No features you'll never touch. Just the fastest way to get snags captured, assigned, and closed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid — 5 features */}
      <section className="bg-white py-16 md:py-24" id="features">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 max-w-[720px]">
              <h2 className="text-[#181411] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                The simplest tool in the shed.
              </h2>
              <p className="text-[#475569] text-lg font-normal leading-normal">
                No bloat. No training. Just the features you need to close out faster.
              </p>
            </div>
            {/* Top row — 3 features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1: One-Handed Capture */}
              <div className="flex flex-col gap-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="w-full bg-gray-200 aspect-video rounded-xl overflow-hidden shadow-sm relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <Camera className="w-16 h-16 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[#181411] text-xl font-bold leading-normal mb-1 group-hover:text-primary transition-colors">Log a snag before your tea goes cold.</h3>
                  <p className="text-[#475569] text-sm font-normal leading-relaxed">
                    Photo, markup, location, trade assignment — one flow, five seconds. Works one-handed. Works offline. Works in the basement where nothing else does.
                  </p>
                </div>
              </div>
              {/* Feature 2: Magic Links */}
              <div className="flex flex-col gap-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="w-full bg-gray-200 aspect-video rounded-xl overflow-hidden shadow-sm relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <Link className="w-16 h-16 text-blue-400/40 group-hover:text-blue-400 transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[#181411] text-xl font-bold leading-normal mb-1 group-hover:text-primary transition-colors">Contractors click a link. That's the onboarding.</h3>
                  <p className="text-[#475569] text-sm font-normal leading-relaxed">
                    No app to download. No account to create. No password to forget. Send your subbie a Magic Link and they see their snags — annotated photos, exact locations, clear descriptions.
                  </p>
                </div>
              </div>
              {/* Feature 3: PDF Reports */}
              <div className="flex flex-col gap-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="w-full bg-gray-200 aspect-video rounded-xl overflow-hidden shadow-sm relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <FileText className="w-16 h-16 text-red-400/40 group-hover:text-red-400 transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[#181411] text-xl font-bold leading-normal mb-1 group-hover:text-primary transition-colors">Client-ready reports from the front seat of your van.</h3>
                  <p className="text-[#475569] text-sm font-normal leading-relaxed">
                    One tap turns your snag list into a professional, branded PDF. Every photo, every status update, every note. Send it to your client before you've left site.
                  </p>
                </div>
              </div>
            </div>
            {/* Bottom row — 2 features, centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[860px] mx-auto w-full">
              {/* Feature 4: Track Without Chasing */}
              <div className="flex flex-col gap-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="w-full bg-gray-200 aspect-video rounded-xl overflow-hidden shadow-sm relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <Eye className="w-16 h-16 text-green-500/40 group-hover:text-green-500 transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[#181411] text-xl font-bold leading-normal mb-1 group-hover:text-primary transition-colors">See progress. Don't chase it.</h3>
                  <p className="text-[#475569] text-sm font-normal leading-relaxed">
                    Every snag has a status: Open, In Progress, Resolved, Verified, Closed. Updated in real time. No more ringing around asking "is that done yet?"
                  </p>
                </div>
              </div>
              {/* Feature 5: Floor Plan Pins (Coming Soon) */}
              <div className="flex flex-col gap-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="w-full bg-gray-200 aspect-video rounded-xl overflow-hidden shadow-sm relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <MapPin className="w-16 h-16 text-purple-400/40 group-hover:text-purple-400 transition-colors duration-300" />
                  </div>
                  <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded-full">Coming Soon</div>
                </div>
                <div>
                  <h3 className="text-[#181411] text-xl font-bold leading-normal mb-1 group-hover:text-primary transition-colors">Show them where. Don't tell them where.</h3>
                  <p className="text-[#475569] text-sm font-normal leading-relaxed">
                    Upload your drawings. Tap to place a pin exactly where the snag is. No more "it's in the second bedroom, left-hand wall, above the socket."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA Bar */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-[960px] mx-auto px-4 sm:px-10 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-black leading-tight tracking-[-0.033em] mb-3">
            Stop chasing subbies on WhatsApp.
          </h2>
          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Capture snags in seconds, share via Magic Links, generate PDF reports in one tap. Join the waitlist for early access.
          </p>
          <div className="flex justify-center">
            <WaitlistForm variant="hero" darkMode />
          </div>
        </div>
      </section>

      {/* Why Snaglist / Founder Credibility Section */}
      <section className="bg-background-light py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 text-center items-center">
              <h2 className="text-[#181411] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                Built by a site manager who got tired of the workarounds.
              </h2>
              <p className="text-[#475569] text-base md:text-lg font-normal leading-normal max-w-[720px]">
                15 years on construction sites. Thousands of snags tracked on WhatsApp and spreadsheets. Snaglist was designed in the back of a van — not a boardroom — to solve the problems no other tool bothered to fix.
              </p>
            </div>
            {/* Three founding principles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto w-full">
              <div className="flex flex-col items-center text-center gap-3 p-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Camera className="w-7 h-7" />
                </div>
                <h3 className="text-[#181411] text-xl font-bold">Speed</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Because signal is always bad in the basement. Every screen, every flow — built for 5-second capture with one hand.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-3 p-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Link className="w-7 h-7" />
                </div>
                <h3 className="text-[#181411] text-xl font-bold">Simplicity</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Nobody wants to train subcontractors on software. Magic Links mean your contractors are in with one click — no app, no account.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-3 p-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="text-[#181411] text-xl font-bold">Professionalism</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Your clients deserve better than a screenshot pasted into Excel. One-tap branded PDF reports — ready to send before you've left site.
                </p>
              </div>
            </div>
            {/* Metrics bar */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto w-full">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-primary">5s</p>
                <p className="text-sm text-gray-500 mt-1">Average capture time</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-primary">1 tap</p>
                <p className="text-sm text-gray-500 mt-1">To generate a PDF report</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-primary">0</p>
                <p className="text-sm text-gray-500 mt-1">Contractor training needed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#181411] py-16 md:py-24">
        <div className="max-w-[960px] mx-auto px-4 sm:px-10 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] mb-4">
            Built in the back of a van. Ready for your site.
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Snaglist was designed by a site manager who spent 15 years chasing subbies on WhatsApp. No VC boardroom. No focus groups. Just a tool built to do the job — fast, simple, professional.
          </p>
          <div className="flex justify-center mb-4">
            <WaitlistForm variant="hero" darkMode />
          </div>
          <p className="text-gray-400 text-sm mt-2">Launching soon. Be the first to know.</p>
          <p className="text-gray-500 text-xs mt-1">iOS first. Android to follow.</p>
        </div>
      </section>
    </>
  );
};

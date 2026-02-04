import React from 'react';
import { Settings, ChevronRight, CheckCircle2, AlertOctagon, MessageSquare, Camera, Send, CheckCheck, Link, FileText, Star } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-white dark:bg-background-dark py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
          <div className="flex flex-col gap-10 lg:flex-row items-center">
            <div className="flex flex-col gap-6 lg:w-1/2 text-left items-start z-10">
              <h1 className="text-[#181411] text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em] animate-fade-in-up">
                The snag list app that actually gets used on site.
              </h1>
              <h2 className="text-[#475569] text-lg font-normal leading-relaxed max-w-xl animate-fade-in-up delay-[100ms] opacity-0 [animation-fill-mode:forwards]">
                Stop chasing WhatsApp messages. Start closing snags with the simplest tool in the shed. Built for site managers who hate paperwork.
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-[200ms] opacity-0 [animation-fill-mode:forwards]">
                <button className="flex items-center justify-center h-12 px-6 rounded-lg bg-primary hover:bg-orange-600 text-white text-base font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 duration-200">
                  Get the App
                </button>
                <button className="flex items-center justify-center h-12 px-6 rounded-lg border border-gray-200 bg-transparent text-[#181411] text-base font-bold hover:bg-gray-50 transition-colors">
                  View Demo
                </button>
              </div>
              <div className="flex items-center gap-2 pt-2 animate-fade-in-up delay-[300ms] opacity-0 [animation-fill-mode:forwards]">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center transition-transform hover:scale-110 hover:z-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBLTMK_NZ4Vpt0AE7tCCekrgoaKBb4BzVApFf8RgCUOTau916Da94gpz7DZds-NBcEEwJztwoZEKlxJny-JT7NbNlyU0UhPo2SkQ0mrIU_plNdLzi7FqyEd0KLABfGqwyN3vPCWQi1CmGJDqGQVNL_gyfMYB_8-kv4KAtjpuGKJFP2W-Li7pLxJ3wXxvQpGmUleFWCooz2CLxOeFJ2YizKxAnRDdzgepVg30W_LwZ7dDyTfPgGnTIlapx0_CHh9uVo_aXohByMyTpY")' }}></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center transition-transform hover:scale-110 hover:z-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfss01-w2lYTloLcZa2sv0OgBhNd9QPF0sZWMFuULTVdpTaXJyDAkQs8_bZlAcqZP3yQxkIdW2Mr6nk8ZUsT7OVVqFIQ539SqP1EUR3VMVxz-AESOOQuzF6HL_7rAOGibD57GXZHzVBzNTowuxb-N5uo1Oj-gG6kWD10fHfpbHQleiR8NCC7cXwFF37LxLIhP0S5kiAoEf7Y2zBxugHdsbonAmHkxRgCIoPFtgjGXepHAZoFuiZPi-w13hRzhTGvn9vqT6kSmbz20")' }}></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center transition-transform hover:scale-110 hover:z-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAecwUwf5RAl0tCxzFCneWvR7abNhy-L25LY2ExmQ5-in2Ol2F7Tl8ewb61BcZ4JHSrApM61Y3kfKy0o9ON1fKOqzMwz0D3-afrF2Rr0efYiAEJJrD-nNIxmhPy8PmmhOUrMxqlKvPdAO1HGQQsrkKPoAyM3uz9Qa1EP80igjekHz8qSE-YXtFW8MYceys3NW0qY2wpQdi2TyezEYf0B5Pd_xYRJkAdEPXQZVIXlQ1XjQAaINX64M91XCMY5T_XRIJ7AnCcclmC7pg")' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-500">Trusted by 2,000+ Site Managers</span>
              </div>
            </div>
            
            {/* Phone Mockup */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-0 animate-fade-in-right opacity-0 [animation-fill-mode:forwards] delay-300">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/50 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
              <div className="relative w-full max-w-[360px] aspect-[9/18] bg-[#181411] rounded-[3rem] border-[8px] border-[#181411] shadow-2xl overflow-hidden ring-1 ring-gray-900/5 animate-float hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute top-0 w-full h-8 bg-[#181411] z-20 rounded-t-[2.5rem] flex justify-center">
                    <div className="w-24 h-5 bg-black rounded-b-2xl"></div>
                </div>
                
                {/* App Screen Image - Replace src below with your actual app screenshot */}
                <img 
                  src="https://placehold.co/1080x1920/f8f7f5/181411?text=App+Home+Screen" 
                  alt="Snaglist App Home Screen" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-background-light py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-center items-center">
              <h2 className="text-[#181411] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                Stop the Chaos
              </h2>
              <p className="text-[#475569] text-base md:text-lg font-normal leading-normal max-w-[720px]">
                Construction sites are messy. Your snag list shouldn't be. Say goodbye to scattered WhatsApp chats and midnight spreadsheet formatting.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
              {/* The Old Way */}
              <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-2">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#181411] text-xl font-bold">The Old Way</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    "Did you see my message in the group chat?" scrolling back 400 messages to find one photo. Confusing Excel sheets that nobody updates.
                  </p>
                </div>
                <div className="mt-auto pt-4">
                  <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative border border-gray-200">
                     {/* Abstract Chat UI */}
                     <div className="absolute top-3 left-3 bg-white p-2 rounded-lg shadow-sm w-3/4">
                       <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                     </div>
                     <div className="absolute top-14 right-3 bg-green-100 p-2 rounded-lg shadow-sm w-2/3">
                       <div className="h-2 w-full bg-green-200 rounded"></div>
                     </div>
                     <div className="absolute bottom-3 left-3 bg-white p-2 rounded-lg shadow-sm w-1/2">
                       <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                     </div>
                  </div>
                </div>
              </div>
              {/* The Snaglist Way */}
              <div className="flex flex-col gap-4 rounded-2xl border-2 border-primary/20 bg-white p-6 md:p-8 shadow-md relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none duration-500">
                  <CheckCircle2 size={120} className="text-primary transform rotate-12" />
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2 relative z-10">
                  <h3 className="text-[#181411] text-xl font-bold">The Snaglist Way</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    Snap a photo, drop a pin on the plan, and assign it instantly. Everyone knows exactly what to fix and where. Done.
                  </p>
                </div>
                <div className="mt-auto pt-4 relative z-10">
                  <div className="w-full h-32 bg-orange-50 rounded-lg flex items-center justify-center overflow-hidden border border-orange-100">
                    <div className="flex flex-col gap-2 w-3/4">
                      <div className="flex items-center gap-2 p-2 bg-white rounded shadow-sm animate-scale-in delay-100">
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"><CheckCheck className="text-white w-3 h-3" /></div>
                        <div className="h-2 w-20 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white rounded shadow-sm opacity-60 animate-scale-in delay-300">
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"><CheckCheck className="text-white w-3 h-3" /></div>
                        <div className="h-2 w-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white py-16">
        <div className="max-w-[960px] mx-auto px-4 sm:px-10">
          <div className="text-center mb-12">
            <h2 className="text-[#181411] text-3xl font-bold mb-4">How it works</h2>
          </div>
          <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-x-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2 pt-2 group">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-6 h-6" />
              </div>
              <div className="w-[2px] bg-[#e6dfdb] h-16 md:h-24 grow"></div>
            </div>
            <div className="flex flex-col pb-8 md:pb-12 pt-2">
              <h3 className="text-[#181411] text-xl font-bold leading-tight mb-2">Snap an issue</h3>
              <p className="text-[#475569] text-base leading-relaxed">
                See a defect? Take a photo directly in the app. Snaglist automatically tags the location and time.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-[2px] bg-[#e6dfdb] h-4"></div>
              <div className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform duration-300">
                <Send className="w-6 h-6 ml-0.5" />
              </div>
              <div className="w-[2px] bg-[#e6dfdb] h-16 md:h-24 grow"></div>
            </div>
            <div className="flex flex-col pb-8 md:pb-12 pt-2">
              <h3 className="text-[#181411] text-xl font-bold leading-tight mb-2">Assign to trade</h3>
              <p className="text-[#475569] text-base leading-relaxed">
                Select who needs to fix it. They get a notification (or email) instantly. No more "I didn't know" excuses.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2 pb-2 group">
              <div className="w-[2px] bg-[#e6dfdb] h-4"></div>
              <div className="w-12 h-12 rounded-full bg-white border-2 border-green-500 text-green-600 flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform duration-300">
                <CheckCheck className="w-6 h-6" />
              </div>
            </div>
            <div className="flex flex-col pt-2">
              <h3 className="text-[#181411] text-xl font-bold leading-tight mb-2">Close it out</h3>
              <p className="text-[#475569] text-base leading-relaxed">
                Contractors upload a 'fixed' photo. You approve it. The item turns green. Project closed faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-background-light py-16 md:py-24" id="features">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 max-w-[720px]">
              <h2 className="text-[#181411] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                Built for speed on site
              </h2>
              <p className="text-[#475569] text-lg font-normal leading-normal">
                Features designed to help you close out projects faster, not slow you down with admin.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="flex flex-col gap-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="w-full bg-gray-200 aspect-video rounded-xl overflow-hidden shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <Camera className="w-16 h-16 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[#181411] text-xl font-bold leading-normal mb-1 group-hover:text-primary transition-colors">Quick Capture</h3>
                  <p className="text-[#475569] text-sm font-normal leading-relaxed">
                    Photo, location, trade, done in 5 seconds. Designed for one-handed use while walking the site.
                  </p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col gap-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="w-full bg-gray-200 aspect-video rounded-xl overflow-hidden shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <Link className="w-16 h-16 text-blue-400/40 group-hover:text-blue-400 transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[#181411] text-xl font-bold leading-normal mb-1 group-hover:text-primary transition-colors">Magic Links</h3>
                  <p className="text-[#475569] text-sm font-normal leading-relaxed">
                    Contractors don't need to download an app to fix issues. Send them a magic link and they're in.
                  </p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="flex flex-col gap-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="w-full bg-gray-200 aspect-video rounded-xl overflow-hidden shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <FileText className="w-16 h-16 text-red-400/40 group-hover:text-red-400 transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[#181411] text-xl font-bold leading-normal mb-1 group-hover:text-primary transition-colors">Instant Reports</h3>
                  <p className="text-[#475569] text-sm font-normal leading-relaxed">
                    Generate professional, branded PDF reports for clients and stakeholders in one click.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
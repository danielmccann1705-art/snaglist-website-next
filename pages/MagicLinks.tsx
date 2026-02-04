import React from 'react';
import { Smartphone, Zap, Link, CheckCircle, CloudOff } from 'lucide-react';

export const MagicLinks: React.FC = () => {
  return (
    <div>
        {/* Hero */}
        <section className="flex flex-col justify-center py-5 px-4 md:px-10 lg:px-40">
            <div className="flex flex-col max-w-[960px] mx-auto w-full">
                <div className="flex flex-col-reverse gap-6 py-10 md:flex-row md:items-center">
                    <div className="flex flex-col gap-6 flex-1 md:pr-10">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 w-fit border border-primary/20 animate-fade-in-up">
                            <Zap className="text-primary w-4 h-4" />
                            <span className="text-primary text-xs font-bold uppercase tracking-wide">New Feature</span>
                        </div>
                        <h1 className="text-[#181411] text-4xl font-black leading-tight tracking-[-0.033em] lg:text-6xl animate-fade-in-up delay-100 opacity-0 [animation-fill-mode:forwards]">
                            Share Snag Lists Instantly
                        </h1>
                        <h2 className="text-[#8c725f] text-lg font-normal leading-relaxed animate-fade-in-up delay-200 opacity-0 [animation-fill-mode:forwards]">
                            Send <strong>Magic Links</strong> to contractors. No login required. No app to download. Just a link.
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-in-up delay-300 opacity-0 [animation-fill-mode:forwards]">
                             <button className="h-12 px-6 bg-primary hover:bg-orange-600 text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-orange-200 active:scale-95 duration-200">Try Magic Links Now</button>
                             <button className="h-12 px-6 bg-white border border-[#e6dfdb] text-[#181411] font-bold rounded-lg transition-colors hover:bg-gray-50">Watch Demo</button>
                        </div>
                    </div>
                    <div className="w-full flex-1 relative flex justify-center items-center animate-fade-in-right delay-200 opacity-0 [animation-fill-mode:forwards]">
                         <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20 rounded-full animate-pulse-slow">
                            <div className="absolute inset-0 flex items-center justify-center animate-pulse opacity-20">
                                <div className="w-3/4 h-3/4 bg-primary rounded-full blur-3xl"></div>
                            </div>
                            <div className="relative z-10 flex flex-col items-center justify-center animate-float">
                                <div className="bg-white p-6 rounded-2xl shadow-xl border border-primary/10 rotate-[-6deg] mb-[-20px] ml-[-40px] hover:rotate-0 transition-transform duration-500">
                                    <Link className="text-6xl text-primary" />
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-xl border border-primary/10 rotate-[6deg] mt-[-20px] mr-[-40px] z-20 hover:rotate-0 transition-transform duration-500">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-100 text-green-600 rounded-full p-1"><Smartphone /></div>
                                        <div className="flex flex-col gap-1"><div className="h-2 w-24 bg-gray-200 rounded"></div><div className="h-2 w-16 bg-gray-100 rounded"></div></div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Comparison */}
        <section className="flex flex-col justify-center py-10 px-4 md:px-10 lg:px-40 bg-white">
            <div className="flex flex-col max-w-[960px] mx-auto w-full">
                <h2 className="text-center text-3xl font-bold mb-2">Eliminate App Fatigue</h2>
                <p className="text-center text-gray-500 mb-10">80% of site friction comes from onboarding. Eliminate it today.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-1 gap-5 rounded-xl border border-[#e6dfdb] bg-background-light p-6 flex-col hover:shadow-md transition-shadow">
                        <div className="size-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500"><CloudOff /></div>
                        <h3 className="text-xl font-bold">The Old Way</h3>
                        <p className="text-sm text-gray-600">Forcing contractors to search app stores, download heavy apps, verify emails, create accounts.</p>
                    </div>
                    <div className="flex flex-1 gap-5 rounded-xl border-2 border-primary/20 bg-primary/5 p-6 flex-col relative overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
                        <div className="size-12 rounded-lg bg-primary flex items-center justify-center text-white"><Link /></div>
                        <h3 className="text-xl font-bold">The Magic Link Way</h3>
                        <p className="text-sm text-gray-600">Instant access via a secure web link. They click, they view, they fix.</p>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Mockup */}
        <section className="flex flex-col justify-center py-16 px-4 md:px-10 lg:px-40 bg-white overflow-hidden">
            <div className="flex flex-col max-w-[960px] mx-auto w-full">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex flex-col gap-6 lg:w-1/2">
                        <h2 className="text-3xl font-bold">Crystal Clear for Contractors</h2>
                        <ul className="flex flex-col gap-4">
                            {["Full resolution photo attachments", "Exact location references", "Clear descriptions"].map((t, i) => (
                                <li key={i} className="flex items-start gap-3"><CheckCircle className="text-green-600 mt-1 w-5 h-5" /> <span>{t}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                         <div className="relative w-[300px] h-[600px] bg-[#181411] rounded-[40px] border-[8px] border-[#181411] shadow-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-500">
                            {/* App Screen Image - Replace src below with your actual app screenshot */}
                            <img 
                                src="https://placehold.co/1080x1920/f8f7f5/181411?text=Magic+Link+View" 
                                alt="Magic Link Contractor View" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                         </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};
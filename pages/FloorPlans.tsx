import React from 'react';
import { MapPin, UploadCloud, MousePointerClick, Share2, Bell } from 'lucide-react';

export const FloorPlans: React.FC = () => {
  return (
    <div className="bg-white">
        {/* Hero */}
        <section className="relative w-full bg-[#f8f7f5] py-20">
             {/* Simple grid pattern in CSS via style */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center gap-10">
                 <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">Coming Soon</div>
                 <h1 className="text-4xl md:text-6xl font-black text-center max-w-3xl leading-tight">Pin snags directly to your drawings</h1>
                 <p className="text-gray-500 text-lg md:text-xl text-center max-w-2xl">Stop describing locations with vague text. Start showing them. Upload PDFs or images and drop pins exactly where the issue lies.</p>
                 
                 <div className="w-full max-w-[600px] relative bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200 aspect-video bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQ6pE8a1aCLhyybNn159io7ss2Fglh2yuhRTenuNJp9DV0m_vDXgYbKjVvXCVy6_KJXqmVjXEm6OSQ_hoWYoIoa3DSOq7891n4hHBELl9qga1mmHBU55VJI72ldk5xjLSyXsCc8Hx9TfZI_Od6gMFXVte2sw9t0tH5C5LfitRsK7qanHykEoOZPBr4_n_a3hyTXjlvmh0ZAJK7p7mYhocdhFyXwBvcjVJJgjERVOH0LFnxEWIc6qWsPLDv5egJ1yh8IZ4gouinQaY')" }}>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
                    <div className="absolute top-1/3 left-1/4 animate-bounce"><MapPin className="text-primary w-12 h-12 fill-current drop-shadow-lg" /></div>
                    <div className="absolute bottom-1/3 right-1/3 animate-bounce delay-700"><MapPin className="text-primary w-12 h-12 fill-current drop-shadow-lg" /></div>
                 </div>
             </div>
        </section>

        {/* Workflow */}
        <section className="py-20 max-w-4xl mx-auto px-4">
             <h2 className="text-3xl font-bold mb-12">Workflow</h2>
             <div className="grid grid-cols-[40px_1fr] gap-x-6">
                 {[
                     { icon: <UploadCloud />, title: "Upload Plan", desc: "Support for standard PDF drawings & high-res images." },
                     { icon: <MousePointerClick />, title: "Tap Location", desc: "Zoom into any specific room or area on the drawing." },
                     { icon: <MapPin />, title: "Drop Pin", desc: "Place an orange snag marker with precision accuracy." },
                     { icon: <Share2 />, title: "Share Report", desc: "Generate professional PDFs with visual location maps." }
                 ].map((step, i) => (
                     <React.Fragment key={i}>
                         <div className="flex flex-col items-center gap-1">
                             <div className="size-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary shadow-sm z-10">{step.icon}</div>
                             {i < 3 && <div className="w-[2px] bg-[#e6dfdb] h-full grow min-h-[40px]"></div>}
                         </div>
                         <div className="pb-10 pt-2">
                             <h3 className="text-lg font-bold">{step.title}</h3>
                             <p className="text-gray-500">{step.desc}</p>
                         </div>
                     </React.Fragment>
                 ))}
             </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-gray-100 bg-[#f8f7f5] text-center px-4">
             <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary"><Bell className="w-8 h-8" /></div>
             <h2 className="text-3xl font-black mb-4">Ready to pin your first snag?</h2>
             <p className="text-gray-500 mb-8">We are finalizing the beta. Get notified immediately.</p>
             <div className="flex max-w-md mx-auto gap-2">
                 <input className="flex-1 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your email" />
                 <button className="bg-primary text-white font-bold px-6 rounded-lg hover:bg-orange-600">Notify Me</button>
             </div>
        </section>
    </div>
  );
};
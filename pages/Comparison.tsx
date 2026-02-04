import React from 'react';
import { CheckCircle2, Link, Camera, MapPin } from 'lucide-react';

export const Comparison: React.FC = () => {
  return (
    <div className="bg-background-light">
       <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
                <span className="text-primary font-bold tracking-wider uppercase text-xs">The Modern Alternative</span>
                <h1 className="text-5xl font-black leading-tight">Snaglist vs <br/><span className="text-[#8c725f]">Site Audit Pro</span></h1>
                <p className="text-lg text-gray-600">See why thousands of site managers are switching to Snaglist for unlimited photos, magic links, and real-time collaboration.</p>
                <div className="flex gap-4">
                    <button className="bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-600">Start Free Trial</button>
                    <button className="bg-white border border-gray-200 font-bold px-6 py-3 rounded-lg hover:bg-gray-50">See Pricing</button>
                </div>
            </div>
            <div className="flex-1 w-full relative">
                 <div className="w-full aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden border border-gray-100 bg-white">
                      {/* Dashboard Image - Replace src below with your actual dashboard screenshot */}
                      <img 
                          src="https://placehold.co/1200x900/white/e5e5e5?text=Dashboard+Screenshot" 
                          alt="Snaglist Dashboard" 
                          className="w-full h-full object-cover" 
                      />
                 </div>
            </div>
       </div>

       {/* Table */}
       <div className="bg-white py-16 border-y border-gray-200">
           <div className="max-w-5xl mx-auto px-6 overflow-x-auto">
               <h2 className="text-3xl font-bold text-center mb-10">Head-to-head comparison</h2>
               <table className="w-full min-w-[700px] border border-gray-200 rounded-xl overflow-hidden">
                   <thead className="bg-[#f8f7f5]">
                       <tr>
                           <th className="px-6 py-5 text-left font-bold uppercase text-sm">Feature</th>
                           <th className="px-6 py-5 text-left text-primary font-bold text-lg bg-primary/5 w-[30%]">Snaglist</th>
                           <th className="px-6 py-5 text-left text-gray-500 font-bold text-lg w-[30%]">Site Audit Pro</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                       <tr>
                           <td className="px-6 py-4 font-medium">Magic Links (Live Sharing)</td>
                           <td className="px-6 py-4 bg-primary/5 font-bold flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5"/> Included</td>
                           <td className="px-6 py-4 text-gray-500">PDF Export Only</td>
                       </tr>
                       <tr>
                           <td className="px-6 py-4 font-medium">Photos per Item</td>
                           <td className="px-6 py-4 bg-primary/5 font-bold flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5"/> Unlimited</td>
                           <td className="px-6 py-4 text-gray-500">Limited</td>
                       </tr>
                       <tr>
                           <td className="px-6 py-4 font-medium">Cloud Sync</td>
                           <td className="px-6 py-4 bg-primary/5 font-bold flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5"/> Instant</td>
                           <td className="px-6 py-4 text-gray-500">Manual</td>
                       </tr>
                   </tbody>
               </table>
           </div>
       </div>

       {/* Features Grid */}
       <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Managers Switch</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { icon: <Link />, title: "Magic Links", desc: "Share live snag lists with contractors instantly." },
                    { icon: <Camera />, title: "Unlimited Photos", desc: "Document every issue thoroughly without hitting storage limits." },
                    { icon: <MapPin />, title: "Interactive Pins", desc: "Drop pins exactly where issues are on your floor plans." },
                ].map((f, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-primary mb-4">{f.icon}</div>
                        <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                        <p className="text-gray-600 text-sm">{f.desc}</p>
                    </div>
                ))}
            </div>
       </div>
    </div>
  );
};
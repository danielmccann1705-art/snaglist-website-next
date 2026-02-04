import React from 'react';
import { HardHat, MessageSquareWarning, Grid } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-background-light">
         <section className="px-4 py-12 md:px-10 md:py-20 max-w-7xl mx-auto">
             <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
                 <div className="lg:w-1/2 flex flex-col gap-6">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 w-fit text-primary font-bold text-xs uppercase">The Founder Story</div>
                     <h1 className="text-5xl lg:text-6xl font-black leading-tight">Built by a Site Manager, <span className="text-primary">for site managers.</span></h1>
                     <p className="text-lg text-gray-600">I got tired of managing million-dollar projects via WhatsApp. The chaos, the lost photos, the blame games. So I put down the clipboard and built the tool I always wished I had.</p>
                     <div className="flex gap-4 pt-2">
                         <button className="bg-primary text-white px-6 h-12 rounded-lg font-bold shadow-lg shadow-primary/20">Read the Story</button>
                     </div>
                 </div>
                 <div className="lg:w-1/2 w-full">
                     <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                         <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIKk-A2Mlmilk5juz9rH2v1svQX4G7dgL3Q02fquCw8HFP1kTR_Vjhu_X9eyMOsc_sJY6TR1P3p0SMR_C3W8cVJyKS7tLrBKPj-GBRfZr9EIVSvKjUHmwIKjgquKf1uYjuFDGvkVl8n07rOvvJ2pl7D1G31XT1_-OPF3tCWqdu0evANIiphLEJvjBMa-Khc6JMTCy36Lr5VQ00UHVZSF6ntNRth8LBPuDUUq1J_hch1ohKHdUMa55PPHEWkvfoZZKGHr8GiM3UMCM" className="w-full h-full object-cover" alt="Founder" />
                         <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-start gap-4">
                             <div className="bg-primary/20 p-2 rounded-lg text-primary"><HardHat /></div>
                             <div>
                                 <p className="text-xs font-bold uppercase text-gray-500 mb-1">Authenticity Check</p>
                                 <p className="text-sm font-medium">"I spent 15 years wearing muddy boots before writing a single line of code."</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </section>

         <section className="px-4 py-16 bg-white mx-4 md:mx-0 my-8 shadow-sm border-y border-gray-200">
             <div className="max-w-4xl mx-auto flex flex-col gap-10">
                 <div className="text-center">
                     <h2 className="text-3xl font-black mb-4">The WhatsApp & Spreadsheet Trap</h2>
                     <p className="text-gray-600 text-lg">Managing snags used to mean endless WhatsApp groups and messy spreadsheets.</p>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                     <div className="p-8 rounded-2xl border border-gray-200 bg-[#f8f7f5]">
                         <div className="size-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4"><MessageSquareWarning /></div>
                         <h3 className="text-xl font-bold mb-2">The Chat Chaos</h3>
                         <p className="text-gray-600">"Did you see the photo I sent 3 weeks ago?" Critical details buried in endless chat logs.</p>
                     </div>
                     <div className="p-8 rounded-2xl border border-gray-200 bg-[#f8f7f5]">
                         <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-4"><Grid /></div>
                         <h3 className="text-xl font-bold mb-2">The Spreadsheet Hell</h3>
                         <p className="text-gray-600">Late nights formatting cells. Version control nightmares (v2_final_FINAL.xlsx).</p>
                     </div>
                 </div>
             </div>
         </section>

         <section className="py-20 px-4 text-center max-w-3xl mx-auto">
             <div className="border-l-4 border-primary pl-6 py-2 text-left mb-10">
                 <h3 className="text-2xl font-bold italic">"Snaglist wasn't built in a trendy coworking space by people who have never set foot on a site. It was designed in the back of a van, covered in dust."</h3>
             </div>
             <p className="text-lg text-gray-600 text-left">We focused on three things: <strong>Speed</strong> (because signal is always bad in the basement), <strong>Simplicity</strong> (because nobody wants to train subcontractors on software), and <strong>Professionalism</strong>.</p>
         </section>
    </div>
  );
};
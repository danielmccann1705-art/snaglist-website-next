import React from 'react';
import { Search, Rocket, FolderOpen, ClipboardList, Link, BarChart, User, CreditCard, Mail, ChevronRight } from 'lucide-react';

export const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light">
      {/* Hero Search */}
      <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-[960px] flex-1">
            <div className="flex min-h-[320px] md:min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 relative overflow-hidden shadow-sm" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAb6wrU-YH5FWlscTa6Uallxw1xCYlJ6Bf2qP6IAfd3uXevx4r8GO3or46MiNFjFK2Fx6al1FAprrDrHYTZdINT9rGki7t5MjliCoF4J1lbdVdSzBLzq8H7RfUA7EnSgTwXoqYod9wtImN5xk9JbkseHB9YyOhY5cpQO_mgDXwxJ7WuXBEyl4CNDwDF_7rDhBJdMn5WgSZutJZ0IuEP1rX7jRUf2Tr6hKp2VMegiN7TdrS3VnFWgA2vdJVRtL8pt1A6Dd0Qn7Dgp8M")' }}>
                <div className="flex flex-col gap-2 text-center z-10">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">How can we help?</h1>
                    <h2 className="text-white/90 text-sm font-normal">Search for answers to your questions</h2>
                </div>
                <div className="flex w-full max-w-[560px] h-14 bg-white rounded-lg overflow-hidden items-center z-10 shadow-lg">
                    <div className="pl-5 text-gray-400"><Search /></div>
                    <input className="flex-1 px-4 outline-none text-gray-800 placeholder-gray-400" placeholder="Search for articles..." />
                    <button className="bg-primary text-white h-full px-6 font-bold hover:bg-orange-600">Search</button>
                </div>
            </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 md:px-40 flex flex-1 justify-center pb-8">
        <div className="flex flex-col max-w-[960px] flex-1">
             <h2 className="text-[#181411] text-[22px] font-bold px-4 pb-3 pt-5">Browse by Category</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                 {[
                     { icon: <Rocket />, title: "Getting Started", sub: "Onboarding & Setup" },
                     { icon: <FolderOpen />, title: "Projects", sub: "Manage sites & teams" },
                     { icon: <ClipboardList />, title: "Snags", sub: "Creating & resolving" },
                     { icon: <Link />, title: "Magic Links", sub: "External access" },
                     { icon: <BarChart />, title: "Reports", sub: "Export PDF & Excel" },
                     { icon: <User />, title: "Account", sub: "Profile & preferences" },
                     { icon: <CreditCard />, title: "Billing", sub: "Invoices & plans" },
                     { icon: <Mail />, title: "Contact Us", sub: "Get in touch" },
                 ].map((cat, i) => (
                    <div key={i} className="flex flex-col gap-4 rounded-lg border border-[#e6dfdb] bg-white p-6 items-start hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                        <div className="text-primary p-2 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                            {cat.icon}
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="font-bold text-[#181411]">{cat.title}</h2>
                            <p className="text-sm text-gray-500">{cat.sub}</p>
                        </div>
                    </div>
                 ))}
             </div>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="px-4 md:px-40 flex flex-1 justify-center pb-12">
         <div className="flex flex-col max-w-[960px] flex-1 px-4">
            <h2 className="text-[#181411] text-[22px] font-bold pb-3">Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["How to generate a PDF report", "Inviting subcontractors", "Resetting password", "Managing permissions", "Syncing offline data", "Customizing status options"].map((article, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#e6dfdb] hover:border-primary/50 transition-colors cursor-pointer group">
                        <span className="font-medium group-hover:text-primary transition-colors">{article}</span>
                        <ChevronRight className="text-gray-400 group-hover:text-primary w-5 h-5" />
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};
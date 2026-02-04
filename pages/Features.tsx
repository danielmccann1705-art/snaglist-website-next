import React from 'react';
import { Camera, PenTool, Link, HardHat, FileText, MapPin, CheckCircle2, WifiOff, Cloud } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    { icon: <Camera size={28} />, title: 'Quick Capture', desc: 'Log defects in seconds with rapid entry tools designed for walking the site.' },
    { icon: <PenTool size={28} />, title: 'Photo Markup', desc: 'Draw directly on photos to pinpoint specific issues and avoid confusion.' },
    { icon: <Link size={28} />, title: 'Magic Links', desc: 'Share lists instantly with external partners via secure links—no login required.' },
    { icon: <HardHat size={28} />, title: 'Contractor Management', desc: 'Assign tasks to specific trades, set due dates, and track their progress automatically.' },
    { icon: <FileText size={28} />, title: 'One-Tap Reports', desc: 'Generate professional, branded PDF snag lists directly from your phone in seconds.' },
    { icon: <MapPin size={28} />, title: 'Floor Plan Pins', desc: 'Upload digital blueprints and drop pins exactly where work is needed.', comingSoon: true },
    { icon: <CheckCircle2 size={28} />, title: 'Status Tracking', desc: "Watch issues move from 'Open' to 'Resolved' in real-time as your team completes work." },
    { icon: <WifiOff size={28} />, title: 'Offline Mode', desc: 'Keep working seamlessly in basements or remote sites even without an internet connection.' },
    { icon: <Cloud size={28} />, title: 'Cloud Sync', desc: 'Your data is automatically backed up and instantly accessible across all your devices.' },
  ];

  return (
    <div className="w-full bg-white pb-20">
      {/* Hero */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 md:py-20">
          <div className="flex flex-col gap-8 items-center justify-center">
            <div className="flex min-h-[400px] w-full flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-6 md:p-12 relative overflow-hidden animate-scale-in" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnppKcMxB_duPXS-_4ojHAZlcnm-EMK-KEUimiH5kkbf3T1eOBUk1JnxURSutV5fy49RgyABRLhoX0SCfKKMV8tPTBzpwxyZR9F4Nm7TBbNZhsAi0-njpsQI7RS4OWvetoOSDvXG1acus5zSLaC4qelLeWiiV1jfTHCY_hIrNXV_9aExGjXAc9K6mzvUrWSzivEeBfTXbRM2vH5S71NUoeWvQItFQKbTizlr-rXDdTL9WW6HtQ3TiaRdkhQpAniroD0TtrWnTze2s")' }}>
              <div className="flex flex-col gap-4 text-center max-w-3xl z-10">
                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] animate-fade-in-up">
                  Everything you need to close out faster
                </h1>
                <h2 className="text-gray-200 text-lg md:text-xl font-normal leading-relaxed animate-fade-in-up delay-100 opacity-0 [animation-fill-mode:forwards]">
                  Powerful tools built for the job site, not just the office. Streamline your snag list process today.
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 justify-center z-10 animate-fade-in-up delay-200 opacity-0 [animation-fill-mode:forwards]">
                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-primary hover:bg-orange-600 text-white text-base font-bold transition-colors shadow-lg shadow-orange-900/20 active:scale-95 duration-200">
                  <span>See Pricing</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-[#181411] text-3xl md:text-4xl font-black tracking-tight">Power Features</h2>
            <p className="text-[#8c725f] text-lg max-w-2xl">
              Built for speed and reliability. Every tool you need to manage defects, communicate with trades, and deliver perfect projects.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col gap-4 rounded-xl bg-background-light p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20 group hover:-translate-y-1">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 text-primary">
                    {f.icon}
                  </div>
                  {f.comingSoon && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 animate-pulse">
                      Coming Soon
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#181411] text-lg font-bold group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-[#8c725f] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
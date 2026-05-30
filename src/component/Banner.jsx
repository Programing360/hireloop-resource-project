import React from "react";
import Image from "next/image";
import { Search, MapPin, Briefcase, BarChart2, Users, Star } from "lucide-react";

// 🎯 এখানে আপনার পছন্দমতো ব্যাকগ্রাউন্ড ইমেজের পাথ ম্যানুয়ালি সেট করুন
const MANUAL_BG_IMAGE = "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop";

const HeroBanner = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#0b0612] text-white overflow-hidden flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      
      {/* BACKGROUND EFFECTS: Vertical Lines & Glow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:40px_100%] sm:bg-[size:60px_100%]"></div>
      </div>
      
      {/* Radial Glow Top and Center */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/20 blur-[140px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center text-center">
        
        {/* 1. TOP BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-950/30 backdrop-blur-md mb-6 animate-fade-in">
          <Briefcase size={14} className="text-orange-500" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-300">
            <span className="text-white font-black">50,000+</span> New Jobs This Month
          </span>
        </div>

        {/* 2. MAIN HEADINGS */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-3xl leading-[1.15] mb-4">
          Find Your <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Dream Job</span> Today
        </h1>
        
        <p className="text-xs sm:text-sm md:text-base text-slate-400 font-medium max-w-xl leading-relaxed mb-10">
          HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
        </p>

        {/* 3. SEARCH BAR CONTAINER */}
        <div className="w-full max-w-3xl bg-slate-950/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl sm:rounded-full p-2 sm:p-2.5 shadow-2xl flex flex-col sm:flex-row items-center gap-2 mb-6">
          <div className="flex items-center gap-3 w-full px-3 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-slate-800/80">
            <Search size={18} className="text-slate-500 shrink-0" />
            <input 
              type="text" 
              placeholder="Job title, skill or company" 
              className="w-full bg-transparent text-sm focus:outline-none placeholder-slate-500 text-slate-200 font-medium"
            />
          </div>

          <div className="flex items-center gap-3 w-full px-3 py-2 sm:py-0">
            <MapPin size={18} className="text-slate-500 shrink-0" />
            <input 
              type="text" 
              placeholder="Location or Remote" 
              className="w-full bg-transparent text-sm focus:outline-none placeholder-slate-500 text-slate-200 font-medium"
            />
          </div>

          <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-xl sm:rounded-full transition-all duration-200 active:scale-95 shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
            <Search size={18} className="stroke-[2.5]" />
            <span className="sm:hidden text-xs font-black uppercase tracking-wider">Search Jobs</span>
          </button>
        </div>

        {/* 4. TRENDING TAGS */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs mb-16">
          <span className="text-slate-500 font-bold tracking-wide mr-1">Trending Position:</span>
          {["Product Designer", "AI Engineering", "Dev-ops Engineer"].map((tag, i) => (
            <button key={i} className="px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/40 text-slate-300 font-medium hover:border-slate-700 hover:text-white transition-all text-[11px]">
              {tag}
            </button>
          ))}
        </div>

        {/* 5. HERO CARD CONTAINER (EARTH BG + ABSOLUTE FOREGROUND) */}
        <div className="relative w-full max-w-5xl h-[480px] sm:h-[400px] md:h-[380px] rounded-[3rem] border border-indigo-500/30 overflow-hidden shadow-[0_20px_50px_rgba(99,102,241,0.15)] bg-[#100b1e] mt-6">
          
          {/* 🌌 Earth Background Layout - Aligned strictly to the bottom inside the card */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <div className="absolute bottom-0 w-full h-[80%] sm:h-full">
              <Image
                src={MANUAL_BG_IMAGE}
                alt="Global Earth Background"
                fill
                className="object-cover opacity-35 mix-blend-screen object-bottom scale-105"
                priority
              />
            </div>
            {/* Smooth dark overlay mask to maintain sharp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0612] via-[#0b0612]/40 to-purple-950/20"></div>
          </div>

          {/* 🌟 Absolute Content Overlay Layer */}
          <div className="absolute inset-0 z-10 w-full px-4 sm:px-8 py-10 flex flex-col items-center justify-center gap-8 sm:gap-10">
            
            {/* Absolute Heading Text */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-200 max-w-xl leading-snug drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              Assisting over <span className="text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-xl backdrop-blur-md border border-indigo-500/20">15,000 job seekers</span> find their dream positions.
            </h2>

            {/* Absolute Glassmorphism Counter Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
              {[
                { count: "50K", label: "Active Jobs", icon: <Briefcase size={16} className="text-indigo-400" /> },
                { count: "12K", label: "Companies", icon: <BarChart2 size={16} className="text-indigo-400" /> },
                { count: "2M", label: "Job Seekers", icon: <Users size={16} className="text-indigo-400" /> },
                { count: "97%", label: "Satisfaction Rate", icon: <Star size={16} className="text-indigo-400" /> }
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className="group flex flex-col items-start text-left p-4 sm:p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-2xl hover:border-indigo-500/40 hover:bg-white/[0.06] transition-all duration-300"
                >
                  {/* Icon Box */}
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 mb-3 sm:mb-4 group-hover:scale-105 transition-transform">
                    {stat.icon}
                  </div>
                  
                  {/* Counter Number */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mb-0.5">
                    {stat.count}
                  </h3>
                  
                  {/* Label */}
                  <p className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest line-clamp-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Neon Border Accent Line at the Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_20px_rgba(99,102,241,0.6)] z-20"></div>
        </div>

      </div>
    </div>
  );
};

export default HeroBanner;
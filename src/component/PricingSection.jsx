'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const PricingSection = () => {
  // Monthly এবং Yearly প্ল্যান টগল করার স্টেট
  const [isYearly, setIsYearly] = useState(false);

  // স্ক্রিনশটের রিয়েল কন্টেন্ট ডাটা স্ট্রাকচার
  const pricingPlans = [
    {
      name: "Starter",
      icon: "👑",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited"
      ],
      isPopular: false
    },
    {
      name: "Growth",
      icon: "📊",
      monthlyPrice: 17,
      yearlyPrice: 12, // ডিসকাউন্টেড প্রাইস
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited"
      ],
      isPopular: true // স্ক্রিনশটে মাঝখানের কার্ডটি গ্লোয়িং ও হাইলাইটেড
    },
    {
      name: "Premium",
      icon: "⚡",
      monthlyPrice: 99,
      yearlyPrice: 79,
      features: [
        "Everything in Pro",
        "Multi-profile career portfolios",
        "Shared talent rooms",
        "Recruiter view (read-only)"
      ],
      isPopular: false
    }
  ];

  // গ্রিড অ্যানিমেশন কন্টেইনার
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  // কার্ডের পপ-আপ স্লাইড অ্যানিমেশন
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0b0612] text-white pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* ─── BACKGROUND VERTICAL STRIPES ─── */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808015_1px,transparent_1px)] bg-[size:45px_100%] md:bg-[size:65px_100%]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* ─── HEADER MODULE ─── */}
        <div className="text-center flex flex-col items-center mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"></span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">
              Pricing
            </span>
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"></span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white max-w-2xl leading-[1.2] mb-10">
            Pay for the leverage, <br /> not the listings
          </h2>

          {/* ─── HERO UI / PREMIUM TOGGLE TAB ─── */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#17112a]/60 backdrop-blur-md rounded-full border border-white/[0.05] shadow-inner relative">
            <button 
              onClick={() => setIsYearly(false)}
              className={`relative z-10 px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${!isYearly ? 'text-[#0b0612]' : 'text-slate-400'}`}
            >
              Monthly
              {!isYearly && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-white rounded-full -z-10" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
            </button>
            
            <button 
              onClick={() => setIsYearly(true)}
              className={`relative z-10 px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2 ${isYearly ? 'text-[#0b0612]' : 'text-slate-400'}`}
            >
              Yearly
              {isYearly && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-white rounded-full -z-10" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              {/* 25% OFF Badge */}
              <span className={`px-2 py-0.5 rounded-md font-black text-[9px] tracking-wide transition-colors duration-300 ${isYearly ? 'bg-indigo-600 text-white' : 'bg-pink-600 text-white'}`}>
                25%
              </span>
            </button>
          </div>
        </div>

        {/* ─── PRICING 3-COLUMN GRID ─── */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
        >
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                scale: plan.isPopular ? 1.03 : 1.02,
                borderColor: plan.isPopular ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"
              }}
              className={`relative flex flex-col justify-between p-8 rounded-[2.5rem] border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                plan.isPopular 
                  ? 'border-indigo-500/40 bg-[#1e1436]/30 shadow-[0_30px_60px_-15px_rgba(99,102,241,0.2)]' 
                  : 'border-white/[0.03] bg-[#140f24]/20 shadow-black/50'
              }`}
            >
              {/* Top Row: Icon Name and Dynamic Price */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-lg">
                      {plan.icon}
                    </div>
                    <span className="text-lg font-black text-slate-200 tracking-tight">{plan.name}</span>
                  </div>
                  
                  {/* Price Tag with Framer Motion Layout Animation */}
                  <div className="flex items-baseline text-white">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-xs text-slate-500 font-bold ml-1 uppercase tracking-widest">/month</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-bold text-slate-300 tracking-wide mb-6">
                  Start building your insights hub:
                </p>

                {/* Features List */}
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 group/item">
                      {/* Plus Custom Checkbox Accent */}
                      <div className="w-5 h-5 shrink-0 rounded-md bg-white/[0.04] border border-white/[0.05] flex items-center justify-center text-slate-400 group-hover/item:text-white group-hover/item:border-indigo-500/50 transition-colors mt-0.5">
                        <Plus size={12} strokeWidth={3} />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed group-hover/item:text-slate-200 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action Button (Hero UI Flat Custom Concept) */}
              <div className="pt-2">
                <button 
                  className={`w-full py-4 px-6 rounded-2xl font-black text-xs sm:text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 group transition-all duration-300 ${
                    plan.isPopular 
                      ? 'bg-[#fdf6f6] text-[#0b0612] hover:bg-white' 
                      : 'bg-white/[0.03] border border-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1]'
                  }`}
                >
                  <span>Choose This Plan</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200 text-base font-normal">→</span>
                </button>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default PricingSection;
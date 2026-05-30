'use client'
import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  // টেক্সট ও বাটনের জন্য স্ট্যাগার্ড অ্যানিমেশন কনফিগারেশন
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] bg-[#0b0612] text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden py-20">
      
      {/* ─── BACKGROUND LAYERS ─── */}
      {/* ১. সিগনেচার ভার্টিক্যাল ডার্ক স্ট্রাইপ গ্রিড */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808015_1px,transparent_1px)] bg-[size:45px_100%] md:bg-[size:65px_100%]"></div>
      </div>

      {/* ২. সাইবার গ্লোয়িং ডোম / গ্রিড আর্ক (Screenshot 2026-05-30 125227.jpg অনুকরণে) */}
      <div className="absolute bottom-[-40%] sm:bottom-[-60%] md:bottom-[-70%] left-1/2 -translate-x-1/2 w-[180%] sm:w-[130%] md:w-[110%] aspect-square rounded-full z-0 pointer-events-none overflow-hidden">
        {/* আর্কের ভেতরের নিওন গ্লো ইফেক্ট */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/30 via-purple-900/10 to-transparent blur-[60px] md:blur-[100px]" />
        
        {/* রেডিয়াল সাইবার লাইন গ্রিড টেক্সচার */}
        
        
        {/* আর্কের টপ এজ হাইলাইট লাইন */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-60 blur-[1px]" />
      </div>

      {/* ─── FOREGROUND CONTENT WITH MOTION ─── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto max-w-3xl relative z-10 flex flex-col items-center text-center px-4"
      >
        {/* মেইন হেডলাইন */}
        <motion.h2 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-2xl leading-[1.15] mb-5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          Your next role is <br /> already looking for you
        </motion.h2>

        {/* সাবসক্রিপশন টেক্সট */}
        <motion.p 
          variants={itemVariants}
          className="text-xs sm:text-sm md:text-base text-slate-400 font-medium max-w-xl leading-relaxed mb-10 drop-shadow-md"
        >
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </motion.p>

        {/* অ্যাকশন বাটন গ্রুপ */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary Button */}
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 20px 30px -10px rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#fdf6f6] hover:bg-white text-[#0b0612] text-xs sm:text-sm font-black tracking-wide shadow-2xl transition-all duration-200"
          >
            Create a free account
          </motion.button>

          {/* Secondary Button */}
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "rgba(23, 17, 42, 0.6)", borderColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#17112a]/30 border border-white/[0.06] text-slate-300 hover:text-white text-xs sm:text-sm font-black tracking-wide backdrop-blur-md transition-all duration-200"
          >
            View pricing
          </motion.button>
        </motion.div>
      </motion.div>

    </div>
  );
};

export default CallToAction;
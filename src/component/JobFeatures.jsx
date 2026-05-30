'use client'
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, DollarSign, ArrowRight } from "lucide-react";

const JobFeatures = () => {
  const jobs = Array(6).fill({
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  });

  // ১. সম্পূর্ণ গ্রিড কন্টেইনারের জন্য প্যারেন্ট ভেরিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // একটি কার্ডের পর আরেকটি কার্ড আসার ব্যবধান
      },
    },
  };

  // ২. প্রতিটি আলাদা কার্ডের স্মুথ ফেড-ইন এবং ওপরে ওঠার অ্যানিমেশন (AOS এর মত এফেক্ট)
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1.0], // প্রফেশনাল কিউবিক বেজিয়ার কার্ভ
      },
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0b0612] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* BACKGROUND STRIPES */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808015_1px,transparent_1px)] bg-[size:45px_100%] md:bg-[size:65px_100%]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* ─── HEADER SECTION (WITH ANIMATION) ─── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"></span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
              Smart Job Discovery
            </span>
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white max-w-2xl leading-[1.2] mb-6">
            The roles you'd never find by searching
          </h2>

          <div className="w-8 h-[3px] bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full"></div>
        </motion.div>

        {/* ─── JOBS GRID WITH MOTION ─── */}
        <div className="relative">
          {/* Center Connective Line & Crosshair (Fade In Animation) */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute top-1/2 left-0 right-0 h-[1px] border-t border-dashed border-cyan-500/30 -translate-y-1/2 hidden md:block z-0"
          ></motion.div> */}

          {/* <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 hidden md:flex items-center justify-center z-10"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping absolute"></div>
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
            <div className="w-[1px] h-4 bg-cyan-400 absolute"></div>
            <div className="w-4 h-[1px] bg-cyan-400 absolute"></div>
          </motion.div> */}

          {/* Grid Layout Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }} // স্ক্রিনে আসার সাথে সাথে রান হবে
            className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
          >
            {jobs.map((job, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(23, 17, 42, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-white/[0.03] bg-[#17112a]/20 backdrop-blur-xl shadow-2xl cursor-pointer"
              >
                {/* Upper Content */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mb-3 group-hover:text-white transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed mb-6">
                    {job.description}
                  </p>

                  {/* Badges/Tags Wrapper */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.03] text-[11px] text-slate-300 font-medium">
                      <MapPin size={12} className="text-purple-400" />
                      {job.location}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.03] text-[11px] text-slate-300 font-medium">
                      <Briefcase size={12} className="text-purple-400" />
                      {job.type}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.03] text-[11px] text-slate-300 font-medium w-fit mt-1 sm:mt-0">
                      <DollarSign size={12} className="text-purple-400" />
                      {job.salary}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-2">
                  <button className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-all">
                    <span>Apply Now</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1.5 transition-transform stroke-[2.5]"
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ─── BOTTOM VIEW ALL BUTTON (WITH HOVER MOTION) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-16 relative z-10"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 30px -10px rgba(0,0,0,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl bg-[#fdf6f6] hover:bg-white text-[#0b0612] text-xs sm:text-sm font-black tracking-wide shadow-xl shadow-black/20 transition-all duration-200"
          >
            View all job open
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default JobFeatures;

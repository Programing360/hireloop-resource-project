'use client'
import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  TrendingUp, 
  BarChart3, 
  Bookmark, 
  MousePointerClick, 
  FileText, 
  Hexagon, 
  LineChart 
} from "lucide-react";

const SuccessFeatures = () => {
  // ইমেজের কন্টেন্ট অনুযায়ী ৮টি ফিচারের ডেটা অবজেক্ট
  const features = [
    { title: "Smart Search", desc: "Find your ideal job with advanced filters.", icon: <Search size={20} /> },
    { title: "Salary Insights", desc: "Get real salary data to negotiate confidently.", icon: <TrendingUp size={20} /> },
    { title: "Top Companies", desc: "Apply to vetted companies that are hiring.", icon: <BarChart3 size={20} /> },
    { title: "Saved Jobs", desc: "Manage apps & favorites on your dashboard.", icon: <Bookmark size={20} /> },
    { title: "One-Click Apply", desc: "Simplify your job applications for an easier process!", icon: <MousePointerClick size={20} /> },
    { title: "Resume Builder", desc: "Create professional resumes with modern templates.", icon: <FileText size={20} /> },
    { title: "Skill-Based Matching", desc: "Discover jobs that match your skills and experience.", icon: <Hexagon size={20} /> },
    { title: "Career Growth Resources", desc: "Boost your career with quick interview tips.", icon: <LineChart size={20} /> },
  ];

  // গ্রিড কন্টেইনারের জন্য প্যারেন্ট অ্যানিমেশন ভেরিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // প্রতিটি আলাদা আইটেম কার্ডের জন্য ফেড-ইন এবং স্লাইড অ্যানিমেশন
  const itemVariants = {
    hidden: { opacity: 0, x: -30 }, // বাম থেকে ডানে স্লাইড হয়ে আসবে
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0b0612] text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* ─── TOP HORIZON NEON CYAN LINE ─── */}
      {/* <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_2px_20px_rgba(6,182,212,0.6)] z-10"></div> */}

      {/* ─── BACKGROUND VERTICAL STRIPES ─── */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808015_1px,transparent_1px)] bg-[size:45px_100%] md:bg-[size:65px_100%]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* ─── HEADER SECTION ─── */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center mb-20"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"></span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">
              Features Job
            </span>
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"></span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white max-w-2xl leading-[1.2]">
            Everything you need <br className="hidden sm:inline" /> to succeed
          </h2>
        </motion.div>

        {/* ─── FEATURES 4x2 GRID SYSTEM ─── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12"
        >
          {features.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-4 group cursor-pointer"
            >
              {/* 🔳 Minimalist Icon Box (Matching Screenshot Gradient/Border) */}
              <div className="w-16 h-16 shrink-0 rounded-2xl border border-white/[0.04] bg-gradient-to-br from-[#24142c]/40 to-[#140c1e]/10 flex items-center justify-center text-purple-400/80 group-hover:text-purple-300 group-hover:border-purple-500/30 group-hover:bg-[#24142c]/60 shadow-lg transition-all duration-300">
                {item.icon}
              </div>

              {/* 📝 Content Column */}
              <div className="flex flex-col pt-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-200 tracking-wide mb-1.5 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-[220px]">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default SuccessFeatures;
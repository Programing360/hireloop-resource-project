'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import bgImage from '../../public/images/cta-bg.png';

const CallToAction = () => {
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
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] bg-[#0b0612] text-white flex items-center justify-center overflow-hidden py-20 ">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full container mx-auto">
        <Image
          src={bgImage}
          alt="CTA Background"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Vertical Grid */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808015_1px,transparent_1px)] bg-[size:45px_100%] md:bg-[size:65px_100%]" />
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/30 via-purple-900/10 to-transparent blur-[80px]" />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[3] bg-black/30" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 container mx-auto max-w-3xl px-4 text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] mb-5"
        >
          Your next role is <br />
          already looking for you
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-slate-400 font-medium max-w-xl mx-auto leading-relaxed mb-10"
        >
          Build a profile in three minutes. The matches start arriving
          tomorrow morning.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow:
                '0 20px 30px -10px rgba(255,255,255,0.15)',
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-[#0b0612] text-sm font-black tracking-wide"
          >
            Create a free account
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#17112a]/30 border border-white/10 text-slate-300 hover:text-white backdrop-blur-md text-sm font-black tracking-wide"
          >
            View pricing
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
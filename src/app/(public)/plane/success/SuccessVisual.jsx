'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Mail, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SuccessVisual({ customerEmail }) {
  return (
    <div className="min-h-screen bg-[#0D0B14] text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans antialiased">
      
      {/* গ্লো ইফেক্ট ব্যাকগ্রাউন্ড */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-[#161320] border border-purple-500/10 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(147,51,234,0.08)] relative overflow-hidden"
      >
        {/* কার্ডের উপরের সুক্ষ্ম লাইটিং বর্ডার */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        {/* সাকসেস চেক আইকন অ্যানিমেশন */}
        <div className="flex justify-center mb-6 relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
            className="p-4 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 shadow-[0_0_20px_rgba(147,51,234,0.1)]"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1 right-28 text-indigo-400/50"
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>
        </div>

        {/* হেডার টেক্সট */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Payment <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Successful!</span>
        </h1>
        <p className="text-sm text-slate-400 mb-8 font-medium">
          We appreciate your business! Your pro features are now ready.
        </p>

        {/* ইমেইল নোটিফিকেশন বক্স */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1D1A2A] border border-slate-800/60 rounded-2xl p-4 flex items-start gap-3.5 text-left mb-8"
        >
          <div className="p-2 bg-purple-500/5 border border-purple-500/10 text-purple-400 rounded-xl mt-0.5">
            <Mail className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Confirmation Sent</h4>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 break-all">
              A detailed invoice has been mailed to <span className="text-purple-400 font-semibold">{customerEmail}</span>
            </p>
          </div>
        </motion.div>

        {/* নেভিগেশন অ্যাকশন বাটনসমূহ */}
        <div className="space-y-3.5">
          <Link href="/dashboard" className="block">
            <motion.button
              whileTap={{ scale: 0.99 }}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-95 text-white font-bold h-12 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-500/10 flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>

          <p className="text-[11px] text-slate-500 font-medium">
            Have questions? Contact us at{' '}
            <a href="mailto:orders@example.com" className="text-purple-400 hover:underline transition-all">
              orders@example.com
            </a>
          </p>
        </div>

      </motion.div>
    </div>
  );
}
import { serverFetch } from '@/lib/core/server';
import React from 'react';
import JobCard from './JobsCard'; // আপনার ফাইলের নাম অনুযায়ী (লুপ সহ)

const JobsPage = async () => {
  const allJobs = await serverFetch('allJobs');
  console.log(allJobs);

  return (
    // মেইন কন্টেইনারে ডার্ক থিম এবং স্মুথ অ্যানিমেটেড গ্রাডিয়েন্ট সেট করা হয়েছে
    <div className="relative min-h-screen bg-[#060606] bg-gradient-to-tr from-[#060606] via-[#0d0b14] to-[#060606] bg-[length:400%400%] animate-gradient-slow overflow-hidden pt-16">
      
      {/* ─── BACKGROUND AMBIENT GLOW ANIMATIONS ─── */}
      {/* স্ক্রিনের ডান পাশের গ্লো (ধীরে ধীরে পালস বা ব্লিঙ্ক করবে) */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none animate-pulse-slow" />
      
      {/* স্ক্রিনের বাম পাশের গ্লো */}
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none animate-pulse-slow delay-2000" />

      {/* ─── CONTENT SECTION ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* হেডার টেক্সট */}
        <div className="text-center my-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Find Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Dream Job</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-md mx-auto font-normal">
            Discover the next step in your career. Explore tech jobs from top verified companies.
          </p>
        </div>

        {/* জব কার্ড গ্রিড কম্পোনেন্ট */}
        <div className="mt-6">
          <JobCard jobsArray={allJobs} />
        </div>
        
      </div>
    </div>
  );
};

export default JobsPage;
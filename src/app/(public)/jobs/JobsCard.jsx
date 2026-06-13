"use client";

import React from "react";
import Image from "next/image";
import { Card, Button } from "@heroui/react";
import {
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Framer Motion ভ্যারিয়েন্ট (কন্টেইনারের জন্য)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // একটির পর আরেকটি কার্ড ১০৫ মিলিসেকেন্ড পর পর আসবে
    },
  },
};

// প্রতিটি একক কার্ডের জন্য অ্যানিমেশন ভ্যারিয়েন্ট
const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function JobSection({ jobsArray }) {
  const jobs = jobsArray || [];

  // যদি কোনো জব না থাকে তার জন্য একটি সেফগার্ড ট্র্যাকিং
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-sm">
        No jobs found at the moment.
      </div>
    );
  }

  const statusColors = {
    pending: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    approved: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    rejected: "text-red-500 bg-red-500/10 border-red-500/20",
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatSalary = (min, max) => {
    const formatNum = (num) =>
      Number(num) >= 1000 ? `${(Number(num) / 1000).toFixed(0)}k` : num;
    return `${formatNum(min)} - ${formatNum(max)}`;
  };

  return (
    // কন্টেইনারকে motion.div করা হয়েছে স্ট্যাগার অ্যানিমেশন ট্রিগার করার জন্য
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto p-4"
    >
      {jobs.map((job) => (
        // কার্ডটিকে motion.div দিয়ে র‍্যাপ করা হয়েছে স্মুথ হোভার ও স্ক্রল অ্যানিমেশনের জন্য
        <motion.div
          key={job._id}
          variants={cardVariants}
          whileHover={{
            y: -6,
            scale: 1.015,
            borderColor: "rgba(255, 255, 255, 0.12)",
            boxShadow:
              "0 20px 40px -15px rgba(0,0,0,0.7), 0 0 50px -10px rgba(147, 51, 234, 0.08)", // হালকা পার্পল ইনডাইরেক্ট গ্লো
          }}
          whileTap={{ scale: 0.98 }}
          className="border border-[#262626] rounded-2xl overflow-hidden transition-colors duration-300"
        >
          <Card className="bg-[#121212] w-full p-6 text-white shadow-xl h-full flex flex-col justify-between border-none rounded-none">
            <div>
              {/* ─── CARD HEADER ─── */}
              <Card.Header className="p-0 flex flex-col gap-4">
                <div className="flex items-start justify-between w-full gap-4">
                  {/* কোম্পানি লোগো এবং নাম/টাইটেল */}
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#262626] bg-[#1a1a1a] shrink-0">
                      <Image
                        src={job.image}
                        alt={`${job.CompanyName} Logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Card.Title className="text-lg font-bold tracking-tight text-white line-clamp-1">
                        {job.jobTitle}
                      </Card.Title>
                      <Card.Description className="text-xs text-gray-400 font-medium mt-0.5">
                        {job.CompanyName}
                      </Card.Description>
                    </div>
                  </div>

                  {/* জব স্ট্যাটাস ব্যাজ */}
                  <span
                    className={`text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full border uppercase shrink-0 ${statusColors[job.status?.toLowerCase()] || statusColors.pending}`}
                  >
                    {job.status}
                  </span>
                </div>

                {/* ক্যাটাগরি ও জব টাইপ ট্যাগস */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] font-medium bg-white/5 border border-white/[0.04] px-2.5 py-1 rounded-lg text-gray-300 capitalize">
                    {job.category}
                  </span>
                  <span className="text-[11px] font-medium bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg text-blue-400 capitalize">
                    {job.jobType === "fulltime" ? "Full Time" : job.jobType}
                  </span>
                </div>
              </Card.Header>

              {/* ─── CARD CONTENT ─── */}
              <Card.Content className="p-0 my-5 flex flex-col gap-3.5">
                <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                {/* মেটা ইনফরমেশন গ্রিড */}
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-400 pt-3 border-t border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-600 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-gray-600 shrink-0" />
                    <span className="truncate">{job.employeeCount} Emps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-gray-600 shrink-0" />
                    <span className="font-medium text-white uppercase truncate">
                      {formatSalary(job.minSalary, job.maxSalary)}{" "}
                      {job.salaryType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-600 shrink-0" />
                    <span className="truncate">{formatDate(job.deadline)}</span>
                  </div>
                </div>
              </Card.Content>
            </div>

            {/* ─── CARD FOOTER ─── */}
            <Card.Footer className="p-0 pt-4 border-t border-[#262626] flex items-center justify-between gap-4 mt-auto">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                  Posted on
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {formatDate(job.createAt)}
                </span>
              </div>

              <Link href={`jobs/${job._id}`}>
                <Button className="bg-white text-black hover:bg-gray-200 font-semibold text-xs h-9 px-4 rounded-xl flex items-center gap-1 transition-colors">
                  Apply Now
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

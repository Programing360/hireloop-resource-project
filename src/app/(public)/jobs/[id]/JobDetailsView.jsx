"use client";

import React from "react";
import Image from "next/image";
import { Button, Card } from "@heroui/react";
import {
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  ArrowLeft,
  Globe,
  Building2,
  ShieldCheck,
  Clock,
  Share2,
  Bookmark,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Framer Motion ভ্যারিয়েন্ট (স্মুথ এন্ট্রির জন্য)
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function JobDetailsView({ jobData }) {
  const router = useRouter();

    console.log(jobData);
  // সেফগার্ড ডেমো ডেটা (যদি প্রপ্স খালি থাকে)
  const job = jobData || {
    _id: "6a2ccf649c3b5af27e58c724",
    category: "tech",
    jobType: "fulltime",
    location: "Dhaka, Bangladesh",
    employeeCount: "101-500",
    websiteUrl: "https://www.technova.com",
    minSalary: "35000",
    maxSalary: "60000",
    salaryType: "usd",
    deadline: "2026-07-15",
    description:
      "Build responsive web applications using React and Next.js. Collaborate with cross-functional teams to define, design, and ship new features. Ensure the technical feasibility of UI/UX designs and optimize application for maximum speed and scalability.",
    reqruiterId: "684a11f3c5d9a7b1f9231001",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    status: "approved",
    CompanyName: "TechNova Inc.",
    createAt: "2026-06-12T09:00:26.916Z",
    jobTitle: "Senior Frontend Developer",
  };

  const statusColors = {
    pending: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    approved: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    rejected: "text-red-500 bg-red-500/10 border-red-500/20",
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
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
    <div className="min-h-screen bg-[#060606] text-white p-4 md:p-8 pt-20 md:mt-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-6"
      >
        {/* ─── BACK BUTTON & ACTIONS ─── */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-between"
        >
          <Button
            onPress={() => router.back()}
            className="bg-[#121212] border border-[#262626] text-gray-400 hover:text-white text-xs rounded-xl flex items-center gap-2 h-10 px-4"
          >
            <ArrowLeft size={16} />
            Back to Jobs
          </Button>

          <div className="flex items-center gap-2">
            <Button className="bg-[#121212] border border-[#262626] text-gray-400 hover:text-white isIconOnly rounded-xl h-10 w-10 mx-auto flex items-center justify-center">
              <Share2 size={16} />
            </Button>
            <Button className="bg-[#121212] border border-[#262626] text-gray-400 hover:text-white isIconOnly rounded-xl h-10 w-10 flex items-center justify-center">
              <Bookmark size={16} />
            </Button>
          </div>
        </motion.div>

        {/* ─── MAIN HERO HEROUI CARD ─── */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-[#121212] border border-[#262626] rounded-2xl p-6 md:p-8 shadow-2xl">
            <Card.Header className="p-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
              {/* কোম্পানি ও জব টাইটেল মেটা */}
              <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-[#262626] bg-[#1a1a1a] shrink-0 shadow-lg">
                  <Image
                    src={job.image}
                    alt={`${job.CompanyName} Logo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-white">
                      {job.jobTitle}
                    </h1>
                    <span
                      className={`text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full border uppercase ${statusColors[job.status?.toLowerCase()] || statusColors.pending}`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 font-medium">
                    <span className="text-white flex items-center gap-1.5">
                      <Building2 size={15} className="text-gray-600" />
                      {job.CompanyName}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} className="text-gray-600" />
                      {job.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* অ্যাকশন বাটন */}
              <Link href={`/jobs/${job._id}/apply`}>
                <Button className="w-full md:w-auto bg-white text-black hover:bg-gray-200 font-bold px-8 rounded-xl h-12 text-sm shadow-lg shadow-white/5">
                  Apply for this job
                </Button>
              </Link>
            </Card.Header>

            {/* কুইক ট্যাগস গ্রিড */}
            <Card.Content className="p-0 mt-8 pt-6 border-t border-white/[0.04] grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#1c1a1a] border border-[#262626] p-4 rounded-xl flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  Salary Range
                </span>
                <span className="text-sm font-bold text-white uppercase flex items-center gap-0.5">
                  <DollarSign size={15} className="text-purple-400" />
                  {formatSalary(job.minSalary, job.maxSalary)} {job.salaryType}
                </span>
              </div>

              <div className="bg-[#1c1a1a] border border-[#262626] p-4 rounded-xl flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  Job Type
                </span>
                <span className="text-sm font-bold text-blue-400 capitalize flex items-center gap-1.5">
                  <Clock size={15} />
                  {job.jobType === "fulltime" ? "Full Time" : job.jobType}
                </span>
              </div>

              <div className="bg-[#1c1a1a] border border-[#262626] p-4 rounded-xl flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  Employees
                </span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Briefcase size={15} className="text-gray-400" />
                  {job.employeeCount}
                </span>
              </div>

              <div className="bg-[#1c1a1a] border border-[#262626] p-4 rounded-xl flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  Application Deadline
                </span>
                <span className="text-sm font-bold text-red-400 flex items-center gap-1.5">
                  <Calendar size={15} />
                  {new Date(job.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Card.Content>
          </Card>
        </motion.div>

        {/* ─── CONTENT DETAILS SECTION ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* বাম পাশের কলাম: ডেসক্রিপশন */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Card className="bg-[#121212] border border-[#262626] rounded-2xl p-6 md:p-8 h-full">
              <Card.Header className="p-0 mb-4">
                <Card.Title className="text-lg font-bold text-white">
                  Job Description & Responsibilities
                </Card.Title>
              </Card.Header>
              <Card.Content className="p-0">
                <p className="text-sm text-gray-300 leading-relaxed font-normal whitespace-pre-line">
                  {job.description}
                </p>

                {/* প্রফেশনাল এক্সট্রা ডেমো ডাটা শোকেস */}
                <h4 className="text-sm font-bold text-white mt-6 mb-3">
                  Requirements:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 pl-1 font-normal">
                  <li>
                    Proven experience working as a core role in the specified
                    category field.
                  </li>
                  <li>
                    Deep knowledge of modern technical infrastructures and
                    frameworks.
                  </li>
                  <li>
                    Excellent communication and problem-solving capabilities.
                  </li>
                </ul>
              </Card.Content>
            </Card>
          </motion.div>

          {/* ডান পাশের কলাম: কোম্পানি সাইড ওভারভিউ */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-[#121212] border border-[#262626] rounded-2xl p-6 flex flex-col justify-between h-full gap-6">
              <div className="space-y-4">
                <Card.Header className="p-0">
                  <Card.Title className="text-base font-bold text-white">
                    About Company
                  </Card.Title>
                </Card.Header>

                <Card.Content className="p-0 space-y-4 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-gray-500">Industry Sector</span>
                    <span className="text-white font-semibold capitalize bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                      {job.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-gray-500">Corporate Identity</span>
                    <span className="text-white font-semibold flex items-center gap-1">
                      <ShieldCheck size={14} className="text-emerald-500" />{" "}
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-500">Posted Date</span>
                    <span className="text-gray-400 font-medium">
                      {formatDate(job.createAt)}
                    </span>
                  </div>
                </Card.Content>
              </div>

              <Card.Footer className="p-0 pt-4 border-t border-[#262626] ">
                <Button
                  onPress={() => window.open(job.websiteUrl, "_blank")}
                  className="w-full bg-[#1c1a1a] border border-[#262626] text-white hover:bg-[#262626] text-xs font-semibold h-10 rounded-xl flex items-center gap-2 transition-all text-center justify-center"
                >
                  <Globe size={14} />
                  Visit Company Website
                </Button>
              </Card.Footer>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

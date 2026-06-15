"use server";

import React from "react";
import JobApplyForm from "./JobApplyForm";
import { getUseSession } from "@/lib/core/session";
import { Button } from "@heroui/react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { getJobsById } from "@/lib/api/jobs";
import { getApplicantData } from "@/lib/applicant/applicant";

const ApplicationPage = async ({ params }) => {
  // সার্ভার সাইড সেশন গেট করা

  const { id } = await params;
  const user = await getUseSession();
  const jobs = await getJobsById(id);
  const applicantData = await getApplicantData(user.id)
  // console.log(data);

  // ১. ইউজার যদি লগইন না থাকে বা রিক্রুটার হয়, তবে তাকে রেস্ট্রিক্ট করা (যেহেতু রিক্রুটাররা অ্যাপ্লাই করে না)
  if (!user || user.role === "recruiter") {
    return (
      <div className="min-h-screen bg-[#060606] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#121212]/80 backdrop-blur-xl border border-[#262626] rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          {/* ওয়ার্নিং আইকন কন্টেইনার */}
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center mx-auto text-rose-500 shadow-lg shadow-rose-950/20">
            <ShieldAlert size={28} />
          </div>

          {/* টেক্সট মেসেজ */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Access Denied
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              {user?.role === "recruiter"
                ? "Recruiter accounts are not permitted to submit job applications. Please use a candidate profile."
                : "You must be authenticated with a candidate profile to view this application portal."}
            </p>
          </div>

          {/* অ্যাকশন বাটন */}
          <div className="pt-2">
            <Link href="/">
              <Button className="w-full bg-white text-black font-bold h-11 rounded-xl text-xs flex items-center justify-center gap-2 transition-all hover:bg-gray-200 cursor-pointer">
                <ArrowLeft size={14} />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ২. ইউজার যদি ভ্যালিড ক্যান্ডিডেট হয়, তবে অ্যাপ্লিকেশন ফর্ম দেখানো হবে
  return (
    <div className="bg-[#060606] min-h-screen">
      {/* আপনি চাইলে এখানে প্রপ্স হিসেবে ইউজারের ডাটা ফর্মে পাস করতে পারেন অটো-ফিলের জন্য */}
      <JobApplyForm applicant={user} companyName={id} jobs={jobs} applicantData={applicantData} />
    </div>
  );
};

export default ApplicationPage;

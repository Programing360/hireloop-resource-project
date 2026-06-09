'use client'
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import CompanyCreateForm from "@/component/dashboard/CompanyCreateForm";

export default function CompanyDashboard() {
  const [company, setCompany] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  // No company → Show Create Button or Form
  if (!company) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        {!isFormOpen ? (
          <div className="text-center py-20 border border-dashed border-[#262626] rounded-xl">
            <h3 className="text-lg font-medium text-white">
              No Company Found
            </h3>

            <p className="text-sm text-[#a3a3a3] mt-2 mb-6">
              Create your company profile to start posting jobs.
            </p>

            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-white text-black font-semibold"
            >
              Create Company
            </Button>
          </div>
        ) : (
          <CompanyCreateForm
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    );
  }

  // Company exists → Show company details only
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-[#121212] border border-[#262626] rounded-xl p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#262626]">
              <Image
                src={company.logo}
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                {company.name}
              </h2>

              <div
                className={`mt-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                  statusColors[company.status]
                }`}
              >
                {company.status.toUpperCase()}
              </div>
            </div>
          </div>

          <Button className="bg-[#1a1a1a] border border-[#262626] text-white">
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-[#525252]">Industry</p>
            <p className="text-white">{company.category}</p>
          </div>

          <div>
            <p className="text-[#525252]">Location</p>
            <p className="text-white">{company.location}</p>
          </div>

          <div>
            <p className="text-[#525252]">Employees</p>
            <p className="text-white">{company.employeeCount}</p>
          </div>

          <div>
            <p className="text-[#525252]">Website</p>
            <p className="text-white">{company.websiteUrl}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[#525252] text-sm">Description</p>
          <p className="text-white text-sm mt-1 leading-relaxed">
            {company.description}
          </p>
        </div>
      </div>
    </div>
  );
}
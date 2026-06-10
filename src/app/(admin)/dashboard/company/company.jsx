'use client';

import React, { useState } from "react";
import Image from "next/image";
import { Button, Modal } from "@heroui/react";
import CompanyCreateForm from "@/component/dashboard/CompanyCreateForm";
import CompanyEditForm from "@/component/dashboard/CompanyEditForm";

export default function CompanyDashboard({ company }) {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  // ─── CASE 1: NO COMPANY FOUND ───
  if (!company) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        {!isCreateFormOpen ? (
          <div className="text-center py-20 border border-dashed border-[#262626] rounded-xl bg-[#0a0a0a]">
            <h3 className="text-lg font-medium text-white">No Company Found</h3>
            <p className="text-sm text-[#a3a3a3] mt-2 mb-6">
              Create your company profile to start posting jobs.
            </p>
            <Button
              onPress={() => setIsCreateFormOpen(true)}
              className="bg-white text-black font-semibold rounded-xl"
            >
              Create Company
            </Button>
          </div>
        ) : (
          <div className="bg-[#121212] border border-[#262626] rounded-xl p-8">
            <CompanyCreateForm onClose={() => setIsCreateFormOpen(false)} />
          </div>
        )}
      </div>
    );
  }

  // ─── CASE 2: COMPANY EXISTS (SHOW DETAILS) ───
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-[#121212] border border-[#262626] rounded-xl p-8 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#262626] bg-[#1a1a1a]">
              <Image
                src={company.image || "/placeholder-logo.png"}
                alt={`${company.name} Logo`}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {company.name}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                    statusColors[company.status?.toLowerCase()] || statusColors.pending
                  }`}
                >
                  {company.status || "PENDING"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{company.category}</p>
            </div>
          </div>

          {/* এডিট বাটন */}
          <Button 
            onPress={() => setIsEditModalOpen(true)}
            className="bg-[#1a1a1a] border border-[#262626] text-white hover:bg-[#262626] font-medium rounded-xl transition-all"
          >
            Edit Profile
          </Button>
        </div>

        {/* কোম্পানি মেটাডেটা গ্রিড */}
        <div className="grid grid-cols-2 gap-6 text-sm pt-4 border-t border-[#262626]">
          <div>
            <p className="text-[#525252] font-medium text-xs uppercase tracking-wider">Industry</p>
            <p className="text-white mt-1 font-medium">{company.category || "N/A"}</p>
          </div>
          <div>
            <p className="text-[#525252] font-medium text-xs uppercase tracking-wider">Location</p>
            <p className="text-white mt-1 font-medium">{company.location || "N/A"}</p>
          </div>
          <div>
            <p className="text-[#525252] font-medium text-xs uppercase tracking-wider">Employees</p>
            <p className="text-white mt-1 font-medium">{company.employeeCount || "N/A"}</p>
          </div>
          <div>
            <p className="text-[#525252] font-medium text-xs uppercase tracking-wider">Website</p>
            {company.websiteUrl ? (
              <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline mt-1 block font-medium">
                {company.websiteUrl}
              </a>
            ) : (
              <p className="text-white mt-1 font-medium">N/A</p>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#262626]">
          <p className="text-[#525252] font-medium text-xs uppercase tracking-wider">Description</p>
          <p className="text-gray-300 text-sm mt-1.5 leading-relaxed font-normal">
            {company.description || "No description provided."}
          </p>
        </div>
      </div>

      {/* ─── HEROUI V3 SUB-COMPONENTS EDIT MODAL ─── */}
      <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <Modal.Backdrop className="bg-black/60 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center p-4">
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-2xl bg-[#121212] border border-[#262626] text-white rounded-2xl p-0">
              <Modal.CloseTrigger className="hover:bg-white/5 text-gray-400 hover:text-white" />
              
              <Modal.Header className="px-6 pt-6 pb-4 border-b border-[#262626]">
                <Modal.Heading className="text-xl font-bold tracking-tight text-white">
                  Update Company Profile
                </Modal.Heading>
                <p className="mt-1.5 text-xs text-gray-500 font-normal">
                  Modify your business infrastructure details below. Form fields are pre-filled with your current profile data.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6">
                {/* ফর্মের ভেতর initialData ও ক্লোজ মেথড পাঠানো হয়েছে */}
                <CompanyEditForm 
                  initialData={company} 
                  onClose={() => setIsEditModalOpen(false)} 
                />
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
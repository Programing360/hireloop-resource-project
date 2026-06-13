"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, Modal } from "@heroui/react";
import CompanyCreateForm from "@/component/dashboard/CompanyCreateForm";
import CompanyEditForm from "@/component/dashboard/CompanyEditForm";
import { Edit2 } from "lucide-react";

export default function CompanyDashboard({ companyData = [], reqruiterId }) {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  // ─── CASE 1: NO COMPANY ───
  if (!companyData?.length) {
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
            <CompanyCreateForm
              reqruiterId={reqruiterId}
              onClose={() => setIsCreateFormOpen(false)}
            />
          </div>
        )}
      </div>
    );
  }

  // ─── CASE 2: COMPANY EXISTS ───
  return (
    <div className="max-w-2xl mx-auto p-8 mt-10">
      {companyData?.map((company) => (
        <div
          key={company._id}
          className="bg-[#121212] border border-[#262626] rounded-xl p-8 shadow-2xl mb-6"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#262626] bg-[#1a1a1a]">
                <Image
                  src={company.image || "/placeholder-logo.png"}
                  alt={company.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">
                    {company.name}
                  </h2>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      statusColors[company.status?.toLowerCase()] ||
                      statusColors.pending
                    }`}
                  >
                    {company.status || "PENDING"}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-1">{company.category}</p>
              </div>
            </div>

            {/* EDIT BUTTON */}

            <Button
              onPress={() => {
                setSelectedCompany(company);
                setIsEditModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm transition-all duration-200 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-zinc-500"
            >
              <Edit2 className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
              <span>Edit Profile</span>
            </Button>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-6 text-sm pt-4 border-t border-[#262626]">
            <div>
              <p className="text-[#525252] text-xs uppercase">Industry</p>
              <p className="text-white mt-1">{company.category || "N/A"}</p>
            </div>

            <div>
              <p className="text-[#525252] text-xs uppercase">Location</p>
              <p className="text-white mt-1">{company.location || "N/A"}</p>
            </div>

            <div>
              <p className="text-[#525252] text-xs uppercase">Employees</p>
              <p className="text-white mt-1">
                {company.employeeCount || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-[#525252] text-xs uppercase">Website</p>

              {company.websiteUrl ? (
                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline mt-1 block"
                >
                  {company.websiteUrl}
                </a>
              ) : (
                <p className="text-white mt-1">N/A</p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6 pt-4 border-t border-[#262626]">
            <p className="text-[#525252] text-xs uppercase">Description</p>
            <p className="text-gray-300 text-sm mt-1.5 leading-relaxed">
              {company.description || "No description provided."}
            </p>
          </div>
        </div>
      ))}

      {/* ─── EDIT MODAL ─── */}
      <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <Modal.Backdrop className="bg-black/60 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center p-4">
          <Modal.Container className='w-full md:max-w-2xl' placement="center">
            <Modal.Dialog className="bg-[#121212] border border-[#262626] text-white rounded-2xl p-0 w-full max-w-2xl p-3">
              <Modal.CloseTrigger className="cursor-pointer hover:bg-red-600/70 rounded-full p-2"/>

              <Modal.Header className="px-6 pt-6 pb-4 border-b border-[#262626]">
                <Modal.Heading className="text-xl font-bold">
                  Update Company Profile
                </Modal.Heading>
                <p className="text-xs text-gray-500 mt-1">
                  Modify your company details below
                </p>
              </Modal.Header>

              <Modal.Body className="p-6 w-full">
                {selectedCompany && (
                  <CompanyEditForm
                    initialData={selectedCompany}
                    reqruiterId={reqruiterId}
                    onClose={() => setIsEditModalOpen(false)}
                  />
                )}
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}

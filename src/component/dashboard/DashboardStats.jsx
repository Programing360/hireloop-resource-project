"use client";

import React, { useMemo, useState } from "react";
import { Table, Avatar, Button, Link } from "@heroui/react";
import { motion } from "framer-motion";

// React Icons
import { FiChevronUp } from "react-icons/fi";
import { SiGoogle, SiMeta, SiStripe, SiTesla } from "react-icons/si";


const initialApplications = [
  { id: 1, name: "Julianne Moore", role: "Senior Product Designer", date: "Oct 24, 2023", exp: "6 years", status: "Interviewing" },
  { id: 2, name: "Robert Downey", role: "Backend Engineer", date: "Oct 23, 2023", exp: "4 years", status: "New" },
  { id: 3, name: "Emma Stone", role: "Marketing Lead", date: "Oct 22, 2023", exp: "8 years", status: "Reviewing" },
  { id: 4, name: "Chris Pratt", role: "Product Manager", date: "Oct 21, 2023", exp: "5 years", status: "Rejected" },
];


const companies = [
  { id: 1, name: "Google Inc.", meta: "Technology • Mountain View", jobs: "24", icon: SiGoogle, color: "text-[#4285F4]" },
  { id: 2, name: "Meta Platforms", meta: "Social Media • Menlo Park", jobs: "18", icon: SiMeta, color: "text-[#0668E1]" },
  { id: 3, name: "Stripe", meta: "Fintech • San Francisco", jobs: "12", icon: SiStripe, color: "text-[#635BFF]" },
  { id: 4, name: "Tesla", meta: "Automotive • Austin", jobs: "31", icon: SiTesla, color: "text-[#E82127]" },
];


const getStatusStyle = (status) => {
  switch (status) {
    case "Interviewing": return "bg-green-500/10 text-green-400 border-green-500/20";
    case "New": return "bg-slate-500/10 text-slate-300 border-slate-500/20";
    case "Reviewing": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "Rejected": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    default: return "bg-default/10 text-default-foreground";
  }
};


function SortableColumnHeader({ children, sortDirection }) {
  return (
    <span className="flex items-center justify-between w-full group px-1">
      {children}
      {!!sortDirection && (
        <FiChevronUp
          className={`size-3.5 transform transition-transform duration-150 ease-out text-gray-500 group-hover:text-gray-300 ${
            sortDirection === "descending" ? "rotate-180" : ""
          }`}
        />
      )}
    </span>
  );
}

export default function DashboardStats() {

  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });


  const sortedApplications = useMemo(() => {
    return [...initialApplications].sort((a, b) => {
      const col = sortDescriptor.column;
      const first = String(a[col]);
      const second = String(b[col]);
      let cmp = first.localeCompare(second);

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }
      return cmp;
    });
  }, [sortDescriptor]);

  // ফ্রেমার মোশন অ্যানিমেশন কনফিগারেশন
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="w-full bg-[#0d0d0d] text-white p-4 sm:p-6 min-h-screen">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
      >
        
        {/* ========================================================
            SECTION 1: LEFT PANEL - RECENT APPLICATIONS (8 Columns)
            ======================================================== */}
        <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xl font-bold tracking-tight">Recent Applications</h2>
            <Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
              View all
            </Link>
          </div>

          {/* HeroUI v3 টেবিল কন্টেইনার */}
          <div className="bg-[#141212] border border-white/[0.04] rounded-2xl overflow-hidden shadow-xl">
            <Table  className="w-full">
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="Recent Applications Interactive Table"
                  className="min-w-[700px]"
                  selectedKeys={selectedKeys}
                  selectionMode="multiple"
                  sortDescriptor={sortDescriptor}
                  onSelectionChange={setSelectedKeys}
                  onSortChange={setSortDescriptor}
                >
                  <Table.Header>
                    <Table.Column isRowHeader allowsSorting id="name" className="bg-transparent text-gray-500 text-[11px] font-bold tracking-wider uppercase py-4 border-b border-white/[0.02]">
                      {({ sortDirection }) => (
                        <SortableColumnHeader sortDirection={sortDirection}>Candidate Name</SortableColumnHeader>
                      )}
                    </Table.Column>
                    <Table.Column allowsSorting id="role" className="bg-transparent text-gray-500 text-[11px] font-bold tracking-wider uppercase py-4 border-b border-white/[0.02]">
                      {({ sortDirection }) => (
                        <SortableColumnHeader sortDirection={sortDirection}>Role</SortableColumnHeader>
                      )}
                    </Table.Column>
                    <Table.Column allowsSorting id="date" className="bg-transparent text-gray-500 text-[11px] font-bold tracking-wider uppercase py-4 border-b border-white/[0.02]">
                      {({ sortDirection }) => (
                        <SortableColumnHeader sortDirection={sortDirection}>Date Applied</SortableColumnHeader>
                      )}
                    </Table.Column>
                    <Table.Column id="exp" className="bg-transparent text-gray-500 text-[11px] font-bold tracking-wider uppercase py-4 border-b border-white/[0.02]">
                      Experience
                    </Table.Column>
                    <Table.Column allowsSorting id="status" className="bg-transparent text-gray-500 text-[11px] font-bold tracking-wider uppercase py-4 border-b border-white/[0.02] text-center">
                      {({ sortDirection }) => (
                        <SortableColumnHeader sortDirection={sortDirection}>Status</SortableColumnHeader>
                      )}
                    </Table.Column>
                  </Table.Header>
                  
                  <Table.Body>
                    {sortedApplications.map((app) => (
                      <Table.Row 
                        key={app.id}
                        className="border-b last:border-0 border-white/[0.02] hover:bg-white/[0.01] transition-colors group cursor-pointer"
                      >
                        <Table.Cell className="py-4">
                          <div className="flex items-center gap-3">
                            <Avatar 
                              name={app.name[0]} 
                              className="w-8 h-8 text-[11px] font-bold bg-[#262424] text-gray-300 border border-white/[0.05]"
                            />
                            <span className="text-[13px] font-bold text-gray-200 group-hover:text-white transition-colors">
                              {app.name}
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="text-[13px] text-gray-400 py-4 font-medium">{app.role}</Table.Cell>
                        <Table.Cell className="text-[13px] text-gray-400 py-4">{app.date}</Table.Cell>
                        <Table.Cell className="text-[13px] text-gray-400 py-4">{app.exp}</Table.Cell>
                        <Table.Cell className="py-4 text-center">
                          <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border ${getStatusStyle(app.status)}`}>
                            {app.status}
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </div>
        </motion.div>

        {/* ========================================================
            SECTION 2: RIGHT PANEL - MY TOP COMPANIES (4 Columns)
            ======================================================== */}
        <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xl font-bold tracking-tight">My Top Companies</h2>
            <Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
              View all
            </Link>
          </div>

          <div className="bg-[#141212] border border-white/[0.04] rounded-2xl p-4 flex flex-col gap-3 shadow-xl h-full justify-between">
            <div className="flex flex-col gap-2">
              {companies.map((company) => {
                const CompanyIcon = company.icon;
                return (
                  <motion.div
                    key={company.id}
                    whileHover={{ x: 3, backgroundColor: "rgba(255,255,255,0.01)" }}
                    className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-white/[0.02] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5 truncate">
                      <div className="w-10 h-10 bg-[#1c1a1a] border border-white/[0.04] rounded-xl flex items-center justify-center shrink-0 shadow-inner group-hover:bg-[#242121] transition-colors">
                        <CompanyIcon className={`size-[18px] ${company.color}`} />
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="text-[13px] font-bold text-gray-200 group-hover:text-white transition-colors truncate">
                          {company.name}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium mt-0.5 truncate">
                          {company.meta}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <span className="text-sm font-bold text-white block tracking-tight">
                        {company.jobs}
                      </span>
                      <span className="text-[9px] font-black tracking-wider text-gray-500 uppercase block mt-0.5">
                        Active Jobs
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Button
              as={Link}
              href="#"
              className="w-full h-11 bg-[#1a1818] border border-white/[0.05] hover:border-white/[0.1] hover:bg-[#211f1f] text-gray-300 hover:text-white font-bold text-xs sm:text-sm tracking-wide rounded-xl mt-4 transition-all"
            >
              View All Companies
            </Button>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
"use client"; // Required for Framer Motion client-side animations

import React from "react";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Edit2, 
  Trash2, 
  Layers, 
  Clock 
} from "lucide-react";
import Image from "next/image";

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const ManageAllJobsPage = ({ jobsData = [] }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-6 md:p-10 selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Header (Adaptive Layout) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800/60 pb-5"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Manage All Jobs
            </h1>
            <Chip 
              size="sm" 
              variant="flat" 
              className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold"
            >
              {jobsData.length} Positions
            </Chip>
          </div>
          <p className="text-xs md:text-sm text-zinc-400 mt-1">
            Review, organize, and inspect real-time job openings and applications.
          </p>
        </div>
      </motion.div>

      {/* Main Container Wrapper */}
      <div className="max-w-7xl mx-auto">
        
        {/* 2. MOBILE VIEW (Under md breakpoint) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="block md:hidden space-y-4"
        >
          {jobsData.length === 0 ? (
            <div className="text-zinc-500 py-12 text-sm text-center bg-zinc-900/20 rounded-2xl border border-zinc-800/60">
              No operational jobs available.
            </div>
          ) : (
            jobsData.map((job) => (
              <motion.div
                key={`mobile-${job._id}`}
                variants={itemVariants}
                className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-md flex flex-col gap-4"
              >
                {/* Profile Header Block */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {job.image ? (
                      <img
                        src={job.image}
                        alt={job.jobTitle}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-zinc-700/50 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-zinc-500" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-zinc-100 truncate">
                        {job.jobTitle}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                        {job.description || "No description provided"}
                      </p>
                    </div>
                  </div>
                  
                  <Chip
                    className="capitalize text-xs font-semibold shrink-0"
                    color={job.status === "inactive" ? "danger" : "success"}
                    size="sm"
                    variant="dot"
                  >
                    {job.status || "active"}
                  </Chip>
                </div>

                {/* Meta Attributes Grid */}
                <div className="grid grid-cols-2 gap-3 border-t border-b border-zinc-800/40 py-3 text-xs">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Layers className="w-3 h-3" /> Category
                    </span>
                    <Chip color="secondary" size="sm" variant="flat" className="capitalize text-[11px] h-5 px-2 w-max">
                      {job.category}
                    </Chip>
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Commitment
                    </span>
                    <Chip color="primary" size="sm" variant="soft" className="capitalize text-[11px] h-5 bg-blue-500/10 text-blue-400 px-2 w-max">
                      {job.jobType}
                    </Chip>
                  </div>
                  <div className="col-span-2 min-w-0">
                    <span className="text-zinc-500 flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" /> Location
                    </span>
                    <span className="text-zinc-300 text-xs block truncate pl-4">
                      {job.location}
                    </span>
                  </div>
                </div>

                {/* Footer Actions & Compensation */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] text-zinc-500 flex items-center gap-1 uppercase tracking-wider">
                      <DollarSign className="w-3 h-3 text-emerald-500" /> Compensation
                    </span>
                    <span className="text-emerald-400 font-bold text-sm tracking-wide pl-4 block">
                      {job.salary}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="text-zinc-400 hover:text-amber-400 bg-zinc-800/60 hover:bg-amber-500/10 w-9 h-9 rounded-xl"
                      onClick={() => console.log("Edit requested for id:", job._id)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="text-zinc-400 hover:text-danger bg-zinc-800/60 hover:bg-danger/10 w-9 h-9 rounded-xl"
                      onClick={() => console.log("Delete requested for id:", job._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* 3. TABLET & DESKTOP VIEW (From md breakpoint up) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:block bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl shadow-black/40 overflow-hidden"
        >
          <Table className="[--heroui-table-background:transparent]">
            <Table.ResizableContainer>
              <Table.Content aria-label="Jobs control panel" className="w-full">
                <Table.Header>
                  <Table.Column isRowHeader defaultWidth="1.8fr" minWidth={220} className="text-zinc-400 uppercase tracking-wider text-xs font-bold text-left">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Job Position</span>
                    <Table.ColumnResizer />
                  </Table.Column>

                  <Table.Column defaultWidth="1fr" minWidth={120} className="text-zinc-400 uppercase tracking-wider text-xs font-bold text-left">
                    <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Category</span>
                    <Table.ColumnResizer />
                  </Table.Column>

                  <Table.Column defaultWidth="1fr" minWidth={120} className="text-zinc-400 uppercase tracking-wider text-xs font-bold text-left">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Commitment</span>
                    <Table.ColumnResizer />
                  </Table.Column>

                  <Table.Column defaultWidth="1.2fr" minWidth={140} className="text-zinc-400 uppercase tracking-wider text-xs font-bold text-left">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Location</span>
                    <Table.ColumnResizer />
                  </Table.Column>

                  <Table.Column defaultWidth="1fr" minWidth={120} className="text-zinc-400 uppercase tracking-wider text-xs font-bold text-left">
                    <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Compensation</span>
                    <Table.ColumnResizer />
                  </Table.Column>

                  <Table.Column defaultWidth="1fr" minWidth={100} className="text-zinc-400 uppercase tracking-wider text-xs font-bold text-left">
                    Status
                    <Table.ColumnResizer />
                  </Table.Column>

                  <Table.Column defaultWidth="1fr" minWidth={110} className="text-zinc-400 uppercase tracking-wider text-xs font-bold text-center">
                    Actions
                  </Table.Column>
                </Table.Header>

                <Table.Body emptyContent={<div className="text-zinc-500 py-12 text-sm text-center">No operational jobs available.</div>}>
                  {jobsData.map((job) => (
                    <Table.Row key={`desktop-${job._id}`} className="group border-b border-zinc-800/40 last:border-0 transition-colors duration-200 hover:bg-zinc-800/20">
                      
                      {/* Job Title Cell */}
                      <Table.Cell className="align-middle">
                        <motion.div variants={itemVariants} className="flex items-center justify-start gap-3.5 py-1.5 min-w-0">
                          {job.image ? (
                            <Image
                              src={job.image}
                              alt={job.jobTitle}
                              width='40'
                              height='40'
                              className="w-10 h-10 rounded-xl object-cover ring-1 ring-zinc-700/50 shadow-md transition-transform duration-200 group-hover:scale-105 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                              <Briefcase className="w-4 h-4 text-zinc-400" />
                            </div>
                          )}
                          <div className="flex flex-col min-w-0 justify-center">
                            <span className="font-semibold text-sm text-zinc-100 group-hover:text-indigo-400 transition-colors truncate">
                              {job.jobTitle}
                            </span>
                            <span className="text-xs text-zinc-400 line-clamp-1 max-w-[180px] lg:max-w-[240px] mt-0.5">
                              {job.description || "No description provided"}
                            </span>
                          </div>
                        </motion.div>
                      </Table.Cell>

                      {/* Category Cell */}
                      <Table.Cell className="align-middle text-left">
                        <motion.div variants={itemVariants} className="flex items-center">
                          <Chip color="secondary" size="sm" variant="flat" className="capitalize font-medium text-xs px-1">
                            {job.category}
                          </Chip>
                        </motion.div>
                      </Table.Cell>

                      {/* Job Type Cell */}
                      <Table.Cell className="align-middle text-left">
                        <motion.div variants={itemVariants} className="flex items-center">
                          <Chip color="primary" size="sm" variant="soft" className="capitalize font-medium text-xs bg-blue-500/10 text-blue-400 px-1">
                            {job.jobType}
                          </Chip>
                        </motion.div>
                      </Table.Cell>

                      {/* Location Cell */}
                      <Table.Cell className="text-zinc-300 text-sm align-middle text-left">
                        <motion.div variants={itemVariants} className="flex items-center gap-1.5 min-w-0">
                          <span className="truncate max-w-[120px] lg:max-w-[160px]">{job.location}</span>
                        </motion.div>
                      </Table.Cell>

                      {/* Salary Cell */}
                      <Table.Cell className="text-emerald-400 font-bold text-sm tracking-wide align-middle text-left">
                        <motion.div variants={itemVariants} className="flex items-center">
                          {job.salary}
                        </motion.div>
                      </Table.Cell>

                      {/* Status Cell */}
                      <Table.Cell className="align-middle text-left">
                        <motion.div variants={itemVariants} className="flex items-center">
                          <Chip className="capitalize border-none text-xs font-semibold pl-0" color={job.status === "inactive" ? "danger" : "success"} size="sm" variant="dot">
                            {job.status || "active"}
                          </Chip>
                        </motion.div>
                      </Table.Cell>

                      {/* Actions Cell */}
                      <Table.Cell className="align-middle text-center">
                        <motion.div variants={itemVariants} className="flex justify-center items-center gap-1.5">
                          <Tooltip content="Edit Position" className="bg-zinc-800 text-xs text-zinc-200 border border-zinc-700/50">
                            <Button isIconOnly size="sm" variant="light" className="text-zinc-400 text-center hover:text-amber-400 hover:bg-amber-500/10 min-w-8 h-8 rounded-lg" onClick={() => console.log("Edit requested for id:", job._id)}>
                              <Edit2 className="w-3.5 h-3.5 mx-auto " />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Delete Job" className="bg-zinc-800 text-xs text-danger border border-danger/20">
                            <Button isIconOnly size="sm" variant="light" className="text-zinc-400 hover:text-danger hover:bg-danger/10 min-w-8 h-8 rounded-lg" onClick={() => console.log("Delete requested for id:", job._id)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </Tooltip>
                        </motion.div>
                      </Table.Cell>

                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ResizableContainer>
          </Table>
        </motion.div>

      </div>
    </div>
  );
};

export default ManageAllJobsPage;
"use client";

import React from "react";
import { Card } from "@heroui/react";
import { motion } from "framer-motion"; 
import { FiFileText, FiUsers, FiZap, FiCheckCircle } from "react-icons/fi";

export default function StatsGrid() {
  const statsData = [
    { id: 1, title: "Total Job Posts", value: "48", icon: FiFileText },
    { id: 2, title: "Total Applicants", value: "1,284", icon: FiUsers },
    { id: 3, title: "Active Jobs", value: "18", icon: FiZap },
    { id: 4, title: "Jobs Closed", value: "32", icon: FiCheckCircle },
  ];

  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1]
      } 
    },
  };

  return (
    <div className="w-full bg-[#0d0d0d] p-6  ">
        <h1 className='text-2xl font-bold text-white max-w-7xl mx-auto mb-5'>Welcome back, Alex Sterling</h1>
     
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto "
      >
        {statsData.map((stat) => {
          const IconComponent = stat.icon;
          return (
            
            <motion.div
              key={stat.id}
              variants={cardVariants}
              whileHover={{ 
                y: -4, 
                borderColor: "rgba(255, 255, 255, 0.08)",
                backgroundColor: "#1c1a1a"
              }}
              className="rounded-[20px]"
            >
              <Card
                className="bg-[#181616] border border-white/[0.04] rounded-[20px] p-6 flex flex-col justify-between min-h-[160px] shadow-sm select-none h-full transition-colors duration-300"
              >
            
                <div className="w-10 h-10 bg-[#262424] border border-white/[0.03] rounded-xl flex items-center justify-center mb-5 shrink-0 shadow-inner">
                  <IconComponent className="text-gray-300 size-[18px] stroke-[2]" />
                </div>

               
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-medium text-gray-400 tracking-wide">
                    {stat.title}
                  </span>
                  <h3 className="text-3xl font-bold tracking-tight text-white antialiased">
                    {stat.value}
                  </h3>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
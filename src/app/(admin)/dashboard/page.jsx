import DashboardStats from "@/component/dashboard/DashboardStats";
import { DashboardHeader } from "@/component/dashboard/Navbar";
import StatsGrid from "@/component/dashboard/StatsGrid";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="w-full border">
      <DashboardHeader></DashboardHeader>
      <StatsGrid></StatsGrid>
      <DashboardStats></DashboardStats>
      
    </div>
  );
};

export default DashboardPage;

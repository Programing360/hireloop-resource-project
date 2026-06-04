"use client";

import React from "react";
import { Input, Avatar, Badge } from "@heroui/react";
import { Search, Bell } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function DashboardHeader() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // স্ক্রিনশটের হুবহু টেক্সট ডেটা ব্যাকআপ
  const userName = user?.name || "Alex Sterling";
  const userCompany = "TechFlow Inc.";

  // ইমেজ না থাকলে ব্যাকআপ ২ অক্ষরের নাম
  const userInitialName = userName
    ? userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AS";

  return (
    <header className="w-full h-20 bg-[#141212] border-b border-white/[0.04] flex items-center justify-between px-6 gap-6 text-white select-none">
      
      {/* ─── LEFT: PRESTIGE MODERN SEARCH BAR ─── */}
      <div className="flex-1 max-w-7xl">
        <div className="relative group w-full">
          <Input
            type="text"
            placeholder="Search applications, jobs, or talent..."
            className="w-full h-11 border border-white/[0.06] rounded-xl hover:bg-[#1f1d1d] focus-within:!border-purple-500/80 transition-all duration-200 px-4 text-sm text-slate-200 placeholder:text-gray-600 pl-10 bg-transparent focus:outline-none"
            classNames={{
              input: "text-sm text-slate-200 placeholder:text-gray-600 pl-20 bg-transparent focus:outline-none w-full",
              inputWrapper: "h-11 bg-[#1a1818]/60 border border-white/[0.06] rounded-xl hover:bg-[#1f1d1d] focus-within:!border-purple-500/80 transition-all duration-200 px-4"
            }}
          />
          {/* সার্চ আইকন */}
          <Search 
            size={16} 
            className="text-gray-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-purple-400 transition-colors" 
          />
        </div>
      </div>

      {/* ─── RIGHT: NOTIFICATION & USER BANNER MODULE ─── */}
      <div className="flex items-center gap-5 shrink-0">
        
        {/* নোটিফিকেশন বেল উইথ রেড ডট ব্যাজ */}
        <button className="relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.02] transition-all active:scale-95">
          <Bell size={20} className="stroke-[1.8]" />
          {/* লাইভ নোটিফিকেশন রেড ডট ইন্ডিকেটর */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-[#141212]" />
        </button>

        {/* ফাইন স্ট্রেইট ডিভাইডার লাইন */}
        <div className="h-6 w-[1px] bg-white/10" />

        {/* ইউজার প্রোফাইল কম্প্যাক্ট স্লট */}
        <div className="flex items-center gap-3.5">
          {/* কোম্পানি এবং ইউজার টেক্সট */}
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-bold text-gray-100 tracking-wide leading-tight">
              {userName}
            </span>
            <span className="text-[11px] text-gray-500 font-medium mt-0.5">
              {userCompany}
            </span>
          </div>

          {/* HeroUI v3 কম্পোজেবল অবতার */}
          <Avatar
            isBordered
            className="w-9 h-9 text-xs font-bold border-white/[0.08] bg-purple-600 shrink-0 rounded-full text-center flex items-center justify-center"
            size="sm"
          >
            {user?.image && (
              <Avatar.Image alt={userName} src={user.image} />
            )}
            <Avatar.Fallback className="text-white font-bold rounded-full ">{userInitialName}</Avatar.Fallback>
          </Avatar>
        </div>

      </div>
    </header>
  );
}
"use client";

import React from "react";
import { Avatar } from "@heroui/react";
import { Search, Bell } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const route = useRouter()

  const userName = user?.name || "Alex Sterling";
  const userCompany = "TechFlow Inc.";

 
  const userInitialName = userName
    ? userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AS";

  return (
    <header className="w-full h-20 bg-[#141212] border-b border-white/[0.04] flex items-center justify-between px-4 sm:px-6 gap-4 sm:gap-6 text-white select-none">
      
      {/* ─── LEFT: PRESTIGE MODERN SEARCH BAR ─── */}
      <div className="flex-1 max-w-3xl md:max-w-4xl lg:max-w-7xl">
        <div className="relative w-full flex items-center">
         
          <Search 
            size={16} 
            className="text-gray-600 absolute left-4 pointer-events-none z-10" 
          />
          
          
          <input
            type="text"
            placeholder="Search applications, jobs, or talent..."
            className="w-full h-11 bg-[#1a1818]/60 border border-white/[0.06] rounded-xl pl-11 pr-4 text-sm text-slate-200 placeholder:text-gray-600 outline-none hover:bg-[#1f1d1d] focus:border-purple-500/80 transition-all duration-200"
          />
        </div>
      </div>

      {/* ─── RIGHT: NOTIFICATION & USER BANNER MODULE ─── */}
      <div className="flex items-center gap-3 sm:gap-5 shrink-0">
        
        
        <button className="relative p-2 sm:p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.02] transition-all active:scale-95">
          <Bell size={19} className="stroke-[1.8]" />
       
          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-[#141212]" />
        </button>

       
        <div className="h-6 w-[1px] bg-white/10" />

        
        <div className="flex items-center gap-2.5 sm:gap-3.5">
         
          <div className="hidden md:flex flex-col text-right">
            <span className="text-[13px] sm:text-sm font-bold text-gray-100 tracking-wide leading-tight whitespace-nowrap">
              {userName}
            </span>
            <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium mt-0.5 whitespace-nowrap">
              {userCompany}
            </span>
          </div>

         
          <Avatar
            
            className="w-8 h-8 sm:w-9 sm:h-9 text-xs font-bold border-white/[0.08] bg-purple-600 shrink-0 text-center flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity rounded-full"
            size="sm"
          >
            {user?.image && (
              <Avatar.Image alt={userName} src={user.image} />
            )}
            <Avatar.Fallback className="text-white font-bold">{userInitialName}</Avatar.Fallback>
          </Avatar>
        </div>

      </div>
    </header>
  );
}
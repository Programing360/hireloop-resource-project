"use client";

import React, { useState } from "react";
import { Avatar } from "@heroui/react";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FileText,
  Settings,
  Menu,
  X,
  Sparkles,
  Search,
  Bell,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  // মোবাইল ড্রপডাউন মেনু টগল করার জন্য স্টেট
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname()


  const { data: session } = authClient.useSession();
  const user = session?.user;

  const userName = user?.name || "Alex Sterling";
  const userRole = "Recruiter";

  const userInitialName = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AS";

  const navItems = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "Jobs", label: "Jobs", icon: Search, href: "/dashboard/jobs" },
    { id: "Post jobs", label: "Post A Job", icon: Bell, href: "/dashboard/jobs/new" },
    { id: "My Company", label: "My Company", icon: Building2, href: "/dashboard/company" },
    { id: "Manage", label: "Manage", icon: Briefcase, href: "/dashboard/manage" },
    { id: "Applications", label: "Applications", icon: FileText, href: "/dashboard/applications" },
    { id: "Settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  const handleItemClick = (id) => {
    setActiveItem(id);
    setIsMobileMenuOpen(false);
  };

  const renderNavLinks = () => (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href
        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => handleItemClick(item.id)}
            className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-[14px] font-medium tracking-wide transition-all duration-200 relative group select-none ${
              isActive
                ? "bg-[#242121] text-white font-semibold"
                : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]"
            }`}
          >
            {isActive && (
              <span className="absolute right-0 top-1/4 bottom-1/4 w-[3px] bg-white rounded-l-full" />
            )}

            <Icon
              size={18}
              className={`transition-colors shrink-0 ${
                isActive
                  ? "text-purple-400"
                  : "text-gray-500 group-hover:text-gray-400"
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ─── MOBILE TOP BAR ─── */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#141212] border-b border-white/[0.03] flex items-center px-4 justify-between z-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">H</span>
          </div>
          <span className="text-base font-bold text-white tracking-tight">
            HireLoop
          </span>
        </div>

     
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          className="text-gray-400 hover:text-white transition-colors p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ─── MOBILE DROPDOWN MENU (Slices down from top bar) ─── */}
      <div
        className={`md:hidden fixed left-0 right-0 bg-[#141212] border-b border-white/[0.05] z-40 p-6 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-2xl ${
          isMobileMenuOpen
            ? "top-16 opacity-100 visible pointer-events-auto"
            : "top-[-100%] opacity-0 invisible pointer-events-none"
        }`}
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div className="w-full">
          {/* মোবাইল প্রোফাইল কার্ড */}
          <div className="flex flex-col gap-3 p-4 bg-white/[0.01] border border-white/[0.03] rounded-2xl mb-6">
            <div className="flex items-center gap-3">
              <Avatar
                color="secondary"
                size="sm"
                className="w-10 h-10 shrink-0"
                src={user?.image || undefined}
              >
                <Avatar.Fallback className="text-xs font-bold bg-purple-600 text-white">
                  {userInitialName}
                </Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col truncate">
                <span className="text-[14px] font-bold text-white tracking-wide truncate">
                  {userName}
                </span>
                <span className="text-[11px] text-gray-500 font-medium mt-0.5">
                  {userRole}
                </span>
              </div>
            </div>

            <div className="w-full bg-[#242121] border border-white/[0.04] rounded-lg py-1.5 px-2.5 flex items-center justify-center gap-1.5">
              <Sparkles size={11} className="text-yellow-500 fill-yellow-500" />
              <span className="text-[9px] font-black tracking-wider text-gray-300 uppercase">
                Premium Account
              </span>
            </div>
          </div>

          {/* নেভিগেশন লিংকসমূহ */}
          {renderNavLinks()}
        </div>

        {/* ফুটার কপিরাইট */}
        <div className="pl-4 pt-4 border-t border-white/[0.02]">
          <p className="text-[11px] text-gray-600 font-medium">
            © 2026 HireLoop Platform
          </p>
        </div>
      </div>

      {/* ─── DESKTOP SIDEBAR ─── */}
      <aside className="hidden md:flex fixed top-0 bottom-0 left-0 w-[260px] bg-[#141212] border-r border-white/[0.03] p-6 flex-col justify-between z-40 select-none">
        <div className="flex flex-col w-full">
          <Link href="/">
            <div className="flex items-center gap-2.5 mb-8 pl-1">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 rounded-xl flex items-center justify-center shadow-md shadow-purple-950/20">
                <svg
                  className="w-4 h-4 text-white transform -rotate-12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 22h20L12 2zm0 4.15L18.85 19H5.15L12 6.15z" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-white font-sans">
                HireLoop
              </span>
            </div>
          </Link>

          {/* ডেক্সটপ প্রোফাইল কার্ড */}
          <div className="flex flex-col gap-3 p-3 bg-white/[0.01] border border-white/[0.03] rounded-2xl mb-8">
            <div className="flex items-center gap-3">
              <Avatar
                color="secondary"
                className="w-10 h-10 text-xs font-bold border-purple-500/50 cursor-pointer shrink-0"
                size="sm"
              >
                {user?.image && (
                  <Avatar.Image alt={userName} src={user.image} />
                )}
                <Avatar.Fallback className="bg-purple-600 text-white font-bold">
                  {userInitialName}
                </Avatar.Fallback>
              </Avatar>

              <div className="flex flex-col truncate">
                <span className="text-[14px] font-bold text-white tracking-wide truncate">
                  {userName}
                </span>
                <span className="text-[11px] text-gray-500 font-medium mt-0.5">
                  {userRole}
                </span>
              </div>
            </div>

            <div className="w-full bg-[#242121] border border-white/[0.04] rounded-lg py-1.5 px-2.5 flex items-center justify-center gap-1.5">
              <Sparkles size={11} className="text-yellow-500 fill-yellow-500" />
              <span className="text-[9px] font-black tracking-wider text-gray-300 uppercase">
                Premium Account
              </span>
            </div>
          </div>

          {renderNavLinks()}
        </div>

        <div className="pl-4">
          <p className="text-[11px] text-gray-600 font-medium">
            © 2026 HireLoop Platform
          </p>
        </div>
      </aside>

      {/* ডেক্সটপ স্পেসার */}
      <div className="hidden md:block w-[260px] shrink-0" />
    </>
  );
}
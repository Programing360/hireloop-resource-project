"use client";

import React, { useState } from "react";
// HeroUI v3 এর কম্পোজেবল ড্রয়ার প্যাটার্ন এবং অবতার ইম্পোর্ট
import { Button, Drawer, Avatar } from "@heroui/react";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FileText,
  Settings,
  Menu,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  // authClient থেকে সেশন ডেটা রিড করা হচ্ছে
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // স্ক্রিনশটের নাম এবং রোল অনুসারে ব্যাকআপ সেটআপ
  const userName = user?.name || "Alex Sterling";
  const userRole = "Recruiter";

  // নামের প্রথম ২ লেটার জেনারেটর (যদি ইমেজ না থাকে)
  const userInitialName = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AS";

  // স্ক্রিনশট (image_239d18.png) হুবহু মেনু ডাটা সেট
  const navItems = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "My Company", label: "My Company", icon: Building2 },
    { id: "Manage Jobs", label: "Manage Jobs", icon: Briefcase },
    { id: "Applications", label: "Applications", icon: FileText },
    { id: "Settings", label: "Settings", icon: Settings },
  ];

  // মেনু আইটেম রেন্ডারার ফাংশন (যা ডেস্কটপ এবং মোবাইল ড্রয়ার উভয় জায়গায় ব্যবহার হবে)
  const renderNavLinks = () => (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            type="button"
            className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-[14px] font-medium tracking-wide transition-all duration-200 relative group select-none ${
              isActive
                ? "bg-[#242121] text-white font-semibold"
                : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]"
            }`}
          >
            {/* স্ক্রিনশটের ডান পাশের হোয়াইট অ্যাকসেন্ট ইন্ডিকেটর লাইন */}
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
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ─── ১. মোবাইল এবং ট্যাবলেট রেসপন্সিভ ট্রিগার বার ─── */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#141212] border-b border-white/[0.03] flex items-center px-4 justify-between z-40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">H</span>
          </div>
          <span className="text-base font-bold text-white tracking-tight">
            HireLoop
          </span>
        </div>

        {/* HeroUI v3 ড্রয়ার মেইন র‍্যাপার */}
        <Drawer>
          <Button
            variant="flat"
            isIconOnly
            className="bg-transparent text-gray-400 hover:text-white"
          >
            <Menu size={22} />
          </Button>
          <Drawer.Backdrop>
            <Drawer.Content
              placement="left"
              className="bg-[#141212] border-r border-white/[0.03] p-0 max-w-[280px]"
            >
              <Drawer.Dialog className="bg-[#141212] h-full flex flex-col justify-between p-6">
                <div>
                  <Link href="/">
                    <div className="flex items-center justify-between mb-8">
                      <Drawer.Heading className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
                          <span className="text-white font-black text-sm">
                            H
                          </span>
                        </div>
                        HireLoop
                      </Drawer.Heading>
                      <Drawer.CloseTrigger />
                    </div>
                  </Link>
                  {renderNavLinks()}
                </div>

                {/* মোবাইল ড্রয়ার বটম ইউজার বক্স */}
                <div className="pt-4 border-t border-white/[0.04] flex items-center gap-3">
                  <Avatar
                    color="secondary"
                    size="sm"
                    className="w-9 h-9"
                    src={user?.image || undefined}
                  >
                    <Avatar.Fallback className="text-xs font-bold">
                      {userInitialName}
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col truncate">
                    <span className="text-sm font-semibold text-white truncate">
                      {userName}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">
                      {userRole}
                    </span>
                  </div>
                </div>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>

      {/* ─── ২. ডেক্সটপ প্রিমিয়াম ফিক্সড সাইডবার (image_239d18.png হুবহু ডিজাইন) ─── */}
      <aside className="hidden md:flex fixed top-0 bottom-0 left-0 w-[260px] bg-[#141212] border-r border-white/[0.03] p-6 flex-col justify-between z-40 select-none">
        {/* টপ পার্ট: ব্র্যান্ড এবং ইউজার ইনফো */}
        <div className="flex flex-col w-full">
          {/* HireLoop লোগোTypography */}
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

          {/* স্ক্রিনশট অনুসারে ইউজার প্রোফাইল প্লাস প্রিমিয়াম ট্যাগ */}
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

            {/* PREMIUM ACCOUNT ব্যাজ (স্ক্রিনশটের মতো হুবহু ম্যাচড) */}
            <div className="w-full bg-[#242121] border border-white/[0.04] rounded-lg py-1.5 px-2.5 flex items-center justify-center gap-1.5">
              <Sparkles size={11} className="text-yellow-500 fill-yellow-500" />
              <span className="text-[9px] font-black tracking-wider text-gray-300 uppercase">
                Premium Account
              </span>
            </div>
          </div>

          {/* নেভিগেশন লিংকস */}
          {renderNavLinks()}
        </div>

        {/* বটম সেকশন ফুটনোট */}
        <div className="pl-4">
          <p className="text-[11px] text-gray-600 font-medium">
            © 2026 HireLoop Platform
          </p>
        </div>
      </aside>

      {/* সাইডবার বাদে মেইন ড্যাশবোর্ড কন্টেন্ট স্পেস মেকার প্যাডিং */}
      <div className="hidden md:block w-[260px] shrink-0" />
    </>
  );
}

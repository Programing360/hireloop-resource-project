"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { authClient } from "@/lib/auth-client";
import {
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { toast } from "react-toastify";

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, error } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Error signing out:");
    }
  };

  // ডাইনামিক মোবাইল মেনু আইটেম জেনারেটর
  const getMenuItems = () => {
    const baseItems = [
      { label: "Browse Jobs", href: "#", isButton: false },
      { label: "Company", href: "#", isButton: false },
      { label: "Pricing", href: "#", isButton: false },
    ];

    if (user) {
      return [
        ...baseItems,
        { label: "Dashboard", href: "/dashboard", isButton: false },
        { label: "Log Out", href: "#", isButton: true, isLogout: true },
      ];
    }

    return [
      ...baseItems,
      {
        label: "Sign In",
        href: "/auth/login",
        isButton: false,
        isSignIn: true,
      },
      { label: "Get Started", href: "#", isButton: true },
    ];
  };
  const userInitialName = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";


  const menuItems = getMenuItems();

  return (
    <Navbar
      isBordered={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="bg-[#141212]/90 backdrop-blur-md py-1 border-b border-white/[0.03] fixed top-0 left-0 right-0 z-50 container mx-auto bg-transparent"
    >
      {/* 1. LEFT SLOT: Mobile Toggle & Brand Logo */}
      <NavbarContent justify="start" className="gap-4">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-gray-300 hover:text-white transition-colors"
        />

        <NavbarBrand className="gap-2.5 cursor-pointer" as={Link} href="/">
          {/* Logo Graphic */}
          <div className="w-9 h-9 bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 rounded-xl flex items-center justify-center shadow-md shadow-purple-950/20">
            <svg
              className="w-5 h-5 text-white transform -rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 22h20L12 2zm0 4.15L18.85 19H5.15L12 6.15z" />
            </svg>
          </div>
          {/* Logo Typography */}
          <div className="flex flex-col font-sans tracking-tight select-none">
            <span className="text-[15px] font-bold text-white leading-tight">
              Programming
            </span>
            <span className="text-[13px] font-semibold text-gray-400 leading-none">
              Hero
            </span>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* 2. CENTER SLOT: Floating Navigation Capsule */}
      <NavbarContent
        className="hidden md:flex gap-6 items-center bg-[#201c1c]/70 px-6 py-2 rounded-full border border-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-sm"
        justify="center"
      >
        <NavbarItem>
          <Link
            href="#"
            className="text-gray-300 hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-200 hover:bg-purple-400/10 p-2 rounded-xl"
          >
            Browse Jobs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#"
            className="text-gray-300 hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-200 hover:bg-purple-400/10 p-2 rounded-xl"
          >
            Company
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#"
            className="text-gray-300 hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-200 hover:bg-purple-400/10 p-2 rounded-xl"
          >
            Pricing
          </Link>
        </NavbarItem>

        {/* Fine-line vertical divider */}
        <div className="h-3.5 w-[1px] bg-white/15 mx-1 self-center" />

        {/* CONDITION-1: IF USER IS NOT LOGGED IN */}
        {!user ? (
          <>
            <NavbarItem>
              <Link
                href="/auth/login"
                className="text-[#8465fc] hover:text-[#997fff] text-[13px] font-semibold tracking-wide transition-colors duration-200"
              >
                Sign In
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href="#"
                className="bg-[#fff5f5] text-[#141212] font-semibold px-5 py-2 rounded-xl hover:bg-white active:scale-95 transition-all duration-200 text-[13px] tracking-wide shadow-sm"
                variant="flat"
              >
                Get Started
              </Button>
            </NavbarItem>
          </>
        ) : (
          /* CONDITION-2: IF USER IS LOGGED IN (Premium Avatar Dropdown) */
          <NavbarItem>
            <Dropdown
              placement="bottom-end"
              className="bg-[#1c1919] border border-white/[0.06] text-white rounded-2xl shadow-xl"
            >
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform w-8 h-8 text-xs font-bold border-purple-500/80 cursor-pointer select-none text-white bg-purple-600 flex items-center justify-center"
                  color="secondary"
                  size="sm"
                >
                  {/* ৩. ইমেজ থাকলে ইমেজ দেখাবে */}
                  {user?.image ? (
                    <>
                      <Avatar.Image
                        alt={user?.name || "User Avatar"}
                        src={user.image}
                      />
                      <Avatar.Fallback className="text-white font-bold">
                        {userInitialName}
                      </Avatar.Fallback>
                    </>
                  ) : (
                    /* ৪. ইমেজ না থাকলে সরাসরি টেক্সট পাস করা হয়েছে, যা ওয়ান-ক্লিক ডিসপ্লে নিশ্চিত করবে */
                    <span className="text-white font-bold tracking-wider relative z-10">
                      {userInitialName}
                    </span>
                  )}
                </Avatar>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                className="p-1.5 gap-1"
              >
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2 opacity-100 cursor-default select-none hover:!bg-transparent"
                >
                  <p className="font-medium text-xs text-slate-400">
                    Signed in as
                  </p>
                  <p className="font-bold text-sm text-purple-300 truncate">
                    {user?.email}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="dashboard"
                  as={Link}
                  href="/dashboard"
                  startContent={
                    <LayoutDashboard size={15} className="text-slate-400" />
                  }
                  className="hover:!bg-white/5 rounded-xl text-slate-200"
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={
                    <Settings size={15} className="text-slate-400" />
                  }
                  className="hover:!bg-white/5 rounded-xl text-slate-200"
                >
                  My Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-pink-500 hover:!bg-pink-500/10 rounded-xl font-semibold"
                  startContent={<LogOut size={15} />}
                  onPress={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* 4. MOBILE DRAWER: Premium overlay navigation menu */}
      <NavbarMenu className="bg-[#141212]/98 backdrop-blur-lg pt-8 px-6 gap-4 border-t border-white/[0.02]">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            {item.isButton ? (
              <Button
                as={Link}
                href={item.href}
                onPress={item.isLogout ? handleLogout : undefined}
                className={`w-full font-bold py-6 rounded-xl text-base mt-4 shadow-md ${
                  item.isLogout
                    ? "bg-pink-600/10 border border-pink-500/20 text-pink-500 hover:bg-pink-600/20"
                    : "bg-[#fff5f5] text-[#141212]"
                }`}
              >
                {item.label}
              </Button>
            ) : (
              <Link
                className={`w-full py-2.5 text-lg font-medium border-b border-white/[0.03] ${
                  item.isSignIn
                    ? "text-[#8465fc] font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

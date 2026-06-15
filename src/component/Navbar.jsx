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
  LayoutDashboard,
  Settings,
  Sun,
  Moon,
  Menu,
} from "lucide-react";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setIsMenuOpen(false);
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Error signing out");
    }
  };

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="bg-[#141212]/80 backdrop-blur-md border-b border-white/[0.04] fixed top-0 left-0 right-0 z-50 text-white py-2"
    >
      {/* ─── 1. MOBILE ONLY: LEFT SLOT (MENU ICON) ─── */}
      {/* ফিক্স: লোগো মাঝে রাখতে হলে টগল আইকনকে আলাদা স্লটে বামে পুশ করতে হবে */}
      <NavbarContent justify="start" className="md:hidden max-w-fit">
        <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">
          {isMenuOpen ? (
            <RxCross2 onClick={() => setIsMenuOpen(false)} size={22} />
          ) : (
            <Menu onClick={() => setIsMenuOpen(true)} size={22} />
          )}
        </div>
      </NavbarContent>

      {/* ─── 2. CENTER BRAND SLOT (MOBILE: CENTER | DESKTOP: LEFT) ─── */}
      {/* ফিক্স: 'justify="center"' এবং 'md:justify="start"' ব্যবহার করে মোবাইল ও ডেক্সটপ এলাইনমেন্ট ঠিক করা হয়েছে */}
      <NavbarContent justify="center" className="md:justify-start">
        <NavbarBrand
          className="gap-2.5 cursor-pointer flex items-center justify-center md:justify-start"
          as={Link}
          href="/"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 rounded-xl flex items-center justify-center shadow-md shadow-purple-950/20 shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white transform -rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 22h20L12 2zm0 4.15L18.85 19H5.15L12 6.15z" />
            </svg>
          </div>
          <div className="flex flex-col font-sans tracking-tight select-none text-left">
            <span className="text-[14px] sm:text-[15px] font-bold text-white leading-tight">
              Programming
            </span>
            <span className="text-[11px] sm:text-[12px] font-semibold text-purple-400 leading-none">
              Hero
            </span>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* ─── 3. CENTER SLOT: Desktop Nav Capsule ─── */}
      <NavbarContent
        className="hidden md:flex gap-1.5 items-center bg-[#1c1a1a] px-3 py-1.5 rounded-full border border-white/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]"
        justify="center"
      >
        <NavbarItem>
          <Link
            href="/jobs"
            className="text-gray-300 hover:text-white text-[13px] font-medium tracking-wide transition-all duration-200 px-4 py-1.5 rounded-full hover:bg-white/[0.04]"
          >
            Browse Jobs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#"
            className="text-gray-300 hover:text-white text-[13px] font-medium tracking-wide transition-all duration-200 px-4 py-1.5 rounded-full hover:bg-white/[0.04]"
          >
            Company
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/pricing"
            className="text-gray-300 hover:text-white text-[13px] font-medium tracking-wide transition-all duration-200 px-4 py-1.5 rounded-full hover:bg-white/[0.04]"
          >
            Pricing
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* ─── 4. RIGHT SLOT: Actions / Theme / Profile Menu ─── */}
      <NavbarContent justify="end" className="gap-2 sm:gap-4 flex items-center max-w-fit md:max-w-none">
        {/* Desktop Theme Toggle */}
        <Button
          isIconOnly
          variant="light"
          className="text-gray-400 hover:text-white hover:bg-white/5 rounded-xl hidden md:flex min-w-9 w-9 h-9 active:scale-90 transition-all"
          onPress={toggleTheme}
        >
          {isDarkMode ? (
            <Sun size={18} className="text-amber-400" />
          ) : (
            <Moon size={18} />
          )}
        </Button>

        {!user ? (
          <>
            <NavbarItem className="hidden md:flex">
              <Link
                href="/auth/login"
                className="text-[#9d84ff] hover:text-[#b4a0ff] text-[13px] font-semibold tracking-wide transition-colors duration-200"
              >
                Sign In
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href="#"
                className="bg-white text-[#141212] font-bold px-4 sm:px-5 h-9 sm:h-10 rounded-xl hover:bg-gray-100 active:scale-95 transition-all duration-200 text-xs sm:text-[13px] tracking-wide"
              >
                Get Started
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Dropdown
              placement="bottom-end"
              className="bg-[#141212] border border-white/[0.06] text-white rounded-2xl shadow-2xl p-1"
            >
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform w-8 h-8 text-xs font-bold border-purple-500/80 cursor-pointer select-none text-white bg-purple-600 flex items-center justify-center rounded-full shrink-0"
                  size="sm"
                >
                  {user?.image ? (
                    <>
                      <Avatar.Image
                        alt={user.name || "User"}
                        src={user.image}
                      />
                      <Avatar.Fallback className="text-white font-bold">
                        {userInitialName}
                      </Avatar.Fallback>
                    </>
                  ) : (
                    <span className="text-white font-bold tracking-wider">
                      {userInitialName}
                    </span>
                  )}
                </Avatar>
              </DropdownTrigger>

              <DropdownMenu aria-label="Profile Actions" className="gap-1 p-1">
                <DropdownItem
                  key="profile"
                  className="h-12 opacity-100 cursor-default hover:!bg-transparent border-b border-white/[0.04] mb-1"
                >
                  <p className="text-[10px] text-gray-500 font-medium">
                    Signed in as
                  </p>
                  <p className="font-bold text-xs text-purple-400 truncate">
                    {user?.email}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="dashboard"
                  as={Link}
                  href="/dashboard"
                  startContent={
                    <LayoutDashboard size={14} className="text-gray-400" />
                  }
                  className="hover:bg-white/[0.04] rounded-xl text-gray-200 text-xs py-2"
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={
                    <Settings size={14} className="text-gray-400" />
                  }
                  className="hover:bg-white/[0.04] rounded-xl text-gray-200 text-xs py-2"
                >
                  My Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="text-rose-500 hover:bg-rose-500/10 rounded-xl font-bold text-xs py-2"
                  startContent={<LogOut size={14} />}
                  onPress={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* ─── 5. MOBILE MENU DRAWER ─── */}
      <NavbarMenu className="bg-[#141212]/95 backdrop-blur-xl pt-6 px-6 gap-3 border-t border-white/[0.03] fixed inset-0 z-40 pt-16">
        {/* Mobile Theme Toggle */}
        <div className="flex items-center justify-between py-2  border-b border-white/[0.04] mb-2">
          <span className="text-sm font-medium text-gray-400">
            Switch Theme
          </span>
          <Button
            isIconOnly
            variant="flat"
            className="bg-white/5 text-gray-300 rounded-xl w-10 h-10 active:scale-90 transition-all"
            onPress={toggleTheme}
          >
            {isDarkMode ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} />
            )}
          </Button>
        </div>

        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            {item.isButton ? (
              <Button
                as={Link}
                href={item.href}
                onClick={
                  item.isLogout ? handleLogout : () => setIsMenuOpen(false)
                }
                className={`w-full font-bold py-5 rounded-xl text-sm mt-3 ${
                  item.isLogout
                    ? "bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500/20"
                    : "bg-white text-[#141212]"
                }`}
              >
                {item.label}
              </Button>
            ) : (
              <Link
                className={`w-full py-3 text-base font-medium border-b border-white/[0.02] block ${
                  item.isSignIn
                    ? "text-[#9d84ff] font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
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
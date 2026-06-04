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

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Browse Jobs", href: "#", isButton: false },
    { label: "Company", href: "#", isButton: false },
    { label: "Pricing", href: "#", isButton: false },
    { label: "Sign In", href: "#", isButton: false, isSignIn: true },
    { label: "Get Started", href: "#", isButton: true },
  ];

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

        <NavbarBrand className="gap-2.5 cursor-pointer">
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

      {/* 2. CENTER SLOT: Floating Navigation Capsule (Hidden on mobile/tablet) */}
      <NavbarContent
        className="hidden md:flex gap-6 items-center bg-[#201c1c]/70 px-6 py-2 rounded-full border border-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-sm"
        justify="center"
      >
        <NavbarItem>
          <Link
            href="#"
            className="text-gray-300 hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-200 hover:bg-purple-400/30 p-2 rounded-xl"
          >
            Browse Jobs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#"
            className="text-gray-300 hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-200 hover:bg-purple-400/30 p-2 rounded-xl"
          >
            Company
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#"
            className="text-gray-300 hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-200 hover:bg-purple-400/30 p-2 rounded-xl"
          >
            Pricing
          </Link>
        </NavbarItem>

        {/* Fine-line vertical divider from image */}
        <div className="h-3.5 w-[1px] bg-white/15 mx-1 self-center" />

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
      </NavbarContent>

      {/* 3. RIGHT SLOT: Action Call to Button (Hidden on mobile/tablet) */}
      

      {/* 4. MOBILE DRAWER: Premium overlay navigation menu */}
      <NavbarMenu className="bg-[#141212]/98 backdrop-blur-lg pt-8 px-6 gap-4 border-t border-white/[0.02]">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            {item.isButton ? (
              <Button
                as={Link}
                href={item.href}
                className="w-full bg-[#fff5f5] text-[#141212] font-bold py-6 rounded-xl text-base mt-4 shadow-md"
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

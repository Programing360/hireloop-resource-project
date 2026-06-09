"use client";

import React, { useState } from "react";
// Hero UI v3 Imports exactly as per official documentation
import {
  Form,
  TextField,
  Input,
  Label,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";

// Gravity UI Icons
import {
  BriefcaseFill,
  CloudArrowUpIn,
  MapPin,
  Xmark,
} from "@gravity-ui/icons";
import { jobsData } from "@/lib/actions/jobs";
import Image from "next/image";

export default function JobPostForm({ onClose }) {
  const [fileInfo, setFileInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const allData = {
      ...data,
      image: fileInfo,
      status: "pending",
    };

    const result = await jobsData(allData);

    console.log("Submitted Job Details:", result);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Use FormData for ImgBB API
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Replace 'YOUR_IMGBB_API_KEY' with your actual key
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (result.success) {
        // This is the URL you send to your backend
        const imageUrl = result.data.url;
        setFileInfo(imageUrl);
        console.log("Image uploaded to ImgBB:", imageUrl);
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading to ImgBB:", error);
    }
  };

  return (
    <div className="dark bg-[#0a0a0a] min-h-screen flex items-center justify-center p-4">
      {/* Outer Card block engineered to resemble the frame in Screenshot 2026-06-05 110617.png */}
      <div className="w-full max-w-[1000px] bg-[#121212] border border-[#262626] rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header Block */}
        <div className="flex justify-between items-start px-8 pt-8 pb-5 relative">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-[#f5f5f5] tracking-tight">
              Update Company Profile
            </h2>
            <p className="text-xs text-[#a3a3a3]">
              Enter the professional details to start hiring on HireLoop.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#a3a3a3] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#1a1a1a]"
          >
            <Xmark className="w-4 h-4" />
          </button>
        </div>

        {/* Minimal separation line mirroring screenshot layout */}
        <div className="h-[1px] bg-[#262626] mx-8" />

        {/* Main Form Context (Hero UI v3 Form) */}
        <Form
          validationBehavior="native"
          onSubmit={handleSubmit}
          className="px-8 py-6 flex flex-col gap-5"
        >
          {/* Row 1: Job Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <TextField className="w-full" name="name" isRequired>
              <Label className="text-sm font-medium text-[#d4d4d4] block mb-1.5">
                Company Name
              </Label>
              <div className="relative flex items-center">
                <Input
                  className="w-full h-11 px-3.5 bg-[#1a1a1a] border border-[#262626] hover:border-[#404040] focus:border-[#737373] rounded-lg text-sm text-white placeholder-[#525252] outline-none transition-all"
                  placeholder="Company Name"
                />
              </div>
            </TextField>

            <div className="w-full">
              <Select
                className="w-full"
                placeholder="Select category"
                name="category"
                isRequired
              >
                <Label className="text-sm font-medium text-[#d4d4d4] block mb-1.5">
                  Industry / Category
                </Label>
                <Select.Trigger className="w-full h-11 px-3.5 bg-[#1a1a1a] border border-[#262626] hover:border-[#404040] rounded-lg text-sm text-left text-white flex items-center justify-between outline-none transition-all">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#121212] border border-[#262626] rounded-lg shadow-xl p-1 text-white">
                  <ListBox className="bg-[#121212]">
                    <ListBox.Item
                      id="tech"
                      textValue="Technology"
                      className="p-2 text-sm rounded hover:bg-[#1a1a1a] cursor-pointer"
                    >
                      Technology
                    </ListBox.Item>
                    <ListBox.Item
                      id="design"
                      textValue="Design"
                      className="p-2 text-sm rounded hover:bg-[#1a1a1a] cursor-pointer"
                    >
                      Design
                    </ListBox.Item>
                    <ListBox.Item
                      id="marketing"
                      textValue="Marketing"
                      className="p-2 text-sm rounded hover:bg-[#1a1a1a] cursor-pointer"
                    >
                      Marketing
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>

          {/* Row 2: Work Mode & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <div className="w-full">
              <Select
                className="w-full"
                placeholder="Select mode"
                name="jobType"
                isRequired
              >
                <Label className="text-sm font-medium text-[#d4d4d4] block mb-1.5">
                  Job Type / Mode
                </Label>
                <Select.Trigger className="w-full h-11 px-3.5 bg-[#1a1a1a] border border-[#262626] hover:border-[#404040] rounded-lg text-sm text-left text-white flex items-center justify-between outline-none transition-all">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#121212] border border-[#262626] rounded-lg shadow-xl p-1 text-white">
                  <ListBox className="bg-[#121212]">
                    <ListBox.Item
                      id="fulltime"
                      textValue="Full-time"
                      className="p-2 text-sm rounded hover:bg-[#1a1a1a] cursor-pointer"
                    >
                      Full-time
                    </ListBox.Item>
                    <ListBox.Item
                      id="parttime"
                      textValue="Part-time"
                      className="p-2 text-sm rounded hover:bg-[#1a1a1a] cursor-pointer"
                    >
                      Part-time
                    </ListBox.Item>
                    <ListBox.Item
                      id="remote"
                      textValue="Remote"
                      className="p-2 text-sm rounded hover:bg-[#1a1a1a] cursor-pointer"
                    >
                      Remote
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <TextField className="w-full" name="location" isRequired>
              <Label className="text-sm font-medium text-[#d4d4d4] block mb-1.5">
                Location
              </Label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-[#525252]">
                  <MapPin className="w-4 h-4" />
                </span>
                <Input
                  className="w-full h-11 pl-10 pr-3.5 bg-[#1a1a1a] border border-[#262626] hover:border-[#404040] focus:border-[#737373] rounded-lg text-sm text-white placeholder-[#525252] outline-none transition-all"
                  placeholder="City, Country"
                />
              </div>
            </TextField>
          </div>

          {/* Row 2.5: Company Details (New Fields) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <TextField className="w-full" name="employeeCount">
              <Label className="text-sm font-medium text-[#d4d4d4] block mb-1.5">
                Employee Count
              </Label>

              <select
                name="employeeCount"
                className="w-full h-11 px-3.5 bg-[#1a1a1a] border border-[#262626] hover:border-[#404040] focus:border-[#737373] rounded-lg text-sm text-white outline-none transition-all"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Employee Count
                </option>
                <option value="1-10">1 - 10</option>
                <option value="11-50">11 - 50</option>
                <option value="51-100">51 - 100</option>
                <option value="101-500">101 - 500</option>
                <option value="501-1000">501 - 1000</option>
                <option value="1000+">1000+</option>
              </select>
            </TextField>

            <TextField className="w-full" name="websiteUrl">
              <Label className="text-sm font-medium text-[#d4d4d4] block mb-1.5">
                Website URL
              </Label>
              <Input
                className="w-full h-11 px-3.5 bg-[#1a1a1a] border border-[#262626] hover:border-[#404040] focus:border-[#737373] rounded-lg text-sm text-white placeholder-[#525252] outline-none transition-all"
                placeholder="https://company.com"
                type="url"
              />
            </TextField>
          </div>

          {/* Row 3: Salary Range & Company Document Attachment */}
          {/* Row 3: Salary Range & Company Logo Attachment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            {/* Salary Range with Dropdown */}
            <div className="flex-1 gap-1.5">
              <Label className="text-sm font-medium text-[#d4d4d4] block mb-1.5">
                Salary Range
              </Label>
              {/* মোবাইল স্ক্রিনে flex-col (নিচে নিচে) এবং মাঝারি স্ক্রিন থেকে flex-row (পাশাপাশি) হবে */}
              <div className="w-full flex flex-col md:flex-row gap-2 md:gap-1.5">
                {/* Min Salary Input */}
                <div className="flex gap-2">
                  <Input
                    name="minSalary"
                    className="h-11 p-1 px-2 w-full bg-[#1a1a1a] border border-[#262626] rounded-lg text-sm text-white focus:border-[#737373]"
                    placeholder="Min"
                  />

                  {/* Max Salary Input */}
                  <Input
                    name="maxSalary"
                    className="h-11 p-1 px-2 w-full bg-[#1a1a1a] border-[#262626] rounded-lg text-sm text-white focus:border-[#737373]"
                    placeholder="Max"
                  />
                </div>

                {/* Currency/Frequency Select */}
                <Select name="salaryType" aria-label="Salary Type">
                  <Select.Trigger className="h-11 w-full md:w-[100px] px-3 bg-[#1a1a1a] border border-[#262626] rounded-lg text-sm text-white flex items-center justify-between">
                    <Select.Value placeholder="USD" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#121212] text-white border border-[#262626] rounded-lg p-1 z-50">
                    <ListBox>
                      <ListBox.Item
                        id="usd"
                        className="p-2 text-sm rounded cursor-pointer hover:bg-[#1f1f1f]"
                      >
                        USD/yr
                      </ListBox.Item>
                      <ListBox.Item
                        id="eur"
                        className="p-2 text-sm rounded cursor-pointer hover:bg-[#1f1f1f]"
                      >
                        EUR/yr
                      </ListBox.Item>
                      <ListBox.Item
                        id="monthly"
                        className="p-2 text-sm rounded cursor-pointer hover:bg-[#1f1f1f]"
                      >
                        USD/mo
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Company Logo Upload Block */}
            <div className="w-full flex-1">
              <span className="text-sm font-medium text-[#d4d4d4] mb-1.5">
                Company Logo
              </span>
              <label className="flex items-center gap-3 bg-[#1a1a1a] border border-dashed border-[#404040] hover:border-[#737373] h-11 px-3.5 rounded-lg cursor-pointer transition-colors group">
                <div className="flex-shrink-0">
                  {fileInfo ? (
                    <Image
                      src={fileInfo}
                      alt="Logo"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded object-cover border border-[#262626]"
                    />
                  ) : (
                    <div className="bg-[#262626] p-1.5 rounded text-[#a3a3a3] group-hover:text-white transition-colors">
                      <CloudArrowUpIn className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-xs font-medium text-white truncate">
                    {fileInfo ? "Logo uploaded" : "Upload Logo"}
                  </span>
                </div>
                <input
                  type="file"
                  name="attachment"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Row 4: Job Description Custom Area */}
          <div className="w-full flex flex-col">
            <Label className="text-sm font-medium text-[#d4d4d4] block mb-1.5">
              Brief Description
            </Label>
            <TextArea
              name="description"
              required
              className="w-full min-h-[110px] p-3.5 bg-[#1a1a1a] border border-[#262626] hover:border-[#404040] focus:border-[#737373] rounded-lg text-sm text-white placeholder-[#525252] outline-none transition-all resize-none"
              placeholder="Tell us about your company's mission and culture..."
            />
          </div>

          {/* Bottom Interactive Block Layout */}
          <div className="h-[1px] bg-[#262626] mt-4" />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="h-10 px-5 rounded-lg bg-transparent border border-[#262626] text-sm font-medium text-white hover:bg-[#1a1a1a] transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 px-6 rounded-lg bg-white text-black font-semibold text-sm hover:bg-[#e5e5e5] transition-all"
            >
              Post Job
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

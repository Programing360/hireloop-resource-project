'use client';

import React, { useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";

export default function CompanyEditForm({ initialData, onClose }) {
  // পুরানো কোম্পানির ডেটা স্টেট-এ প্রি-ফিল (Pre-fill) করে দেওয়া হয়েছে
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    location: initialData?.location || "",
    employeeCount: initialData?.employeeCount || "",
    websiteUrl: initialData?.websiteUrl || "",
    description: initialData?.description || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে আপনার কোম্পানির আপডেট API কল বা হ্যান্ডলার বসবে
    console.log("Updated Company Data:", formData);
    onClose(); // সফলভাবে আপডেট শেষে মোডাল ক্লোজ হবে
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      
      {/* রো ১: কোম্পানির নাম ও ক্যাটাগরি */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField className="w-full flex flex-col gap-1.5" name="name">
          <Label className="text-xs font-semibold text-gray-400">Company Name</Label>
          <Input 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Acme Corp" 
            className="bg-[#1c1a1a] border border-[#262626] rounded-xl h-11 px-3 text-sm text-white focus:border-white/20 outline-none w-full"
          />
        </TextField>

        <TextField className="w-full flex flex-col gap-1.5" name="category">
          <Label className="text-xs font-semibold text-gray-400">Industry / Category</Label>
          <Input 
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g. Technology" 
            className="bg-[#1c1a1a] border border-[#262626] rounded-xl h-11 px-3 text-sm text-white focus:border-white/20 outline-none w-full"
          />
        </TextField>
      </div>

      {/* রো ২: ওয়েবসাইট ও লোকেশন */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField className="w-full flex flex-col gap-1.5" name="websiteUrl">
          <Label className="text-xs font-semibold text-gray-400">Website URL</Label>
          <Input 
            value={formData.websiteUrl}
            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
            placeholder="www.company.com" 
            className="bg-[#1c1a1a] border border-[#262626] rounded-xl h-11 px-3 text-sm text-white focus:border-white/20 outline-none w-full"
          />
        </TextField>

        <TextField className="w-full flex flex-col gap-1.5" name="location">
          <Label className="text-xs font-semibold text-gray-400">Location</Label>
          <Input 
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="City, Country" 
            className="bg-[#1c1a1a] border border-[#262626] rounded-xl h-11 px-3 text-sm text-white focus:border-white/20 outline-none w-full"
          />
        </TextField>
      </div>

      {/* রো ৩: কর্মী সংখ্যা */}
      <TextField className="w-full flex flex-col gap-1.5" name="employeeCount">
        <Label className="text-xs font-semibold text-gray-400">Employee Range</Label>
        <Input 
          value={formData.employeeCount}
          onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
          placeholder="e.g. 1-10 employees" 
          className="bg-[#1c1a1a] border border-[#262626] rounded-xl h-11 px-3 text-sm text-white focus:border-white/20 outline-none w-full"
        />
      </TextField>

      {/* রো ৪: ডেসক্রিপশন বক্স */}
      <TextField className="w-full flex flex-col gap-1.5" name="description">
        <Label className="text-xs font-semibold text-gray-400">Brief Description</Label>
        <textarea 
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Tell us about your company's mission and culture..." 
          rows={4}
          className="bg-[#1c1a1a] border border-[#262626] rounded-xl p-3 text-sm text-white focus:border-white/20 outline-none w-full resize-none"
        />
      </TextField>

      {/* অ্যাকশন বাটন ফুটার */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262626] mt-4">
        <Button
          onPress={onClose}
          variant="secondary"
          className="bg-transparent border border-white/10 text-gray-300 font-medium px-5 rounded-xl h-10 text-xs hover:bg-white/5"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-white text-black font-bold px-5 rounded-xl h-10 text-xs hover:bg-gray-200 transition-colors"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
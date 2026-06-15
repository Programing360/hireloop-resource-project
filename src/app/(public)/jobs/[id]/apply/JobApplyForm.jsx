"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Fieldset,
  Select,
  Label,
  Description,
  ListBox,
  TextArea,
  Input,
  Button,
  Checkbox,
} from "@heroui/react";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

export default function JobApplyForm({ companyName = "TechNova" }) {

    

  // React Hook Form ইনিশিয়ালাইজেশন
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      authorized: true,
      relocate: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted Successfully:", data);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white p-4 md:p-8 flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-3xl bg-[#121212] border border-[#262626] rounded-2xl p-6 md:p-10 shadow-2xl mt-20"
      >
        <div className="mb-8 border-b border-white/[0.04] pb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Apply for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {companyName}
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1.5 font-normal">
            Please provide your verified professional matrix. Recruiters review
            these details directly.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
          {/* ─── SECTION 1: BASIC INFORMATION ─── */}
          <Fieldset className="border-none p-0 m-0 space-y-4">
            <Fieldset.Legend className="text-sm font-bold tracking-wider text-purple-400 uppercase mb-2">
              Basic Information
            </Fieldset.Legend>

            <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <Input
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  label="Full Name"
                  placeholder="John Doe"
                  variant="bordered"
                  className="w-full"
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-500 font-medium pl-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                  label="Email Address"
                  placeholder="john@example.com"
                  type="email"
                  variant="bordered"
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-500 font-medium pl-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Input
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  label="Phone Number"
                  placeholder="+880 1712-XXXXXX"
                  variant="bordered"
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-500 font-medium pl-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <Input
                {...register("location", {
                  required: "Current location is required",
                })}
                label="Current Location"
                placeholder="Dhaka, Bangladesh"
                variant="bordered"
              />
            </Fieldset.Group>
          </Fieldset>

          {/* ─── SECTION 2: PROFESSIONAL INFORMATION ─── */}
          <Fieldset className="border-none p-0 m-0 space-y-4">
            <Fieldset.Legend className="text-sm font-bold tracking-wider text-purple-400 uppercase mb-2">
              Professional Information
            </Fieldset.Legend>

            <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                {...register("jobTitle")}
                label="Current Job Title (Optional)"
                placeholder="Software Engineer"
                variant="bordered"
              />

              {/* HEROUI SPECIFIC SELECT (NO STARTCONTENT) */}
              <Controller
                name="experience"
                control={control}
                rules={{ required: "Experience tier is required" }}
                render={({ field }) => (
                  <div className="flex flex-col gap-1.5">
                    <Select
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys)[0])
                      }
                      className="w-full"
                    >
                      <Label className="text-xs text-gray-400 font-medium mb-1 block">
                        Years of Experience
                      </Label>
                      <Select.Trigger className="w-full bg-transparent border border-[#262626] rounded-xl text-sm min-h-10 text-left px-3 flex items-center justify-between hover:border-white/10 transition-colors">
                        <Select.Value
                          className="text-gray-400"
                          placeholder="Select experience range"
                        />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Description className="text-[10px] text-gray-500 mt-1 block">
                        Select your total track years
                      </Description>

                      <Select.Popover className="bg-[#121212] border border-[#262626] text-white rounded-xl shadow-2xl mt-1">
                        <ListBox className="p-1">
                          <ListBox.Item
                            key="entry"
                            className="hover:bg-white/5 rounded-lg p-2 text-xs transition-colors cursor-pointer"
                          >
                            <Label className="font-semibold block cursor-pointer">
                              Entry Level
                            </Label>
                            <Description className="text-[10px] text-gray-400 block">
                              0 - 1 Year of experience
                            </Description>
                          </ListBox.Item>
                          <ListBox.Item
                            key="mid"
                            className="hover:bg-white/5 rounded-lg p-2 text-xs transition-colors cursor-pointer"
                          >
                            <Label className="font-semibold block cursor-pointer">
                              Mid Level
                            </Label>
                            <Description className="text-[10px] text-gray-400 block">
                              2 - 5 Years of experience
                            </Description>
                          </ListBox.Item>
                          <ListBox.Item
                            key="senior"
                            className="hover:bg-white/5 rounded-lg p-2 text-xs transition-colors cursor-pointer"
                          >
                            <Label className="font-semibold block cursor-pointer">
                              Senior Level
                            </Label>
                            <Description className="text-[10px] text-gray-400 block">
                              5+ Years of experience
                            </Description>
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                    {errors.experience && (
                      <p className="text-[11px] text-rose-500 font-medium pl-1">
                        {errors.experience.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <div className="md:col-span-2">
                <Input
                  {...register("skills", { required: "Skills are required" })}
                  label="Skills"
                  placeholder="React, Next.js, Node.js, Tailwind CSS (Comma Separated)"
                  variant="bordered"
                />
                {errors.skills && (
                  <p className="text-[11px] text-rose-500 font-medium pl-1">
                    {errors.skills.message}
                  </p>
                )}
              </div>

              <Input
                {...register("portfolio")}
                label="Portfolio Website (Optional)"
                placeholder="https://myportfolio.com"
                variant="bordered"
              />
              <Input
                {...register("linkedin")}
                label="LinkedIn Profile (Optional)"
                placeholder="https://linkedin.com/in/username"
                variant="bordered"
              />
              <div className="md:col-span-2">
                <Input
                  {...register("github")}
                  label="GitHub Profile"
                  placeholder="https://github.com/username"
                  variant="bordered"
                />
              </div>
            </Fieldset.Group>
          </Fieldset>

          {/* ─── SECTION 3: DOCUMENTS UPLOAD ─── */}
          <Fieldset className="border-none p-0 m-0 space-y-4">
            <Fieldset.Legend className="text-sm font-bold tracking-wider text-purple-400 uppercase mb-2">
              Documents
            </Fieldset.Legend>

            <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-400 font-medium">
                  Resume/CV (Required)
                </span>
                <label className="border border-dashed border-[#262626] hover:border-white/20 transition-colors rounded-xl p-4 flex items-center justify-center gap-3 cursor-pointer bg-white/[0.01]">
                  <UploadCloud size={18} className="text-purple-400" />
                  <span className="text-xs font-semibold text-gray-300">
                    Upload PDF, DOCX (Max 5MB)
                  </span>
                  <input
                    type="file"
                    required
                    className="hidden"
                    accept=".pdf,.docx"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-400 font-medium">
                  Cover Letter (Optional)
                </span>
                <label className="border border-dashed border-[#262626] hover:border-white/20 transition-colors rounded-xl p-4 flex items-center justify-center gap-3 cursor-pointer bg-white/[0.01]">
                  <UploadCloud size={18} className="text-gray-500" />
                  <span className="text-xs font-medium text-gray-400">
                    Upload Document / Pitch
                  </span>
                  <input type="file" className="hidden" accept=".pdf,.docx" />
                </label>
              </div>
            </Fieldset.Group>
          </Fieldset>

          {/* ─── SECTION 4: APPLICATION QUESTIONS ─── */}
          <Fieldset className="border-none p-0 m-0 space-y-4">
            <Fieldset.Legend className="text-sm font-bold tracking-wider text-purple-400 uppercase mb-2">
              Application-Specific Questions
            </Fieldset.Legend>

            <Fieldset.Group className="space-y-5">
              {/* EXACT HEROUI TEXTAREA COMPONENT DEFINITION */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-400 font-medium mb-1 block">
                  Why are you interested in this position?
                </span>
                <TextArea
                  {...register("interestStatement", {
                    required: "Please express your motivation",
                  })}
                  aria-label="Why are you interested in this position?"
                  className="w-full h-32 bg-transparent border border-[#262626] focus:border-white/20 rounded-xl p-3 text-sm text-white outline-none resize-none transition-all"
                  placeholder="Express your core interest, alignment with vision, or skills mapping..."
                />
                {errors.interestStatement && (
                  <p className="text-[11px] text-rose-500 font-medium pl-1">
                    {errors.interestStatement.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  {...register("expectedSalary", {
                    required: "Expected salary is required",
                  })}
                  label="Expected Salary (Monthly / Yearly)"
                  placeholder="e.g. 50,000 BDT or $4,000 USD"
                  variant="bordered"
                />
                <Input
                  {...register("startDate", {
                    required: "Start date is required",
                  })}
                  label="Available Start Date"
                  type="date"
                  variant="bordered"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Controller
                  name="authorized"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      isSelected={field.value}
                      onValueChange={field.onChange}
                      className="text-xs font-medium text-gray-300"
                    >
                      I am legally authorized to work in this specified
                      region/location.
                    </Checkbox>
                  )}
                />
                <Controller
                  name="relocate"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      isSelected={field.value}
                      onValueChange={field.onChange}
                      className="text-xs font-medium text-gray-300"
                    >
                      I am willing to relocate if the company requires it.
                      (Optional)
                    </Checkbox>
                  )}
                />
              </div>
            </Fieldset.Group>

            {/* HEROUI FIELDSET ACTIONS */}
            <Fieldset.Actions className="pt-6 border-t border-[#262626] mt-6">
              <Button
                type="submit"
                className="w-full bg-white text-black font-bold h-12 rounded-xl text-sm transition-all hover:bg-gray-200 active:scale-[0.99] shadow-lg shadow-white/5"
              >
                Submit Application
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </form>
      </motion.div>
    </div>
  );
}

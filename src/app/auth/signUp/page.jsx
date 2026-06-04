"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
// HeroUI v3 এর নির্দিষ্ট প্যাটার্ন অনুযায়ী ইমপোর্ট করা হয়েছে
import {
  TextField,
  Label,
  Input,
  FieldError,
  Description,
  Form,
  Button,
  Link,
  Radio,
  RadioGroup,
} from "@heroui/react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import animationData from "../../../../public/images/animate.svg";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    

    const { data, error } = await authClient.signUp.email({
      name: user.fullName,
      email: user.email,
      password: user.password,
      role: user.role,
      callbackURL: "/auth/login",
    });
    if(data){
          toast.success("Sign Up Successful!")
         }else{
          toast.error(`${error.message}` || "Sign Up Failed! Please check your credentials.")
         }
    console.log(data, error, user);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0b0612] text-white flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* ─── BACKGROUND LAYERS ─── */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808015_1px,transparent_1px)] bg-[size:45px_100%] md:bg-[size:65px_100%]"></div>
      </div>

      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ─── MAIN 2-SECTION SPLIT LAYOUT ─── */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* ========================================================
            SECTION 1: LEFT SIDE - SIGN UP FORM CARD (5 Columns)
            ======================================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 w-full flex flex-col justify-center"
        >
          <div className="w-full bg-[#140f24]/40 border border-white/[0.04] backdrop-blur-2xl rounded-[2.5rem] p-6 sm:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative">
            <div className="w-12 h-[3px] bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full mb-6"></div>

            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
                Create an Account
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Join HireLoop to discover new tech horizons
              </p>
            </motion.div>

            <Form className="space-y-4" onSubmit={onSubmit}>
              {/* ১. ফুল নেম ফিল্ড (নতুন যুক্ত করা হয়েছে) */}
              <motion.div variants={itemVariants} className="relative group">
                <TextField
                  isRequired
                  name="fullName"
                  type="text"
                  className="flex flex-col"
                  validate={(value) =>
                    !value ? "Please enter your name" : null
                  }
                >
                  <Label className="text-slate-300 font-bold text-xs tracking-wide mb-1 select-none">
                    Full Name
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 rounded-xl text-sm pl-10 pr-4 text-slate-200 placeholder:text-slate-600 bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] focus:outline-none focus:border-purple-500/80 transition-all duration-300"
                    />
                    <User
                      size={15}
                      className="text-slate-500 shrink-0 absolute left-3 top-1/2 -translate-y-1/2 select-none"
                    />
                  </div>
                  <FieldError className="text-xs text-pink-500 font-medium mt-1 pl-1" />
                </TextField>
              </motion.div>

              {/* ২. ইমেইল ফিল্ড */}
              <motion.div variants={itemVariants} className="relative group">
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  className="flex flex-col"
                  validate={(value) => {
                    if (!value) return "Please enter your email";
                    if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ) {
                      return "Please enter a valid email address";
                    }
                    return null;
                  }}
                >
                  <Label className="text-slate-300 font-bold text-xs tracking-wide mb-1 select-none">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 rounded-xl text-sm pl-10 pr-4 text-slate-200 placeholder:text-slate-600 bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] focus:outline-none focus:border-purple-500/80 transition-all duration-300"
                    />
                    <Mail
                      size={15}
                      className="text-slate-500 shrink-0 absolute left-3 top-1/2 -translate-y-1/2 select-none"
                    />
                  </div>
                  <FieldError className="text-xs text-pink-500 font-medium mt-1 pl-1" />
                </TextField>
              </motion.div>

              {/* ৩. পাসওয়ার্ড ফিল্ড */}
              <motion.div variants={itemVariants} className="relative group">
                <TextField
                  isRequired
                  name="password"
                  minLength={8}
                  className="flex flex-col"
                  validate={(value) => {
                    if (!value) return "Please enter your password";
                    if (value.length < 8)
                      return "Password must be at least 8 characters";
                    return null;
                  }}
                >
                  <Label className="text-slate-300 font-bold text-xs tracking-wide mb-1 select-none">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={isVisible ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 rounded-xl text-sm pl-10 pr-10 text-slate-200 placeholder:text-slate-600 bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] focus:outline-none focus:border-purple-500/80 transition-all duration-300"
                    />
                    <Lock
                      size={15}
                      className="text-slate-500 shrink-0 absolute left-3 top-1/2 -translate-y-1/2 select-none"
                    />

                    <button
                      className="focus:outline-none absolute right-3 top-1/2 -translate-y-1/2 select-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeOff
                          size={15}
                          className="text-slate-500 hover:text-slate-300 transition-colors"
                        />
                      ) : (
                        <Eye
                          size={15}
                          className="text-slate-500 hover:text-slate-300 transition-colors"
                        />
                      )}
                    </button>
                  </div>
                  <FieldError className="text-xs text-pink-500 font-medium mt-1 pl-1" />
                </TextField>
              </motion.div>

              {/* ৪. সাবস্ক্রিপশন প্ল্যান (রেডিও অপশন - নতুন যুক্ত করা হয়েছে) */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-1.5"
              >
                <Label className="text-slate-300 font-bold text-xs tracking-wide select-none">
                  Subscription Plan
                </Label>
                <RadioGroup
                  defaultValue="seeker"
                  name="role"
                  orientation="horizontal"
                  className="flex gap-3"
                  classNames={{
                    wrapper: "gap-3 flex-row w-full",
                  }}
                >
                  {/* Job Seeker Option */}
                  <Radio
                    value="seeker"
                    className="flex-1 p-3 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] data-[selected=true]:border-purple-500 data-[selected=true]:bg-purple-500/5 transition-all cursor-pointer m-0"
                  >
                    <div className="flex gap-2 items-start">
                      <Radio.Control>
                        <Radio.Indicator className="bg-purple-600" />
                      </Radio.Control>
                      <Radio.Content>
                        <Label className="text-xs font-bold text-slate-200 cursor-pointer block leading-tight">
                          Job Seeker
                        </Label>
                        <Description className="text-[10px] text-slate-500 block mt-0.5 leading-none">
                          Find your next role
                        </Description>
                      </Radio.Content>
                    </div>
                  </Radio>

                  {/* Recruiter Option */}
                  <Radio
                    value="recruiter"
                    className="flex-1 p-3 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] data-[selected=true]:border-purple-500 data-[selected=true]:bg-purple-500/5 transition-all cursor-pointer m-0"
                  >
                    <div className="flex gap-2 items-start">
                      <Radio.Control>
                        <Radio.Indicator className="bg-purple-600" />
                      </Radio.Control>
                      <Radio.Content>
                        <Label className="text-xs font-bold text-slate-200 cursor-pointer block leading-tight">
                          Recruiter
                        </Label>
                        <Description className="text-[10px] text-slate-500 block mt-0.5 leading-none">
                          Hire world-class talent
                        </Description>
                      </Radio.Content>
                    </div>
                  </Radio>
                </RadioGroup>
              </motion.div>

              {/* সাবমিট বাটন */}
              <motion.div variants={itemVariants} className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-purple-950/40 rounded-xl hover:opacity-95 transition-opacity"
                  endContent={<ArrowRight size={15} className="stroke-[2.5]" />}
                >
                  Sign Up
                </Button>
              </motion.div>

              {/* বটম রিডাইরেক্ট নোট */}
              <motion.p
                variants={itemVariants}
                className="text-center text-xs text-slate-500 font-medium pt-2 select-none"
              >
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-xs font-black text-white hover:underline ml-1"
                >
                  Sign In
                </Link>
              </motion.p>
            </Form>
          </div>
        </motion.div>

        {/* ========================================================
            SECTION 2: RIGHT SIDE - LOTTIE ANIMATION (7 Columns)
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 w-full flex flex-col items-center justify-center p-4 lg:p-8 select-none"
        >
          <div className="w-full max-w-[440px] aspect-square flex items-center justify-center relative mb-6">
            <div className="absolute inset-0 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse"></div>

            <Image
              src={animationData}
              alt="Animation"
              className="w-full h-full object-contain relative z-10"
            />
          </div>

          <div className="text-center max-w-sm">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100 mb-2">
              Global Job Match
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
              Connect with vetted world-class companies and discover
              opportunities personalized just for your talent ecosystem.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;

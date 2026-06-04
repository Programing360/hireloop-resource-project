"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
// Follow the new import pattern
import {
  TextField,
  Label,
  Input,
  FieldError,
  Description,
  Form,
  Button,
  Link,
  Checkbox,
} from "@heroui/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import animationData from '../../../../public/images/animate.svg';
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ১. প্যারেন্ট কন্টেইনারের জন্য অ্যানিমেশন ভেরিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  // ২. চাইল্ড এলিমেন্টগুলোর জন্য স্মুথ আপ-রাইজ মোশন
  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
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
    


    // const userData = {};
    // formData.forEach((value, key) => {
    //   userData[key] = value.toString();
    // });

    const { data, error } = await authClient.signIn.email({
    
        email: user.email,
        password: user.password,
        rememberMe: true,
        callbackURL: "/",
    });
     if(data){
      toast.success("Login Successful!")
     }else{
      toast.error(`${error.message}` || "Login Failed! Please check your credentials.")
     }
     console.log(data, error);

    // Replace with your real sign-in logic
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0b0612] text-white flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* ─── BACKGROUND LAYERS ─── */}
      {/* সিগনেচার ভার্টিক্যাল ডার্ক স্ট্রাইপ গ্রিড */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808015_1px,transparent_1px)] bg-[size:45px_100%] md:bg-[size:65px_100%]"></div>
      </div>

      {/* ব্যাকগ্রাউন্ড অরবিটাল গ্লো টিন্ট */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ─── MAIN 2-SECTION SPLIT LAYOUT ─── */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* ========================================================
            SECTION 1: LEFT SIDE - LOGIN FORM CARD (5 Columns)
            ======================================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 w-full flex flex-col justify-center"
        >
          {/* গ্লাস-মরফিজম মোড়ানো মেইন কার্ড ফর্ম */}
          <div className="w-full bg-[#140f24]/40 border border-white/[0.04] backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative">
            {/* মিনি টপ অ্যাকসেন্ট বার */}
            <div className="w-12 h-[3px] bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full mb-8"></div>

            {/* হেডিং */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                Sign in to HireLoop
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Enter your credentials to continue your journey
              </p>
            </motion.div>

            {/* ফর্ম কম্পোনেন্টস - Following the new pattern */}
            <Form className="space-y-5" onSubmit={onSubmit}>
              {/* ইমেইল TextField - Pattern Followed */}
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
                  {/* startContent is replaced by absolute positioning within TextField */}
                  <div className="relative">
                    <Input
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`
                        w-full h-12 rounded-xl text-sm pl-11 pr-4 text-slate-200 placeholder:text-slate-600
                        bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04]
                        focus:outline-none focus:border-purple-500/80 transition-all duration-300
                      `}
                    />
                    <Mail
                      size={16}
                      className="text-slate-500 shrink-0 absolute left-4 top-1/2 -translate-y-1/2 select-none"
                    />
                  </div>
                  {/* FieldError Pattern */}
                  <FieldError className="text-xs text-pink-500 font-medium mt-1 pl-1" />
                </TextField>
              </motion.div>

              {/* পাসওয়ার্ড TextField - Pattern Followed */}
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
                    // Custom description already informs, we enforce basic length here.
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
                      className={`
                        w-full h-12 rounded-xl text-sm pl-11 pr-11 text-slate-200 placeholder:text-slate-600
                        bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04]
                        focus:outline-none focus:border-purple-500/80 transition-all duration-300
                      `}
                    />
                    <Lock
                      size={16}
                      className="text-slate-500 shrink-0 absolute left-4 top-1/2 -translate-y-1/2 select-none"
                    />

                    {/* endContent toggle replaced by absolute positioning */}
                    <button
                      className="focus:outline-none absolute right-4 top-1/2 -translate-y-1/2 select-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeOff
                          size={16}
                          className="text-slate-500 hover:text-slate-300 transition-colors"
                        />
                      ) : (
                        <Eye
                          size={16}
                          className="text-slate-500 hover:text-slate-300 transition-colors"
                        />
                      )}
                    </button>
                  </div>
                  {/* Description and FieldError Pattern */}
                  <Description className="text-[11px] text-slate-500 pt-1 pb-1 select-none leading-tight">
                    Must be at least 8 characters.
                  </Description>
                  <FieldError className="text-xs text-pink-500 font-medium mt-0.5 pl-1" />
                </TextField>
              </motion.div>

              {/* রিমেম্বার মি এবং ফরগট পাসওয়ার্ড রো */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between pt-1 pb-2"
              >
                <Checkbox
                  radius="sm"
                  classNames={{
                    label: "text-xs font-semibold text-slate-400 select-none",
                    wrapper:
                      "before:border-white/[0.1] after:bg-purple-600 before:bg-white/[0.01]",
                  }}
                >
                  Remember me
                </Checkbox>
                <Link
                  href="#"
                  className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors tracking-wide select-none"
                >
                  Forgot Password?
                </Link>
              </motion.div>

              {/* সাবমিট বাটন (Hero UI v3 Button উইথ Framer Motion ইন্টারঅ্যাকশন) */}
              <motion.div variants={itemVariants} className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-purple-950/40 rounded-xl hover:opacity-95 transition-opacity"
                  endContent={<ArrowRight size={16} className="stroke-[2.5]" />}
                >
                  Sign In
                </Button>
              </motion.div>

              {/* বটম সাইন-আপ রিডাইরেক্ট নোট */}
              <motion.p
                variants={itemVariants}
                className="text-center text-xs text-slate-500 font-medium pt-4 select-none"
              >
                Don't have an account?{" "}
                <Link
                  href="/auth/signUp"
                  className="text-xs font-black text-white hover:underline ml-1"
                >
                  Sign Up
                </Link>
              </motion.p>
            </Form>
          </div>
        </motion.div>

        {/* ========================================================
            SECTION 2: RIGHT SIDE - LOTTIE ANIMATION BRAND BOX (7 Columns)
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 w-full flex flex-col items-center justify-center p-4 lg:p-8 select-none"
        >
          {/* লটি প্লেয়ার কন্টেইনার */}
          <div className="w-full max-w-[480px] aspect-square flex items-center justify-center relative mb-6">
            {/* ডাইনামিক স্পিনিং রিং ব্যাকগ্রাউন্ড গ্লো */}
            <div className="absolute inset-0 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse"></div>

            {/* <DotLottieReact
              src=''
              loop
              autoplay
              className="w-full h-full object-contain relative z-10"
            /> */}
            <Image src={animationData} alt="Animation" className="w-full h-full object-contain relative z-10" />
          </div>

          {/* ব্র্যান্ডিং টেক্সট মডিউল */}
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

export default LoginPage;

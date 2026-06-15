'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, HelpCircle } from 'lucide-react';

// Pricing Data mapped from image_844021
const pricingData = {
  seekers: [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['Browse & save up to 10 jobs', 'Apply to up to 3 jobs per month', 'Basic profile', 'Email alerts'],
      highlight: false,
      buttonText: 'Get Started',
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'month',
      features: ['Apply to up to 30 jobs per month', 'Unlimited saved jobs', 'Application tracking', 'Salary insights'],
      highlight: true, 
      buttonText: 'Upgrade to Pro',
    },
    {
      name: 'Premium',
      price: '$39',
      period: 'month',
      features: ['Everything in Pro + unlimited applications', 'Profile boost to recruiters', 'Early access to new jobs', 'Priority support'],
      highlight: false,
      buttonText: 'Go Premium',
    },
  ],
  recruiters: [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['Up to 3 active job posts', 'Basic applicant management', 'Standard listing visibility (great for a company\'s first year of hiring)'],
      highlight: false,
      buttonText: 'Post a Job Free',
    },
    {
      name: 'Growth',
      price: '$49',
      period: 'month',
      features: ['Up to 10 active job posts', 'Applicant tracking', 'Basic analytics', 'Email support'],
      highlight: true, 
      buttonText: 'Choose Growth',
    },
    {
      name: 'Enterprise',
      price: '$149',
      period: 'month',
      features: ['Up to 50 active job posts', 'Advanced analytics dashboard', 'Featured job listings', 'Team collaboration', 'Custom branding', 'Priority support'],
      highlight: false,
      buttonText: 'Contact Sales',
    },
  ],
};

const faqs = [
  { question: "How does the cancellation policy work?", answer: "You can cancel your subscription at any time from your account settings. Once canceled, you will retain access to your plan features until the end of your current billing cycle." },
  { question: "Can I get a refund?", answer: "We offer a 14-day money-back guarantee if you're not satisfied with your plan. Reach out to our support team, and we'll handle it seamlessly." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, Mastercard, American Express), Google Pay, and Apple Pay through our secure checkout system." },
  { question: "Can I switch between plans later?", answer: "Absolutely. You can upgrade or downgrade your plan instantly. Your remaining balance will be prorated towards the new plan automatically." },
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('seekers'); 
  const [openFaq, setOpenFaq] = useState(null);

  return (
    // image_83e663.png এর সাথে ম্যাচিং মেইন ব্যাকগ্রাউন্ড (Deep Dark Violet-Black)
    <div className="min-h-screen bg-[#0D0B14] text-slate-100 py-20 px-4 sm:px-6 lg:px-8 font-sans antialiased selection:bg-purple-500 selection:text-white">
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        {/* image_83e663.png এর মতো Find Your Dream Job স্টাইলের টেক্সট গ্রেডিয়েন্ট */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
          Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Perfect Plan</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
          Choose the ideal tier tailored to accelerate your journey, whether you are seeking or hiring.
        </p>

        {/* Premium Dark Toggle Switcher */}
        <div className="mt-10 flex justify-center">
          <div className="relative bg-[#1A1625] p-1 rounded-full flex w-72 border border-purple-900/30 shadow-2xl">
            <motion.div
              className="absolute inset-y-1 left-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg"
              initial={false}
              animate={{
                x: activeTab === 'seekers' ? 0 : 142,
                width: 136,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
            <button
              onClick={() => setActiveTab('seekers')}
              className={`relative z-10 w-1/2 py-2 text-xs font-bold rounded-full transition-colors duration-200 ${
                activeTab === 'seekers' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setActiveTab('recruiters')}
              className={`relative z-10 w-1/2 py-2 text-xs font-bold rounded-full transition-colors duration-200 ${
                activeTab === 'recruiters' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              For Recruiters
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Layout Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center px-2 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {pricingData[activeTab].map((plan, index) => (
            <motion.div
              key={`${activeTab}-${plan.name}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              // image_83e663.png এর কার্ড কালার স্কিমের মতো ব্ল্যাক-কার্ড ডিজাইন (#161320)
              className={`relative rounded-2xl p-8 bg-[#161320] border transition-all flex flex-col justify-between h-full ${
                plan.highlight
                  ? 'border-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.15)] md:scale-105 z-10'
                  : 'border-slate-800/80 z-0'
              }`}
            >
              {/* Highlight Tag for Middle Card */}
              {plan.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                {/* Plan Title & Price */}
                <h3 className="text-lg font-bold text-slate-200 tracking-wide">{plan.name}</h3>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-sm font-medium text-slate-500">/{plan.period}</span>
                </div>

                {/* Features List */}
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={`flex-shrink-0 p-0.5 rounded-full mt-0.5 ${plan.highlight ? 'text-purple-400' : 'text-slate-500'}`}>
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="ml-3 text-sm text-slate-400 leading-relaxed">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                className={`mt-8 w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 focus:outline-none ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 shadow-lg shadow-purple-500/20'
                    : 'bg-[#221E2F] hover:bg-[#2B263B] text-slate-200 border border-slate-700/50'
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto mt-36">
        <div className="text-center mb-12">
          <HelpCircle className="h-7 w-7 text-purple-400 mx-auto mb-3" />
          <h2 className="text-2xl font-bold tracking-tight text-white">Frequently Asked Questions</h2>
          <p className="mt-2 text-sm text-slate-400">Everything you need to know about our plans and billing cycles.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="bg-[#161320] rounded-xl border border-slate-800/60 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-5 text-left focus:outline-none group"
                >
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-purple-400 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-500 flex-shrink-0"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
                
                {/* Accordion Smooth Reveal */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/30 bg-[#120F1B]/50">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
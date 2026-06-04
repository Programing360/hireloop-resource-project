'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  
  
  PinIcon,
} from 'lucide-react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

const footerLinks = {
  product: [
    'Job discovery',
    'Worker AI',
    'Companies',
    'Salary data',
  ],
  navigation: [
    'Help center',
    'Career library',
    'Contact',
  ],
  resources: [
    'Brand Guideline',
    'Newsroom',
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Background Stripes */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                to right,
                rgba(127, 29, 29, .25) 0px,
                rgba(127, 29, 29, .25) 70px,
                transparent 70px,
                transparent 110px
              )
            `,
          }}
        />
      </div>

      {/* Purple Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600">
                <span className="text-xl font-bold">{`</>`}</span>
              </div>

              <div>
                <h3 className="text-3xl font-bold leading-none">
                  Programming
                </h3>
                <h3 className="text-3xl font-bold leading-none">
                  Hero
                </h3>
              </div>
            </div>

            <p className="mt-8 max-w-sm text-lg leading-relaxed text-zinc-400">
              The AI-native career platform. Built for
              people who take their work seriously.
            </p>

            <div className="mt-12 flex gap-4">
              <motion.a
                whileHover={{ scale: 1.08 }}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 backdrop-blur-md"
              >
                <FaFacebook />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.08 }}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600"
              >
                <PinIcon size={24} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.08 }}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 backdrop-blur-md"
              >
                <FaLinkedin />
              </motion.a>
            </div>
          </motion.div>

          {/* Product */}
          <FooterColumn
            title="Product"
            links={footerLinks.product}
          />

          {/* Navigation */}
          <FooterColumn
            title="Navigations"
            links={footerLinks.navigation}
          />

          {/* Resources */}
          <FooterColumn
            title="Resources"
            links={footerLinks.resources}
          />
        </div>

        {/* Divider */}
        <div className="mt-20 h-px bg-white/10" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col items-center justify-between gap-4 text-zinc-500 md:flex-row"
        >
          <p>
            Copyright 2024 — Programming Hero
          </p>

          <div className="flex items-center gap-4">
            <Link href="#">Terms & Policy</Link>

            <span>•</span>

            <Link href="#">
              Privacy Guideline
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h4 className="mb-8 text-xl font-semibold text-violet-500">
        {title}
      </h4>

      <ul className="space-y-5">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="text-lg text-zinc-400 transition hover:text-white"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
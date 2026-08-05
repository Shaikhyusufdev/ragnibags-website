"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HangTag from "./HangTag";
import { BUSINESS_TAGLINE } from "@/lib/config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-espresso text-canvas">
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-tag text-brass text-xs tracking-[0.25em] uppercase mb-4"
          >
            {BUSINESS_TAGLINE}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display italic text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6"
          >
            Har Safar Ke Liye,
            <br />
            Ek Sahi Bag.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-canvas/70 max-w-md mb-8 leading-relaxed"
          >
            Backpacks, handbags, travel bags, office bags aur bahut kuch —
            mazbooti aur style dono ek jagah. Best price, direct WhatsApp par
            order.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/products"
              className="bg-brass text-espresso font-bold px-7 py-3.5 rounded-sm hover:bg-canvas transition-colors"
            >
              Bags Dekhein →
            </Link>
            <Link
              href="/#contact"
              className="border border-canvas/30 text-canvas px-7 py-3.5 rounded-sm hover:border-brass hover:text-brass transition-colors"
            >
              Contact Karein
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center md:justify-end"
        >
          <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-saddle/20 border border-brass/30 flex items-center justify-center relative">
            <svg
              viewBox="0 0 200 200"
              className="w-40 h-40 sm:w-48 sm:h-48 text-brass"
              fill="none"
            >
              <rect x="35" y="70" width="130" height="105" rx="14" stroke="currentColor" strokeWidth="6" />
              <path d="M65 70 V45 a35 35 0 0 1 70 0 V70" stroke="currentColor" strokeWidth="6" />
              <line x1="35" y1="105" x2="165" y2="105" stroke="currentColor" strokeWidth="4" opacity="0.5" />
            </svg>
            <div className="absolute -bottom-4 -right-2 sm:right-4">
              <HangTag mrp={999} price={699} rotate={-8} size="lg" />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="stitch-border" />
    </section>
  );
}

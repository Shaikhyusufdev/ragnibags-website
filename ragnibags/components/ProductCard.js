"use client";

import { motion } from "framer-motion";
import HangTag from "./HangTag";
import { whatsappLink } from "@/lib/config";

export default function ProductCard({ product, index = 0 }) {
  const { name, category, mrp, offerPrice, image, description } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group bg-white/40 border border-espresso/10 rounded-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative aspect-square bg-saddle/10 overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-saddle/40 text-sm">
            Photo jaldi aa rahi hai
          </div>
        )}
        <div className="absolute top-3 left-3">
          <HangTag mrp={mrp} price={offerPrice} rotate={-8} size="sm" />
        </div>
      </div>

      <div className="p-4">
        <p className="font-tag text-[10px] uppercase tracking-widest text-saddle mb-1">
          {category}
        </p>
        <h3 className="font-display text-lg leading-snug mb-1">{name}</h3>
        {description ? (
          <p className="text-ink/60 text-sm mb-3 line-clamp-2">{description}</p>
        ) : (
          <div className="mb-3" />
        )}
        <a
          href={whatsappLink(
            `Namaste! Mujhe "${name}" order karna hai (₹${offerPrice}). Kripya aage bataye.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-espresso text-canvas text-sm font-semibold px-4 py-2.5 rounded-sm hover:bg-saddle transition-colors w-full justify-center"
        >
          WhatsApp par Order Karein
        </a>
      </div>
    </motion.div>
  );
}

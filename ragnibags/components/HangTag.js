"use client";

import { motion } from "framer-motion";

export default function HangTag({
  mrp,
  price,
  rotate = -6,
  size = "md",
  className = "",
}) {
  const sizes = {
    sm: { pad: "px-3 py-2", mrp: "text-[10px]", price: "text-base" },
    md: { pad: "px-4 py-3", mrp: "text-xs", price: "text-xl" },
    lg: { pad: "px-6 py-4", mrp: "text-sm", price: "text-3xl" },
  };
  const s = sizes[size] || sizes.md;
  const discount =
    mrp && price && mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : null;

  return (
    <motion.div
      initial={{ rotate: rotate - 3, y: -2 }}
      animate={{ rotate }}
      whileHover={{ rotate: rotate + 8, y: 2 }}
      transition={{ type: "spring", stiffness: 140, damping: 9 }}
      style={{ transformOrigin: "12% 12%" }}
      className={`relative inline-block select-none ${className}`}
    >
      <svg
        width="34"
        height="26"
        viewBox="0 0 34 26"
        className="absolute -top-[18px] left-[10px] -z-10"
        aria-hidden="true"
      >
        <path
          d="M2 24 Q16 2 32 14"
          stroke="#8B5A2B"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div
        className={`bg-canvas border-2 border-espresso shadow-tag ${s.pad} relative`}
        style={{
          clipPath:
            "polygon(16% 0%, 100% 0%, 100% 100%, 16% 100%, 0% 50%)",
        }}
      >
        <span className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-espresso" />
        <div className="ml-3">
          {mrp ? (
            <p className={`font-tag ${s.mrp} text-espresso/50 line-through leading-none`}>
              MRP {"\u20B9"}
              {mrp}
            </p>
          ) : null}
          <p className={`font-tag ${s.price} text-rust font-bold leading-tight`}>
            {"\u20B9"}
            {price}
          </p>
          {discount ? (
            <p className="font-tag text-[10px] text-saddle font-bold uppercase tracking-wide">
              {discount}% off
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

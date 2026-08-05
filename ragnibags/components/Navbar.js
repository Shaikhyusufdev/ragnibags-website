"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BUSINESS_NAME } from "@/lib/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Sabhi Bags" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-espresso/95 backdrop-blur shadow-md py-2"
          : "bg-espresso py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-display italic text-2xl font-semibold text-canvas tracking-tight"
        >
          {BUSINESS_NAME}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-canvas/80 hover:text-brass transition-colors text-sm font-medium tracking-wide"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/products"
            className="bg-brass text-espresso text-sm font-bold px-5 py-2 rounded-sm hover:bg-canvas transition-colors"
          >
            Buy Now
          </Link>
        </nav>

        <button
          className="md:hidden text-canvas"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu kholein"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden px-5 pt-4 pb-2 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-canvas/90 text-sm font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="bg-brass text-espresso text-sm font-bold px-5 py-2 rounded-sm text-center"
          >
            Buy Now
          </Link>
        </nav>
      )}
    </header>
  );
}

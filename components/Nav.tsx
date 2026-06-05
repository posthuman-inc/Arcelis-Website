"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Wordmark } from "./Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
    >
      <div
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled ? "glass shadow-soft" : "bg-transparent"
        }`}
      >
        <a href="#top" aria-label="Aracelis home">
          <Wordmark />
        </a>
        <a
          href="#book"
          className="inline-flex items-center gap-2 rounded-full bg-evergreen px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-pine sm:px-5"
        >
          Book your call
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </motion.header>
  );
}

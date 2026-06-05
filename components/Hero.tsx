"use client";

import { motion } from "motion/react";
import { MagneticButton, staggerContainer, staggerItem } from "./primitives";

const chips = [
  { label: "+$92.58 / mo take-home", tone: "honey" },
  { label: "$0 copay urgent care", tone: "jade" },
  { label: "~$682 / yr saved per employee", tone: "clay" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-32 sm:pt-40"
    >
      {/* Aurora field */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="aurora drift-slow left-[-10%] top-[-8%] h-[42vh] w-[42vh]"
          style={{ background: "radial-gradient(circle, var(--color-jade), transparent 70%)" }}
        />
        <div
          className="aurora drift-slower right-[-12%] top-[6%] h-[46vh] w-[46vh]"
          style={{ background: "radial-gradient(circle, var(--color-honey), transparent 70%)" }}
        />
        <div
          className="aurora drift-slow bottom-[-18%] left-[30%] h-[40vh] w-[40vh] opacity-40"
          style={{ background: "radial-gradient(circle, var(--color-clay), transparent 70%)" }}
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={staggerItem}>
          <span className="inline-flex items-center gap-2 rounded-full border border-evergreen/12 bg-paper/70 px-4 py-1.5 text-xs font-medium tracking-tight text-stone backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-jade" />
            Section 125 Wellness Plan · built for small business
          </span>
        </motion.div>

        <motion.h1
          variants={staggerItem}
          className="font-display mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-evergreen sm:text-6xl"
        >
          Better healthcare.
          <br />
          <span className="text-gradient">Bigger paychecks.</span>
          <br />
          At no net cost.
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-stone sm:text-lg"
        >
          Aracelis sets your company up on a Section 125 wellness plan in about an
          hour. Your people take home more each month and get real preventive
          care. The company trims its payroll tax. Everybody wins.
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <MagneticButton href="#book" variant="primary" className="w-full sm:w-auto">
            Book your onboarding call
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MagneticButton>
          <MagneticButton href="#how" variant="ghost" className="w-full sm:w-auto">
            See how it works
          </MagneticButton>
        </motion.div>

        {/* Floating benefit chips */}
        <motion.div
          variants={staggerItem}
          className="mt-12 flex flex-wrap items-center justify-center gap-2.5"
        >
          {chips.map((c, i) => (
            <motion.span
              key={c.label}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
              className="surface inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-evergreen"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: `var(--color-${c.tone})` }}
              />
              {c.label}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="relative z-10 mx-auto mt-16 flex w-fit flex-col items-center gap-2 text-xs text-stone-soft"
      >
        <span>One painless hour. That&apos;s the whole lift.</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-jade"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}

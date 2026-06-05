"use client";

import { motion } from "motion/react";
import { Reveal, staggerContainer, staggerItem } from "./primitives";

const wins = [
  {
    tag: "Your team",
    accent: "honey",
    title: "More money. Real care.",
    body: "Employees see a little more in every paycheck and get round-the-clock access to doctors, mental-health support, and health coaching for the whole family.",
    points: ["Bigger take-home pay", "Care for the whole family", "$0 copay on urgent visits"],
    icon: (
      <path d="M12 21s-7-4.4-7-9.6A4.4 4.4 0 0 1 12 8a4.4 4.4 0 0 1 7 3.4C19 16.6 12 21 12 21Z" />
    ),
  },
  {
    tag: "Your company",
    accent: "jade",
    title: "Lower payroll tax. Same payroll.",
    body: "Because contributions run pre-tax, your matching FICA shrinks on every participating employee. Real savings that compound across your whole team, every month.",
    points: ["Cut employer FICA", "No change to base pay", "Scales with headcount"],
    icon: (
      <path d="M3 17l5-5 4 4 8-8M21 8h-5M21 8v5" />
    ),
  },
  {
    tag: "The bigger picture",
    accent: "clay",
    title: "Healthier people, lower cost.",
    body: "Preventive care catches problems early. Healthier teams mean fewer claims and lower long-term cost across the system. That is why the tax code rewards it.",
    points: ["Prevention over claims", "Fewer ER visits", "Built into the tax code"],
    icon: (
      <path d="M3 12h4l2 5 4-12 2 7h6" />
    ),
  },
];

export function TripleWin() {
  return (
    <section id="why" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-jade">
            Why everybody wins
          </p>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-evergreen sm:text-5xl">
            One plan. Three winners.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-stone">
            This is not a trade-off. The same structure that puts more in your
            team&apos;s pockets is what saves the company money and keeps
            everyone healthier.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {wins.map((w) => (
            <motion.div
              key={w.tag}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="surface group relative flex flex-col rounded-[1.75rem] p-7"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: `color-mix(in srgb, var(--color-${w.accent}) 16%, transparent)` }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={`var(--color-${w.accent})`}
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {w.icon}
                </svg>
              </span>
              <p className="mt-6 text-sm font-medium uppercase tracking-[0.14em] text-stone-soft">
                {w.tag}
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-evergreen">
                {w.title}
              </h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-stone">{w.body}</p>
              <ul className="mt-6 space-y-2.5 border-t border-evergreen/8 pt-5">
                {w.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-evergreen">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <circle cx="8" cy="8" r="8" fill={`color-mix(in srgb, var(--color-${w.accent}) 18%, transparent)`} />
                      <path d="M5 8l2 2 4-4" stroke={`var(--color-${w.accent})`} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

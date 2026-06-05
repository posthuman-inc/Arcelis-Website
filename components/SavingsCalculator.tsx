"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Reveal, formatMoney } from "./primitives";

const EMP_YR = 1110.96; // employee take-home increase per year
const ER_YR = 681.6; // employer net payroll-tax savings per year, per employee
const ELIGIBLE_RATE = 0.8;

export function SavingsCalculator() {
  const [count, setCount] = useState(100);
  const eligible = Math.round(count * ELIGIBLE_RATE);
  const employeeTotal = eligible * EMP_YR;
  const employerTotal = eligible * ER_YR;
  const combined = employeeTotal + employerTotal;

  const cards = [
    {
      label: "Added to your team's pockets",
      value: employeeTotal,
      sub: "per year, across all participating employees",
      accent: "honey",
    },
    {
      label: "Saved by the company",
      value: employerTotal,
      sub: "per year in net payroll-tax savings",
      accent: "jade",
    },
  ];

  return (
    <section id="savings" className="relative px-5 py-24 sm:py-32">
      {/* soft aurora */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div
          className="aurora drift-slower left-1/2 top-1/2 h-[55vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 opacity-25"
          style={{ background: "radial-gradient(circle, var(--color-jade), transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-jade">
            Your numbers
          </p>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-evergreen sm:text-5xl">
            Move the slider. Watch it add up.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-stone">
            Assuming about 80% of your team participates. The bigger the team,
            the bigger the win on both sides.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="surface rounded-[2rem] p-7 sm:p-10">
            {/* Slider */}
            <div className="flex items-baseline justify-between">
              <label htmlFor="count" className="text-sm font-medium text-stone">
                Employees at your company
              </label>
              <span className="font-display text-3xl font-semibold text-evergreen tabular-nums">
                {count}
              </span>
            </div>
            <input
              id="count"
              type="range"
              min={5}
              max={500}
              step={5}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="mt-4 w-full cursor-pointer accent-[var(--color-pine)]"
              style={{ accentColor: "var(--color-pine)" }}
            />
            <div className="mt-1 flex justify-between text-xs text-stone-soft">
              <span>5</span>
              <span>{eligible} participating</span>
              <span>500</span>
            </div>

            {/* Result cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cards.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-evergreen/8 p-5"
                  style={{ background: `color-mix(in srgb, var(--color-${c.accent}) 8%, var(--color-paper))` }}
                >
                  <p className="text-sm font-medium text-stone">{c.label}</p>
                  <motion.p
                    key={c.value}
                    initial={{ opacity: 0.4, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display mt-1 text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl"
                    style={{ color: `var(--color-${c.accent === "honey" ? "amber" : "pine"})` }}
                  >
                    ${formatMoney(c.value)}
                  </motion.p>
                  <p className="mt-1 text-xs text-stone-soft">{c.sub}</p>
                </div>
              ))}
            </div>

            {/* Combined */}
            <div className="mt-4 flex flex-col items-center gap-1 rounded-2xl bg-evergreen px-6 py-6 text-center">
              <span className="text-sm font-medium text-mint">Combined annual value</span>
              <motion.span
                key={combined}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                className="font-display text-4xl font-semibold tracking-tight text-cream tabular-nums sm:text-5xl"
              >
                ${formatMoney(combined)}
              </motion.span>
              <span className="text-xs text-mint/70">
                created across your company, every year
              </span>
            </div>

            <p className="mt-5 text-center text-xs text-stone-soft">
              Figures based on plan modeling at a representative salary. Exact
              numbers depend on your census and are confirmed on your call.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

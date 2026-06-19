"use client";

import { motion } from "motion/react";
import { CountUp } from "../primitives";
import { Logomark } from "../Logo";
import { useState } from "react";

/* Each slide is full-bleed. `light` = cream bg / dark text, `dark` = evergreen bg / light text.
   Content animates on mount, so it replays every time you land on the slide. */

export type SlideTheme = "light" | "dark";

export type SlideDef = {
  id: string;
  theme: SlideTheme;
  eyebrow?: string;
  node: React.ReactNode;
};

const ease = [0.22, 1, 0.36, 1] as const;

function StaggerList({ children }: { children: React.ReactNode[] }) {
  return (
    <div className="flex flex-col gap-3">
      {children.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
        >
          {c}
        </motion.div>
      ))}
    </div>
  );
}

function Title({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05, ease }}
      className={`font-display text-balance text-[2.1rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl ${className}`}
    >
      {children}
    </motion.h2>
  );
}

function Lead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.18, ease }}
      className={`mt-5 text-pretty text-[1.05rem] leading-relaxed sm:text-lg ${className}`}
    >
      {children}
    </motion.p>
  );
}

function Eyebrow({ children, tone = "jade" }: { children: React.ReactNode; tone?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="text-sm font-medium uppercase tracking-[0.18em]"
      style={{ color: `var(--color-${tone})` }}
    >
      {children}
    </motion.p>
  );
}

/* ---------- Slide: Intro ---------- */
function Intro() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
      >
        <Logomark className="h-16 w-16" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display mt-4 text-2xl font-semibold tracking-tight text-evergreen"
      >
        Arcelis
      </motion.span>
      <Title className="mt-8 text-evergreen">
        Better healthcare.
        <br />
        <span className="text-gradient">Bigger paychecks.</span>
        <br />
        At no net cost.
      </Title>
      <Lead className="max-w-md text-stone">
        Sixty seconds on how your company can save on payroll tax while your team
        takes home more and gets real care.
      </Lead>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-10 flex items-center gap-2 text-sm font-medium text-jade"
      >
        <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          Swipe to begin →
        </motion.span>
      </motion.div>
    </div>
  );
}

/* ---------- Slide: Promise ---------- */
function Promise() {
  return (
    <div className="text-center">
      <Eyebrow tone="honey">The whole ask</Eyebrow>
      <Title className="mt-5 text-cream">
        One hour to start.
        <br />
        Five minutes a month after.
      </Title>
      <Lead className="mx-auto max-w-md text-mint/85">
        That hour is a <span className="text-honey">one-time</span> onboarding. We
        handle the paperwork and your payroll provider. After that, keeping it
        running takes about five minutes a month: you just log into the portal.
      </Lead>
      <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
        {[
          { big: "~1 hr", small: "one-time setup", note: "we do the heavy lifting" },
          { big: "~5 min", small: "per month after", note: "just a quick portal login" },
        ].map((p, i) => (
          <motion.div
            key={p.small}
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 180, damping: 16 }}
            className="flex flex-col items-center rounded-2xl border border-mint/20 bg-mint/5 px-7 py-5"
          >
            <span className="font-display text-4xl font-semibold text-honey">{p.big}</span>
            <span className="mt-1 text-base font-medium text-cream">{p.small}</span>
            <span className="text-xs text-mint/70">{p.note}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Slide: Triple win ---------- */
function TripleWin() {
  const wins = [
    { tag: "Your team", tone: "honey", text: "More in every paycheck, plus real care for the whole family." },
    { tag: "Your company", tone: "jade", text: "Lower employer payroll tax. No change to base salaries." },
    { tag: "Everyone", tone: "clay", text: "Healthier people, fewer claims. The tax code rewards it." },
  ];
  return (
    <div className="text-center">
      <Eyebrow>Why everybody wins</Eyebrow>
      <Title className="mt-5 text-evergreen">One plan. Three winners.</Title>
      <div className="mx-auto mt-10 flex max-w-md flex-col gap-3">
        {wins.map((w, i) => (
          <motion.div
            key={w.tag}
            initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease }}
            className="surface flex items-center gap-4 rounded-2xl p-4 text-left"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-lg font-semibold"
              style={{
                background: `color-mix(in srgb, var(--color-${w.tone}) 16%, transparent)`,
                color: `var(--color-${w.tone === "honey" ? "amber" : w.tone})`,
              }}
            >
              {i + 1}
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-soft">{w.tag}</p>
              <p className="mt-0.5 text-[0.95rem] leading-snug text-evergreen">{w.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Slide: Paycheck ---------- */
function Paycheck() {
  return (
    <div className="text-center">
      <Eyebrow>Your team</Eyebrow>
      <Title className="mt-5 text-evergreen">
        Same salary.
        <br />
        More in the bank.
      </Title>
      <Lead className="mx-auto max-w-md text-stone">
        Pre-tax contributions shrink taxable income, so less is withheld. The
        wellness benefit returns to the employee. Take-home actually goes up.
      </Lead>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, ease }}
        className="mx-auto mt-10 flex max-w-xs flex-col items-center rounded-[1.75rem] bg-evergreen px-8 py-7"
      >
        <span className="text-sm font-medium text-mint">Extra take-home pay</span>
        <span className="font-display mt-1 text-5xl font-semibold text-cream">
          +$<CountUp to={92.58} decimals={2} />
        </span>
        <span className="text-sm text-mint/70">every month</span>
        <span className="mt-3 rounded-full bg-honey/20 px-3 py-1 text-sm font-medium text-honey">
          +$<CountUp to={1110.96} decimals={2} /> a year
        </span>
      </motion.div>
    </div>
  );
}

/* ---------- Slide: Employer savings (mini interactive) ---------- */
function Employer() {
  const [count, setCount] = useState(50);
  const eligible = Math.round(count * 0.8);
  const employer = eligible * 681.6;
  const employee = eligible * 1110.96;
  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return (
    <div className="text-center">
      <Eyebrow tone="honey">Your company</Eyebrow>
      <Title className="mt-5 text-cream">
        Save ~$700 per employee
        <br />
        on payroll tax.
      </Title>
      <Lead className="mx-auto max-w-md text-mint/85">
        Every year, on each participating employee. Drag to your headcount —
        roughly 80% typically take part — and watch it add up.
      </Lead>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, ease }}
        className="mx-auto mt-8 w-full max-w-sm"
      >
        <div className="flex items-baseline justify-between text-cream">
          <span className="text-sm text-mint">Employees</span>
          <span className="font-display text-3xl font-semibold">{count}</span>
        </div>
        <input
          type="range"
          min={5}
          max={500}
          step={5}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="mt-3 w-full cursor-pointer"
          style={{ accentColor: "var(--color-honey)" }}
        />
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-mint/15 bg-mint/5 p-4">
            <p className="text-xs text-mint/80">Company saves / yr</p>
            <p className="font-display mt-1 text-2xl font-semibold text-honey">${fmt(employer)}</p>
          </div>
          <div className="rounded-2xl border border-mint/15 bg-mint/5 p-4">
            <p className="text-xs text-mint/80">Added to paychecks / yr</p>
            <p className="font-display mt-1 text-2xl font-semibold text-cream">${fmt(employee)}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Slide: Care bundle ---------- */
function Care() {
  const items = [
    { t: "Virtual Primary Care", d: "Whole family", icon: <path d="M12 3v18M3 12h18" /> },
    { t: "24/7 Urgent Care", d: "$0 copay", icon: <path d="M12 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v5l3 2" /> },
    { t: "Mental Health", d: "Therapy 24/7", icon: <path d="M21 11.5a8.5 8.5 0 0 1-12 7.7L3 21l1.8-6A8.5 8.5 0 1 1 21 11.5Z" /> },
    { t: "RN Coaching", d: "Unlimited", icon: <path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 21a7 7 0 0 1 14 0" /> },
    { t: "$0 Prescriptions", d: "70 common Rx", icon: <path d="M4 5h16v14H4zM4 10h16" /> },
    { t: "Wearable Sync", d: "Apple · Fitbit", icon: <path d="M9 7h6v10H9zM9 4l1 3M15 4l-1 3" /> },
  ];
  return (
    <div className="text-center">
      <Eyebrow tone="honey">What your people get</Eyebrow>
      <Title className="mt-5 text-cream">A whole care team.</Title>
      <Lead className="mx-auto max-w-md text-mint/85">
        Powered by Patriot Preventive Care. The part your team actually feels.
      </Lead>
      <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-3">
        {items.map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease }}
            className="flex items-center gap-3 rounded-2xl border border-mint/12 bg-mint/5 p-3 text-left"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-honey/15">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-honey)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                {it.icon}
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight text-cream">{it.t}</p>
              <p className="text-xs text-mint/70">{it.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Slide: How it works ---------- */
function How() {
  const steps = [
    { t: "Book your call", d: "Grab a slot. We walk you through everything.", once: true },
    { t: "We model your numbers", d: "A simple census, your real savings.", once: true },
    { t: "We handle payroll", d: "We coordinate directly with your provider.", once: true },
    { t: "Your team is enrolled", d: "Bigger paychecks and real care, live.", once: true },
    { t: "Maintain in minutes", d: "~5 min a month — just log into the portal.", once: false },
  ];
  return (
    <div>
      <div className="text-center">
        <Eyebrow>How it works</Eyebrow>
        <Title className="mt-5 text-evergreen">One hour to set up. Minutes to run.</Title>
      </div>
      <div className="mx-auto mt-8 max-w-md">
        <StaggerList>
          {steps.map((s, i) => (
            <div
              key={s.t}
              className={`surface flex items-start gap-4 rounded-2xl p-4 text-left ${
                s.once ? "" : "border-honey/30 bg-honey/5"
              }`}
            >
              <span
                className={`font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  s.once ? "bg-mint/40 text-pine" : "bg-honey/25 text-amber"
                }`}
              >
                {s.once ? i + 1 : "↻"}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold leading-tight text-evergreen">{s.t}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${
                      s.once ? "bg-mint/40 text-pine" : "bg-honey/20 text-amber"
                    }`}
                  >
                    {s.once ? "one-time" : "ongoing"}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-stone">{s.d}</p>
              </div>
            </div>
          ))}
        </StaggerList>
      </div>
    </div>
  );
}

export const SLIDES: SlideDef[] = [
  { id: "intro", theme: "light", node: <Intro /> },
  { id: "promise", theme: "dark", node: <Promise /> },
  { id: "win", theme: "light", node: <TripleWin /> },
  { id: "paycheck", theme: "light", node: <Paycheck /> },
  { id: "employer", theme: "dark", node: <Employer /> },
  { id: "care", theme: "dark", node: <Care /> },
  { id: "how", theme: "light", node: <How /> },
];

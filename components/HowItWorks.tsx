"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "./primitives";

const steps = [
  {
    n: "01",
    title: "Book your onboarding call",
    body: "You already scanned the code. Next, grab a slot. We walk you through the plan and answer everything, no pressure.",
    time: "~30 min",
  },
  {
    n: "02",
    title: "We model your real numbers",
    body: "Share a simple census and we build a proposal against your actual payroll, so the savings stop being hypothetical.",
    time: "We do this",
  },
  {
    n: "03",
    title: "We coordinate with payroll",
    body: "Our team works directly with you and your payroll provider to install the plan. You barely lift a finger.",
    time: "We do this",
  },
  {
    n: "04",
    title: "Your team is enrolled",
    body: "We run enrollment and your people are covered. Bigger paychecks and real care, up and running.",
    time: "Done",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-jade">
            How it works
          </p>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-evergreen sm:text-5xl">
            About an hour. That&apos;s it.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-stone">
            The whole setup asks for roughly an hour of your time. If it ever
            takes more than that, we are doing it wrong, and we will not push you
            to keep going.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-16 pl-12">
          {/* Track */}
          <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-0.5 rounded-full bg-evergreen/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[19px] top-2 w-0.5 rounded-full bg-jade"
          />

          <div className="space-y-10">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="relative">
                  <span className="absolute -left-12 flex h-10 w-10 items-center justify-center rounded-full border border-evergreen/12 bg-paper font-display text-sm font-semibold text-jade shadow-soft">
                    {s.n}
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-evergreen">
                      {s.title}
                    </h3>
                    <span className="rounded-full bg-mint/40 px-3 py-1 text-xs font-medium text-pine">
                      {s.time}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-stone">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

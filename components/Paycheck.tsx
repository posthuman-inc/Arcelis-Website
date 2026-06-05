"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { CountUp, Reveal } from "./primitives";

const WITHOUT = 2488.68;
const WITH = 2581.26;
const DELTA_MO = 92.58;
const DELTA_YR = 1110.96;

export function Paycheck() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const max = WITH;

  return (
    <section className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-jade">
            A real paycheck
          </p>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-evergreen sm:text-5xl">
            Same job. Same salary.
            <br />
            More in the bank.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-stone">
            Pre-tax contributions lower taxable income, so less is withheld for
            federal, state, Social Security, and Medicare. The wellness benefit
            comes back to the employee. Net result: take-home actually goes up.
          </p>

          <div className="mt-8 inline-flex flex-col gap-1 rounded-[1.5rem] border border-clay/20 bg-clay/5 px-6 py-5">
            <span className="text-sm font-medium text-stone">Extra take-home, every year</span>
            <span className="font-display text-4xl font-semibold text-clay-deep">
              +$<CountUp to={DELTA_YR} decimals={2} />
            </span>
            <span className="text-sm text-stone-soft">
              that&apos;s +${DELTA_MO} every single month
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div ref={ref} className="surface rounded-[1.75rem] p-7 sm:p-8">
            <div className="flex items-end justify-between gap-6">
              {/* Without */}
              <div className="flex flex-1 flex-col items-center">
                <span className="mb-3 text-3xl font-semibold text-stone-soft sm:text-4xl">
                  $<CountUp to={WITHOUT} decimals={0} />
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${(WITHOUT / max) * 220}px` } : {}}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-[120px] rounded-t-2xl bg-cream-deep"
                />
                <span className="mt-4 text-center text-sm font-medium text-stone">
                  Without Aracelis
                </span>
              </div>

              {/* With */}
              <div className="flex flex-1 flex-col items-center">
                <span className="mb-3 text-3xl font-semibold text-evergreen sm:text-4xl">
                  $<CountUp to={WITH} decimals={0} />
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={inView ? { height: "220px" } : {}}
                  transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="relative w-full max-w-[120px] overflow-hidden rounded-t-2xl"
                  style={{ background: "linear-gradient(180deg, var(--color-jade), var(--color-pine))" }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.2 }}
                    className="absolute inset-x-0 top-3 text-center text-xs font-semibold text-mint"
                  >
                    +${DELTA_MO}
                  </motion.span>
                </motion.div>
                <span className="mt-4 text-center text-sm font-medium text-evergreen">
                  With Aracelis
                </span>
              </div>
            </div>
            <p className="mt-6 border-t border-evergreen/8 pt-4 text-center text-xs text-stone-soft">
              Monthly take-home pay. Illustrative example based on a $3,033/mo gross.
              Your exact figures are modeled live on your onboarding call.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

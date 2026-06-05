"use client";

import { motion } from "motion/react";
import { Reveal, staggerContainer, staggerItem } from "./primitives";

const services = [
  {
    title: "Virtual Primary Care",
    body: "Up to 12 visits a year for every family member with a licensed, prescribing provider.",
    icon: <path d="M12 3v18M3 12h18" />,
  },
  {
    title: "24/7 Urgent Care",
    body: "Unlimited virtual urgent care with $0 copay, plus the 70 most common prescriptions at $0.",
    icon: <path d="M12 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v5l3 2" />,
  },
  {
    title: "Mental Health Therapy",
    body: "A behavioral therapist available around the clock for urgent needs, in person or virtual.",
    icon: <path d="M21 11.5a8.5 8.5 0 0 1-12 7.7L3 21l1.8-6A8.5 8.5 0 1 1 21 11.5Z" />,
  },
  {
    title: "RN Health Coaching",
    body: "Unlimited access to certified health coaches working on your team's real goals.",
    icon: <path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 21a7 7 0 0 1 14 0" />,
  },
  {
    title: "Personal Health Dashboard",
    body: "Risk assessment, health tracking, records, and predictive insights in one place.",
    icon: <path d="M4 5h16v14H4zM4 10h16M9 14h6" />,
  },
  {
    title: "Wearable Sync",
    body: "Connects with Apple Watch, Fitbit, and Garmin so the data follows the member.",
    icon: <path d="M9 7h6v10H9zM9 4l1 3M15 4l-1 3M9 20l1-3M15 20l-1-3" />,
  },
  {
    title: "Employee Assistance Program",
    body: "Counseling for mental, behavioral, and substance health, plus financial and legal referrals.",
    icon: <path d="M12 3 4 7v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-4Z" />,
  },
  {
    title: "Diabetes & Chronic Prevention",
    body: "Predictive coaching that catches risk early and keeps small problems from becoming big ones.",
    icon: <path d="M3 12h4l2 5 4-12 2 7h6" />,
  },
];

export function Services() {
  return (
    <section id="care" className="relative bg-evergreen px-5 py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-honey">
            What your people get
          </p>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-5xl">
            A whole care team, on day one.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-mint/85">
            Powered by Patriot Preventive Care. This is the part your team will
            actually feel: real doctors, real coaches, real support, for the
            whole family.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8%" }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="rounded-[1.5rem] border border-mint/12 bg-[color-mix(in_srgb,var(--color-mint)_6%,transparent)] p-6 backdrop-blur-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-honey/15">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-honey)"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {s.icon}
                </svg>
              </span>
              <h3 className="font-display mt-5 text-lg font-semibold text-cream">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mint/75">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

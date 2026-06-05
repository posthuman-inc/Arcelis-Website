"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./primitives";
import { supabase } from "@/lib/supabase";

const employeeOptions = ["1–10", "11–50", "51–100", "101–250", "250+"];

type Status = "idle" | "submitting" | "done" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [employeeCount, setEmployeeCount] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      full_name: String(data.get("full_name") || "").trim(),
      company: String(data.get("company") || "").trim() || null,
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim() || null,
      employee_count: employeeCount || null,
      message: String(data.get("message") || "").trim() || null,
      source: "expo-sf",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
    };

    if (!payload.full_name || !payload.email) {
      setErrorMsg("Name and email are required.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    if (!supabase) {
      setErrorMsg("Booking is temporarily unavailable. Please email us directly.");
      setStatus("error");
      return;
    }

    const { error } = await supabase.from("leads").insert(payload);
    if (error) {
      setErrorMsg("Something went wrong. Please try again or email us.");
      setStatus("error");
      return;
    }
    setStatus("done");
    form.reset();
    setEmployeeCount("");
  }

  return (
    <section id="book" className="relative overflow-hidden px-5 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div
          className="aurora drift-slow left-[-8%] bottom-[-10%] h-[40vh] w-[40vh] opacity-40"
          style={{ background: "radial-gradient(circle, var(--color-honey), transparent 70%)" }}
        />
        <div
          className="aurora drift-slower right-[-8%] top-[-10%] h-[42vh] w-[42vh] opacity-40"
          style={{ background: "radial-gradient(circle, var(--color-jade), transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-jade">
            Stage one of one
          </p>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-evergreen sm:text-5xl">
            Book your onboarding call.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-stone">
            Drop your details and we&apos;ll reach out to schedule a quick call
            built around your business. No commitment, no pressure, no cost to
            find out what this looks like for your team.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "We model your exact savings",
              "You see the plan before you decide",
              "Setup is about an hour, start to finish",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-evergreen">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <circle cx="10" cy="10" r="10" fill="color-mix(in srgb, var(--color-jade) 16%, transparent)" />
                  <path d="M6 10l2.5 2.5L14 7" stroke="var(--color-pine)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="surface rounded-[2rem] p-7 sm:p-8">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-jade/15"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12.5l4.5 4.5L19 7" stroke="var(--color-pine)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.span>
                  <h3 className="font-display mt-5 text-2xl font-semibold text-evergreen">
                    You&apos;re on the list.
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-stone">
                    We&apos;ll be in touch shortly to lock in a time. Keep an eye
                    on your inbox.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-medium text-jade underline-offset-4 hover:underline"
                  >
                    Submit another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <Field name="full_name" label="Full name" placeholder="Jordan Rivera" required />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field name="company" label="Company" placeholder="Acme Co." />
                    <Field name="email" type="email" label="Work email" placeholder="you@company.com" required />
                  </div>
                  <Field name="phone" type="tel" label="Phone" placeholder="(555) 123-4567" />

                  <div>
                    <span className="mb-2 block text-sm font-medium text-evergreen">
                      Team size
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {employeeOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setEmployeeCount(opt)}
                          className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                            employeeCount === opt
                              ? "border-pine bg-pine text-cream"
                              : "border-evergreen/15 bg-paper text-stone hover:border-pine/40"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field name="message" label="Anything we should know? (optional)" placeholder="Current benefits, timing, questions…" textarea />

                  {status === "error" && (
                    <p className="text-sm text-clay-deep">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-evergreen px-6 py-3.5 font-medium text-cream transition-colors hover:bg-pine disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Request my call"}
                    {status !== "submitting" && (
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <p className="text-center text-xs text-stone-soft">
                    We&apos;ll only use this to schedule your call. No spam, ever.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required,
  textarea,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const base =
    "w-full rounded-xl border border-evergreen/12 bg-paper px-4 py-3 text-evergreen placeholder:text-stone-soft/70 outline-none transition-colors focus:border-pine focus:ring-2 focus:ring-jade/20";
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-evergreen">
        {label}
        {required && <span className="text-clay"> *</span>}
      </span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} rows={3} className={`${base} resize-none`} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} required={required} className={base} />
      )}
    </label>
  );
}

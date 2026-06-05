"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/lib/supabase";

const employeeOptions = ["1–10", "11–50", "51–100", "101–250", "250+"];
type Status = "idle" | "submitting" | "done" | "error";

const ease = [0.22, 1, 0.36, 1] as const;

export function BookSlide() {
  const [status, setStatus] = useState<Status>("idle");
  const [employeeCount, setEmployeeCount] = useState("");
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
      message: null,
      source: "expo-sf-flow",
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
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-6 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-jade/15"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4.5 4.5L19 7" stroke="var(--color-pine)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
            <h2 className="font-display mt-6 text-3xl font-semibold text-evergreen">
              You&apos;re all set.
            </h2>
            <p className="mt-3 max-w-xs text-stone">
              We&apos;ll reach out shortly to lock in your onboarding call. Keep an
              eye on your inbox.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium uppercase tracking-[0.18em] text-jade"
              >
                Last step
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, ease }}
                className="font-display mt-4 text-balance text-[2rem] font-semibold leading-[1.05] tracking-tight text-evergreen sm:text-4xl"
              >
                Book your onboarding call.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, ease }}
                className="mx-auto mt-3 max-w-sm text-stone"
              >
                No commitment, no cost to find out what this looks like for your
                team.
              </motion.p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, ease }}
              onSubmit={handleSubmit}
              className="mx-auto mt-7 w-full max-w-sm space-y-3"
            >
              <Field name="full_name" placeholder="Full name *" required />
              <Field name="email" type="email" placeholder="Work email *" required />
              <div className="grid grid-cols-2 gap-3">
                <Field name="company" placeholder="Company" />
                <Field name="phone" type="tel" placeholder="Phone" />
              </div>
              <div>
                <span className="mb-2 block text-left text-sm font-medium text-stone">Team size</span>
                <div className="flex flex-wrap gap-2">
                  {employeeOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setEmployeeCount(opt)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                        employeeCount === opt
                          ? "border-pine bg-pine text-cream"
                          : "border-evergreen/15 bg-paper text-stone"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              {status === "error" && <p className="text-sm text-clay-deep">{errorMsg}</p>}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="!mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-evergreen px-6 py-4 font-medium text-cream transition-colors hover:bg-pine disabled:opacity-60"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  name,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-xl border border-evergreen/12 bg-paper px-4 py-3.5 text-evergreen placeholder:text-stone-soft/70 outline-none transition-colors focus:border-pine focus:ring-2 focus:ring-jade/20"
    />
  );
}

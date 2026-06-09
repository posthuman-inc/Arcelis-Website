"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { SLIDES } from "./slides";
import { BookSlide } from "./BookSlide";
import { Logomark } from "../Logo";

const TOTAL = SLIDES.length + 1; // + booking slide
const BOOK_INDEX = SLIDES.length;
const ease = [0.22, 1, 0.36, 1] as const;

const variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? "-35%" : "35%", opacity: 0 }),
};

export function IntakeFlow() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);

  const go = useCallback(
    (next: number, direction: number) => {
      if (next < 0 || next >= TOTAL) return;
      setState([next, direction]);
    },
    []
  );
  const next = useCallback(() => go(index + 1, 1), [index, go]);
  const prev = useCallback(() => go(index - 1, -1), [index, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const isBook = index === BOOK_INDEX;
  const theme = isBook ? "light" : SLIDES[index].theme;
  const dark = theme === "dark";

  function onDragEnd(_: unknown, info: PanInfo) {
    const swipe = info.offset.x;
    const vel = info.velocity.x;
    if (swipe < -70 || vel < -450) next();
    else if (swipe > 70 || vel > 450) prev();
  }

  const chrome = dark ? "text-cream" : "text-evergreen";
  const chromeSoft = dark ? "text-mint/70" : "text-stone-soft";

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Progress tabs — click to jump to a slide */}
      <div className="absolute inset-x-0 top-0 z-40 flex gap-1.5 px-4 pt-4">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i, i >= index ? 1 : -1)}
            aria-label={`Go to step ${i + 1} of ${TOTAL}`}
            aria-current={i === index ? "step" : undefined}
            className="group relative -my-2 flex-1 cursor-pointer py-2"
          >
            <span
              className="block h-1 overflow-hidden rounded-full transition-transform duration-200 group-hover:scale-y-[2]"
              style={{ background: dark ? "rgba(207,227,216,0.22)" : "rgba(17,51,46,0.12)" }}
            >
              <motion.span
                className="block h-full rounded-full"
                style={{ background: dark ? "var(--color-honey)" : "var(--color-jade)" }}
                initial={false}
                animate={{ width: i <= index ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease }}
              />
            </span>
          </button>
        ))}
      </div>

      {/* Header */}
      <div className={`absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-8 transition-colors duration-500 ${chrome}`}>
        <span className="flex items-center gap-2">
          <Logomark className="h-7 w-7" />
          <span className="font-display text-lg font-semibold tracking-tight">Aracelis</span>
        </span>
        {!isBook && (
          <button
            onClick={() => go(BOOK_INDEX, 1)}
            className={`text-sm font-medium transition-opacity hover:opacity-70 ${chromeSoft}`}
          >
            Skip →
          </button>
        )}
      </div>

      {/* Slides */}
      <AnimatePresence custom={dir} initial={false} mode="popLayout">
        <motion.div
          key={index}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { duration: 0.5, ease }, opacity: { duration: 0.3 } }}
          drag="x"
          dragDirectionLock
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={onDragEnd}
          className="absolute inset-0 touch-pan-y"
          style={{ background: dark ? "var(--color-evergreen)" : "var(--color-cream)" }}
        >
          {/* Aurora for dark slides */}
          {dark && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="aurora drift-slow left-[-15%] top-[-10%] h-[45vh] w-[45vh] opacity-30"
                style={{ background: "radial-gradient(circle, var(--color-jade), transparent 70%)" }}
              />
              <div
                className="aurora drift-slower right-[-15%] bottom-[-10%] h-[45vh] w-[45vh] opacity-25"
                style={{ background: "radial-gradient(circle, var(--color-honey), transparent 70%)" }}
              />
            </div>
          )}

          <div className="relative z-10 flex h-full flex-col items-center justify-center overflow-y-auto px-6 py-24">
            <div className="w-full max-w-xl">{isBook ? <BookSlide /> : SLIDES[index].node}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer controls */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 px-5 pb-7">
        <button
          onClick={prev}
          disabled={index === 0}
          className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all disabled:opacity-0 ${
            dark ? "border-mint/25 text-cream" : "border-evergreen/15 text-evergreen"
          }`}
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {!isBook ? (
          <button
            onClick={next}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium transition-colors ${
              dark ? "bg-honey text-evergreen hover:bg-amber" : "bg-evergreen text-cream hover:bg-pine"
            }`}
          >
            {index === 0 ? "Show me how" : "Continue"}
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <a
            href="/explore"
            className="flex-1 text-center text-sm font-medium text-stone-soft transition-opacity hover:opacity-70"
          >
            Or explore the full details ↗
          </a>
        )}

        {/* spacer to balance the back button */}
        <div className="h-12 w-12 shrink-0" aria-hidden />
      </div>
    </div>
  );
}

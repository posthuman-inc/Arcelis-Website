import { Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-evergreen/10 px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone">
            Section 125 wellness plans for small business. Better healthcare,
            bigger paychecks, lower payroll tax. Powered by Patriot Preventive
            Care.
          </p>
        </div>
        <a
          href="#book"
          className="inline-flex items-center gap-2 rounded-full bg-evergreen px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-pine"
        >
          Book your call
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-evergreen/8 pt-6 text-xs text-stone-soft sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Aracelis. All rights reserved.</span>
        <span className="max-w-lg">
          Figures shown are illustrative examples for education only and are not
          tax advice. Actual results depend on your census and are confirmed
          during onboarding.
        </span>
      </div>
    </footer>
  );
}

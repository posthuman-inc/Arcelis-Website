export function Logomark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Arcelis"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield body */}
      <path
        d="M24 3.5c5.6 2.8 11 4 16.5 4.2 1.1 0 2 .9 2 2v12.1c0 11.2-6.9 19.6-17.7 23.8a2.2 2.2 0 0 1-1.6 0C12.4 41.4 5.5 33 5.5 21.8V9.7c0-1.1.9-2 2-2C13 7.5 18.4 6.3 24 3.5Z"
        fill="var(--color-evergreen)"
      />
      {/* Rising arc — the "arc" in Arcelis */}
      <path
        d="M14.5 30c2.2-7.6 6.6-12 9.5-12s7.3 4.4 9.5 12"
        stroke="var(--color-mint)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Spark / pulse dot */}
      <circle cx="24" cy="16.5" r="2.6" fill="var(--color-honey)" />
    </svg>
  );
}

export function Wordmark({
  className = "",
  showMark = true,
}: {
  className?: string;
  showMark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {showMark && <Logomark className="h-8 w-8" />}
      <span className="font-display text-[1.45rem] font-semibold tracking-tight text-evergreen leading-none">
        Arcelis
      </span>
    </span>
  );
}

const items = [
  "Virtual Primary Care",
  "24/7 Urgent Care · $0 copay",
  "Mental Health Therapy",
  "Unlimited RN Health Coaching",
  "$0 on 70 common prescriptions",
  "Diabetes Prevention",
  "Wearable sync · Apple · Fitbit · Garmin",
  "Employee Assistance Program",
];

export function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-evergreen/8 bg-paper/50 py-4">
      <div className="marquee-track gap-10 whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center gap-10" aria-hidden={dup === 1}>
            {items.map((it) => (
              <span
                key={it}
                className="flex items-center gap-3 text-sm font-medium text-stone"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-honey" />
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

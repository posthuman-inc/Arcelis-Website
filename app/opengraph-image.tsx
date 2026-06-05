import { ImageResponse } from "next/og";

export const alt =
  "Aracelis — Better healthcare. Bigger paychecks. At no net cost.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Logomark drawn inline (hardcoded hex since CSS vars don't resolve in a data URI).
const logoSvg = `<svg viewBox="0 0 48 48" width="96" height="96" xmlns="http://www.w3.org/2000/svg">
<path d="M24 3.5c5.6 2.8 11 4 16.5 4.2 1.1 0 2 .9 2 2v12.1c0 11.2-6.9 19.6-17.7 23.8a2.2 2.2 0 0 1-1.6 0C12.4 41.4 5.5 33 5.5 21.8V9.7c0-1.1.9-2 2-2C13 7.5 18.4 6.3 24 3.5Z" fill="#11332e"/>
<path d="M14.5 30c2.2-7.6 6.6-12 9.5-12s7.3 4.4 9.5 12" stroke="#cfe3d8" stroke-width="3" stroke-linecap="round" fill="none"/>
<circle cx="24" cy="16.5" r="2.6" fill="#e0a24b"/>
</svg>`;
const logoDataUri = `data:image/svg+xml,${encodeURIComponent(logoSvg)}`;

const chips = [
  { label: "+$92.58 / mo take-home", dot: "#d98a2b" },
  { label: "$0 copay care", dot: "#117a65" },
  { label: "~1 hour setup", dot: "#e8674c" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#f8f5ef",
          backgroundImage:
            "radial-gradient(900px circle at 0% 0%, rgba(17,122,101,0.20), transparent 45%), radial-gradient(900px circle at 100% 100%, rgba(224,162,75,0.22), transparent 45%), radial-gradient(700px circle at 90% 8%, rgba(232,103,76,0.12), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoDataUri} width={84} height={84} alt="" />
          <div
            style={{
              fontSize: 46,
              fontWeight: 700,
              color: "#11332e",
              letterSpacing: -1,
            }}
          >
            Aracelis
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -2.5,
            color: "#11332e",
          }}
        >
          <span>Better healthcare.</span>
          <span style={{ color: "#117a65" }}>Bigger paychecks.</span>
          <span>At no net cost.</span>
        </div>

        {/* Chips + footer */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", gap: 16 }}>
            {chips.map((c) => (
              <div
                key={c.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 24px",
                  borderRadius: 999,
                  backgroundColor: "#fffdf8",
                  border: "1px solid rgba(17,51,46,0.10)",
                  fontSize: 28,
                  fontWeight: 600,
                  color: "#11332e",
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    backgroundColor: c.dot,
                  }}
                />
                {c.label}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5b6b64" }}>
            Section 125 wellness plan · Powered by Patriot Preventive Care
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

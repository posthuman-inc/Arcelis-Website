import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const shieldSvg = `<svg viewBox="0 0 48 48" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
<path d="M24 3.5c5.6 2.8 11 4 16.5 4.2 1.1 0 2 .9 2 2v12.1c0 11.2-6.9 19.6-17.7 23.8a2.2 2.2 0 0 1-1.6 0C12.4 41.4 5.5 33 5.5 21.8V9.7c0-1.1.9-2 2-2C13 7.5 18.4 6.3 24 3.5Z" fill="#11332e"/>
<path d="M14.5 30c2.2-7.6 6.6-12 9.5-12s7.3 4.4 9.5 12" stroke="#cfe3d8" stroke-width="3" stroke-linecap="round" fill="none"/>
<circle cx="24" cy="16.5" r="2.6" fill="#e0a24b"/>
</svg>`;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f5ef",
          borderRadius: 14,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml,${encodeURIComponent(shieldSvg)}`}
          width={44}
          height={44}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}

import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

// metadataBase makes og:image / twitter:image absolute. VERCEL_PROJECT_PRODUCTION_URL
// is only injected by Vercel's own build infra, NOT by a local `vercel build`, so we
// fall back to the known production URL for any production build.
const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NODE_ENV === "production"
    ? "https://arcelis-website-alpha.vercel.app"
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Arcelis — Better healthcare. Bigger paychecks. No net cost.",
  description:
    "Arcelis sets your company up with a Section 125 wellness plan in about an hour. Employees take home more, the company saves on payroll tax, and your team gets real preventive care. Book your onboarding call.",
  openGraph: {
    title: "Arcelis — Better healthcare. Bigger paychecks. No net cost.",
    description:
      "A Section 125 wellness plan that pays for itself. One painless hour to set up. Book your onboarding call.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#11332e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

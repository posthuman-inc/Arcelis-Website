# Aracelis — Section 125 Expo Intake

Mobile-first, animated landing page for the San Francisco Small Business Expo.
Someone walks the floor with a QR code → prospect scans → lands here → learns
how a Section 125 wellness plan benefits them → books an onboarding call. This
is **stage zero**: educate and capture, then close on the call.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design tokens in [`app/globals.css`](app/globals.css))
- **Motion** (Framer Motion) for all animation
- **Supabase** for lead capture

## Local dev

```bash
npm install
npm run dev          # http://localhost:3000
```

Requires `.env.local` (already present locally, git-ignored):

```
NEXT_PUBLIC_SUPABASE_URL=https://qgcxitrxxishmhwdfkxz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

These are browser-safe publishable keys. The form can only **insert** into
`public.leads` (RLS: anon insert-only, no read). See `.env.example`.

## Deploy to Vercel

1. Push to GitHub, import the repo in Vercel (framework auto-detects Next.js).
2. Add the two env vars above under **Project → Settings → Environment
   Variables** (Production + Preview).
3. Deploy. Point the QR code at the production URL.

## Leads

Captured rows live in the Supabase **Arcelis Website** project
(`qgcxitrxxishmhwdfkxz`), table `public.leads`. Columns: `full_name`,
`company`, `email`, `phone`, `employee_count`, `message`, `source`
(`expo-sf`), `user_agent`, `referrer`, `created_at`. View them in the Supabase
dashboard. The public anon key cannot read them back.

## Structure

| Section | File |
| --- | --- |
| Sticky nav | [`components/Nav.tsx`](components/Nav.tsx) |
| Hero | [`components/Hero.tsx`](components/Hero.tsx) |
| Service marquee | [`components/Marquee.tsx`](components/Marquee.tsx) |
| Everybody wins | [`components/TripleWin.tsx`](components/TripleWin.tsx) |
| Paycheck example | [`components/Paycheck.tsx`](components/Paycheck.tsx) |
| Savings calculator | [`components/SavingsCalculator.tsx`](components/SavingsCalculator.tsx) |
| Care bundle (Patriot) | [`components/Services.tsx`](components/Services.tsx) |
| How it works | [`components/HowItWorks.tsx`](components/HowItWorks.tsx) |
| Lead form | [`components/LeadForm.tsx`](components/LeadForm.tsx) |

## A note on the numbers

Figures (e.g. +$92.58/mo take-home, ~$682/yr employer savings per head) are
drawn from the Patriot Preventive Care deck and shown as **illustrative
examples** with disclaimers. The pre-tax FICA-savings mechanism is established
tax law; exact results depend on the client's census and are modeled live on
the onboarding call. Copy intentionally avoids guaranteeing tax-free outcomes.

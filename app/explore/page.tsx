import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { TripleWin } from "@/components/TripleWin";
import { Paycheck } from "@/components/Paycheck";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Arcelis — The full picture",
  description:
    "Everything about the Arcelis Section 125 wellness plan: how everybody wins, the paycheck math, the care bundle, and how to get started.",
};

export default function Explore() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <TripleWin />
      <Paycheck />
      <SavingsCalculator />
      <Services />
      <HowItWorks />
      <LeadForm />
      <Footer />
    </main>
  );
}

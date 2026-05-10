"use client";

import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import CardTilt from "@/components/ui/CardTilt";
import { ArrowRight, Mountain, Camera, Wind, CheckCircle2 } from "lucide-react";

const features = [
  { icon: Mountain, title: "Zero Scaffolding", desc: "Eliminate costly scaffolding setup. Our robots climb and inspect structures directly." },
  { icon: Camera, title: "Precision Imaging", desc: "High-resolution cameras capture structural details from every elevation angle." },
  { icon: Wind, title: "Wind-Resistant", desc: "Engineered to operate in exposed, high-wind environments safely." },
  { icon: CheckCircle2, title: "Full Reports", desc: "Digital inspection reports with annotated imagery delivered same-day." },
];

const useCases = ["Bridges & Overpasses", "Chimneys & Stacks", "Wind Turbines", "Transmission Towers", "Building Facades", "Dam Walls", "Monument Inspection", "Telecom Towers"];

export default function Page() {
  return (
    <>
      <PageHero badge="SOLUTIONS" title="Height & Aerial Inspection" subtitle="Bridges, chimneys, wind turbines, skyscrapers — our robots inspect at elevation without scaffolding, rope access, or human risk." />
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>The Challenge</h2>
          <p className="text-lg max-w-3xl mb-12 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Inspecting structures at height is expensive, dangerous, and time-consuming. Traditional methods require scaffolding, rope access, or cranes — all with significant cost and risk. Our height-adapted robots eliminate these barriers entirely.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <CardTilt key={f.title}>
                <div className="rounded-2xl p-6 h-full" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4"><f.icon size={22} className="text-accent" /></div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
                </div>
              </CardTilt>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>Applications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {useCases.map((uc) => (
              <div key={uc} className="rounded-xl p-4 text-center text-sm font-medium" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>{uc}</div>
            ))}
          </div>
          <div className="mt-12 text-center"><MagneticButton variant="filled" size="lg" href="/contact">Schedule Assessment <ArrowRight size={16} /></MagneticButton></div>
        </div>
      </section>
    </>
  );
}

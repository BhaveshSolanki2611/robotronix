"use client";

import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import CardTilt from "@/components/ui/CardTilt";
import { ArrowRight, FlaskConical, ShieldAlert, Thermometer, CheckCircle2 } from "lucide-react";

const features = [
  { icon: FlaskConical, title: "Chemical Resistant", desc: "Robots built with corrosion-resistant materials for harsh chemical environments." },
  { icon: ShieldAlert, title: "ATEX Compliant", desc: "Designed for explosive atmosphere zones with intrinsic safety standards." },
  { icon: Thermometer, title: "Extreme Temperatures", desc: "Operating range from -20°C to 120°C in various industrial environments." },
  { icon: CheckCircle2, title: "Gas Detection", desc: "Integrated gas sensors for real-time toxic and combustible gas monitoring." },
];

const useCases = ["Chemical Refineries", "Acid Storage Tanks", "Nuclear Adjacents", "Waste Treatment", "Pharmaceutical Plants", "Fertilizer Plants", "Gas Processing", "Paint & Coating Facilities"];

export default function Page() {
  return (
    <>
      <PageHero badge="SOLUTIONS" title="Chemical & Toxic Environments" subtitle="Chemical plants, refineries, nuclear adjacents — our robots absorb the risk so your people don't have to." badgeColor="var(--accent-secondary)" />
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>The Challenge</h2>
          <p className="text-lg max-w-3xl mb-12 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Hazardous chemical environments present extreme risks to human inspectors — toxic gases, corrosive substances, explosive atmospheres, and extreme temperatures. Our specialized HAZMAT robots operate safely in conditions that would be lethal to humans.
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
            {useCases.map((uc) => (<div key={uc} className="rounded-xl p-4 text-center text-sm font-medium" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>{uc}</div>))}
          </div>
          <div className="mt-12 text-center"><MagneticButton variant="filled" size="lg" href="/contact">Discuss Your Environment <ArrowRight size={16} /></MagneticButton></div>
        </div>
      </section>
    </>
  );
}

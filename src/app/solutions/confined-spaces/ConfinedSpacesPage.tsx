"use client";

import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import CardTilt from "@/components/ui/CardTilt";
import { ArrowRight, Shield, Eye, Gauge, CheckCircle2 } from "lucide-react";

const features = [
  { icon: Shield, title: "Zero Human Risk", desc: "Robots replace humans in IDLH (Immediately Dangerous to Life or Health) spaces." },
  { icon: Eye, title: "360° Visual Inspection", desc: "HD cameras with LED lighting capture every angle inside tanks and vessels." },
  { icon: Gauge, title: "NDT Integration", desc: "Ultrasonic thickness, magnetic particle, and visual testing — all in one deployment." },
  { icon: CheckCircle2, title: "Real-Time Streaming", desc: "Live video feed to operators outside the confined space for instant analysis." },
];

const useCases = ["Storage Tanks", "Boiler Drums", "Pressure Vessels", "Underground Tunnels", "Sewer Pipelines", "HVAC Ductwork", "Ship Ballast Tanks", "Reactor Vessels"];

export default function ConfinedSpacesPage() {
  return (
    <>
      <PageHero
        badge="SOLUTIONS"
        title="Confined Space Inspection"
        subtitle="Our patent-granted robots navigate where humans legally cannot — tanks, tunnels, sewers, and ducts — delivering comprehensive inspection data without risk."
      />

      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>The Challenge</h2>
          <p className="text-lg max-w-3xl mb-12 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Confined space entry remains one of the most dangerous industrial activities. Every year, workers are injured or killed inspecting tanks, vessels, and underground infrastructure. Traditional methods require extensive safety protocols, permits, and hazmat gear — yet risk persists.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <CardTilt key={f.title}>
                <div className="rounded-2xl p-6 h-full" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                    <f.icon size={22} className="text-accent" />
                  </div>
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
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>Use Cases</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {useCases.map((uc) => (
              <div key={uc} className="rounded-xl p-4 text-center text-sm font-medium" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                {uc}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <MagneticButton variant="filled" size="lg" href="/contact">
              Get a Free Assessment <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}

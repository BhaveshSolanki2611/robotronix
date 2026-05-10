"use client";

import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import CardTilt from "@/components/ui/CardTilt";
import { ArrowRight, Scan, Waves, Magnet, Eye } from "lucide-react";

const features = [
  { icon: Scan, title: "Ultrasonic Testing", desc: "Measure wall thickness and detect internal flaws without surface contact damage." },
  { icon: Waves, title: "Acoustic Emission", desc: "Detect active defects and leaks through sound wave analysis in real time." },
  { icon: Magnet, title: "Magnetic Particle", desc: "Surface and near-surface crack detection using magnetic field principles." },
  { icon: Eye, title: "Visual Inspection", desc: "High-definition visual inspection with zoom, pan, and digital documentation." },
];

const methods = ["Ultrasonic Thickness (UT)", "Magnetic Particle (MPI)", "Visual Testing (VT)", "Eddy Current Testing", "Radiographic Testing", "Phased Array UT", "Remote Visual (RVI)", "Thermography"];

export default function Page() {
  return (
    <>
      <PageHero badge="SOLUTIONS" title="NDT Inspection Services" subtitle="Ultrasonic, magnetic particle, and visual inspection without dismantling assets. Comprehensive non-destructive testing powered by robotics." />
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>Our NDT Capabilities</h2>
          <p className="text-lg max-w-3xl mb-12 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Non-Destructive Testing is critical for maintaining asset integrity without causing damage. Our robotic platforms integrate multiple NDT methods into a single deployment, reducing inspection time by up to 80% while improving data quality.
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
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>Testing Methods</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {methods.map((m) => (<div key={m} className="rounded-xl p-4 text-center text-sm font-medium" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>{m}</div>))}
          </div>
          <div className="mt-12 text-center"><MagneticButton variant="filled" size="lg" href="/contact">Request NDT Quote <ArrowRight size={16} /></MagneticButton></div>
        </div>
      </section>
    </>
  );
}

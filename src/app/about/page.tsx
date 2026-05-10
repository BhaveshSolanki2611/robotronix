"use client";

import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import CountUp from "@/components/ui/CountUp";
import { ArrowRight, Target, Eye, Heart, Lightbulb } from "lucide-react";

const values = [
  { icon: Target, title: "Mission-Driven", desc: "Every robot we build serves one purpose: keeping humans safe in hazardous environments." },
  { icon: Eye, title: "Innovation First", desc: "We hold 3 granted patents with more pending — innovation is in our DNA." },
  { icon: Heart, title: "Social Impact", desc: "We prioritize sustainability, inclusivity, and environmental responsibility." },
  { icon: Lightbulb, title: "Indian Engineering", desc: "Proving that world-class robotics can be designed and built in India." },
];

const timeline = [
  { year: "2018", title: "Founded", desc: "Robotronix and Scalability Technology (P) LTD incorporated in Gurgaon, Haryana." },
  { year: "2019", title: "First Patent Filed", desc: "Filed our first patent for confined space robotic navigation systems." },
  { year: "2020", title: "First Commercial Deployment", desc: "Successfully deployed robots for tank inspection in the oil & gas sector." },
  { year: "2021", title: "Patent Granted", desc: "Received our first patent grant from the Indian Patent Office." },
  { year: "2022", title: "Expanded to 3 Sectors", desc: "Operations expanded to power, petrochemical, and infrastructure sectors." },
  { year: "2023", title: "Third Patent Granted", desc: "Received third patent for hazardous environment sensor arrays." },
  { year: "2024", title: "Pay-As-You-Go Launch", desc: "Launched our revolutionary pay-as-you-go robotics deployment model." },
];

export default function Page() {
  return (
    <>
      <PageHero badge="ABOUT US" title="Made in India for the World" subtitle="We are Robotronix — pioneers in patent-granted robotics for hazardous environments. Founded in 2018 in Gurgaon, Haryana, we're redefining industrial safety." />

      {/* Stats */}
      <section className="py-16" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { val: 6, suf: "+", label: "Years of Innovation" },
            { val: 3, suf: "", label: "Patents Granted" },
            { val: 100, suf: "%", label: "Safe Missions" },
            { val: 5, suf: "+", label: "Team Members" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}><CountUp target={s.val} suffix={s.suf} /></div>
              <div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>Our Mission</h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              To disrupt the status quo and redefine the potential of robotics worldwide. Through our patented solutions and flexible pay-as-you-go model, we empower businesses to embrace automation while prioritizing safety, efficiency, and innovation.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>Our Vision</h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              To seamlessly integrate robotics into mission-critical operations, setting new standards for excellence. Our robots excel in navigating, conquering, and thriving in hazardous environments, surpassing the limitations of traditional methods.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "var(--font-display)" }}>Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl p-6 text-center" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="w-14 h-14 mx-auto rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4"><v.icon size={24} className="text-accent" /></div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "var(--font-display)" }}>Our Journey</h2>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-8 top-0 bottom-0 w-px" style={{ backgroundColor: "var(--border)" }} />
            {timeline.map((t) => (
              <div key={t.year} className="flex gap-8 mb-10 relative">
                <div className="shrink-0 w-16 text-right">
                  <span className="text-sm font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}>{t.year}</span>
                </div>
                <div className="absolute left-[30px] top-1.5 w-3 h-3 rounded-full bg-accent border-2" style={{ borderColor: "var(--bg-primary)" }} />
                <div className="pb-2">
                  <h3 className="font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>{t.title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>Our Headquarters</h2>
          <p className="text-lg mb-6" style={{ color: "var(--text-secondary)" }}>Gurgaon, Haryana 122011, India</p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton variant="filled" href="https://www.bing.com/maps?where=Gurgaon%2C%20Haryana%20122011%2C%20IN">Get Directions <ArrowRight size={16} /></MagneticButton>
            <MagneticButton variant="ghost" href="/contact">Contact Us <ArrowRight size={16} /></MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}

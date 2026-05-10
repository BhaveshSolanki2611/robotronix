"use client";

import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import CardTilt from "@/components/ui/CardTilt";
import CountUp from "@/components/ui/CountUp";
import { ArrowRight, Check, Zap, Shield, HeadphonesIcon, IndianRupee, Clock, BarChart3 } from "lucide-react";

const benefits = [
  { icon: IndianRupee, title: "Zero CAPEX", desc: "No upfront equipment purchase. Deploy robotics without capital expenditure." },
  { icon: Clock, title: "Flexible Duration", desc: "Per-mission, per-day, or subscription pricing — choose what fits your operations." },
  { icon: HeadphonesIcon, title: "Full Support", desc: "Our trained operators deploy, operate, and maintain the robots on-site." },
  { icon: BarChart3, title: "Digital Reports", desc: "Real-time data streaming and comprehensive digital inspection reports." },
  { icon: Shield, title: "Insured Operations", desc: "All deployments fully insured. Zero liability on your team." },
  { icon: Zap, title: "Rapid Deployment", desc: "Robots deployed within 48 hours of site assessment completion." },
];

const steps = [
  { num: "01", title: "Inquiry", desc: "Tell us about your site, environment, and inspection requirements." },
  { num: "02", title: "Assessment", desc: "Our team evaluates your site and recommends the optimal robot configuration." },
  { num: "03", title: "Quote", desc: "Receive a transparent, no-obligation quote based on mission scope." },
  { num: "04", title: "Deploy", desc: "Our certified operators deploy the robot and execute the inspection." },
  { num: "05", title: "Report", desc: "Receive comprehensive digital reports with actionable insights." },
];

export default function Page() {
  return (
    <>
      <PageHero badge="PLATFORM" title="Pay-As-You-Go Robotics" subtitle="Innovation shouldn't be locked behind CAPEX. Our flexible deployment model lets you access world-class robotic inspection without owning the equipment." />

      {/* Stats */}
      <section className="py-16" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div><div className="text-4xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}><CountUp target={80} suffix="%" /></div><div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Cost Reduction vs. Traditional</div></div>
          <div><div className="text-4xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}><CountUp target={48} suffix="h" /></div><div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Deployment Time</div></div>
          <div><div className="text-4xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}><CountUp target={100} suffix="%" /></div><div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Safe Missions</div></div>
          <div><div className="text-4xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}><CountUp target={0} suffix="" prefix="₹" /></div><div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Upfront Investment</div></div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "var(--font-display)" }}>Why Pay-As-You-Go?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <CardTilt key={b.title}>
                <div className="rounded-2xl p-6 h-full" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4"><b.icon size={22} className="text-accent" /></div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{b.desc}</p>
                </div>
              </CardTilt>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "var(--font-display)" }}>How It Works</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-6 items-start">
                <div className="text-4xl font-bold shrink-0 w-16 text-accent/20" style={{ fontFamily: "var(--font-display)" }}>{s.num}</div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12"><MagneticButton variant="filled" size="lg" href="/contact">Get Your Quote <ArrowRight size={16} /></MagneticButton></div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>Traditional vs. Robotronix</h2>
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            {[
              ["Factor", "Traditional", "Robotronix"],
              ["Upfront Cost", "₹₹₹₹ High CAPEX", "₹0 — Pay per mission"],
              ["Human Risk", "High — confined entry", "Zero — robotic access"],
              ["Inspection Time", "Days to weeks", "Hours to 1 day"],
              ["Data Quality", "Manual notes", "Digital HD reports"],
              ["Equipment Ownership", "You maintain", "We handle everything"],
              ["Scalability", "Limited by team", "On-demand scaling"],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 gap-0" style={{ borderBottom: i < 6 ? "1px solid var(--border)" : "none" }}>
                {row.map((cell, j) => (
                  <div key={j} className="p-4 text-sm" style={{
                    backgroundColor: i === 0 ? "var(--bg-card)" : "transparent",
                    fontWeight: i === 0 || j === 0 ? 600 : 400,
                    color: j === 2 && i > 0 ? "var(--accent-primary)" : i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                    fontFamily: i === 0 ? "var(--font-display)" : "var(--font-body)",
                    borderRight: j < 2 ? "1px solid var(--border)" : "none",
                  }}>
                    {j === 2 && i > 0 && <Check size={14} className="inline mr-1" />}{cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

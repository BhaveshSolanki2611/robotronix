"use client";

import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight, Calendar } from "lucide-react";

const newsItems = [
  { slug: "third-patent", category: "PRESS RELEASE", date: "March 2024", title: "Robotronix Secures Third Patent for Hazardous Environment Robotics", excerpt: "The latest patent covers an innovative multi-sensor robotic system for chemically hazardous environments with real-time monitoring capabilities." },
  { slug: "refinery-case-study", category: "CASE STUDY", date: "January 2024", title: "How We Reduced Inspection Time by 80% at a Major Refinery", excerpt: "A deep dive into our deployment at one of India's largest refineries, achieving unprecedented inspection efficiency and safety." },
  { slug: "future-of-ndt", category: "TECHNOLOGY", date: "November 2023", title: "The Future of NDT: Why Robotic Inspection is the Next Frontier", excerpt: "An exploration of how robotic non-destructive testing is revolutionizing industrial asset management across critical sectors." },
  { slug: "payg-launch", category: "ANNOUNCEMENT", date: "September 2023", title: "Robotronix Launches Pay-As-You-Go Robotics Model", excerpt: "Breaking the CAPEX barrier — our new flexible deployment model makes cutting-edge robotic inspection accessible to organizations of all sizes." },
  { slug: "power-sector-expansion", category: "PRESS RELEASE", date: "June 2023", title: "Robotronix Expands Operations to Power Sector", excerpt: "Partnership with major power utilities to bring robotic boiler and turbine inspection to thermal power plants across India." },
  { slug: "second-patent", category: "PRESS RELEASE", date: "January 2023", title: "Second Patent Granted: Height-Adaptive Inspection Platform", excerpt: "Our innovative climbing robot platform for performing NDT at extreme heights receives patent grant from Indian Patent Office." },
];

const categoryColors: Record<string, string> = {
  "PRESS RELEASE": "var(--accent-primary)",
  "CASE STUDY": "var(--accent-secondary)",
  "TECHNOLOGY": "#4facfe",
  "ANNOUNCEMENT": "#a78bfa",
};

export default function Page() {
  return (
    <>
      <PageHero badge="NEWS & INSIGHTS" title="Latest from Robotronix" subtitle="Press releases, technology insights, and industry perspectives from India's leading robotics company." />

      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => {
              const color = categoryColors[item.category] || "var(--accent-primary)";
              return (
                <Link key={item.slug} href={`/news/${item.slug}`} className="block rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-500" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }} data-cursor-text="READ">
                  <div className="h-40 relative" style={{ background: `linear-gradient(135deg, var(--bg-secondary) 0%, ${color}15 100%)` }}>
                    <div className="absolute inset-0 flex items-center justify-center"><span className="text-3xl font-bold text-accent/20" style={{ fontFamily: "var(--font-display)" }}>RST</span></div>
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}30` }}>{item.category}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs mb-3" style={{ color: "var(--text-muted)" }}><Calendar size={12} />{item.date}</div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: "var(--text-secondary)" }}>{item.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">Read More <ArrowRight size={14} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

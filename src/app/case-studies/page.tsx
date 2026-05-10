"use client";

import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight, Calendar } from "lucide-react";

const caseStudies = [
  { slug: "refinery-tank-inspection", title: "80% Faster Tank Inspection at Major Indian Refinery", category: "Oil & Gas", date: "January 2024", excerpt: "How Robotronix deployed confined space robots to inspect 12 storage tanks in 3 days, reducing traditional inspection time from 15 days to just 3.", results: ["80% time reduction", "Zero safety incidents", "100% coverage achieved"] },
  { slug: "power-plant-boiler", title: "Zero-Downtime Boiler Inspection for 500MW Power Plant", category: "Power", date: "October 2023", excerpt: "Our height-adapted robots inspected boiler internals during a planned 48-hour outage window, providing comprehensive NDT data.", results: ["48-hour turnaround", "3 critical defects found", "₹2Cr savings in avoided unplanned outage"] },
  { slug: "chemical-reactor-assessment", title: "Safe Reactor Vessel Assessment in HAZMAT Conditions", category: "Petrochemical", date: "July 2023", excerpt: "Deploying chemical-resistant robots inside a live petrochemical reactor vessel for internal corrosion mapping.", results: ["Zero human entry required", "Full corrosion map generated", "Regulatory compliance achieved"] },
  { slug: "bridge-structural-inspection", title: "Highway Bridge Underside Inspection Without Lane Closure", category: "Infrastructure", date: "March 2023", excerpt: "Inspecting the underside of a 4-lane highway bridge using climbing robots, avoiding costly lane closures and traffic disruption.", results: ["No traffic disruption", "Structural report in 24hrs", "Government compliance met"] },
];

export default function Page() {
  return (
    <>
      <PageHero badge="CASE STUDIES" title="Real Results, Real Impact" subtitle="See how Robotronix is transforming industrial inspection across India's most critical sectors." />

      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          <div className="space-y-8">
            {caseStudies.map((cs) => (
              <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="block rounded-2xl p-8 lg:p-10 group hover:border-accent/40 transition-all" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }} data-cursor-text="READ">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "rgba(0,212,255,0.1)", color: "var(--accent-primary)", border: "1px solid rgba(0,212,255,0.2)" }}>{cs.category}</span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}><Calendar size={12} />{cs.date}</span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-accent transition-colors" style={{ fontFamily: "var(--font-display)" }}>{cs.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{cs.excerpt}</p>
                    <div className="flex flex-wrap gap-3">
                      {cs.results.map((r) => (<span key={r} className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{r}</span>))}
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center text-accent font-medium text-sm group-hover:gap-3 gap-2 transition-all">Read More <ArrowRight size={14} /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

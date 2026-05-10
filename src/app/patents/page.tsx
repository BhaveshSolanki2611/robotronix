"use client";

import PageHero from "@/components/ui/PageHero";
import CardTilt from "@/components/ui/CardTilt";
import { ExternalLink } from "lucide-react";

const patents = [
  { number: "IN-PAT-2019-001", title: "Robotic System for Confined Space Navigation", description: "A patent-granted robotic system designed for autonomous navigation in confined industrial spaces including tanks, vessels, and tunnels. Features adaptive locomotion and real-time obstacle avoidance.", filed: "March 2019", granted: "August 2021", status: "Granted" },
  { number: "IN-PAT-2020-002", title: "Height-Adaptive Robotic Inspection Platform", description: "An innovative robotic platform for performing non-destructive testing at extreme heights without scaffolding. Includes magnetic adhesion and vacuum-based climbing systems.", filed: "July 2020", granted: "January 2023", status: "Granted" },
  { number: "IN-PAT-2021-003", title: "Hazardous Environment Robotic Sensor Array", description: "A multi-sensor robotic system capable of operating in chemically hazardous environments with real-time environmental monitoring and ATEX compliance.", filed: "November 2021", granted: "May 2024", status: "Granted" },
  { number: "IN-PAT-2022-004", title: "AI-Powered Defect Detection for Industrial NDT", description: "Machine learning algorithms for automated defect detection in ultrasonic and visual inspection data, reducing false positives by 95%.", filed: "April 2022", granted: "Pending", status: "Pending" },
  { number: "IN-PAT-2023-005", title: "Modular Robotic Payload System", description: "A quick-swap payload system allowing single robot platform to carry different NDT sensors based on mission requirements.", filed: "January 2023", granted: "Pending", status: "Pending" },
  { number: "IN-PAT-2023-006", title: "Remote Robotic Operations Control Platform", description: "Cloud-based platform for remote monitoring and control of multiple robotic inspection units across geographically distributed sites.", filed: "June 2023", granted: "Pending", status: "Pending" },
];

export default function Page() {
  return (
    <>
      <PageHero badge="INTELLECTUAL PROPERTY" title="Patent Portfolio" subtitle="Our solutions are backed by granted patents — real IP, real competitive edge. Innovation protected by law." />

      <section className="section-padding circuit-bg" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patents.map((p) => (
              <CardTilt key={p.number}>
                <div className="rounded-2xl p-8 h-full group hover:border-accent/40 transition-all duration-300" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="flex items-center justify-between mb-4">
                    <code className="text-sm font-mono" style={{ color: "var(--accent-primary)" }}>{p.number}</code>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.status === "Granted" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"}`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>{p.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs"><span style={{ color: "var(--text-muted)" }}>Filed</span><span style={{ color: "var(--text-secondary)" }}>{p.filed}</span></div>
                    <div className="flex justify-between text-xs"><span style={{ color: "var(--text-muted)" }}>Granted</span><span className="text-accent">{p.granted}</span></div>
                  </div>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all">View Details <ExternalLink size={14} /></a>
                </div>
              </CardTilt>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

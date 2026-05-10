"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import TextReveal from "@/components/ui/TextReveal";
import { ExternalLink } from "lucide-react";

const patents = [
  {
    number: "IN-PAT-2019-001",
    title: "Robotic System for Confined Space Navigation",
    description: "A patent-granted robotic system designed for autonomous navigation in confined industrial spaces including tanks, vessels, and tunnels.",
    filed: "March 2019",
    granted: "August 2021",
  },
  {
    number: "IN-PAT-2020-002",
    title: "Height-Adaptive Robotic Inspection Platform",
    description: "An innovative robotic platform for performing non-destructive testing at extreme heights without scaffolding or human intervention.",
    filed: "July 2020",
    granted: "January 2023",
  },
  {
    number: "IN-PAT-2021-003",
    title: "Hazardous Environment Robotic Sensor Array",
    description: "A multi-sensor robotic system capable of operating in chemically hazardous environments with real-time environmental monitoring.",
    filed: "November 2021",
    granted: "May 2024",
  },
];

export default function Patents() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".patent-card",
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Blueprint texture */}
      <div className="absolute inset-0 circuit-bg opacity-20 pointer-events-none" />

      <div className="container-wide relative">
        <div className="text-center mb-16">
          <TextReveal as="h2" className="mb-4">
            Innovation Protected by Law
          </TextReveal>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Our solutions are backed by granted patents — real IP, real edge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {patents.map((patent) => (
            <div
              key={patent.number}
              className="patent-card rounded-2xl p-8 group hover:border-accent/40 transition-all duration-500"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
              data-cursor-text="VIEW"
            >
              {/* Patent number */}
              <code
                className="text-sm font-mono mb-4 block"
                style={{ color: "var(--accent-primary)" }}
              >
                {patent.number}
              </code>

              {/* Title */}
              <h3
                className="text-lg font-bold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {patent.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                {patent.description}
              </p>

              {/* Dates */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs">
                  <span style={{ color: "var(--text-muted)" }}>Filed</span>
                  <span style={{ color: "var(--text-secondary)" }}>{patent.filed}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: "var(--text-muted)" }}>Granted</span>
                  <span className="text-accent">{patent.granted}</span>
                </div>
              </div>

              {/* Link */}
              <a
                href="/patents"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
              >
                View Patent <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

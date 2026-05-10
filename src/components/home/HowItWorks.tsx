"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import TextReveal from "@/components/ui/TextReveal";
import { Radar, Cpu, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "ASSESS",
    icon: Radar,
    description: "We analyze your site environment, constraints, and hazard profile to determine the optimal robotic solution.",
    details: ["Environmental scanning", "Risk assessment", "Robot configuration"],
  },
  {
    number: "02",
    title: "DEPLOY",
    icon: Cpu,
    description: "Our patent-granted robot is deployed — configured for your exact environment and operational requirements.",
    details: ["On-site deployment", "Real-time monitoring", "Safety protocols"],
  },
  {
    number: "03",
    title: "REPORT",
    icon: BarChart3,
    description: "Real-time data, inspection reports, and actionable insights delivered digitally for immediate decision-making.",
    details: ["Digital reports", "Actionable insights", "Data analytics"],
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const totalWidth = containerRef.current!.scrollWidth - window.innerWidth;

      // Horizontal scroll
      gsap.to(containerRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Progress bar
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${totalWidth}`,
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Header - fixed during scroll */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-16 lg:pt-20 px-8 lg:px-16">
        <TextReveal as="h2" className="mb-2">
          How Robotronix Works
        </TextReveal>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          Three steps. Zero compromise on safety.
        </p>
      </div>

      {/* Horizontal scrolling container */}
      <div
        ref={containerRef}
        className="flex items-center h-screen pt-32"
        style={{ width: "fit-content" }}
      >
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="flex-shrink-0 w-screen lg:w-[60vw] h-full flex items-center px-8 lg:px-16"
          >
            <div className="w-full max-w-2xl">
              {/* Step number */}
              <div
                className="text-8xl lg:text-9xl font-bold mb-6 opacity-10"
                style={{ fontFamily: "var(--font-display)", color: "var(--accent-primary)" }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  backgroundColor: "rgba(0, 212, 255, 0.1)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                }}
              >
                <step.icon size={28} className="text-accent" />
              </div>

              {/* Title */}
              <h3
                className="text-3xl lg:text-4xl font-bold mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-lg leading-relaxed mb-8 max-w-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                {step.description}
              </p>

              {/* Details */}
              <div className="space-y-3">
                {step.details.map((detail) => (
                  <div
                    key={detail}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute right-0 top-1/2 w-32 h-px"
                  style={{ backgroundColor: "var(--border)" }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-8 right-8 lg:left-16 lg:right-16 z-20">
        <div className="h-1 rounded-full" style={{ backgroundColor: "var(--border)" }}>
          <div
            ref={progressRef}
            className="h-full rounded-full bg-accent origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <div className="flex justify-between mt-3">
          {steps.map((step) => (
            <span key={step.number} className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {step.number} — {step.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

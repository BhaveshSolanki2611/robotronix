"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import CardTilt from "@/components/ui/CardTilt";
import TextReveal from "@/components/ui/TextReveal";
import TextScramble from "@/components/ui/TextScramble";
import { Bot, Mountain, FlaskConical, Scan, ArrowRight } from "lucide-react";

const solutions = [
  {
    icon: Bot,
    title: "Confined Space Inspection",
    description: "Tanks, tunnels, sewers, ducts — our robots go where humans legally cannot.",
    tags: ["Tanks", "Tunnels", "Sewers"],
    href: "/solutions/confined-spaces",
    color: "#00d4ff",
  },
  {
    icon: Mountain,
    title: "Height & Aerial Inspection",
    description: "Bridges, chimneys, wind turbines, skyscrapers — zero scaffolding required.",
    tags: ["Bridges", "Chimneys", "Towers"],
    href: "/solutions/height-inspection",
    color: "#4facfe",
  },
  {
    icon: FlaskConical,
    title: "Chemical & Toxic Environments",
    description: "Chemical plants, refineries, nuclear adjacents — robots absorb the risk.",
    tags: ["Refineries", "Chemical Plants"],
    href: "/solutions/hazmat",
    color: "#ff6b35",
  },
  {
    icon: Scan,
    title: "Non-Destructive Testing",
    description: "Ultrasonic, magnetic particle, and visual inspection without dismantling assets.",
    tags: ["Ultrasonic", "Visual", "Magnetic"],
    href: "/solutions/ndt-inspection",
    color: "#00d4ff",
  },
];

export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".solution-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
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
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <TextScramble
            text="WHERE WE OPERATE"
            className="label-text inline-block mb-4"
            style={{ color: "var(--accent-primary)" }}
          />
          <TextReveal as="h2" className="mb-4">
            Where We Operate
          </TextReveal>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Engineered for the environments others avoid.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((solution) => (
            <CardTilt key={solution.title}>
              <Link
                href={solution.href}
                className="solution-card block relative overflow-hidden rounded-2xl p-8 lg:p-10 group transition-all duration-500"
                data-cursor-text="EXPLORE →"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = solution.color;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${solution.color}22, inset 0 0 30px ${solution.color}08`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${solution.color}15`,
                    border: `1px solid ${solution.color}30`,
                  }}
                >
                  <solution.icon size={24} style={{ color: solution.color }} />
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {solution.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${solution.color}10`,
                        color: solution.color,
                        border: `1px solid ${solution.color}25`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className="flex items-center gap-2 text-sm font-medium transition-colors group-hover:gap-3"
                  style={{ color: solution.color }}
                >
                  Learn More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>

                {/* Background glow */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: solution.color }}
                />
              </Link>
            </CardTilt>
          ))}
        </div>
      </div>
    </section>
  );
}

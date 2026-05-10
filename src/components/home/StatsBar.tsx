"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import CountUp from "@/components/ui/CountUp";

const stats = [
  { value: 6, suffix: "+", label: "Years", sublabel: "in Operation", color: "var(--accent-primary)" },
  { value: 3, suffix: "", label: "Patents", sublabel: "Granted", color: "var(--accent-primary)" },
  { value: 100, suffix: "%", label: "Safe", sublabel: "Missions", color: "var(--accent-primary)" },
  { value: 2018, suffix: "", label: "Founded", sublabel: "Gurgaon, IN", color: "var(--accent-secondary)" },
];

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-20"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-item text-center relative"
            >
              {/* Divider */}
              {index > 0 && (
                <div
                  className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16"
                  style={{ backgroundColor: "var(--border)" }}
                />
              )}

              <div className="text-5xl lg:text-6xl font-bold" style={{ fontFamily: "var(--font-display)", color: stat.color }}>
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                {stat.label}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

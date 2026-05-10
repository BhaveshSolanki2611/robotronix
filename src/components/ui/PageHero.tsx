"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import TextReveal from "@/components/ui/TextReveal";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  badgeColor?: string;
}

export default function PageHero({ badge, title, subtitle, badgeColor = "var(--accent-primary)" }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".page-hero-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out" });
      gsap.fromTo(".page-hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden circuit-bg" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.06), transparent 60%)" }} />
      <div className="container-wide relative">
        {badge && (
          <span className="page-hero-badge inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 border"
            style={{ backgroundColor: `${badgeColor}10`, borderColor: `${badgeColor}30`, color: badgeColor }}>
            {badge}
          </span>
        )}
        <TextReveal as="h1" className="max-w-4xl mb-6">{title}</TextReveal>
        {subtitle && (
          <p className="page-hero-sub text-lg lg:text-xl max-w-2xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

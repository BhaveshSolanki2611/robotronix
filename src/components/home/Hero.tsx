"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import TextReveal from "@/components/ui/TextReveal";
import { ChevronDown, Play } from "lucide-react";

const ParticleField = dynamic(() => import("@/components/ui/ParticleField"), {
  ssr: false,
});

const TICKER_ITEMS = [
  "CONFINED SPACES",
  "EXTREME HEIGHTS",
  "HAZARDOUS CHEMICALS",
  "NDT INSPECTION",
  "PATENT GRANTED",
  "MADE IN INDIA",
  "PAY-AS-YOU-GO",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      if (badgeRef.current) {
        gsap.fromTo(badgeRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
        );
      }

      // CTA buttons
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: "power3.out" }
        );
      }

      // Scroll indicator bounce
      if (scrollIndicatorRef.current) {
        gsap.fromTo(scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, delay: 2, duration: 1 }
        );
      }

      // Parallax grid on scroll
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Particle field */}
      <ParticleField className="absolute inset-0 z-0 opacity-60" />

      {/* Geometric grid overlay */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-[1] pointer-events-none circuit-bg opacity-30"
      />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, var(--bg-primary) 80%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-wide pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div ref={badgeRef}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest border"
              style={{
                backgroundColor: "rgba(255, 107, 53, 0.1)",
                borderColor: "rgba(255, 107, 53, 0.3)",
                color: "var(--accent-secondary)",
                fontFamily: "var(--font-body)",
              }}>
              🇮🇳 Made in India for the World
            </span>
          </div>

          {/* Heading */}
          <TextReveal as="h1" className="mt-8 mb-6" stagger={0.08} y={80}>
            Robots Built For Where Humans Can&apos;t Go.
          </TextReveal>

          {/* Subtext */}
          <TextReveal as="p" className="text-lg lg:text-xl leading-relaxed max-w-xl" stagger={0.03} y={40} delay={0.6}
            style={{ color: "var(--text-secondary)" }}>
            Patent-granted robotics for confined spaces, extreme heights, and toxic environments. Disrupting industrial safety — from India.
          </TextReveal>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mt-10">
            <MagneticButton variant="filled" size="lg" href="/solutions/confined-spaces">
              Explore Solutions →
            </MagneticButton>
            <MagneticButton variant="ghost" size="lg" href="/demo" cursorText="PLAY">
              <Play size={16} className="mr-1" /> Watch Demo
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="label-text text-[10px]" style={{ color: "var(--text-muted)" }}>
          SCROLL
        </span>
        <ChevronDown size={20} className="text-accent animate-bounce-subtle" />
      </div>

      {/* Bottom ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t" style={{ borderColor: "var(--border)" }}>
        <InfiniteMarquee speed={25} className="py-3" pauseOnHover>
          {TICKER_ITEMS.map((item, i) => (
            <span
              key={i}
              className="mx-8 text-xs font-medium uppercase tracking-[0.2em] whitespace-nowrap"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
            >
              {item} •
            </span>
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
}

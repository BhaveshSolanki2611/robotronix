"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRight } from "lucide-react";

export default function MadeInIndia() {
  const sectionRef = useRef<HTMLElement>(null);
  const chakraRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".india-content",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(255,107,53,0.12) 0%, var(--bg-primary) 40%, var(--bg-primary) 60%, rgba(19,136,8,0.08) 100%)",
      }}
    >
      {/* Decorative Ashoka Chakra */}
      <svg
        ref={chakraRef}
        className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.04] animate-spin-slow"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const x1 = Math.round((100 + 20 * Math.cos(angle)) * 100) / 100;
          const y1 = Math.round((100 + 20 * Math.sin(angle)) * 100) / 100;
          const x2 = Math.round((100 + 90 * Math.cos(angle)) * 100) / 100;
          const y2 = Math.round((100 + 90 * Math.sin(angle)) * 100) / 100;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" suppressHydrationWarning />;
        })}
      </svg>

      <div className="container-wide relative">
        <div className="india-content text-center max-w-3xl mx-auto">
          <h2
            className="text-5xl lg:text-7xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Made in <span className="text-gradient-orange">🇮🇳 India</span>
          </h2>
          <h3
            className="text-3xl lg:text-5xl font-bold mb-8"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            For the World
          </h3>
          <p
            className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            From Gurgaon, Haryana — Robotronix is proving that Indian engineering can lead the global robotics revolution. Our patent-granted technology competes with the best in the world.
          </p>
          <MagneticButton variant="outline" size="lg" href="/about">
            Our Story <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

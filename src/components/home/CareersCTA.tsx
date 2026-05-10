"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRight } from "lucide-react";

export default function CareersCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".careers-content",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(0,212,255,0.15), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,107,53,0.1), transparent 60%)",
          animation: "gradient-shift 8s ease infinite",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="container-wide relative">
        <div className="careers-content text-center max-w-2xl mx-auto">
          <span
            className="inline-block px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              backgroundColor: "rgba(0, 212, 255, 0.1)",
              color: "var(--accent-primary)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
            }}
          >
            WE&apos;RE HIRING
          </span>

          <TextReveal as="h2" className="mb-6">
            Join the Robots Revolution
          </TextReveal>

          <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Help us build the machines that make hazardous work safe. We&apos;re looking for engineers, developers, and dreamers.
          </p>

          <MagneticButton variant="filled" size="lg" href="/careers">
            See Open Positions <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

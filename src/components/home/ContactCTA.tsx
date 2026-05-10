"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.querySelectorAll(".contact-line"),
          { y: 100, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-44 overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(255, 107, 53, 0.06) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.04) 0%, transparent 50%)
          `,
          animation: "gradient-shift 10s ease infinite",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="container-wide relative">
        <div ref={textRef} className="text-center">
          <div className="contact-line overflow-hidden">
            <h2
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let&apos;s Deploy
            </h2>
          </div>
          <div className="contact-line overflow-hidden">
            <h2
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-none"
              style={{
                fontFamily: "var(--font-display)",
                color: "transparent",
                WebkitTextStroke: "2px var(--accent-primary)",
              }}
            >
              Together.
            </h2>
          </div>

          <p
            className="contact-line text-lg mt-8 mb-12 max-w-md mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Tell us about your challenge. We&apos;ll bring the robot.
          </p>

          <div className="contact-line flex flex-wrap items-center justify-center gap-4">
            <MagneticButton variant="filled" size="lg" href="/contact">
              Contact Us
            </MagneticButton>
            <MagneticButton variant="ghost" size="lg" href="/contact">
              Schedule Demo
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

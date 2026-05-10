"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import TextReveal from "@/components/ui/TextReveal";
import TextScramble from "@/components/ui/TextScramble";
import MagneticButton from "@/components/ui/MagneticButton";
import CardTilt from "@/components/ui/CardTilt";
import { Check, ArrowRight } from "lucide-react";

const features = [
  "No upfront equipment purchase",
  "Per-mission or per-day pricing",
  "Full technical support included",
];

export default function PayAsYouGo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".payg-content",
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".payg-card",
        { x: 60, opacity: 0, rotateY: 5 },
        {
          x: 0, opacity: 1, rotateY: 0, duration: 1, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left content — 3/5 */}
          <div className="payg-content lg:col-span-3">
            <TextScramble text="FLEXIBLE MODEL" className="label-text inline-block mb-4" style={{ color: "var(--accent-primary)" }} />

            <TextReveal as="h2" className="mb-6">
              Innovation Shouldn&apos;t Be Locked Behind CAPEX
            </TextReveal>

            <p className="text-lg mb-8 max-w-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Our pay-as-you-go model lets you deploy cutting-edge robotics without upfront capital investment. Scale up or down — on your terms.
            </p>

            <div className="space-y-4 mb-10">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-accent" />
                  </div>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <MagneticButton variant="outline" size="md" href="/platform">
              See Pricing Model <ArrowRight size={16} />
            </MagneticButton>
          </div>

          {/* Right card — 2/5 */}
          <div className="payg-card lg:col-span-2">
            <CardTilt>
              <div
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl bg-accent/10" />

                <div className="relative">
                  <div className="text-xs font-medium uppercase tracking-wider mb-6" style={{ color: "var(--accent-primary)" }}>
                    Sample Mission Estimate
                  </div>

                  <div className="space-y-5">
                    <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: "var(--border)" }}>
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Mission Type</span>
                      <span className="text-sm font-medium">Confined Space</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: "var(--border)" }}>
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Duration</span>
                      <span className="text-sm font-medium">2 Days</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: "var(--border)" }}>
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Robot Config</span>
                      <span className="text-sm font-medium">NDT + Visual</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Estimated Cost</span>
                      <span className="text-2xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}>
                        ₹ On Request
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t text-center" style={{ borderColor: "var(--border)" }}>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      * Final pricing depends on site assessment
                    </span>
                  </div>
                </div>
              </div>
            </CardTilt>
          </div>
        </div>
      </div>
    </section>
  );
}

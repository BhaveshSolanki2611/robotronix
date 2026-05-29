"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const statements = [
  "We disrupt the status quo.",
  "We redefine what's possible in robotics.",
  "We build machines that protect human lives.",
];

export default function MissionPin() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Animate each statement
      statements.forEach((_, i) => {
        if (i > 0) {
          tl.fromTo(
            textsRef.current[i],
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 1 },
            i * 2
          );
          tl.to(
            textsRef.current[i - 1],
            { opacity: 0, y: -60, duration: 1 },
            i * 2
          );
        }
        if (i < statements.length - 1) {
          tl.to({}, { duration: 1 }); // Pause on each statement
        }
      });

      // Progress bar
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${window.innerHeight * 3}`,
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full">
      <div
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 8s ease infinite",
        }}
      >
        {/* Progress line on left */}
        <div className="absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 w-px h-48 bg-border">
          <div
            ref={progressRef}
            className="w-full bg-accent origin-top"
            style={{ height: "100%", transform: "scaleY(0)" }}
          />
        </div>

        {/* Text container */}
        <div className="relative container-wide text-center">
          {statements.map((text, i) => (
            <div
              key={i}
              ref={(el) => { if (el) textsRef.current[i] = el; }}
              className={`${i === 0 ? "" : "absolute inset-0 flex items-center justify-center"}`}
            >
              <h2
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold max-w-5xl mx-auto glow-cyan leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {text}
              </h2>
            </div>
          ))}
        </div>

        {/* Subtle geometric decoration */}
        <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import TextReveal from "@/components/ui/TextReveal";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Robotronix transformed how we conduct our confined space inspections. What used to take days with significant safety risks is now completed in hours with zero human exposure.",
    author: "Rajesh Kumar",
    role: "Head of Operations",
    company: "Industrial Solutions Ltd.",
  },
  {
    quote: "The pay-as-you-go model was a game-changer for us. We could access cutting-edge robotic inspection without the massive CAPEX commitment that typically comes with such technology.",
    author: "Priya Sharma",
    role: "VP Engineering",
    company: "PetroChem India",
  },
  {
    quote: "Their patent-granted robots are genuinely world-class. The quality of inspection data we receive is unparalleled, and the safety improvements speak for themselves.",
    author: "Amit Patel",
    role: "Safety Director",
    company: "Power Grid Corp.",
  },
];

const clientLogos = [
  "Industrial Corp", "PetroChem India", "Power Grid Corp", "Defence Works",
  "Steel India", "Infrastructure Ltd", "SafeOps", "TechMfg",
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container-wide">
        <div className="text-center mb-16">
          <TextReveal as="h2" className="mb-4">
            Trusted by India&apos;s Industrial Leaders
          </TextReveal>
        </div>

        {/* Quote carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Quote size={48} className="mx-auto mb-8 opacity-20" style={{ color: "var(--accent-primary)" }} />

          <div className="min-h-[200px] flex items-center justify-center">
            <div
              className="text-center transition-all duration-500"
              key={current}
              style={{ animation: "fadeIn 0.5s ease" }}
            >
              <p
                className="text-2xl lg:text-3xl font-medium leading-relaxed mb-8 italic"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {testimonials[current].author}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {testimonials[current].role}, {testimonials[current].company}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              aria-label="Previous testimonial"
              suppressHydrationWarning
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === current ? "var(--accent-primary)" : "var(--text-muted)",
                    width: i === current ? "24px" : "8px",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  suppressHydrationWarning
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              aria-label="Next testimonial"
              suppressHydrationWarning
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Client logo marquee */}
        <div className="mt-20 border-t pt-12" style={{ borderColor: "var(--border)" }}>
          <InfiniteMarquee speed={35} pauseOnHover>
            {clientLogos.map((logo, i) => (
              <div
                key={i}
                className="mx-10 px-6 py-3 rounded-lg opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                style={{ border: "1px solid var(--border)" }}
              >
                <span className="text-sm font-semibold whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                  {logo}
                </span>
              </div>
            ))}
          </InfiniteMarquee>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRight, Calendar } from "lucide-react";

const newsItems = [
  {
    category: "PRESS RELEASE",
    date: "March 2024",
    title: "Robotronix Secures Third Patent for Hazardous Environment Robotics",
    excerpt: "The latest patent covers an innovative multi-sensor robotic system for chemically hazardous environments with real-time monitoring.",
    href: "/news/third-patent",
    color: "var(--accent-primary)",
  },
  {
    category: "CASE STUDY",
    date: "January 2024",
    title: "How We Reduced Inspection Time by 80% at a Major Refinery",
    excerpt: "A deep dive into our deployment at one of India's largest refineries, achieving unprecedented inspection efficiency and safety.",
    href: "/news/refinery-case-study",
    color: "var(--accent-secondary)",
  },
  {
    category: "TECHNOLOGY",
    date: "November 2023",
    title: "The Future of NDT: Why Robotic Inspection is the Next Frontier",
    excerpt: "An exploration of how robotic non-destructive testing is revolutionizing industrial asset management across critical sectors.",
    href: "/news/future-of-ndt",
    color: "#4facfe",
  },
];

export default function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".news-card",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container-wide">
        <div className="text-center mb-16">
          <TextReveal as="h2" className="mb-4">
            Latest from Robotronix
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="news-card group block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
              data-cursor-text="READ"
            >
              {/* Image placeholder with gradient */}
              <div
                className="h-48 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, var(--bg-secondary) 0%, ${item.color}15 100%)`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-accent/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent/30" style={{ fontFamily: "var(--font-display)" }}>
                      RST
                    </span>
                  </div>
                </div>
                {/* Category badge */}
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  {item.category}
                </span>
              </div>

              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                  <Calendar size={12} />
                  {item.date}
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: "var(--text-secondary)" }}>
                  {item.excerpt}
                </p>

                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <MagneticButton variant="ghost" size="md" href="/news">
            Explore All News <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

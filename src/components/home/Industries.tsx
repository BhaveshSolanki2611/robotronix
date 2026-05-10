"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import TextReveal from "@/components/ui/TextReveal";
import { ArrowRight } from "lucide-react";

const industries = [
  {
    title: "Oil & Gas",
    description: "Pipeline inspection, tank monitoring, and rig safety in extreme conditions.",
    href: "/industries/oil-gas",
    gradient: "from-blue-950 to-cyan-950",
  },
  {
    title: "Power Plants",
    description: "Boiler inspection, turbine monitoring, and chimney assessment without shutdown.",
    href: "/industries/power",
    gradient: "from-orange-950 to-amber-950",
  },
  {
    title: "Petrochemical",
    description: "Reactor vessel inspection, distillation column monitoring, and leak detection.",
    href: "/industries/petrochemical",
    gradient: "from-emerald-950 to-teal-950",
  },
  {
    title: "Infrastructure",
    description: "Bridge assessment, tunnel inspection, and structural integrity monitoring.",
    href: "/industries/infrastructure",
    gradient: "from-slate-900 to-zinc-950",
  },
  {
    title: "Defence",
    description: "Military asset inspection, naval vessel monitoring, and ordnance safety.",
    href: "/industries/defence",
    gradient: "from-green-950 to-emerald-950",
  },
  {
    title: "Manufacturing",
    description: "Production line monitoring, quality inspection, and equipment maintenance.",
    href: "/industries/manufacturing",
    gradient: "from-violet-950 to-indigo-950",
  },
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return;

    const ctx = gsap.context(() => {
      const cards = scrollRef.current!.querySelectorAll(".industry-card");
      gsap.fromTo(
        cards,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container-wide mb-12">
        <TextReveal as="h2" className="mb-4">
          Industries We Serve
        </TextReveal>
        <p className="text-lg max-w-xl" style={{ color: "var(--text-secondary)" }}>
          Trusted across India&apos;s most critical sectors.
        </p>
      </div>

      {/* Horizontal scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-[clamp(1rem,4vw,4rem)]"
        data-cursor-text="← DRAG →"
        style={{ scrollbarWidth: "none" }}
      >
        {industries.map((industry, index) => (
          <Link
            key={industry.title}
            href={industry.href}
            className={`industry-card flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] h-[400px] lg:h-[500px] rounded-2xl overflow-hidden relative group snap-start bg-gradient-to-br ${industry.gradient}`}
            data-cursor-text="EXPLORE →"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />

            {/* Active indicator */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Industry number */}
            <div className="absolute top-6 right-6 text-6xl font-bold opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ fontFamily: "var(--font-display)" }}>
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3
                className="text-3xl lg:text-4xl font-bold mb-3 group-hover:text-accent transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {industry.title}
              </h3>
              <p className="text-sm mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                style={{ color: "var(--text-secondary)" }}>
                {industry.description}
              </p>
              <div className="flex items-center gap-2 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                Explore <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

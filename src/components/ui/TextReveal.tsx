"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { splitTextIntoSpans } from "@/lib/splitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  y?: number;
  splitType?: "words" | "chars" | "both";
  triggerStart?: string;
}

export default function TextReveal({
  children,
  className,
  style,
  as: Tag = "div",
  delay = 0,
  stagger = 0.08,
  y = 60,
  splitType = "words",
  triggerStart = "top 85%",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const el = ref.current;
    const split = splitTextIntoSpans(el, { type: splitType });
    const targets = splitType === "chars" ? split.chars : split.words;

    gsap.set(targets, { y, opacity: 0 });

    const tl = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      split.revert();
    };
  }, [reducedMotion, delay, stagger, y, splitType, triggerStart]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

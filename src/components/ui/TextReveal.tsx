"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
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

function nodeToText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");

  return "";
}

function splitText(text: string, splitType: TextRevealProps["splitType"]) {
  if (splitType === "chars" || splitType === "both") {
    return text.split("").map((char, index) => ({
      key: `${char}-${index}`,
      text: char === " " ? "\u00A0" : char,
    }));
  }

  return text.split(/(\s+)/).map((part, index) => ({
    key: `${part}-${index}`,
    text: part.trim() ? part : "\u00A0",
  }));
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
  const text = useMemo(() => nodeToText(children), [children]);
  const parts = useMemo(() => splitText(text, splitType), [text, splitType]);

  useEffect(() => {
    const el = ref.current;
    const targets = Array.from(el?.querySelectorAll<HTMLElement>("[data-text-reveal-part]") ?? []);

    if (!el || reducedMotion || targets.length === 0) return;

    gsap.set(targets, { y, opacity: 0 });

    const tween = gsap.to(targets, {
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
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [delay, reducedMotion, stagger, triggerStart, y, parts]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={style}>
      {text
        ? parts.map((part) => (
            <span
              key={part.key}
              data-text-reveal-part
              className="inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {part.text}
            </span>
          ))
        : children}
    </Tag>
  );
}

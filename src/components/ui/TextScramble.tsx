"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface TextScrambleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "span" | "p" | "div" | "h3" | "h4";
  duration?: number;
  interval?: number;
  triggerOnView?: boolean;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function TextScramble({
  text,
  className,
  style,
  as: Tag = "span",
  duration = 800,
  interval = 40,
  triggerOnView = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(triggerOnView ? "" : text);
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotion = useReducedMotion();

  const scramble = useCallback(() => {
    const steps = Math.ceil(duration / interval);
    let step = 0;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      step++;
      const progress = step / steps;

      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (i < text.length * progress) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayText(result);

      if (step >= steps && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setDisplayText(text);
      }
    }, interval);
  }, [duration, interval, text]);

  useEffect(() => {
    if (reducedMotion) return;

    if (!triggerOnView) {
      scramble();
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          scramble();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [reducedMotion, scramble, triggerOnView]);

  const renderedText = reducedMotion ? text : displayText;

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={style} data-scramble>
      {renderedText}
    </Tag>
  );
}

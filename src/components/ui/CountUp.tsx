"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export default function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const frameRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const animate = useCallback(() => {
    const startTime = Date.now();

    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = eased * target;
      setCount(Number(current.toFixed(decimals)));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, [decimals, duration, target]);

  useEffect(() => {
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [animate, reducedMotion]);

  const displayCount = reducedMotion ? target : count;

  return (
    <span ref={ref} className={className}>
      {prefix}{displayCount}{suffix}
    </span>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useScrollTrigger(
  callback: (gsapInstance: typeof gsap, st: typeof ScrollTrigger) => (() => void) | void,
  deps: React.DependencyList = []
) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {
      callback(gsap, ScrollTrigger);
    });

    return () => {
      ctx.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctx;
}

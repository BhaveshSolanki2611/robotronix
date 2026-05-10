import { gsap, ScrollTrigger } from "./gsap";

/**
 * Reusable animation presets for consistent motion design.
 */

export const fadeInUp = (
  element: HTMLElement | string,
  options?: { delay?: number; duration?: number; y?: number }
) => {
  return gsap.fromTo(
    element,
    { y: options?.y ?? 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
    }
  );
};

export const staggerReveal = (
  elements: HTMLElement[] | string,
  options?: { stagger?: number; y?: number; trigger?: string | HTMLElement }
) => {
  return gsap.fromTo(
    elements,
    { y: options?.y ?? 80, opacity: 0, scale: 0.95 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: options?.stagger ?? 0.15,
      ease: "power3.out",
      scrollTrigger: options?.trigger
        ? {
            trigger: options.trigger,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        : undefined,
    }
  );
};

export const createTextReveal = (
  words: HTMLElement[],
  trigger: HTMLElement | string,
  options?: { stagger?: number; y?: number }
) => {
  gsap.set(words, { y: options?.y ?? 60, opacity: 0 });
  return gsap.to(words, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: options?.stagger ?? 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
};

export const createParallax = (
  element: HTMLElement | string,
  speed: number = 0.3,
  trigger?: string | HTMLElement
) => {
  return gsap.to(element, {
    y: () => -100 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: trigger || element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

export const createCountUp = (
  element: HTMLElement,
  target: number,
  options?: { duration?: number; suffix?: string; prefix?: string }
) => {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: target,
    duration: options?.duration ?? 2,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = `${options?.prefix ?? ""}${Math.round(obj.val)}${options?.suffix ?? ""}`;
    },
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
};

export const clipPathReveal = (
  element: HTMLElement | string,
  trigger?: string | HTMLElement
) => {
  gsap.set(element, { clipPath: "inset(100% 0 0 0)" });
  return gsap.to(element, {
    clipPath: "inset(0% 0 0 0)",
    duration: 1.2,
    ease: "power4.inOut",
    scrollTrigger: {
      trigger: trigger || element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
};

export const scaleIn = (
  element: HTMLElement | string,
  options?: { trigger?: string | HTMLElement }
) => {
  return gsap.fromTo(
    element,
    { scale: 0.85, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: options?.trigger || element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export { gsap, ScrollTrigger };

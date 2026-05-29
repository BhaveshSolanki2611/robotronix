"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface CursorState {
  text: string;
  isHovering: boolean;
  isHidden: boolean;
  blendMode: boolean;
}

export default function MagneticCursor() {
  const auraRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const isMobile = useIsMobile();
  const mousePos = useRef({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<CursorState>({
    text: "",
    isHovering: false,
    isHidden: false,
    blendMode: false,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };

    if (auraRef.current) {
      gsap.to(auraRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3",
      });
    }

    if (dotRef.current) {
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "none",
      });
    }

    // Animate trail dots with stagger
    trailRefs.current.forEach((trail, i) => {
      if (trail) {
        gsap.to(trail, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3 + i * 0.05,
          ease: "power2",
        });
      }
    });
  }, []);

  // Magnetic effect for interactive elements
  const setupMagnetics = useCallback(() => {
    const magneticElements = document.querySelectorAll(
      'button, a, [data-magnetic], [role="button"]'
    );

    const handlers: Array<{ el: Element; enter: () => void; leave: () => void; move: (e: MouseEvent) => void }> = [];

    magneticElements.forEach((el) => {
      const htmlEl = el as HTMLElement;

      const handleEnter = () => {
        setCursorState((prev) => ({ ...prev, isHovering: true }));
        if (auraRef.current) {
          gsap.to(auraRef.current, {
            width: 50,
            height: 50,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        // Check for context text
        const cursorText = htmlEl.getAttribute("data-cursor-text");
        if (cursorText) {
          setCursorState((prev) => ({ ...prev, text: cursorText }));
        }
      };

      const handleLeave = () => {
        setCursorState((prev) => ({ ...prev, isHovering: false, text: "" }));
        if (auraRef.current) {
          gsap.to(auraRef.current, {
            width: 50,
            height: 50,
            duration: 0.3,
            ease: "elastic.out(1, 0.3)",
          });
        }
        gsap.to(htmlEl, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      const handleMove = (e: MouseEvent) => {
        const rect = htmlEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * 0.3;
        const dy = (e.clientY - centerY) * 0.3;

        gsap.to(htmlEl, {
          x: dx,
          y: dy,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      htmlEl.addEventListener("mouseenter", handleEnter);
      htmlEl.addEventListener("mouseleave", handleLeave);
      htmlEl.addEventListener("mousemove", handleMove);
      handlers.push({ el: htmlEl, enter: handleEnter, leave: handleLeave, move: handleMove });
    });

    return () => {
      handlers.forEach(({ el, enter, leave, move }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.removeEventListener("mousemove", move as EventListener);
      });
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", handleMouseMove);
    const cleanup = setupMagnetics();

    // Observe DOM changes to re-setup magnetics
    const observer = new MutationObserver(() => {
      cleanup();
      setupMagnetics();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cleanup();
      observer.disconnect();
    };
  }, [isMobile, handleMouseMove, setupMagnetics]);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000]">
      {/* Trail dots */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="fixed top-0 left-0 rounded-full"
          style={{
            width: 4,
            height: 4,
            backgroundColor: `rgba(0, 212, 255, ${0.3 - i * 0.035})`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Aura circle */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 rounded-full border transition-colors duration-300"
        style={{
          width: cursorState.isHovering ? 70 : 50,
          height: cursorState.isHovering ? 70 : 50,
          borderColor: cursorState.isHovering
            ? "rgba(0, 212, 255, 0.6)"
            : "rgba(0, 212, 255, 0.2)",
          backgroundColor: cursorState.isHovering
            ? "rgba(0, 212, 255, 0.08)"
            : "transparent",
          transform: "translate(-50%, -50%)",
          mixBlendMode: cursorState.blendMode ? "difference" : "normal",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cursorState.text && (
          <span
            className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
            style={{ color: "var(--accent-primary)" }}
          >
            {cursorState.text}
          </span>
        )}
      </div>

      {/* Precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full"
        style={{
          width: 8,
          height: 8,
          backgroundColor: "var(--accent-primary)",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 10px var(--accent-glow)",
        }}
      />
    </div>
  );
}

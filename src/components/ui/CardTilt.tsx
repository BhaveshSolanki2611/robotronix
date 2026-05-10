"use client";

import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface CardTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function CardTilt({
  children,
  className,
  maxTilt = 10,
}: CardTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(1.02, 1.02, 1.02)`;

    if (shineRef.current) {
      shineRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(0,212,255,0.15), transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    if (shineRef.current) {
      shineRef.current.style.background = "transparent";
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn("relative transition-transform duration-300", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={shineRef}
        className="absolute inset-0 rounded-inherit pointer-events-none z-10 transition-all duration-300"
        style={{ borderRadius: "inherit" }}
      />
      {children}
    </div>
  );
}

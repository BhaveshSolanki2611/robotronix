"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "filled" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  cursorText?: string;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className,
  variant = "filled",
  size = "md",
  href,
  onClick,
  cursorText,
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });

    if (innerRef.current) {
      gsap.to(innerRef.current, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
    if (innerRef.current) {
      gsap.to(innerRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  const baseStyles =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-300 group";

  const variants = {
    filled:
      "bg-accent text-bg-primary hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] border border-accent",
    ghost:
      "bg-transparent text-text-primary border border-border hover:border-accent hover:text-accent",
    outline:
      "bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-bg-primary",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-10 py-5 text-lg",
  };

  const props = {
    ref: buttonRef as React.RefObject<HTMLButtonElement>,
    className: cn(baseStyles, variants[variant], sizes[size], className),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    "data-magnetic": true,
    "data-cursor-text": cursorText,
    suppressHydrationWarning: true,
  };

  const content = (
    <span ref={innerRef} className="relative z-10 flex items-center gap-2">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
      >
        {content}
        <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    );
  }

  return (
    <button {...props} onClick={onClick} disabled={disabled} style={disabled ? { opacity: 0.5, pointerEvents: "none" } : undefined}>
      {content}
      <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}

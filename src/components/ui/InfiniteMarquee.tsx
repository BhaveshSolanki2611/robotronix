"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfiniteMarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export default function InfiniteMarquee({
  children,
  className,
  speed = 30,
  reverse = false,
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  return (
    <div
      className={cn("overflow-hidden relative group", className)}
    >
      <div
        className={cn(
          "flex w-max",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

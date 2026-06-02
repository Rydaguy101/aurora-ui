"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PerspectiveGridProps {
  className?: string;
  color?: string;
  speed?: number;
  fade?: boolean;
}

export function PerspectiveGrid({
  className,
  color = "#a855f7",
  speed = 1,
  fade = true,
}: PerspectiveGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        fade && "[mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]",
        className
      )}
    >
      <div className="absolute inset-0 [perspective:600px]">
        <div
          className="absolute -inset-x-1/2 bottom-0 h-[160%] origin-bottom animate-grid-flow"
          style={{
            transform: "rotateX(72deg)",
            backgroundImage: `
              linear-gradient(to right, ${color}22 1px, transparent 1px),
              linear-gradient(to bottom, ${color}22 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            animationDuration: `${12 / speed}s`,
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: `linear-gradient(to top, ${color}33, transparent)`,
        }}
      />
    </div>
  );
}

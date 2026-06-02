"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface BeamsBackgroundProps {
  className?: string;
  count?: number;
  color?: string;
  speed?: number;
}

function seeded(index: number) {
  const value = Math.sin(index * 9.123 + 4.567) * 43758.5453;
  return value - Math.floor(value);
}

export function BeamsBackground({
  className,
  count = 8,
  color = "#a855f7",
  speed = 1,
}: BeamsBackgroundProps) {
  const beams = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: `${(index / Math.max(count - 1, 1)) * 100}%`,
        width: 1 + seeded(index) * 2,
        delay: seeded(index + 1) * 3,
        duration: 3 + seeded(index + 2) * 4,
        opacity: 0.15 + seeded(index + 3) * 0.35,
      })),
    [count]
  );

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]">
        {beams.map((beam) => (
          <div
            key={beam.id}
            className="absolute top-0 h-full animate-beam-pulse"
            style={{
              left: beam.left,
              width: beam.width,
              background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
              opacity: beam.opacity,
              animationDuration: `${beam.duration / speed}s`,
              animationDelay: `${beam.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

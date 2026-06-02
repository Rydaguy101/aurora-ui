"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface StarfieldBackgroundProps {
  className?: string;
  count?: number;
  color?: string;
  speed?: number;
}

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 6.789 + salt * 3.456) * 43758.5453;
  return value - Math.floor(value);
}

export function StarfieldBackground({
  className,
  count = 80,
  color = "#ffffff",
  speed = 1,
}: StarfieldBackgroundProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: `${seeded(index, 1) * 100}%`,
        top: `${seeded(index, 2) * 100}%`,
        size: 1 + seeded(index, 3) * 2.5,
        delay: seeded(index, 4) * 4,
        duration: 2 + seeded(index, 5) * 3,
        opacity: 0.2 + seeded(index, 6) * 0.8,
      })),
    [count]
  );

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-twinkle rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: color,
            opacity: star.opacity,
            animationDuration: `${star.duration / speed}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

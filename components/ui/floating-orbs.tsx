"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface FloatingOrbsProps {
  className?: string;
  count?: number;
  color?: string;
  speed?: number;
  blur?: number;
}

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function FloatingOrbs({
  className,
  count = 4,
  color = "#a855f7",
  speed = 1,
  blur = 80,
}: FloatingOrbsProps) {
  const orbs = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        size: 100 + seeded(index, 1) * 160,
        left: `${8 + seeded(index, 2) * 72}%`,
        top: `${10 + seeded(index, 3) * 65}%`,
        delay: seeded(index, 4) * 4,
        duration: 5 + seeded(index, 5) * 4,
      })),
    [count]
  );

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute animate-float rounded-full opacity-60"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            filter: `blur(${blur}px)`,
            animationDuration: `${orb.duration / speed}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

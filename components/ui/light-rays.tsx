"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LightRaysProps {
  className?: string;
  count?: number;
  color?: string;
}

export function LightRays({ className, count = 8, color = "rgba(168, 85, 247, 0.15)" }: LightRaysProps) {
  const rays = Array.from({ length: count });

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2">
        {rays.map((_, index) => (
          <div
            key={index}
            className="absolute left-1/2 top-0 h-full origin-top animate-pulse"
            style={{
              width: 2,
              transform: `rotate(${(360 / count) * index}deg)`,
              background: `linear-gradient(to bottom, ${color}, transparent 70%)`,
              animationDelay: `${index * 0.15}s`,
            }}
          />
        ))}
      </div>
      <div
        className="absolute left-1/2 top-0 size-64 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: color }}
      />
    </div>
  );
}

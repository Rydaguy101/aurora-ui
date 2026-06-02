"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HeroWavesProps {
  className?: string;
  color?: string;
  speed?: number;
  layers?: number;
}

export function HeroWaves({
  className,
  color = "#a855f7",
  speed = 1,
  layers = 3,
}: HeroWavesProps) {
  const waveLayers = Array.from({ length: layers }, (_, index) => ({
    id: index,
    opacity: 0.08 + index * 0.06,
    delay: index * 0.8,
    duration: 8 + index * 2,
    offset: index * 12,
  }));

  return (
    <div className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-2/3 overflow-hidden", className)}>
      {waveLayers.map((layer) => (
        <svg
          key={layer.id}
          className="absolute bottom-0 w-[200%] animate-wave"
          style={{
            animationDuration: `${layer.duration / speed}s`,
            animationDelay: `${layer.delay}s`,
            opacity: layer.opacity,
          }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d={`M0,${60 + layer.offset} C300,${20 + layer.offset} 600,${100 - layer.offset} 900,${50 + layer.offset} C1050,${25 + layer.offset} 1150,${70 + layer.offset} 1200,${60 + layer.offset} L1200,120 L0,120 Z`}
            fill={color}
          />
        </svg>
      ))}
    </div>
  );
}

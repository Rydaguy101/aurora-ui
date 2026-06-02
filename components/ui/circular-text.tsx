"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CircularTextProps {
  text: string;
  radius?: number;
  className?: string;
  spinDuration?: number;
}

export function CircularText({ text, radius = 80, className, spinDuration = 20 }: CircularTextProps) {
  const chars = text.split("");
  const angleStep = 360 / chars.length;

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: radius * 2 + 40, height: radius * 2 + 40 }}
    >
      <div
        className="absolute inset-0 animate-spin"
        style={{ animationDuration: `${spinDuration}s` }}
      >
        {chars.map((char, index) => {
          const angle = angleStep * index;
          return (
            <span
              key={`${char}-${index}`}
              className="absolute left-1/2 top-1/2 origin-[0_0] text-sm font-semibold uppercase tracking-widest"
              style={{
                transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
      <div className="relative z-10 size-3 rounded-full bg-primary shadow-lg shadow-primary/40" />
    </div>
  );
}

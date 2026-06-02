"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GradientMeshProps {
  className?: string;
  colorFrom?: string;
  colorTo?: string;
  speed?: number;
}

export function GradientMesh({
  className,
  colorFrom = "#a855f7",
  colorTo = "#22d3ee",
  speed = 1,
}: GradientMeshProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute -left-1/4 -top-1/4 size-[70%] animate-blob rounded-full opacity-50 blur-3xl"
        style={{
          background: colorFrom,
          animationDuration: `${10 / speed}s`,
        }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 size-[65%] animate-blob rounded-full opacity-45 blur-3xl"
        style={{
          background: colorTo,
          animationDuration: `${12 / speed}s`,
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute left-1/3 top-1/2 size-[45%] -translate-y-1/2 animate-blob rounded-full opacity-35 blur-3xl"
        style={{
          background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
          animationDuration: `${14 / speed}s`,
          animationDelay: "4s",
        }}
      />
    </div>
  );
}

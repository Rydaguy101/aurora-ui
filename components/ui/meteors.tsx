"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const [meteors, setMeteors] = useState<
    { left: string; delay: string; duration: string }[]
  >([]);

  useEffect(() => {
    const styles = Array.from({ length: number }).map(() => ({
      left: `${Math.floor(Math.random() * 100)}%`,
      delay: `${Math.random() * 1.5}s`,
      duration: `${Math.floor(Math.random() * 5 + 4)}s`,
    }));
    setMeteors(styles);
  }, [number]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {meteors.map((m, idx) => (
        <span
          key={idx}
          className="absolute top-0 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-400 shadow-[0_0_0_1px_#ffffff10]"
          style={{
            top: 0,
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        >
          <span className="absolute top-1/2 h-px w-12 -translate-y-1/2 bg-gradient-to-r from-slate-400 to-transparent" />
        </span>
      ))}
    </div>
  );
}

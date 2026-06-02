"use client";

import React, { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
}

/**
 * A card whose border glows and follows the cursor. Use multiple together for
 * a connected "glowing grid" effect.
 */
export function GlowCard({ children, className, glowColor = "hsl(263 70% 60% / 0.4)", ...props }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group relative rounded-2xl border border-border bg-card p-px",
        className
      )}
      {...props}
    >
      {/* glow border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative h-full rounded-2xl bg-card p-8">{children}</div>
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

interface PatternProps {
  className?: string;
  /** "grid" draws lines, "dot" draws dots */
  variant?: "grid" | "dot";
  /** Apply a radial fade mask */
  fade?: boolean;
}

export function GridPattern({
  className,
  variant = "grid",
  fade = true,
}: PatternProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        variant === "grid" ? "bg-grid" : "bg-dot",
        fade && "mask-radial-faded",
        className
      )}
    />
  );
}

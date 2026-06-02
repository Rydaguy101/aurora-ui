import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  from = "from-violet-500",
  via = "via-fuchsia-500",
  to = "to-cyan-400",
  animate = true,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent [background-size:200%_auto]",
        from,
        via,
        to,
        animate && "animate-gradient",
        className
      )}
    >
      {children}
    </span>
  );
}

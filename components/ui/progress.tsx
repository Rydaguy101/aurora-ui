"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
  gradient?: boolean;
}

export function Progress({
  value,
  className,
  indicatorClassName,
  gradient = true,
}: ProgressProps) {
  return (
    <div
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "h-full rounded-full",
          gradient
            ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
            : "bg-primary",
          indicatorClassName
        )}
      />
    </div>
  );
}

"use client";

import React, { type RefObject } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  container?: RefObject<HTMLElement | null>;
}

export function ScrollProgress({ className, container }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll(
    container ? { container, layoutEffect: false } : undefined
  );
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className={cn(
        container
          ? "absolute inset-x-0 top-0 z-10 h-1 origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
          : "fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400",
        className
      )}
    />
  );
}

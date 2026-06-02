"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const positions = {
  top: { className: "bottom-full left-1/2 -translate-x-1/2 mb-2", x: 0, y: 6 },
  bottom: { className: "top-full left-1/2 -translate-x-1/2 mt-2", x: 0, y: -6 },
  left: { className: "right-full top-1/2 -translate-y-1/2 mr-2", x: 6, y: 0 },
  right: { className: "left-full top-1/2 -translate-y-1/2 ml-2", x: -6, y: 0 },
};

export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const [show, setShow] = useState(false);
  const pos = positions[side];

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, x: pos.x, y: pos.y, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-xl",
              pos.className,
              className
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

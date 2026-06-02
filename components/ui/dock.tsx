"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface DockProps {
  children: React.ReactNode;
  className?: string;
}

const MOUSE_X = React.createContext<MotionValue<number> | null>(null);

export function Dock({ children, className }: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <MOUSE_X.Provider value={mouseX}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto flex h-16 items-end gap-3 rounded-2xl border border-border bg-card/60 px-4 pb-3 backdrop-blur-xl",
          className
        )}
      >
        {children}
      </motion.div>
    </MOUSE_X.Provider>
  );
}

interface DockIconProps {
  children: React.ReactNode;
  className?: string;
  magnification?: number;
}

export function DockIcon({ children, className, magnification = 76 }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ctxMouseX = React.useContext(MOUSE_X);
  const fallback = useMotionValue(Infinity);
  const mouseX = ctxMouseX ?? fallback;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(distance, [-150, 0, 150], [40, magnification, 40]);
  const size = useSpring(sizeTransform, { stiffness: 250, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className={cn(
        "flex aspect-square items-center justify-center rounded-xl bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

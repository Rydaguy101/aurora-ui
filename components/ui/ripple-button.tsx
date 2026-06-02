"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface Ripple {
  x: number;
  y: number;
  size: number;
  key: number;
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  children: React.ReactNode;
}

export function RippleButton({
  children,
  className,
  rippleColor = "rgba(255,255,255,0.5)",
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const key = Date.now();
    setRipples((prev) => [...prev, { x, y, size, key }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.key !== key));
    }, 600);
    onClick?.(e);
  };

  return (
    <button
      onClick={createRipple}
      className={cn(
        "relative overflow-hidden rounded-lg bg-secondary px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary/80 active:scale-[0.98]",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {ripples.map((r) => (
        <span
          key={r.key}
          className="pointer-events-none absolute animate-[ripple_0.6s_linear] rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            background: rippleColor,
            transform: "scale(0)",
            animation: "ripple-expand 0.6s linear",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple-expand {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}

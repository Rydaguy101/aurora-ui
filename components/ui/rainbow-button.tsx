"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl px-8 font-medium text-white transition-transform duration-200 active:scale-95",
        "bg-[linear-gradient(#0a0a0f,#0a0a0f),linear-gradient(#0a0a0f_50%,rgba(10,10,15,0.6)_80%,rgba(10,10,15,0)),linear-gradient(90deg,#ff4d4d,#f9cb28,#4ade80,#3b82f6,#a855f7,#ff4d4d)]",
        "[background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:2px_solid_transparent]",
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-gradient before:[animation-duration:10s] before:bg-[linear-gradient(90deg,#ff4d4d,#f9cb28,#4ade80,#3b82f6,#a855f7,#ff4d4d)] before:[filter:blur(calc(0.8*1rem))] before:[background-size:200%]",
        "animate-gradient [animation-duration:10s] [background-size:200%]",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

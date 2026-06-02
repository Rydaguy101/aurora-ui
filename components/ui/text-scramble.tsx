"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number;
  trigger?: boolean;
}

export function TextScramble({ text, className, duration = 1200, trigger = true }: TextScrambleProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = Math.ceil(duration / 30);
    const timer = setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (progress > index / text.length) return char;
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          })
          .join("")
      );
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [text, duration, trigger]);

  return <span className={cn("font-mono", className)}>{display}</span>;
}

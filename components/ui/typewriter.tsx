"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  cursorClassName?: string;
}

export function Typewriter({
  words,
  className,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseTime = 1600,
  cursorClassName,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pauseTime);
      return () => clearTimeout(t);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      {words[index % words.length].substring(0, subIndex)}
      <span
        className={cn(
          "ml-0.5 inline-block h-[1em] w-[3px] animate-pulse bg-primary",
          cursorClassName
        )}
      />
    </span>
  );
}

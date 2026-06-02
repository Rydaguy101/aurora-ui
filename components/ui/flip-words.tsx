"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function FlipWords({ words, duration = 2500, className }: FlipWordsProps) {
  const [index, setIndex] = useState(0);
  const safeWords = words.length > 0 ? words : [""];

  const longestWord = useMemo(
    () => safeWords.reduce((longest, word) => (word.length > longest.length ? word : longest), safeWords[0]),
    [safeWords]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeWords.length);
    }, duration);
    return () => clearInterval(interval);
  }, [safeWords.length, duration]);

  const currentWord = safeWords[index];
  const scale =
    currentWord.length < longestWord.length
      ? 1 + ((longestWord.length - currentWord.length) / longestWord.length) * 0.12
      : 1;

  return (
    <span
      className={cn("relative inline-grid place-items-center align-baseline", className)}
      style={{ minWidth: `${Math.max(longestWord.length, 1)}ch` }}
    >
      {safeWords.map((word) => (
        <span
          key={word}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 whitespace-nowrap pointer-events-none select-none"
        >
          {word}
        </span>
      ))}

      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale }}
          exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="col-start-1 row-start-1 whitespace-nowrap text-center"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

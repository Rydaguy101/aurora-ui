"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  splitType?: "chars" | "words" | "lines";
  delay?: number;
  duration?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitText({
  text,
  className,
  splitType = "chars",
  delay = 50,
  duration = 0.8,
  tag: Tag = "p",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView) setStarted(true);
  }, [isInView]);

  const segments = useMemo(() => {
    if (splitType === "words") return text.split(" ");
    if (splitType === "lines") return text.split("\n");
    return text.split("");
  }, [splitType, text]);

  return (
    <Tag ref={ref as never} className={cn("flex flex-wrap justify-center gap-x-[0.2em]", className)}>
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          initial={{ opacity: 0, y: 24, rotateX: -40 }}
          animate={started ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration,
            delay: (index * delay) / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block origin-bottom"
          style={{ perspective: 600 }}
        >
          {segment}
          {splitType === "words" && index < segments.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}

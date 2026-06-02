"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "chars" | "words";
  direction?: "top" | "bottom";
}

export function BlurText({
  text,
  className,
  delay = 50,
  animateBy = "chars",
  direction = "top",
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView) setStarted(true);
  }, [isInView]);

  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [animateBy, text]
  );

  const y = direction === "top" ? -12 : 12;

  return (
    <p ref={ref} className={cn("flex flex-wrap justify-center gap-x-[0.25em]", className)}>
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          initial={{ opacity: 0, y, filter: "blur(10px)" }}
          animate={started ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.45, delay: (index * delay) / 1000, ease: "easeOut" }}
          className="inline-block"
        >
          {segment}
          {animateBy === "words" && index < segments.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </p>
  );
}

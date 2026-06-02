"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: string;
  className?: string;
  showLabels?: boolean;
}

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function Unit({ value, label, showLabel }: { value: number; label: string; showLabel: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex min-w-[4.5rem] items-center justify-center rounded-xl border border-border bg-card/60 px-4 py-3 text-3xl font-bold tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      {showLabel && <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</span>}
    </div>
  );
}

export function Countdown({ targetDate, className, showLabels = true }: CountdownProps) {
  const target = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
      <Unit value={timeLeft.days} label="Days" showLabel={showLabels} />
      <Unit value={timeLeft.hours} label="Hours" showLabel={showLabels} />
      <Unit value={timeLeft.minutes} label="Minutes" showLabel={showLabels} />
      <Unit value={timeLeft.seconds} label="Seconds" showLabel={showLabels} />
    </div>
  );
}

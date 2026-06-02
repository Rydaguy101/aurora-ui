"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StackCard {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
}

interface CardStackProps {
  items: StackCard[];
  offset?: number;
  scaleFactor?: number;
  interval?: number;
  className?: string;
}

export function CardStack({
  items,
  offset = 12,
  scaleFactor = 0.06,
  interval = 4000,
  className,
}: CardStackProps) {
  const [cards, setCards] = useState<StackCard[]>(items);

  useEffect(() => {
    setCards(items);
  }, [items]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className={cn("relative h-60 w-72", className)}>
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute flex h-60 w-72 flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xl"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -offset,
            scale: 1 - index * scaleFactor,
            zIndex: cards.length - index,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        >
          <div className="text-sm text-foreground/90">{card.content}</div>
          <div>
            <p className="font-semibold">{card.name}</p>
            <p className="text-sm text-muted-foreground">{card.designation}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

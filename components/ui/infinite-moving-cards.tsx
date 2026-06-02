"use client";

import React from "react";
import { Marquee } from "./marquee";
import { cn } from "@/lib/utils";

export interface MovingCard {
  quote: string;
  name: string;
  title: string;
}

interface InfiniteMovingCardsProps {
  items: MovingCard[];
  reverse?: boolean;
  duration?: number;
  className?: string;
}

export function InfiniteMovingCards({
  items,
  reverse,
  duration = 40,
  className,
}: InfiniteMovingCardsProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
        className
      )}
    >
      <Marquee reverse={reverse} pauseOnHover duration={duration}>
        {items.map((item, idx) => (
          <figure
            key={idx}
            className="relative w-80 shrink-0 rounded-2xl border border-border bg-card p-6"
          >
            <blockquote className="text-sm leading-relaxed text-foreground/90">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pink-500 text-xs font-bold text-white">
                {item.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.title}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </div>
  );
}

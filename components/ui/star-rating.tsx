"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = { sm: "size-4", md: "size-5", lg: "size-6" };

export function StarRating({
  value = 0,
  max = 5,
  onChange,
  readOnly = false,
  size = "md",
  className,
}: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      onMouseLeave={() => !readOnly && setHover(0)}
    >
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= display;

        return (
          <button
            key={starValue}
            type="button"
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onClick={() => !readOnly && onChange?.(starValue)}
            className={cn(
              "transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default",
              !readOnly && "hover:scale-110"
            )}
          >
            <Star
              className={cn(
                sizes[size],
                filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

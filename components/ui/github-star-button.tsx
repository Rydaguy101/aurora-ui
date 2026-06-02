"use client";

import { useEffect, useState } from "react";
import { Github, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GITHUB_REPO } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface GitHubStarButtonProps {
  className?: string;
  size?: "sm" | "default";
  showCount?: boolean;
  variant?: "default" | "outline" | "prominent";
}

export function GitHubStarButton({
  className,
  size = "sm",
  showCount = true,
  variant = "outline",
}: GitHubStarButtonProps) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/github/stars")
      .then((response) => response.json())
      .then((data: { stars?: number }) => setStars(data.stars ?? 0))
      .catch(() => setStars(null));
  }, []);

  const label = stars !== null && showCount ? `Star · ${stars.toLocaleString()}` : "Star on GitHub";

  if (variant === "prominent") {
    return (
      <a
        href={GITHUB_REPO}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-amber-500/50 hover:from-amber-500/20 hover:to-orange-500/20",
          className
        )}
      >
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        {label}
        <Github className="h-4 w-4 text-muted-foreground" />
      </a>
    );
  }

  return (
    <Button
      asChild
      size={size}
      variant={variant === "default" ? "default" : "outline"}
      className={cn("gap-2", className)}
    >
      <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
        <Github className="h-4 w-4" />
        {label}
      </a>
    </Button>
  );
}

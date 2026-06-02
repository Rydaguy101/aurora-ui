import React from "react";
import { cn } from "@/lib/utils";

export function BentoGrid({
  className,
  children,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "grid w-full auto-rows-[20rem] grid-cols-1 gap-4 md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  className?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  background?: React.ReactNode;
  cta?: React.ReactNode;
}

export function BentoCard({
  className,
  title,
  description,
  icon,
  background,
  cta,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40",
        className
      )}
    >
      <div className="absolute inset-0">{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2">
        {icon && (
          <div className="mb-2 text-primary transition-transform duration-300 group-hover:scale-90">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="max-w-lg text-sm text-muted-foreground">{description}</p>
      </div>
      {cta && (
        <div className="z-10 flex translate-y-4 items-center p-6 pt-0 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {cta}
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-primary/[0.03]" />
    </div>
  );
}

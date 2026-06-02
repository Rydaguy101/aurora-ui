"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepItem {
  id: string;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center">
        {steps.map((step, index) => {
          const done = index < currentStep;
          const active = index === currentStep;
          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                    done && "border-primary bg-primary text-primary-foreground",
                    active && "border-primary bg-primary/15 text-primary",
                    !done && !active && "border-border bg-card/50 text-muted-foreground"
                  )}
                >
                  {done ? <Check className="size-4" /> : index + 1}
                </div>
                <div className="hidden text-center sm:block">
                  <p className={cn("text-sm font-medium", active ? "text-foreground" : "text-muted-foreground")}>{step.title}</p>
                  {step.description && <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={cn("mx-2 h-px flex-1", index < currentStep ? "bg-primary" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

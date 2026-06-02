"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, className, value, onChange, disabled, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [internal, setInternal] = useState("");
    const hasValue = (value ?? internal)?.toString().length > 0;
    const active = focused || hasValue;

    return (
      <div className="relative">
        <input
          ref={ref}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            setInternal(e.target.value);
            onChange?.(e);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "peer h-12 w-full rounded-xl border border-border bg-card/50 px-4 pt-2 text-sm text-foreground outline-none transition-colors placeholder:text-transparent focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          placeholder={label}
          {...props}
        />
        <label
          className={cn(
            "pointer-events-none absolute left-4 origin-left transition-all duration-150 ease-out",
            active ? "top-1.5 text-[0.7rem]" : "top-3.5 text-sm",
            focused && !disabled ? "text-primary" : "text-muted-foreground"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

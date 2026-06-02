"use client";

import { Switch } from "@/components/ui/switch";
import type { ComponentControl, ComponentControlValue } from "@/lib/components/registry";

interface ComponentControlsProps {
  controls: ComponentControl[];
  value: Record<string, ComponentControlValue>;
  onChange: (key: string, nextValue: ComponentControlValue) => void;
}

export function ComponentControls({ controls, value, onChange }: ComponentControlsProps) {
  if (controls.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-base font-medium text-foreground">Customize</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {controls.map((control) => {
          const currentValue = value[control.key];

          return (
            <div
              key={control.key}
              className="flex flex-col gap-2 rounded-lg border border-border/60 bg-[#111111] px-4 py-3"
            >
              <label className="text-sm text-muted-foreground">{control.label}</label>

              {control.type === "text" && (
                <input
                  type="text"
                  value={String(currentValue ?? "")}
                  onChange={(event) => onChange(control.key, event.target.value)}
                  className="w-full rounded-md border border-border/80 bg-[#0a0a0a] px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground/30"
                />
              )}

              {control.type === "textarea" && (
                <textarea
                  rows={3}
                  value={String(currentValue ?? "")}
                  onChange={(event) => onChange(control.key, event.target.value)}
                  className="w-full rounded-md border border-border/80 bg-[#0a0a0a] px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground/30"
                />
              )}

              {control.type === "slider" && (
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    value={Number(currentValue ?? control.min ?? 0)}
                    onChange={(event) => onChange(control.key, Number(event.target.value))}
                    className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-white"
                  />
                  <span className="min-w-[3rem] text-right font-mono text-sm text-foreground">
                    {control.step !== undefined && control.step < 1
                      ? Number(currentValue ?? control.min ?? 0).toFixed(1)
                      : Number(currentValue ?? control.min ?? 0)}
                  </span>
                </div>
              )}

              {control.type === "toggle" && (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-foreground">
                    {currentValue === true ? "On" : "Off"}
                  </span>
                  <Switch
                    checked={currentValue === true}
                    onCheckedChange={(checked) => onChange(control.key, checked)}
                  />
                </div>
              )}

              {control.type === "select" && (
                <select
                  value={String(currentValue ?? "")}
                  onChange={(event) => onChange(control.key, event.target.value)}
                  className="w-full rounded-md border border-border/80 bg-[#0a0a0a] px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground/30"
                >
                  {control.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {control.type === "color" && (
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={String(currentValue ?? "#a855f7")}
                    onChange={(event) => onChange(control.key, event.target.value)}
                    className="h-9 w-12 cursor-pointer rounded-md border border-border/80 bg-[#0a0a0a]"
                  />
                  <span className="font-mono text-sm text-muted-foreground">
                    {String(currentValue ?? "#a855f7")}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

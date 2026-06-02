"use client";

import { useRef, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast";
import type { ComponentControlValue } from "@/lib/components/registry";

export interface ComponentPreviewProps {
  slug: string;
  config: Record<string, ComponentControlValue>;
  onConfigChange: (key: string, nextValue: ComponentControlValue) => void;
  bare?: boolean;
}

export const tabItems = [
  {
    id: "design",
    label: "Design",
    content: <p className="text-sm text-muted-foreground">Purposeful spacing, contrast, and motion defaults.</p>,
  },
  {
    id: "motion",
    label: "Motion",
    content: <p className="text-sm text-muted-foreground">Spring-based transitions and layered depth.</p>,
  },
  {
    id: "delivery",
    label: "Delivery",
    content: <p className="text-sm text-muted-foreground">Copy a component in and ship without ceremony.</p>,
  },
];

export const accordionItems = [
  {
    id: "1",
    title: "How much setup do I need?",
    content: "These components are designed to drop into a Next.js app with minimal ceremony.",
  },
  {
    id: "2",
    title: "Can I restyle everything?",
    content: "Yes. Most of the visuals are driven by Tailwind classes and CSS variables.",
  },
  {
    id: "3",
    title: "Are they motion heavy?",
    content: "Enough to feel alive, but still practical for real interfaces.",
  },
];

export const testimonialItems = [
  { quote: "The visual quality feels intentional, not templated.", name: "Ava Chen", title: "Design lead" },
  { quote: "The defaults are strong enough that I stopped restyling every demo.", name: "Marcus Lee", title: "Founder" },
  { quote: "It feels like a launch-ready kit, not a toy showcase.", name: "Priya Nair", title: "Engineer" },
];

export const stackCards = [
  { id: 0, name: "Aurora", designation: "Background", content: "Living gradients with atmospheric depth." },
  { id: 1, name: "Beam", designation: "Border", content: "Conic trails that keep static cards from feeling flat." },
  { id: 2, name: "Bento", designation: "Layout", content: "Responsive feature grids with layered hover states." },
];

export const commandItems = [
  { id: "components", label: "Go to components", group: "Navigation", shortcut: "G C" },
  { id: "home", label: "Open home", group: "Navigation", shortcut: "G H" },
  { id: "copy", label: "Copy prompt", group: "Actions", shortcut: "⌘ C" },
  { id: "theme", label: "Toggle theme", group: "Actions" },
];

export const carouselSlides = [
  <div key="1" className="flex h-full flex-col justify-center">
    <h3 className="text-2xl font-semibold">Ship faster</h3>
    <p className="mt-2 text-sm text-muted-foreground">Pre-built motion primitives for production UI.</p>
  </div>,
  <div key="2" className="flex h-full flex-col justify-center">
    <h3 className="text-2xl font-semibold">Stay on brand</h3>
    <p className="mt-2 text-sm text-muted-foreground">Theme once with CSS variables and Tailwind tokens.</p>
  </div>,
  <div key="3" className="flex h-full flex-col justify-center">
    <h3 className="text-2xl font-semibold">Delight users</h3>
    <p className="mt-2 text-sm text-muted-foreground">Subtle animation that feels intentional, not noisy.</p>
  </div>,
];

export const countdownTarget = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

export const stepperSteps = [
  { id: "1", title: "Account", description: "Create profile" },
  { id: "2", title: "Plan", description: "Choose tier" },
  { id: "3", title: "Done", description: "Start building" },
];

export const timelineItems = [
  { id: "1", title: "Project created", description: "Workspace initialized.", time: "2h ago" },
  { id: "2", title: "First deploy", description: "Preview URL is live.", time: "1h ago" },
  { id: "3", title: "Team invited", description: "3 collaborators joined.", time: "30m ago" },
];

export function ToastDemo({
  variant,
  title,
  description,
}: {
  variant: "default" | "success" | "error" | "info";
  title: string;
  description: string;
}) {
  const { toast } = useToast();
  return <Button onClick={() => toast({ variant, title, description })}>Show toast</Button>;
}

export function asString(value: ComponentControlValue | undefined, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

export function asNumber(value: ComponentControlValue | undefined, fallback: number) {
  return typeof value === "number" ? value : fallback;
}

export function asBoolean(value: ComponentControlValue | undefined, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

export function parseWords(value: ComponentControlValue | undefined, fallback: string[]) {
  if (typeof value !== "string") return fallback;
  const words = value
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean);
  return words.length > 0 ? words : fallback;
}

export function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return "168, 85, 247";
  const value = Number.parseInt(normalized, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `${red}, ${green}, ${blue}`;
}

export function ScrollProgressDemo({ panelHeight }: { panelHeight: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border/60 bg-card/40">
      <ScrollProgress container={containerRef} />
      <div
        ref={containerRef}
        style={{ height: panelHeight }}
        className="overflow-y-auto overscroll-contain px-6 py-8"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Scroll this panel</p>
        <h3 className="mt-3 text-xl font-semibold">Scroll progress demo</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          The indicator tracks scroll position inside this container, so you can preview the effect without leaving the page.
        </p>
        {Array.from({ length: 8 }).map((_, index) => (
          <p key={index} className="mt-6 text-sm leading-7 text-muted-foreground">
            Section {index + 1}. Keep scrolling to watch the bar fill across the top of the panel.
          </p>
        ))}
      </div>
    </div>
  );
}

export function SkeletonCard({ showAvatar }: { showAvatar: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="mt-4 h-4 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      {showAvatar && (
        <div className="mt-4 flex items-center gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      )}
    </div>
  );
}

export function PreviewFrame({
  children,
  note,
  bare,
}: {
  children: ReactNode;
  note?: string;
  bare?: boolean;
}) {
  if (bare) {
    return <>{children}</>;
  }

  return (
    <section className="rounded-3xl border border-border bg-card/60 p-6 shadow-2xl backdrop-blur">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Live preview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tweak the controls and watch the component respond in place.
          </p>
        </div>
        {note && <p className="max-w-xs text-right text-xs text-muted-foreground">{note}</p>}
      </div>
      <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-border/80 bg-background/80 p-6">
        {children}
      </div>
    </section>
  );
}

export function PreviewLoading() {
  return (
    <div className="flex min-h-[360px] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
        <div className="size-8 animate-spin rounded-full border-2 border-border border-t-foreground" />
        Loading preview…
      </div>
    </div>
  );
}

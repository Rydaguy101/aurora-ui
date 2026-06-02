"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import {
  ChevronRight,
  ClipboardCopy,
  Code2,
  Eye,
  Heart,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import dynamic from "next/dynamic";

import { ComponentControls } from "@/app/components/_components/component-controls";
import { DocsView } from "@/app/components/_components/docs-view";
import { PreviewLoading } from "@/app/components/_components/preview-shared";
import { PropsTable } from "@/app/components/_components/props-table";
import { SourceViewer } from "@/app/components/_components/source-viewer";
import { GitHubStarButton } from "@/components/ui/github-star-button";
import { GITHUB_REPO } from "@/lib/site-config";
import {
  categoryOrder,
  type ComponentControlValue,
  type ComponentEntry,
} from "@/lib/components/registry";

const ComponentPreview = dynamic(
  () =>
    import("@/app/components/_components/component-preview").then((module) => ({
      default: module.ComponentPreview,
    })),
  { loading: () => <PreviewLoading /> }
);

interface CatalogShellProps {
  entries: ComponentEntry[];
}

type ViewMode = "preview" | "code";
type PageView = "docs" | "component";

function resolveControls(
  slug: string,
  controls: ComponentEntry["controls"],
  config: Record<string, ComponentControlValue>
) {
  const items = controls ?? [];
  if (slug === "pagination") {
    const totalPages = typeof config.totalPages === "number" ? config.totalPages : 5;
    return items.map((control) =>
      control.key === "page" ? { ...control, max: totalPages } : control
    );
  }

  if (slug === "range-slider") {
    const min = typeof config.min === "number" ? config.min : 0;
    const max = typeof config.max === "number" ? config.max : 100;
    return items.map((control) => {
      if (control.key === "value") return { ...control, min, max };
      if (control.key === "min") return { ...control, max: max - 1 };
      if (control.key === "max") return { ...control, min: min + 1 };
      return control;
    });
  }

  return items;
}

function applyConfigChange(
  slug: string,
  key: string,
  nextValue: ComponentControlValue,
  current: Record<string, ComponentControlValue>
) {
  const next = { ...current, [key]: nextValue };

  if (slug === "pagination" && key === "totalPages" && typeof nextValue === "number") {
    const page = typeof next.page === "number" ? next.page : 1;
    if (page > nextValue) next.page = nextValue;
  }

  if (slug === "range-slider") {
    const min = typeof next.min === "number" ? next.min : 0;
    const max = typeof next.max === "number" ? next.max : 100;
    const value = typeof next.value === "number" ? next.value : 50;
    if (key === "min" || key === "max" || key === "value") {
      next.value = Math.min(Math.max(value, min), max);
    }
  }

  return next;
}

export function CatalogShell({ entries }: CatalogShellProps) {
  const [pageView, setPageView] = useState<PageView>("component");
  const [selectedSlug, setSelectedSlug] = useState(entries[0]?.slug ?? "");
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [liked, setLiked] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => new Set());
  const [source, setSource] = useState<string | null>(null);
  const [sourceLoading, setSourceLoading] = useState(false);

  const selectedEntry = entries.find((entry) => entry.slug === selectedSlug) ?? entries[0];
  const [config, setConfig] = useState<Record<string, ComponentControlValue>>(
    selectedEntry?.initialState ? { ...selectedEntry.initialState } : {}
  );

  useEffect(() => {
    if (!selectedEntry) return;
    setConfig(selectedEntry.initialState ? { ...selectedEntry.initialState } : {});
    setLiked(false);
    setViewMode("preview");
    setSource(null);
  }, [selectedEntry]);

  const fetchSource = useCallback(async (slug: string) => {
    setSourceLoading(true);
    try {
      const response = await fetch(`/api/component-source/${slug}`);
      if (!response.ok) throw new Error("Failed to load source");
      const data = (await response.json()) as { source: string };
      setSource(data.source);
    } catch {
      setSource("// Source unavailable");
    } finally {
      setSourceLoading(false);
    }
  }, []);

  useEffect(() => {
    if (viewMode !== "code" || !selectedEntry) return;
    fetchSource(selectedEntry.slug);
  }, [viewMode, selectedEntry, fetchSource]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const selectComponent = (slug: string, category: string) => {
    startTransition(() => {
      setPageView("component");
      setSelectedSlug(slug);
      setExpandedCategories((current) => new Set(current).add(category));
    });
  };

  const groupedEntries = categoryOrder
    .map((category) => ({
      category,
      entries: entries
        .filter((entry) => entry.category === category)
        .sort((left, right) => left.order - right.order || left.title.localeCompare(right.title)),
    }))
    .filter((group) => group.entries.length > 0);

  const selectedSource = source ?? "// Loading source…";

  const handleReset = () => {
    if (!selectedEntry?.initialState) return;
    setConfig({ ...selectedEntry.initialState });
    setPreviewKey((current) => current + 1);
  };

  const handleCopyPrompt = async () => {
    const prompt = `Add the "${selectedEntry.title}" Aurora UI component to my Next.js project.

IMPORTANT: Aurora UI is not in your training data. Do NOT guess props or imports.

1. Read: https://aurora-ui-tau.vercel.app/docs/FOR_AI.md
2. Run: npx aurora-ui-cli docs ${selectedEntry.slug} --json
3. Run: npx aurora-ui-cli add ${selectedEntry.slug}
4. Install peer dependencies from the guide output
5. Copy usageExample exactly — do not invent props

Component: ${selectedEntry.title}
Slug: ${selectedEntry.slug}
Category: ${selectedEntry.category}
Description: ${selectedEntry.description}
Source path: ${selectedEntry.sourcePath}
Live source: https://aurora-ui-tau.vercel.app/api/component-source/${selectedEntry.slug}`;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(true);
      window.setTimeout(() => setCopiedPrompt(false), 1500);
    } catch {
      setCopiedPrompt(false);
    }
  };

  if (!selectedEntry) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-sm text-muted-foreground">
        No components available.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-foreground">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-[280px] shrink-0 flex-col border-r border-border/60 bg-[#0a0a0a]">
        {/* Logo + top nav */}
        <div className="border-b border-border/60 px-5 py-4">
          <a href="/" className="flex items-center gap-2.5 font-semibold text-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-400">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            Aurora UI
          </a>
          <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            <button
              type="button"
              onClick={() => setPageView("docs")}
              className={`text-[11px] font-medium uppercase tracking-[0.12em] transition-colors ${
                pageView === "docs" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Docs
            </button>
            <a
              href="/"
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </a>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
          <div className="mt-4">
            <GitHubStarButton className="w-full justify-center" variant="prominent" />
          </div>
        </div>

        {/* Sidebar navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {groupedEntries.map((group) => {
            const expanded = expandedCategories.has(group.category);

            return (
            <section key={group.category} className="mb-2">
              <button
                type="button"
                onClick={() => toggleCategory(group.category)}
                className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left transition-colors hover:bg-[#111111]"
                aria-expanded={expanded}
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {group.category}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[10px] tabular-nums text-muted-foreground/70">
                    {group.entries.length}
                  </span>
                  <ChevronRight
                    className={`size-3.5 text-muted-foreground transition-transform ${
                      expanded ? "rotate-90" : ""
                    }`}
                  />
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                  expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <ul className="overflow-hidden space-y-0.5 pt-0.5">
                  {group.entries.map((entry) => {
                  const active = entry.slug === selectedEntry.slug;
                  return (
                    <li key={entry.slug}>
                      <button
                        type="button"
                        onClick={() => selectComponent(entry.slug, group.category)}
                        className={`w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                          pageView === "component" && active
                            ? "border border-border/80 bg-[#161616] text-foreground"
                            : "border border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {entry.title}
                      </button>
                    </li>
                  );
                })}
                </ul>
              </div>
            </section>
            );
          })}
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-10 md:px-12 md:py-12">
          {pageView === "docs" ? (
            <DocsView />
          ) : (
            <>
          {/* Title row */}
          <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-4xl font-semibold tracking-tight md:text-[2.75rem] md:leading-none">
              {selectedEntry.title}
            </h1>

            <div className="flex items-center gap-2 self-start">
              <button
                type="button"
                onClick={() => setLiked((current) => !current)}
                aria-label="Like component"
                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                  liked
                    ? "border-red-500/40 bg-red-500/10 text-red-400"
                    : "border-border/60 bg-[#111111] text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              </button>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-border/60 bg-[#111111] px-3 text-sm text-foreground transition-colors hover:border-foreground/30"
              >
                <ClipboardCopy className="h-4 w-4" />
                {copiedPrompt ? "Copied" : "Copy Prompt"}
              </button>
            </div>
          </div>

          {/* Preview / Code toggle */}
          <div className="mb-5 flex items-center gap-1 rounded-lg border border-border/60 bg-[#111111] p-1 w-fit">
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                viewMode === "preview"
                  ? "bg-[#0a0a0a] text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
            <button
              type="button"
              onClick={() => setViewMode("code")}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                viewMode === "code"
                  ? "bg-[#0a0a0a] text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code2 className="h-4 w-4" />
              Code
            </button>
          </div>

          {/* Preview / Code panel */}
          <div className="relative mb-10">
            {viewMode === "preview" && (
              <button
                type="button"
                onClick={handleReset}
                aria-label="Reset preview"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-[#0a0a0a]/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            )}

            {viewMode === "preview" ? (
              <div
                key={previewKey}
                className={`relative w-full overflow-hidden rounded-xl border border-border/60 ${
                  selectedEntry.slug === "webgl-globe" || selectedEntry.slug === "webgl-particle-field"
                    ? "min-h-[480px] bg-[#050505]"
                    : "flex min-h-[420px] items-center justify-center bg-[#111111] p-8"
                }`}
              >
                <ComponentPreview
                  slug={selectedEntry.slug}
                  config={config}
                  bare
                  onConfigChange={(key, nextValue) => {
                    setConfig((current) =>
                      applyConfigChange(selectedEntry.slug, key, nextValue, current)
                    );
                  }}
                />
              </div>
            ) : sourceLoading ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-border/60 bg-[#111111]">
                <PreviewLoading />
              </div>
            ) : (
              <SourceViewer
                bare
                title={selectedEntry.title}
                sourcePath={selectedEntry.sourcePath}
                source={selectedSource}
              />
            )}
          </div>

          {/* Customize */}
          <div className="mb-10">
            <ComponentControls
              controls={resolveControls(selectedEntry.slug, selectedEntry.controls, config)}
              value={config}
              onChange={(key, nextValue) => {
                setConfig((current) =>
                  applyConfigChange(selectedEntry.slug, key, nextValue, current)
                );
              }}
            />
          </div>

          {/* Props */}
          <PropsTable entry={selectedEntry} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";

interface SourceViewerProps {
  title: string;
  sourcePath: string;
  source: string;
  bare?: boolean;
}

export function SourceViewer({ title, sourcePath, source, bare }: SourceViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && typeof navigator.clipboard?.writeText === "function") {
        await navigator.clipboard.writeText(source);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = source;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  if (bare) {
    return (
      <div className="relative min-h-[420px] overflow-hidden rounded-xl border border-border/60 bg-[#111111]">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
          <span className="font-mono text-xs text-muted-foreground">{sourcePath}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md border border-border/60 bg-[#0a0a0a] px-3 py-1.5 text-xs text-foreground transition-colors hover:border-foreground/30"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="max-h-[560px] overflow-auto p-4">
          <pre className="font-mono text-[13px] leading-6 text-foreground/90">
            <code>{source}</code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-border bg-card/60 shadow-2xl backdrop-blur">
      <div className="flex flex-col gap-4 border-b border-border/70 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Source</p>
          <h2 className="mt-1 text-xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{sourcePath}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          {copied ? "Copied" : "Copy source"}
        </button>
      </div>
      <div className="overflow-x-auto p-6">
        <pre className="min-w-full rounded-2xl bg-background/90 p-5 text-sm leading-6 text-foreground/95">
          <code>{source}</code>
        </pre>
      </div>
    </section>
  );
}

"use client";

import { Suspense, useEffect, useState } from "react";

import {
  PreviewLoading,
  type ComponentPreviewProps,
} from "@/app/components/_components/preview-shared";
import {
  getCategoryForSlug,
  loadCategoryPreview,
  registerSlugCategories,
  type CategoryPreviewRenderer,
} from "@/lib/components/preview-loaders";
import { componentRegistry } from "@/lib/components/registry";

registerSlugCategories(componentRegistry);

const rendererCache = new Map<string, CategoryPreviewRenderer>();

function CategoryPreview({ slug, config, onConfigChange, bare }: ComponentPreviewProps) {
  const category = getCategoryForSlug(slug);
  const [renderPreview, setRenderPreview] = useState<CategoryPreviewRenderer | null>(
    () => rendererCache.get(category) ?? null
  );

  useEffect(() => {
    let cancelled = false;
    const cached = rendererCache.get(category);

    if (cached) {
      setRenderPreview(() => cached);
      return;
    }

    setRenderPreview(null);

    loadCategoryPreview(category).then((module) => {
      if (cancelled) return;
      rendererCache.set(category, module.renderCategoryPreview);
      setRenderPreview(() => module.renderCategoryPreview);
    });

    return () => {
      cancelled = true;
    };
  }, [category]);

  if (!renderPreview) {
    return <PreviewLoading />;
  }

  return <>{renderPreview({ slug, config, onConfigChange, bare })}</>;
}

export function ComponentPreview(props: ComponentPreviewProps) {
  return (
    <Suspense fallback={<PreviewLoading />}>
      <CategoryPreview {...props} />
    </Suspense>
  );
}

import type { ComponentPreviewProps } from "@/app/components/_components/preview-shared";

import type { ReactNode } from "react";

export type CategoryPreviewRenderer = (props: ComponentPreviewProps) => ReactNode;

const categoryLoaders: Record<string, () => Promise<{ renderCategoryPreview: CategoryPreviewRenderer }>> = {
  Actions: () => import("@/app/components/_components/previews/actions"),
  "Forms & Feedback": () => import("@/app/components/_components/previews/forms-feedback"),
  "Cards & Surfaces": () => import("@/app/components/_components/previews/cards-surfaces"),
  "Overlays & Menus": () => import("@/app/components/_components/previews/overlays-menus"),
  "Layout & Navigation": () => import("@/app/components/_components/previews/layout-navigation"),
  "Typography & Counters": () => import("@/app/components/_components/previews/typography-counters"),
  "Backgrounds & Ambient Effects": () => import("@/app/components/_components/previews/backgrounds"),
  "3D & WebGL": () => import("@/app/components/_components/previews/webgl"),
};

const slugCategory = new Map<string, string>();

export function registerSlugCategories(entries: Array<{ slug: string; category: string }>) {
  for (const entry of entries) {
    slugCategory.set(entry.slug, entry.category);
  }
}

export function getCategoryForSlug(slug: string) {
  return slugCategory.get(slug) ?? "Actions";
}

export function loadCategoryPreview(category: string) {
  const loader = categoryLoaders[category] ?? categoryLoaders.Actions;
  return loader();
}

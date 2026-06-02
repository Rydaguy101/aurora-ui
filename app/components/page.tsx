import type { Metadata } from "next";

import { CatalogShell } from "@/app/components/_components/catalog-shell";
import { componentRegistry } from "@/lib/components/registry";

export const metadata: Metadata = {
  title: "Components - Aurora UI",
  description: "Browse Aurora UI components with live previews, customization controls, and source code.",
};

export default function ComponentsPage() {
  return <CatalogShell entries={componentRegistry} />;
}

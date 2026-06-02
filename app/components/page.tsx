import type { Metadata } from "next";

import { CatalogShell } from "@/app/components/_components/catalog-shell";
import { componentRegistry } from "@/lib/components/registry";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Components",
  description: `Browse ${componentRegistry.length} Aurora UI components with live previews, customization controls, and source code.`,
  openGraph: {
    title: `Components — ${SITE.name}`,
    description: `Live previews for ${componentRegistry.length}+ animated React components.`,
  },
};

export default function ComponentsPage() {
  return <CatalogShell entries={componentRegistry} />;
}

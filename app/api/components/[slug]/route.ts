import { readFile } from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";

import { componentRegistry } from "@/lib/components/registry";

interface RegistryComponent {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags?: string[];
  sourcePath: string;
  sourceUrl?: string;
  peerDependencies?: string[];
  importExample?: string;
}

async function getRegistryComponent(slug: string): Promise<RegistryComponent | null> {
  const entry = componentRegistry.find((item) => item.slug === slug);
  if (!entry) return null;

  try {
    const registryPath = path.join(process.cwd(), "public/registry.json");
    const registry = JSON.parse(await readFile(registryPath, "utf8")) as {
      components: RegistryComponent[];
    };
    const fromRegistry = registry.components.find((item) => item.slug === slug);
    if (fromRegistry) return fromRegistry;
  } catch {
    // fall through to basic entry
  }

  return entry;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const entry = await getRegistryComponent(slug);

  if (!entry) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 });
  }

  const baseUrl = getSiteBaseUrl();
  const peerDependencies = entry.peerDependencies ?? [];

  return NextResponse.json({
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    description: entry.description,
    tags: entry.tags ?? [],
    sourcePath: entry.sourcePath,
    sourceUrl: `${baseUrl}/api/component-source/${entry.slug}`,
    githubSourceUrl:
      entry.sourceUrl ??
      `https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/${entry.sourcePath}`,
    peerDependencies,
    importExample:
      entry.importExample ?? `import { /* see source */ } from "@/components/ui/${entry.slug}";`,
    previewUrl: `${baseUrl}/components#${entry.slug}`,
  });
}

function getSiteBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

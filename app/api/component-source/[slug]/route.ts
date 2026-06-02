import { NextResponse } from "next/server";

import { componentRegistry } from "@/lib/components/registry";
import { getComponentSource } from "@/lib/components/source";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const entry = componentRegistry.find((item) => item.slug === slug);

  if (!entry) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 });
  }

  const source = await getComponentSource(entry);
  return NextResponse.json({ source, sourcePath: entry.sourcePath });
}

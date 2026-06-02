import { NextResponse } from "next/server";

import { componentRegistry } from "@/lib/components/registry";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();
  const category = searchParams.get("category")?.trim();

  let results = componentRegistry;

  if (category) {
    results = results.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (query) {
    results = results.filter((item) => {
      const haystack = [
        item.slug,
        item.title,
        item.description,
        item.category,
        ...(item.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }

  return NextResponse.json({
    query: query || null,
    category: category || null,
    count: results.length,
    components: results.map((item) => ({
      slug: item.slug,
      title: item.title,
      category: item.category,
      description: item.description,
      tags: item.tags ?? [],
    })),
  });
}

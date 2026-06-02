import { NextResponse } from "next/server";

import { GITHUB_REPO_SLUG } from "@/lib/site-config";

let cache: { stars: number; fetchedAt: number } | null = null;
const CACHE_MS = 5 * 60 * 1000;

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.fetchedAt < CACHE_MS) {
    return NextResponse.json(
      { stars: cache.stars, repo: GITHUB_REPO_SLUG },
      { headers: { "Cache-Control": "public, max-age=300" } }
    );
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO_SLUG}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json({ stars: cache?.stars ?? 0, repo: GITHUB_REPO_SLUG });
    }

    const data = (await response.json()) as { stargazers_count?: number };
    const stars = data.stargazers_count ?? 0;
    cache = { stars, fetchedAt: now };

    return NextResponse.json(
      { stars, repo: GITHUB_REPO_SLUG },
      { headers: { "Cache-Control": "public, max-age=300" } }
    );
  } catch {
    return NextResponse.json({ stars: cache?.stars ?? 0, repo: GITHUB_REPO_SLUG });
  }
}

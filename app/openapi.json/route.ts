import { readFile } from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";

function getSiteBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://aurora-ui-tau.vercel.app";
}

export async function GET() {
  const specPath = path.join(process.cwd(), "public/openapi.json");
  const spec = JSON.parse(await readFile(specPath, "utf8"));
  const baseUrl = getSiteBaseUrl();

  spec.servers = [{ url: baseUrl, description: "Aurora UI docs site" }];

  return NextResponse.json(spec, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

import { readFile } from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";

export async function GET() {
  const registryPath = path.join(process.cwd(), "public/registry.json");
  const raw = await readFile(registryPath, "utf8");
  return new NextResponse(raw, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

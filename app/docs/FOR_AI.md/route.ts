import { readFile } from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";

export async function GET() {
  const docPath = path.join(process.cwd(), "docs/FOR_AI.md");
  const content = await readFile(docPath, "utf8");
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

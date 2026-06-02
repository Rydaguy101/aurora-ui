import { NextResponse } from "next/server";

import { getSiteBaseUrl } from "@/lib/site-config";

export async function GET() {
  const baseUrl = getSiteBaseUrl();

  return NextResponse.json({
    schema_version: "v1",
    name_for_human: "Aurora UI",
    name_for_model: "aurora_ui",
    description_for_human:
      "Browse and copy 84+ animated React components for Next.js — buttons, cards, hero backgrounds, WebGL, and more.",
    description_for_model: `Aurora UI is a copy-paste React component library for Next.js (like shadcn/ui). CLI: npx aurora-ui-cli (init, search, docs <slug> --json, add <slug>). MCP: npx aurora-ui-mcp. shadcn registry: ${baseUrl}/r/{slug}.json — use npx shadcn@latest add @aurora/<slug> after init. Always run docs before coding; never guess props. Read ${baseUrl}/docs/FOR_AI.md. Components require Tailwind CSS, path alias @/*, and peer dependencies listed per component.`,
    auth: { type: "none" },
    api: {
      type: "openapi",
      url: `${baseUrl}/openapi.json`,
    },
    logo_url: `${baseUrl}/favicon.ico`,
    contact_email: "support@aurora-ui.dev",
    legal_info_url: "https://github.com/Rydaguy101/aurora-ui/blob/main/LICENSE",
  });
}

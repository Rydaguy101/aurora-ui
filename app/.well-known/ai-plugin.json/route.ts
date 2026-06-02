import { NextResponse } from "next/server";

function getSiteBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://aurora-ui-tau.vercel.app";
}

export async function GET() {
  const baseUrl = getSiteBaseUrl();

  return NextResponse.json({
    schema_version: "v1",
    name_for_human: "Aurora UI",
    name_for_model: "aurora_ui",
    description_for_human:
      "Browse and copy 84+ animated React components for Next.js — buttons, cards, hero backgrounds, WebGL, and more.",
    description_for_model: `Aurora UI is a copy-paste React component library for Next.js (like shadcn/ui). Use the API to list components, search by keyword, fetch metadata, and download source code. Always read integration docs at ${baseUrl}/docs/FOR_AI.md or raw GitHub FOR_AI.md before adding components. Components require Tailwind CSS, path alias @/*, and peer dependencies listed per component.`,
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

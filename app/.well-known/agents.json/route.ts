import { NextResponse } from "next/server";

function getSiteBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://aurora-ui-tau.vercel.app";
}

export async function GET() {
  const baseUrl = getSiteBaseUrl();

  return NextResponse.json({
    name: "Aurora UI",
    description:
      "Copy-paste animated React components for Next.js. Machine-readable registry, CLI, MCP server, and live previews.",
    url: baseUrl,
    repository: "https://github.com/Rydaguy101/aurora-ui",
    documentation: {
      for_ai: `${baseUrl}/docs/FOR_AI.md`,
      llms_txt: `${baseUrl}/llms.txt`,
      readme: "https://github.com/Rydaguy101/aurora-ui/blob/main/README.md",
    },
    discovery: {
      registry: `${baseUrl}/api/registry`,
      openapi: `${baseUrl}/openapi.json`,
      ai_plugin: `${baseUrl}/.well-known/ai-plugin.json`,
    },
    cli: {
      npm: "npx aurora-ui-cli",
      commands: ["list", "info", "add", "init", "docs", "help"],
    },
    mcp: {
      package: "aurora-ui-mcp",
      install: "npx aurora-ui-mcp",
      config_example: {
        mcpServers: {
          "aurora-ui": {
            command: "npx",
            args: ["-y", "aurora-ui-mcp"],
          },
        },
      },
    },
    categories: [
      "Actions",
      "Forms & Feedback",
      "Cards & Surfaces",
      "Overlays & Menus",
      "Layout & Navigation",
      "Typography & Counters",
      "Backgrounds & Ambient Effects",
      "3D & WebGL",
    ],
  });
}

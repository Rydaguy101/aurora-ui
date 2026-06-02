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
      shadcnRegistry: `${baseUrl}/shadcn-registry.json`,
      shadcnItems: `${baseUrl}/r/{name}.json`,
      openapi: `${baseUrl}/openapi.json`,
      ai_plugin: `${baseUrl}/.well-known/ai-plugin.json`,
    },
    cli: {
      init: "npx --yes github:Rydaguy101/aurora-ui init",
      info: "npx --yes github:Rydaguy101/aurora-ui info --json",
      docs: "npx --yes github:Rydaguy101/aurora-ui docs <slug> --json",
      search: "npx --yes github:Rydaguy101/aurora-ui search -q <query>",
      add: "npx --yes github:Rydaguy101/aurora-ui add <slug>",
      shadcnAdd: "npx shadcn@latest add @aurora/<slug>",
    },
    mcp: {
      install: "npx --yes github:Rydaguy101/aurora-ui aurora-ui-mcp",
      shadcnCompatibleTools: [
        "list_items_in_registries",
        "search_items_in_registries",
        "get_add_command_for_items",
        "get_item_examples_from_registries",
      ],
      config_example: {
        mcpServers: {
          "aurora-ui": {
            command: "npx",
            args: ["-y", "github:Rydaguy101/aurora-ui", "aurora-ui-mcp"],
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

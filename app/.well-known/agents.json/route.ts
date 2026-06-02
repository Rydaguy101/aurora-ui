import { NextResponse } from "next/server";

import { getSiteBaseUrl } from "@/lib/site-config";

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
      package: "aurora-ui-cli",
      init: "npx aurora-ui-cli init",
      info: "npx aurora-ui-cli info --json",
      docs: "npx aurora-ui-cli docs <slug> --json",
      search: "npx aurora-ui-cli search -q <query>",
      add: "npx aurora-ui-cli add <slug>",
      shadcnAdd: "npx shadcn@latest add @aurora/<slug>",
    },
    mcp: {
      package: "aurora-ui-mcp",
      install: "npx aurora-ui-mcp",
      shadcnCompatibleTools: [
        "list_items_in_registries",
        "search_items_in_registries",
        "get_add_command_for_items",
        "get_item_examples_from_registries",
        "get_component_guide",
      ],
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

#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const DEFAULT_REGISTRY =
  process.env.AURORA_UI_REGISTRY ??
  "https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/public/registry.json";

const DEFAULT_SITE =
  process.env.AURORA_UI_SITE ?? "https://aurora-ui-tau.vercel.app";

let registryCache = null;
let registryLoadedAt = 0;
const CACHE_MS = 60_000;

async function loadRegistry() {
  const now = Date.now();
  if (registryCache && now - registryLoadedAt < CACHE_MS) return registryCache;

  const response = await fetch(DEFAULT_REGISTRY);
  if (!response.ok) {
    throw new Error(`Failed to fetch registry (${response.status}): ${DEFAULT_REGISTRY}`);
  }
  registryCache = await response.json();
  registryLoadedAt = now;
  return registryCache;
}

async function fetchComponentSource(component) {
  const response = await fetch(component.sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch source (${response.status}): ${component.sourceUrl}`);
  }
  return response.text();
}

function findComponent(registry, slug) {
  const item = registry.components.find((entry) => entry.slug === slug);
  if (!item) {
    throw new Error(`Unknown component "${slug}". Use list_components or search_components.`);
  }
  return item;
}

const server = new McpServer({
  name: "aurora-ui",
  version: "1.0.0",
});

server.tool(
  "list_components",
  "List Aurora UI components, optionally filtered by category",
  {
    category: z.string().optional().describe("Category name, e.g. Actions or 3D & WebGL"),
  },
  async ({ category }) => {
    const registry = await loadRegistry();
    let items = registry.components;
    if (category) {
      items = items.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    const lines = items.map(
      (item) => `- ${item.slug}: ${item.title} (${item.category}) — ${item.description}`
    );

    return {
      content: [
        {
          type: "text",
          text: `Aurora UI — ${items.length} components\n\n${lines.join("\n")}`,
        },
      ],
    };
  }
);

server.tool(
  "search_components",
  "Search Aurora UI components by keyword in slug, title, description, or tags",
  {
    query: z.string().describe("Search term, e.g. button, webgl, card"),
  },
  async ({ query }) => {
    const registry = await loadRegistry();
    const q = query.trim().toLowerCase();
    const matches = registry.components.filter((item) => {
      const haystack = [
        item.slug,
        item.title,
        item.description,
        item.category,
        ...(item.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    if (matches.length === 0) {
      return {
        content: [{ type: "text", text: `No components matched "${query}".` }],
      };
    }

    const lines = matches.map(
      (item) => `- ${item.slug}: ${item.title} — ${item.description}`
    );

    return {
      content: [
        {
          type: "text",
          text: `Found ${matches.length} component(s) for "${query}":\n\n${lines.join("\n")}`,
        },
      ],
    };
  }
);

server.tool(
  "get_component_guide",
  "Get complete setup instructions, exact JSX usage, props, and import for one Aurora UI component. Call this BEFORE writing any component code.",
  {
    slug: z.string().describe("Component slug, e.g. shimmer-button"),
  },
  async ({ slug }) => {
    const registry = await loadRegistry();
    const item = findComponent(registry, slug);

    return {
      content: [
        {
          type: "text",
          text: [
            `# ${item.title} (${item.slug})`,
            item.description,
            "",
            "## Import",
            item.importExample,
            "",
            "## Usage (copy exactly)",
            item.usageExample ?? "<Component />",
            "",
            "## Props",
            JSON.stringify(item.props ?? [], null, 2),
            "",
            "## Checklist",
            item.agentInstructions ?? "See FOR_AI.md",
            "",
            `isClientComponent: ${item.isClientComponent ?? false}`,
            `peerDependencies: ${(item.peerDependencies ?? []).join(", ")}`,
            `internalDependencies: ${(item.internalDependencies ?? []).join(", ") || "none"}`,
            "",
            "Install command:",
            `npx --yes github:Rydaguy101/aurora-ui add ${item.slug}`,
          ].join("\n"),
        },
      ],
    };
  }
);

server.tool(
  "get_component",
  "Get metadata for one Aurora UI component by slug",
  {
    slug: z.string().describe("Component slug, e.g. shimmer-button"),
  },
  async ({ slug }) => {
    const registry = await loadRegistry();
    const item = findComponent(registry, slug);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              ...item,
              previewUrl: `${DEFAULT_SITE}/components#${item.slug}`,
              apiUrl: `${DEFAULT_SITE}/api/components/${item.slug}`,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

server.tool(
  "get_component_source",
  "Fetch the TypeScript source code for an Aurora UI component",
  {
    slug: z.string().describe("Component slug, e.g. button"),
  },
  async ({ slug }) => {
    const registry = await loadRegistry();
    const item = findComponent(registry, slug);
    const source = await fetchComponentSource(item);

    return {
      content: [
        {
          type: "text",
          text: `# ${item.sourcePath}\n\n${source}`,
        },
      ],
    };
  }
);

server.tool(
  "get_integration_guide",
  "Fetch the Aurora UI agent integration guide (read this before adding components)",
  {},
  async () => {
    const url =
      process.env.AURORA_UI_DOCS ??
      "https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/docs/FOR_AI.md";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch docs (${response.status}): ${url}`);
    }
    const text = await response.text();
    return { content: [{ type: "text", text }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("aurora-ui-mcp:", error);
  process.exit(1);
});

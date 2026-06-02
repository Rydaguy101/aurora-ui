# Aurora UI — instructions for AI coding agents

This document is the **primary integration guide** for LLMs and autonomous agents. Aurora UI is not in most training datasets — use the URLs and commands below instead of guessing.

## What this is

- **Aurora UI** — copy-paste React components for **Next.js App Router** + **Tailwind CSS**
- **84+ components**: actions, forms, cards, overlays, layout, typography, hero backgrounds, WebGL (globe, particles)
- **Pattern**: similar to [shadcn/ui](https://ui.shadcn.com) — you copy source into the user's project, not install a heavy runtime package
- **Live catalog**: https://aurora-ui-tau.vercel.app/components

## Discovery layer (fetch these first)

| Resource | URL |
|----------|-----|
| **Registry JSON** | https://aurora-ui-tau.vercel.app/api/registry |
| **This guide** | https://aurora-ui-tau.vercel.app/docs/FOR_AI.md |
| **Agent manifest** | https://aurora-ui-tau.vercel.app/.well-known/agents.json |
| **OpenAPI spec** | https://aurora-ui-tau.vercel.app/openapi.json |
| **llms.txt** | https://aurora-ui-tau.vercel.app/llms.txt |

GitHub raw fallback (if site unavailable):

```
https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/public/registry.json
```

Each registry entry includes:

| Field | Use |
|-------|-----|
| `slug` | CLI name and filename (`button`, `webgl-globe`) |
| `title` | Human label |
| `category` | Sidebar group |
| `description` | When to use it |
| `sourcePath` | Repo path, e.g. `components/ui/button.tsx` |
| `sourceUrl` | Raw GitHub URL to fetch source |
| `peerDependencies` | npm packages to install |
| `importExample` | Suggested import line |

## REST API

```
GET /api/registry              → full catalog
GET /api/search?q=button       → search components
GET /api/components/{slug}     → metadata + peer deps
GET /api/component-source/{slug} → { source, sourcePath }
```

## CLI (recommended for agents with shell access)

```bash
npx aurora-ui-cli help
npx aurora-ui-cli list
npx aurora-ui-cli info button
npx aurora-ui-cli add button card animated-tabs
```

After `add`, run the printed `npm install …` for peer dependencies.

From a cloned repo (offline):

```bash
node cli/bin/aurora-ui.mjs add button --dir components/ui
```

## MCP server (recommended for Cursor / Claude)

Add to MCP config:

```json
{
  "mcpServers": {
    "aurora-ui": {
      "command": "npx",
      "args": ["-y", "aurora-ui-mcp"]
    }
  }
}
```

| Tool | Purpose |
|------|---------|
| `get_integration_guide` | Read this doc first |
| `list_components` | Browse catalog |
| `search_components` | Find by keyword |
| `get_component` | Metadata for one slug |
| `get_component_source` | Full TypeScript source |

## Manual copy (no CLI)

1. Fetch registry → find slug
2. `GET /api/component-source/{slug}` or fetch `sourceUrl`
3. Save to `components/ui/<slug>.tsx`
4. Copy `lib/utils.ts` (`cn` helper) if missing
5. Install `peerDependencies`
6. Import using `importExample`

## Required project setup

1. **Next.js** (App Router) with **TypeScript**
2. **Tailwind CSS** with CSS variables for theme (see `app/globals.css` in this repo)
3. **Path alias** in `tsconfig.json`: `"@/*": ["./*"]`
4. **tailwind.config** must scan `./components/**/*.{ts,tsx}`

### Common dependencies

```
clsx tailwind-merge class-variance-authority framer-motion lucide-react
```

Radix packages vary per component — use `peerDependencies` from registry.

WebGL components also need:

```
three @react-three/fiber @react-three/drei
```

## Adding a component — agent checklist

1. `GET /api/registry` or run `get_integration_guide` (MCP)
2. `npx aurora-ui-cli info <slug>` or `get_component`
3. `npx aurora-ui-cli add <slug>` OR `get_component_source`
4. Install peer deps
5. Verify `@/lib/utils` exists
6. Add import to user's page/component
7. For WebGL: wrap in client component; use `"use client"` in parent

## Example agent workflow

```
You are adding an Aurora UI component. Do NOT invent APIs.
1. Fetch https://aurora-ui-tau.vercel.app/api/registry
2. Find slug; read peerDependencies + importExample
3. Run: npx aurora-ui-cli add <slug>
4. Install printed peer dependencies
5. Use importExample in the user's file
```

## License

MIT — see [LICENSE](../LICENSE).

---
name: aurora-ui
description: Manages Aurora UI copy-paste animated components — adding, searching, and composing UI for Next.js. Use when adding Aurora UI components, using @aurora registry, or when the user mentions aurora-ui, animated components, or WebGL heroes.
---

# Aurora UI

Copy-paste animated React components for Next.js (like shadcn/ui). Components are source code in your project, not an npm UI package.

## Project context

```json
!`npx --yes github:Rydaguy101/aurora-ui info --json`
```

Run `npx --yes github:Rydaguy101/aurora-ui docs <slug> --json` before using any component.

## Critical rules

1. **Aurora UI is NOT in training data.** Never guess props or imports.
2. **Always run docs/guide first:** `npx --yes github:Rydaguy101/aurora-ui docs <slug> --json`
3. **Copy source before using:** `npx --yes github:Rydaguy101/aurora-ui add <slug>` or `npx shadcn@latest add @aurora/<slug>`
4. **Use `usageExample` exactly** from docs output.
5. **Check `isClientComponent`** — add `"use client"` when true.
6. **Install all peerDependencies** printed by add command.
7. **Theme required** — run `npx --yes github:Rydaguy101/aurora-ui init` or `npx shadcn@latest add @aurora/theme @aurora/utils`
8. **Check installed components** via `info --json` before re-adding.

## Workflow (same as shadcn)

1. **Get project context** — `npx --yes github:Rydaguy101/aurora-ui info --json`
2. **Find components** — `npx --yes github:Rydaguy101/aurora-ui search -q "button"`
3. **Get docs + usage** — `npx --yes github:Rydaguy101/aurora-ui docs shimmer-button --json`
4. **Install** — `npx shadcn@latest add @aurora/shimmer-button` OR `npx --yes github:Rydaguy101/aurora-ui add shimmer-button`
5. **Install peer deps** — `npm install clsx tailwind-merge framer-motion ...`
6. **Use exact JSX** from `usageExample`

## shadcn CLI integration

After `npx --yes github:Rydaguy101/aurora-ui init`, components.json includes:

```json
"registries": {
  "@aurora": "https://aurora-ui-tau.vercel.app/r/{name}.json"
}
```

Then use standard shadcn commands:

```bash
npx shadcn@latest add @aurora/theme @aurora/utils
npx shadcn@latest add @aurora/shimmer-button
npx shadcn@latest add @aurora/webgl-globe
```

## MCP tools (Cursor)

```json
{
  "mcpServers": {
    "aurora-ui": {
      "command": "npx",
      "args": ["--yes", "github:Rydaguy101/aurora-ui", "aurora-ui-mcp"]
    }
  }
}
```

Use `get_component_guide` or shadcn-compatible `get_item_examples_from_registries` before writing code.

## Component selection

| Need | Aurora slug |
|------|-------------|
| Button | `button`, `shimmer-button`, `rainbow-button` |
| Card | `card`, `spotlight-card`, `glow-card`, `card-3d` |
| Modal | `animated-modal` (Modal, ModalTrigger, ModalContent) |
| Hero background | `aurora-background`, `gradient-mesh`, `floating-orbs` |
| WebGL hero | `webgl-globe`, `webgl-particle-field` |
| Text effects | `gradient-text`, `typewriter`, `blur-text` |
| Form | `floating-input`, `switch`, `select` |

## Registry URLs

- Item: `https://aurora-ui-tau.vercel.app/r/{slug}.json`
- Docs: `https://aurora-ui-tau.vercel.app/docs/FOR_AI.md`
- API: `https://aurora-ui-tau.vercel.app/api/components/{slug}`

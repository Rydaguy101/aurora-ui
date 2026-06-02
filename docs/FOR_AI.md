# Aurora UI — AI integration (shadcn-compatible)

Aurora UI works like **shadcn/ui**: copy-paste source, `components.json`, registry JSON files, CLI commands, and MCP tools AIs already understand.

**Packages on npm:** `aurora-ui-cli` · `aurora-ui-mcp`

## Setup in your Next.js project

```bash
npx aurora-ui-cli init
npx shadcn@latest add @aurora/theme @aurora/utils
npx shadcn@latest add @aurora/shimmer-button
```

Or without shadcn CLI:

```bash
npx aurora-ui-cli add shimmer-button
npm install clsx tailwind-merge
```

## Agent workflow (mirrors shadcn)

```
1. npx aurora-ui-cli info --json              → project context
2. npx aurora-ui-cli search -q "hero"         → find slugs
3. npx aurora-ui-cli docs <slug> --json        → usage + props
4. npx shadcn@latest add @aurora/<slug>  OR  npx aurora-ui-cli add <slug>
5. npm install <peerDependencies from step 3>
6. Paste usageExample exactly into user's file
```

## Registry format (shadcn-compatible)

Each component is a registry item at:

```
https://aurora-ui-tau.vercel.app/r/{slug}.json
```

Includes embedded source, dependencies, `registryDependencies`, and markdown `docs` with usage examples.

Add to `components.json`:

```json
{
  "registries": {
    "@aurora": "https://aurora-ui-tau.vercel.app/r/{name}.json"
  }
}
```

## MCP (Cursor) — shadcn-compatible tool names

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

| Tool | Same as shadcn |
|------|----------------|
| `list_items_in_registries` | ✓ |
| `search_items_in_registries` | ✓ |
| `get_add_command_for_items` | ✓ |
| `get_item_examples_from_registries` | ✓ |
| `get_component_guide` | Aurora-specific (more detail) |

## Cursor rule

Copy [docs/CURSOR_RULE.md](./CURSOR_RULE.md) into Cursor Settings → Rules.

Or install skill from [skills/aurora-ui/SKILL.md](../skills/aurora-ui/SKILL.md).

## Mandatory rules

1. Never invent props — use `docs <slug> --json` or `get_item_examples_from_registries`
2. Never invent imports — use `importExample` from registry
3. Add `"use client"` when `isClientComponent: true`
4. Install theme (`@aurora/theme`) before first component
5. Install `utils` (`@aurora/utils`) — provides `cn()` helper

## API

| Endpoint | Purpose |
|----------|---------|
| `GET /api/components/{slug}` | Metadata + usageExample |
| `GET /r/{slug}.json` | Full shadcn registry item |
| `GET /shadcn-registry.json` | Registry index |
| `GET /.well-known/agents.json` | Machine-readable discovery manifest |

## Copy-paste system prompt

```
You integrate Aurora UI like shadcn/ui. Before writing code:
1. Run: npx aurora-ui-cli docs <slug> --json
2. Run: npx shadcn@latest add @aurora/<slug>  (or npx aurora-ui-cli add <slug>)
3. Use usageExample and importExample exactly — do not guess APIs.
4. Run npx aurora-ui-cli info --json to check installed components and aliases.
```

## Fallback (no npm)

If npm is unavailable, use the GitHub runner:

```bash
npx --yes github:Rydaguy101/aurora-ui add <slug>
```

# How to run Aurora UI CLI commands

## npm (recommended)

Both packages are published on npm:

| Package | Command |
|---------|---------|
| `aurora-ui-cli` | `npx aurora-ui-cli` |
| `aurora-ui-mcp` | `npx aurora-ui-mcp` |

```bash
npx aurora-ui-cli init
npx aurora-ui-cli list
npx aurora-ui-cli search -q "button"
npx aurora-ui-cli docs shimmer-button --json
npx aurora-ui-cli guide shimmer-button
npx aurora-ui-cli add shimmer-button button
```

## Add components to your Next.js project

```bash
cd your-nextjs-app

npx aurora-ui-cli init
npx aurora-ui-cli add shimmer-button
npm install clsx tailwind-merge class-variance-authority
```

The CLI will:
1. Create `components/ui/shimmer-button.tsx`
2. Create `lib/utils.ts` if missing
3. Print which npm packages to install
4. Print a copy-paste usage example

## shadcn CLI (alternative)

After `npx aurora-ui-cli init`:

```bash
npx shadcn@latest add @aurora/theme @aurora/utils
npx shadcn@latest add @aurora/shimmer-button
```

## Required project setup

1. **Path alias** in `tsconfig.json`:
   ```json
   "paths": { "@/*": ["./*"] }
   ```

2. **Theme CSS** — copy the `:root` variables from [aurora-ui globals.css](https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/app/globals.css) into your `app/globals.css`.

3. **Tailwind content** must include your components folder:
   ```js
   content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"]
   ```

4. **Animations** — some components need keyframes from [tailwind.config.ts](https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/tailwind.config.ts) (e.g. `animate-shimmer`, `animate-marquee`). Copy the `keyframes` and `animation` entries you need.

## MCP for Cursor

Settings → MCP → add:

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

Restart Cursor. The agent can call `get_component_guide`, `search_items_in_registries`, and other shadcn-compatible tools before writing code.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `aurora-ui-cli not found` | Use `npx aurora-ui-cli` (not `npx aurora-ui`) |
| Component looks unstyled | Copy `globals.css` theme variables |
| `Cannot find module '@/lib/utils'` | Run `add` for any component — creates utils |
| WebGL blank | Add `"use client"`, install `three`, give parent `min-h-[480px]` |
| AI used wrong props | Run `docs <slug> --json` and paste `usageExample` exactly |

## GitHub fallback

If npm is blocked:

```bash
npx --yes github:Rydaguy101/aurora-ui add shimmer-button
```

# How to run Aurora UI CLI commands

## The command that works right now

`aurora-ui-cli` is **not on npm yet**. Use the GitHub repo directly:

```bash
npx --yes github:Rydaguy101/aurora-ui list
npx --yes github:Rydaguy101/aurora-ui info shimmer-button
npx --yes github:Rydaguy101/aurora-ui guide shimmer-button
npx --yes github:Rydaguy101/aurora-ui add shimmer-button button
npx --yes github:Rydaguy101/aurora-ui init
```

First run downloads the repo (~5–15 seconds). After that it's cached.

## Add components to your Next.js project

```bash
cd your-nextjs-app

npx --yes github:Rydaguy101/aurora-ui add shimmer-button
npm install clsx tailwind-merge class-variance-authority
```

The CLI will:
1. Create `components/ui/shimmer-button.tsx`
2. Create `lib/utils.ts` if missing
3. Print which npm packages to install
4. Print a copy-paste usage example

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
      "args": ["--yes", "github:Rydaguy101/aurora-ui", "aurora-ui-mcp"]
    }
  }
}
```

Restart Cursor. The agent can call `get_component_guide` before writing code.

## When npm publish is live

After packages are published to npm, you'll be able to use:

```bash
npx aurora-ui-cli add button
npx aurora-ui-mcp
```

Until then, always use `npx --yes github:Rydaguy101/aurora-ui`.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `aurora-ui-cli not found` | Use `npx --yes github:Rydaguy101/aurora-ui` instead |
| Component looks unstyled | Copy `globals.css` theme variables |
| `Cannot find module '@/lib/utils'` | Run `add` for any component — creates utils |
| WebGL blank | Add `"use client"`, install `three`, give parent `min-h-[480px]` |
| AI used wrong props | Run `guide <slug>` and paste `usageExample` exactly |

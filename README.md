# Aurora UI

> Copy-paste animated React components for Next.js — built with Tailwind, Radix UI, and Framer Motion.

**Live docs:** [aurora-ui-tau.vercel.app/components](https://aurora-ui-tau.vercel.app/components)

Aurora UI is a **component source library** (like shadcn/ui), not a traditional npm UI kit. Copy components into your app or use the CLI.

## Quick start (humans)

```bash
git clone https://github.com/Rydaguy101/aurora-ui.git
cd aurora-ui
npm install
npm run dev
# Open http://localhost:3000/components
```

### Add components to your project

```bash
npx aurora-ui-cli add button shimmer-button card
```

## For AI assistants

Aurora UI is unlikely to be in your training data. **Fetch discovery URLs at runtime:**

| Resource | URL |
|----------|-----|
| Registry | https://aurora-ui-tau.vercel.app/api/registry |
| Integration guide | https://aurora-ui-tau.vercel.app/docs/FOR_AI.md |
| Agent manifest | https://aurora-ui-tau.vercel.app/.well-known/agents.json |
| OpenAPI | https://aurora-ui-tau.vercel.app/openapi.json |
| llms.txt | https://aurora-ui-tau.vercel.app/llms.txt |

```bash
npx aurora-ui-cli help
npx aurora-ui-cli list
npx aurora-ui-cli add webgl-globe
```

### MCP (Cursor / Claude Desktop)

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

See [docs/FOR_AI.md](docs/FOR_AI.md) and [mcp/README.md](mcp/README.md).

## Features

- 84+ animated components with live previews
- React Bits–style docs at `/components`
- Hero backgrounds + WebGL (globe, particle field)
- REST API + OpenAPI + MCP for AI agents
- Machine-readable `registry.json` for tooling

## Project structure

```
components/ui/          # Component source files (copy these)
lib/components/         # Docs registry + loaders
app/components/         # Live catalog site
public/registry.json    # AI/tooling catalog (generated)
cli/                    # aurora-ui-cli (npm)
mcp/                    # aurora-ui-mcp (npm)
docs/FOR_AI.md          # Agent integration guide
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start docs site |
| `npm run build` | Production build |
| `npm run generate:registry` | Regenerate `public/registry.json` |

## npm packages

| Package | Purpose |
|---------|---------|
| `aurora-ui-cli` | `npx aurora-ui-cli list \| info \| add` |
| `aurora-ui-mcp` | MCP server for Cursor / Claude |

## License

MIT

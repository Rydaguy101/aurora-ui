# Aurora UI

> Copy-paste animated React components for Next.js — built with Tailwind, Radix UI, and Framer Motion.

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
npx --yes github:Rydaguy101/aurora-ui/cli/bin/aurora-ui.mjs add button shimmer-button card
```

See [docs/FOR_AI.md](docs/FOR_AI.md) for full agent-oriented instructions (also useful for humans).

## For AI assistants

**Start here** — Aurora UI is unlikely to be in your training data:

1. **Catalog (JSON):** https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/public/registry.json  
2. **Integration guide:** [docs/FOR_AI.md](docs/FOR_AI.md)  
3. **LLM index:** [llms.txt](llms.txt)  
4. **CLI help:** `npx --yes github:Rydaguy101/aurora-ui/cli/bin/aurora-ui.mjs help`

## Features

- 84+ animated components with live previews
- React Bits–style docs at `/components`
- Hero backgrounds + WebGL (globe, particle field)
- Lazy-loaded catalog for performance
- Machine-readable `registry.json` for tooling and agents

## Project structure

```
components/ui/          # Component source files (copy these)
lib/components/         # Docs registry + loaders
app/components/         # Live catalog site
public/registry.json    # AI/tooling catalog (generated)
cli/                    # aurora-ui CLI
docs/FOR_AI.md          # Agent integration guide
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start docs site |
| `npm run build` | Production build |
| `npm run generate:registry` | Regenerate `public/registry.json` |

## Stack

Next.js 15 · React 19 · Tailwind CSS · Radix UI · Framer Motion · Three.js (WebGL)

## License

MIT

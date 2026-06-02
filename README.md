# Aurora UI

[![Live Demo](https://img.shields.io/badge/demo-live-8b5cf6?style=for-the-badge&logo=vercel&logoColor=white)](https://aurora-ui-tau.vercel.app/components)
[![GitHub stars](https://img.shields.io/github/stars/Rydaguy101/aurora-ui?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rydaguy101/aurora-ui/stargazers)
[![npm CLI](https://img.shields.io/npm/v/aurora-ui-cli?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/aurora-ui-cli)
[![MIT License](https://img.shields.io/badge/license-MIT-22c55e?style=for-the-badge)](LICENSE)
[![Components](https://img.shields.io/badge/components-84+-06b6d4?style=for-the-badge)](https://aurora-ui-tau.vercel.app/components)

> **Copy-paste animated React components for Next.js** — Tailwind, Radix UI, Framer Motion, WebGL heroes, and a full AI discovery layer.

<p align="center">
  <a href="https://aurora-ui-tau.vercel.app/components"><strong>✨ Browse live demos</strong></a>
  ·
  <a href="https://github.com/Rydaguy101/aurora-ui"><strong>⭐ Star on GitHub</strong></a>
  ·
  <a href="https://aurora-ui-tau.vercel.app/docs/FOR_AI.md"><strong>🤖 For AI agents</strong></a>
</p>

---

## Why Aurora UI?

| | Traditional UI kit | Aurora UI |
|---|-------------------|-----------|
| **Install** | Opaque npm package | Copy source into your repo |
| **Customize** | Fight the API | Edit the file directly |
| **Motion** | Basic transitions | Framer Motion + WebGL heroes |
| **AI tools** | Not discoverable | Registry + CLI + MCP + OpenAPI |

**84+ components** across 8 categories — buttons, forms, cards, overlays, layout, typography, hero backgrounds, and WebGL.

## Quick start

```bash
git clone https://github.com/Rydaguy101/aurora-ui.git
cd aurora-ui && npm install && npm run dev
# → http://localhost:3000/components
```

Add to your Next.js project:

```bash
npx aurora-ui-cli init
npx aurora-ui-cli docs shimmer-button --json
npx aurora-ui-cli add button shimmer-button webgl-globe
```

Or with shadcn CLI (after `init`):

```bash
npx shadcn@latest add @aurora/theme @aurora/utils
npx shadcn@latest add @aurora/shimmer-button
```

See [docs/QUICKSTART.md](docs/QUICKSTART.md).

## Live docs

**https://aurora-ui-tau.vercel.app/components**

- Live previews with customization controls
- Source tab per component
- WebGL globe & particle field demos

## For AI assistants

Aurora UI is designed for agents that are **not** in LLM training data. Always fetch docs before writing code.

| Resource | URL |
|----------|-----|
| Integration guide | https://aurora-ui-tau.vercel.app/docs/FOR_AI.md |
| Agent manifest | https://aurora-ui-tau.vercel.app/.well-known/agents.json |
| Registry | https://aurora-ui-tau.vercel.app/api/registry |
| shadcn items | https://aurora-ui-tau.vercel.app/r/{slug}.json |
| OpenAPI | https://aurora-ui-tau.vercel.app/openapi.json |
| llms.txt | https://aurora-ui-tau.vercel.app/llms.txt |

### CLI & MCP (npm)

```bash
npx aurora-ui-cli init
npx aurora-ui-cli search -q "hero"
npx aurora-ui-cli docs webgl-globe --json
npx aurora-ui-cli add webgl-globe
```

**MCP for Cursor** — add to MCP settings:

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

MCP exposes shadcn-compatible tools: `list_items_in_registries`, `search_items_in_registries`, `get_add_command_for_items`, `get_item_examples_from_registries`, plus `get_component_guide`.

Install the Cursor skill from [skills/aurora-ui/SKILL.md](skills/aurora-ui/SKILL.md) or copy [docs/CURSOR_RULE.md](docs/CURSOR_RULE.md) into your rules.

## Star the repo ⭐

If Aurora UI saves you time, **[star it on GitHub](https://github.com/Rydaguy101/aurora-ui)** — it helps others discover the project and keeps development going.

## License

MIT — see [LICENSE](LICENSE).

# Aurora UI — instructions for AI coding agents

This document is the **primary integration guide** for LLMs and autonomous agents. Aurora UI is not in most training datasets — use the URLs and commands below instead of guessing.

## What this is

- **Aurora UI** — copy-paste React components for **Next.js App Router** + **Tailwind CSS**
- **84+ components**: actions, forms, cards, overlays, layout, typography, hero backgrounds, WebGL (globe, particles)
- **Pattern**: similar to [shadcn/ui](https://ui.shadcn.com) — you copy source into the user's project, not install a heavy runtime package
- **Live catalog**: clone repo → `npm install` → `npm run dev` → `/components`

## Machine-readable catalog (fetch this first)

```
https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/public/registry.json
```

Each entry includes:

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

## CLI (recommended for agents with shell access)

Install/run from the published repo (no prior knowledge required — `--help` is self-documenting):

```bash
npx --yes github:Rydaguy101/aurora-ui/cli/bin/aurora-ui.mjs help
npx --yes github:Rydaguy101/aurora-ui/cli/bin/aurora-ui.mjs list
npx --yes github:Rydaguy101/aurora-ui/cli/bin/aurora-ui.mjs info button
npx --yes github:Rydaguy101/aurora-ui/cli/bin/aurora-ui.mjs add button card animated-tabs
```

After `add`, run the printed `npm install …` for peer dependencies.

From a cloned repo (offline):

```bash
node cli/bin/aurora-ui.mjs add button --dir components/ui
```

## Manual copy (no CLI)

1. Fetch `sourceUrl` from registry.json for the component slug
2. Save to `components/ui/<slug>.tsx` in the user's project
3. Copy `lib/utils.ts` (`cn` helper) if missing
4. Install `peerDependencies` from registry entry
5. Import using `importExample` from registry

## Required project setup

1. **Next.js** (App Router) with **TypeScript**
2. **Tailwind CSS** with CSS variables for theme (see `app/globals.css` in this repo)
3. **Path alias** in `tsconfig.json`: `"@/*": ["./*"]`
4. **tailwind.config** must scan `./components/**/*.{ts,tsx}`

### Common dependencies (install as needed)

```
clsx tailwind-merge class-variance-authority framer-motion lucide-react
```

Radix packages vary per component — use `peerDependencies` from registry.json.

WebGL components also need:

```
three @react-three/fiber @react-three/drei
```

## Adding a component — agent checklist

1. `GET registry.json` → find slug
2. `aurora-ui info <slug>` or read `sourceUrl`
3. `aurora-ui add <slug>` OR fetch raw source
4. Install peer deps
5. Verify `@/lib/utils` exists
6. Add import to user's page/component
7. For WebGL: wrap in client component; use `"use client"` in parent

## Registry source of truth (human-maintained)

`lib/components/registry.ts` — used by the docs site at `/components`.

## Other docs

| File | Purpose |
|------|---------|
| [README.md](../README.md) | Human quick start |
| [AGENTS.md](../AGENTS.md) | Cursor / workspace memory |
| [llms.txt](../llms.txt) | LLM site index |
| [public/registry.json](../public/registry.json) | Full component index |

## Example agent workflow (prompt snippet)

```
You are adding an Aurora UI component. Do NOT invent APIs.
1. Fetch https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/public/registry.json
2. Find the slug and read peerDependencies + importExample
3. Run: npx --yes github:Rydaguy101/aurora-ui/cli/bin/aurora-ui.mjs add <slug>
4. Install printed peer dependencies
5. Use the importExample in the user's file
```

## License

MIT — see [LICENSE](../LICENSE).

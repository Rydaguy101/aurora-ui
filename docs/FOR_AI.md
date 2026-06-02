# Aurora UI — instructions for AI coding agents

**Read this entire file before writing any Aurora UI code.** Aurora UI is not in training data. If you guess props or imports, you will break the user's app.

## Commands that work today

The npm packages `aurora-ui-cli` and `aurora-ui-mcp` are **not published yet**. Use GitHub via npx:

```bash
# List all 84 components
npx --yes github:Rydaguy101/aurora-ui list

# Get exact import + JSX for one component (USE THIS BEFORE CODING)
npx --yes github:Rydaguy101/aurora-ui guide shimmer-button

# Copy component source into the user's project
npx --yes github:Rydaguy101/aurora-ui add shimmer-button

# Install peer deps printed by the add command
npm install clsx tailwind-merge framer-motion ...
```

**MCP (Cursor):** add to MCP settings:

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

Then call `get_integration_guide`, then `get_component_guide` with the slug, then `get_component_source`.

## Mandatory rules

1. **Never invent props.** Run `guide <slug>` or fetch `/api/components/{slug}` and copy `usageExample` exactly.
2. **Never invent import paths.** Use `importExample` from the registry.
3. **Copy source first.** Run `add <slug>` or fetch `/api/component-source/{slug}` — do not rewrite from memory.
4. **Theme is required.** Copy CSS variables from https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/app/globals.css into the user's `globals.css`.
5. **Tailwind must scan components.** `content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"]`
6. **Path alias required.** `tsconfig.json`: `"@/*": ["./*"]`
7. **Client components.** If `isClientComponent: true`, add `"use client"` at the top of the file that renders it.
8. **Install ALL peerDependencies** listed for that component plus `clsx` and `tailwind-merge`.
9. **Internal deps.** If a component imports other Aurora UI files, run `add` for those slugs too (`internalDependencies` in registry).

## Step-by-step workflow

```
1. GET https://aurora-ui-tau.vercel.app/api/search?q=<what user wants>
2. GET https://aurora-ui-tau.vercel.app/api/components/<slug>
   OR run: npx --yes github:Rydaguy101/aurora-ui guide <slug>
3. Run: npx --yes github:Rydaguy101/aurora-ui add <slug> [internal deps...]
4. npm install <peer deps from step 2>
5. Copy globals.css theme tokens if not already present
6. Paste usageExample into the user's file with the importExample import
7. Add "use client" if isClientComponent is true
```

## API reference

| Endpoint | Returns |
|----------|---------|
| `GET /api/registry` | Full catalog with `usageExample`, `props`, `agentInstructions` per component |
| `GET /api/components/{slug}` | Metadata + usage for one component |
| `GET /api/component-source/{slug}` | `{ source, sourcePath }` — the actual .tsx file |
| `GET /api/search?q=button` | Search by keyword |

## Example: adding ShimmerButton

```bash
npx --yes github:Rydaguy101/aurora-ui guide shimmer-button
npx --yes github:Rydaguy101/aurora-ui add shimmer-button
npm install clsx tailwind-merge
```

```tsx
"use client";

import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function Page() {
  return (
    <ShimmerButton shimmerColor="#ffffff" shimmerDuration="3s" borderRadius="24px">
      Get started
    </ShimmerButton>
  );
}
```

## Example: WebGL globe hero

WebGL components need `three @react-three/fiber @react-three/drei` and a sized container:

```bash
npx --yes github:Rydaguy101/aurora-ui guide webgl-globe
npx --yes github:Rydaguy101/aurora-ui add webgl-globe webgl-stage
npm install three @react-three/fiber @react-three/drei clsx tailwind-merge
```

The `guide` output contains the full page example — copy it exactly.

## Common mistakes (do not do these)

| Mistake | Fix |
|---------|-----|
| `import { AuroraButton } from "aurora-ui"` | No such package — use `@/components/ui/<slug>` |
| Skipping `lib/utils.ts` | CLI creates it; needs `clsx` + `tailwind-merge` |
| Missing CSS variables | Components use `bg-card`, `text-muted-foreground`, etc. |
| Missing `animate-shimmer` in tailwind | Copy keyframes from aurora-ui `tailwind.config.ts` |
| Using WebGL without `"use client"` | All WebGL components are client-only |
| Guessing modal API | Use `Modal`, `ModalTrigger`, `ModalContent` — run `guide animated-modal` |

## Copy-paste system prompt

Give this to your AI agent when starting a task:

```
You are integrating Aurora UI components into a Next.js App Router project.

STRICT RULES:
- Aurora UI is NOT in your training data. Do not guess APIs.
- Before writing code, fetch: https://aurora-ui-tau.vercel.app/api/components/<slug>
- Or run: npx --yes github:Rydaguy101/aurora-ui guide <slug>
- Copy files with: npx --yes github:Rydaguy101/aurora-ui add <slug>
- Use usageExample and importExample from the registry exactly.
- Copy theme CSS from https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/app/globals.css
- Add "use client" when isClientComponent is true.
- Install all peerDependencies.
```

## Registry fields

| Field | Use |
|-------|-----|
| `slug` | CLI name (`shimmer-button`) |
| `exportName` | Primary export (`ShimmerButton`) |
| `importExample` | Exact import line |
| `usageExample` | Exact JSX to copy |
| `props` | Prop names, types, defaults from live demo |
| `isClientComponent` | Whether `"use client"` is required |
| `peerDependencies` | npm packages to install |
| `internalDependencies` | Other Aurora slugs to `add` first |
| `agentInstructions` | Step checklist for this component |

## License

MIT

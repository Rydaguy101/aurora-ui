# Cursor rule: Aurora UI

Copy this into **Cursor Settings → Rules** (or `.cursor/rules/aurora-ui.mdc`) when using Aurora UI in a project:

---

When the user asks for Aurora UI components:

1. Aurora UI is NOT in your training data. Never guess component APIs, props, or imports.

2. Before writing code, run:
   ```
   npx aurora-ui-cli docs <slug> --json
   ```
   Or fetch: `https://aurora-ui-tau.vercel.app/api/components/<slug>`

3. Copy source files:
   ```
   npx aurora-ui-cli add <slug>
   ```
   Or: `npx shadcn@latest add @aurora/<slug>` (after `npx aurora-ui-cli init`)

4. Use `usageExample` and `importExample` from the docs output exactly. Do not invent props.

5. Install all `peerDependencies`. Ensure `lib/utils.ts` exists and `@/*` path alias is configured.

6. Copy theme CSS variables from https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/app/globals.css if the project doesn't have them.

7. Add `"use client"` when `isClientComponent` is true.

8. Read full guide: https://aurora-ui-tau.vercel.app/docs/FOR_AI.md

9. Optional MCP — add `aurora-ui-mcp` via npx for shadcn-compatible registry tools.

---

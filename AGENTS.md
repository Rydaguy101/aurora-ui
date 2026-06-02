## Learned User Preferences

- Match the React Bits docs layout 1:1 for the `/components` catalog page (fixed sidebar, preview/code toggle, customize grid, props table).
- Build a comprehensive, high-quality Aurora UI library; use shadcn and Framer Motion when they fit.
- Prefer WebGL (`@react-three/fiber` / drei, Vercel-style) for immersive 3D; keep globe-style visuals—avoid CSS-only 3D stand-ins the user did not ask for.
- Do not add interactive light-beam effects; globe and particle field should fill their hero section container.
- Lazy-load component previews on selection; keep sidebar categories collapsed by default in accordion groups.
- Components page top nav: Docs plus Home (links to `/`); no Tools or Sponsors tabs.
- Docs view should explain how to use components, not link out to external tool pages.
- Verify live previews, customization controls, and build before treating catalog work as done.

## Learned Workspace Facts

- Workspace is **Aurora UI** (`aurora-ui`): a Next.js animated component library in this folder.
- **npm packages (published):** `aurora-ui-cli` (`npx aurora-ui-cli`) and `aurora-ui-mcp` (`npx aurora-ui-mcp`).
- AI integration guide: `docs/FOR_AI.md` — agents must run `docs <slug> --json` before using components.
- shadcn-compatible registry items live at `public/r/{slug}.json`; regenerate via `npm run generate:registry`.
- `/components` catalog shell lives in `app/components/_components/catalog-shell.tsx` with registry at `lib/components/registry.ts`.
- WebGL globe and particle field previews are in `app/components/_components/previews/webgl.tsx` (`components/ui/webgl-globe.tsx`, `webgl-particle-field.tsx`).
- Catalog uses `next/dynamic` to load preview chunks by category when a component is selected.
- Hero backgrounds live under **Backgrounds & Ambient Effects**; WebGL visuals under **3D & WebGL** in the registry sidebar.

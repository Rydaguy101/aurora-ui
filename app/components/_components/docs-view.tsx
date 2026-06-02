export function DocsView() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight md:text-[2.75rem] md:leading-none">
          Using Aurora UI
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Aurora UI is a copy-paste component library with 84+ live previews. Pick a component from
          the sidebar, tweak it, copy the source, or use the CLI / MCP tools for AI-assisted setup.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-base font-medium text-foreground">1. Browse and preview</h2>
        <div className="rounded-lg border border-border/60 bg-[#111111] px-5 py-4 text-sm leading-7 text-muted-foreground">
          <p>
            Use the sidebar to pick a component. The <strong className="text-foreground">Preview</strong> tab
            shows a live demo. Use the refresh button to reset controls, or tweak values under{" "}
            <strong className="text-foreground">Customize</strong> to see props in action.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-medium text-foreground">2. Copy the source</h2>
        <div className="rounded-lg border border-border/60 bg-[#111111] px-5 py-4 text-sm leading-7 text-muted-foreground">
          <p>
            Switch to the <strong className="text-foreground">Code</strong> tab to view the component file.
            Copy it into your project, or use <strong className="text-foreground">Copy Prompt</strong> to
            generate an AI prompt with the component name, path, and current settings.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-medium text-foreground">3. Import and use</h2>
        <div className="overflow-x-auto rounded-lg border border-border/60 bg-[#111111]">
          <pre className="p-5 font-mono text-[13px] leading-7 text-foreground/90">
            <code>{`// Import from the barrel export
import { Button, GradientText } from "@/components";

// Or import directly from the file
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function Page() {
  return (
    <main>
      <GradientText className="text-5xl font-bold">
        Hello world
      </GradientText>
      <ShimmerButton>Get started</ShimmerButton>
    </main>
  );
}`}</code>
          </pre>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          Components live in <code className="rounded bg-[#111111] px-1.5 py-0.5 font-mono text-[13px] text-foreground">components/ui/</code>{" "}
          and are re-exported from{" "}
          <code className="rounded bg-[#111111] px-1.5 py-0.5 font-mono text-[13px] text-foreground">components/index.ts</code>.
          Most are client components — add{" "}
          <code className="rounded bg-[#111111] px-1.5 py-0.5 font-mono text-[13px] text-foreground">&quot;use client&quot;</code>{" "}
          at the top of any file that uses motion or hooks.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-medium text-foreground">4. Customize props</h2>
        <div className="rounded-lg border border-border/60 bg-[#111111] px-5 py-4 text-sm leading-7 text-muted-foreground">
          <p>
            Each component page lists available props in the table at the bottom. Match those prop names
            when composing in your app. Interactive controls in the preview mirror the most useful props
            for quick experimentation.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-medium text-foreground">5. Theme the library</h2>
        <div className="overflow-x-auto rounded-lg border border-border/60 bg-[#111111]">
          <pre className="p-5 font-mono text-[13px] leading-7 text-foreground/90">
            <code>{`/* app/globals.css */
:root {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 263 70% 60%;
  /* ... */
}`}</code>
          </pre>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          Colors use HSL CSS variables in{" "}
          <code className="rounded bg-[#111111] px-1.5 py-0.5 font-mono text-[13px] text-foreground">app/globals.css</code>.
          Update <code className="rounded bg-[#111111] px-1.5 py-0.5 font-mono text-[13px] text-foreground">--primary</code>,{" "}
          <code className="rounded bg-[#111111] px-1.5 py-0.5 font-mono text-[13px] text-foreground">--background</code>, and
          related tokens to re-skin every component. Custom animations live in{" "}
          <code className="rounded bg-[#111111] px-1.5 py-0.5 font-mono text-[13px] text-foreground">tailwind.config.ts</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-medium text-foreground">CLI quick start</h2>
        <div className="overflow-x-auto rounded-lg border border-border/60 bg-[#111111]">
          <pre className="p-5 font-mono text-[13px] leading-7 text-foreground/90">
            <code>{`# Works today (no npm publish needed)
npx --yes github:Rydaguy101/aurora-ui list
npx --yes github:Rydaguy101/aurora-ui guide shimmer-button
npx --yes github:Rydaguy101/aurora-ui add button card webgl-globe`}</code>
          </pre>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          Always run <code className="rounded bg-[#111111] px-1.5 py-0.5 font-mono text-[13px] text-foreground">guide &lt;slug&gt;</code> before
          using a component — it prints exact JSX and props. See{" "}
          <a href="/docs/FOR_AI.md" className="text-foreground underline underline-offset-4">FOR_AI.md</a>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-medium text-foreground">For AI agents</h2>
        <div className="rounded-lg border border-border/60 bg-[#111111] px-5 py-4 text-sm leading-7 text-muted-foreground">
          <p>
            Fetch the registry at{" "}
            <code className="rounded bg-[#0a0a0a] px-1.5 py-0.5 font-mono text-[13px] text-foreground">/api/registry</code>{" "}
            or read{" "}
            <a href="/docs/FOR_AI.md" className="text-foreground underline underline-offset-4">
              FOR_AI.md
            </a>
            . MCP server:{" "}
            <code className="rounded bg-[#0a0a0a] px-1.5 py-0.5 font-mono text-[13px] text-foreground">npx --yes github:Rydaguy101/aurora-ui aurora-ui-mcp</code>
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-medium text-foreground">Requirements</h2>
        <div className="rounded-lg border border-border/60 bg-[#111111] px-5 py-4 text-sm leading-7 text-muted-foreground">
          <ul className="list-inside list-disc space-y-1">
            <li>Next.js 15+ (App Router)</li>
            <li>React 19+</li>
            <li>Tailwind CSS 3.4+</li>
            <li>Framer Motion 11+</li>
            <li>Radix UI + lucide-react (per component)</li>
            <li>three + @react-three/fiber for WebGL components</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

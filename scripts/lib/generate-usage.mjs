/** @typedef {{ key: string; label: string; type: string; min?: number; max?: number; step?: number }} Control */

const USAGE_OVERRIDES = {
  "animated-modal": (state) => {
    const label = state.label ?? "Open modal";
    return `<Modal>
  <ModalTrigger><Button>${label}</Button></ModalTrigger>
  <ModalContent>
    <h3 className="text-lg font-semibold">Title</h3>
    <p className="mt-2 text-sm text-muted-foreground">Your content here.</p>
  </ModalContent>
</Modal>`;
  },
  "animated-tabs": (state) => {
    const defaultTab = state.defaultTab ?? "design";
    return `<AnimatedTabs
  defaultTab="${defaultTab}"
  tabs={[
    { id: "design", label: "Design", content: <p>Design content</p> },
    { id: "motion", label: "Motion", content: <p>Motion content</p> },
  ]}
/>`;
  },
  accordion: () => `<Accordion
  items={[
    { id: "1", title: "Question?", content: "Answer here." },
    { id: "2", title: "Another?", content: "More details." },
  ]}
/>`,
  "command-menu": () => `<CommandMenu />`,
  carousel: () => `<Carousel items={[{ id: "1", title: "Slide 1" }, { id: "2", title: "Slide 2" }]} />`,
  "magnetic-button": (state) => {
    const label = state.label ?? "Click me";
    const strength = state.strength ?? 0.35;
    return `<MagneticButton strength={${strength}}>
  <Button>${label}</Button>
</MagneticButton>`;
  },
  "webgl-globe": (state) => {
    const props = formatProps(state, {
      count: { type: "number" },
      color: { type: "string" },
      speed: { type: "number" },
      size: { type: "number" },
    });
    return `"use client";

export default function Hero() {
  return (
    <section className="relative min-h-[480px] overflow-hidden">
      <WebGLGlobe className="absolute inset-0"${props ? ` ${props}` : ""} />
      <div className="relative z-10 flex min-h-[480px] flex-col items-center justify-center px-8 text-center">
        <h1 className="text-4xl font-bold">Your headline</h1>
      </div>
    </section>
  );
}`;
  },
  "webgl-particle-field": (state) => {
    const props = formatProps(state, {
      count: { type: "number" },
      color: { type: "string" },
      speed: { type: "number" },
      spread: { type: "number" },
    });
    return `"use client";

export default function Hero() {
  return (
    <section className="relative min-h-[480px] overflow-hidden">
      <WebGLParticleField className="absolute inset-0"${props ? ` ${props}` : ""} />
      <div className="relative z-10 flex min-h-[480px] items-center justify-center">
        <h1 className="text-4xl font-bold">Your headline</h1>
      </div>
    </section>
  );
}`;
  },
};

export function parseInitialState(block) {
  const match = block.match(/initialState:\s*\{([^}]*)\}/);
  if (!match) return {};

  const state = {};
  for (const part of match[1].split(",")) {
    const entry = part.trim();
    if (!entry) continue;
    const [rawKey, rawValue] = entry.split(":").map((piece) => piece.trim());
    if (!rawKey || rawValue === undefined) continue;
    const key = rawKey.replace(/['"]/g, "");
    if (rawValue === "true") state[key] = true;
    else if (rawValue === "false") state[key] = false;
    else if (/^["']/.test(rawValue)) state[key] = rawValue.replace(/^["']|["']$/g, "");
    else if (!Number.isNaN(Number(rawValue))) state[key] = Number(rawValue);
    else state[key] = rawValue.replace(/['"]/g, "");
  }
  return state;
}

export function parseControls(block) {
  const controls = [];
  const controlPattern = /\{\s*key:\s*"([^"]+)"[\s\S]*?label:\s*"([^"]+)"[\s\S]*?type:\s*"([^"]+)"/g;
  for (const match of block.matchAll(controlPattern)) {
    controls.push({ key: match[1], label: match[2], type: match[3] });
  }
  return controls;
}

function formatPropValue(key, value, control) {
  if (key === "label") return null;
  if (typeof value === "string") return `${key}="${value}"`;
  if (typeof value === "boolean") return value ? key : `${key}={false}`;
  if (typeof value === "number") {
    if (control?.label?.toLowerCase().includes("duration")) return `${key}="${value}s"`;
    if (control?.label?.toLowerCase().includes("radius")) return `${key}="${value}px"`;
    return `${key}={${value}}`;
  }
  return `${key}={${JSON.stringify(value)}}`;
}

function formatProps(state, schema) {
  return Object.entries(state)
    .filter(([key]) => schema[key])
    .map(([key, value]) => {
      if (schema[key].type === "string") return `${key}="${value}"`;
      return `${key}={${value}}`;
    })
    .join(" ");
}

export function extractExports(sourceFile) {
  const names = [];
  for (const match of sourceFile.matchAll(/export (?:function|const) (\w+)/g)) {
    names.push(match[1]);
  }
  return names;
}

export function extractInternalDeps(sourceFile) {
  return [
    ...new Set(
      [...sourceFile.matchAll(/from "@\/components\/ui\/([^"]+)"/g)].map((match) => match[1])
    ),
  ];
}

export function buildPropsTable(controls, initialState) {
  return controls.map((control) => ({
    name: control.key,
    type:
      control.type === "toggle"
        ? "boolean"
        : control.type === "slider"
          ? "number"
          : "string",
    default: initialState[control.key],
    description: control.label,
  }));
}

export function buildUsageExample({ slug, exportName, controls, initialState, block }) {
  if (USAGE_OVERRIDES[slug]) {
    return USAGE_OVERRIDES[slug](initialState);
  }

  const primaryExport = exportName ?? "Component";
  const childLabel = initialState.label;
  const propParts = controls
    .map((control) => formatPropValue(control.key, initialState[control.key], control))
    .filter(Boolean);

  const propsString = propParts.length ? ` ${propParts.join(" ")}` : "";

  if (childLabel !== undefined) {
    return `<${primaryExport}${propsString}>${childLabel}</${primaryExport}>`;
  }

  if (propsString) {
    return `<${primaryExport}${propsString} />`;
  }

  return `<${primaryExport} />`;
}

export function buildAgentInstructions({ slug, exportName, isClientComponent, internalDeps, peerDependencies, usageExample }) {
  const lines = [
    `1. Run: npx aurora-ui-cli add ${slug}`,
    "2. Install printed peer dependencies with npm install",
    "3. Ensure lib/utils.ts exists (CLI creates it) and @/* alias is configured",
    "4. Copy theme CSS variables from https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/app/globals.css into your globals.css",
    "5. Ensure tailwind.config content includes ./components/**/*.{ts,tsx}",
  ];

  if (isClientComponent) {
    lines.push(`6. Add "use client" at the top of any file that renders <${exportName}>`);
  }

  if (internalDeps.length) {
    lines.push(`7. Also add internal deps: npx aurora-ui-cli add ${internalDeps.join(" ")}`);
  }

  if (peerDependencies.length) {
    lines.push(`8. Required packages: ${peerDependencies.join(", ")}`);
  }

  lines.push(`9. Use exactly this JSX (do not invent props):\n${usageExample}`);

  return lines.join("\n");
}

#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "../..");

const DEFAULT_SITE = process.env.AURORA_UI_SITE ?? "https://aurora-ui-tau.vercel.app";
const DEFAULT_REGISTRY =
  process.env.AURORA_UI_REGISTRY ??
  `${DEFAULT_SITE}/api/registry`;
const GITHUB_RAW = "https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main";
const NPX_CMD = "npx --yes github:Rydaguy101/aurora-ui";

const HELP = `
aurora-ui — copy-paste animated React components for Next.js

INSTALL (works today — no npm publish required)
  ${NPX_CMD} list
  ${NPX_CMD} info shimmer-button
  ${NPX_CMD} add button shimmer-button
  ${NPX_CMD} guide webgl-globe

USAGE
  aurora-ui list [--category <name>] [--json]
  aurora-ui info <slug>
  aurora-ui guide <slug>          Full AI-friendly setup + usage for one component
  aurora-ui add <slug> [slug...] [--dir <path>] [--registry <url>]
  aurora-ui init
  aurora-ui docs

AI / AGENT QUICK START
  1. Read: ${DEFAULT_SITE}/docs/FOR_AI.md
  2. List components: ${NPX_CMD} list
  3. Get exact usage: ${NPX_CMD} guide <slug>
  4. Copy files: ${NPX_CMD} add <slug>
  5. Install peer deps printed after add
  6. MCP (Cursor): npx --yes github:Rydaguy101/aurora-ui aurora-ui-mcp

ENV
  AURORA_UI_REGISTRY   Override registry.json URL
  AURORA_UI_SITE         Docs site URL

EXAMPLES
  ${NPX_CMD} list --category "Actions"
  ${NPX_CMD} guide animated-modal
  ${NPX_CMD} add card spotlight-card --dir src/components/ui
`.trim();

function parseArgs(argv) {
  const args = [...argv];
  const command = args.shift() ?? "help";
  const flags = {};
  const positional = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--dir") flags.dir = args[++index];
    else if (arg === "--registry") flags.registry = args[++index];
    else if (arg === "--category") flags.category = args[++index];
    else if (arg === "--json") flags.json = true;
    else if (arg.startsWith("-")) throw new Error(`Unknown flag: ${arg}`);
    else positional.push(arg);
  }

  return { command, flags, positional };
}

async function loadRegistry(url) {
  if (url.startsWith("file:") || url.startsWith("/") || /^[A-Za-z]:/.test(url)) {
    const filePath = url.startsWith("file:") ? fileURLToPath(url) : url;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  const local = path.join(repoRoot, "public/registry.json");
  const packageLocal = path.join(packageRoot, "public/registry.json");
  if (url === DEFAULT_REGISTRY && fs.existsSync(local)) {
    return JSON.parse(fs.readFileSync(local, "utf8"));
  }
  if (url === DEFAULT_REGISTRY && fs.existsSync(packageLocal)) {
    return JSON.parse(fs.readFileSync(packageLocal, "utf8"));
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch registry (${response.status}): ${url}`);
  return response.json();
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function copyUtils(targetRoot) {
  const utilsTarget = path.join(targetRoot, "lib/utils.ts");
  if (fs.existsSync(utilsTarget)) return;

  ensureDir(path.dirname(utilsTarget));
  const utilsSource = path.join(repoRoot, "lib/utils.ts");
  let content;

  if (fs.existsSync(utilsSource)) {
    content = fs.readFileSync(utilsSource, "utf8");
  } else {
    const response = await fetch(`${GITHUB_RAW}/lib/utils.ts`);
    if (!response.ok) {
      content = `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`;
    } else {
      content = await response.text();
    }
  }

  fs.writeFileSync(utilsTarget, content);
  console.log(`  + lib/utils.ts`);
}

async function fetchSource(component, registry) {
  const local = path.join(repoRoot, component.sourcePath);
  if (fs.existsSync(local)) return fs.readFileSync(local, "utf8");

  const response = await fetch(component.sourceUrl);
  if (!response.ok) throw new Error(`Failed to fetch ${component.sourceUrl}`);
  return response.text();
}

async function cmdList(registry, flags) {
  let items = registry.components;
  if (flags.category) {
    items = items.filter((item) => item.category.toLowerCase() === flags.category.toLowerCase());
  }

  if (flags.json) {
    console.log(JSON.stringify(items, null, 2));
    return;
  }

  console.log(`Aurora UI — ${items.length} components\n`);
  for (const category of registry.categoryOrder) {
    const group = items.filter((item) => item.category === category);
    if (group.length === 0) continue;
    console.log(category);
    for (const item of group) console.log(`  ${item.slug.padEnd(28)} ${item.title}`);
    console.log("");
  }
}

async function cmdInfo(registry, slug) {
  const item = registry.components.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Unknown component "${slug}". Run: aurora-ui list`);

  console.log(`${item.title} (${item.slug})`);
  console.log(`Category: ${item.category}`);
  console.log(`Description: ${item.description}`);
  console.log(`Source: ${item.sourcePath}`);
  console.log(`Raw URL: ${item.sourceUrl}`);
  if (item.tags?.length) console.log(`Tags: ${item.tags.join(", ")}`);
  if (item.peerDependencies?.length) console.log(`Peer deps: ${item.peerDependencies.join(", ")}`);
  console.log(`Import: ${item.importExample}`);
  if (item.isClientComponent) console.log(`Client component: yes — add "use client" to files that render it`);
  if (item.usageExample) {
    console.log(`\nUsage:\n${item.usageExample}`);
  }
}

async function cmdGuide(registry, slug) {
  const item = registry.components.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Unknown component "${slug}". Run: aurora-ui list`);

  console.log(`# ${item.title} (${item.slug})\n`);
  console.log(item.description);
  console.log(`\n## Install\n`);
  console.log(`${NPX_CMD} add ${item.slug}`);
  if (item.internalDependencies?.length) {
    console.log(`${NPX_CMD} add ${item.internalDependencies.join(" ")}`);
  }
  console.log(`\n## Import\n`);
  console.log(item.importExample);
  console.log(`\n## Usage (copy exactly — do not invent props)\n`);
  console.log(item.usageExample ?? "<Component />");
  if (item.props?.length) {
    console.log(`\n## Props\n`);
    for (const prop of item.props) {
      console.log(`- ${prop.name} (${prop.type}) default: ${JSON.stringify(prop.default)} — ${prop.description}`);
    }
  }
  console.log(`\n## Agent checklist\n`);
  console.log(item.agentInstructions ?? "See docs/FOR_AI.md");
  console.log(`\n## Source\n`);
  console.log(item.liveSourceUrl ?? item.sourceUrl);
}

async function cmdAdd(registry, slugs, flags) {
  const targetDir = path.resolve(process.cwd(), flags.dir ?? "components/ui");
  ensureDir(targetDir);

  const allPeerDeps = new Set(["clsx", "tailwind-merge", "class-variance-authority"]);
  const copied = [];

  for (const slug of slugs) {
    const item = registry.components.find((entry) => entry.slug === slug);
    if (!item) throw new Error(`Unknown component "${slug}". Run: aurora-ui list`);

    const source = await fetchSource(item, registry);
    const filename = path.basename(item.sourcePath);
    const target = path.join(targetDir, filename);
    fs.writeFileSync(target, source);
    copied.push(target);
    item.peerDependencies?.forEach((dep) => allPeerDeps.add(dep));
    console.log(`  + ${path.relative(process.cwd(), target)}`);
  }

  await copyUtils(process.cwd());

  const lastItem = registry.components.find((entry) => entry.slug === slugs[slugs.length - 1]);

  console.log("\nInstall peer dependencies in your project:");
  console.log(`  npm install ${[...allPeerDeps].join(" ")}`);
  console.log("\nRequired project setup:");
  console.log(`  1. tsconfig paths: "@/*" -> "./*"`);
  console.log(`  2. Copy theme CSS from ${GITHUB_RAW}/app/globals.css`);
  console.log(`  3. Tailwind content must include ./components/**/*.{ts,tsx}`);
  if (lastItem?.usageExample) {
    console.log(`\nUsage example for ${lastItem.slug}:\n${lastItem.importExample}\n\n${lastItem.usageExample}`);
  }
  if (lastItem?.isClientComponent) {
    console.log(`\nAdd "use client" at the top of the page/component file.`);
  }
}

function cmdInit() {
  console.log(`Aurora UI setup checklist

1. Next.js App Router project with Tailwind CSS
2. Add path alias in tsconfig.json: "@/*" -> "./*"
3. Copy globals.css theme tokens from:
   ${GITHUB_RAW}/app/globals.css
4. Add components:
   ${NPX_CMD} add button card
5. Install peer deps printed by the add command
6. Browse live docs: ${DEFAULT_SITE}/components

AI agents: read ${DEFAULT_SITE}/docs/FOR_AI.md first, then run:
  ${NPX_CMD} guide <slug>`);
}

function cmdDocs() {
  console.log(`${DEFAULT_SITE}/docs/FOR_AI.md`);
  console.log(`${DEFAULT_SITE}/.well-known/agents.json`);
  console.log(DEFAULT_REGISTRY);
  console.log(`MCP: npx --yes github:Rydaguy101/aurora-ui aurora-ui-mcp`);
}

async function main() {
  const { command, flags, positional } = parseArgs(process.argv.slice(2));

  if (command === "help" || command === "--help" || command === "-h") {
    console.log(HELP);
    return;
  }

  if (command === "init") return cmdInit();
  if (command === "docs") return cmdDocs();

  const registry = await loadRegistry(flags.registry ?? DEFAULT_REGISTRY);

  if (command === "list") return cmdList(registry, flags);
  if (command === "info") return cmdInfo(registry, positional[0]);
  if (command === "guide") {
    if (!positional[0]) throw new Error("Usage: aurora-ui guide <slug>");
    return cmdGuide(registry, positional[0]);
  }
  if (command === "add") {
    if (positional.length === 0) throw new Error("Usage: aurora-ui add <slug> [slug...]");
    return cmdAdd(registry, positional, flags);
  }

  throw new Error(`Unknown command "${command}". Run: aurora-ui help`);
}

main().catch((error) => {
  console.error(`aurora-ui: ${error.message}`);
  process.exit(1);
});

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
aurora-ui — copy-paste animated React components for Next.js (shadcn-compatible workflow)

QUICK START
  ${NPX_CMD} init                    Create components.json with @aurora registry
  ${NPX_CMD} search -q "button"      Find components
  ${NPX_CMD} docs shimmer-button     Get docs + usage URLs (JSON)
  ${NPX_CMD} view shimmer-button     Full registry item (JSON)
  ${NPX_CMD} add shimmer-button      Copy into your project
  ${NPX_CMD} info --json             Project context (aliases, installed components)

SHADCN CLI (after init)
  npx shadcn@latest add @aurora/shimmer-button
  npx shadcn@latest add @aurora/theme @aurora/utils

COMMANDS
  aurora-ui init [--force]
  aurora-ui info [--json] [<slug>]
  aurora-ui list [--category <name>] [--json]
  aurora-ui search -q <query> [--json]
  aurora-ui docs <slug> [slug...] [--json]
  aurora-ui view <slug> [--json]
  aurora-ui guide <slug>
  aurora-ui add <slug> [slug...] [--dir <path>]
  aurora-ui docs

AI / MCP
  Read: ${DEFAULT_SITE}/docs/FOR_AI.md
  MCP:  npx --yes github:Rydaguy101/aurora-ui aurora-ui-mcp
  Registry: ${DEFAULT_SITE}/r/{name}.json
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
    else if (arg === "-q" || arg === "--query") flags.query = args[++index];
    else if (arg === "--force") flags.force = true;
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

function readComponentsJson(cwd = process.cwd()) {
  const configPath = path.join(cwd, "components.json");
  if (!fs.existsSync(configPath)) return null;
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function resolveUiDir(config, cwd = process.cwd()) {
  const alias = config?.aliases?.ui ?? "@/components/ui";
  const relative = alias.replace(/^@\//, "").replace(/^\.\//, "");
  return path.join(cwd, relative);
}

function listInstalledComponents(cwd = process.cwd()) {
  const config = readComponentsJson(cwd);
  const uiDir = config ? resolveUiDir(config, cwd) : path.join(cwd, "components/ui");
  if (!fs.existsSync(uiDir)) return [];
  return fs
    .readdirSync(uiDir)
    .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"))
    .map((file) => file.replace(/\.(tsx|ts)$/, ""))
    .sort();
}

function defaultComponentsJson() {
  return {
    $schema: `${DEFAULT_SITE}/schema/components.json`,
    style: "aurora",
    rsc: true,
    tsx: true,
    tailwind: {
      config: "tailwind.config.ts",
      css: "app/globals.css",
      cssVariables: true,
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
    },
    iconLibrary: "lucide",
    registries: {
      "@aurora": `${DEFAULT_SITE}/r/{name}.json`,
    },
  };
}

function getProjectInfo(cwd = process.cwd()) {
  const config = readComponentsJson(cwd) ?? defaultComponentsJson();
  const uiDir = resolveUiDir(config, cwd);
  const installed = listInstalledComponents(cwd);

  return {
    framework: "next-app",
    style: config.style ?? "aurora",
    rsc: config.rsc ?? true,
    tsx: config.tsx ?? true,
    isRSC: config.rsc ?? true,
    aliases: config.aliases,
    resolvedPaths: {
      ui: path.relative(cwd, uiDir).replace(/\\/g, "/"),
      utils: (config.aliases?.utils ?? "@/lib/utils").replace(/^@\//, ""),
      components: (config.aliases?.components ?? "@/components").replace(/^@\//, ""),
    },
    tailwind: config.tailwind,
    iconLibrary: config.iconLibrary ?? "lucide",
    registries: Object.keys(config.registries ?? { "@aurora": true }),
    registryUrls: config.registries ?? { "@aurora": `${DEFAULT_SITE}/r/{name}.json` },
    components: installed,
    componentCount: installed.length,
    docsSite: DEFAULT_SITE,
    cliCommand: NPX_CMD,
    shadcnAddTemplate: "npx shadcn@latest add @aurora/{name}",
  };
}

function searchItems(registry, query) {
  const q = query.trim().toLowerCase();
  return registry.components.filter((item) => {
    const haystack = [item.slug, item.title, item.description, item.category, ...(item.tags ?? [])]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

async function fetchRegistryItem(slug) {
  const response = await fetch(`${DEFAULT_SITE}/r/${slug}.json`);
  if (!response.ok) throw new Error(`Registry item not found: @aurora/${slug}`);
  return response.json();
}

async function cmdSearch(registry, flags) {
  if (!flags.query) throw new Error('Usage: aurora-ui search -q "button"');
  const matches = searchItems(registry, flags.query).map((item) => ({
    name: item.slug,
    title: item.title,
    description: item.description,
    registry: "@aurora",
    addCommand: `${NPX_CMD} add ${item.slug}`,
    shadcnAddCommand: `npx shadcn@latest add @aurora/${item.slug}`,
  }));

  if (flags.json) {
    console.log(JSON.stringify({ query: flags.query, results: matches }, null, 2));
    return;
  }

  console.log(`Found ${matches.length} result(s) for "${flags.query}":\n`);
  for (const item of matches) {
    console.log(`@aurora/${item.name} — ${item.title}`);
    console.log(`  ${item.description}`);
    console.log(`  add: ${item.addCommand}`);
    console.log("");
  }
}

async function cmdDocs(registry, slugs, flags) {
  const docs = [];
  for (const slug of slugs) {
    const item = registry.components.find((entry) => entry.slug === slug);
    if (!item) throw new Error(`Unknown component "${slug}"`);

    docs.push({
      name: item.slug,
      title: item.title,
      description: item.description,
      registry: "@aurora",
      documentation: `${DEFAULT_SITE}/docs/FOR_AI.md`,
      itemUrl: `${DEFAULT_SITE}/r/${item.slug}.json`,
      apiUrl: `${DEFAULT_SITE}/api/components/${item.slug}`,
      sourceUrl: `${DEFAULT_SITE}/api/component-source/${item.slug}`,
      previewUrl: `${DEFAULT_SITE}/components#${item.slug}`,
      importExample: item.importExample,
      usageExample: item.usageExample,
      props: item.props ?? [],
      isClientComponent: item.isClientComponent ?? false,
      addCommand: `${NPX_CMD} add ${item.slug}`,
      shadcnAddCommand: `npx shadcn@latest add @aurora/${item.slug}`,
    });
  }

  if (flags.json || slugs.length > 1) {
    console.log(JSON.stringify(slugs.length === 1 ? docs[0] : docs, null, 2));
    return;
  }

  const doc = docs[0];
  console.log(`${doc.title} (@aurora/${doc.name})`);
  console.log(`Docs: ${doc.documentation}`);
  console.log(`Item: ${doc.itemUrl}`);
  console.log(`Add: ${doc.addCommand}`);
  console.log(`\nImport:\n${doc.importExample}`);
  console.log(`\nUsage:\n${doc.usageExample}`);
}

async function cmdView(slug, flags) {
  const item = await fetchRegistryItem(slug);
  if (flags.json) {
    console.log(JSON.stringify(item, null, 2));
    return;
  }
  console.log(JSON.stringify(item.meta ?? item, null, 2));
}

function cmdInit(flags) {
  const configPath = path.join(process.cwd(), "components.json");
  if (fs.existsSync(configPath) && !flags.force) {
    console.log(`components.json already exists. Use --force to overwrite.`);
    console.log(JSON.stringify(getProjectInfo(), null, 2));
    return;
  }

  fs.writeFileSync(configPath, `${JSON.stringify(defaultComponentsJson(), null, 2)}\n`);
  console.log(`Created components.json with @aurora registry.`);
  console.log(`\nNext steps:`);
  console.log(`  npx shadcn@latest add @aurora/theme @aurora/utils`);
  console.log(`  npx shadcn@latest add @aurora/button`);
  console.log(`  # or: ${NPX_CMD} add button`);
}

function cmdProjectInfo(flags) {
  const info = getProjectInfo();
  if (flags.json) {
    console.log(JSON.stringify(info, null, 2));
    return;
  }

  console.log(`Aurora UI project`);
  console.log(`Installed: ${info.components.join(", ") || "(none)"}`);
  console.log(`UI path: ${info.resolvedPaths.ui}`);
  console.log(`Registries: ${info.registries.join(", ")}`);
}

async function fetchSource(component) {
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
  if (item.usageExample) console.log(`\nUsage:\n${item.usageExample}`);
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
  console.log(`\n## shadcn CLI\n`);
  console.log(`npx shadcn@latest add @aurora/${item.slug}`);
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
  const config = readComponentsJson();
  const defaultUi = config?.aliases?.ui?.replace(/^@\//, "") ?? "components/ui";
  const targetDir = path.resolve(process.cwd(), flags.dir ?? defaultUi);
  ensureDir(targetDir);

  const allPeerDeps = new Set(["clsx", "tailwind-merge", "class-variance-authority"]);
  const copiedSlugs = new Set();

  async function addOne(slug) {
    if (copiedSlugs.has(slug)) return;
    const item = registry.components.find((entry) => entry.slug === slug);
    if (!item) throw new Error(`Unknown component "${slug}". Run: aurora-ui list`);

    for (const dep of item.internalDependencies ?? []) {
      await addOne(dep);
    }

    const source = await fetchSource(item);
    const filename = path.basename(item.sourcePath);
    const target = path.join(targetDir, filename);
    fs.writeFileSync(target, source);
    copiedSlugs.add(slug);
    item.peerDependencies?.forEach((dep) => allPeerDeps.add(dep));
    console.log(`  + ${path.relative(process.cwd(), target)}`);
  }

  for (const slug of slugs) {
    await addOne(slug);
  }

  await copyUtils(process.cwd());

  const lastItem = registry.components.find((entry) => entry.slug === slugs[slugs.length - 1]);

  console.log("\nInstall peer dependencies in your project:");
  console.log(`  npm install ${[...allPeerDeps].join(" ")}`);
  console.log("\nRequired project setup:");
  console.log(`  1. tsconfig paths: "@/*" -> "./*"`);
  console.log(`  2. Run: ${NPX_CMD} init  (or npx shadcn@latest add @aurora/theme)`);
  console.log(`  3. Tailwind content must include ./components/**/*.{ts,tsx}`);
  if (lastItem?.usageExample) {
    console.log(`\nUsage example for ${lastItem.slug}:\n${lastItem.importExample}\n\n${lastItem.usageExample}`);
  }
  if (lastItem?.isClientComponent) {
    console.log(`\nAdd "use client" at the top of the page/component file.`);
  }
}

function cmdDocsIndex() {
  console.log(`${DEFAULT_SITE}/docs/FOR_AI.md`);
  console.log(`${DEFAULT_SITE}/.well-known/agents.json`);
  console.log(`${DEFAULT_SITE}/shadcn-registry.json`);
  console.log(DEFAULT_REGISTRY);
  console.log(`MCP: npx --yes github:Rydaguy101/aurora-ui aurora-ui-mcp`);
}

async function main() {
  const { command, flags, positional } = parseArgs(process.argv.slice(2));

  if (command === "help" || command === "--help" || command === "-h") {
    console.log(HELP);
    return;
  }

  if (command === "init") return cmdInit(flags);
  if (command === "docs" && positional.length === 0) return cmdDocsIndex();

  const registry = await loadRegistry(flags.registry ?? DEFAULT_REGISTRY);

  if (command === "info" && (flags.json || positional.length === 0)) {
    return cmdProjectInfo(flags);
  }
  if (command === "search") return cmdSearch(registry, flags);
  if (command === "view") {
    if (!positional[0]) throw new Error("Usage: aurora-ui view <slug>");
    return cmdView(positional[0], flags);
  }
  if (command === "docs") return cmdDocs(registry, positional, flags);

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

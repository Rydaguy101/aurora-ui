import fs from "fs";
import path from "path";

import {
  buildAgentInstructions,
  buildPropsTable,
  buildUsageExample,
  extractExports,
  extractInternalDeps,
  parseControls,
  parseInitialState,
} from "./lib/generate-usage.mjs";

const root = process.cwd();
const registryPath = path.join(root, "lib/components/registry.ts");
const registrySource = fs.readFileSync(registryPath, "utf8");

const githubRepo = process.env.AURORA_UI_GITHUB_REPO ?? "Rydaguy101/aurora-ui";
const githubBranch = process.env.AURORA_UI_GITHUB_BRANCH ?? "main";
const rawBase = `https://raw.githubusercontent.com/${githubRepo}/${githubBranch}`;
const siteUrl =
  process.env.AURORA_UI_SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://aurora-ui-tau.vercel.app";

const categoryOrder = [
  "Actions",
  "Forms & Feedback",
  "Cards & Surfaces",
  "Overlays & Menus",
  "Layout & Navigation",
  "Typography & Counters",
  "Backgrounds & Ambient Effects",
  "3D & WebGL",
];

const IMPORT_OVERRIDES = {
  "animated-modal": `import { Modal, ModalTrigger, ModalContent } from "@/components/ui/animated-modal";`,
  "animated-tabs": `import { AnimatedTabs } from "@/components/ui/animated-tabs";`,
};

const components = [];
const entryPattern = /slug: "([^"]+)"[\s\S]*?title: "([^"]+)"[\s\S]*?category: "([^"]+)"[\s\S]*?description: "([^"]+)"[\s\S]*?sourcePath: "([^"]+)"/g;

for (const match of registrySource.matchAll(entryPattern)) {
  const [, slug, title, category, description, sourcePath] = match;
  const blockStart = registrySource.indexOf(`slug: "${slug}"`);
  const block = registrySource.slice(blockStart, blockStart + 1200);
  const tagsMatch = block.match(/tags: \[([^\]]*)\]/);
  const tags = tagsMatch
    ? [...tagsMatch[1].matchAll(/"([^"]+)"/g)].map((tag) => tag[1])
    : [];

  const initialState = parseInitialState(block);
  const controls = parseControls(block);

  let peerDependencies = ["clsx", "tailwind-merge"];
  let importExample = IMPORT_OVERRIDES[slug] ?? `import { /* see source */ } from "@/components/ui/${slug}";`;
  let exportName = null;
  let exportNames = [];
  let isClientComponent = false;
  let internalDependencies = [];
  let usageExample = `<${title.replace(/\s+/g, "")} />`;
  let props = buildPropsTable(controls, initialState);

  try {
    const sourceFile = fs.readFileSync(path.join(root, sourcePath), "utf8");
    isClientComponent = sourceFile.trimStart().startsWith('"use client"');
    exportNames = extractExports(sourceFile);
    exportName = exportNames[0] ?? null;
    internalDependencies = extractInternalDeps(sourceFile);

    const npmDeps = [
      ...new Set(
        [...sourceFile.matchAll(/from "@([^"/]+(?:\/[^"/]+)?)"/g)]
          .map((item) => `@${item[1]}`)
          .filter((dep) => !dep.startsWith("@/"))
      ),
    ].sort();

    peerDependencies = [...new Set([...peerDependencies, ...npmDeps])].sort();

    if (!IMPORT_OVERRIDES[slug] && exportNames.length > 1) {
      importExample = `import { ${exportNames.join(", ")} } from "@/components/ui/${slug}";`;
    } else if (!IMPORT_OVERRIDES[slug] && exportName) {
      importExample = `import { ${exportName} } from "@/components/ui/${slug}";`;
    }

    usageExample = buildUsageExample({
      slug,
      exportName,
      controls,
      initialState,
      block,
    });
  } catch {
    peerDependencies = ["clsx", "tailwind-merge"];
  }

  const agentInstructions = buildAgentInstructions({
    slug,
    exportName: exportName ?? title.replace(/\s+/g, ""),
    isClientComponent,
    internalDeps: internalDependencies,
    peerDependencies,
    usageExample,
  });

  components.push({
    slug,
    title,
    category,
    description,
    sourcePath,
    tags,
    exportName,
    exportNames,
    isClientComponent,
    internalDependencies,
    peerDependencies,
    props,
    importExample,
    usageExample,
    agentInstructions,
    sourceUrl: `${rawBase}/${sourcePath.replace(/\\/g, "/")}`,
    liveSourceUrl: `${siteUrl}/api/component-source/${slug}`,
    docsUrl: `${rawBase}/docs/FOR_AI.md`,
  });
}

const catalog = {
  $schema: "./registry.schema.json",
  name: "aurora-ui",
  version: JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).version,
  description: "High-end animated React component library for Next.js (copy-paste + CLI).",
  repository: `https://github.com/${githubRepo}`,
  homepage: siteUrl,
  docsSiteUrl: siteUrl,
  openapiUrl: `${siteUrl}/openapi.json`,
  aiPluginUrl: `${siteUrl}/.well-known/ai-plugin.json`,
  agentsManifestUrl: `${siteUrl}/.well-known/agents.json`,
  cliCommand: "npx --yes github:Rydaguy101/aurora-ui",
  mcpCommand: "npx --yes github:Rydaguy101/aurora-ui aurora-ui-mcp",
  cliPackage: "aurora-ui-cli",
  mcpPackage: "aurora-ui-mcp",
  registryUrl: `${rawBase}/public/registry.json`,
  liveRegistryUrl: `${siteUrl}/api/registry`,
  aiDocsUrl: `${siteUrl}/docs/FOR_AI.md`,
  aiDocsRawUrl: `${rawBase}/docs/FOR_AI.md`,
  llmsTxtUrl: `${siteUrl}/llms.txt`,
  categoryOrder,
  componentCount: components.length,
  components: components.sort((a, b) => a.slug.localeCompare(b.slug)),
};

const outDir = path.join(root, "public");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "registry.json"), `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Wrote public/registry.json (${components.length} components)`);

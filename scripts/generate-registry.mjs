import fs from "fs";
import path from "path";

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

const components = [];
const entryPattern = /slug: "([^"]+)"[\s\S]*?title: "([^"]+)"[\s\S]*?category: "([^"]+)"[\s\S]*?description: "([^"]+)"[\s\S]*?sourcePath: "([^"]+)"/g;

for (const match of registrySource.matchAll(entryPattern)) {
  const [, slug, title, category, description, sourcePath] = match;
  const blockStart = registrySource.indexOf(`slug: "${slug}"`);
  const block = registrySource.slice(blockStart, blockStart + 800);
  const tagsMatch = block.match(/tags: \[([^\]]*)\]/);
  const tags = tagsMatch
    ? [...tagsMatch[1].matchAll(/"([^"]+)"/g)].map((tag) => tag[1])
    : [];

  let peerDependencies = [];
  let importExample = `import { /* see source */ } from "@/components/ui/${slug}";`;
  try {
    const sourceFile = fs.readFileSync(path.join(root, sourcePath), "utf8");
    peerDependencies = [
      ...new Set(
        [...sourceFile.matchAll(/from "@([^"/]+(?:\/[^"/]+)?)"/g)]
          .map((item) => `@${item[1]}`)
          .filter((dep) => !dep.startsWith("@/"))
      ),
    ].sort();
    const exportFn = sourceFile.match(/export function (\w+)/)?.[1];
    const exportConst = sourceFile.match(/export const (\w+)/)?.[1];
    const exportName = exportFn ?? exportConst;
    if (exportName) {
      importExample = `import { ${exportName} } from "@/components/ui/${slug}";`;
    }
  } catch {
    peerDependencies = [];
  }

  components.push({
    slug,
    title,
    category,
    description,
    sourcePath,
    tags,
    peerDependencies,
    importExample,
    sourceUrl: `${rawBase}/${sourcePath.replace(/\\/g, "/")}`,
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

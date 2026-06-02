import fs from "fs";
import path from "path";

const ANIMATION_NOTE = `Some Aurora UI components use custom Tailwind animations (animate-shimmer, animate-marquee, animate-aurora, etc.). Merge keyframes from https://raw.githubusercontent.com/Rydaguy101/aurora-ui/main/tailwind.config.ts into your tailwind.config.`;

export function buildItemDocs(component) {
  return [
    `# ${component.title}`,
    "",
    component.description,
    "",
    "## Import",
    "```tsx",
    component.importExample,
    "```",
    "",
    "## Usage",
    "```tsx",
    component.isClientComponent ? '"use client";\n\n' : "",
    component.usageExample ?? "<Component />",
    "```",
    "",
    "## Props",
    ...(component.props ?? []).map(
      (prop) =>
        `- **${prop.name}** (${prop.type})${prop.default !== undefined ? ` — default: \`${JSON.stringify(prop.default)}\`` : ""}: ${prop.description}`
    ),
    "",
    component.isClientComponent
      ? '> Requires `"use client"` in the file that renders this component.'
      : "",
    "",
    ANIMATION_NOTE,
    "",
    "## Install",
    "```bash",
    `npx aurora-ui-cli add ${component.slug}`,
    "# or with shadcn CLI (after aurora-ui init):",
    `npx shadcn@latest add @aurora/${component.slug}`,
    "```",
  ]
    .filter(Boolean)
    .join("\n");
}

export function toShadcnItem(component, sourceContent, siteUrl) {
  const npmDeps = (component.peerDependencies ?? []).filter(
    (dep) => !dep.startsWith("@/") && dep !== "clsx" && dep !== "tailwind-merge"
  );

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: component.slug,
    type: "registry:ui",
    title: component.title,
    description: component.description,
    categories: [component.category, ...(component.tags ?? [])],
    dependencies: npmDeps,
    registryDependencies: [
      ...(component.internalDependencies ?? []),
      ...(!(component.slug === "utils") && sourceContent.includes('@/lib/utils')
        ? ["utils"]
        : []),
    ].filter((dep, index, all) => dep !== component.slug && all.indexOf(dep) === index),
    files: [
      {
        path: component.sourcePath.replace(/\\/g, "/"),
        type: "registry:ui",
        content: sourceContent,
      },
    ],
    docs: buildItemDocs(component),
    meta: {
      exportName: component.exportName,
      exportNames: component.exportNames,
      isClientComponent: component.isClientComponent,
      usageExample: component.usageExample,
      importExample: component.importExample,
      props: component.props,
      previewUrl: `${siteUrl}/components#${component.slug}`,
      docsUrl: `${siteUrl}/api/components/${component.slug}`,
      sourceUrl: `${siteUrl}/api/component-source/${component.slug}`,
    },
  };
}

export function generateShadcnRegistry({ root, catalog, siteUrl }) {
  const outDir = path.join(root, "public/r");
  fs.mkdirSync(outDir, { recursive: true });

  const itemNames = [];

  for (const component of catalog.components) {
    const sourcePath = path.join(root, component.sourcePath);
    const sourceContent = fs.readFileSync(sourcePath, "utf8");
    const item = toShadcnItem(component, sourceContent, siteUrl);
    fs.writeFileSync(
      path.join(outDir, `${component.slug}.json`),
      `${JSON.stringify(item, null, 2)}\n`
    );
    itemNames.push(component.slug);
  }

  const utilsContent = fs.readFileSync(path.join(root, "lib/utils.ts"), "utf8");
  const utilsItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "utils",
    type: "registry:lib",
    title: "Utils",
    description: "cn() helper for Aurora UI components.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
        content: utilsContent,
      },
    ],
    docs: "# Utils\n\nProvides the `cn()` helper used by all Aurora UI components.",
  };
  fs.writeFileSync(path.join(outDir, "utils.json"), `${JSON.stringify(utilsItem, null, 2)}\n`);
  itemNames.push("utils");

  const globalsCss = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");
  const themeMatch = globalsCss.match(/:root\s*\{[\s\S]*?\}/);
  const themeItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "theme",
    type: "registry:theme",
    title: "Aurora Theme",
    description: "CSS variables required by Aurora UI components.",
    files: [
      {
        path: "app/globals.css",
        type: "registry:theme",
        content: globalsCss,
        target: "app/globals.css",
      },
    ],
    cssVars: {
      dark: Object.fromEntries(
        [...(themeMatch?.[0]?.matchAll(/--([\w-]+):\s*([^;]+);/g) ?? [])].map((match) => [
          `--${match[1]}`,
          match[2].trim(),
        ])
      ),
    },
    docs: "# Aurora Theme\n\nCopy CSS variables into your globals.css. Required for semantic colors (bg-card, text-muted-foreground, etc.).",
  };
  fs.writeFileSync(path.join(outDir, "theme.json"), `${JSON.stringify(themeItem, null, 2)}\n`);
  itemNames.push("theme");

  const shadcnRegistry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "aurora",
    homepage: siteUrl,
    items: itemNames.map((name) => ({
      name,
      type: name === "utils" ? "registry:lib" : name === "theme" ? "registry:theme" : "registry:ui",
      registryUrl: `${siteUrl}/r/${name}.json`,
    })),
  };

  fs.writeFileSync(
    path.join(root, "public/shadcn-registry.json"),
    `${JSON.stringify(shadcnRegistry, null, 2)}\n`
  );

  return itemNames.length;
}

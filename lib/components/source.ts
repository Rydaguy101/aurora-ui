import "server-only";

import { readFile } from "fs/promises";
import path from "path";

import type { ComponentEntry } from "@/lib/components/registry";

function resolveSafePath(relativePath: string) {
  const root = process.cwd();
  const absolutePath = path.resolve(root, relativePath);

  if (!absolutePath.startsWith(root)) {
    throw new Error(`Unsafe source path: ${relativePath}`);
  }

  return absolutePath;
}

export async function getComponentSources(entries: ComponentEntry[]) {
  const sourceEntries = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = resolveSafePath(entry.sourcePath);
      const source = await readFile(absolutePath, "utf8");
      return [entry.slug, source] as const;
    })
  );

  return Object.fromEntries(sourceEntries) as Record<string, string>;
}

export async function getComponentSource(entry: ComponentEntry) {
  const absolutePath = resolveSafePath(entry.sourcePath);
  return readFile(absolutePath, "utf8");
}
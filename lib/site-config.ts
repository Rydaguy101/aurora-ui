export const GITHUB_REPO = "https://github.com/Rydaguy101/aurora-ui";
export const GITHUB_REPO_SLUG = "Rydaguy101/aurora-ui";

/** Normalize site URL from env (strips whitespace/CRLF and trailing slash). */
export function getSiteBaseUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "https://aurora-ui-tau.vercel.app";
  return raw.replace(/\r?\n/g, "").replace(/\/$/, "");
}

export const SITE_URL = getSiteBaseUrl();

export const COMPONENT_COUNT = 85;
export const CATEGORY_COUNT = 8;

export const SITE = {
  name: "Aurora UI",
  tagline: "Copy-paste animated React components for Next.js",
  description:
    "84+ animated components with live previews, WebGL heroes, AI-ready CLI & MCP. Built with Tailwind, Radix UI, and Framer Motion.",
} as const;

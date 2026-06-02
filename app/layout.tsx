import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { GITHUB_REPO, SITE, SITE_URL } from "@/lib/site-config";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — High-end animated components for Next.js`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "react",
    "nextjs",
    "components",
    "tailwind",
    "framer motion",
    "ui library",
    "shadcn",
    "webgl",
    "animated components",
  ],
  authors: [{ name: SITE.name, url: GITHUB_REPO }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    creator: "@aurora_ui",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}

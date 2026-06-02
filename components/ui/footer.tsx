import { Github, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  brand?: string;
  links?: FooterLink[];
  className?: string;
}

export function Footer({
  brand = "Aurora UI",
  links = [
    { label: "Components", href: "/components" },
    { label: "Showcase", href: "/" },
    { label: "Docs", href: "/components" },
  ],
  className,
}: FooterProps) {
  return (
    <footer className={cn("rounded-2xl border border-border bg-card/60 px-6 py-8 backdrop-blur", className)}>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
            <Sparkles className="size-4 text-white" />
          </div>
          {brand}
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="https://github.com"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github className="size-4" />
          GitHub
        </a>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">© {new Date().getFullYear()} {brand}. Built with Next.js and Framer Motion.</p>
    </footer>
  );
}

"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  brand?: string;
  links?: NavLink[];
  className?: string;
}

export function Navbar({
  brand = "Aurora UI",
  links = [
    { label: "Components", href: "/components" },
    { label: "Showcase", href: "/" },
    { label: "Docs", href: "/components" },
  ],
  className,
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("w-full rounded-2xl border border-border bg-card/60 backdrop-blur-xl", className)}>
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
            <Sparkles className="size-4 text-white" />
          </div>
          {brand}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
          <Button size="sm">Get started</Button>
        </nav>

        <button type="button" className="md:hidden" onClick={() => setOpen((current) => !current)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-3 px-4 py-4">
              {links.map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              ))}
              <Button size="sm" className="w-full">Get started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

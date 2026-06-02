"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Layers,
  Palette,
  MousePointerClick,
  Github,
  Home,
  Settings,
  User,
  Mail,
  Heart,
  Rocket,
  Shield,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RippleButton } from "@/components/ui/ripple-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Card3D } from "@/components/ui/card-3d";
import { GlowCard } from "@/components/ui/glow-card";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Accordion } from "@/components/ui/accordion";
import { Modal, ModalTrigger, ModalContent } from "@/components/ui/animated-modal";
import { Tooltip } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { FloatingInput } from "@/components/ui/floating-input";
import { BorderBeam } from "@/components/ui/border-beam";
import { Meteors } from "@/components/ui/meteors";
import { Particles } from "@/components/ui/particles";
import { Marquee } from "@/components/ui/marquee";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Dock, DockIcon } from "@/components/ui/dock";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShinyText } from "@/components/ui/shiny-text";
import { GradientText } from "@/components/ui/gradient-text";
import { Typewriter } from "@/components/ui/typewriter";
import { TextReveal } from "@/components/ui/text-reveal";
import { FlipWords } from "@/components/ui/flip-words";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Spotlight } from "@/components/ui/spotlight";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CardStack } from "@/components/ui/card-stack";

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="container py-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}

const tabs = [
  {
    id: "design",
    label: "Design",
    content: (
      <p className="text-muted-foreground">
        Meticulously crafted components with attention to spacing, motion and
        contrast for a premium feel out of the box.
      </p>
    ),
  },
  {
    id: "motion",
    label: "Motion",
    content: (
      <p className="text-muted-foreground">
        Powered by Framer Motion with spring physics, layout animations and
        scroll-triggered reveals.
      </p>
    ),
  },
  {
    id: "dx",
    label: "DX",
    content: (
      <p className="text-muted-foreground">
        Fully typed, tree-shakeable, and copy-paste friendly. Drop a component in
        and ship.
      </p>
    ),
  },
];

const faqs = [
  {
    id: "1",
    title: "What is Aurora UI built with?",
    content:
      "Next.js App Router, React 18, Tailwind CSS and Framer Motion. No heavy runtime — just composable components.",
  },
  {
    id: "2",
    title: "Can I customize the components?",
    content:
      "Every component accepts a className and is themed via CSS variables, so restyling is trivial.",
  },
  {
    id: "3",
    title: "Is it production ready?",
    content:
      "Yes. Components are accessible-minded, responsive, and server/client boundaries are handled correctly.",
  },
];

const reviews = [
  { quote: "The animations feel buttery and effortless.", name: "Ava Chen", title: "Design Lead" },
  { quote: "Shipped a landing page in an afternoon.", name: "Marcus Lee", title: "Founder" },
  { quote: "Best motion library I've dropped into Next.", name: "Priya Nair", title: "Engineer" },
  { quote: "The bento grid alone is worth it.", name: "Tom Rivera", title: "Indie Hacker" },
  { quote: "Clean code, gorgeous defaults.", name: "Sofia Park", title: "Frontend Dev" },
];

const stackCards = [
  { id: 0, name: "Aurora", designation: "Background", content: "Living gradient backgrounds that breathe." },
  { id: 1, name: "Beam", designation: "Border", content: "Animated conic borders that trace your cards." },
  { id: 2, name: "Bento", designation: "Layout", content: "Responsive feature grids with hover depth." },
];

export default function Page() {
  const [notifications, setNotifications] = useState(true);
  const [progress, setProgress] = useState(72);

  return (
    <main className="relative min-h-screen">
      <ScrollProgress />

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            Aurora UI
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="/components" className="transition-colors hover:text-foreground">Components</a>
            <a href="#buttons" className="transition-colors hover:text-foreground">Buttons</a>
            <a href="#cards" className="transition-colors hover:text-foreground">Cards</a>
            <a href="#text" className="transition-colors hover:text-foreground">Text</a>
            <a href="#layout" className="transition-colors hover:text-foreground">Layout</a>
          </nav>
          <Button size="sm" variant="outline" className="gap-2">
            <Github className="h-4 w-4" /> Star
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
        <GridPattern />
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="hsl(263 70% 60%)" />
        <Particles quantity={70} />
        <div className="container relative z-10 flex flex-col items-center text-center">
          <Badge variant="gradient" className="mb-6 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5" /> 30+ animated components
          </Badge>
          <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Build interfaces that <GradientText>feel alive</GradientText>
          </h1>
          <div className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A high-end component library for Next.js with{" "}
            <FlipWords
              words={["fluid", "premium", "delightful", "tactile"]}
              className="font-semibold text-foreground"
            />{" "}
            motion baked in.
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <RainbowButton>Get started</RainbowButton>
            </MagneticButton>
            <ShimmerButton
              type="button"
              className="shadow-2xl"
              onClick={() => {
                window.location.href = "/components";
              }}
            >
              <span className="text-sm font-medium">View components</span>
            </ShimmerButton>
          </div>
          <div className="mt-16 flex items-center gap-10 text-center">
            <div>
              <div className="text-3xl font-bold">
                <NumberTicker value={30} />+
              </div>
              <div className="text-sm text-muted-foreground">Components</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                <NumberTicker value={12000} />
              </div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                <NumberTicker value={99} decimalPlaces={1} />%
              </div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE LOGOS */}
      <div className="border-y border-border/60 py-6">
        <Marquee pauseOnHover className="[--duration:25s]">
          {["Next.js", "React", "Tailwind", "Framer Motion", "TypeScript", "Vercel"].map((t) => (
            <span key={t} className="mx-8 text-lg font-semibold text-muted-foreground/60">
              {t}
            </span>
          ))}
        </Marquee>
      </div>

      {/* BUTTONS */}
      <Section
        id="buttons"
        title="Buttons"
        subtitle="From subtle to showstopping — every interaction has a response."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <ShimmerButton>Shimmer</ShimmerButton>
          <RainbowButton>Rainbow</RainbowButton>
          <RippleButton>Ripple me</RippleButton>
          <MagneticButton>
            <Button variant="outline" className="gap-2">
              <MousePointerClick className="h-4 w-4" /> Magnetic
            </Button>
          </MagneticButton>
          <Tooltip content="I follow your cursor 👀">
            <Button variant="secondary">Hover for tooltip</Button>
          </Tooltip>
        </div>
      </Section>

      {/* CARDS */}
      <Section
        id="cards"
        title="Cards"
        subtitle="Spotlight tracking, 3D tilt, and animated borders."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <SpotlightCard>
            <Palette className="mb-4 h-7 w-7 text-primary" />
            <h3 className="text-lg font-semibold">Spotlight Card</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A radial spotlight follows your cursor across the surface.
            </p>
          </SpotlightCard>

          <Card3D>
            <Layers className="mb-4 h-7 w-7 text-primary" />
            <h3 className="text-lg font-semibold">3D Tilt Card</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Springy perspective tilt with floating depth content.
            </p>
          </Card3D>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8">
            <BorderBeam />
            <Zap className="mb-4 h-7 w-7 text-primary" />
            <h3 className="text-lg font-semibold">Border Beam</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A glowing comet traces the card&apos;s border forever.
            </p>
          </div>

          <GlowCard className="md:col-span-3">
            <div className="flex flex-col items-start gap-2">
              <Wand2 className="h-7 w-7 text-primary" />
              <h3 className="text-lg font-semibold">Glow Card</h3>
              <p className="text-sm text-muted-foreground">
                Move your cursor across this card to reveal the gradient glow border.
              </p>
            </div>
          </GlowCard>
        </div>
      </Section>

      {/* TEXT EFFECTS */}
      <Section
        id="text"
        title="Text effects"
        subtitle="Typewriters, gradients, shimmer and scroll reveals."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-sm text-muted-foreground">Typewriter</p>
            <div className="mt-2 text-2xl font-semibold">
              We build{" "}
              <Typewriter words={["websites", "dashboards", "experiences", "the future"]} />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-sm text-muted-foreground">Gradient + Shiny</p>
            <div className="mt-2 text-2xl font-semibold">
              <GradientText>Aurora gradient</GradientText>
            </div>
            <ShinyText className="mt-2 block text-lg">Subtle shiny shimmer text</ShinyText>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 md:col-span-2">
            <p className="mb-3 text-sm text-muted-foreground">Scroll reveal</p>
            <TextReveal
              text="This headline animates word by word as it enters the viewport, creating a refined reveal."
              className="text-2xl font-semibold md:text-3xl"
            />
          </div>
        </div>
      </Section>

      {/* LAYOUT / BENTO */}
      <Section
        id="layout"
        title="Bento layout"
        subtitle="Composable feature grids with depth on hover."
      >
        <BentoGrid>
          <BentoCard
            className="md:col-span-2"
            icon={<Rocket className="h-8 w-8" />}
            title="Blazing fast"
            description="Zero-config, tree-shakeable components that don't slow you down."
            background={<Meteors number={14} />}
            cta={<Button size="sm" variant="outline">Learn more</Button>}
          />
          <BentoCard
            icon={<Shield className="h-8 w-8" />}
            title="Type-safe"
            description="Fully typed props with sensible defaults."
            background={<GridPattern variant="dot" />}
          />
          <BentoCard
            icon={<Heart className="h-8 w-8" />}
            title="Loved by devs"
            description="Crafted for delight at every interaction."
            background={<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />}
          />
          <BentoCard
            className="md:col-span-2"
            icon={<Palette className="h-8 w-8" />}
            title="Themeable"
            description="Restyle everything through CSS variables and Tailwind."
            background={<Particles quantity={30} color="236, 72, 153" />}
          />
        </BentoGrid>
      </Section>

      {/* INTERACTIVE */}
      <Section
        id="interactive"
        title="Interactive"
        subtitle="Tabs, accordions, modals, switches and inputs."
      >
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-8">
            <AnimatedTabs tabs={tabs} />
            <Accordion items={faqs} />
          </div>
          <div className="space-y-8">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified about updates.</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="mt-6 space-y-4">
                <FloatingInput label="Full name" />
                <FloatingInput label="Email address" type="email" />
              </div>
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Upload progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} />
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => setProgress((p) => Math.max(0, p - 10))}>
                    -10
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setProgress((p) => Math.min(100, p + 10))}>
                    +10
                  </Button>
                </div>
              </div>
            </div>

            <Modal>
              <ModalTrigger className="w-full">
                <Button className="w-full">Open animated modal</Button>
              </ModalTrigger>
              <ModalContent>
                <h3 className="text-xl font-semibold">Spring-powered modal</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Backdrop blur, scale and translate combine for a polished entrance.
                </p>
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button size="sm">Confirm</Button>
                </div>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section
        id="testimonials"
        title="Loved everywhere"
        subtitle="Infinite marquee of testimonials and an auto-cycling card stack."
      >
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0 space-y-4">
            <InfiniteMovingCards items={reviews} />
            <InfiniteMovingCards items={reviews} reverse />
          </div>
          <div className="flex justify-center">
            <CardStack items={stackCards} />
          </div>
        </div>
      </Section>

      {/* LOADING STATES */}
      <Section
        id="loading"
        title="Loading states"
        subtitle="Shimmering skeletons keep things smooth."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="mt-4 h-4 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/2" />
              <div className="mt-4 flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* DOCK + CTA */}
      <section className="container py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-12 text-center">
          <BorderBeam size={300} duration={10} />
          <Meteors number={10} />
          <h2 className="relative text-3xl font-bold md:text-5xl">
            Ship something <GradientText>beautiful</GradientText>
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
            Drop Aurora UI into your Next.js project and start building interfaces
            that feel premium today.
          </p>
          <div className="relative mt-8 flex justify-center">
            <ShimmerButton>
              <span className="font-medium">Install Aurora UI</span>
            </ShimmerButton>
          </div>
          <div className="relative mt-12 flex justify-center">
            <Dock>
              <DockIcon><Home className="h-5 w-5" /></DockIcon>
              <DockIcon><User className="h-5 w-5" /></DockIcon>
              <DockIcon><Mail className="h-5 w-5" /></DockIcon>
              <DockIcon><Settings className="h-5 w-5" /></DockIcon>
              <DockIcon><Github className="h-5 w-5" /></DockIcon>
            </Dock>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Aurora UI. Built with Next.js.</span>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-pink-500" />
            <span>and Framer Motion</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

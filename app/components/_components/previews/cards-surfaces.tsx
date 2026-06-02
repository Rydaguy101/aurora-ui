"use client";

import type { ComponentPreviewProps } from "@/app/components/_components/preview-shared";
import {
  PreviewFrame,
  SkeletonCard,
  asBoolean,
  asNumber,
  asString,
  carouselSlides,
  hexToRgb,
  stackCards,
} from "@/app/components/_components/preview-shared";

import { Layers, Palette, Rocket, Wand2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Card3D } from "@/components/ui/card-3d";
import { CardStack } from "@/components/ui/card-stack";
import { Carousel } from "@/components/ui/carousel";
import { GlowCard } from "@/components/ui/glow-card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { PricingCard } from "@/components/ui/pricing-card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { StatCard } from "@/components/ui/stat-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function renderCategoryPreview({ slug, config, bare }: ComponentPreviewProps) {
  switch (slug) {
    case "spotlight-card": {
      const spotlightColor = asString(config.spotlightColor, "#a855f7");
      const spotlightOpacity = asNumber(config.spotlightOpacity, 0.18);
      return (
        <PreviewFrame bare={bare}>
          <div className="mx-auto max-w-xl">
            <SpotlightCard
              spotlightColor={`rgba(${hexToRgb(spotlightColor)}, ${spotlightOpacity})`}
            >
              <Palette className="mb-4 h-7 w-7 text-primary" />
              <h3 className="text-lg font-semibold">Cursor-aware highlight</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Move across the card to pull the spotlight with your cursor.
              </p>
            </SpotlightCard>
          </div>
        </PreviewFrame>
      );
    }
    case "card": {
      const showFooter = asBoolean(config.showFooter, true);
      return (
        <PreviewFrame bare={bare}>
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle>{asString(config.title, "Project overview")}</CardTitle>
              <CardDescription>
                {asString(config.description, "Track milestones and team progress.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Card content area for charts, lists, or summaries.
              </p>
            </CardContent>
            {showFooter && (
              <CardFooter>
                <Button size="sm">View details</Button>
              </CardFooter>
            )}
          </Card>
        </PreviewFrame>
      );
    }
    case "avatar": {
      const sizeClass =
        asString(config.size, "md") === "sm"
          ? "size-8 text-xs"
          : asString(config.size, "md") === "lg"
            ? "size-14 text-base"
            : "size-10 text-sm";
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center gap-4">
            <Avatar className={sizeClass}>
              <AvatarFallback>{asString(config.fallback, "AU")}</AvatarFallback>
            </Avatar>
            <Avatar className={sizeClass}>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className={sizeClass}>
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
          </div>
        </PreviewFrame>
      );
    }
    case "card-3d":
      return (
        <PreviewFrame bare={bare}>
          <div className="mx-auto max-w-md">
            <Card3D intensity={asNumber(config.intensity, 12)}>
              <div className="rounded-2xl border border-border bg-card p-8">
                <Rocket className="mb-4 h-7 w-7 text-primary" />
                <h3 className="text-lg font-semibold">Perspective tilt</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Move your cursor to feel the card respond in 3D space.
                </p>
              </div>
            </Card3D>
          </div>
        </PreviewFrame>
      );
    case "glow-card": {
      const glowColor = asString(config.glowColor, "#a855f7");
      return (
        <PreviewFrame bare={bare}>
          <div className="mx-auto max-w-2xl">
            <GlowCard glowColor={`rgba(${hexToRgb(glowColor)}, 0.4)`}>
              <div className="flex items-start gap-4">
                <Wand2 className="mt-1 h-7 w-7 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Glow follows your cursor</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Designed for high-contrast grids that feel connected instead of isolated.
                  </p>
                </div>
              </div>
            </GlowCard>
          </div>
        </PreviewFrame>
      );
    }
    case "border-beam":
      return (
        <PreviewFrame bare={bare}>
          <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-border bg-card p-8">
            <BorderBeam
              size={asNumber(config.size, 220)}
              duration={asNumber(config.duration, 8)}
              colorFrom={asString(config.colorFrom, "#a855f7")}
              colorTo={asString(config.colorTo, "#22d3ee")}
            />
            <Layers className="mb-4 h-7 w-7 text-primary" />
            <h3 className="text-lg font-semibold">Comet border</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A beam traces the perimeter to keep static surfaces feeling alive.
            </p>
          </div>
        </PreviewFrame>
      );
    case "skeleton": {
      const columns = asNumber(config.columns, 1);
      const showAvatar = asBoolean(config.showAvatar, true);
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <div
              className={`grid w-full max-w-4xl gap-6 ${
                columns === 1
                  ? "max-w-sm grid-cols-1"
                  : columns === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {Array.from({ length: columns }).map((_, index) => (
                <SkeletonCard key={index} showAvatar={showAvatar} />
              ))}
            </div>
          </div>
        </PreviewFrame>
      );
    }
    case "card-stack":
      return (
        <PreviewFrame bare={bare} note="The stack intentionally peeks upward to show depth.">
          <div className="flex min-h-[360px] items-end justify-center pb-8">
            <CardStack
              items={stackCards}
              interval={asNumber(config.interval, 4000)}
              offset={asNumber(config.offset, 12)}
            />
          </div>
        </PreviewFrame>
      );
    case "hover-card":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {asString(config.name, "Ava Chen")
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{asString(config.name, "Ava Chen")}</p>
                    <p className="text-sm text-muted-foreground">{asString(config.role, "Design lead")}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </PreviewFrame>
      );
    case "carousel":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Carousel
              items={carouselSlides}
              autoPlay={asBoolean(config.autoPlay, false)}
              interval={asNumber(config.interval, 4000)}
            />
          </div>
        </PreviewFrame>
      );
    case "table": {
      const compact = asBoolean(config.compact, false);
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Table className="max-w-2xl border-0">
              <TableHeader>
                <TableRow className={compact ? "h-8" : undefined}>
                  <TableHead className={compact ? "py-2" : undefined}>Name</TableHead>
                  <TableHead className={compact ? "py-2" : undefined}>Status</TableHead>
                  <TableHead className={compact ? "py-2" : undefined}>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className={compact ? "h-8" : undefined}>
                  <TableCell className={compact ? "py-2" : undefined}>Ava Chen</TableCell>
                  <TableCell className={compact ? "py-2" : undefined}>Active</TableCell>
                  <TableCell className={compact ? "py-2" : undefined}>Admin</TableCell>
                </TableRow>
                <TableRow className={compact ? "h-8" : undefined}>
                  <TableCell className={compact ? "py-2" : undefined}>Marcus Lee</TableCell>
                  <TableCell className={compact ? "py-2" : undefined}>Active</TableCell>
                  <TableCell className={compact ? "py-2" : undefined}>Editor</TableCell>
                </TableRow>
                <TableRow className={compact ? "h-8" : undefined}>
                  <TableCell className={compact ? "py-2" : undefined}>Priya Nair</TableCell>
                  <TableCell className={compact ? "py-2" : undefined}>Invited</TableCell>
                  <TableCell className={compact ? "py-2" : undefined}>Viewer</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </PreviewFrame>
      );
    }
    case "stat-card":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <StatCard
              className="max-w-xs"
              label={asString(config.label, "Active users")}
              value={asString(config.value, "12,840")}
              change={asString(config.change, "+12.4%")}
              trend={asString(config.trend, "up") as "up" | "down" | "neutral"}
            />
          </div>
        </PreviewFrame>
      );
    case "pricing-card":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <PricingCard
              className="max-w-sm"
              name={asString(config.name, "Pro")}
              price={asString(config.price, "$29")}
              highlighted={asBoolean(config.highlighted, true)}
              features={["Unlimited projects", "Priority support", "Advanced analytics"]}
            />
          </div>
        </PreviewFrame>
      );
    default:
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center text-sm text-muted-foreground">
            No preview is configured for this component yet.
          </div>
        </PreviewFrame>
      );
  }
}

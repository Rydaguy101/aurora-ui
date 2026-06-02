"use client";

import type { ComponentPreviewProps } from "@/app/components/_components/preview-shared";
import { PreviewFrame, asBoolean, asNumber, asString, hexToRgb } from "@/app/components/_components/preview-shared";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { BeamsBackground } from "@/components/ui/beams-background";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { GradientMesh } from "@/components/ui/gradient-mesh";
import { GridPattern } from "@/components/ui/grid-pattern";
import { HeroWaves } from "@/components/ui/hero-waves";
import { LightRays } from "@/components/ui/light-rays";
import { Meteors } from "@/components/ui/meteors";
import { Particles } from "@/components/ui/particles";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { Spotlight } from "@/components/ui/spotlight";
import { StarfieldBackground } from "@/components/ui/starfield-background";

export function renderCategoryPreview({ slug, config, bare }: ComponentPreviewProps) {
  switch (slug) {
    case "aurora-background":
      return (
        <PreviewFrame bare={bare}>
          <AuroraBackground
            showRadialGradient={asBoolean(config.showRadialGradient, true)}
            className="min-h-[360px] rounded-xl"
          >
            <h3 className="text-2xl font-semibold">Living gradients</h3>
            <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
              Atmospheric depth without heavy markup.
            </p>
          </AuroraBackground>
        </PreviewFrame>
      );
    case "grid-pattern":
      return (
        <PreviewFrame bare={bare}>
          <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-border bg-card">
            <GridPattern
              variant={asString(config.variant, "grid") as "grid" | "dot"}
              fade={asBoolean(config.fade, true)}
            />
            <div className="relative z-10 flex h-full min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <h3 className="text-2xl font-semibold">Grounded surfaces</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Low-contrast grids and dots for hero backdrops.
              </p>
            </div>
          </div>
        </PreviewFrame>
      );
    case "spotlight":
      return (
        <PreviewFrame bare={bare}>
          <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-border bg-[#050505]">
            <Spotlight fill={asString(config.fill, "#a855f7")} />
            <div className="relative z-10 flex h-full min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <h3 className="text-2xl font-semibold">Hero spotlight</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                An oversized animated spotlight for launch pages.
              </p>
            </div>
          </div>
        </PreviewFrame>
      );
    case "particles": {
      const particleColor = asString(config.color, "#a855f7");
      return (
        <PreviewFrame bare={bare}>
          <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-border bg-[#050505]">
            <Particles
              quantity={asNumber(config.quantity, 60)}
              speed={asNumber(config.speed, 0.45)}
              color={hexToRgb(particleColor)}
            />
            <div className="relative z-10 flex h-full min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <h3 className="text-2xl font-semibold">Ambient motion</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Lightweight particles with hover depth.
              </p>
            </div>
          </div>
        </PreviewFrame>
      );
    }
    case "meteors":
      return (
        <PreviewFrame bare={bare}>
          <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-border bg-card">
            <Meteors number={asNumber(config.number, 16)} />
            <div className="relative z-10 flex h-full min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <h3 className="text-2xl font-semibold">Meteor shower</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Dramatic streaks for promotional blocks.
              </p>
            </div>
          </div>
        </PreviewFrame>
      );
    case "light-rays": {
      const lightColor = asString(config.color, "#a855f7");
      return (
        <PreviewFrame bare={bare}>
          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-xl border border-border bg-card">
            <LightRays
              count={asNumber(config.count, 8)}
              color={`rgba(${hexToRgb(lightColor)}, 0.15)`}
            />
            <h3 className="relative z-10 text-2xl font-semibold">Radiant atmosphere</h3>
          </div>
        </PreviewFrame>
      );
    }
    case "floating-orbs":
      return (
        <PreviewFrame bare={bare}>
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-border bg-card">
            <FloatingOrbs
              count={asNumber(config.count, 4)}
              color={asString(config.color, "#a855f7")}
              speed={asNumber(config.speed, 1)}
              blur={asNumber(config.blur, 80)}
            />
            <div className="relative z-10 flex h-full min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <h3 className="text-2xl font-semibold">Floating orbs</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Soft gradient orbs drift behind headlines and CTAs.
              </p>
            </div>
          </div>
        </PreviewFrame>
      );
    case "perspective-grid":
      return (
        <PreviewFrame bare={bare}>
          <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-border bg-[#050505]">
            <PerspectiveGrid
              color={asString(config.color, "#a855f7")}
              speed={asNumber(config.speed, 1)}
              fade={asBoolean(config.fade, true)}
            />
            <div className="relative z-10 flex h-full min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <h3 className="text-2xl font-semibold">Tech hero grid</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                A receding floor grid for SaaS landing pages.
              </p>
            </div>
          </div>
        </PreviewFrame>
      );
    case "gradient-mesh":
      return (
        <PreviewFrame bare={bare}>
          <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-border bg-[#050505]">
            <GradientMesh
              colorFrom={asString(config.colorFrom, "#a855f7")}
              colorTo={asString(config.colorTo, "#22d3ee")}
              speed={asNumber(config.speed, 1)}
            />
            <div className="relative z-10 flex h-full min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <h3 className="text-2xl font-semibold">Gradient mesh</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Animated color blobs blend into a living backdrop.
              </p>
            </div>
          </div>
        </PreviewFrame>
      );
    case "beams-background":
      return (
        <PreviewFrame bare={bare}>
          <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-border bg-[#050505]">
            <BeamsBackground
              count={asNumber(config.count, 8)}
              color={asString(config.color, "#a855f7")}
              speed={asNumber(config.speed, 1)}
            />
            <div className="relative z-10 flex h-full min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <h3 className="text-2xl font-semibold">Vertical beams</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Pulsing light beams for landing page heroes.
              </p>
            </div>
          </div>
        </PreviewFrame>
      );
    case "hero-waves":
      return (
        <PreviewFrame bare={bare}>
          <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-border bg-[#050505]">
            <HeroWaves
              color={asString(config.color, "#a855f7")}
              speed={asNumber(config.speed, 1)}
              layers={asNumber(config.layers, 3)}
            />
            <div className="relative z-10 flex h-full min-h-[360px] flex-col items-center justify-center px-6 pb-16 text-center">
              <h3 className="text-2xl font-semibold">Layered waves</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                SVG waves anchored to the bottom of hero sections.
              </p>
            </div>
          </div>
        </PreviewFrame>
      );
    case "starfield-background":
      return (
        <PreviewFrame bare={bare}>
          <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-border bg-[#050505]">
            <StarfieldBackground
              count={asNumber(config.count, 80)}
              color={asString(config.color, "#ffffff")}
              speed={asNumber(config.speed, 1)}
            />
            <div className="relative z-10 flex h-full min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <h3 className="text-2xl font-semibold">Starfield</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Twinkling stars for dark launch pages.
              </p>
            </div>
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

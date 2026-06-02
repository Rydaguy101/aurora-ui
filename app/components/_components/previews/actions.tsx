"use client";

import type { ComponentPreviewProps } from "@/app/components/_components/preview-shared";
import { PreviewFrame, asBoolean, asNumber, asString } from "@/app/components/_components/preview-shared";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { RippleButton } from "@/components/ui/ripple-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function renderCategoryPreview({ slug, config, bare }: ComponentPreviewProps) {
  const label = asString(config.label, "Test Me");

  switch (slug) {
    case "button":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <Button
              variant={
                asString(config.variant, "default") as
                  | "default"
                  | "secondary"
                  | "outline"
                  | "ghost"
                  | "destructive"
                  | "link"
              }
              size={asString(config.size, "default") as "default" | "sm" | "lg"}
              disabled={asBoolean(config.disabled, false)}
            >
              {label}
            </Button>
          </div>
        </PreviewFrame>
      );
    case "shimmer-button":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <ShimmerButton
              shimmerColor={asString(config.shimmerColor, "#ffffff")}
              shimmerDuration={`${asNumber(config.shimmerDuration, 3)}s`}
              borderRadius={`${asNumber(config.borderRadius, 24)}px`}
            >
              {label}
            </ShimmerButton>
          </div>
        </PreviewFrame>
      );
    case "magnetic-button":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <MagneticButton strength={asNumber(config.strength, 0.35)}>
              <Button>{label}</Button>
            </MagneticButton>
          </div>
        </PreviewFrame>
      );
    case "ripple-button":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <RippleButton rippleColor={asString(config.rippleColor, "#ffffff")}>{label}</RippleButton>
          </div>
        </PreviewFrame>
      );
    case "rainbow-button":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <RainbowButton>{label}</RainbowButton>
          </div>
        </PreviewFrame>
      );
    case "badge":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <Badge
              variant={
                asString(config.variant, "gradient") as
                  | "default"
                  | "secondary"
                  | "outline"
                  | "success"
                  | "warning"
                  | "gradient"
              }
            >
              {asString(config.label, "New release")}
            </Badge>
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

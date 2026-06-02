"use client";

import type { ComponentPreviewProps } from "@/app/components/_components/preview-shared";
import { PreviewFrame, asNumber, asString } from "@/app/components/_components/preview-shared";

import { Badge } from "@/components/ui/badge";
import { WebGLGlobe } from "@/components/ui/webgl-globe";
import { WebGLParticleField } from "@/components/ui/webgl-particle-field";
import { WebGLStage } from "@/components/ui/webgl-stage";

export function renderCategoryPreview({ slug, config, bare }: ComponentPreviewProps) {
  switch (slug) {
    case "webgl-stage":
      return (
        <PreviewFrame bare={bare}>
          <div className="absolute inset-0 min-h-[360px]">
            <WebGLStage className="absolute inset-0">
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 2, 2]} intensity={1.2} />
              <mesh>
                <sphereGeometry args={[1, 48, 48]} />
                <meshStandardMaterial color={asString(config.color, "#a855f7")} />
              </mesh>
            </WebGLStage>
          </div>
        </PreviewFrame>
      );
    case "webgl-globe":
      return (
        <PreviewFrame bare={bare}>
          <div className="absolute inset-0">
            <WebGLGlobe
              className="absolute inset-0"
              count={asNumber(config.count, 1500)}
              color={asString(config.color, "#a855f7")}
              speed={asNumber(config.speed, 1)}
              size={asNumber(config.size, 0.025)}
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <Badge variant="gradient">Global platform</Badge>
              <h3 className="mt-6 text-4xl font-bold">Ship anywhere</h3>
            </div>
          </div>
        </PreviewFrame>
      );
    case "webgl-particle-field":
      return (
        <PreviewFrame bare={bare}>
          <div className="absolute inset-0">
            <WebGLParticleField
              className="absolute inset-0"
              count={asNumber(config.count, 1200)}
              color={asString(config.color, "#a855f7")}
              speed={asNumber(config.speed, 1)}
              spread={asNumber(config.spread, 6)}
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <Badge variant="gradient">WebGL depth</Badge>
              <h3 className="mt-6 text-4xl font-bold">Immersive hero backdrop</h3>
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

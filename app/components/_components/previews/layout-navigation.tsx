"use client";

import type { ComponentPreviewProps } from "@/app/components/_components/preview-shared";
import {
  PreviewFrame,
  ScrollProgressDemo,
  asBoolean,
  asNumber,
  asString,
  stepperSteps,
  testimonialItems,
  timelineItems,
} from "@/app/components/_components/preview-shared";

import { Github, Home, Mail, Settings, Sparkles, User, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Footer } from "@/components/ui/footer";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Marquee } from "@/components/ui/marquee";
import { Navbar } from "@/components/ui/navbar";
import { Pagination } from "@/components/ui/pagination";
import { Stepper } from "@/components/ui/stepper";
import { Timeline } from "@/components/ui/timeline";

export function renderCategoryPreview({ slug, config, onConfigChange, bare }: ComponentPreviewProps) {
  switch (slug) {
    case "marquee":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Marquee
              className="w-full max-w-3xl"
              reverse={asBoolean(config.reverse, false)}
              pauseOnHover={asBoolean(config.pauseOnHover, true)}
              repeat={asNumber(config.repeat, 4)}
              duration={asNumber(config.duration, 22)}
            >
              {["Design", "Motion", "Ship", "Delight", "Iterate"].map((item) => (
                <Badge key={item} variant="outline" className="mx-2 px-4 py-1.5 text-sm">
                  {item}
                </Badge>
              ))}
            </Marquee>
          </div>
        </PreviewFrame>
      );
    case "bento-grid":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <BentoGrid
              className="max-w-4xl"
              style={{ gridAutoRows: `${asNumber(config.rowHeight, 15)}rem` }}
            >
              <BentoCard
                className="md:col-span-2"
                title="Launch faster"
                description="Pre-built motion primitives for production UI."
                icon={<Zap className="size-5 text-primary" />}
              />
              <BentoCard
                title="Stay on brand"
                description="Theme once with CSS variables."
                icon={<Sparkles className="size-5 text-primary" />}
              />
              <BentoCard
                className="md:col-span-3"
                title="Delight users"
                description="Subtle animation that feels intentional, not noisy."
                icon={<User className="size-5 text-primary" />}
              />
            </BentoGrid>
          </div>
        </PreviewFrame>
      );
    case "dock": {
      const magnification = asNumber(config.magnification, 76);
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center overflow-x-auto">
            <Dock>
              <DockIcon magnification={magnification}>
                <Home className="h-5 w-5" />
              </DockIcon>
              <DockIcon magnification={magnification}>
                <User className="h-5 w-5" />
              </DockIcon>
              <DockIcon magnification={magnification}>
                <Mail className="h-5 w-5" />
              </DockIcon>
              <DockIcon magnification={magnification}>
                <Settings className="h-5 w-5" />
              </DockIcon>
              <DockIcon magnification={magnification}>
                <Github className="h-5 w-5" />
              </DockIcon>
            </Dock>
          </div>
        </PreviewFrame>
      );
    }
    case "infinite-moving-cards":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <InfiniteMovingCards
              className="max-w-3xl"
              items={testimonialItems.map((item) => ({
                quote: item.quote,
                name: item.name,
                title: item.title,
              }))}
              reverse={asBoolean(config.reverse, false)}
              duration={asNumber(config.duration, 40)}
            />
          </div>
        </PreviewFrame>
      );
    case "scroll-progress":
      return (
        <PreviewFrame
          bare={bare}
          note="This component binds to the viewport, so the indicator renders at the top of the scrollable panel below."
        >
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <ScrollProgressDemo panelHeight={asNumber(config.panelHeight, 360)} />
          </div>
        </PreviewFrame>
      );
    case "navbar":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Navbar className="max-w-3xl" brand={asString(config.brand, "Aurora UI")} />
          </div>
        </PreviewFrame>
      );
    case "breadcrumb":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Components", href: "/components" },
                { label: asString(config.currentPage, "Typography") },
              ]}
            />
          </div>
        </PreviewFrame>
      );
    case "pagination": {
      const totalPages = asNumber(config.totalPages, 5);
      const page = Math.min(asNumber(config.page, 1), totalPages);
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] flex-col items-center justify-center gap-4">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(nextPage) => onConfigChange("page", nextPage)}
            />
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </p>
          </div>
        </PreviewFrame>
      );
    }
    case "stepper":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Stepper
              className="max-w-2xl"
              steps={stepperSteps}
              currentStep={asNumber(config.currentStep, 1)}
            />
          </div>
        </PreviewFrame>
      );
    case "timeline": {
      const itemCount = asNumber(config.itemCount, 3);
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Timeline items={timelineItems.slice(0, itemCount)} className="max-w-md" />
          </div>
        </PreviewFrame>
      );
    }
    case "footer":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Footer className="w-full max-w-3xl" brand={asString(config.brand, "Aurora UI")} />
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

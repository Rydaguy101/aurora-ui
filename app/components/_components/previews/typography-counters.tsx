"use client";

import type { ComponentPreviewProps } from "@/app/components/_components/preview-shared";
import {
  PreviewFrame,
  asBoolean,
  asNumber,
  asString,
  countdownTarget,
  parseWords,
} from "@/app/components/_components/preview-shared";

import { BlurText } from "@/components/ui/blur-text";
import { CircularText } from "@/components/ui/circular-text";
import { Countdown } from "@/components/ui/countdown";
import { FadeIn } from "@/components/ui/fade-in";
import { FlipWords } from "@/components/ui/flip-words";
import { GradientText } from "@/components/ui/gradient-text";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShinyText } from "@/components/ui/shiny-text";
import { SplitText } from "@/components/ui/split-text";
import { TextReveal } from "@/components/ui/text-reveal";
import { TextScramble } from "@/components/ui/text-scramble";
import { Typewriter } from "@/components/ui/typewriter";

export function renderCategoryPreview({ slug, config, bare }: ComponentPreviewProps) {
  switch (slug) {
    case "gradient-text":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center px-6 text-center">
            <GradientText animate={asBoolean(config.animate, true)} className="text-4xl font-bold md:text-5xl">
              {asString(config.label, "Aurora gradient")}
            </GradientText>
          </div>
        </PreviewFrame>
      );
    case "shiny-text":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center px-6 text-center">
            <ShinyText
              className="text-2xl font-medium md:text-3xl"
              shimmerWidth={asNumber(config.shimmerWidth, 100)}
            >
              {asString(config.label, "Shiny text that catches the light")}
            </ShinyText>
          </div>
        </PreviewFrame>
      );
    case "typewriter": {
      const words = parseWords(config.words, ["websites", "dashboards", "experiences", "the future"]);
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center text-center">
            <div className="text-4xl font-semibold">
              We build{" "}
              <Typewriter
                key={`${words.join("|")}-${asNumber(config.typingSpeed, 90)}-${asNumber(config.deletingSpeed, 45)}-${asNumber(config.pauseTime, 1600)}`}
                words={words}
                typingSpeed={asNumber(config.typingSpeed, 90)}
                deletingSpeed={asNumber(config.deletingSpeed, 45)}
                pauseTime={asNumber(config.pauseTime, 1600)}
              />
            </div>
          </div>
        </PreviewFrame>
      );
    }
    case "text-reveal":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <TextReveal
              className="max-w-2xl text-3xl font-semibold leading-tight"
              text={asString(
                config.text,
                "This reveal animates word by word as it enters the viewport."
              )}
              delay={asNumber(config.delay, 0)}
            />
          </div>
        </PreviewFrame>
      );
    case "flip-words": {
      const words = parseWords(config.words, ["fluid", "premium", "tactile", "playful"]);
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center px-6">
            <p className="text-center text-4xl font-semibold leading-tight">
              Build something{" "}
              <FlipWords words={words} duration={asNumber(config.duration, 2500)} className="text-primary" />
            </p>
          </div>
        </PreviewFrame>
      );
    }
    case "number-ticker":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] flex-col items-center justify-center gap-2">
            <NumberTicker
              className="text-5xl font-bold tracking-tight"
              value={asNumber(config.value, 12840)}
              direction={asString(config.direction, "up") as "up" | "down"}
              decimalPlaces={asNumber(config.decimalPlaces, 0)}
              delay={asNumber(config.delay, 0)}
            />
            <p className="text-sm text-muted-foreground">Active users this month</p>
          </div>
        </PreviewFrame>
      );
    case "blur-text":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center px-6 text-center">
            <BlurText
              className="text-3xl font-semibold md:text-4xl"
              text={asString(config.text, "Beautiful motion, built in.")}
              delay={asNumber(config.delay, 50)}
              animateBy={asString(config.animateBy, "chars") as "chars" | "words"}
              direction={asString(config.direction, "top") as "top" | "bottom"}
            />
          </div>
        </PreviewFrame>
      );
    case "split-text":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center px-6 text-center">
            <SplitText
              className="text-4xl font-bold"
              text={asString(config.text, "Hello, you!")}
              splitType={asString(config.splitType, "chars") as "chars" | "words"}
              delay={asNumber(config.delay, 50)}
              duration={asNumber(config.duration, 0.8)}
              tag="h3"
            />
          </div>
        </PreviewFrame>
      );
    case "countdown":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <Countdown
              targetDate={countdownTarget}
              showLabels={asBoolean(config.showLabels, true)}
            />
          </div>
        </PreviewFrame>
      );
    case "fade-in":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center px-6 text-center">
            <FadeIn
              direction={asString(config.direction, "up") as "up" | "down" | "left" | "right" | "none"}
              blur={asBoolean(config.blur, true)}
              delay={asNumber(config.delay, 0)}
            >
              <h3 className="text-3xl font-semibold">Scroll-triggered entrance</h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                Wrap any content to fade and blur into view as it enters the viewport.
              </p>
            </FadeIn>
          </div>
        </PreviewFrame>
      );
    case "circular-text":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <CircularText
              text={asString(config.text, "AURORA UI • BUILD BEAUTIFUL • ")}
              radius={asNumber(config.radius, 80)}
              spinDuration={asNumber(config.spinDuration, 20)}
            />
          </div>
        </PreviewFrame>
      );
    case "text-scramble":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <TextScramble
              className="font-mono text-2xl font-bold tracking-[0.2em] md:text-3xl"
              text={asString(config.text, "ACCESS GRANTED")}
              duration={asNumber(config.duration, 1200)}
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

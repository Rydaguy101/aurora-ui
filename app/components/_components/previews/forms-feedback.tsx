"use client";

import type { ComponentPreviewProps } from "@/app/components/_components/preview-shared";
import {
  PreviewFrame,
  accordionItems,
  asBoolean,
  asNumber,
  asString,
  tabItems,
} from "@/app/components/_components/preview-shared";

import { Info } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/ui/empty-state";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { FloatingInput } from "@/components/ui/floating-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OtpInput } from "@/components/ui/otp-input";
import { PasswordInput } from "@/components/ui/password-input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { StarRating } from "@/components/ui/star-rating";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip } from "@/components/ui/tooltip";

export function renderCategoryPreview({ slug, config, onConfigChange, bare }: ComponentPreviewProps) {
  switch (slug) {
    case "switch":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <Switch
              checked={asBoolean(config.checked, true)}
              disabled={asBoolean(config.disabled, false)}
              onCheckedChange={(checked) => onConfigChange("checked", checked)}
            />
          </div>
        </PreviewFrame>
      );
    case "floating-input":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <div className="w-full max-w-sm">
              <FloatingInput
                label={asString(config.label, "Email address")}
                type={asString(config.type, "email")}
                disabled={asBoolean(config.disabled, false)}
              />
            </div>
          </div>
        </PreviewFrame>
      );
    case "input":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Input
              className="max-w-sm"
              placeholder={asString(config.placeholder, "Enter your email")}
              disabled={asBoolean(config.disabled, false)}
            />
          </div>
        </PreviewFrame>
      );
    case "textarea":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Textarea
              className="max-w-sm"
              placeholder={asString(config.placeholder, "Write something...")}
              rows={asNumber(config.rows, 4)}
            />
          </div>
        </PreviewFrame>
      );
    case "progress":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Progress
              className="max-w-sm"
              value={asNumber(config.value, 68)}
              gradient={asBoolean(config.gradient, true)}
            />
          </div>
        </PreviewFrame>
      );
    case "tooltip":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <Tooltip content={asString(config.content, "I follow your cursor")} side={asString(config.side, "top") as "top" | "bottom" | "left" | "right"}>
              <Button variant="outline">Hover me</Button>
            </Tooltip>
          </div>
        </PreviewFrame>
      );
    case "checkbox":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center gap-3">
            <Checkbox
              id="preview-checkbox"
              checked={asBoolean(config.checked, true)}
              disabled={asBoolean(config.disabled, false)}
              onCheckedChange={(checked) => onConfigChange("checked", checked === true)}
            />
            <Label htmlFor="preview-checkbox">Accept terms</Label>
          </div>
        </PreviewFrame>
      );
    case "range-slider": {
      const min = asNumber(config.min, 0);
      const max = asNumber(config.max, 100);
      const value = Math.min(Math.max(asNumber(config.value, 50), min), max);
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full flex-col items-center justify-center gap-4 px-6">
            <Slider
              className="max-w-sm"
              min={min}
              max={max}
              value={[value]}
              onValueChange={([next]) => onConfigChange("value", next)}
            />
            <p className="text-sm text-muted-foreground">Value: {value}</p>
          </div>
        </PreviewFrame>
      );
    }
    case "select":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Select
              value={asString(config.value, "design")}
              onValueChange={(next) => onConfigChange("value", next)}
            >
              <SelectTrigger className="max-w-sm">
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PreviewFrame>
      );
    case "otp-input":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <OtpInput
              length={asNumber(config.length, 6)}
              value={asString(config.otp, "")}
              onChange={(otp) => onConfigChange("otp", otp)}
            />
          </div>
        </PreviewFrame>
      );
    case "star-rating":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <StarRating
              value={asNumber(config.value, 3)}
              readOnly={asBoolean(config.readOnly, false)}
              size={asString(config.size, "md") as "sm" | "md" | "lg"}
              onChange={(next) => onConfigChange("value", next)}
            />
          </div>
        </PreviewFrame>
      );
    case "alert":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Alert
              className="max-w-lg"
              variant={
                asString(config.variant, "info") as
                  | "default"
                  | "info"
                  | "success"
                  | "warning"
                  | "destructive"
              }
            >
              <Info className="size-4" />
              <AlertTitle>{asString(config.title, "Heads up")}</AlertTitle>
              <AlertDescription>
                {asString(config.description, "You can customize this alert with variants and copy.")}
              </AlertDescription>
            </Alert>
          </div>
        </PreviewFrame>
      );
    case "accordion":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <Accordion
              className="max-w-lg"
              items={accordionItems}
              allowMultiple={asBoolean(config.allowMultiple, false)}
            />
          </div>
        </PreviewFrame>
      );
    case "animated-tabs":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <AnimatedTabs
              className="max-w-lg"
              tabs={tabItems}
              defaultTab={asString(config.defaultTab, "design")}
            />
          </div>
        </PreviewFrame>
      );
    case "animated-modal":
      return (
        <PreviewFrame bare={bare} note="The modal opens in the real viewport, not just inside the card.">
          <div className="flex min-h-[360px] items-center justify-center">
            <Modal>
              <ModalTrigger>
                <Button>{asString(config.label, "Open modal")}</Button>
              </ModalTrigger>
              <ModalContent>
                <h3 className="text-lg font-semibold">Animated modal</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Spring-based overlay with backdrop blur and layered motion.
                </p>
              </ModalContent>
            </Modal>
          </div>
        </PreviewFrame>
      );
    case "radio-group":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <RadioGroup
              className="max-w-sm"
              value={asString(config.value, "starter")}
              onValueChange={(next) => onConfigChange("value", next)}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="starter" id="starter" />
                <Label htmlFor="starter">Starter</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="pro" id="pro" />
                <Label htmlFor="pro">Pro</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="enterprise" id="enterprise" />
                <Label htmlFor="enterprise">Enterprise</Label>
              </div>
            </RadioGroup>
          </div>
        </PreviewFrame>
      );
    case "toggle-group":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <ToggleGroup
              type="single"
              value={asString(config.value, "week")}
              onValueChange={(next) => next && onConfigChange("value", next)}
            >
              <ToggleGroupItem value="day">Day</ToggleGroupItem>
              <ToggleGroupItem value="week">Week</ToggleGroupItem>
              <ToggleGroupItem value="month">Month</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </PreviewFrame>
      );
    case "password-input":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <PasswordInput className="max-w-sm" placeholder={asString(config.placeholder, "Enter password")} />
          </div>
        </PreviewFrame>
      );
    case "file-dropzone":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <FileDropzone className="max-w-md" maxSizeMb={asNumber(config.maxSizeMb, 10)} />
          </div>
        </PreviewFrame>
      );
    case "spinner":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <Spinner size={asString(config.size, "md") as "sm" | "md" | "lg"} />
          </div>
        </PreviewFrame>
      );
    case "empty-state":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <EmptyState
              className="max-w-md"
              title={asString(config.title, "No results yet")}
              description={asString(
                config.description,
                "Try adjusting your filters or create something new."
              )}
              actionLabel={asString(config.actionLabel, "Create item")}
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

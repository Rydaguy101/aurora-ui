"use client";

import type { ComponentPreviewProps } from "@/app/components/_components/preview-shared";
import { PreviewFrame, ToastDemo, asBoolean, asString, commandItems } from "@/app/components/_components/preview-shared";

import { Button } from "@/components/ui/button";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { CommandMenu } from "@/components/ui/command-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToastProvider } from "@/components/ui/toast";

export function renderCategoryPreview({ slug, config, bare }: ComponentPreviewProps) {
  switch (slug) {
    case "dropdown-menu":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{asString(config.triggerLabel, "Open menu")}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </PreviewFrame>
      );
    case "popover":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <h4 className="font-semibold">{asString(config.title, "Dimensions")}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {asString(config.description, "Set the width and height for the layer.")}
                </p>
              </PopoverContent>
            </Popover>
          </div>
        </PreviewFrame>
      );
    case "sheet":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <Sheet>
              <SheetTrigger className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/60">
                Open sheet
              </SheetTrigger>
              <SheetContent side={asString(config.side, "right") as "left" | "right"}>
                <SheetHeader>
                  <SheetTitle>{asString(config.title, "Quick settings")}</SheetTitle>
                  <SheetDescription>Adjust preferences without leaving the page.</SheetDescription>
                </SheetHeader>
                <SheetBody>
                  <p className="text-sm text-muted-foreground">
                    Sheet panels are ideal for filters, settings, and mobile navigation.
                  </p>
                </SheetBody>
              </SheetContent>
            </Sheet>
          </div>
        </PreviewFrame>
      );
    case "command-menu":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <CommandMenu
              items={commandItems}
              placeholder={asString(config.placeholder, "Search commands...")}
            />
          </div>
        </PreviewFrame>
      );
    case "toast":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] items-center justify-center">
            <ToastProvider>
              <ToastDemo
                variant={
                  asString(config.variant, "success") as "default" | "success" | "error" | "info"
                }
                title={asString(config.title, "Changes saved")}
                description={asString(
                  config.description,
                  "Your settings were updated successfully."
                )}
              />
            </ToastProvider>
          </div>
        </PreviewFrame>
      );
    case "context-menu":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-48 w-full max-w-md items-center justify-center rounded-xl border border-dashed border-border bg-card/40 text-sm text-muted-foreground">
                {asString(config.hint, "Right click here")}
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Back</ContextMenuItem>
                <ContextMenuItem>Forward</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Reload</ContextMenuItem>
                <ContextMenuItem>Copy link</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </PreviewFrame>
      );
    case "collapsible":
      return (
        <PreviewFrame bare={bare}>
          <div className="flex min-h-[360px] w-full items-center justify-center px-6">
            <CollapsibleSection
              className="max-w-md"
              title={asString(config.title, "Advanced settings")}
              defaultOpen={asBoolean(config.defaultOpen, false)}
            >
              Fine-tune motion, density, and accessibility preferences from this panel.
            </CollapsibleSection>
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

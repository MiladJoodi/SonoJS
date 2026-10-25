"use client"

import * as React from "react"
import Link from "next/link"
import {
  FullscreenIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react"

import { BlockInstallBody, type BlockInstallUsage } from "@/components/blocks/block-install-drawer"
import { CopyButton } from "@/components/docs/copy-button"
import { DirectionProvider, DirectionToggle } from "@/components/direction"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Direction } from "@/lib/direction"
import { cn } from "@/lib/utils"

type View = "preview" | "code"
type Viewport = "100%" | "60%" | "30%"

const viewports: { value: Viewport; label: string; icon: typeof MonitorIcon }[] = [
  { value: "100%", label: "Desktop", icon: MonitorIcon },
  { value: "60%", label: "Tablet", icon: TabletIcon },
  { value: "30%", label: "Mobile", icon: SmartphoneIcon },
]

function Segment({
  pressed,
  label,
  onClick,
  children,
  className,
}: {
  pressed?: boolean
  label: string
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          aria-pressed={pressed}
          onClick={onClick}
          className={cn(
            "inline-flex h-6 cursor-pointer items-center justify-center rounded-sm px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
            pressed && "bg-muted text-foreground",
            className
          )}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  )
}

export function BlockExample({
  name,
  title,
  usage = [],
  children,
}: {
  /** Registry item name. Passed to `add`. */
  name: string
  /** Name shown above the example. Falls back to `name`. */
  title?: string
  usage?: BlockInstallUsage[]
  children: React.ReactNode
}) {
  const [view, setView] = React.useState<View>("preview")
  const [viewport, setViewport] = React.useState<Viewport>("100%")
  const [dir, setDir] = React.useState<Direction>("ltr")
  const command = `npx @sonojs/ui@latest add ${name}`

  function showPreview(next?: Viewport) {
    if (next) setViewport(next)
    setView("preview")
  }

  return (
    <section id={name} className="flex w-full min-w-0 scroll-mt-24 flex-col gap-2">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <p className="min-w-0 max-w-full truncate text-start text-sm font-medium text-foreground">
          {title ?? name}
        </p>
        <div className="flex h-8 shrink-0 items-center gap-0.5 rounded-md border border-border/80 bg-background p-0.5">
            <div className="hidden items-center gap-0.5 md:flex">
              {viewports.map((item) => (
                <Segment
                  key={item.value}
                  label={item.label}
                  pressed={view === "preview" && viewport === item.value}
                  onClick={() => showPreview(item.value)}
                  className="size-6 px-0"
                >
                  <item.icon className="size-3.5" />
                </Segment>
              ))}
            </div>
            <div className="mx-0.5 hidden h-4 md:block" aria-hidden>
              <Separator orientation="vertical" />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link href={`/view/${name}`} target="_blank" rel="noreferrer">
                    <FullscreenIcon />
                    <span className="sr-only">Open in a new tab</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Open in a new tab</TooltipContent>
            </Tooltip>
            <div className="mx-0.5 h-4" aria-hidden>
              <Separator orientation="vertical" />
            </div>
            <div className="flex h-6 items-center gap-0.5 pe-0.5 ps-2">
              <span className="text-xs font-medium text-muted-foreground">Install</span>
              <CopyButton value={command} tone="chrome" tooltipSide="top" />
            </div>
        </div>
        <div className="ms-auto flex shrink-0 items-center gap-2">
          {view === "preview" ? (
            <DirectionToggle value={dir} onValueChange={setDir} />
          ) : null}
          <div className="flex h-8 items-center gap-0.5 rounded-md border border-border/80 bg-background p-0.5">
            <Segment
              label="Preview"
              pressed={view === "preview"}
              onClick={() => showPreview()}
              className="px-2.5"
            >
              Preview
            </Segment>
            <Segment
              label="Code"
              pressed={view === "code"}
              onClick={() => setView("code")}
              className="px-2.5"
            >
              Code
            </Segment>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border/80">
        {view === "preview" ? (
          <div
            className={cn(
              "flex min-h-[28rem] items-center justify-center",
              viewport === "100%" ? "bg-background" : "bg-muted/30"
            )}
            style={
              viewport === "100%"
                ? undefined
                : {
                    backgroundImage:
                      "radial-gradient(circle, var(--border) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }
            }
          >
            <div
              className={cn(
                "h-auto transition-[width] duration-200 ease-linear",
                viewport !== "100%" &&
                  "overflow-hidden border border-border/80 bg-background"
              )}
              style={{ width: viewport }}
            >
              <DirectionProvider dir={dir}>{children}</DirectionProvider>
            </div>
          </div>
        ) : (
          <div className="max-h-[40rem] overflow-auto bg-background p-4">
            <BlockInstallBody name={name} usage={usage} />
          </div>
        )}
      </div>
    </section>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import {
  Code2Icon,
  EyeIcon,
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
type Viewport = "desktop" | "tablet" | "mobile"

const viewports: {
  value: Viewport
  label: string
  icon: typeof MonitorIcon
  /** Pixel width for iframe viewport (media queries). Desktop uses full width. */
  width: number | "100%"
}[] = [
  { value: "desktop", label: "Desktop", icon: MonitorIcon, width: "100%" },
  { value: "tablet", label: "Tablet", icon: TabletIcon, width: 768 },
  { value: "mobile", label: "Mobile", icon: SmartphoneIcon, width: 375 },
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
            "inline-flex h-7 min-w-7 cursor-pointer items-center justify-center rounded-sm px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:min-w-9",
            pressed && "bg-canvas text-foreground",
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
  previewAlign = "center",
  previewClassName,
}: {
  /** Registry item name. Passed to `add`. */
  name: string
  /** Name shown above the example. Falls back to `name`. */
  title?: string
  usage?: BlockInstallUsage[]
  children: React.ReactNode
  /** How the preview sits in the frame. Navbars use `start`. */
  previewAlign?: "center" | "start"
  /** Extra classes on the preview surface (e.g. white page demos). */
  previewClassName?: string
}) {
  const [view, setView] = React.useState<View>("preview")
  const [viewport, setViewport] = React.useState<Viewport>("desktop")
  const [dir, setDir] = React.useState<Direction>("ltr")
  const command = `npx @sonojs/ui@latest add ${name}`
  const activeViewport =
    viewports.find((item) => item.value === viewport) ?? viewports[0]
  /** Narrow frames need a real document viewport so `sm`/`md` media queries apply. */
  const useFrame = viewport !== "desktop"
  const frameSrc = `/view/${name}?embed=1&dir=${dir}`

  function showPreview(next?: Viewport) {
    if (next) setViewport(next)
    setView("preview")
  }

  return (
    <section id={name} className="flex w-full min-w-0 scroll-mt-24 flex-col gap-2">
      <div className="flex min-w-0 items-center gap-3">
        <p
          className="min-w-0 shrink truncate text-start font-mono text-[11.5px] text-muted-foreground"
          title={title ?? name}
        >
          {title ?? name}
        </p>
        <div className="ms-auto flex min-w-0 shrink-0 items-center gap-2">
          <div className="flex h-8 items-center gap-0.5 rounded-md border border-border/70 bg-card p-0.5">
            <div className="hidden items-center gap-0.5 md:flex">
              {viewports.map((item) => (
                <Segment
                  key={item.value}
                  label={item.label}
                  pressed={view === "preview" && viewport === item.value}
                  onClick={() => showPreview(item.value)}
                  className="px-0"
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
                  className="text-muted-foreground hover:bg-canvas hover:text-foreground"
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
          </div>

          <CopyButton
            value={command}
            tone="chrome"
            tooltipSide="top"
            className="h-8 pe-1.5 ps-2 md:hidden"
          >
            CLI
          </CopyButton>
          <div className="hidden max-w-[min(100%,18rem)] items-center gap-0.5 lg:flex">
            <code className="min-w-0 truncate px-0.5 font-mono text-[11px] text-muted-foreground">
              {command}
            </code>
            <CopyButton
              value={command}
              tone="chrome"
              tooltipSide="top"
              className="size-7 shrink-0"
            />
          </div>
          <CopyButton
            value={command}
            tone="chrome"
            tooltipSide="top"
            className="hidden size-8 md:inline-flex lg:hidden"
          />

          {view === "preview" ? (
            <DirectionToggle value={dir} onValueChange={setDir} />
          ) : null}
          <div className="flex h-8 items-center gap-0.5 rounded-md border border-border/70 bg-card p-0.5">
            <Segment
              label="Preview"
              pressed={view === "preview"}
              onClick={() => showPreview()}
              className="px-0"
            >
              <EyeIcon className="size-3.5" />
            </Segment>
            <Segment
              label="Code"
              pressed={view === "code"}
              onClick={() => setView("code")}
              className="px-0"
            >
              <Code2Icon className="size-3.5" />
            </Segment>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        {view === "preview" ? (
          <div
            className={cn(
              "flex min-h-[28rem] bg-canvas",
              previewAlign === "center" && "items-center justify-center",
              previewAlign === "start" && "items-stretch justify-center",
              useFrame && "bg-muted",
              !useFrame && previewClassName
            )}
            style={
              useFrame
                ? {
                    backgroundImage:
                      "radial-gradient(circle, var(--border) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }
                : undefined
            }
          >
            <div
              className={cn(
                "transition-[width] duration-200 ease-linear",
                useFrame
                  ? "overflow-hidden border border-border bg-card"
                  : "h-auto w-full",
                useFrame && previewClassName
              )}
              style={{
                width: activeViewport.width,
                maxWidth: "100%",
              }}
            >
              {useFrame ? (
                <iframe
                  key={frameSrc}
                  title={`${name} ${activeViewport.label} preview`}
                  src={frameSrc}
                  className="block h-[42rem] w-full border-0 bg-card"
                />
              ) : (
                <DirectionProvider dir={dir}>{children}</DirectionProvider>
              )}
            </div>
          </div>
        ) : (
          <div className="max-h-[40rem] overflow-auto bg-card p-4">
            <BlockInstallBody name={name} usage={usage} />
          </div>
        )}
      </div>
    </section>
  )
}

"use client"

import * as React from "react"
import {
  Code2Icon,
  EyeIcon,
  FullscreenIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react"

import type { BlockInstallUsage } from "@/components/blocks/block-install-drawer"
import { SoftButton, SoftGroup } from "@/components/docs/soft-toolbar"
import { DirectionToggle } from "@/components/direction"
import {
  PopupCodeBody,
  prefetchPopupCode,
} from "@/components/popups/example/popup-code-body"
import { LoadingRing } from "@/components/sono-loader"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Direction } from "@/lib/direction"
import {
  getPopupsPreviewOrigin,
  popupPreviewUrl,
} from "@/lib/popups-preview"
import { SITE_TOOLTIP_DELAY_MS } from "@/lib/site-tooltip"
import { cn } from "@/lib/utils"

type View = "preview" | "code"
type Viewport = "desktop" | "tablet" | "mobile"

/** If remote `iframe` `onLoad` is flaky, still reveal after this. */
const EMBED_READY_TIMEOUT_MS = 5000

const viewports: {
  value: Viewport
  label: string
  icon: typeof MonitorIcon
  width: number | "100%"
}[] = [
  { value: "desktop", label: "Desktop", icon: MonitorIcon, width: "100%" },
  { value: "tablet", label: "Tablet", icon: TabletIcon, width: 768 },
  { value: "mobile", label: "Mobile", icon: SmartphoneIcon, width: 375 },
]

export type PopupExampleProps = {
  /** Variant slug (e.g. `blackout-01`). Used for CF preview + Pro zip. */
  name: string
  /** Name shown above the example. Falls back to `name`. */
  title?: string
  usage?: BlockInstallUsage[]
  previewAlign?: "center" | "start"
  previewClassName?: string
  previewSize?: "default" | "compact"
  /** Override hosted gallery origin. Defaults to `getPopupsPreviewOrigin()`. */
  previewOrigin?: string
}

/**
 * Docs player for `/popups` only — always Cloudflare iframe + Pro Code tab.
 * Never embeds local `/view` or live registry children.
 */
export function PopupExample({
  name,
  title,
  usage = [],
  previewAlign = "start",
  previewClassName = "bg-canvas p-0",
  previewSize = "default",
  previewOrigin,
}: PopupExampleProps) {
  const compact = previewSize === "compact"
  const origin = (previewOrigin ?? getPopupsPreviewOrigin()).replace(/\/$/, "")

  const [view, setView] = React.useState<View>("preview")
  const [viewport, setViewport] = React.useState<Viewport>("desktop")
  const [dir, setDir] = React.useState<Direction>("ltr")
  const [loadedSrc, setLoadedSrc] = React.useState<string | null>(null)

  const displayTitle = title ?? name
  const activeViewport =
    viewports.find((item) => item.value === viewport) ?? viewports[0]
  const framed = viewport !== "desktop"

  const fullscreenHref = popupPreviewUrl(name, { origin })
  const frameSrc = popupPreviewUrl(name, {
    origin,
    embed: true,
    dir,
  })

  const isPreview = view === "preview"
  const embedReady = loadedSrc === frameSrc

  React.useEffect(() => {
    if (loadedSrc === frameSrc) return
    const id = window.setTimeout(() => {
      setLoadedSrc(frameSrc)
    }, EMBED_READY_TIMEOUT_MS)
    return () => window.clearTimeout(id)
  }, [frameSrc, loadedSrc])

  function showPreview(next?: Viewport) {
    if (next) setViewport(next)
    setView("preview")
  }

  function showCode() {
    prefetchPopupCode(name, usage)
    setView("code")
  }

  return (
    <section
      id={name}
      className="flex w-full min-w-0 scroll-mt-24 flex-col gap-2.5"
    >
      <div
        className={cn(
          "border border-border/70 bg-card",
          view === "code"
            ? "overflow-hidden rounded-t-[12px]"
            : "overflow-visible rounded-[12px]"
        )}
      >
        <div className="flex flex-col gap-2 rounded-t-[12px] border-b border-border/80 bg-card px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <a
              href={`#${name}`}
              className="min-w-0 max-w-40 shrink truncate rounded-md px-2 py-1.5 font-mono text-[12.5px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground sm:max-w-64"
            >
              {displayTitle}
            </a>

            {isPreview ? (
              <>
                <SoftGroup label="Viewport">
                  {viewports.map((item) => (
                    <SoftButton
                      key={item.value}
                      label={item.label}
                      pressed={viewport === item.value}
                      onClick={() => showPreview(item.value)}
                      className="min-w-7 px-0 md:min-w-9"
                    >
                      <item.icon className="size-3.5" aria-hidden />
                    </SoftButton>
                  ))}
                </SoftGroup>

                <DirectionToggle value={dir} onValueChange={setDir} />
              </>
            ) : null}

            <Tooltip delayDuration={SITE_TOOLTIP_DELAY_MS}>
              <TooltipTrigger asChild>
                <a
                  href={fullscreenHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="Open full preview"
                  className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <FullscreenIcon className="size-3.5" aria-hidden />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                Open full preview
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-1.5">
            <SoftGroup label="View mode">
              <SoftButton
                label="Preview"
                pressed={isPreview}
                onClick={() => showPreview()}
              >
                <EyeIcon className="size-3.5 shrink-0" aria-hidden />
                <span className="hidden sm:inline">Preview</span>
              </SoftButton>
              <SoftButton
                label="Code"
                pressed={view === "code"}
                onClick={showCode}
              >
                <Code2Icon className="size-3.5 shrink-0" aria-hidden />
                <span className="hidden sm:inline">Code</span>
              </SoftButton>
            </SoftGroup>
          </div>
        </div>

        <div
          className={cn(
            "relative flex transition-[background-color] duration-300 ease-out",
            !isPreview && "hidden",
            compact ? "min-h-[10rem]" : "min-h-[28rem]",
            framed
              ? "bg-transparency"
              : previewClassName
                ? null
                : "bg-canvas",
            framed
              ? cn(
                  "items-center justify-center overflow-visible",
                  viewport === "mobile" ? "px-3" : "px-6",
                  compact ? "py-6" : "py-10"
                )
              : previewAlign === "center"
                ? "items-center justify-center overflow-visible"
                : "flex-col items-stretch justify-start overflow-visible",
            !framed && previewClassName
          )}
        >
          <div
            className={cn(
              "relative overflow-visible bg-transparent transition-[width] duration-300 ease-out",
              framed ? "mx-auto" : "w-full border border-transparent"
            )}
            style={{
              width: activeViewport.width,
              maxWidth: "100%",
              height: framed
                ? compact
                  ? viewport === "mobile"
                    ? "min(12rem, 35dvh)"
                    : "min(14rem, 40dvh)"
                  : viewport === "mobile"
                    ? "min(40rem, 70dvh)"
                    : "min(42rem, 75dvh)"
                : compact
                  ? "min(14rem, 40dvh)"
                  : "min(45rem, 80dvh)",
            }}
          >
            {!embedReady ? (
              <div
                className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-canvas"
                role="status"
                aria-label="Loading preview"
              >
                <LoadingRing size={40} showLabel label="Loading…" />
              </div>
            ) : null}

            <iframe
              key={frameSrc}
              title={`${name} ${activeViewport.label} preview`}
              src={frameSrc}
              loading="lazy"
              onLoad={() => setLoadedSrc(frameSrc)}
              className={cn(
                "relative z-10 block h-full w-full border-0 bg-transparent transition-opacity duration-300 ease-out",
                embedReady ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        </div>

        {!isPreview ? (
          <div className="max-h-[40rem] w-full overflow-auto">
            <PopupCodeBody name={name} usage={usage} />
          </div>
        ) : null}
      </div>
    </section>
  )
}

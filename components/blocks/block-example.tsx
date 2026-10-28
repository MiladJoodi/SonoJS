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

import {
  BlockInstallBody,
  prefetchBlockInstall,
  type BlockInstallUsage,
} from "@/components/blocks/block-install-drawer"
import { CopyButton } from "@/components/docs/copy-button"
import { DirectionProvider, DirectionToggle } from "@/components/direction"
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

/** Same segmented chrome as docs VariantPreview. */
function SoftGroup({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex h-8 items-stretch overflow-hidden rounded-md border border-border/70 bg-card",
        className
      )}
    >
      {children}
    </div>
  )
}

function SoftButton({
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
            "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-none px-2.5 text-[12.5px] font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset",
            pressed
              ? "bg-canvas text-foreground"
              : "text-muted-foreground hover:text-foreground",
            className
          )}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        {label}
      </TooltipContent>
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
  previewSize = "default",
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
  /**
   * Preview frame height. Use `compact` for short chrome (ratings, breadcrumbs)
   * so the player isn’t a tall empty tube.
   */
  previewSize?: "default" | "compact"
}) {
  const compact = previewSize === "compact"
  const [view, setView] = React.useState<View>("preview")
  const [viewport, setViewport] = React.useState<Viewport>("desktop")
  const [dir, setDir] = React.useState<Direction>("ltr")
  /** Src the framed iframe last finished loading — null on desktop (iframe unmounted). */
  const [loadedSrc, setLoadedSrc] = React.useState<string | null>(null)
  const command = `npx @sonojs/ui@latest add ${name}`
  const displayTitle = title ?? name
  const activeViewport =
    viewports.find((item) => item.value === viewport) ?? viewports[0]
  const framed = viewport !== "desktop"
  const frameSrc = `/view/${name}?embed=1&dir=${dir}`
  const isPreview = view === "preview"
  const frameReady = framed && loadedSrc === frameSrc
  /** Full-bleed shells (dashboards, command menus) opt into clip via previewClassName. */
  const clipPreview = Boolean(
    previewClassName && /\boverflow-hidden\b/.test(previewClassName)
  )
  /**
   * Full-bleed `Sidebar` uses `position: fixed` + `h-svh`, which paints over the site
   * chrome. Clip demos: contain fixed descendants (transform) and force the sidebar
   * shell to `absolute` / `h-full` so it cannot leave the preview frame.
   */
  const stageOverflow = clipPreview
    ? [
        "overflow-hidden [transform:translateZ(0)]",
        // Contain fixed Sidebar inside the preview frame (absolute + h-full).
        "[&_[data-slot=sidebar-container]]:absolute!",
        "[&_[data-slot=sidebar-container]]:inset-y-0!",
        "[&_[data-slot=sidebar-container]]:h-full!",
        "[&_[data-slot=sidebar-container]]:max-h-full!",
        "[&_[data-slot=sidebar-inner]]:h-full!",
        "[&_[data-slot=sidebar-inner]]:min-h-0!",
        "[&_[data-slot=sidebar-inner]]:max-h-full!",
        // Pin to the inline start/end edge (logical — works in LTR and RTL).
        "[&_[data-slot=sidebar][data-side=left]_[data-slot=sidebar-container]]:start-0!",
        "[&_[data-slot=sidebar][data-side=left]_[data-slot=sidebar-container]]:end-auto!",
        "[&_[data-slot=sidebar][data-side=right]_[data-slot=sidebar-container]]:end-0!",
        "[&_[data-slot=sidebar][data-side=right]_[data-slot=sidebar-container]]:start-auto!",
        // Collapsed offcanvas: slide out past the start/end edge (gap already w-0).
        // Translate (not left/right) so it still moves when start-0 is forced above.
        "[&_[data-slot=sidebar][data-side=left][data-collapsible=offcanvas]_[data-slot=sidebar-container]]:-translate-x-full!",
        "rtl:[&_[data-slot=sidebar][data-side=left][data-collapsible=offcanvas]_[data-slot=sidebar-container]]:translate-x-full!",
        "[&_[data-slot=sidebar][data-side=right][data-collapsible=offcanvas]_[data-slot=sidebar-container]]:translate-x-full!",
        "rtl:[&_[data-slot=sidebar][data-side=right][data-collapsible=offcanvas]_[data-slot=sidebar-container]]:-translate-x-full!",
      ].join(" ")
    : "overflow-visible"

  // Unmount path: drop stale ready so desktop→tablet always waits for onLoad.
  if (!framed && loadedSrc !== null) {
    setLoadedSrc(null)
  }

  function showPreview(next?: Viewport) {
    if (next) setViewport(next)
    setView("preview")
  }

  function showCode() {
    // Highlight only when Code is opened — never warm all demos on page load
    // (12× shiki POSTs were freezing mobile viewport switches).
    prefetchBlockInstall(name, usage)
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
          // Full-bleed shells (`overflow-hidden` in previewClassName) must clip
          // sidebar spill — but keep a square bottom so the stage doesn’t look
          // like a floating card with radius (toolbar stays rounded-t only).
          // Soft card demos stay fully rounded + overflow-visible for shadows.
          view === "code" || clipPreview
            ? "overflow-hidden rounded-t-[12px]"
            : "overflow-visible rounded-[12px]"
        )}
      >
        {/* Match docs VariantPreview chrome */}
        <div className="flex flex-col gap-2 rounded-t-[12px] border-b border-border/80 bg-muted/30 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <a
              href={`#${name}`}
              className="min-w-0 max-w-40 shrink truncate rounded-md px-2 py-1.5 font-mono text-[12.5px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground sm:max-w-64"
            >
              {displayTitle}
            </a>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/view/${name}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open full preview"
                  className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <FullscreenIcon className="size-3.5" aria-hidden />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                Open full preview
              </TooltipContent>
            </Tooltip>

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

            <CopyButton
              value={command}
              tone="chrome"
              tooltipSide="top"
              tooltipIdle="Copy install command"
              tooltipCopied="Copied — paste in your terminal"
              className="h-8 rounded-md"
            >
              CLI
            </CopyButton>
          </div>
        </div>

        {isPreview ? (
          <div
            className={cn(
              "relative flex transition-[background-color] duration-300 ease-out",
              compact ? "min-h-[10rem]" : "min-h-[28rem]",
              // Desktop stage = canvas (or previewClassName).
              // Framed letterbox uses transparency checkerboard (not solid white/card).
              framed
                ? "bg-transparency"
                : previewClassName
                  ? null
                  : "bg-canvas",
              framed
                ? cn(
                    "items-center justify-center px-6",
                    stageOverflow,
                    compact ? "py-6" : "py-10"
                  )
                : previewAlign === "center"
                  ? cn("items-center justify-center", stageOverflow)
                  : cn(
                      "flex-col items-stretch justify-start",
                      stageOverflow
                    ),
              !framed && previewClassName
            )}
          >
            <div
              className={cn(
                // No bezel. Soft side shadows need overflow-visible unless clipped.
                // Transparent so the stage color (canvas / previewClassName) shows through.
                "relative transition-[width] duration-300 ease-out",
                framed
                  ? cn("mx-auto bg-transparent", stageOverflow)
                  : cn(
                      "w-full border border-transparent bg-transparent",
                      // Full-bleed shells set h-* on the stage; stretch this frame so
                      // h-full children (SidebarProvider, etc.) fill the preview.
                      clipPreview && "h-full min-h-0",
                      stageOverflow
                    ),
                framed && previewClassName
              )}
              style={{
                width: activeViewport.width,
                maxWidth: "100%",
                ...(framed
                  ? {
                      // Cap device height so short blocks don't leave a tall empty tube.
                      height: compact
                        ? viewport === "mobile"
                          ? "min(12rem, 35dvh)"
                          : "min(14rem, 40dvh)"
                        : viewport === "mobile"
                          ? "min(40rem, 70dvh)"
                          : "min(42rem, 75dvh)",
                    }
                  : undefined),
              }}
            >
              {/* Desktop: live children. Framed: inert fill until iframe is ready (never mount
                  full-bleed shells as a placeholder — they spill the letterbox). */}
              {!framed ? (
                <div
                  className={cn(
                    "relative h-full min-h-0",
                    stageOverflow
                  )}
                >
                  <DirectionProvider
                    dir={dir}
                    className={
                      clipPreview
                        ? "relative h-full min-h-0 w-full overflow-hidden [transform:translateZ(0)]"
                        : undefined
                    }
                  >
                    {children}
                  </DirectionProvider>
                </div>
              ) : !frameReady ? (
                <div
                  className="pointer-events-none absolute inset-0 bg-canvas"
                  aria-hidden
                />
              ) : null}

              {framed ? (
                <iframe
                  key={frameSrc}
                  title={`${name} ${activeViewport.label} preview`}
                  src={frameSrc}
                  onLoad={() => setLoadedSrc(frameSrc)}
                  className={cn(
                    "relative block h-full w-full border-0 bg-transparent transition-opacity duration-300 ease-out",
                    frameReady ? "opacity-100" : "opacity-0"
                  )}
                />
              ) : null}
            </div>
          </div>
        ) : (
          <div className="max-h-[40rem] min-h-[28rem] w-full overflow-auto bg-card p-4">
            <BlockInstallBody name={name} usage={usage} />
          </div>
        )}
      </div>
    </section>
  )
}

"use client"

import * as React from "react"
import { Code2Icon, EyeIcon } from "lucide-react"

import { CodePanel } from "@/components/docs/code-panel"
import { InstallNeedsHint } from "@/components/docs/install-needs-hint"
import { useRegisterPreviewDirection } from "@/components/docs/preview-direction"
import { SoftButton, SoftGroup } from "@/components/docs/soft-toolbar"
import {
  DirectionProvider,
  DirectionToggle,
} from "@/components/direction"
import type { Direction } from "@/lib/direction"
import { prefetchExamples } from "@/components/docs/example-component-cache"
import { RegistryExamplePreview } from "@/components/docs/registry-example-preview"
import { cn } from "@/lib/utils"

export type VariantExample = {
  name: string
  title: string
  /**
   * One short line above the preview (outside the player chrome).
   * Prefer naming the prop/API in backticks, e.g. Use `size="sm"` for …
   */
  description?: string
  /** Consumer-facing source for this variant (shown in Code tab). */
  code?: string
  /** Pre-highlighted HTML from `highlightCode` on the server. */
  codeHtml?: string
  /**
   * Extra registry items this example needs (not required by the main
   * component). Shown as “This example also needs” under the Code tab only.
   */
  requires?: string[]
  /**
   * Extra npm packages this example needs beyond the main component
   * (e.g. lucide-react). Same footer bar on the Code tab; command uses `npm i …`.
   */
  npmRequires?: string[]
}

type ViewMode = "preview" | "code"

/** Renders `` `code` `` spans inside a plain description string. */
function DescriptionText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
          return (
            <code
              key={i}
              className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em] text-foreground"
            >
              {part.slice(1, -1)}
            </code>
          )
        }
        return <React.Fragment key={i}>{part}</React.Fragment>
      })}
    </>
  )
}

function ExampleLead({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="space-y-1.5">
      <h3 className="text-h4 tracking-tight text-foreground">{title}</h3>
      {description ? (
        <p className="text-sm leading-relaxed text-muted-foreground">
          <DescriptionText text={description} />
        </p>
      ) : null}
    </div>
  )
}

function PreviewSurface({ active }: { active: string }) {
  if (!active) return null
  return <RegistryExamplePreview name={active} />
}

export function ComponentVariantPreview({
  examples,
  className,
  previewClassName,
  previewSurface = "plain",
  showDirection = true,
  allowOverflow = false,
}: {
  examples: VariantExample[]
  className?: string
  /** Override the preview stage surface (default `bg-canvas`). */
  previewClassName?: string
  /**
   * Preview stage fill. `card` = white/`bg-card` stage (AI demos).
   * `plain` = soft `bg-canvas` stage.
   */
  previewSurface?: "plain" | "card"
  /** Hide LTR/RTL when the preview has no directional layout (e.g. code). */
  showDirection?: boolean
  /**
   * Let popovers / menus paint outside the frame (no overflow clip).
   * Use for Navigation Menu and similar non-portaled overlays.
   */
  allowOverflow?: boolean
}) {
  const [active, setActive] = React.useState(examples[0]?.name ?? "")
  const [dir, setDir] = React.useState<Direction>("ltr")
  const [view, setView] = React.useState<ViewMode>("preview")
  const [frameMinHeight, setFrameMinHeight] = React.useState<number | undefined>()
  const frameRef = React.useRef<HTMLDivElement>(null)
  const meta = examples.find((item) => item.name === active)
  const hasCode = Boolean(meta?.code && meta?.codeHtml)
  const requires = meta?.requires?.filter(Boolean) ?? []
  const npmRequires = meta?.npmRequires?.filter(Boolean) ?? []
  const effectiveView: ViewMode = hasCode ? view : "preview"

  // Warm every variant on this page so Preview tab switches stay height-stable.
  React.useEffect(() => {
    prefetchExamples(examples.map((item) => item.name))
  }, [examples])

  // Lock the preview frame to the tallest measured height so load/swap does not jump.
  React.useEffect(() => {
    if (effectiveView !== "preview") return
    const el = frameRef.current
    if (!el || typeof ResizeObserver === "undefined") return

    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height
      if (!h) return
      setFrameMinHeight((prev) =>
        prev == null ? h : Math.max(prev, h)
      )
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [effectiveView, active])

  // Root Toaster sits outside this island — publish dir so Sonner RTL matches.
  useRegisterPreviewDirection(
    dir,
    showDirection && effectiveView === "preview"
  )

  const previewFrameClass = cn(
    "flex min-h-32 items-center justify-center p-8",
    previewSurface === "card" ? "bg-card" : "bg-canvas",
    allowOverflow &&
      "relative z-20 min-h-[28rem] items-start justify-center overflow-visible pt-10 pb-16",
    previewClassName
  )
  const previewFrameStyle =
    frameMinHeight != null && !allowOverflow
      ? { minHeight: frameMinHeight }
      : undefined

  return (
    <div className={cn("space-y-3", className)}>
      {meta ? (
        <ExampleLead title={meta.title} description={meta.description} />
      ) : null}

      <div
        className={cn(
          "border border-border/70 bg-card",
          allowOverflow
            ? "relative z-20 overflow-visible rounded-t-[12px]"
            : "overflow-hidden rounded-[12px]"
        )}
      >
        {/* Same toolbar chrome as BlockExample (no CLI / no viewport). */}
        <div className="flex flex-col gap-2 rounded-t-[12px] border-b border-border/80 bg-muted/30 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-1">
            {examples.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(item.name)}
                className={cn(
                  "h-8 cursor-pointer rounded-md px-2.5 text-[12.5px] font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset",
                  active === item.name
                    ? "bg-canvas text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-1.5">
            {effectiveView === "preview" && showDirection ? (
              <DirectionToggle value={dir} onValueChange={setDir} />
            ) : null}
            {hasCode ? (
              <SoftGroup label="View mode">
                <SoftButton
                  label="Preview"
                  pressed={effectiveView === "preview"}
                  onClick={() => setView("preview")}
                >
                  <EyeIcon className="size-3.5 shrink-0" aria-hidden />
                  <span className="hidden sm:inline">Preview</span>
                </SoftButton>
                <SoftButton
                  label="Code"
                  pressed={effectiveView === "code"}
                  onClick={() => setView("code")}
                >
                  <Code2Icon className="size-3.5 shrink-0" aria-hidden />
                  <span className="hidden sm:inline">Code</span>
                </SoftButton>
              </SoftGroup>
            ) : null}
          </div>
        </div>

        {effectiveView === "preview" ? (
          <div
            ref={frameRef}
            className={previewFrameClass}
            style={previewFrameStyle}
          >
            {showDirection ? (
              <DirectionProvider dir={dir} className="contents">
                <PreviewSurface active={active} />
              </DirectionProvider>
            ) : (
              <PreviewSurface active={active} />
            )}
          </div>
        ) : meta?.code && meta?.codeHtml ? (
          <>
            <CodePanel
              title={`${meta.title}.tsx`}
              code={meta.code}
              html={meta.codeHtml}
            />
            <InstallNeedsHint registry={requires} npm={npmRequires} />
          </>
        ) : null}
      </div>
    </div>
  )
}

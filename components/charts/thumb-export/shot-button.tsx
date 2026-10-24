"use client"

/**
 * TEMP — remove after regenerating gallery thumbs (`public/chart/{id}-*.webp`).
 * Dev-only: one PNG of the plot only (no title / metric / legend).
 * Theme is whatever the page is on — you flip light/dark yourself.
 */

import * as React from "react"
import { toPng } from "html-to-image"
import { useTheme } from "next-themes"
import { CameraIcon, Loader2Icon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a")
  a.href = dataUrl
  a.download = filename
  a.rel = "noopener"
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/**
 * Prefer the plot island (`role=img`); if several, take the first.
 * Fallbacks: ChartContainer, Recharts/Highcharts, then card+svg (market-cards).
 */
function findPlotNode(root: HTMLElement): HTMLElement | null {
  const islands = [
    ...root.querySelectorAll<HTMLElement>('[role="img"]'),
  ].filter((el) =>
    Boolean(
      el.querySelector(
        ".recharts-wrapper, .recharts-surface, [data-chart], canvas, svg"
      )
    )
  )
  if (islands[0]) return islands[0]

  const dataChart = root.querySelector<HTMLElement>("[data-chart]")
  if (dataChart) return dataChart

  const library = root.querySelector<HTMLElement>(
    ".recharts-wrapper, .highcharts-container"
  )
  if (library) return library

  // market-cards / custom SVG sparklines — first card that owns an svg
  for (const article of root.querySelectorAll<HTMLElement>("article")) {
    if (article.querySelector("svg")) return article
  }

  const svg = root.querySelector("svg")
  if (svg) {
    const host = svg.closest("article, section, [data-slot]")
    if (host instanceof HTMLElement) return host
    return svg as unknown as HTMLElement
  }

  return null
}

/** Strip opaque CSS backgrounds on the clone so PNG alpha stays clear. */
function clearCloneBackgrounds(el: HTMLElement) {
  const clear = (node: Element) => {
    if (node instanceof HTMLElement) {
      node.style.setProperty("background", "transparent", "important")
      node.style.setProperty("background-color", "transparent", "important")
      node.style.setProperty("background-image", "none", "important")
      node.style.setProperty("box-shadow", "none", "important")
      // Avoid color-scheme painting an opaque foreignObject backdrop
      node.style.setProperty("color-scheme", "normal", "important")
    }
    for (const child of Array.from(node.children)) clear(child)
  }
  clear(el)
}

export function ChartShotButton({
  shotId,
  previewRootRef,
}: {
  /** Catalog id → filename `{shotId}-{light|dark}.png` */
  shotId: string
  previewRootRef: React.RefObject<HTMLElement | null>
}) {
  const { resolvedTheme } = useTheme()
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  const onShot = async () => {
    const root = previewRootRef.current
    if (!root) return
    setBusy(true)
    setError(null)
    let plotNode: HTMLElement | null = null
    const restoreStyles: Array<() => void> = []
    try {
      plotNode = findPlotNode(root)
      if (!plotNode) {
        throw new Error("No chart plot found in preview")
      }

      const forceTransparent = (el: HTMLElement) => {
        const prev = {
          background: el.style.background,
          backgroundColor: el.style.backgroundColor,
        }
        el.style.setProperty("background", "transparent", "important")
        el.style.setProperty("background-color", "transparent", "important")
        restoreStyles.push(() => {
          el.style.background = prev.background
          el.style.backgroundColor = prev.backgroundColor
        })
      }
      // Live nodes: force transparent before clone reads computed styles
      forceTransparent(root)
      forceTransparent(plotNode)
      const previewChrome = root.closest(
        "[data-orientation], [dir]"
      ) as HTMLElement | null
      if (previewChrome && previewChrome !== root) {
        forceTransparent(previewChrome)
      }

      // Let tooltip / hover settle idle
      await sleep(200)
      const dataUrl = await toPng(plotNode, {
        pixelRatio: 2,
        cacheBust: true,
        // Do NOT pass backgroundColor — that paints an opaque canvas fill.
        style: {
          background: "transparent",
          backgroundColor: "transparent",
        },
        onclone: (clonedDoc, clonedNode) => {
          clonedDoc.documentElement.style.setProperty(
            "background",
            "transparent",
            "important"
          )
          clonedDoc.body?.style.setProperty(
            "background",
            "transparent",
            "important"
          )
          if (clonedNode instanceof HTMLElement) {
            clearCloneBackgrounds(clonedNode)
          }
        },
        filter: (el) => {
          if (!(el instanceof HTMLElement)) return true
          // Skip tip / loading / sr-only table chrome
          if (el.classList.contains("recharts-tooltip-wrapper")) return false
          if (el.getAttribute("aria-label") === "Loading chart") return false
          if (el.classList.contains("sr-only")) return false
          return true
        },
      })
      const theme = resolvedTheme === "dark" ? "dark" : "light"
      downloadDataUrl(dataUrl, `${shotId}-${theme}.png`)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      for (const restore of restoreStyles) restore()
      setBusy(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="cursor-pointer gap-1.5"
        disabled={busy || !shotId}
        onClick={() => void onShot()}
        title="TEMP: save plot PNG (current theme)"
      >
        {busy ? (
          <Loader2Icon className="size-3.5 animate-spin" aria-hidden />
        ) : (
          <CameraIcon className="size-3.5" aria-hidden />
        )}
        Shot PNG
      </Button>
      {error ? (
        <span className="max-w-48 truncate text-xs text-destructive">
          {error}
        </span>
      ) : null}
    </div>
  )
}

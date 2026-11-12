"use client"

import * as React from "react"

import { loadHomeBelowFoldCss } from "@/components/home/home-below-fold-css"

/**
 * Loads Recharts only when the hero Chart tab is selected.
 * Reserves the DemoCard footprint to avoid CLS while the chunk loads.
 * Waits for below-fold CSS (chart utilities live there) to avoid FOUC.
 */
export function ShowcaseChartPreviewLazy({
  show,
  className,
}: {
  show: boolean
  className?: string
}) {
  const [Comp, setComp] = React.useState<React.ComponentType<{
    show: boolean
    className?: string
  }> | null>(null)

  React.useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        await loadHomeBelowFoldCss()
        if (cancelled) return
        const mod = await import("@/components/home/hero-showcase-chart")
        if (!cancelled) setComp(() => mod.ShowcaseChartPreview)
      } catch {
        /* keep reserved box */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (!Comp) {
    return (
      <div
        aria-hidden
        className={
          className ??
          "w-full max-w-[350px] rounded-[14px] border border-border/70 bg-card p-4 shadow-soft sm:rounded-[18px] sm:p-[22px]"
        }
      >
        <div className="mb-4 h-[3.25rem]" />
        <div className="h-[140px] w-full sm:h-[160px]" />
      </div>
    )
  }

  return <Comp show={show} className={className} />
}

"use client"

import * as React from "react"
import { ArrowLeftRightIcon } from "lucide-react"

import { ChartDemo } from "@/components/charts"
import { HomeCandlestickChart } from "@/components/home/home-candlestick-chart"
import { cn } from "@/lib/utils"

type HomeChartKind = "candlestick" | "composed"

const COMPOSED_ID = "line-bar-area-composed-chart"

type HomeChartStageProps = {
  /** When set, mounts that registry demo only (no swap). */
  chartId?: string
  /** Premium product charts with swap (default). */
  product?: boolean
  className?: string
}

/**
 * Product-shot frame for the home charts band.
 * Default: BTC candlestick ↔ Line Bar Area Composed, with a swap control.
 */
export function HomeChartStage({
  chartId,
  product = true,
  className,
}: HomeChartStageProps) {
  const [kind, setKind] = React.useState<HomeChartKind>("candlestick")
  const showProduct = product && !chartId

  function swap() {
    setKind((prev) => (prev === "candlestick" ? "composed" : "candlestick"))
  }

  if (chartId) {
    return (
      <div
        className={cn(
          "relative w-full min-w-0 overflow-hidden rounded-[12px]",
          "min-h-[20rem] border border-border/70 bg-canvas shadow-soft sm:min-h-[24rem]",
          className
        )}
      >
        <div className="relative z-10 flex min-h-[20rem] w-full items-center justify-center p-4 sm:min-h-[24rem] sm:p-6">
          <div className="w-full min-w-0">
            <ChartDemo id={chartId} />
          </div>
        </div>
      </div>
    )
  }

  if (!showProduct) {
    return (
      <div
        className={cn(
          "relative flex min-h-[20rem] w-full min-w-0 items-center justify-center overflow-hidden rounded-[12px] border border-border/70 bg-canvas p-4 shadow-soft sm:min-h-[24rem] sm:p-6",
          className
        )}
      >
        <div className="flex max-w-[16rem] flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium tracking-tight text-foreground">
            Chart preview
          </p>
          <p className="text-caption text-muted-foreground">
            Swap in when you pick an id
          </p>
        </div>
      </div>
    )
  }

  const isCandlestick = kind === "candlestick"
  const swapLabel = isCandlestick
    ? "Show Line Bar Area Composed Chart"
    : "Show Bitcoin candlestick"

  return (
    <div className={cn("relative w-full min-w-0", className)}>
      <div className="mb-2 flex items-center justify-end gap-2 px-1">
        <p className="me-auto text-xs font-medium text-muted-foreground">
          {isCandlestick ? "Candlestick" : "Line · Bar · Area"}
        </p>
        <button
          type="button"
          onClick={swap}
          aria-label={swapLabel}
          title={swapLabel}
          className={cn(
            "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-border/70 bg-card px-2.5 text-xs font-medium text-foreground shadow-sm transition-colors",
            "hover:border-primary/50 hover:bg-muted/60"
          )}
        >
          <ArrowLeftRightIcon className="size-3.5" strokeWidth={2} />
          Switch chart
        </button>
      </div>

      <div className="relative w-full min-w-0 px-1 pb-8 pt-1">
        <div
          className={cn(
            "flex h-[31rem] w-full flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft sm:h-[33rem]"
          )}
        >
          <div
            key={kind}
            className="flex min-h-0 flex-1 items-start justify-center overflow-y-auto p-3 sm:p-4"
            style={{
              animation: "sono-fade-up 420ms var(--motion-ease) both",
            }}
          >
            {isCandlestick ? (
              <HomeCandlestickChart className="w-full min-w-0 [&>div]:rounded-none [&>div]:border-0 [&>div]:bg-transparent [&>div]:shadow-none" />
            ) : (
              <div className="w-full min-w-0 [&_[class*='max-w']]:max-w-none">
                <ChartDemo id={COMPOSED_ID} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { ChevronsRightIcon } from "lucide-react"

import { ChartDemo } from "@/components/charts"
import { HomeCandlestickChart } from "./candlestick-chart"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { LineBarAreaComposedChart } from "@/registry/charts/composed/line-bar-area-composed-chart"

type HomeChartKind = "candlestick" | "composed"

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

  const nextButton = (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={swap}
          aria-label={swapLabel}
          className={cn(
            "grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border border-border/70 bg-card text-foreground shadow-sm transition-colors",
            "hover:border-primary/50 hover:bg-muted/60"
          )}
        >
          <ChevronsRightIcon className="size-4 icon-dir" strokeWidth={2} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">{swapLabel}</TooltipContent>
    </Tooltip>
  )

  return (
    <div className={cn("relative w-full min-w-0", className)}>
      {/* Same white card every time — absolute lock so swap cannot resize it */}
      <div className="relative w-full min-w-0 overflow-visible pb-4 sm:pb-6">
        <div className="relative h-[22rem] w-full sm:h-[25rem] lg:h-[27rem]">
          <div className="absolute inset-0 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft sm:rounded-[14px]">
            <div
              key={kind}
              className="h-full w-full"
              style={{
                animation: "sono-fade-up 420ms var(--motion-ease) both",
              }}
            >
              {isCandlestick ? (
                <HomeCandlestickChart
                  trailing={nextButton}
                  className={cn(
                    "flex h-full w-full min-w-0 flex-col",
                    "[&>div]:flex [&>div]:h-full [&>div]:min-h-0 [&>div]:flex-col",
                    "[&>div]:rounded-none [&>div]:border-0 [&>div]:bg-transparent [&>div]:shadow-none",
                    "[&>div>*:first-child]:flex-col [&>div>*:first-child]:items-stretch [&>div>*:first-child]:gap-2 [&>div>*:first-child]:px-2.5 [&>div>*:first-child]:py-2 sm:[&>div>*:first-child]:flex-row sm:[&>div>*:first-child]:items-center sm:[&>div>*:first-child]:px-4 sm:[&>div>*:first-child]:py-3",
                    "[&>div>*:last-child]:min-h-0 [&>div>*:last-child]:flex-1",
                    "[&_[data-slot=chart]]:!h-full [&_[data-slot=chart]]:!max-h-none"
                  )}
                />
              ) : (
                <LineBarAreaComposedChart
                  scrub={false}
                  className={cn(
                    "flex h-full max-w-none flex-col gap-2.5 overflow-hidden p-2.5 pe-11 sm:gap-3.5 sm:p-4 sm:pe-14",
                    "[&>header]:shrink-0 [&>header]:gap-2",
                    "[&>header_h3]:text-base sm:[&>header_h3]:text-lg",
                    "[&>header>div:first-child>p]:hidden",
                    "[&_[role=img]]:flex [&_[role=img]]:min-h-0 [&_[role=img]]:flex-1 [&_[role=img]]:flex-col",
                    "[&_[role=img]]:rounded-none [&_[role=img]]:outline-none! [&_[role=img]]:ring-0! [&_[role=img]]:focus:outline-none! [&_[role=img]]:focus-visible:outline-none! [&_[role=img]]:focus-visible:ring-0!",
                    "[&_.recharts-wrapper]:outline-none! [&_.recharts-surface]:outline-none! [&_g]:outline-none!",
                    "[&_.recharts-tooltip-cursor]:stroke-transparent!",
                    "[&_[data-slot=chart]]:!h-full [&_[data-slot=chart]]:!max-h-none [&_[data-slot=chart]]:!max-w-none",
                    "[&>div.flex.flex-wrap]:shrink-0"
                  )}
                />
              )}
            </div>
          </div>

          {!isCandlestick ? (
            <div className="absolute end-2.5 top-2.5 z-10 sm:end-3 sm:top-3">
              {nextButton}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

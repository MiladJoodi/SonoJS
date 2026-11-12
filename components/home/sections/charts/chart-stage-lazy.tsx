"use client"

import { LazyWhenVisible } from "@/components/home/lazy-when-visible"

function loadHomeChartStage() {
  return import("./chart-stage")
}

/** Client island: owns the dynamic import so RSC never passes a function prop. */
export function HomeChartStageLazy() {
  return (
    <LazyWhenVisible
      loader={loadHomeChartStage}
      exportName="HomeChartStage"
      placeholder={
        <div
          aria-hidden
          className="relative w-full min-w-0 overflow-visible pb-4 sm:pb-6"
        >
          <div className="h-[22rem] w-full overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft sm:h-[25rem] sm:rounded-[14px] lg:h-[27rem]" />
        </div>
      }
    />
  )
}

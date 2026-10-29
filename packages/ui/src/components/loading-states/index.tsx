"use client"

import { useEffect, useState } from "react"

import { cn } from "@sonojs/ui/lib/utils"

import styles from "./loading-state.module.css"
import { ThinkingShimmer } from "./thinking-shimmer"

export type LoadingStateVariant = "drive" | "dots" | "orbit"

export interface LoadingStateProps {
  /** The current work message announced to assistive technology. */
  label?: string
  /** Visual treatment for the loading indicator. */
  variant?: LoadingStateVariant
  /** Show the elapsed duration beside the label. */
  showElapsed?: boolean
  className?: string
}

const chevronDelays = Array.from({ length: 9 }, (_, index) => {
  const row = Math.floor(index / 3)
  const column = index % 3
  return (column + Math.abs(row - 1)) * 90
})

const orbitOrder = [0, 1, 2, 5, 8, 7, 6, 3]
const orbitDelays = Array.from({ length: 9 }, (_, index) => {
  const position = orbitOrder.indexOf(index)
  return position === -1 ? null : position * 110
})

const patternByVariant: Record<
  LoadingStateVariant,
  { delays: Array<number | null>; duration: number; circular: boolean }
> = {
  drive: { delays: chevronDelays, duration: 650, circular: false },
  dots: { delays: chevronDelays, duration: 650, circular: true },
  orbit: { delays: orbitDelays, duration: 950, circular: false },
}

function useElapsed() {
  const [tenths, setTenths] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(
      () => setTenths((value) => value + 1),
      100
    )
    return () => window.clearInterval(interval)
  }, [])

  const seconds = tenths / 10
  return seconds < 60
    ? `${seconds.toFixed(1)}s`
    : `${Math.floor(seconds / 60)}m ${(seconds % 60).toFixed(1)}s`
}

function LoadingState({
  label = "Working",
  variant = "drive",
  showElapsed = true,
  className,
}: LoadingStateProps) {
  const elapsed = useElapsed()
  const { delays, duration, circular } = patternByVariant[variant]

  return (
    <div
      data-slot="loading-state"
      data-variant={variant}
      className={cn(styles.root, className)}
      role="status"
    >
      <span aria-hidden className={styles.grid}>
        {delays.map((delay, index) => (
          <span
            // The grid position is stable for the lifetime of the indicator.
            key={index}
            className={cn(styles.pixel, circular && styles.circular)}
            style={
              delay === null
                ? undefined
                : {
                    animationDelay: `${delay}ms`,
                    animationDuration: `${duration}ms`,
                  }
            }
          />
        ))}
      </span>
      <ThinkingShimmer className={styles.label}>{label}</ThinkingShimmer>
      {showElapsed ? (
        <span aria-hidden className={styles.elapsed}>
          {elapsed}
        </span>
      ) : null}
    </div>
  )
}

export { LoadingState }
export default LoadingState

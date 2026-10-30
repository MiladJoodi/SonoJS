"use client"

import * as React from "react"
import { type ComponentPropsWithoutRef } from "react"

import { useDirection } from "@sonojs/ui/hooks/use-direction"
import { cn } from "@sonojs/ui/lib/utils"

type MarqueeProps = ComponentPropsWithoutRef<"div"> & {
  /** Reverse the animation direction. */
  reverse?: boolean
  /** Pause the animation while hovered. */
  pauseOnHover?: boolean
  /** Content to scroll. */
  children: React.ReactNode
  /** Animate vertically instead of horizontally. */
  vertical?: boolean
  /** How many times to repeat the content strip. */
  repeat?: number
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const { dir } = useDirection()
  // Horizontal motion follows the inline axis; flip default in RTL.
  const effectiveReverse = vertical
    ? reverse
    : dir === "rtl"
      ? !reverse
      : reverse

  return (
    <div
      {...props}
      className={cn(
        "group flex min-w-0 gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around gap-(--gap)",
              "motion-reduce:animate-none motion-reduce:paused",
              {
                "animate-marquee flex-row": !vertical,
                "animate-marquee-vertical w-full min-w-0 flex-col": vertical,
                "group-hover:paused": pauseOnHover,
                "[animation-direction:reverse]": effectiveReverse,
              }
            )}
          >
            {children}
          </div>
        ))}
    </div>
  )
}

export { Marquee, type MarqueeProps }

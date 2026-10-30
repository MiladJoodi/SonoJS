"use client"

import * as React from "react"

import { Marquee } from "@sonojs/ui/components/marquee"
import { useDirection } from "@/hooks/use-direction"
import { cn } from "@/lib/utils"

import { ReviewCard } from "./review-card"
import { reviews } from "./reviews"

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2))
const secondRow = reviews.slice(Math.ceil(reviews.length / 2))
const thirdRow = reviews.slice(0, Math.ceil(reviews.length / 2))
const fourthRow = reviews.slice(Math.ceil(reviews.length / 2))

function useCompactStage() {
  const [compact, setCompact] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)")
    const sync = () => setCompact(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  return compact
}

export function Marquee3D() {
  const { isRtl } = useDirection()
  const compact = useCompactStage()

  const stageTransform = compact
    ? isRtl
      ? "translateZ(-60px) rotateX(12deg) rotateY(5deg) rotateZ(-8deg)"
      : "translateZ(-60px) rotateX(12deg) rotateY(-5deg) rotateZ(8deg)"
    : isRtl
      ? "translateX(100px) translateZ(-100px) rotateX(20deg) rotateY(10deg) rotateZ(-20deg)"
      : "translateX(-100px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)"

  return (
    <div
      className={cn(
        "relative flex h-[min(360px,65dvh)] w-full min-w-0 items-center justify-center overflow-hidden",
        "[perspective:300px] sm:h-96"
      )}
    >
      <div className="flex origin-center scale-50 sm:scale-75 md:scale-90 lg:scale-100">
        <div
          className="flex flex-row items-center gap-1.5 sm:gap-4"
          style={{ transform: stageTransform }}
        >
          <Marquee
            pauseOnHover
            vertical
            className="h-[420px] w-28 min-w-0 overflow-hidden p-0 [--duration:20s] [--gap:0.75rem] sm:h-[480px] sm:w-36 sm:p-2 sm:[--gap:1rem]"
          >
            {firstRow.map((review) => (
              <ReviewCard
                key={`a-${review.username}`}
                className="w-full min-w-0 max-w-full shrink-0"
                {...review}
              />
            ))}
          </Marquee>
          <Marquee
            reverse
            pauseOnHover
            vertical
            className="h-[420px] w-28 min-w-0 overflow-hidden p-0 [--duration:20s] [--gap:0.75rem] sm:h-[480px] sm:w-36 sm:p-2 sm:[--gap:1rem]"
          >
            {secondRow.map((review) => (
              <ReviewCard
                key={`b-${review.username}`}
                className="w-full min-w-0 max-w-full shrink-0"
                {...review}
              />
            ))}
          </Marquee>
          <Marquee
            reverse
            pauseOnHover
            vertical
            className="hidden h-[420px] w-28 min-w-0 overflow-hidden p-0 [--duration:20s] [--gap:0.75rem] sm:flex sm:h-[480px] sm:w-36 sm:p-2 sm:[--gap:1rem]"
          >
            {thirdRow.map((review) => (
              <ReviewCard
                key={`c-${review.username}`}
                className="w-full min-w-0 max-w-full shrink-0"
                {...review}
              />
            ))}
          </Marquee>
          <Marquee
            pauseOnHover
            vertical
            className="hidden h-[420px] w-28 min-w-0 overflow-hidden p-0 [--duration:20s] [--gap:0.75rem] md:flex md:h-[480px] md:w-36 md:p-2 md:[--gap:1rem]"
          >
            {fourthRow.map((review) => (
              <ReviewCard
                key={`d-${review.username}`}
                className="w-full min-w-0 max-w-full shrink-0"
                {...review}
              />
            ))}
          </Marquee>
        </div>
      </div>

      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b" />
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" />
      <div className="from-background pointer-events-none absolute inset-y-0 start-0 w-1/5 bg-gradient-to-r sm:w-1/4 rtl:bg-gradient-to-l" />
      <div className="from-background pointer-events-none absolute inset-y-0 end-0 w-1/5 bg-gradient-to-l sm:w-1/4 rtl:bg-gradient-to-r" />
    </div>
  )
}

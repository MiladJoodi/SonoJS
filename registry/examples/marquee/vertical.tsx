import { Marquee } from "@sonojs/ui/components/marquee"

import { ReviewCard } from "./review-card"
import { reviews } from "./reviews"

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2))
const secondRow = reviews.slice(Math.ceil(reviews.length / 2))

export function MarqueeVertical() {
  return (
    <div className="relative flex h-[min(420px,70dvh)] w-full min-w-0 flex-row items-stretch justify-center gap-2 overflow-hidden sm:h-[500px] sm:gap-4">
      <Marquee
        pauseOnHover
        vertical
        className="h-full w-full min-w-0 max-w-64 overflow-hidden p-1 [--duration:20s] [--gap:0.75rem] sm:w-36 sm:max-w-none sm:p-2 sm:[--gap:1rem]"
      >
        {firstRow.map((review) => (
          <ReviewCard
            key={review.username}
            className="w-full min-w-0 max-w-full shrink-0"
            {...review}
          />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        vertical
        className="hidden h-full w-36 min-w-0 overflow-hidden p-2 [--duration:20s] [--gap:1rem] sm:flex"
      >
        {secondRow.map((review) => (
          <ReviewCard
            key={review.username}
            className="w-full min-w-0 max-w-full shrink-0"
            {...review}
          />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b" />
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" />
    </div>
  )
}

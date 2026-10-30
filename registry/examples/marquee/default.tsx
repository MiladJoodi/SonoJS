import { Marquee } from "@sonojs/ui/components/marquee"

import { ReviewCard } from "./review-card"
import { reviews } from "./reviews"

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

export function MarqueeDefault() {
  return (
    <div className="relative flex w-full min-w-0 flex-col items-center justify-center overflow-hidden">
      <Marquee
        pauseOnHover
        className="w-full p-1.5 [--duration:20s] [--gap:0.75rem] sm:p-2 sm:[--gap:1rem]"
      >
        {firstRow.map((review) => (
          <ReviewCard
            key={review.username}
            className="w-52 shrink-0 sm:w-64"
            {...review}
          />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        className="w-full p-1.5 [--duration:20s] [--gap:0.75rem] sm:p-2 sm:[--gap:1rem]"
      >
        {secondRow.map((review) => (
          <ReviewCard
            key={review.username}
            className="w-52 shrink-0 sm:w-64"
            {...review}
          />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 start-0 w-1/5 bg-gradient-to-r sm:w-1/4 rtl:bg-gradient-to-l" />
      <div className="from-background pointer-events-none absolute inset-y-0 end-0 w-1/5 bg-gradient-to-l sm:w-1/4 rtl:bg-gradient-to-r" />
    </div>
  )
}

import type * as React from "react"

import { cn } from "@/lib/utils"

import avatar01 from "./avatar-01.webp"
import avatar02 from "./avatar-02.webp"

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function StarIcon({
  filled,
  className,
  ...props
}: React.ComponentProps<"svg"> & { filled?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(
        "size-3.5 shrink-0",
        filled
          ? "fill-[#F5B301]"
          : "fill-zinc-200 dark:fill-zinc-600",
        className
      )}
      {...props}
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: "John Doe",
    avatar: assetSrc(avatar01),
    rating: 3,
    time: "2 mins ago",
    text: "The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.",
  },
  {
    id: 2,
    name: "Mark Adair",
    avatar: assetSrc(avatar02),
    rating: 3,
    time: "21 mins ago",
    text: "The overall experience was great. My order arrived quickly, and everything was fresh and well prepared. The staff were polite and helpful, making the process smooth from start to finish.",
  },
]

export default function Rating({
  reviews = DEFAULT_REVIEWS,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  reviews?: {
    id: number
    name: string
    avatar: string
    rating: number
    time: string
    text: string
  }[]
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-md rounded-[12px] border border-border/70 bg-card p-6 shadow-soft",
        className
      )}
      {...props}
      dir="ltr"
    >
      <div className="flex items-end justify-between gap-3">
        <h3 className="text-sm font-semibold text-foreground">All reviews</h3>
        <p className="text-xs font-medium tabular-nums text-muted-foreground">
          {reviews.length} shown
        </p>
      </div>

      <div className="mt-5 divide-y divide-border/70">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col items-start gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row"
          >
            <img
              src={review.avatar}
              className="size-11 shrink-0 rounded-full object-cover ring-2 ring-border/70"
              alt=""
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {review.name}
                </p>
                <span className="text-xs text-muted-foreground">·</span>
                <p className="text-xs font-medium text-muted-foreground">
                  {review.time}
                </p>
              </div>

              <div
                className="mt-1.5 flex items-center gap-1"
                role="img"
                aria-label={`Rated ${review.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} filled={i < review.rating} />
                ))}
              </div>

              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                {review.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

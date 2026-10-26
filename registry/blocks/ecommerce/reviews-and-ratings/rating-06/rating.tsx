import type * as React from "react"

import { cn } from "@/lib/utils"

import avatarImage from "./avatar.webp"

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

const DEFAULT_DISTRIBUTION = [
  { label: "5", percentage: 52 },
  { label: "4", percentage: 24 },
  { label: "3", percentage: 12 },
  { label: "2", percentage: 7 },
  { label: "1", percentage: 5 },
]

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
        "size-4 shrink-0",
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

export default function Rating({
  averageRating = 4,
  totalRatings = "5,456,852",
  distribution = DEFAULT_DISTRIBUTION,
  reviewerName = "John Doe",
  reviewerRating = 3,
  reviewerTime = "2 mins ago",
  reviewerText = "The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.",
  avatarSrc = assetSrc(avatarImage),
  className,
  ...props
}: React.ComponentProps<"div"> & {
  averageRating?: number
  totalRatings?: string
  distribution?: { label: string; percentage: number }[]
  reviewerName?: string
  reviewerRating?: number
  reviewerTime?: string
  reviewerText?: string
  avatarSrc?: string
}) {
  const filledStars = Math.floor(averageRating)

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-lg rounded-[12px] border border-border/70 bg-card p-6 shadow-soft",
        className
      )}
      {...props}
      dir="ltr"
    >
      <div className="grid items-center gap-6 sm:grid-cols-3">
        <div className="text-center sm:text-start">
          <p className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Overall
          </p>
          <h3 className="mt-1 text-4xl font-semibold tracking-tight tabular-nums text-foreground">
            {averageRating.toFixed(1)}
          </h3>
          <div
            className="mt-3 flex justify-center gap-1 sm:justify-start"
            role="img"
            aria-label={`Rated ${filledStars} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} filled={i < filledStars} />
            ))}
          </div>
          <p className="mt-2 text-sm font-medium tabular-nums text-muted-foreground">
            {totalRatings}
          </p>
        </div>

        <div className="space-y-2.5 sm:col-span-2">
          {distribution.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <span className="w-4 shrink-0 text-sm font-semibold tabular-nums text-muted-foreground">
                {item.label}
              </span>
              <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-[#F5B301]"
                  style={{ width: `${item.percentage}%` }}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={item.percentage}
                  aria-label={`${item.label} star reviews`}
                />
              </div>
              <p className="w-10 shrink-0 text-end text-sm font-semibold tabular-nums whitespace-nowrap text-muted-foreground">
                {item.percentage}%
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-6 h-px bg-border/70" />

      <div>
        <h3 className="text-sm font-semibold text-foreground">Latest review</h3>
        <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row">
          <img
            src={avatarSrc}
            alt=""
            className="size-11 shrink-0 rounded-full object-cover ring-2 ring-border/70"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h4 className="text-sm font-semibold text-foreground">
                {reviewerName}
              </h4>
              <span className="text-xs text-muted-foreground">·</span>
              <p className="text-xs font-medium text-muted-foreground">
                {reviewerTime}
              </p>
            </div>
            <div
              className="mt-1.5 flex items-center gap-1"
              role="img"
              aria-label={`Rated ${reviewerRating} out of 5 stars`}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  key={i}
                  filled={i < reviewerRating}
                  className="size-3"
                />
              ))}
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              {reviewerText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

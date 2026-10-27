import type * as React from "react"

import { cn } from "@/lib/utils"

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

const DEFAULT_DISTRIBUTION = [
  { label: "5", percentage: 52 },
  { label: "4", percentage: 24 },
  { label: "3", percentage: 12 },
  { label: "2", percentage: 7 },
  { label: "1", percentage: 5 },
]

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
  totalRatings = "1,153",
  distribution = DEFAULT_DISTRIBUTION,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  averageRating?: number
  totalRatings?: string
  distribution?: { label: string; percentage: number }[]
}) {
  const filledStars = Math.floor(averageRating)

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-sm rounded-[12px] border border-border/70 bg-card p-6 shadow-soft",
        className
      )}
      {...props}
      dir="ltr"

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
      <div
        className="text-center"
        role="img"
        aria-label={`Average rating ${averageRating} out of 5 stars based on ${totalRatings} ratings`}
      >
        <p className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Average rating
        </p>
        <h3 className="mt-2 text-5xl font-semibold tracking-tight tabular-nums text-foreground">
          {averageRating.toFixed(1)}
        </h3>

        <div className="mt-4 flex justify-center gap-1.5">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < filledStars} />
          ))}
        </div>

        <p className="mt-3 text-sm font-medium tabular-nums text-muted-foreground">
          {totalRatings} ratings
        </p>
      </div>

      <div className="mt-7 space-y-2.5 border-t border-border/70 pt-6">
        {distribution.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex w-10 shrink-0 items-center gap-1">
              <span className="text-sm font-semibold tabular-nums text-muted-foreground">
                {item.label}
              </span>
              <StarIcon filled className="size-3.5" />
            </div>

            <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-[#F5B301] transition-[width] duration-500 ease-out"
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
  )
}

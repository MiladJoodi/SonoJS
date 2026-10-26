import type * as React from "react"

import { PencilIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

const DEFAULT_DISTRIBUTION = [
  { label: "5", percentage: 60 },
  { label: "4", percentage: 20 },
  { label: "3", percentage: 10 },
  { label: "2", percentage: 7 },
  { label: "1", percentage: 3 },
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
  totalRatings = "1,153 ratings",
  filledStars = 4,
  distribution = DEFAULT_DISTRIBUTION,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  averageRating?: number
  totalRatings?: string
  filledStars?: number
  distribution?: { label: string; percentage: number }[]
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-sm rounded-[12px] border border-border/70 bg-card p-6 shadow-soft",
        className
      )}
      {...props}
      dir="ltr"
    >
      <div className="flex items-center gap-5">
        <div className="flex size-[4.5rem] shrink-0 flex-col items-center justify-center rounded-[12px] bg-muted/60">
          <h3 className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
            {averageRating.toFixed(1)}
          </h3>
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="flex gap-1.5"
            role="img"
            aria-label={`Average rating ${filledStars} out of 5 stars based on ${totalRatings}`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} filled={i < filledStars} />
            ))}
          </div>
          <p className="mt-2 text-sm font-medium tabular-nums text-muted-foreground">
            {totalRatings}
          </p>
        </div>
      </div>

      <div className="my-6 h-px bg-border/70" />

      <div className="space-y-2.5">
        {distribution.map((rating) => (
          <div key={rating.label} className="flex items-center gap-3">
            <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-[#F5B301]"
                style={{ width: `${rating.percentage}%` }}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={rating.percentage}
                aria-label={`${rating.label} star reviews`}
              />
            </div>
            <div className="flex w-10 shrink-0 items-center justify-end gap-1">
              <span className="text-sm font-semibold tabular-nums text-muted-foreground">
                {rating.label}
              </span>
              <StarIcon filled className="size-3.5" />
            </div>
          </div>
        ))}
      </div>

      <div className="my-6 h-px bg-border/70" />

      <Button type="button" variant="outline" className="w-full shadow-none">
        <PencilIcon className="size-4" aria-hidden />
        Write a review
      </Button>
    </div>
  )
}

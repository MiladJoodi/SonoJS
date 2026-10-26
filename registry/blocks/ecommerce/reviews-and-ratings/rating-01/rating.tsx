import type * as React from "react"

import { cn } from "@/lib/utils"

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

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
        "size-[18px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]",
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
  value = 3,
  max = 5,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  value?: number
  max?: number
}) {
  const clamped = Math.max(0, Math.min(max, value))

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full border border-border/70 bg-card px-4 py-2.5 shadow-soft",
        className
      )}
      {...props}
      dir="ltr"
    >
      <span className="sr-only">
        Rated {clamped} out of {max} stars
      </span>
      {Array.from({ length: max }, (_, i) => (
        <StarIcon key={i} filled={i < clamped} />
      ))}
    </div>
  )
}

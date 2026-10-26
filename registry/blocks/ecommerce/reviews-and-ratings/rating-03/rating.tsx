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
        "size-4",
        filled ? "fill-[#F5B301]" : "fill-zinc-500",
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
  const score = clamped.toFixed(1)

  return (
    <div
      role="img"
      aria-label={`Rated ${clamped} out of ${max} stars`}
      className={cn(
        "relative mx-auto flex w-max min-h-11 items-center rounded-full bg-zinc-950 py-2.5 ps-12 pe-5 shadow-soft ring-1 ring-white/10",
        className
      )}
      {...props}
      dir="ltr"
    >
      <div className="absolute -start-3.5 flex size-12 items-center justify-center rounded-full bg-gradient-to-b from-[#FFE08A] to-[#F5B301] text-base font-bold tabular-nums text-zinc-950 shadow-[0_4px_14px_rgba(245,179,1,0.45)] ring-4 ring-white">
        {score}
      </div>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: max }, (_, i) => (
          <StarIcon key={i} filled={i < clamped} />
        ))}
      </div>
    </div>
  )
}

import type * as React from "react"

import { cn } from "@/lib/utils"

import avatarImage from "./avatar.webp"

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
        "size-4",
        filled ? "fill-[#F5B301]" : "fill-zinc-600",
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
  name = "John Doe",
  role = "Software Engineer",
  review = "The platform is easy to use and has really helped me organize my tasks better. Some features could be improved, but overall it’s been a positive experience.",
  date = "June 10, 2024",
  avatarSrc = assetSrc(avatarImage),
  className,
  ...props
}: React.ComponentProps<"div"> & {
  value?: number
  max?: number
  name?: string
  role?: string
  review?: string
  date?: string
  avatarSrc?: string
}) {
  const clamped = Math.max(0, Math.min(max, value))

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-sm overflow-hidden rounded-[12px] bg-zinc-950 p-1 shadow-soft ring-1 ring-white/10",
        className
      )}
      {...props}
      dir="ltr"
    >
      <div className="rounded-[10px] bg-zinc-900/80 p-5">
        <div className="flex items-center gap-3">
          <img
            src={avatarSrc}
            alt=""
            className="size-11 rounded-full object-cover ring-2 ring-[#F5B301]/40 ring-offset-2 ring-offset-zinc-950"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-50">{name}</p>
            <p className="mt-0.5 truncate text-xs text-zinc-400">{role}</p>
          </div>
        </div>

        <div className="mt-5 border-t border-white/10 pt-5">
          <div className="flex gap-1.5">
            <span className="sr-only">
              Rated {clamped} out of {max} stars
            </span>
            {Array.from({ length: max }, (_, i) => (
              <StarIcon key={i} filled={i < clamped} />
            ))}
          </div>

          <p className="mt-4 text-[13px] leading-relaxed text-zinc-300">
            “{review}”
          </p>
          <p className="mt-4 text-end text-xs font-medium tracking-wide text-zinc-500">
            {date}
          </p>
        </div>
      </div>
    </div>
  )
}

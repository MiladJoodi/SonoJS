"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

const units = [
  { value: "05", label: "D" },
  { value: "24", label: "H" },
  { value: "26", label: "M" },
  { value: "32", label: "S" },
] as const

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("w-full bg-[#C4F500] px-2 py-2.5", className)}
      role="region"
      aria-label="Limited-time deals"
      {...props}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 text-center sm:gap-12">
        <p className="text-[13px] font-medium text-zinc-900">
          Don&apos;t miss the limited-time deals!
        </p>
        <div
          className="flex items-center gap-2"
          aria-label="Countdown 5 days 24 hours 26 minutes 32 seconds"
        >
          {units.map((unit) => (
            <div key={unit.label} className="flex items-baseline gap-0.5">
              <span className="text-sm font-medium text-zinc-900">
                {unit.value}
              </span>
              <span className="text-[11px] font-light text-zinc-700">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
        <a
          href="#"
          className="cursor-pointer text-xs text-zinc-800 underline underline-offset-2 hover:opacity-80"
        >
          Check out now!
        </a>
      </div>
    </div>
  )
}

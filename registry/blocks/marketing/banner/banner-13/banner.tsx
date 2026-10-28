"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const units = [
  { value: "02", label: "d" },
  { value: "14", label: "h" },
  { value: "37", label: "m" },
  { value: "08", label: "s" },
] as const

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full border-b border-lime-600/30 bg-lime-400 px-2 py-2.5 dark:border-lime-400/20 dark:bg-lime-500",
        className
      )}
      role="region"
      aria-label="Limited-time deals"
      {...props}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 text-center sm:gap-6">
        <p className="text-sm font-semibold text-zinc-950">
          Flash sale ends soon
        </p>
        <div
          className="flex items-center gap-1.5"
          aria-label="Countdown 2 days 14 hours 37 minutes 8 seconds"
          dir="ltr"
        >
          {units.map((unit, i) => (
            <React.Fragment key={unit.label}>
              {i > 0 ? (
                <span className="text-zinc-950/40" aria-hidden>
                  :
                </span>
              ) : null}
              <span className="inline-flex min-w-8 items-baseline justify-center gap-0.5 rounded-md bg-zinc-950/10 px-1.5 py-0.5 font-mono text-sm font-semibold tabular-nums text-zinc-950">
                {unit.value}
                <span className="text-[10px] font-medium uppercase opacity-70">
                  {unit.label}
                </span>
              </span>
            </React.Fragment>
          ))}
        </div>
        <a
          href="#"
          className="cursor-pointer text-xs font-semibold text-zinc-950 underline underline-offset-2 hover:opacity-80"
        >
          Shop the deal
        </a>
      </div>
    </div>
  )
}

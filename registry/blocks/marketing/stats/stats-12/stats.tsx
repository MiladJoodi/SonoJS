"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

const metrics = [
  { value: "1.2M", label: "Members worldwide" },
  { value: "95%", label: "Customer satisfaction rate" },
  { value: "3500+", label: "Transactions processed daily" },
]

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="stats-heading"
      {...props}
    >
      <style>{`
        .stats-12-band {
          background-color: var(--primary);
          color: var(--primary-foreground);
        }
        .dark .stats-12-band {
          background-color: color-mix(in oklab, var(--primary) 88%, #000);
        }
      `}</style>

      <div className="stats-12-band z-20 mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-x-10 gap-y-6 rounded-[12px] px-4 py-8 sm:px-5 sm:py-10 md:grid-cols-3 md:px-10 lg:grid-cols-4 lg:px-10">
        <div className="col-span-1 flex flex-col items-center justify-center gap-y-3 md:col-span-3 lg:col-span-1">
          <h2
            id="stats-heading"
            className="text-center text-2xl font-semibold tracking-tight md:pb-5 md:text-3xl"
          >
            Join Us to Achieve More
          </h2>
        </div>

        {metrics.map((item) => (
          <div
            key={item.label}
            className="col-span-1 flex min-w-0 flex-col items-center justify-center gap-y-2 sm:gap-y-3"
          >
            <p className="text-3xl font-semibold tabular-nums md:text-4xl" dir="ltr">
              {item.value}
            </p>
            <p className="text-center text-sm opacity-90">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

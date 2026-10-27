"use client"

import type * as React from "react"
import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const topMetrics = [
  { value: "99.99%", label: "Uptime" },
  { value: "$159m", label: "Funding" },
  { value: "5,000", label: "Features", desktopOnly: true },
]

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-label="Product metrics"
      {...props}
    >
      <style>{`
        .stats-11-card {
          background-color: var(--primary);
          color: var(--primary-foreground);
          box-shadow:
            0 10px 24px -8px color-mix(in oklab, var(--primary) 35%, transparent),
            0 4px 10px -4px color-mix(in oklab, var(--primary) 25%, transparent);
        }
        .stats-11-rating {
          background-color: color-mix(in oklab, var(--primary) 72%, #000);
        }
        .stats-11-muted {
          color: color-mix(in oklab, var(--primary-foreground) 78%, transparent);
        }
      `}</style>

      <div className="stats-11-card mx-auto grid w-full max-w-2xl grid-cols-1 gap-2 rounded-[12px] p-2 md:max-w-3xl">
        <div className="flex min-w-0 gap-2 sm:gap-4">
          {topMetrics.map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex min-w-0 flex-1 flex-col gap-1 p-2",
                item.desktopOnly && "hidden lg:flex"
              )}
            >
              <span className="text-xl font-semibold tracking-tight tabular-nums sm:text-2xl md:text-3xl">
                {item.value}
              </span>
              <span className="stats-11-muted text-xs font-semibold">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="stats-11-rating rounded-[12px] p-2">
          <div className="flex flex-col gap-1 p-2">
            <div
              className="stats-11-muted mb-2 flex items-center"
              aria-label="5 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className="size-4 fill-current"
                  aria-hidden
                />
              ))}
            </div>
            <span className="text-xl font-semibold tracking-tight tabular-nums sm:text-2xl md:text-3xl">
              Rated 5 Stars
            </span>
            <span className="stats-11-muted text-xs font-semibold">
              By trusted research company
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

const metrics = [
  {
    value: "$1.5B+",
    description: "active listings worldwide",
  },
  {
    value: "100+",
    description: "cities and towns with active card",
  },
  {
    value: "75%",
    description: "assets under management",
  },
]

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-label="Key metrics"
      {...props}
    >
      <div className="w-full overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <ul className="mx-auto grid w-full max-w-6xl grid-cols-1 md:grid-cols-3">
          {metrics.map((item, index) => (
            <li
              key={item.value}
              className={cn(
                "px-5 py-7 text-center sm:px-6 sm:py-8 md:px-10 md:py-10",
                index < metrics.length - 1 &&
                  "border-b border-border/70 md:border-b-0 md:border-e"
              )}
            >
              <p
                className="mb-2 text-3xl font-semibold tracking-tight text-foreground tabular-nums md:text-4xl"
                dir="ltr"
              >
                {item.value}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

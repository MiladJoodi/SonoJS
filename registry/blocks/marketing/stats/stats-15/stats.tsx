"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

const metrics = [
  { label: "Total Users", value: "5.4" },
  { label: "Revenue", value: "$80K" },
  { label: "Engagement", value: "100K" },
  { label: "Server Uptime", value: "99.9%" },
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
      <div className="w-full rounded-[24px] border border-border/70 bg-card px-4 py-12 shadow-soft sm:px-6 sm:py-16 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="w-full text-center lg:max-w-lg lg:text-start">
            <h2
              id="stats-heading"
              className="mb-4 text-2xl font-semibold tracking-tight text-foreground sm:mb-6 md:text-3xl"
            >
              Startup Website Template
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Kickstart your online presence with a sleek, professional design
              built for modern startups. This template is fully responsive and
              optimized for performance—ideal for showcasing your product and
              converting visitors into customers.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {metrics.map((item) => (
              <li
                key={item.label}
                className="flex min-h-[120px] flex-col items-center justify-center rounded-[12px] bg-muted/60 p-5 text-center transition-colors duration-200 hover:bg-muted sm:min-h-[140px] sm:p-6"
              >
                <dl className="flex flex-col gap-3">
                  <dd
                    className="text-3xl font-semibold tabular-nums text-primary md:text-4xl"
                    dir="ltr"
                  >
                    {item.value}
                  </dd>
                  <dt className="text-sm font-medium text-muted-foreground">
                    {item.label}
                  </dt>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

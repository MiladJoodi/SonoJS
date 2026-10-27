"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

const metrics = [
  { value: "12 million", label: "words written in 2023" },
  { value: "10k", label: "episodes uploaded" },
  { value: "6.6k", label: "hours of media" },
  { value: "2.1k", label: "answers" },
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
      <div className="w-full rounded-[24px] border border-border/70 bg-card p-5 shadow-soft sm:p-8 md:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <h2
              id="stats-heading"
              className="text-2xl font-semibold tracking-tight md:text-3xl"
            >
              Trusted by creators worldwide
            </h2>
            <p className="text-base text-muted-foreground">
              We can help you grow your audience and your business, no matter
              the size.
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-border text-center sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="flex flex-col bg-muted/50 p-6 dark:bg-muted sm:p-8"
              >
                <dt className="order-last text-sm text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight tabular-nums text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

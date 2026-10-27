"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

const metrics = [
  { value: "4.7", label: "Stars on App Store" },
  { value: "2M+", label: "Happy Global Users" },
  { value: "150+", label: "File Extensions Supported" },
  { value: "80%", label: "Productivity Increased" },
]

const valueGradientStyle: React.CSSProperties = {
  backgroundImage: "linear-gradient(to bottom, #0f766e, #15803d, #0891b2)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
}

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
      <div className="w-full rounded-[24px] border border-border/70 bg-card px-4 py-10 text-center shadow-soft sm:px-6 sm:py-12 md:px-8 md:py-20">
        <h2
          id="stats-heading"
          className="mx-auto mb-10 max-w-3xl text-2xl font-semibold tracking-tight text-foreground sm:mb-12 md:mb-16 md:text-3xl"
        >
          Let the numbers do the talking
        </h2>

        <ul className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          {metrics.map((item) => (
            <li key={item.label} className="min-w-0">
              <span
                className="mb-3 block text-3xl font-semibold tabular-nums leading-none md:text-4xl"
                style={valueGradientStyle}
                dir="ltr"
              >
                {item.value}
              </span>
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

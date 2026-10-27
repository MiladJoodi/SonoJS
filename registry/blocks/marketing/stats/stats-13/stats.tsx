"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

const accentColors = {
  blue: "#2563eb",
  green: "#16a34a",
  purple: "#7c3aed",
  orange: "#ea580c",
} as const

const metrics = [
  {
    label: "Total Users",
    value: "10,492",
    trend: "↑ 12% from last month",
    accent: "blue",
  },
  {
    label: "Revenue",
    value: "$84,320",
    trend: "↑ 8% from last month",
    accent: "green",
  },
  {
    label: "Active Projects",
    value: "23",
    trend: "↓ 2 from last month",
    accent: "purple",
  },
  {
    label: "Tasks Completed",
    value: "1,342",
    trend: "↑ 18% from last month",
    accent: "orange",
  },
] as const

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
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="stats-heading"
          className="mb-6 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
        >
          Dashboard Overview
        </h2>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((item) => (
            <li
              key={item.label}
              className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft transition-[border-color,box-shadow] duration-200 hover:border-primary/20 hover:shadow-[0_12px_28px_-8px_color-mix(in_oklab,var(--foreground)_12%,transparent)] sm:p-6"
            >
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                {item.label}
              </h3>
              <p
                className="text-3xl font-semibold tabular-nums"
                style={{ color: accentColors[item.accent] }}
                dir="ltr"
              >
                {item.value}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{item.trend}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

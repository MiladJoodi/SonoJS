"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

type Accent = "blue" | "purple" | "green" | "pink"

const accentStroke: Record<Accent, string> = {
  blue: "#2563eb",
  purple: "#7c3aed",
  green: "#16a34a",
  pink: "#db2777",
}

const metrics: {
  value: string
  suffix: string
  title: string
  description: string
  percent: number
  accent: Accent
}[] = [
  {
    value: "8",
    suffix: "%",
    title: "New tools",
    description:
      "The brown me quam, sagittis porttitor lorem vel, commodo fringilla nisl.",
    percent: 8,
    accent: "blue",
  },
  {
    value: "45",
    suffix: "%",
    title: "Workshops",
    description:
      "It’s over, maecenas tincidunt malesuada dolor sit amet malesuada.",
    percent: 45,
    accent: "purple",
  },
  {
    value: "5",
    suffix: "/6",
    title: "Meetings",
    description: "The time, this accumsan augue, posuere posuere elit lorem.",
    percent: Math.round((5 / 6) * 100),
    accent: "green",
  },
  {
    value: "79",
    suffix: "%",
    title: "Webinars",
    description:
      "Again and again vehicula libero at nibh volutpat lacinia non sed you see.",
    percent: 79,
    accent: "pink",
  },
]

function ProgressRing({
  percent,
  accent,
  value,
  suffix,
}: {
  percent: number
  accent: Accent
  value: string
  suffix: string
}) {
  const size = 80
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset =
    circumference - (Math.min(100, Math.max(0, percent)) / 100) * circumference

  return (
    <div className="relative mx-auto size-20">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden
      >
        <circle
          className="stats-05-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={accentStroke[accent]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <p className="absolute inset-0 flex items-center justify-center text-foreground tabular-nums">
        <span className="text-xl font-semibold leading-none">{value}</span>
        <span className="text-sm font-medium leading-none">{suffix}</span>
      </p>
    </div>
  )
}

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-label="Progress metrics"
      {...props}
    >
      <style>{`
        .stats-05-track {
          stroke: color-mix(in oklab, var(--foreground) 12%, transparent);
        }
        .dark .stats-05-track {
          stroke: color-mix(in oklab, var(--foreground) 18%, transparent);
        }
      `}</style>

      <div className="w-full rounded-[24px] border border-border/70 bg-card px-4 py-16 shadow-soft sm:px-6 md:px-8 md:py-20 lg:px-10 2xl:py-24">
        <ul className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">
          {metrics.map((item) => (
            <li key={item.title} className="mx-auto min-w-0 max-w-xs text-center">
              <div className="mb-8">
                <ProgressRing
                  percent={item.percent}
                  accent={item.accent}
                  value={item.value}
                  suffix={item.suffix}
                />
              </div>
              <div className="mb-6 h-px w-full bg-border" />
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

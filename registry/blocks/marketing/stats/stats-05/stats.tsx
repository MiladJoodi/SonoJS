"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

type Metric = {
  value: string
  suffix: string
  title: string
  description: string
  percent: number
}

const metrics: Metric[] = [
  {
    value: "8",
    suffix: "%",
    title: "New tools",
    description:
      "Share of the product roadmap shipped this quarter across core surfaces.",
    percent: 8,
  },
  {
    value: "45",
    suffix: "%",
    title: "Workshops",
    description:
      "Seats filled versus capacity across all live sessions and regions.",
    percent: 45,
  },
  {
    value: "5",
    suffix: "/6",
    title: "Meetings",
    description: "Scheduled customer reviews completed on time this cycle.",
    percent: Math.round((5 / 6) * 100),
  },
  {
    value: "79",
    suffix: "%",
    title: "Webinars",
    description:
      "Invited guests who joined live, above the 70% attendance target.",
    percent: 79,
  },
]

const RING_SIZE = 96
const RING_STROKE = 8

function ProgressRing({
  percent,
  value,
  suffix,
}: {
  percent: number
  value: string
  suffix: string
}) {
  const radius = (RING_SIZE - RING_STROKE) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, percent))
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className="relative mx-auto"
      style={{ width: RING_SIZE, height: RING_SIZE }}
      dir="ltr"
    >
      <svg
        width={RING_SIZE}
        height={RING_SIZE}
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={radius}
          fill="none"
          strokeWidth={RING_STROKE}
          style={{
            stroke: "color-mix(in oklab, var(--foreground) 12%, transparent)",
          }}
        />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={radius}
          fill="none"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ stroke: "var(--primary)" }}
        />
      </svg>
      <p className="absolute inset-0 flex items-center justify-center text-foreground tabular-nums">
        <span className="text-2xl leading-none font-semibold">{value}</span>
        <span className="text-sm leading-none font-medium text-muted-foreground">
          {suffix}
        </span>
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
      className={cn(
        "w-full bg-canvas px-4 py-12 text-foreground sm:px-6 md:px-8 md:py-16",
        className
      )}
      aria-label="Progress metrics"
      {...props}
    >
      <ul className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((item) => (
          <li
            key={item.title}
            className="flex min-w-0 flex-col rounded-[12px] border border-border/70 bg-card p-6 text-center shadow-soft"
          >
            <ProgressRing
              percent={item.percent}
              value={item.value}
              suffix={item.suffix}
            />
            <h3 className="mt-6 text-base font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

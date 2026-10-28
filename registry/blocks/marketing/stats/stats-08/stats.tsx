"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

const metrics = [
  {
    value: "4.7",
    label: "Stars on App Store",
  },
  {
    value: "2M+",
    label: "Happy global users",
  },
  {
    value: "150+",
    label: "File types supported",
  },
  {
    value: "80%",
    label: "Productivity lift",
  },
] as const

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full bg-canvas px-4 py-10 md:px-8 md:py-14", className)}
      aria-labelledby="stats-08-heading"
      {...props}
    >
      <div
        className="mx-auto grid w-full max-w-6xl gap-10 overflow-hidden rounded-[16px] px-6 py-12 shadow-soft sm:px-8 sm:py-14 md:grid-cols-12 md:items-center md:gap-12 md:px-12 md:py-16"
        style={{ backgroundColor: "#0c0f14", color: "#ffffff" }}
      >
        <div className="text-start md:col-span-5">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
            Social proof
          </p>
          <h2
            id="stats-08-heading"
            className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
            style={{ color: "#ffffff" }}
          >
            Numbers that earn trust.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
            Ratings, reach, and outcomes — the scoreboard teams check before
            they ship with us.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-7">
          {metrics.map((item) => (
            <li
              key={item.label}
              className="overflow-hidden rounded-[12px] p-5 text-start sm:p-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span
                className="mb-5 block h-1 w-10 rounded-full"
                style={{ backgroundColor: "var(--primary)" }}
                aria-hidden
              />
              <p
                className="font-mono text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl"
                style={{ color: "#ffffff" }}
                dir="ltr"
              >
                {item.value}
              </p>
              <p className="mt-2 text-sm text-white/55">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

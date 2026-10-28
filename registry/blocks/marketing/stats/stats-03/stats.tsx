"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

const satellites = [
  {
    value: "100+",
    label: "Cities with active coverage",
  },
  {
    value: "75%",
    label: "Assets under management",
  },
] as const

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full bg-canvas px-4 py-10 md:px-8 md:py-14", className)}
      aria-label="Key metrics"
      {...props}
    >
      <div
        className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[16px] px-6 py-12 shadow-soft sm:px-8 sm:py-14 md:px-12 md:py-16"
        style={{ backgroundColor: "#0a0a0b", color: "#ffffff" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -start-16 -top-20 size-72 rounded-full opacity-45 blur-3xl"
          style={{ backgroundColor: "var(--primary)" }}
        />

        <div className="relative flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="min-w-0 max-w-xl text-start">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: "var(--primary)" }}
              />
              Trusted worldwide
            </p>
            <p
              className="mt-5 font-semibold tracking-tight tabular-nums text-[clamp(3rem,8vw,5.25rem)] leading-none"
              style={{ color: "#ffffff" }}
              dir="ltr"
            >
              $1.5B+
            </p>
            <span
              aria-hidden
              className="mt-5 block h-1.5 w-20 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
            />
            <p className="mt-4 max-w-sm text-base leading-relaxed text-white/65">
              Active listings across markets — capital that teams actually put
              to work.
            </p>
          </div>

          <ul className="relative flex min-w-0 flex-col gap-3 sm:flex-row sm:gap-3 lg:shrink-0">
            {satellites.map((item) => (
              <li
                key={item.value}
                className="min-w-0 rounded-[12px] px-5 py-4 text-start sm:w-44"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <p
                  className="text-3xl font-semibold tracking-tight tabular-nums"
                  style={{ color: "#ffffff" }}
                  dir="ltr"
                >
                  {item.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-white/55">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

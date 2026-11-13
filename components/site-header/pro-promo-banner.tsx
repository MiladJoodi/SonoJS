"use client"

import Link from "next/link"
import * as React from "react"

import { cn } from "@/lib/utils"

const CYCLE_MS = 48 * 60 * 60 * 1000
const STORAGE_KEY = "sonojs-pro-promo-cycle-start"

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

function formatRemaining(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}`
}

function readRemainingMs(now = Date.now()) {
  if (typeof window === "undefined") return CYCLE_MS
  let start = Number(window.localStorage.getItem(STORAGE_KEY))
  if (!Number.isFinite(start) || start <= 0 || now - start >= CYCLE_MS) {
    start = now
    window.localStorage.setItem(STORAGE_KEY, String(start))
  }
  return Math.max(0, CYCLE_MS - (now - start))
}

/** Thin site-wide Pro promo strip with a rolling 48h countdown. */
export function ProPromoBanner({ className }: { className?: string }) {
  const [label, setLabel] = React.useState("48:00:00")

  React.useEffect(() => {
    const tick = () => setLabel(formatRemaining(readRemainingMs()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      data-pro-promo-banner=""
      className={cn(
        "flex h-(--promo-banner-height) items-center justify-center gap-1.5 px-3",
        "bg-[#16a34a] text-white",
        "dark:bg-[#052e16] dark:text-emerald-100",
        "border-b border-[#15803d]/50 dark:border-emerald-800/80",
        className
      )}
    >
      <p className="flex min-w-0 items-center justify-center gap-x-2 text-center text-[13px] leading-none tracking-tight sm:gap-x-2.5 sm:text-sm">
        <span aria-hidden className="shrink-0 text-[13px] sm:text-sm">
          ✨
        </span>
        <span className="min-w-0 truncate font-medium">
          <span className="font-semibold">Pro</span>
          {" unlocks "}
          <span className="font-semibold">unlimited templates</span>
        </span>
        <span
          className="hidden h-3 w-px shrink-0 bg-white/35 sm:block dark:bg-emerald-400/25"
          aria-hidden
        />
        <span
          className="shrink-0 font-mono text-[13px] font-semibold tabular-nums tracking-tight sm:text-sm"
          aria-live="polite"
          aria-atomic="true"
        >
          {label}
        </span>
        <Link
          href="/pricing"
          prefetch={false}
          className="shrink-0 cursor-pointer font-semibold underline decoration-white/45 underline-offset-2 transition-colors hover:decoration-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 dark:decoration-emerald-300/45 dark:hover:decoration-emerald-200 dark:focus-visible:ring-emerald-300/50"
        >
          Get Pro →
        </Link>
      </p>
    </div>
  )
}

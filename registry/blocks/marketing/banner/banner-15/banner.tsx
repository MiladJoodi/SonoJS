"use client"

import type * as React from "react"
import { SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 border-b border-white/10 bg-zinc-950 px-4 py-2 text-center text-xs font-medium text-zinc-100",
        className
      )}
      role="region"
      aria-label="Free shipping"
      {...props}
    >
      <SparklesIcon
        className="size-3.5 shrink-0 text-amber-400"
        aria-hidden
      />
      <span>
        Free express shipping over $99 — code{" "}
        <span
          dir="ltr"
          className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold tracking-wide text-amber-300"
        >
          LUXESHIP
        </span>
      </span>
    </div>
  )
}

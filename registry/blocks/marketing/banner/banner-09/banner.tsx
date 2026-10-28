"use client"

import type * as React from "react"
import { WandSparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full bg-emerald-600 py-2.5 text-center text-sm font-medium text-white dark:bg-emerald-500",
        className
      )}
      role="region"
      aria-label="New feature"
      {...props}
    >
      <p className="inline-flex flex-wrap items-center justify-center gap-2 px-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase">
          <WandSparklesIcon className="size-3" aria-hidden />
          New
        </span>
        <span>
          AI layout assistant — describe a page, get a block stack
        </span>
        <a
          href="#"
          className="cursor-pointer font-semibold underline underline-offset-2"
        >
          See demo
        </a>
      </p>
    </div>
  )
}

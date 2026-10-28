"use client"

import type * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center justify-between gap-3 bg-zinc-950 px-4 py-2.5 text-sm font-medium text-zinc-50 md:px-8",
        className
      )}
      role="region"
      aria-label="Promotion"
      {...props}
    >
      <p className="min-w-0 text-start">
        Ship responsive Tailwind UI faster — blocks that already look finished
      </p>
      <a
        href="#"
        className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
      >
        Explore now
        <ArrowRightIcon className="size-3.5 icon-dir" aria-hidden />
      </a>
    </div>
  )
}

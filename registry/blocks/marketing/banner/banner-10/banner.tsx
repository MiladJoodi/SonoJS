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
        "flex w-full flex-wrap items-center justify-center gap-3 bg-orange-600 px-4 py-2 text-center text-sm font-medium text-white dark:bg-orange-500",
        className
      )}
      role="region"
      aria-label="Templates"
      {...props}
    >
      <p>Marketing templates just dropped — hero, pricing, and CTA packs</p>
      <a
        href="#"
        className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-700 transition hover:bg-orange-50 active:scale-[0.98]"
      >
        Browse pack
        <ArrowRightIcon className="size-3.5 icon-dir" aria-hidden />
      </a>
    </div>
  )
}

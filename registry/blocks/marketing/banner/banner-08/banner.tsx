"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full bg-indigo-600 py-2.5 text-center text-sm font-medium text-white dark:bg-indigo-500",
        className
      )}
      role="region"
      aria-label="Launch offer"
      {...props}
    >
      <p className="inline-flex flex-wrap items-center justify-center gap-2 px-4">
        <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase">
          Launch
        </span>
        <span>
          Try SonoJS today —{" "}
          <span className="font-semibold">$50 free credits</span> on your first
          workspace
        </span>
      </p>
    </div>
  )
}

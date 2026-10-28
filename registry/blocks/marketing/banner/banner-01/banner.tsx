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
        "w-full border-b border-primary/20 bg-primary/10 py-2.5 text-center text-sm font-medium text-foreground",
        className
      )}
      role="region"
      aria-label="Promotion"
      {...props}
    >
      <p className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4">
        <span
          className="inline-flex size-1.5 shrink-0 rounded-full bg-primary"
          aria-hidden
        />
        <span>
          Free express shipping on orders $50+ ·{" "}
          <span className="font-semibold text-primary">20% off</span> first
          purchase
        </span>
      </p>
    </div>
  )
}

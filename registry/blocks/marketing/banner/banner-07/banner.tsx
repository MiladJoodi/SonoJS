"use client"

import type * as React from "react"
import { CopyIcon, TruckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full border-b border-border/70 bg-card py-2.5 text-sm font-medium text-foreground",
        className
      )}
      role="region"
      aria-label="Promotion"
      {...props}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 text-center sm:justify-between sm:text-start">
        <p className="inline-flex items-center gap-2">
          <TruckIcon className="size-3.5 text-primary" aria-hidden />
          Free shipping $50+ · 20% off first order
        </p>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border/70 bg-background px-2.5 py-1 font-mono text-xs tabular-nums transition hover:bg-muted/60"
          aria-label="Copy promo code WELCOME20"
        >
          WELCOME20
          <CopyIcon className="size-3 text-muted-foreground" aria-hidden />
        </button>
      </div>
    </div>
  )
}

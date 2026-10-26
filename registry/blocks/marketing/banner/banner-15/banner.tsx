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
        "flex items-center justify-center gap-2 bg-zinc-900 px-4 py-2 text-center text-xs font-medium text-zinc-100",
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
        Free express shipping on all orders over $99 - Use code{" "}
        <strong className="font-semibold text-amber-400">LUXESHIP</strong>
      </span>
    </div>
  )
}

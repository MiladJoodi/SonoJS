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
        "w-full bg-gradient-to-r from-[#ABFF7E] to-[#FDFEFF] py-2.5 text-center text-sm font-medium text-green-800",
        className
      )}
      role="region"
      aria-label="Promotion"
      {...props}
    >
      <p>
        <span className="me-2 rounded-lg bg-green-600 px-3 py-1 text-white">
          New
        </span>
        AI Website Builder
      </p>
    </div>
  )
}

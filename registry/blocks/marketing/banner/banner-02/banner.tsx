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
        "w-full bg-zinc-800 py-2.5 text-center text-sm font-medium text-white",
        className
      )}
      role="region"
      aria-label="Promotion"
      {...props}
    >
      <p>
        Special Deal: Free Shipping on Orders Above $50! | 20% OFF on First
        Purchase
      </p>
    </div>
  )
}

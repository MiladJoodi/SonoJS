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
        "w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 py-2.5 text-sm font-medium text-white",
        className
      )}
      role="region"
      aria-label="Promotion"
      {...props}
    >
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-4 text-center sm:flex-row">
        <p>🚚 Free Shipping on Orders Above $50</p>
        <span className="hidden sm:inline" aria-hidden>
          |
        </span>
        <p>🎁 20% OFF on First Purchase</p>
        <span className="hidden sm:inline" aria-hidden>
          |
        </span>
        <p>
          🔐 Use Code: <strong>WELCOME10</strong>
        </p>
      </div>
    </div>
  )
}

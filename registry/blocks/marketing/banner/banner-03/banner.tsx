"use client"

import type * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A] px-4 py-1 text-center text-sm font-medium text-white md:px-14",
        className
      )}
      role="region"
      aria-label="Promotion"
      {...props}
    >
      <p className="min-w-0 text-start">Get 20% OFF on Your First Order!</p>
      <div className="flex shrink-0 items-center gap-6">
        <button
          type="button"
          className="cursor-pointer rounded-full bg-white px-7 py-2 font-normal text-zinc-800"
        >
          Claim Offer
        </button>
        <button
          type="button"
          className="cursor-pointer text-white"
          aria-label="Dismiss"
        >
          <XIcon className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

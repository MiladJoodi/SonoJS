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
        "flex items-center justify-center gap-2 bg-zinc-900 px-4 py-2 text-center text-xs font-medium tracking-tight text-white",
        className
      )}
      role="region"
      aria-label="Financing offer"
      {...props}
    >
      <span>Get up to 12 months 0% APR financing on qualifying products.</span>
      <button
        type="button"
        className="hidden cursor-pointer items-center gap-0.5 font-normal text-blue-400 hover:underline sm:inline-flex"
      >
        Shop now
        <ArrowRightIcon className="size-3 icon-dir" aria-hidden />
      </button>
    </div>
  )
}

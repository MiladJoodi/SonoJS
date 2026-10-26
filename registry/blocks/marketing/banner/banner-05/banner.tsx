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
        "mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A] py-2.5 text-center text-sm font-medium text-white",
        className
      )}
      role="region"
      aria-label="Promotion"
      {...props}
    >
      <p className="min-w-0 text-balance">
        Get 20% OFF on Your First Ticket!{" "}
        <span className="underline">Get your ticket</span>
      </p>
      <ArrowRightIcon className="size-3.5 shrink-0 icon-dir" aria-hidden />
    </div>
  )
}

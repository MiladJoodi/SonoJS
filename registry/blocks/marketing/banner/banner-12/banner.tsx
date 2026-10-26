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
        "flex w-full flex-wrap items-center justify-between bg-gradient-to-r from-violet-500 to-purple-100 px-4 py-2 text-center text-sm font-medium text-white md:px-14",
        className
      )}
      role="region"
      aria-label="Promotion"
      {...props}
    >
      <p className="min-w-0 text-start">
        Build Faster with Responsive Tailwind CSS Templates
      </p>
      <a
        href="#"
        className="ms-3 inline-flex cursor-pointer items-center gap-1 rounded-lg bg-violet-50 px-3 py-1 text-violet-600 transition hover:bg-slate-100 active:scale-95"
      >
        Explore now
        <ArrowRightIcon className="size-3.5 icon-dir" aria-hidden />
      </a>
    </div>
  )
}

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
        "flex w-full flex-wrap items-center justify-center bg-gradient-to-b from-orange-500 to-orange-600 py-2 text-center text-sm font-medium text-white",
        className
      )}
      role="region"
      aria-label="Promotion"
      {...props}
    >
      <p>Templates are live on SonoJS!</p>
      <a
        href="#"
        className="ms-3 inline-flex cursor-pointer items-center gap-1 rounded-md bg-white px-3 py-1 text-xs text-orange-600 transition hover:bg-slate-200 active:scale-95"
      >
        Check it out
        <ArrowRightIcon className="size-3.5 icon-dir" aria-hidden />
      </a>
    </div>
  )
}

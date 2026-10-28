"use client"

import type * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      href="#"
      className={cn(
        "group flex w-full cursor-pointer items-center justify-center bg-violet-600 py-2 text-center text-sm font-medium text-white dark:bg-violet-500",
        className
      )}
      {...props}
    >
      <span className="inline-flex max-w-4xl flex-wrap items-center justify-center gap-1.5 rounded-full px-4 py-0.5 transition group-hover:bg-white/10">
        <span>
          Changelog: 40+ blocks, passkey auth, and agent workspace patterns
        </span>
        <ArrowRightIcon className="size-4 shrink-0 icon-dir" aria-hidden />
      </span>
    </a>
  )
}

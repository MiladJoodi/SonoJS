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
        "group flex w-full cursor-pointer items-center justify-center bg-[#7668ff] py-1.5 text-center text-sm font-medium text-white",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-center gap-1 rounded-full px-4 py-1 transition duration-300 group-hover:bg-white/15">
        <p>
          Explore a growing library of over 300+ beautifully crafted,
          customizable components.
        </p>
        <ArrowRightIcon className="mt-px size-4 shrink-0 icon-dir" aria-hidden />
      </div>
    </a>
  )
}

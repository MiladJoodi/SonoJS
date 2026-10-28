"use client"

import type * as React from "react"
import { SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full bg-zinc-950 py-2.5 text-center text-sm font-medium text-zinc-50",
        className
      )}
      role="region"
      aria-label="Product update"
      {...props}
    >
      <p className="inline-flex flex-wrap items-center justify-center gap-2 px-4">
        <SparklesIcon className="size-3.5 text-primary" aria-hidden />
        <span>
          Agent mode is live — attach context, review the diff, ship the PR
        </span>
        <a
          href="#"
          className="cursor-pointer font-semibold text-primary underline-offset-2 hover:underline"
        >
          Try it
        </a>
      </p>
    </div>
  )
}

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
        "flex w-full items-center justify-between gap-3 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground md:px-8",
        className
      )}
      role="region"
      aria-label="Promotion"
      {...props}
    >
      <p className="min-w-0 text-start">
        Passkeys are on — skip passwords on your next sign-in
      </p>
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          className="cursor-pointer rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-zinc-900 transition hover:bg-white/90"
        >
          Enable
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-md p-1 text-primary-foreground/80 transition hover:bg-white/10 hover:text-primary-foreground"
          aria-label="Dismiss"
        >
          <XIcon className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

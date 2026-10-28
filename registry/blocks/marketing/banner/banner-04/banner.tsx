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
        "flex w-full items-center justify-between gap-3 border-b border-white/10 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-50 md:px-8",
        className
      )}
      role="region"
      aria-label="Invite offer"
      {...props}
    >
      <p className="min-w-0 text-start">
        Invite-only seats open this week —{" "}
        <span className="text-zinc-400">claim before Friday</span>
      </p>
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          className="cursor-pointer rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Claim seat
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-md p-1 text-zinc-400 transition hover:bg-white/10 hover:text-zinc-50"
          aria-label="Dismiss"
        >
          <XIcon className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

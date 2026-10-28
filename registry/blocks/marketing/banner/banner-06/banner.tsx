"use client"

import type * as React from "react"
import { ArrowRightIcon, TicketIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-lg items-center justify-center gap-2 rounded-full border border-white/10 bg-zinc-950 px-4 py-2.5 text-center text-sm font-medium text-zinc-50 shadow-soft",
        className
      )}
      role="region"
      aria-label="Ticket offer"
      {...props}
    >
      <TicketIcon className="size-3.5 shrink-0 text-primary" aria-hidden />
      <p className="min-w-0 text-balance">
        Workshop pass —{" "}
        <a
          href="#"
          className="cursor-pointer font-semibold text-primary underline underline-offset-2"
        >
          reserve a seat
        </a>
      </p>
      <ArrowRightIcon
        className="size-3.5 shrink-0 text-primary icon-dir"
        aria-hidden
      />
    </div>
  )
}

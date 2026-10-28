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
        "mx-auto flex w-full max-w-lg items-center justify-center gap-2 rounded-full border border-primary/25 bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground shadow-soft",
        className
      )}
      role="region"
      aria-label="Ticket offer"
      {...props}
    >
      <TicketIcon className="size-3.5 shrink-0 opacity-90" aria-hidden />
      <p className="min-w-0 text-balance">
        Conf 2026 early bird —{" "}
        <a
          href="#"
          className="cursor-pointer font-semibold underline underline-offset-2"
        >
          get your ticket
        </a>
      </p>
      <ArrowRightIcon className="size-3.5 shrink-0 icon-dir" aria-hidden />
    </div>
  )
}

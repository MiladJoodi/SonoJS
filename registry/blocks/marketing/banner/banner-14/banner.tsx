"use client"

import type * as React from "react"
import { ArrowRightIcon, CreditCardIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 bg-zinc-900 px-4 py-2 text-center text-xs font-medium tracking-tight text-zinc-100",
        className
      )}
      role="region"
      aria-label="Financing offer"
      {...props}
    >
      <CreditCardIcon className="size-3.5 shrink-0 text-sky-400" aria-hidden />
      <span>
        0% APR for 12 months on qualifying plans — pay monthly, keep cashflow
      </span>
      <a
        href="#"
        className="inline-flex cursor-pointer items-center gap-0.5 font-semibold text-sky-400 hover:underline"
      >
        See terms
        <ArrowRightIcon className="size-3 icon-dir" aria-hidden />
      </a>
    </div>
  )
}

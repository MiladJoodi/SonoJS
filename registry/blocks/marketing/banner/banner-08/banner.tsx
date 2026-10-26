"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

export default function Banner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full bg-gradient-to-r from-[#4F39F6] to-[#FDFEFF] py-2.5 text-center text-sm font-medium text-white",
        className
      )}
      role="region"
      aria-label="Promotion"
      {...props}
    >
      <p>
        <span className="me-2 rounded-md bg-white px-3 py-1 text-indigo-600">
          Launch offer
        </span>
        Try SonoJS today and get $50 free credits
      </p>
    </div>
  )
}

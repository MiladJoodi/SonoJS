"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** Segmented chrome shared by docs VariantPreview and blocks BlockExample. */
export function SoftGroup({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex h-8 items-stretch overflow-hidden rounded-md border border-border/70 bg-muted divide-x divide-border/70",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SoftButton({
  pressed,
  label,
  onClick,
  children,
  className,
}: {
  pressed?: boolean
  label: string
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-none px-2.5 text-[12.5px] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset",
        pressed
          ? "bg-card text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  )
}

"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface ProButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
}

export function ProButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: ProButtonProps) {
  const variants = {
    primary: "bg-violet-600 text-white hover:bg-violet-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-muted dark:text-foreground dark:hover:bg-muted/80",
    outline:
      "border border-border/70 bg-card text-foreground hover:bg-muted",
  }

  return (
    <button
      type="button"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

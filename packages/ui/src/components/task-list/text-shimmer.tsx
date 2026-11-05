"use client"

import { createElement, type ElementType, type ReactNode } from "react"

import { cn } from "@sonojs/ui/lib/utils"

const KEYFRAMES = `
@property --sono-task-mask-x {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@keyframes sono-task-text-shimmer {
  0% { --sono-task-mask-x: 110%; }
  45%, 100% { --sono-task-mask-x: -110%; }
}
@media (prefers-reduced-motion: reduce) {
  .sono-task-text-shimmer {
    animation: none !important;
    -webkit-mask-image: none !important;
    mask-image: none !important;
  }
}`

const MASK =
  "linear-gradient(100deg, #000 35%, transparent 48%, #000 62%)"

export function TaskTextShimmer({
  children,
  as: Comp = "span",
  duration = 1.7,
  className,
}: {
  children: ReactNode
  as?: ElementType
  duration?: number
  className?: string
}) {
  return (
    <>
      <style>{KEYFRAMES}</style>
      {createElement(
        Comp,
        {
          style: {
            WebkitMaskImage: MASK,
            maskImage: MASK,
            WebkitMaskSize: "200% 100%",
            maskSize: "200% 100%",
            WebkitMaskPosition: "var(--sono-task-mask-x) 0",
            maskPosition: "var(--sono-task-mask-x) 0",
            animation: `sono-task-text-shimmer ${duration}s ease-in-out infinite`,
          },
          className: cn(
            "sono-task-text-shimmer inline-block text-foreground",
            className
          ),
        },
        children
      )}
    </>
  )
}

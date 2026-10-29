import { createElement, type ElementType, type ReactNode } from "react"

import { cn } from "@sonojs/ui/lib/utils"

import {
  TEXT_SHIMMER_CLASS_NAME,
  TEXT_SHIMMER_KEYFRAMES,
  textShimmerStyle,
} from "./text-shimmer-styles"

export interface TextShimmerProps {
  children: ReactNode
  as?: ElementType
  duration?: number
  className?: string
}

export function TextShimmer({
  children,
  as: Comp = "span",
  duration = 2,
  className,
}: TextShimmerProps) {
  return (
    <>
      <style>{TEXT_SHIMMER_KEYFRAMES}</style>
      {createElement(
        Comp,
        {
          style: textShimmerStyle(duration),
          className: cn("inline-block", TEXT_SHIMMER_CLASS_NAME, className),
        },
        children
      )}
    </>
  )
}

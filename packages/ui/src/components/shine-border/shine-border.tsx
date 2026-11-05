"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

import "./shine-border.css"

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  borderWidth?: number
  duration?: number
  shineColor?: string | string[]
}

/**
 * Animated shine that runs along a relative, overflow-hidden parent's border.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          backgroundImage: `radial-gradient(transparent,transparent, ${
            Array.isArray(shineColor) ? shineColor.join(",") : shineColor
          },transparent,transparent)`,
          backgroundSize: "300% 300%",
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "var(--border-width)",
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "animate-shine pointer-events-none absolute inset-0 z-10 size-full rounded-[inherit] will-change-[background-position]",
        className
      )}
      {...props}
    />
  )
}

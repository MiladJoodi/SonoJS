"use client"

import * as React from "react"
import { useId } from "react"

import { cn } from "@sonojs/ui/lib/utils"

import type { TechIconProps } from "./react"

/** Uses `currentColor` for the disc so it stays readable on light and dark cards. */
export function NextjsIcon({
  className,
  size = 16,
  ...props
}: TechIconProps) {
  const uid = useId().replace(/:/g, "")
  const mask = `${uid}-mask`
  const gradA = `${uid}-a`
  const gradB = `${uid}-b`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 180"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0 text-foreground", className)}
      {...props}
    >
      <mask
        id={mask}
        width="180"
        height="180"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
      >
        <circle cx="90" cy="90" r="90" fill="#000" />
      </mask>
      <g mask={`url(#${mask})`}>
        <circle cx="90" cy="90" r="90" fill="currentColor" />
        <path
          fill={`url(#${gradA})`}
          d="M149.508 157.52 69.142 54H54v71.97h12.114V69.384l73.795 95.461a90.3 90.3 0 0 0 9.6-7.325"
        />
        <path fill={`url(#${gradB})`} d="M115 54h12v72h-12z" />
      </g>
      <defs>
        <linearGradient
          id={gradA}
          x1="109"
          x2="144.5"
          y1="116.5"
          y2="160.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--card)" />
          <stop offset="1" stopColor="var(--card)" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={gradB}
          x1="121"
          x2="120.799"
          y1="54"
          y2="106.875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--card)" />
          <stop offset="1" stopColor="var(--card)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

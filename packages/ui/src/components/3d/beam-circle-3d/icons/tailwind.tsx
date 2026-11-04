"use client"

import * as React from "react"
import { useId } from "react"

import { cn } from "@sonojs/ui/lib/utils"

import type { TechIconProps } from "./react"

export function TailwindIcon({
  className,
  size = 16,
  ...props
}: TechIconProps) {
  const uid = useId().replace(/:/g, "")
  const grad = `${uid}-grad`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600"
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <defs>
        <linearGradient
          id={grad}
          x1="0"
          y1="120"
          x2="600"
          y2="480"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2298BD" />
          <stop offset="1" stopColor="#0ED7B5" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${grad})`}
        d="M300 120q-120 0-150 120 45-60 105-45c22.8 5.7 39.1 22.3 57.2 40.6C341.6 265.4 375.6 300 450 300q120 0 150-120-45 60-105 45c-22.8-5.7-39.1-22.3-57.2-40.6C408.4 154.6 374.4 120 300 120M150 300Q30 300 0 420q45-60 105-45c22.8 5.7 39.1 22.3 57.2 40.6C191.6 445.4 225.6 480 300 480q120 0 150-120-45 60-105 45c-22.8-5.7-39.1-22.3-57.2-40.6C258.4 334.6 224.4 300 150 300"
      />
    </svg>
  )
}

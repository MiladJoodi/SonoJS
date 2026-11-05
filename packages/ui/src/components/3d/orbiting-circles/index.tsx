"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

import "./orbiting-circles.css"

export {
  GitHubIcon,
  GoogleIcon,
  NextjsIcon,
  NotionIcon,
  OpenAIIcon,
  ReactIcon,
  TypescriptIcon,
  VercelIcon,
  type OrbitIconProps,
} from "./icons"

export type OrbitingCirclesProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  const childCount = React.Children.count(children)

  return (
    <>
      {path ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      ) : null}
      {React.Children.map(children, (child, index) => {
        const angle = childCount > 0 ? (360 / childCount) * index : 0
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
                width: iconSize,
                height: iconSize,
              } as React.CSSProperties
            }
            className={cn(
              "sono-animate-orbit absolute flex transform-gpu items-center justify-center rounded-full",
              reverse && "[animation-direction:reverse]",
              className
            )}
            {...props}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}

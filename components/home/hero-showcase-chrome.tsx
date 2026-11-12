"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** When false, skip entrance / stagger (chip switches after first load). */
export const ShowcaseMotionContext = React.createContext(true)

export function DemoCard({
  className,
  children,
  show,
}: {
  className?: string
  children: React.ReactNode
  show: boolean
}) {
  const animate = React.useContext(ShowcaseMotionContext)
  const visible = show || !animate
  return (
    <div
      className={cn(
        "w-full max-w-[350px] rounded-[14px] border border-border/70 bg-card p-4 text-foreground shadow-soft sm:rounded-[18px] sm:p-[22px]",
        animate &&
          "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-3.5 scale-[0.985] opacity-0",
        className
      )}
    >
      {children}
    </div>
  )
}

export function Stagger({
  i,
  show,
  className,
  children,
}: {
  i: number
  show: boolean
  className?: string
  children: React.ReactNode
}) {
  const animate = React.useContext(ShowcaseMotionContext)
  const visible = show || !animate
  return (
    <div
      className={cn(
        animate &&
          "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        className
      )}
      style={{
        transitionDelay: animate && show ? `${i * 70 + 120}ms` : "0ms",
      }}
    >
      {children}
    </div>
  )
}

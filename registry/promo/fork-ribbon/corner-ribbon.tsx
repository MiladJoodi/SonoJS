"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type CornerRibbonTone =
  | "red"
  | "orange"
  | "green"
  | "black"
  | "navy"
  | "rose"

export type CornerRibbonCorner =
  | "top-end"
  | "top-start"
  | "bottom-end"
  | "bottom-start"

export type CornerRibbonProps = {
  className?: string
  /** Visible ribbon copy. Default keeps the classic fork line. */
  label?: string
  href?: string
  tone?: CornerRibbonTone
  corner?: CornerRibbonCorner
  /** `absolute` for framed demos; `fixed` for live sites. */
  position?: "fixed" | "absolute"
  title?: string
}

const TONE: Record<CornerRibbonTone, string> = {
  red: "bg-[#a00]",
  orange: "bg-[#f80]",
  green: "bg-[#090]",
  black: "bg-[#333]",
  navy: "bg-[#0b1b33]",
  rose: "bg-[#be123c]",
}

/**
 * Classic corner ribbon (fork-ribbon geometry), rebuilt for React + logical corners.
 * Default label stays “Fork me on GitHub”.
 *
 * Stitch lines are absolute `top`/`bottom` children at 0.22em — identical on every corner.
 */
function CornerRibbon({
  className,
  label = "Fork me on GitHub",
  href = "#",
  tone = "red",
  corner = "top-end",
  position = "absolute",
  title,
}: CornerRibbonProps) {
  const isStart = corner === "top-start" || corner === "bottom-start"
  const isBottom = corner === "bottom-start" || corner === "bottom-end"
  // Mirror the classic CSS: top-end & bottom-start → +45°; top-start & bottom-end → -45°.
  const rotate =
    corner === "top-end" || corner === "bottom-start" ? "rotate-45" : "-rotate-45"

  return (
    <a
      href={href}
      title={title ?? label}
      data-slot="corner-ribbon"
      data-tone={tone}
      data-corner={corner}
      className={cn(
        "pointer-events-none z-[90] overflow-hidden text-[13px]",
        position === "fixed" ? "fixed" : "absolute",
        "size-[12.1em]",
        isBottom ? "bottom-0 top-auto" : "top-0 bottom-auto",
        isStart ? "start-0 end-auto" : "end-0 start-auto",
        className
      )}
    >
      <span
        className={cn(
          "pointer-events-auto absolute flex h-[2.15em] w-[15.38em] cursor-pointer items-center justify-center",
          "text-center text-[1em] font-bold leading-none text-white no-underline",
          "shadow-[0_0.15em_0.23em_0_rgba(0,0,0,0.45)]",
          "[text-shadow:0_-0.08em_rgba(0,0,0,0.5)]",
          TONE[tone],
          rotate,
          isBottom ? "bottom-[3.23em] top-auto" : "top-[3.23em] bottom-auto",
          isStart ? "start-[-3.23em] end-auto" : "end-[-3.23em] start-auto"
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[0.22em] border-t-[0.08em] border-dotted border-white/75"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[0.22em] border-t-[0.08em] border-dotted border-white/75"
        />
        {label}
      </span>
    </a>
  )
}

export { CornerRibbon, TONE }

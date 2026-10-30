"use client"

import { type ReactNode, useState } from "react"
import {
  LinkIcon,
  PencilIcon,
  PlayIcon,
  SearchIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useMouse } from "@/registry/hooks/use-mouse"

const CURSOR_ICONS = {
  edit: <PencilIcon className="size-3.5" />,
  search: <SearchIcon className="size-3.5" />,
  play: <PlayIcon className="size-3.5" />,
  link: <LinkIcon className="size-3.5" />,
} as const

export type TextIconCursorContent = keyof typeof CURSOR_ICONS | string | null

export interface TextIconCursorProps {
  className?: string
  children?: ReactNode
}

/**
 * Glass chip cursor with Lucide icons over clear hotspots.
 */
export function TextIconCursor({ className, children }: TextIconCursorProps) {
  const [mouseState, ref] = useMouse()
  const [cursorContent, setCursorContent] =
    useState<TextIconCursorContent>(null)

  const defaultChildren = (
    <div className="flex h-full flex-wrap items-center justify-center gap-4 p-8">
      <button
        type="button"
        className="cursor-pointer rounded-[12px] border border-border/70 bg-card px-5 py-3 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-primary/40"
        onMouseEnter={() => setCursorContent("edit")}
        onMouseLeave={() => setCursorContent(null)}
      >
        Edit
      </button>
      <div
        className="cursor-help rounded-[12px] border border-dashed border-border/80 bg-muted/40 px-5 py-3 text-sm text-foreground"
        onMouseEnter={() => setCursorContent("Click to search")}
        onMouseLeave={() => setCursorContent(null)}
      >
        Search zone
      </div>
      <a
        href="#"
        className="cursor-pointer rounded-[12px] border border-border/70 bg-card px-5 py-3 text-sm font-medium text-primary shadow-soft"
        onMouseEnter={() => setCursorContent("link")}
        onMouseLeave={() => setCursorContent(null)}
        onClick={(e) => e.preventDefault()}
      >
        Navigate
      </a>
      <div
        className="flex size-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border border-border/70 bg-card shadow-soft"
        onMouseEnter={() => setCursorContent("play")}
        onMouseLeave={() => setCursorContent(null)}
      >
        <PlayIcon className="size-6 text-primary" />
        <span className="text-xs text-muted-foreground">Media</span>
      </div>
    </div>
  )

  const chipLabel =
    typeof cursorContent === "string" && cursorContent in CURSOR_ICONS
      ? CURSOR_ICONS[cursorContent as keyof typeof CURSOR_ICONS]
      : typeof cursorContent === "string"
        ? cursorContent
        : null

  return (
    <div
      ref={ref}
      className={cn("relative size-full cursor-none", className)}
    >
      {mouseState.elementX !== null && mouseState.elementY !== null && (
        <div
          className="pointer-events-none absolute z-50"
          style={{
            left: mouseState.elementX,
            top: mouseState.elementY,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="size-3 rounded-full bg-foreground mix-blend-difference" />
          {cursorContent != null && (
            <div className="absolute start-5 top-1/2 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-card/70 px-3 py-1.5 text-xs font-medium text-card-foreground shadow-soft backdrop-blur-md dark:border-white/15 dark:bg-zinc-900/70">
              {chipLabel}
              {typeof cursorContent === "string" &&
                cursorContent in CURSOR_ICONS && (
                  <span className="capitalize text-muted-foreground">
                    {cursorContent}
                  </span>
                )}
            </div>
          )}
        </div>
      )}
      {children ?? defaultChildren}
    </div>
  )
}

export { CURSOR_ICONS }

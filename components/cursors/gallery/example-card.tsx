"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { MousePointerClickIcon } from "lucide-react"

import { cursorViewHref } from "@/lib/cursors-catalog"
import { cn } from "@/lib/utils"

import { CardLivePreview } from "./card-live-preview"

export function CursorExampleCard({
  id,
  title,
  status,
}: {
  id: string
  title: string
  status?: "pending" | "ported"
}) {
  const router = useRouter()
  const pending = status === "pending"
  const [hovered, setHovered] = React.useState(false)
  const href = cursorViewHref(id)
  const label = pending ? `${title} (pending)` : title

  const go = React.useCallback(() => {
    router.push(href)
  }, [href, router])

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={label}
      onMouseEnter={() => {
        if (!pending) setHovered(true)
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={go}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          go()
        }
      }}
      className={cn(
        "group flex w-full cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card text-start outline-none",
        "transition-[border-color,background-color] hover:border-border",
        "focus-visible:ring-2 focus-visible:ring-ring",
        pending && "opacity-80"
      )}
    >
      <div
        aria-hidden
        className="relative flex aspect-16/10 w-full items-center justify-center overflow-hidden bg-muted/35 dark:bg-muted/25"
      >
        <MousePointerClickIcon
          className={cn(
            "size-10 text-muted-foreground/50 transition-[transform,opacity] duration-500",
            hovered ? "scale-110 opacity-0" : "group-hover:scale-110"
          )}
        />
        {hovered && !pending ? <CardLivePreview id={id} /> : null}
      </div>
      <div className="bg-card px-2.5 py-2 md:px-3 md:py-2.5">
        <span className="block truncate text-[13px] font-medium text-foreground md:text-sm">
          {title}
          {pending ? " · pending" : ""}
        </span>
      </div>
    </div>
  )
}

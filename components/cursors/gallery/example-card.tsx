"use client"

import * as React from "react"
import Link from "next/link"
import { MousePointerClickIcon } from "lucide-react"

import { cursorViewHref } from "@/lib/cursors-catalog"
import { cn } from "@/lib/utils"
import { prefetchCursorDemo } from "@/registry/cursors/demo-loaders"

import { CardLivePreview } from "./card-live-preview"

export function CursorExampleCard({
  id,
  title,
  status,
  imageSrc,
}: {
  id: string
  title: string
  status?: "pending" | "ported"
  imageSrc?: string
}) {
  const pending = status === "pending"
  const [hovered, setHovered] = React.useState(false)
  const [previewReady, setPreviewReady] = React.useState(false)
  const href = cursorViewHref(id)
  const label = pending ? `${title} (pending)` : title

  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={label}
      onMouseEnter={() => {
        if (pending || imageSrc) return
        prefetchCursorDemo(id)
        setHovered(true)
      }}
      onMouseLeave={() => {
        setHovered(false)
        setPreviewReady(false)
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
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- static public cursor thumbnail
          <img
            src={imageSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <>
            <MousePointerClickIcon
              className={cn(
                "size-10 text-muted-foreground/50 transition-[transform,opacity] duration-500",
                previewReady ? "scale-110 opacity-0" : "group-hover:scale-110"
              )}
            />
            {hovered && !pending ? (
              <CardLivePreview
                id={id}
                onReady={() => setPreviewReady(true)}
                className={cn(
                  "transition-opacity duration-300 ease-out",
                  previewReady ? "opacity-100" : "opacity-0"
                )}
              />
            ) : null}
          </>
        )}
      </div>
      <div className="bg-card px-2.5 py-2 md:px-3 md:py-2.5">
        <span className="block truncate text-[13px] font-medium text-foreground md:text-sm">
          {title}
          {pending ? " · pending" : ""}
        </span>
      </div>
    </Link>
  )
}

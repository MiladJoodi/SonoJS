"use client"

import * as React from "react"
import type { ReactNode } from "react"
import Link from "next/link"

import { DevPreviewCaptureButton } from "@/components/docs/dev-preview-capture-button"
import { cn } from "@/lib/utils"

const imgClass =
  "size-full object-contain object-center p-2.5 md:p-3 group-hover:scale-110 transition-transform duration-500"

/** Shrink-wrap the bitmap so border-radius clips the image, not letterbox space. */
const roundedImgClass =
  "max-h-full max-w-full rounded-[8px] object-contain object-center transition-transform duration-500 group-hover:scale-110"

/**
 * Charts-like catalog card: muted thumb plane + title bar.
 * Prefer `preview` (wireframe) over WebP thumbs when provided.
 */
export function CatalogThumbCard({
  href,
  title,
  lightSrc,
  darkSrc,
  preview,
  className,
  /** Round the thumb image itself (used on `/ai`). */
  roundedThumb = false,
  /** File base for dev capture (defaults to last path segment of `href`). */
  captureName,
}: {
  href: string
  title: string
  lightSrc?: string
  darkSrc?: string
  preview?: ReactNode
  className?: string
  roundedThumb?: boolean
  captureName?: string
}) {
  const hasImages = Boolean(lightSrc && darkSrc)
  const previewRef = React.useRef<HTMLDivElement>(null)
  const showCapture =
    process.env.NODE_ENV === "development" && Boolean(preview)
  const fileBase =
    captureName ||
    href.split("/").filter(Boolean).at(-1) ||
    title

  return (
    <Link
      href={href}
      aria-label={title}
      className={cn(
        "group flex w-full cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card text-start no-underline outline-none",
        "transition-[border-color,background-color] hover:border-border",
        "focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <div
        aria-hidden
        className="relative aspect-16/10 w-full overflow-hidden bg-muted/35 dark:bg-muted/25"
      >
        {preview ? (
          <div
            ref={previewRef}
            data-sono-capture-root=""
            className="size-full p-1 transition-transform duration-500 group-hover:scale-[1.04]"
          >
            {preview}
          </div>
        ) : hasImages && roundedThumb ? (
          <div className="flex size-full items-center justify-center p-2.5 md:p-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- static public webps */}
            <img
              src={lightSrc}
              alt=""
              className={cn(roundedImgClass, "dark:hidden")}
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- static public webps */}
            <img
              src={darkSrc}
              alt=""
              className={cn(roundedImgClass, "hidden dark:block")}
            />
          </div>
        ) : hasImages ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- static public webps */}
            <img
              src={lightSrc}
              alt=""
              className={cn(imgClass, "dark:hidden")}
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- static public webps */}
            <img
              src={darkSrc}
              alt=""
              className={cn(imgClass, "hidden dark:block")}
            />
          </>
        ) : null}

        {showCapture ? (
          <div
            className="absolute end-1 top-1 z-10"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
            onKeyDown={(event) => event.stopPropagation()}
          >
            <DevPreviewCaptureButton
              targetRef={previewRef}
              fileBase={fileBase}
            />
          </div>
        ) : null}
      </div>
      <div className="bg-card px-2.5 py-2 md:px-3 md:py-2.5">
        <span className="block truncate text-[13px] font-medium text-foreground md:text-sm">
          {title}
        </span>
      </div>
    </Link>
  )
}

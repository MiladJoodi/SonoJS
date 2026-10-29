import type { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

const imgClass =
  "size-full object-contain object-center p-2.5 md:p-3 group-hover:scale-110 transition-transform duration-500"

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
}: {
  href: string
  title: string
  lightSrc?: string
  darkSrc?: string
  preview?: ReactNode
  className?: string
}) {
  const hasImages = Boolean(lightSrc && darkSrc)

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
          <div className="size-full p-1 transition-transform duration-500 group-hover:scale-[1.04]">
            {preview}
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
      </div>
      <div className="bg-card px-2.5 py-2 md:px-3 md:py-2.5">
        <span className="block truncate text-[13px] font-medium text-foreground md:text-sm">
          {title}
        </span>
      </div>
    </Link>
  )
}

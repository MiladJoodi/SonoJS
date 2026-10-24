"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Loader2Icon } from "lucide-react"

import { chartViewHref } from "@/lib/charts-catalog"
import { cn } from "@/lib/utils"

import {
  chartThumbSrc,
  isThumbLoaded,
  markThumbLoaded,
} from "./thumbs"

export function ChartExampleCard({
  id,
  title,
  status,
  loading = "lazy",
}: {
  id: string
  title: string
  status?: "pending" | "ported"
  loading?: "eager" | "lazy"
}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const theme = resolvedTheme === "dark" ? "dark" : "light"
  const src = chartThumbSrc(id, theme)
  const href = chartViewHref(id)
  const [thumbLoaded, setThumbLoaded] = React.useState(() => isThumbLoaded(src))
  const [thumbFailed, setThumbFailed] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (isThumbLoaded(src)) {
      setThumbLoaded(true)
      setThumbFailed(false)
      return
    }
    setThumbLoaded(false)
    setThumbFailed(false)
  }, [src])

  const syncImgState = React.useCallback(
    (img: HTMLImageElement | null) => {
      if (!img || thumbFailed) return
      if (img.complete && img.naturalWidth > 0) {
        markThumbLoaded(src)
        setThumbLoaded(true)
      }
    },
    [src, thumbFailed]
  )

  const showLoading = mounted && !thumbLoaded && !thumbFailed
  const pending = status === "pending"

  return (
    <Link
      href={href}
      aria-label={pending ? `${title} (pending)` : title}
      className={cn(
        "group flex w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-border/50 bg-transparent text-start no-underline outline-none",
        "transition-[border-color,background-color] hover:border-border hover:bg-muted/15",
        "focus-visible:ring-2 focus-visible:ring-ring",
        pending && "opacity-80"
      )}
    >
      <div
        aria-hidden
        className="relative aspect-16/11 w-full overflow-hidden bg-muted/35 dark:bg-muted/25"
      >
        {showLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2Icon
              className="size-4 animate-spin text-muted-foreground/45"
              aria-hidden
            />
          </div>
        ) : null}
        {mounted && !thumbFailed ? (
          // eslint-disable-next-line @next/next/no-img-element -- gallery thumbs are static public webps
          <img
            ref={syncImgState}
            src={src}
            alt=""
            className={cn(
              "size-full origin-center object-contain object-center p-1.5 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:p-2 group-hover:scale-110",
              thumbLoaded ? "opacity-100" : "opacity-0"
            )}
            loading={isThumbLoaded(src) ? "eager" : loading}
            decoding="async"
            onLoad={() => {
              markThumbLoaded(src)
              setThumbLoaded(true)
            }}
            onError={() => {
              setThumbFailed(true)
              setThumbLoaded(false)
            }}
          />
        ) : null}
        {thumbFailed ? (
          <div className="absolute inset-0 flex items-center justify-center px-3 text-center text-[11px] text-muted-foreground/60">
            Preview unavailable
          </div>
        ) : null}
      </div>
      <div className="bg-background/80 px-2 py-1.5">
        <span className="block truncate text-[12px] font-medium leading-snug text-foreground">
          {title}
          {pending ? " · pending" : ""}
        </span>
      </div>
    </Link>
  )
}

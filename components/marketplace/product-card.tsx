"use client"

import * as React from "react"
import Link from "next/link"

import type { MarketplacePreviewItem } from "@/lib/marketplace-preview-data"
import { cn } from "@/lib/utils"

const coverImgClass =
  "pointer-events-none absolute inset-0 size-full select-none object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"

export function MarketplaceProductCard({
  item,
  className,
  size = "default",
  loading = "lazy",
}: {
  item: MarketplacePreviewItem
  className?: string
  size?: "default" | "featured"
  /** Above-the-fold covers use `eager`; default keeps below-fold lazy. */
  loading?: "eager" | "lazy"
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const hoverVideo = Boolean(item.coverVideo && item.coverSrc)

  function playHoverVideo() {
    if (!hoverVideo) return
    const video = videoRef.current
    if (!video) return
    void video.play().catch(() => {})
  }

  function stopHoverVideo() {
    if (!hoverVideo) return
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  return (
    <article
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] transition-[border-color] duration-200 hover:border-primary/35",
        className
      )}
      onMouseEnter={playHoverVideo}
      onMouseLeave={stopHoverVideo}
    >
      <Link
        href={item.href}
        draggable={false}
        className="absolute inset-0 z-10 cursor-pointer rounded-[1.15rem] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={item.title}
      />

      <div className="relative">
        <div
          className={cn(
            "relative w-full overflow-hidden bg-[var(--sm-chip)]",
            size === "featured" ? "aspect-[16/11]" : "aspect-[16/10.5]"
          )}
        >
          {hoverVideo ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- theme pair under /public */}
              <img
                src={item.coverSrc}
                alt=""
                draggable={false}
                loading={loading}
                decoding="async"
                className={cn(
                  coverImgClass,
                  item.coverSrcDark ? "dark:hidden" : null
                )}
              />
              {item.coverSrcDark ? (
                // eslint-disable-next-line @next/next/no-img-element -- theme pair under /public
                <img
                  src={item.coverSrcDark}
                  alt=""
                  draggable={false}
                  loading={loading}
                  decoding="async"
                  className={cn(coverImgClass, "hidden dark:block")}
                />
              ) : null}
              <video
                ref={videoRef}
                src={item.coverVideo!}
                muted
                loop
                playsInline
                preload="none"
                draggable={false}
                className={cn(
                  coverImgClass,
                  "opacity-0 transition-opacity duration-200 group-hover/card:opacity-100"
                )}
              />
            </>
          ) : item.coverVideo ? (
            <video
              src={item.coverVideo}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              draggable={false}
              className={coverImgClass}
            />
          ) : item.coverSrc ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- theme pair under /public */}
              <img
                src={item.coverSrc}
                alt=""
                draggable={false}
                loading={loading}
                decoding="async"
                className={cn(
                  coverImgClass,
                  item.coverSrcDark ? "dark:hidden" : null
                )}
              />
              {item.coverSrcDark ? (
                // eslint-disable-next-line @next/next/no-img-element -- theme pair under /public
                <img
                  src={item.coverSrcDark}
                  alt=""
                  draggable={false}
                  loading={loading}
                  decoding="async"
                  className={cn(coverImgClass, "hidden dark:block")}
                />
              ) : null}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-violet-700/20" />
          )}
        </div>
      </div>

      <div className="pointer-events-none relative z-0 flex flex-1 flex-col gap-1.5 px-4 pb-4 pt-3 text-start">
        <div className="flex min-w-0 items-baseline justify-between gap-3">
          <p className="min-w-0 flex-1 truncate text-[15px] font-semibold tracking-tight text-[var(--sm-text)] transition-colors group-hover/card:text-primary">
            {item.title}
          </p>
          <p
            className={cn(
              "shrink-0 text-[15px] font-bold tracking-tight",
              item.access === "pro"
                ? "text-primary"
                : "text-[var(--sm-text)]"
            )}
          >
            {item.access === "pro" ? "Pro" : item.priceLabel || "Free"}
          </p>
        </div>
        <p className="line-clamp-2 text-[12.5px] leading-snug text-[var(--sm-text-secondary)]">
          {item.tagline}
        </p>
      </div>
    </article>
  )
}

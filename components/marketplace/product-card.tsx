"use client"

import * as React from "react"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import type { MarketplacePreviewItem } from "@/lib/marketplace-preview-data"
import {
  MARKETPLACE_VIDEO_VISIBILITY_MIN,
  clearMarketplaceVideoVisibility,
  releaseMarketplaceVideoPlay,
  reportMarketplaceVideoVisibility,
  requestMarketplaceVideoPlay,
  useMarketplaceActiveVideo,
} from "@/hooks/use-marketplace-active-video"
import { cn } from "@/lib/utils"

const coverImgClass =
  "pointer-events-none absolute inset-0 size-full select-none object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"

function prefersFineHover() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  )
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

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
  const videoId = React.useId()
  const articleRef = React.useRef<HTMLElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const hoverVideo = Boolean(item.coverVideo && item.coverSrc)
  const isActive = useMarketplaceActiveVideo(videoId)

  function playHoverVideo() {
    if (!hoverVideo || prefersReducedMotion() || !prefersFineHover()) return
    requestMarketplaceVideoPlay(videoId)
  }

  function stopHoverVideo() {
    if (!hoverVideo || !prefersFineHover()) return
    releaseMarketplaceVideoPlay(videoId)
  }

  // Mobile / coarse: report visibility; coordinator picks one winner.
  React.useEffect(() => {
    if (!hoverVideo) return
    if (prefersFineHover() || prefersReducedMotion()) return

    const root = articleRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        reportMarketplaceVideoVisibility({
          id: videoId,
          ratio: entry.isIntersecting ? entry.intersectionRatio : 0,
        })
      },
      {
        threshold: [0, MARKETPLACE_VIDEO_VISIBILITY_MIN, 0.75, 1],
      }
    )

    observer.observe(root)
    return () => {
      observer.disconnect()
      clearMarketplaceVideoVisibility(videoId)
    }
  }, [hoverVideo, videoId])

  // Bind src only while active; unload decode buffers when inactive.
  React.useEffect(() => {
    if (!hoverVideo || !item.coverVideo) return
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      if (video.getAttribute("src") !== item.coverVideo) {
        video.src = item.coverVideo
        video.load()
      }
      void video.play().catch(() => {})
      return
    }

    video.pause()
    if (video.getAttribute("src")) {
      video.removeAttribute("src")
      video.load()
    }
  }, [hoverVideo, isActive, item.coverVideo])

  return (
    <article
      ref={articleRef}
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] transition-[border-color] duration-200 hover:border-primary/35",
        className
      )}
      onMouseEnter={playHoverVideo}
      onMouseLeave={stopHoverVideo}
    >
      <Link
        href={item.href}
        prefetch={false}
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
                muted
                loop
                playsInline
                preload="none"
                draggable={false}
                className={cn(
                  coverImgClass,
                  "opacity-0 transition-opacity duration-200",
                  isActive && "opacity-100"
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

          {item.liveUrl ? (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label={`Open live demo for ${item.title}`}
              className={cn(
                "absolute end-2.5 top-2.5 z-20 inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow-soft backdrop-blur-md transition-[opacity,transform,background-color] duration-200 hover:bg-background",
                "opacity-100",
                "[@media(hover:hover)_and_(pointer:fine)]:translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:opacity-0",
                "[@media(hover:hover)_and_(pointer:fine)]:group-hover/card:translate-y-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover/card:opacity-100"
              )}
            >
              <ExternalLinkIcon className="size-3.5 shrink-0" aria-hidden />
            </a>
          ) : null}
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

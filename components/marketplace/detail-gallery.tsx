"use client"

import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function MarketplaceDetailGallery({
  title,
  image,
  imageDark,
  video,
  className,
}: {
  title: string
  image: string
  /** Dark-mode still when available */
  imageDark?: string | null
  /** When set, plays instead of the still image. */
  video?: string | null
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-[12px] border border-[var(--sm-border)] bg-[var(--sm-chip)] sm:aspect-[16/9]",
        className
      )}
    >
      {video ? (
        <video
          src={video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label={title}
          className="absolute inset-0 size-full object-cover object-top"
        />
      ) : image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- theme pair under /public */}
          <img
            src={image}
            alt={title}
            className={cn(
              "absolute inset-0 size-full object-cover object-top",
              imageDark ? "dark:hidden" : null
            )}
          />
          {imageDark ? (
            // eslint-disable-next-line @next/next/no-img-element -- theme pair under /public
            <img
              src={imageDark}
              alt={title}
              className="absolute inset-0 hidden size-full object-cover object-top dark:block"
            />
          ) : null}
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-violet-700/20" />
      )}

      <div className="absolute inset-x-0 top-0 flex items-start p-3 lg:hidden">
        <Link
          href="/marketplace"
          aria-label="Back"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[var(--sm-overlay)] text-white backdrop-blur-md"
        >
          <ArrowLeftIcon className="size-4 icon-dir" />
        </Link>
      </div>
    </div>
  )
}

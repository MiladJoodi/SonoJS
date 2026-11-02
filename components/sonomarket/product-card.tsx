"use client"

import Image from "next/image"
import Link from "next/link"

import type { SonoMarketPreviewItem } from "@/lib/sonomarket-preview-data"
import { cn } from "@/lib/utils"

export function SonoMarketProductCard({
  item,
  className,
  size = "default",
}: {
  item: SonoMarketPreviewItem
  className?: string
  size?: "default" | "featured"
}) {
  return (
    <article
      className={cn(
        "group/card flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] transition-[border-color] duration-200 hover:border-primary/35",
        className
      )}
    >
      <div className="relative">
        <Link
          href={item.href}
          draggable={false}
          className="block cursor-pointer overflow-hidden"
          tabIndex={-1}
          aria-hidden
        >
          <div
            className={cn(
              "relative w-full overflow-hidden bg-[var(--sm-chip)]",
              size === "featured" ? "aspect-[16/11]" : "aspect-[16/10.5]"
            )}
          >
            {item.coverVideo ? (
              <video
                src={item.coverVideo}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                draggable={false}
                className="pointer-events-none absolute inset-0 size-full select-none object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
              />
            ) : item.coverSrc ? (
              <Image
                src={item.coverSrc}
                alt=""
                fill
                draggable={false}
                loading={size === "featured" ? "eager" : "lazy"}
                sizes={
                  size === "featured"
                    ? "300px"
                    : "(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 320px"
                }
                className="pointer-events-none select-none object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-violet-700/20" />
            )}
          </div>
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 px-4 pb-4 pt-3 text-start">
        <div className="flex min-w-0 items-baseline justify-between gap-3">
          <Link
            href={item.href}
            draggable={false}
            className="min-w-0 flex-1 cursor-pointer truncate text-[15px] font-semibold tracking-tight text-[var(--sm-text)] outline-none transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-primary"
          >
            {item.title}
          </Link>
          <p className="shrink-0 text-[15px] font-bold tracking-tight text-[var(--sm-text)]">
            {item.priceLabel}
          </p>
        </div>
        <p className="line-clamp-2 text-[12.5px] leading-snug text-[var(--sm-text-secondary)]">
          {item.tagline}
        </p>
      </div>
    </article>
  )
}

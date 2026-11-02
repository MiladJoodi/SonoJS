"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, HeartIcon, Share2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

export function SonoMarketDetailGallery({
  title,
  image,
  className,
}: {
  title: string
  image: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-[12px] border border-[var(--sm-border)] bg-[var(--sm-chip)] sm:aspect-[16/9]",
        className
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-violet-700/20" />
      )}

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 lg:hidden">
        <Link
          href="/marketplace"
          aria-label="Back"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[var(--sm-overlay)] text-white backdrop-blur-md"
        >
          <ArrowLeftIcon className="size-4 icon-dir" />
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Share"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[var(--sm-overlay)] text-white backdrop-blur-md"
          >
            <Share2Icon className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Save"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[var(--sm-overlay)] text-white backdrop-blur-md"
          >
            <HeartIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

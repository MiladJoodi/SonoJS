import type * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import cornerPortrait from "./images/portrait-corner.jpg"
import heroPortrait from "./images/hero-portrait.jpg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function LightbulbMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={cn("size-10 shrink-0 sm:size-12", className)}
      aria-hidden="true"
      {...props}
    >
      <path
        fill="#a855f7"
        d="M32 4c-11.046 0-20 8.954-20 20 0 7.732 4.388 14.42 10.75 17.68V48a4 4 0 0 0 4 4h10.5a4 4 0 0 0 4-4v-6.32C47.612 38.42 52 31.732 52 24 52 12.954 43.046 4 32 4z"
      />
      <path
        fill="#c084fc"
        d="M26.75 54a2.75 2.75 0 0 0 2.75 2.75h5a2.75 2.75 0 0 0 2.75-2.75v-2H26.75v2z"
      />
      <path
        fill="#f5d0fe"
        d="M32 12a2 2 0 0 1 2 2c0 6.627-2.686 11-6 14.5-.5.5-1 .9-1 1.5v2h10v-2c0-.6.5-1 1-1.5 3.314-3.5 6-7.873 6-14.5a12 12 0 0 0-12-12z"
        opacity=".35"
      />
      <circle cx="32" cy="22" r="3" fill="#faf5ff" />
    </svg>
  )
}

export default function ContentSection({
  eyebrow = "Our story",
  title = "We're Zospace — Founded in London",
  message = "A short message that will bring your customers into the world of your imagination.",
  ctaLabel = "Learn our story",
  ctaHref = "#",
  heroImageSrc = assetSrc(heroPortrait),
  cornerImageSrc = assetSrc(cornerPortrait),
  className,
  ...props
}: React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  message?: string
  ctaLabel?: string
  ctaHref?: string
  heroImageSrc?: string
  cornerImageSrc?: string
}) {
  return (
    <section
      className={cn(
        "relative overflow-x-clip bg-zinc-950 py-12 sm:py-16 md:py-24",
        className
      )}
      aria-labelledby="content-section-heading"
      {...props}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div className="order-first min-w-0 md:order-none">
            <div className="relative overflow-hidden rounded-[16px]">
              <img
                src={heroImageSrc}
                alt=""
                className="h-auto w-full object-cover md:min-h-[22rem] lg:min-h-[28rem]"
                style={{ aspectRatio: "4 / 3" }}
                loading="lazy"
              />
              <img
                src={cornerImageSrc}
                alt=""
                className="absolute bottom-4 start-4 hidden h-28 w-20 rounded-[12px] object-cover shadow-soft ring-2 ring-white/15 sm:block md:bottom-5 md:start-5 md:h-32 md:w-24 lg:bottom-6 lg:start-6 lg:h-36 lg:w-28"
                loading="lazy"
              />
            </div>
          </div>

          <div className="min-w-0 text-start">
            <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase sm:mb-5">
              {eyebrow}
            </p>
            <h2
              id="content-section-heading"
              className="mb-7 text-3xl font-bold tracking-tight text-balance text-white sm:mb-8 sm:text-4xl md:text-5xl"
            >
              {title}
            </h2>

            <div className="mb-8 flex flex-col items-start gap-4 rounded-[16px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:mb-10 sm:flex-row sm:gap-5 sm:p-5">
              <LightbulbMark />
              <p className="min-w-0 text-sm leading-relaxed text-zinc-200 sm:text-base md:text-lg">
                {message}
              </p>
            </div>

            <a
              href={ctaHref}
              className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm font-bold tracking-wide text-white outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <span className="border-b border-white/50 pb-0.5">{ctaLabel}</span>
              <ArrowUpRightIcon className="size-4 icon-dir" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

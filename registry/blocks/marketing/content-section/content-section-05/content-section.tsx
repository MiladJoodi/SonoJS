import type * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

import insightsIllus from "./images/insights-illus.webp"
import kpiImg from "./images/kpi-img-3.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type ContentRow = {
  title: string
  paragraphs: string[]
  imageSrc: string
  imageAlt: string
  ctaLabel?: string
  ctaHref?: string
}

const DEFAULT_ROWS: ContentRow[] = [
  {
    title: "Elevate Your Online Presence",
    paragraphs: [
      "Your online presence is your first impression. We help you stand out with impactful design, engaging content, and strategies that convert.",
      "Combining design, strategy, and technology, we build a digital foundation that stays adaptable as your goals grow.",
    ],
    imageSrc: assetSrc(insightsIllus),
    imageAlt: "Creative insights illustration",
    ctaLabel: "Get started",
    ctaHref: "#",
  },
  {
    title: "Your Success, Our Commitment",
    paragraphs: [
      "We're a partner in progress—data-driven insights, tailored solutions, and a relentless focus on growth.",
      "From optimizing performance to scaling outcomes, every solution stays aligned with your vision.",
    ],
    imageSrc: assetSrc(kpiImg),
    imageAlt: "KPIs dashboard",
    ctaLabel: "Get started",
    ctaHref: "#",
  },
]

function MediaFrame({
  imageSrc,
  imageAlt,
  inverted,
}: {
  imageSrc: string
  imageAlt: string
  inverted?: boolean
}) {
  return (
    <div
      className="overflow-hidden rounded-[16px] border border-border/70 p-2 shadow-soft sm:p-3 md:p-5"
      style={{
        backgroundColor: inverted ? "var(--canvas)" : "var(--card)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div
        className="relative w-full overflow-hidden rounded-[12px] bg-muted"
        style={{ aspectRatio: "16 / 10" }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 size-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default function ContentSection({
  rows = DEFAULT_ROWS,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  rows?: ContentRow[]
}) {
  return (
    <section
      className={cn("w-full", className)}
      aria-label="Content sections"
      {...props}
    >
      {rows.map((row, index) => {
        const mediaOnEnd = index % 2 === 0
        const bandCanvas = index % 2 === 0

        return (
          <div
            key={row.title}
            className={cn(
              "px-4 py-12 sm:py-16 md:px-8 md:py-24",
              bandCanvas ? "bg-canvas" : "bg-card"
            )}
            style={{
              backgroundColor: bandCanvas ? "var(--canvas)" : "var(--card)",
            }}
          >
            <div
              className={cn(
                "mx-auto flex max-w-7xl flex-col gap-8 sm:gap-10 md:items-center md:gap-12 lg:gap-16",
                mediaOnEnd ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              <div className="min-w-0 flex-1 md:max-w-xl">
                <span className="mb-4 inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-muted text-xs font-bold text-foreground tabular-nums sm:mb-5">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-4 text-2xl font-bold tracking-tight text-balance text-foreground sm:mb-5 sm:text-3xl md:text-4xl">
                  {row.title}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {row.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {row.ctaLabel ? (
                  <div className="mt-7 sm:mt-8">
                    <Button
                      asChild
                      className="w-full cursor-pointer gap-2 sm:w-auto"
                    >
                      <a href={row.ctaHref ?? "#"}>
                        {row.ctaLabel}
                        <ArrowRightIcon
                          className="size-4 icon-dir"
                          aria-hidden
                        />
                      </a>
                    </Button>
                  </div>
                ) : null}
              </div>

              <div className="order-first min-w-0 flex-1 md:order-none">
                <MediaFrame
                  imageSrc={row.imageSrc}
                  imageAlt={row.imageAlt}
                  inverted={!bandCanvas}
                />
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

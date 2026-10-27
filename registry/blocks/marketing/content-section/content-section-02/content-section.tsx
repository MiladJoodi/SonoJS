import type * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

import insightsIllus from "./images/insights-illus.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_FEATURES = [
  "Discover innovative ideas.",
  "Create unique projects.",
  "Collaborate with like-minded individuals.",
  "Transform your visions into reality.",
]

export default function ContentSection({
  eyebrow = "Creative workspace",
  title = "Immerse Yourself in Creativity",
  description = "Unlock imagination whether you're designing, writing, or building. This is your space to experiment boldly and turn vision into reality—one spark at a time.",
  features = DEFAULT_FEATURES,
  ctaLabel = "Get started",
  ctaHref = "#",
  secondaryLabel = "See examples",
  secondaryHref = "#",
  imageSrc = assetSrc(insightsIllus),
  imageAlt = "Creative insights illustration",
  className,
  ...props
}: React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  features?: string[]
  ctaLabel?: string
  ctaHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  imageSrc?: string
  imageAlt?: string
}) {
  return (
    <section
      className={cn(
        "w-full bg-canvas px-4 py-12 sm:py-16 md:px-8 md:py-24",
        className
      )}
      style={{ backgroundColor: "var(--canvas)" }}
      aria-labelledby="content-section-heading"
      {...props}
    >
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 md:grid-cols-2 md:items-stretch md:gap-12 lg:gap-14">
        <div className="flex min-w-0 flex-col justify-center text-start">
          <span className="mb-4 inline-flex w-fit max-w-full rounded-full border border-border/70 bg-card px-3 py-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:mb-5">
            {eyebrow}
          </span>
          <h2
            id="content-section-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-balance text-foreground sm:mb-5 md:text-5xl"
          >
            {title}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>

          <ul className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-[12px] border border-border/60 bg-card px-3 py-3 shadow-soft sm:items-center sm:px-4"
                style={{
                  backgroundColor: "var(--card)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground sm:mt-0">
                  <CheckIcon className="size-4 stroke-[3]" aria-hidden />
                </span>
                <span className="min-w-0 text-sm font-medium text-foreground">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button asChild className="w-full cursor-pointer sm:w-auto">
              <a href={ctaHref}>{ctaLabel}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full cursor-pointer sm:w-auto"
            >
              <a href={secondaryHref}>{secondaryLabel}</a>
            </Button>
          </div>
        </div>

        <div className="relative order-first flex min-w-0 items-center justify-center md:order-none">
          <div
            aria-hidden="true"
            className="absolute inset-4 rounded-[24px] bg-primary/5 sm:inset-8"
          />
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-[16px] border border-border/70 bg-card p-3 shadow-soft sm:p-4 md:p-6"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="relative w-full overflow-hidden rounded-[12px] bg-muted"
              style={{ aspectRatio: "3 / 2" }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="absolute inset-0 size-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import brandLogo1 from "./images/brand-logo-1.webp"
import brandLogo2 from "./images/brand-logo-2.webp"
import brandLogo3 from "./images/brand-logo-3.webp"
import brandLogo4 from "./images/brand-logo-4.webp"
import kpiDashboard from "./images/kpi-dashboard.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_BRANDS = [
  { src: assetSrc(brandLogo1), alt: "Brand logo 1" },
  { src: assetSrc(brandLogo2), alt: "Brand logo 2" },
  { src: assetSrc(brandLogo3), alt: "Brand logo 3" },
  { src: assetSrc(brandLogo4), alt: "Brand logo 4" },
] as const

export default function Hero({
  title = "The Most Modern Card Platform for Debit",
  description = "Explore a curated collection of ready-to-use components and design blocks, responsive interfaces with ease. Streamline your workflow and discover the future of web development.",
  primaryCta = "Get Started",
  primaryHref = "#",
  secondaryCta = "API Documentation",
  secondaryHref = "#",
  imageSrc = assetSrc(kpiDashboard),
  imageAlt = "KPI dashboard",
  brands = DEFAULT_BRANDS as unknown as { src: string; alt: string }[],
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  description?: string
  primaryCta?: string
  primaryHref?: string
  secondaryCta?: string
  secondaryHref?: string
  imageSrc?: string
  imageAlt?: string
  brands?: { src: string; alt: string }[]
}) {
  return (
    <section
      className={cn(
        "relative isolate w-full overflow-hidden bg-background",
        className
      )}
      aria-labelledby="hero-heading"
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-x-0 bottom-0 h-3/4"
          style={{
            background:
              "radial-gradient(90% 100% at 50% 100%, color-mix(in oklab, var(--primary) 40%, transparent), color-mix(in oklab, var(--primary) 20%, transparent), transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 100%, color-mix(in oklab, var(--primary) 35%, transparent), transparent)",
          }}
        />
      </div>

      <div className="px-4 py-12 md:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl text-start">
            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight text-balance text-foreground md:text-5xl lg:text-6xl lg:leading-[1.1]"
            >
              {title}
            </h1>
          </div>

          <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-start">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button asChild>
                  <a href={primaryHref}>{primaryCta}</a>
                </Button>
                <a
                  href={secondaryHref}
                  className="text-sm font-semibold text-foreground underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  {secondaryCta}
                </a>
              </div>

              <div className="mt-16 flex flex-wrap gap-x-8 gap-y-6">
                {brands.map((brand) => (
                  <img
                    key={brand.src}
                    src={brand.src}
                    alt={brand.alt}
                    className="h-auto w-28 shrink-0 dark:invert dark:brightness-200"
                  />
                ))}
              </div>
            </div>

            <div className="aspect-[7/4] w-full">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="size-full rounded-[12px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

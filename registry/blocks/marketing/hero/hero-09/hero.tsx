import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import mobileApp from "./images/mobile-app-img-3.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export default function Hero({
  titleBefore = "Simple ",
  titleAccent = "Solutions",
  titleAfter = " for Complex Problems",
  description = "Showcase your products and connect with your audience. Our all-in-one platform helps you manage operations and boost visibility — whether you're in fashion, beauty, wellness, or beyond.",
  primaryCta = "Get Started Free",
  primaryHref = "#",
  secondaryCta = "Integrations",
  secondaryHref = "#",
  imageSrc = assetSrc(mobileApp),
  imageAlt = "Mobile app preview",
  className,
  ...props
}: React.ComponentProps<"section"> & {
  titleBefore?: string
  titleAccent?: string
  titleAfter?: string
  description?: string
  primaryCta?: string
  primaryHref?: string
  secondaryCta?: string
  secondaryHref?: string
  imageSrc?: string
  imageAlt?: string
}) {
  return (
    <section
      className={cn(
        "w-full bg-background px-4 py-8 md:px-8 md:py-16",
        className
      )}
      aria-labelledby="hero-heading"
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center justify-center gap-x-12 gap-y-8 sm:gap-y-12 lg:grid-cols-2 lg:gap-y-16">
          <div className="mx-auto w-full max-w-56 sm:max-w-xs md:max-w-sm lg:max-w-md">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="mx-auto block h-auto max-h-60 w-full object-contain object-center sm:max-h-80 lg:max-h-none"
            />
          </div>

          <div className="mx-auto w-full max-w-3xl text-center lg:mx-0 lg:text-start">
            <h1
              id="hero-heading"
              className="mb-6 text-4xl font-bold tracking-tight text-balance text-foreground md:text-5xl"
            >
              {titleBefore}
              <span className="text-primary">{titleAccent}</span>
              {titleAfter}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button asChild>
                <a href={primaryHref}>{primaryCta}</a>
              </Button>
              <Button asChild variant="outline">
                <a href={secondaryHref}>{secondaryCta}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

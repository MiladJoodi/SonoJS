"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

import teamImage from "./images/team.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function MediaPanel({ className }: { className?: string }) {
  const [missing, setMissing] = React.useState(false)

  return (
    <div
      className={cn(
        "aspect-[4/3] w-full min-h-[16rem] overflow-hidden rounded-[12px] bg-muted sm:min-h-[20rem] lg:aspect-auto lg:h-full lg:min-h-[26rem]",
        className
      )}
    >
      {missing ? (
        <div className="flex size-full items-center justify-center">
          <p className="text-sm text-muted-foreground">Add team.webp here</p>
        </div>
      ) : (
        <img
          src={assetSrc(teamImage)}
          alt="Premium benefits"
          className="size-full object-cover"
          loading="lazy"
          onError={() => setMissing(true)}
        />
      )}
    </div>
  )
}

export default function Cta({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 py-6 md:px-8 md:py-8", className)}
      aria-labelledby="cta-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-3xl text-start">
            <h2
              id="cta-heading"
              className="mb-4 text-[1.75rem] font-bold tracking-tight text-foreground sm:mb-6 sm:text-3xl md:text-4xl"
            >
              Try using our templates
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Upgrade to our premium plan and supercharge your experience.
              Don&apos;t miss out!
            </p>

            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
              <Button asChild className="h-[46px] rounded-[12px]">
                <a href="#">Get started</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-[46px] rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
              >
                <a href="#">Learn more</a>
              </Button>
            </div>
          </div>

          <MediaPanel />
        </div>
      </div>
    </section>
  )
}

"use client"

import type * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import flowerMp4 from "./media/flower.mp4"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const STATS = [
  ["Accessible", "Keyboard and screen reader support"],
  ["Adaptable", "A shared set of theme tokens"],
  ["Composable", "Small, focused components"],
] as const

export default function Hero({
  className,
  videoSrc = assetSrc(flowerMp4),
  ...props
}: React.ComponentProps<"section"> & {
  videoSrc?: string
}) {
  return (
    <section
      className={cn(
        "relative isolate min-h-[640px] w-full min-w-0 overflow-hidden bg-zinc-950 text-white",
        className
      )}
      aria-labelledby="hero-12-heading"
      {...props}
    >
      <video
        className="absolute inset-0 -z-20 size-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-zinc-950/85"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl text-start">
          <p className="text-sm font-medium text-white/75">
            Infrastructure for what comes next
          </p>
          <h1
            id="hero-12-heading"
            className="mt-6 text-h1 font-semibold tracking-tight text-white sm:text-5xl"
          >
            Turn your next idea into a working product.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            A considered foundation for your team: accessible interactions,
            clear APIs, and a design system that adapts to the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button type="button" size="lg">
              Explore the platform
              <ArrowRightIcon className="icon-dir size-4" aria-hidden />
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Contact our team
            </Button>
          </div>
        </div>

        <dl className="mt-16 grid max-w-2xl grid-cols-1 gap-5 border-t border-white/20 pt-7 sm:grid-cols-3">
          {STATS.map(([title, description]) => (
            <div key={title}>
              <dt className="text-sm font-medium text-white">{title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/70">
                {description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

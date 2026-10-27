"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

import bgImage from "./images/bg.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export default function Jumbotron({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[12px] px-6 py-16 text-center shadow-soft md:px-8 md:py-24",
        className
      )}
      aria-labelledby="jumbotron-heading"
      style={{
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
      {...props}
    >
      <img
        src={assetSrc(bgImage)}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/75" aria-hidden />

      <div className="relative mx-auto max-w-5xl">
        <h2
          id="jumbotron-heading"
          className="mb-6 text-3xl font-bold tracking-tight text-white whitespace-nowrap md:text-5xl"
        >
          Show your product in style
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
          A bold banner for launches, promos, and portfolios. Make the first
          look count.
        </p>
        <div className="mt-10">
          <Button asChild className="h-[46px] rounded-[12px]">
            <a href="#">Get started</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

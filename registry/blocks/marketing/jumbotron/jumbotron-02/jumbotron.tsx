"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

import cardImage from "./images/card.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export default function Jumbotron({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="jumbotron-heading"
      {...props}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-0 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 md:p-8 lg:col-span-2">
          <h2
            id="jumbotron-heading"
            className="text-2xl font-bold tracking-tight text-foreground whitespace-nowrap md:text-3xl"
          >
            Learn programming faster
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Follow simple tutorials and real projects. Write cleaner code, build
            better apps, and grow your career.
          </p>
          <Button asChild className="mt-6 h-[46px] rounded-[12px]">
            <a href="#">Get the free guide</a>
          </Button>
        </div>

        <div className="relative hidden aspect-[14/11] h-full min-h-48 md:block">
          <img
            src={assetSrc(cardImage)}
            alt=""
            className="size-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

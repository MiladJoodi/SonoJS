"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

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
      <div className="relative mx-auto w-full max-w-7xl rounded-[12px] bg-zinc-900 px-6 py-16 text-center shadow-soft md:px-8 md:py-20">
        <h2
          id="jumbotron-heading"
          className="mb-6 text-3xl font-bold tracking-tight text-white whitespace-nowrap md:text-4xl"
        >
          Show your product in style
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
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

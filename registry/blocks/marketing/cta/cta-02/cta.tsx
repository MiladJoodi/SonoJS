"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

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
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="cta-heading"
          className="mb-4 text-[1.75rem] font-bold tracking-tight text-foreground sm:mb-6 sm:text-3xl md:text-4xl"
        >
          Try using our templates
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Try using our templates to quickly create professional pages without
          starting from scratch. Save time, stay consistent, and customize
          designs to fit your brand perfectly.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
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
    </section>
  )
}

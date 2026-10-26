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
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="jumbotron-heading"
          className="text-3xl font-bold tracking-tight text-foreground whitespace-nowrap"
        >
          Build smarter. Launch faster.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Start with ready UI pieces made for speed. Spend less time on layout
          and more time on a great experience for your users.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild className="h-[46px] rounded-[12px]">
            <a href="#">Get started</a>
          </Button>
          <Button asChild variant="outline" className="h-[46px] rounded-[12px]">
            <a href="#">Browse templates</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

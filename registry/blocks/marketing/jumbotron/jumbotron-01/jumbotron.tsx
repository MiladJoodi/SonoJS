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
      <div className="mx-auto w-full max-w-4xl rounded-[12px] border border-border/70 bg-card p-6 shadow-soft md:p-8">
        <h2
          id="jumbotron-heading"
          className="text-2xl font-bold tracking-tight text-foreground whitespace-nowrap md:text-3xl"
        >
          Build faster with ready-made UI
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Use ready components and layouts. Customize with Tailwind and launch
          your site without starting from scratch.
        </p>
        <Button asChild className="mt-6 h-[46px] rounded-[12px]">
          <a href="#">Start building</a>
        </Button>
      </div>
    </section>
  )
}

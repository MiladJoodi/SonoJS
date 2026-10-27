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
      className={cn("w-full bg-canvas px-4 py-12 md:px-8 md:py-16", className)}
      style={{ backgroundColor: "var(--canvas, #f3f3f4)" }}
      aria-labelledby="jumbotron-heading"
      {...props}
    >
      <div className="relative mx-auto w-full max-w-4xl border-s-[7px] border-primary bg-card p-6 shadow-soft md:p-8"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
        <div className="max-w-2xl">
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
          <Button asChild className="mt-6 h-[46px] rounded-[12px]">
            <a href="#">Get started</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

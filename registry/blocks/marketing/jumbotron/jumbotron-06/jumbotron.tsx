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
      <div className="mx-auto w-full max-w-6xl">
        <div className="w-full rounded-[12px] border border-border/70 bg-card p-6 shadow-soft md:p-8"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
          <h2
            id="jumbotron-heading"
            className="text-3xl font-bold tracking-tight text-foreground whitespace-nowrap md:text-4xl"
          >
            Build beautiful websites faster
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Use ready components and a clear design scale. Spend less time on
            layout chrome and more time on the product.
          </p>
          <Button asChild className="mt-6 h-[46px] rounded-[12px]">
            <a href="#">Get started</a>
          </Button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="w-full rounded-[12px] bg-zinc-900 p-6 shadow-soft md:p-8"
              style={{
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
            <h3 className="text-2xl font-semibold tracking-tight text-white whitespace-nowrap">
              Why SonoJS?
            </h3>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Copy-source UI with RTL and dark mode built in. Customize what you
              need without fighting a heavy theme.
            </p>
            <Button asChild className="mt-6 h-[46px] rounded-[12px]">
              <a href="#">Learn more</a>
            </Button>
          </div>

          <div className="w-full rounded-[12px] border border-border/70 bg-card p-6 shadow-soft md:p-8"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
            <h3 className="text-2xl font-semibold tracking-tight text-foreground whitespace-nowrap">
              Who is it for?
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Developers, startups, and teams who want clean interfaces without
              starting every screen from zero.
            </p>
            <Button asChild className="mt-6 h-[46px] rounded-[12px]">
              <a href="#">Learn more</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

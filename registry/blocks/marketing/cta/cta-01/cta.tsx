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
      <div className="mx-auto w-full max-w-5xl rounded-[12px] bg-card p-4 shadow-soft sm:p-6 md:p-8"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
        <div className="max-w-4xl text-start">
          <h2
            id="cta-heading"
            className="mb-4 text-[1.75rem] font-bold tracking-tight text-foreground sm:mb-6 sm:text-3xl md:text-4xl"
          >
            Hello World!
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Start building faster with our collection of ready-made UI
            components. Clean design, fully responsive, and easy to customize
            for any project.
          </p>
          <Button asChild className="mt-6 h-[46px] rounded-[12px] sm:mt-8">
            <a href="#">Get started</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

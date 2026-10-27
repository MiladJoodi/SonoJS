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
      <style>{`
        .cta-08-card {
          border-radius: 24px;
        }
      `}</style>

      <div className="cta-08-card mx-auto max-w-3xl bg-card px-4 py-8 shadow-soft sm:px-6 md:px-10 md:py-14"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
        <div className="text-center">
          <h2
            id="cta-heading"
            className="mb-4 text-[1.75rem] font-bold tracking-tight text-foreground sm:mb-6 sm:text-3xl md:text-4xl"
          >
            Create Stunning Designs in Minutes
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Discover tools designed to help you stay organized, save time, and
            get more done. Whether you&apos;re managing daily tasks or
            collaborating with a team.
          </p>

          <Button asChild className="mt-6 h-[46px] rounded-[12px] sm:mt-8">
            <a href="#">See How It Works</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

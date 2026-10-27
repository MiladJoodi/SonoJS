"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

import teamImage from "./images/team.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

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
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[12px] bg-zinc-900 shadow-soft"
              style={{
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
        <div className="grid items-center gap-y-4 md:grid-cols-2">
          <div className="p-6 md:p-8 lg:p-12">
            <h2
              id="jumbotron-heading"
              className="text-2xl font-bold leading-snug tracking-tight text-white whitespace-nowrap md:text-3xl"
            >
              SonoJS{" "}
              <span className="text-primary">Jumbotron</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Build a clear Jumbotron in minutes. Responsive, easy to customize,
              and ready for startups, portfolios, and landing pages.
            </p>
            <Button asChild className="mt-6 h-[46px] rounded-[12px]">
              <a href="#">Get started</a>
            </Button>
          </div>

          <div className="aspect-[16/10] h-full min-h-48">
            <img
              src={assetSrc(teamImage)}
              alt="Team collaborating at a desk"
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

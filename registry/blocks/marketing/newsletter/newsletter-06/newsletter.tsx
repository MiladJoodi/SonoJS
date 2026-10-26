"use client"

import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import realEstate from "./images/real-estate-img.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export default function Newsletter({
  title = "Subscribe to Our Newsletter",
  description = "Subscribe to our newsletter and stay up to date with the latest news, updates, and exclusive offers. Get valuable insights. Join our community today!",
  placeholder = "you@example.com",
  cta = "Subscribe",
  backgroundSrc = assetSrc(realEstate),
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  description?: string
  placeholder?: string
  cta?: string
  backgroundSrc?: string
}) {
  return (
    <section
      className={cn("relative w-full", className)}
      aria-labelledby="newsletter-heading"
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundSrc})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 flex min-h-[400px] h-full flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="newsletter-heading"
            className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl"
          >
            {title}
          </h2>
          <p className="text-base leading-relaxed text-white/80">
            {description}
          </p>

          <form
            className="mx-auto mt-12 max-w-lg"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex flex-col gap-2 rounded-[12px] border border-border/70 bg-card p-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/40 sm:flex-row sm:items-center sm:gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="newsletter-email"
                name="email"
                placeholder={placeholder}
                required
                autoComplete="email"
                dir="ltr"
                className="h-[46px] min-w-0 flex-1 bg-transparent px-3 text-start text-base text-foreground outline-none placeholder:text-muted-foreground md:text-sm"
              />
              <Button type="submit" className="w-full shrink-0 sm:w-auto">
                {cta}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

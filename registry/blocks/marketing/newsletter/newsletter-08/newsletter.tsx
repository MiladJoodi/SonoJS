"use client"

import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { cn } from "@/lib/utils"

export default function Newsletter({
  title = "Subscribe to Our Newsletter",
  description = "Subscribe to our newsletter and stay up to date with the latest news, updates, and exclusive offers. Get valuable insights. Join our community today!",
  placeholder = "you@example.com",
  cta = "Subscribe",
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  description?: string
  placeholder?: string
  cta?: string
}) {
  return (
    <section
      className={cn(
        "relative mb-14 w-full px-6 py-16 pb-20",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--primary), color-mix(in oklab, var(--primary) 72%, white), var(--primary))",
      }}
      aria-labelledby="newsletter-heading"
      {...props}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="newsletter-heading"
          className="mb-6 text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl"
        >
          {title}
        </h2>
        <p className="text-base leading-relaxed text-primary-foreground/85">
          {description}
        </p>
      </div>

      {/* Anchored to the section so the card hangs below the band, not under the copy. */}
      <div className="absolute inset-x-0 -bottom-10 mx-auto w-full max-w-2xl px-4">
        <form
          className="flex w-full flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            type="email"
            id="newsletter-email"
            name="email"
            placeholder={placeholder}
            required
            autoComplete="email"
            className="min-w-0 flex-1"
          />
          <Button type="submit" className="w-full shrink-0 sm:w-auto">
            {cta}
          </Button>
        </form>
      </div>
    </section>
  )
}

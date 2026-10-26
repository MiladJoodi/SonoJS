"use client"

import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { cn } from "@/lib/utils"

export default function Newsletter({
  title = "Newsletter",
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
      className={cn("mt-6 w-full bg-background px-4 md:px-8", className)}
      aria-labelledby="newsletter-heading"
      {...props}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="newsletter-heading"
          className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          {title}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {description}
        </p>

        <form
          className="mx-auto mt-10 flex max-w-lg flex-col gap-4 sm:flex-row sm:items-center"
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

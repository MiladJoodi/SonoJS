"use client"

import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

export default function Newsletter({
  title = "Subscribe Our Newsletter",
  description = "Stay updated with our latest news and exclusive offers. Join our community today!",
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
      className={cn("mt-6 w-full bg-muted/60 px-4 py-20", className)}
      aria-labelledby="newsletter-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-4xl text-center">
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
          className="mx-auto mt-8 max-w-lg"
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
    </section>
  )
}

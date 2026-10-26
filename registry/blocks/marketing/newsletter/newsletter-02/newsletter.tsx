"use client"

import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { cn } from "@/lib/utils"

function MailIllustration({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-24 shrink-0", className)}
      viewBox="0 0 512 512"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="color-mix(in oklab, var(--primary) 55%, white)"
        d="m0 192 246.528 156.896c2.816 2.08 6.144 3.104 9.472 3.104s6.656-1.024 9.472-3.104L512 192 265.6 3.2a16.032 16.032 0 0 0-19.2 0L0 192z"
      />
      <path
        fill="var(--muted)"
        d="M416 0H96C78.368 0 64 14.368 64 32v352c0 8.832 7.168 16 16 16h352c8.832 0 16-7.168 16-16V32c0-17.632-14.336-32-32-32z"
      />
      <path
        fill="color-mix(in oklab, var(--muted-foreground) 45%, var(--muted))"
        d="M144 96h224c8.832 0 16-7.168 16-16s-7.168-16-16-16H144c-8.832 0-16 7.168-16 16s7.168 16 16 16zm224 32H144c-8.832 0-16 7.168-16 16s7.168 16 16 16h224c8.832 0 16-7.168 16-16s-7.168-16-16-16zm-96 64H144c-8.832 0-16 7.168-16 16s7.168 16 16 16h128c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
      />
      <path
        fill="color-mix(in oklab, var(--primary) 85%, black)"
        d="M265.472 348.896c-2.816 2.08-6.144 3.104-9.472 3.104s-6.656-1.024-9.472-3.104L0 192v288c0 17.664 14.336 32 32 32h448c17.664 0 32-14.336 32-32V192L265.472 348.896z"
      />
      <path
        fill="var(--primary)"
        d="M480 512H32c-17.952 0-32-14.048-32-32a16.02 16.02 0 0 1 6.528-12.896l240-160c2.816-2.08 6.144-3.104 9.472-3.104s6.656 1.024 9.472 3.104l240 160A16.02 16.02 0 0 1 512 480c0 17.952-14.048 32-32 32z"
      />
    </svg>
  )
}

export default function Newsletter({
  title = "Subscribe for Secret Deals",
  description = "Subscribe to email updates and be the first to hear about our latest secret deals.",
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
      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-[12px] border border-border/70 bg-card p-6 shadow-soft md:p-8">
        <div className="flex gap-x-10 gap-y-6 max-sm:flex-col">
          <MailIllustration />

          <div className="min-w-0 flex-1 text-start">
            <h3
              id="newsletter-heading"
              className="text-xl font-semibold text-foreground"
            >
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>

            <form
              className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center"
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
        </div>
      </div>
    </section>
  )
}

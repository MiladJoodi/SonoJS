"use client"

import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

function MailIllustration({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("mb-8 inline-block w-24 shrink-0", className)}
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
  title = "Subscribe Newsletter",
  description = "Subscribe to our newsletter and stay up to date with the latest news, updates, and exclusive offers. Join our community today!",
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
      className={cn("mt-6 w-full px-4 md:px-8", className)}
      aria-labelledby="newsletter-heading"
      {...props}
    >
      <div className="mx-auto max-w-3xl rounded-[12px] border border-border/70 bg-card px-6 py-8 text-center shadow-soft sm:py-14"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
        <div className="mx-auto max-w-xl text-center">
          <MailIllustration />

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
      </div>
    </section>
  )
}

"use client"

import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

function CheckIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-6 fill-current", className)}
      viewBox="0 0 20 20"
      aria-hidden="true"
      {...props}
    >
      <path d="M16.707 5.293a1 1 0 0 0-1.414 0L8 12.586 4.707 9.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 0 0 0-1.414z" />
    </svg>
  )
}

function ResourceIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-6 fill-current", className)}
      viewBox="0 0 20 20"
      aria-hidden="true"
      {...props}
    >
      <path d="M10 2a2 2 0 0 0-2 2v1H6a2 2 0 0 0 0 4h1v7a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V9h1a2 2 0 0 0 0-4h-2V4a2 2 0 0 0-2-2z" />
    </svg>
  )
}

const DEFAULT_PERKS = [
  {
    title: "Weekly Updates",
    description:
      "Get the latest UI components, design trends, and product updates delivered to your inbox every week.",
    icon: "check" as const,
  },
  {
    title: "Exclusive Resources",
    description:
      "Access free templates, premium components, and resources available only to subscribers.",
    icon: "resource" as const,
  },
]

export default function Newsletter({
  title = "Subscribe to Our Newsletter",
  description = "Stay up to date with the latest updates, new components, and exclusive resources. Get practical insights delivered straight to your inbox.",
  placeholder = "you@example.com",
  cta = "Subscribe",
  footnote = "No spam. Unsubscribe anytime.",
  perks = DEFAULT_PERKS,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  description?: string
  placeholder?: string
  cta?: string
  footnote?: string
  perks?: { title: string; description: string; icon: "check" | "resource" }[]
}) {
  return (
    <section
      className={cn("w-full bg-zinc-950 px-6 py-8 md:px-8", className)}
      aria-labelledby="newsletter-heading"
      {...props}
    >
      <div className="mx-auto grid min-h-[350px] w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="max-w-lg text-start">
          <h2
            id="newsletter-heading"
            className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl"
          >
            {title}
          </h2>
          <p className="text-base leading-relaxed text-zinc-400">
            {description}
          </p>

          <form
            className="mt-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex flex-col gap-2 rounded-[12px] border border-zinc-700 bg-transparent p-1 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/40 sm:flex-row sm:items-center sm:gap-3">
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
                className="h-[46px] min-w-0 flex-1 bg-transparent px-3 text-start text-base text-white outline-none placeholder:text-zinc-500 md:text-sm"
              />
              <Button type="submit" className="w-full shrink-0 sm:w-auto">
                {cta}
              </Button>
            </div>
          </form>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {perks.map((perk) => (
            <div key={perk.title} className="text-start">
              <div className="mb-6 flex size-10 items-center justify-center rounded-md border border-zinc-700 text-primary">
                {perk.icon === "check" ? <CheckIcon /> : <ResourceIcon />}
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                {perk.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {perk.description}
              </p>
            </div>
          ))}

          <div className="mt-2 md:col-span-2">
            <p className="text-sm text-zinc-400">{footnote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

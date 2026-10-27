import type * as React from "react"

import { cn } from "@/lib/utils"

const DEFAULT_ITEMS = [
  {
    title: "Reliable & Easy to Use",
    description:
      "Crafted for developers and operators alike—clean structure, thoughtful defaults, and layouts you can ship the same day.",
  },
  {
    title: "Modern & Clean Designs",
    description:
      "Contemporary UI that stays readable and accessible. Every surface follows clear hierarchy so content always leads.",
  },
  {
    title: "Built for Speed & Flexibility",
    description:
      "Optimized for fast loads and seamless performance. Customize sections freely without fighting the system.",
  },
] as const

export type ContentSectionItem = {
  title: string
  description: string
}

export default function ContentSection({
  eyebrow = "Why teams switch",
  title = "Why Choose Our Templates",
  description = "Thoughtfully designed to help you build faster without compromising quality—clean code, modern layouts, effortless customization.",
  items = DEFAULT_ITEMS,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  items?: readonly ContentSectionItem[]
}) {
  return (
    <section
      className={cn(
        "w-full bg-canvas px-4 py-12 sm:py-16 md:px-8 md:py-24",
        className
      )}
      style={{ backgroundColor: "var(--canvas)" }}
      aria-labelledby="content-section-heading"
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl min-w-0 text-start">
            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              {eyebrow}
            </p>
            <h2
              id="content-section-heading"
              className="text-3xl font-bold tracking-tight text-balance text-foreground md:text-5xl"
            >
              {title}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-end">
            {description}
          </p>
        </div>

        <ol className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="group relative overflow-hidden rounded-[16px] border border-border/70 bg-card p-5 shadow-soft transition-transform duration-300 hover:-translate-y-1 sm:p-6 md:p-8"
              style={{
                backgroundColor: "var(--card)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary/30 opacity-80 rtl:bg-gradient-to-l"
              />
              <span className="mb-5 block font-mono text-4xl font-semibold tracking-tighter text-muted-foreground/25 tabular-nums transition-colors group-hover:text-primary/30 sm:mb-8 sm:text-5xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-3 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

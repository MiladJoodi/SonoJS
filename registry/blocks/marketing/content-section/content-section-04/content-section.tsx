import type * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const DEFAULT_FEATURES = [
  {
    title: "Exclusive Components",
    description:
      "Custom-built, high-performance UI pieces tailored for professional editorial and product workflows.",
    href: "#",
    featured: true,
  },
  {
    title: "Full Template Downloads",
    description:
      "Complete project starters—from dashboards to long-form layouts—ready the moment you need them.",
    href: "#",
  },
  {
    title: "Early Feature Access",
    description:
      "Ship tomorrow’s tools today. Preview integrations before they hit the public catalog.",
    href: "#",
  },
  {
    title: "Priority Support",
    description:
      "Skip the queue with a dedicated line to the engineers who built the system.",
    href: "#",
  },
  {
    title: "No Attribution",
    description:
      "Ship under your brand. Remove watermarks and keep the focus on your product.",
    href: "#",
  },
  {
    title: "Commercial Use License",
    description:
      "Client work, SaaS, and enterprise apps—full commercial freedom included.",
    href: "#",
  },
] as const

export type ContentSectionFeature = {
  title: string
  description: string
  href: string
  featured?: boolean
}

export default function ContentSection({
  eyebrow = "Premium plan",
  title = "Unlock Premium Features",
  description = "More control, flexibility, and performance—tools that help you build faster without compromising craft.",
  features = DEFAULT_FEATURES,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  features?: readonly ContentSectionFeature[]
}) {
  const [featured, ...rest] = features

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
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          {eyebrow}
        </p>
        <h2
          id="content-section-heading"
          className="mb-4 text-3xl font-bold tracking-tight text-balance text-foreground md:text-5xl"
        >
          {title}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {featured ? (
          <a
            href={featured.href}
            className="group relative flex min-h-0 cursor-pointer flex-col justify-between overflow-hidden rounded-[16px] border border-border/70 bg-zinc-950 p-5 text-start shadow-soft transition-transform duration-300 hover:-translate-y-0.5 sm:p-6 md:col-span-2 md:min-h-[280px] md:p-8 lg:col-span-2 dark:border-zinc-800"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 55% 60% at 100% 0%, color-mix(in oklab, var(--primary) 35%, transparent), transparent 70%)",
              }}
            />
            <div className="relative min-w-0">
              <p className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase sm:mb-4">
                Featured
              </p>
              <h3 className="mb-3 text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">
                {featured.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                {featured.description}
              </p>
            </div>
            <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white sm:mt-8">
              Learn more
              <ArrowUpRightIcon className="size-4 icon-dir" aria-hidden />
            </span>
          </a>
        ) : null}

        {rest.map((feature, index) => (
          <a
            key={feature.title}
            href={feature.href}
            className="group flex min-w-0 cursor-pointer flex-col rounded-[16px] border border-border/70 bg-card p-5 shadow-soft transition-colors hover:border-primary/40 sm:p-6"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <span className="mb-5 inline-flex size-9 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground tabular-nums">
              {String(index + 2).padStart(2, "0")}
            </span>
            <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
              {feature.title}
            </h3>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-primary/80">
              Learn more
              <ArrowUpRightIcon className="size-3.5 icon-dir" aria-hidden />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const DEFAULT_PLANS = [
  {
    title: "Starter",
    description: "For individuals and small teams getting started.",
    price: "$10",
    period: "/ month",
    features: [
      "50 page unlocks",
      "10 GB storage",
      "6 team members",
      "Unlimited bookmarks",
      "Core features included",
    ],
    featured: false,
    cta: "Get started",
    href: "#",
  },
  {
    title: "Professional",
    description: "For growing teams that need more room to scale.",
    price: "$20",
    period: "/ month",
    features: [
      "100 page unlocks",
      "20 GB storage",
      "8 team members",
      "Unlimited bookmarks",
      "Core features included",
    ],
    featured: true,
    badge: "Most popular",
    cta: "Get started",
    href: "#",
  },
  {
    title: "Business",
    description: "For larger orgs with multi-team collaboration needs.",
    price: "$100",
    period: "/ month",
    features: [
      "300 page unlocks",
      "100 GB storage",
      "100 team members",
      "Unlimited bookmarks",
      "Core features included",
    ],
    featured: false,
    cta: "Get started",
    href: "#",
  },
] as const

function CheckIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 511.985 511.985"
      className={cn("size-2.5 shrink-0 overflow-visible fill-current", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0s-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899s20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435" />
    </svg>
  )
}

type Plan = {
  title: string
  description: string
  price: string
  period?: string
  features: string[]
  featured?: boolean
  badge?: string
  cta?: string
  href?: string
}

export default function Pricing({
  title = "Choose the right plan for you",
  eyebrow = "Pricing",
  description = "Flexible plans designed for individuals, teams, and growing businesses.",
  plans = DEFAULT_PLANS as unknown as Plan[],
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  eyebrow?: string
  description?: string
  plans?: Plan[]
}) {
  return (
    <section
      className={cn("relative w-full overflow-visible px-4 md:px-8", className)}
      aria-labelledby="pricing-heading"
      {...props}
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h2
            id="pricing-heading"
            className="mb-4 text-3xl font-semibold tracking-tight text-balance text-foreground md:text-[2.5rem] md:leading-[1.15]"
          >
            {title}
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <ul className="mx-auto grid w-full gap-5 pb-2 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch lg:gap-6 lg:pb-4">
          {plans.map((plan) => (
            <li
              key={plan.title}
              className={cn(
                "group relative flex flex-col rounded-[12px] border border-border/70 bg-card p-5 shadow-soft transition-[box-shadow,transform,border-color] duration-300 sm:p-7",
                plan.featured
                  ? "z-10 border-primary shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)] ring-1 ring-primary/25 dark:shadow-[0_18px_40px_-18px_rgba(57,110,240,0.4)]"
                  : "hover:-translate-y-0.5 hover:border-border hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]"
              )}
            >
              {plan.featured ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[12px] bg-gradient-to-r from-transparent via-primary to-transparent"
                />
              ) : null}

              <div className="flex flex-1 flex-col text-start">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {plan.title}
                  </h3>
                  {plan.featured && plan.badge ? (
                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-primary-foreground uppercase">
                      {plan.badge}
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>

                <div className="mt-8 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period ?? "/ month"}
                  </span>
                </div>

                <div className="my-7 h-px w-full bg-border/70" />

                <div className="flex-1">
                  <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    Includes
                  </p>

                  <ul className="mt-5 space-y-3.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm font-medium text-foreground"
                      >
                        <span className="mt-0.5 inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
                          <CheckIcon />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  asChild
                  variant={plan.featured ? "default" : "outline"}
                  className="mt-8 w-full"
                >
                  <a href={plan.href ?? "#"}>{plan.cta ?? "Get started"}</a>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}


import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type Plan = {
  title: string
  price: string
  period?: string
  features: string[]
  featured?: boolean
  cta?: string
  href?: string
}

const DEFAULT_PLANS: Plan[] = [
  {
    title: "Individual plan",
    price: "$10",
    period: "/ month",
    featured: false,
    features: [
      "50 page unlocks",
      "10 GB storage",
      "6 team members",
      "Priority email support",
      "Access on all devices",
      "Export to PDF",
    ],
    cta: "Get started",
    href: "#",
  },
  {
    title: "Business plan",
    price: "$20",
    period: "/ month",
    featured: true,
    features: [
      "100 page unlocks",
      "20 GB storage",
      "10 team members",
      "Unlimited bookmarks",
      "Unlimited core features",
      "Priority chat + email support",
      "Advanced analytics dashboard",
      "Team roles & permissions",
    ],
    cta: "Get started",
    href: "#",
  },
]

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

export default function Pricing({
  title = "Choose the right plan for you",
  eyebrow = "Pricing",
  description = "Flexible plans designed for individuals, teams, and growing businesses.",
  plans = DEFAULT_PLANS,
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
      <div className="relative mx-auto max-w-4xl">
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

        <ul className="mx-auto grid w-full items-stretch gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <li
              key={plan.title}
              className={cn(
                "relative flex flex-col rounded-[12px] border p-5 sm:p-7",
                plan.featured
                  ? "z-10 border-zinc-800 bg-zinc-950 text-zinc-50 shadow-[0_28px_56px_-28px_rgba(0,0,0,0.55)] dark:border-zinc-700"
                  : "border-border/70 bg-card text-foreground shadow-soft"
              )}
            >
              {plan.featured ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-zinc-400/50 to-transparent"
                />
              ) : null}

              <div className="flex flex-1 flex-col text-start">
                <div className="mb-6 flex min-h-6 items-center">
                  {plan.featured ? (
                    <span className="inline-flex rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-zinc-300 uppercase">
                      Recommended
                    </span>
                  ) : null}
                </div>

                <p className="flex items-baseline gap-1.5">
                  <span
                    className={cn(
                      "text-4xl font-semibold tracking-tight sm:text-5xl",
                      plan.featured ? "text-zinc-50" : "text-foreground"
                    )}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-normal",
                      plan.featured ? "text-zinc-400" : "text-muted-foreground"
                    )}
                  >
                    {plan.period ?? "/ month"}
                  </span>
                </p>

                <p
                  className={cn(
                    "mt-6 text-lg font-semibold tracking-tight",
                    plan.featured ? "text-zinc-50" : "text-foreground"
                  )}
                >
                  {plan.title}
                </p>

                <ul className="mt-6 flex-1 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-center gap-3 text-sm font-medium",
                        plan.featured ? "text-zinc-300" : "text-muted-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex size-[18px] shrink-0 items-center justify-center rounded-full",
                          plan.featured
                            ? "bg-emerald-400/15 text-emerald-400"
                            : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400"
                        )}
                      >
                        <CheckIcon />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

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


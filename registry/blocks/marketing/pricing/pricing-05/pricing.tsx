"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type BillingCycle = "monthly" | "yearly"

type Plan = {
  title: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  featured?: boolean
  cta?: string
  href?: string
}

const DEFAULT_PLANS: Plan[] = [
  {
    title: "Basic",
    monthlyPrice: 4.5,
    yearlyPrice: 45,
    features: [
      "50 image generations",
      "500 credits",
      "Monthly 100 credits free",
      "Customer support",
      "Dedicated server",
      "Priority generations",
    ],
    featured: false,
    cta: "Get started",
    href: "#",
  },
  {
    title: "Startup",
    monthlyPrice: 14.5,
    yearlyPrice: 145,
    features: [
      "200 image generations",
      "1,200 credits",
      "Monthly 1,000 credits free",
      "Customer support",
      "Dedicated server",
      "Priority generations",
      "150 GB cloud storage",
    ],
    featured: true,
    cta: "Get started",
    href: "#",
  },
  {
    title: "Enterprise",
    monthlyPrice: 24.5,
    yearlyPrice: 245,
    features: [
      "400 image generations",
      "2,000 credits",
      "Monthly 1,500 credits free",
      "Customer support",
      "Dedicated server",
      "Priority generations",
      "500 GB cloud storage",
    ],
    featured: false,
    cta: "Get started",
    href: "#",
  },
]

function CheckIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 511.985 511.985"
      className={cn("size-2.5 overflow-visible fill-current", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0s-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899s20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435" />
    </svg>
  )
}

function formatPrice(value: number) {
  return value.toFixed(2)
}

export default function Pricing({
  title = "Choose the right plan for you",
  eyebrow = "Pricing",
  description = "Flexible plans designed for individuals, teams, and growing businesses.",
  plans = DEFAULT_PLANS,
  defaultBilling = "monthly" as BillingCycle,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  eyebrow?: string
  description?: string
  plans?: Plan[]
  defaultBilling?: BillingCycle
}) {
  const [billingCycle, setBillingCycle] =
    React.useState<BillingCycle>(defaultBilling)

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

        <div className="mx-auto mb-12 flex flex-col items-center gap-3">
          <div
            className="flex w-max rounded-full border border-border/70 bg-card/80 p-1 shadow-soft backdrop-blur-sm"
            role="group"
            aria-label="Billing cycle"
          >
            {(["monthly", "yearly"] as const).map((cycle) => {
              const active = billingCycle === cycle
              return (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setBillingCycle(cycle)}
                  aria-pressed={active}
                  className={cn(
                    "cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                    active
                      ? "bg-primary !text-white shadow-sm"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {cycle === "monthly" ? "Monthly" : "Yearly"}
                </button>
              )
            })}
          </div>
          {billingCycle === "yearly" ? (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              2 months free
            </span>
          ) : null}
        </div>

        <ul className="mx-auto grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => {
            const price =
              billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice
            const period = billingCycle === "yearly" ? "/ year" : "/ month"

            return (
              <li
                key={plan.title}
                className={cn(
                  "relative flex flex-col rounded-[12px] border bg-card p-5 shadow-soft transition-[box-shadow,transform] duration-300 sm:p-7",
                  plan.featured
                    ? "border-primary/50 ring-1 ring-primary/25 lg:-translate-y-1"
                    : "border-border/70 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.3)]"
                )}
              >
                {plan.featured ? (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                  />
                ) : null}

                <div className="flex h-full flex-col text-start">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {plan.title}
                    </h3>
                    {plan.featured ? (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-primary-foreground uppercase">
                        Popular
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-4xl font-semibold tracking-tight text-foreground">
                      ${formatPrice(price)}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {period}
                    </span>
                  </p>

                  <div className="my-7 h-px w-full bg-gradient-to-r from-border/80 via-border/40 to-transparent" />

                  <ul className="flex-1 space-y-3.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm font-medium text-foreground"
                      >
                        <span className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
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
            )
          })}
        </ul>
      </div>
    </section>
  )
}


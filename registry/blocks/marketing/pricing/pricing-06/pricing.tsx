"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type BillingCycle = "monthly" | "yearly"

type Plan = {
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  highlight?: boolean
  cta?: string
  href?: string
}

const DEFAULT_PLANS: Plan[] = [
  {
    name: "Starter",
    description: "Ideal for individuals.",
    monthlyPrice: 5,
    yearlyPrice: 50,
    features: [
      "50 image generations",
      "500 credits",
      "Customer support",
      "50 GB cloud storage",
      "Unlimited bookmarks",
      "Unlimited core features",
      "1-day file history",
      "2 team members",
    ],
    highlight: false,
    cta: "Get started",
    href: "#",
  },
  {
    name: "Professional",
    description: "Ideal for small teams.",
    monthlyPrice: 8,
    yearlyPrice: 80,
    features: [
      "100 image generations",
      "1,000 credits",
      "Customer support",
      "100 GB cloud storage",
      "Unlimited bookmarks",
      "Unlimited core features",
      "3-day file history",
      "4 team members",
    ],
    highlight: true,
    cta: "Get started",
    href: "#",
  },
  {
    name: "Enterprise",
    description: "Ideal for larger teams.",
    monthlyPrice: 20,
    yearlyPrice: 200,
    features: [
      "500 image generations",
      "5,000 credits",
      "Customer support",
      "500 GB cloud storage",
      "Unlimited bookmarks",
      "Unlimited core features",
      "7-day file history",
      "6 team members",
    ],
    highlight: false,
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
      <div className="relative mx-auto max-w-5xl">
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
            className="flex w-max rounded-full border border-border/70 bg-card p-1 shadow-soft"
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
        </div>

        <ul className="mx-auto grid w-full gap-5 overflow-visible md:grid-cols-2 lg:grid-cols-3 lg:items-center lg:gap-0 lg:py-6">
          {plans.map((plan) => {
            const price =
              billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
            const period = billingCycle === "monthly" ? "/ month" : "/ year"

            return (
              <li
                key={plan.name}
                className={cn(
                  "relative rounded-[12px] border p-5 transition-all sm:p-7 md:p-8",
                  plan.highlight
                    ? "z-10 border-primary/40 bg-card shadow-[0_28px_60px_-24px_rgba(37,99,235,0.4)] ring-1 ring-primary/20 lg:scale-[1.06] dark:shadow-[0_28px_60px_-24px_rgba(57,110,240,0.3)]"
                    : "border-border/70 bg-muted/40 dark:bg-muted/25"
                )}
              >
                {plan.highlight ? (
                  <>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                    />
                    <span className="mb-5 inline-flex rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-primary-foreground uppercase">
                      Best value
                    </span>
                  </>
                ) : null}

                <div className="text-start">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>

                  <p className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-3xl font-semibold tracking-tight text-foreground">
                      ${price.toFixed(2)}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {period}
                    </span>
                  </p>

                  <Button
                    asChild
                    variant={plan.highlight ? "default" : "outline"}
                    className="mt-8 w-full"
                  >
                    <a href={plan.href ?? "#"}>{plan.cta ?? "Get started"}</a>
                  </Button>

                  <div className="mt-10 mb-6 h-px w-full bg-border/70" />

                  <ul className="space-y-3.5">
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
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}


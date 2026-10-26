"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type BillingCycle = "monthly" | "yearly"

type Feature = {
  text: string
  included: boolean
}

type Plan = {
  name: string
  description: string
  monthlyPrice: string
  yearlyPrice: string
  features: Feature[]
  featured?: boolean
  cta?: string
  href?: string
}

const DEFAULT_PLANS: Plan[] = [
  {
    name: "Plus",
    description: "Ideal for individuals.",
    monthlyPrice: "10.00",
    yearlyPrice: "100.00",
    features: [
      { text: "50 image generations", included: true },
      { text: "500 credits", included: true },
      { text: "Customer support", included: true },
      { text: "50 GB cloud storage", included: true },
      { text: "Custom styles", included: false },
      { text: "Email support", included: false },
      { text: "7-day file history", included: false },
    ],
    featured: false,
    cta: "Get started",
    href: "#",
  },
  {
    name: "Family",
    description: "Ideal for friends & family.",
    monthlyPrice: "20.00",
    yearlyPrice: "200.00",
    features: [
      { text: "500 image generations", included: true },
      { text: "1,200 credits", included: true },
      { text: "Customer support", included: true },
      { text: "100 GB cloud storage", included: true },
      { text: "Custom styles", included: true },
      { text: "Email support", included: false },
      { text: "7-day file history", included: false },
    ],
    featured: true,
    cta: "Get started",
    href: "#",
  },
  {
    name: "Professional",
    description: "Ideal for professionals.",
    monthlyPrice: "18.00",
    yearlyPrice: "180.00",
    features: [
      { text: "500 image generations", included: true },
      { text: "800 credits", included: true },
      { text: "Customer support", included: true },
      { text: "90 GB cloud storage", included: true },
      { text: "Custom styles", included: true },
      { text: "Email support", included: true },
      { text: "7-day file history", included: true },
    ],
    featured: false,
    cta: "Get started",
    href: "#",
  },
]

function CheckIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 511.985 511.985"
      className={cn("size-2.5 overflow-visible fill-current", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0s-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899s20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435" />
    </svg>
  )
}

function CrossIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={cn("size-2.5 overflow-visible fill-current", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M108.75 428.25c-6.4 0-12.8-2.44-17.68-7.32-9.76-9.76-9.76-25.59 0-35.36l294.51-294.5c9.76-9.76 25.59-9.76 35.36 0 9.76 9.76 9.76 25.59 0 35.36l-294.52 294.5a24.9 24.9 0 0 1-17.67 7.32M403.25 428.25c-6.4 0-12.8-2.44-17.68-7.32L91.07 126.42c-9.76-9.76-9.76-25.59 0-35.36 9.76-9.76 25.59-9.76 35.36 0l294.51 294.51c9.76 9.76 9.76 25.59 0 35.36a24.97 24.97 0 0 1-17.69 7.32" />
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
      className={cn(
        "relative w-full overflow-visible px-4 py-12 md:px-8 md:py-16",
        className
      )}
      aria-labelledby="pricing-heading"
      {...props}
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
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
          <p
            className={cn(
              "text-xs font-medium tracking-wide transition-opacity",
              billingCycle === "yearly"
                ? "text-primary opacity-100"
                : "text-muted-foreground opacity-70"
            )}
          >
            Save up to 2 months with yearly billing
          </p>
        </div>

        <ul className="mx-auto grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => {
            const price =
              billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
            const period = billingCycle === "monthly" ? "/ month" : "/ year"

            return (
              <li
                key={plan.name}
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
                    className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                  />
                ) : null}

                <div className="text-start">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {plan.name}
                    </h3>
                    {plan.featured ? (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-primary-foreground uppercase">
                        Popular
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>
                  <p className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-4xl font-semibold tracking-tight text-foreground">
                      ${price}
                    </span>
                    <span className="text-sm text-muted-foreground">{period}</span>
                  </p>

                  <Button
                    asChild
                    variant={plan.featured ? "default" : "outline"}
                    className="mt-8 w-full"
                  >
                    <a href={plan.href ?? "#"}>{plan.cta ?? "Get started"}</a>
                  </Button>
                </div>

                <div className="my-7 h-px w-full bg-border/70" />

                <ul className="space-y-3.5 text-start">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.text}
                      className={cn(
                        "flex items-center gap-3 text-sm font-medium",
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex size-[18px] shrink-0 items-center justify-center rounded-full",
                          feature.included
                            ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400"
                            : "bg-destructive/10 text-destructive dark:bg-destructive/15"
                        )}
                        aria-hidden="true"
                      >
                        {feature.included ? <CheckIcon /> : <CrossIcon />}
                      </span>
                      <span
                        className={cn(!feature.included && "line-through decoration-border")}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}


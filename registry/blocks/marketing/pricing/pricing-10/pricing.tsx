"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type BillingCycle = "monthly" | "yearly"

type Plan = {
  name: string
  description: string
  monthlyPrice: string
  yearlyPrice: string
  featured?: boolean
  features: string[]
  cta?: string
  href?: string
}

const DEFAULT_PLANS: Plan[] = [
  {
    name: "Hobby",
    monthlyPrice: "10",
    yearlyPrice: "90",
    description: "Ideal for individuals who need quick access.",
    featured: false,
    features: [
      "50 image GI",
      "500 credits",
      "Monthly 100 credits",
      "Customer support",
      "50 GB cloud storage",
      "Access to new features",
      "Community access",
    ],
    cta: "Get started",
    href: "#",
  },
  {
    name: "Professional",
    monthlyPrice: "30",
    yearlyPrice: "290",
    description: "Ideal for advanced features and tools.",
    featured: false,
    features: [
      "500 image GI",
      "2,000 credits",
      "Monthly 1,000 credits",
      "Priority email support",
      "200 GB cloud storage",
      "Premium templates",
      "Beta features",
      "Team collaboration",
    ],
    cta: "Get started",
    href: "#",
  },
  {
    name: "Premium",
    monthlyPrice: "45",
    yearlyPrice: "450",
    description: "Best for power users and creators.",
    featured: true,
    features: [
      "2,000 image GI",
      "10,000 credits",
      "Monthly 5,000 credits",
      "Premium support",
      "500 GB cloud storage",
      "Advanced API access",
      "Workspace",
      "Multi-language GI",
    ],
    cta: "Get started",
    href: "#",
  },
  {
    name: "Enterprise",
    monthlyPrice: "75",
    yearlyPrice: "750",
    description: "Personalized services and security.",
    featured: false,
    features: [
      "Unlimited image GI",
      "Unlimited credits",
      "Dedicated account",
      "SLA-backed uptime",
      "Custom API limits",
      "Advanced permissions",
      "Private model hosting",
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
            className="flex w-max rounded-full bg-zinc-950 p-1 shadow-soft dark:bg-zinc-900 dark:ring-1 dark:ring-zinc-800"
            role="group"
            aria-label="Billing cycle"

              style={{
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
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
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  {cycle === "monthly" ? "Monthly" : "Yearly"}
                </button>
              )
            })}
          </div>
          {billingCycle === "yearly" ? (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Save ~17% yearly
            </span>
          ) : null}
        </div>

        <ul className="mx-auto grid w-full gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const price =
              billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice
            const period = billingCycle === "yearly" ? "/ year" : "/ month"

            return (
              <li
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-[12px] border p-5 shadow-soft transition-[box-shadow,transform] duration-300 sm:p-6",
                  plan.featured
                    ? "border-zinc-800 bg-zinc-950 text-zinc-50 lg:-translate-y-1 lg:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.55)]"
                    : "border-border/70 bg-card text-foreground hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.3)]"
                )}
              >
                {plan.featured ? (
                  <>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-zinc-400/60 to-transparent"
                    />
                    <span className="mb-4 inline-flex w-fit rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-zinc-300 uppercase">
                      Best seller
                    </span>
                  </>
                ) : null}

                <div className="text-start">
                  <h3
                    className={cn(
                      "mb-4 text-sm font-semibold tracking-wide uppercase",
                      plan.featured ? "text-zinc-400" : "text-muted-foreground"
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p className="flex items-baseline gap-1">
                    <span
                      className={cn(
                        "text-3xl font-semibold tracking-tight",
                        plan.featured ? "text-zinc-50" : "text-foreground"
                      )}
                    >
                      ${price}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        plan.featured ? "text-zinc-400" : "text-muted-foreground"
                      )}
                    >
                      {period}
                    </span>
                  </p>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed",
                      plan.featured ? "text-zinc-400" : "text-muted-foreground"
                    )}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="mt-7 flex flex-1 flex-col text-start">
                  <div
                    className={cn(
                      "mb-6 h-px w-full",
                      plan.featured ? "bg-zinc-800" : "bg-border/70"
                    )}
                  />

                  <ul className="flex-1 space-y-3.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={cn(
                          "flex items-center gap-3 text-sm font-medium",
                          plan.featured ? "text-zinc-300" : "text-foreground"
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
            )
          })}
        </ul>
      </div>
    </section>
  )
}


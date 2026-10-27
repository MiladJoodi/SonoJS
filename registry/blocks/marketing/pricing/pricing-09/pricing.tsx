import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type Plan = {
  name: string
  description: string
  price: string
  period?: string
  featured?: boolean
  features: string[]
  cta?: string
  href?: string
}

const DEFAULT_PLANS: Plan[] = [
  {
    name: "Starter",
    description: "Ideal for individuals who need quick access to basic features.",
    price: "10",
    period: "/ month",
    featured: false,
    features: [
      "50 image generations",
      "500 credits",
      "Monthly 100 credits free",
      "Customer support",
      "Dedicated server",
      "Priority generations",
      "50 GB cloud storage",
    ],
    cta: "Get started",
    href: "#",
  },
  {
    name: "Professional",
    description:
      "Ideal for individuals who need advanced features and tools.",
    price: "25",
    period: "/ month",
    featured: true,
    features: [
      "500 image generations",
      "1,000 credits",
      "Monthly 1,000 credits free",
      "Customer support",
      "Dedicated server",
      "Priority generations",
      "500 GB cloud storage",
    ],
    cta: "Get started",
    href: "#",
  },
  {
    name: "Enterprise",
    description:
      "Ideal for businesses who need personalized services and security.",
    price: "100",
    period: "/ month",
    featured: false,
    features: [
      "5,000 image generations",
      "10,000 credits",
      "Monthly 2,000 credits free",
      "Customer support",
      "Dedicated server",
      "Priority generations",
      "1,000 GB cloud storage",
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

        <ul className="mx-auto grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch lg:gap-6">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={cn(
                "relative rounded-[12px] border p-5 sm:p-7",
                plan.featured
                  ? "z-10 border-primary bg-primary text-primary-foreground shadow-[0_32px_64px_-28px_rgba(37,99,235,0.55)] lg:-translate-y-1 dark:shadow-[0_32px_64px_-28px_rgba(57,110,240,0.45)]"
                  : "border-border/70 bg-card text-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.3)] transition-[box-shadow,transform] duration-300"
              )}

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
              {plan.featured ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl"
                />
              ) : null}

              <div className="relative text-start">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={cn(
                      "text-xl font-semibold tracking-tight",
                      plan.featured
                        ? "text-primary-foreground"
                        : "text-foreground"
                    )}
                  >
                    {plan.name}
                  </h3>
                  {plan.featured ? (
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-primary-foreground uppercase backdrop-blur-sm">
                      Popular
                    </span>
                  ) : null}
                </div>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed",
                    plan.featured
                      ? "text-primary-foreground/85"
                      : "text-muted-foreground"
                  )}
                >
                  {plan.description}
                </p>

                <p className="mt-7 flex items-baseline gap-1.5">
                  <span
                    className={cn(
                      "text-5xl font-semibold tracking-tight",
                      plan.featured
                        ? "text-primary-foreground"
                        : "text-foreground"
                    )}
                  >
                    ${plan.price}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-normal",
                      plan.featured
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    )}
                  >
                    {plan.period ?? "/ month"}
                  </span>
                </p>

                <Button
                  asChild
                  variant={plan.featured ? "secondary" : "outline"}
                  className={cn(
                    "mt-8 w-full",
                    plan.featured &&
                      "border-transparent bg-white !text-zinc-950 hover:bg-white/90"
                  )}
                >
                  <a href={plan.href ?? "#"}>{plan.cta ?? "Get started"}</a>
                </Button>

                <div
                  className={cn(
                    "mt-10 mb-6 h-px w-full",
                    plan.featured ? "bg-white/20" : "bg-border/70"
                  )}
                />

                <ul
                  className={cn(
                    "space-y-3.5 text-sm font-medium",
                    plan.featured
                      ? "text-primary-foreground"
                      : "text-foreground"
                  )}
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-flex size-[18px] shrink-0 items-center justify-center rounded-full",
                          plan.featured
                            ? "bg-emerald-400/20 text-emerald-200"
                            : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400"
                        )}
                      >
                        <CheckIcon />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}


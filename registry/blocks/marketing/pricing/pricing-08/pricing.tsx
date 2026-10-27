import type * as React from "react"
import { Fragment } from "react"

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

type ComparisonValue = boolean | string

type ComparisonFeature = {
  label: string
  values: ComparisonValue[]
}

type ComparisonSection = {
  category: string
  features: ComparisonFeature[]
}

type TableHeader = {
  name: string
  sub: string
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

const DEFAULT_COMPARISON: ComparisonSection[] = [
  {
    category: "Access & collaboration",
    features: [
      {
        label: "Multi-user access",
        values: ["Up to 1 user", "Up to 5 users", "Unlimited team members"],
      },
      {
        label: "Role-based access",
        values: [false, "Basic roles", "Full RBAC"],
      },
      { label: "2FA", values: [false, true, true] },
      { label: "Single sign-on (SSO)", values: [false, false, true] },
      {
        label: "Activity logs",
        values: [false, "Last 7 days", "Full audit trail"],
      },
    ],
  },
  {
    category: "Resource limits",
    features: [
      {
        label: "Image generations",
        values: ["50 /mo", "500 /mo", "5,000 /mo"],
      },
      { label: "Storage (cloud)", values: ["50 GB", "500 GB", "1 TB"] },
      {
        label: "Compute power",
        values: [
          "Shared CPU",
          "Dedicated CPU + standard GPU",
          "High-perf GPU cluster",
        ],
      },
    ],
  },
  {
    category: "Tools & features",
    features: [
      { label: "Batch processing", values: [false, true, true] },
      { label: "API access", values: [false, "Rate-limited", "Full access"] },
    ],
  },
  {
    category: "Support & maintenance",
    features: [{ label: "SLA guarantee", values: [false, false, true] }],
  },
]

const DEFAULT_TABLE_HEADERS: TableHeader[] = [
  { name: "Starter", sub: "For individuals" },
  { name: "Professional", sub: "For small teams" },
  { name: "Enterprise", sub: "For organizations" },
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

function CrossIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn("size-2.5 shrink-0 overflow-visible fill-current", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M108.75 428.25c-6.4 0-12.8-2.44-17.68-7.32-9.76-9.76-9.76-25.59 0-35.36l294.51-294.5c9.76-9.76 25.59-9.76 35.36 0 9.76 9.76 9.76 25.59 0 35.36l-294.52 294.5a24.9 24.9 0 0 1-17.67 7.32" />
      <path d="M403.25 428.25c-6.4 0-12.8-2.44-17.68-7.32L91.07 126.42c-9.76-9.76-9.76-25.59 0-35.36 9.76-9.76 25.59-9.76 35.36 0l294.51 294.51c9.76 9.76 9.76 25.59 0 35.36a24.97 24.97 0 0 1-17.69 7.32" />
    </svg>
  )
}

function renderValue(value: ComparisonValue) {
  if (value === true) {
    return (
      <span className="inline-flex size-[18px] items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
        <span className="sr-only">Included</span>
        <CheckIcon className="fill-current" />
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex size-[18px] items-center justify-center rounded-full bg-destructive/10 text-destructive dark:bg-destructive/15">
        <span className="sr-only">Not included</span>
        <CrossIcon className="fill-current" />
      </span>
    )
  }
  return (
    <span className="text-start text-sm font-medium text-foreground">
      {value}
    </span>
  )
}

export default function Pricing({
  title = "Choose the right plan for you",
  eyebrow = "Pricing",
  description = "Flexible plans designed for individuals, teams, and growing businesses.",
  plans = DEFAULT_PLANS,
  comparison = DEFAULT_COMPARISON,
  tableHeaders = DEFAULT_TABLE_HEADERS,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  eyebrow?: string
  description?: string
  plans?: Plan[]
  comparison?: ComparisonSection[]
  tableHeaders?: TableHeader[]
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

        <ul className="mx-auto grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={cn(
                "relative rounded-[12px] border bg-card p-5 shadow-soft transition-[box-shadow,transform] duration-300 sm:p-7",
                plan.featured
                  ? "border-primary/50 ring-1 ring-primary/25 lg:-translate-y-1"
                  : "border-border/70 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.3)]"
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
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                />
              ) : null}

              <div className="text-start">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {plan.name}
                  </h3>
                  {plan.featured ? (
                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-primary-foreground uppercase">
                      Popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>

                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period ?? "/ month"}
                  </span>
                </p>

                <Button
                  asChild
                  variant={plan.featured ? "default" : "outline"}
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
          ))}
        </ul>

        <div className="mt-14 overflow-x-auto rounded-[12px] border border-border/70 bg-card shadow-soft md:mt-16"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
          <table className="w-full min-w-[800px] border-collapse text-start">
            <thead>
              <tr className="border-b border-border/70">
                <th className="w-[28%] px-5 py-5" />
                {tableHeaders.map((header) => (
                  <th
                    key={header.name}
                    scope="col"
                    className="px-5 py-5 text-start align-bottom"
                  >
                    <span className="block text-base font-semibold tracking-tight text-foreground">
                      {header.name}
                    </span>
                    <span className="mt-1 block text-sm font-normal text-muted-foreground">
                      {header.sub}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60">
              {comparison.map((section) => (
                <Fragment key={section.category}>
                  <tr className="bg-muted/40">
                    <td
                      colSpan={4}
                      className="px-5 py-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase"
                    >
                      {section.category}
                    </td>
                  </tr>
                  {section.features.map((feature) => (
                    <tr key={feature.label}>
                      <td className="px-5 py-4 text-start text-sm text-muted-foreground">
                        {feature.label}
                      </td>
                      {feature.values.map((value, index) => (
                        <td
                          key={`${feature.label}-${index}`}
                          className="px-5 py-4 text-start text-sm text-foreground"
                        >
                          {renderValue(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}


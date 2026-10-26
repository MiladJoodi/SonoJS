import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type Plan = {
  name: string
  price: string
  period?: string
  featured?: boolean
  cta?: string
  href?: string
}

type FeatureValue =
  | boolean
  | string
  | {
      text: string
      sub?: string
    }

type FeatureRow = {
  title: string
  values: FeatureValue[]
}

const DEFAULT_PLANS: Plan[] = [
  { name: "Starter", price: "10", featured: false, cta: "Choose plan", href: "#" },
  {
    name: "Professional",
    price: "25",
    featured: true,
    cta: "Choose plan",
    href: "#",
  },
  {
    name: "Enterprise",
    price: "40",
    featured: false,
    cta: "Choose plan",
    href: "#",
  },
]

const DEFAULT_FEATURES: FeatureRow[] = [
  {
    title: "Number of users",
    values: [
      "20 pages",
      { text: "600 pages", sub: "Add-ons on demand" },
      { text: "Unlimited", sub: "Add-ons on demand" },
    ],
  },
  {
    title: "Users per page",
    values: ["5 pages", "50 pages", "Unlimited"],
  },
  { title: "Essential features", values: [true, true, true] },
  { title: "Analytics and reporting", values: [true, true, true] },
  { title: "Secure data storage", values: [true, true, true] },
  { title: "Email support", values: [false, true, true] },
  { title: "Customizable options", values: [false, false, true] },
  { title: "API access", values: [false, false, true] },
  { title: "Team collaboration tools", values: [false, true, true] },
  { title: "Custom branding", values: [false, true, true] },
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

function CrossIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn("size-2.5 overflow-visible fill-current", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M108.75 428.25c-6.4 0-12.8-2.44-17.68-7.32-9.76-9.76-9.76-25.59 0-35.36l294.51-294.5c9.76-9.76 25.59-9.76 35.36 0 9.76 9.76 9.76 25.59 0 35.36l-294.52 294.5a24.9 24.9 0 0 1-17.67 7.32" />
      <path d="M403.25 428.25c-6.4 0-12.8-2.44-17.68-7.32L91.07 126.42c-9.76-9.76-9.76-25.59 0-35.36 9.76-9.76 25.59-9.76 35.36 0l294.51 294.51c9.76 9.76 9.76 25.59 0 35.36a24.97 24.97 0 0 1-17.69 7.32" />
    </svg>
  )
}

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex size-[18px] items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
        <span className="sr-only">Included</span>
        <CheckIcon />
      </span>
    ) : (
      <span className="inline-flex size-[18px] items-center justify-center rounded-full bg-destructive/10 text-destructive dark:bg-destructive/15">
        <span className="sr-only">Not included</span>
        <CrossIcon />
      </span>
    )
  }

  if (typeof value === "object") {
    return (
      <div className="text-center">
        <span className="font-medium text-foreground">{value.text}</span>
        {value.sub ? (
          <p className="mt-1 text-xs text-muted-foreground">{value.sub}</p>
        ) : null}
      </div>
    )
  }

  return <span className="font-medium text-foreground">{value}</span>
}

export default function Pricing({
  title = "Choose the right plan for you",
  eyebrow = "Compare",
  description = "Flexible plans designed for individuals, teams, and growing businesses.",
  compareLabel = "Compare plans",
  compareHint = "Flexible features designed to grow alongside your business.",
  plans = DEFAULT_PLANS,
  features = DEFAULT_FEATURES,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  eyebrow?: string
  description?: string
  compareLabel?: string
  compareHint?: string
  plans?: Plan[]
  features?: FeatureRow[]
}) {
  return (
    <section
      className={cn(
        "relative w-full overflow-visible px-4 py-12 md:px-8 md:py-16",
        className
      )}
      aria-labelledby="pricing-heading"
      {...props}
    >
      <div className="relative mx-auto max-w-7xl">
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

        <div className="overflow-x-auto rounded-[12px] border border-border/70 bg-card shadow-soft">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="border-b border-border/70">
                <th
                  scope="col"
                  className="max-w-[220px] border-e border-border/70 px-6 py-6 text-start align-top"
                >
                  <h3 className="text-base font-semibold tracking-tight text-foreground whitespace-nowrap md:text-lg">
                    {compareLabel}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed font-normal text-muted-foreground">
                    {compareHint}
                  </p>
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    scope="col"
                    className={cn(
                      "relative max-w-[200px] border-e border-border/70 px-5 py-6 text-center align-top last:border-e-0",
                      plan.featured && "bg-primary/[0.04]"
                    )}
                  >
                    {plan.featured ? (
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-0.5 bg-primary"
                      />
                    ) : null}
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase",
                        plan.featured
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {plan.name}
                      {plan.featured ? (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary-foreground normal-case">
                          Popular
                        </span>
                      ) : null}
                    </span>
                    <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                      ${plan.price}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        {plan.period ?? "/ month"}
                      </span>
                    </p>
                    <Button
                      asChild
                      variant={plan.featured ? "default" : "outline"}
                      size="sm"
                      className="mt-5 w-full"
                    >
                      <a href={plan.href ?? "#"}>
                        {plan.cta ?? "Choose plan"}
                      </a>
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.title}
                  className={cn(
                    "border-b border-border/70 last:border-b-0",
                    index % 2 === 1 && "bg-muted/25"
                  )}
                >
                  <th
                    scope="row"
                    className="border-e border-border/70 px-6 py-4 text-start text-sm font-medium text-foreground"
                  >
                    {feature.title}
                  </th>
                  {feature.values.map((value, valueIndex) => (
                    <td
                      key={`${feature.title}-${valueIndex}`}
                      className={cn(
                        "border-e border-border/70 px-4 py-4 text-center text-sm text-foreground last:border-e-0",
                        plans[valueIndex]?.featured && "bg-primary/[0.04]"
                      )}
                    >
                      <FeatureCell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}


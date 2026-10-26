import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type Plan = {
  name: string
  price: string
  sub: string
  buttonText: string
  primary?: boolean
  href?: string
}

type FeatureRow =
  | { category: string; name?: never; access?: never }
  | { category?: never; name: string; access: (boolean | string)[] }

const DEFAULT_PLANS: Plan[] = [
  {
    name: "Basic",
    price: "$0",
    sub: "free",
    buttonText: "Start for free",
    primary: false,
    href: "#",
  },
  {
    name: "Professional",
    price: "$10",
    sub: "/ month",
    buttonText: "Get Professional",
    primary: true,
    href: "#",
  },
  {
    name: "Enterprise",
    price: "$20",
    sub: "/ month",
    buttonText: "Get Enterprise",
    primary: false,
    href: "#",
  },
]

const DEFAULT_FEATURES: FeatureRow[] = [
  { category: "Usage" },
  { name: "Unlimited personal files", access: [true, true, true] },
  { name: "Generate public URLs", access: [true, true, true] },
  { name: "Access to the asset library", access: [true, true, true] },
  { name: "Remove logo from public URLs", access: [false, true, true] },
  { name: "Remove logo from embeds", access: [false, true, true] },

  { category: "Creation" },
  { name: "Generate textures with AI", access: [false, true, true] },
  { name: "Video materials and events", access: [false, true, true] },
  { name: "Export for iOS AR (USDZ)", access: [false, true, true] },
  { name: "Export for 3D printing", access: [false, true, true] },
  { name: "Export GLTF with materials", access: [false, true, true] },

  { category: "Collaboration" },
  { name: "Unlimited file viewers", access: [true, true, true] },
  { name: "Personal folders", access: [true, "Unlimited", "Unlimited"] },
  { name: "Team projects", access: ["1", "1", "Unlimited"] },
  { name: "Team files", access: ["2", "1", "Unlimited"] },
  { name: "Editors per personal file", access: ["2", "Unlimited", "Unlimited"] },
  { name: "Team folders", access: [false, false, "Unlimited"] },
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
      <path d="M108.75 428.25c-6.4 0-12.8-2.44-17.68-7.32-9.76-9.76-9.76-25.59 0-35.36l294.51-294.5c9.76-9.76 25.59-9.76 35.36 0 9.76 9.76 9.76 25.59 0 35.36l-294.52 294.5a24.9 24.9 0 0 1-17.67 7.32" />
      <path d="M403.25 428.25c-6.4 0-12.8-2.44-17.68-7.32L91.07 126.42c-9.76-9.76-9.76-25.59 0-35.36 9.76-9.76 25.59-9.76 35.36 0l294.51 294.51c9.76 9.76 9.76 25.59 0 35.36a24.97 24.97 0 0 1-17.69 7.32" />
    </svg>
  )
}

function AccessCell({ value }: { value: boolean | string }) {
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
  return (
    <p className="text-sm font-medium text-foreground">{value}</p>
  )
}

export default function Pricing({
  title = "Choose the right plan for you",
  eyebrow = "Compare",
  description = "Flexible plans designed for individuals, teams, and growing businesses.",
  compareLabel = "Compare plans",
  compareHint = "See what’s included in each plan.",
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
  const featuredIndex = plans.findIndex((plan) => plan.primary)

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

        <div className="overflow-x-auto rounded-[12px] border border-border/70 bg-card shadow-soft">
          <table className="w-full min-w-[720px] table-fixed border-collapse">
            <colgroup>
              <col />
              {plans.map((plan, index) => (
                <col
                  key={plan.name}
                  className={
                    index === featuredIndex ? "bg-primary/[0.04]" : undefined
                  }
                />
              ))}
            </colgroup>

            <thead>
              <tr className="border-b border-border/70">
                <th
                  scope="col"
                  className="w-[32%] border-e border-border/70 px-5 py-6 text-start align-bottom"
                >
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
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
                    className="relative px-4 py-6 text-center align-bottom"
                  >
                    {plan.primary ? (
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-primary"
                      />
                    ) : null}
                    <div className="flex flex-col items-center pt-2">
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <h3 className="text-base font-semibold tracking-tight text-foreground">
                          {plan.name}
                        </h3>
                        {plan.primary ? (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary-foreground uppercase">
                            Popular
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-4 flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-semibold tracking-tight text-foreground">
                          {plan.price}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          {plan.sub}
                        </span>
                      </p>
                      <Button
                        asChild
                        variant={plan.primary ? "default" : "outline"}
                        size="sm"
                        className="mt-6"
                      >
                        <a href={plan.href ?? "#"}>{plan.buttonText}</a>
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60">
              {features.map((feature, index) =>
                feature.category ? (
                  <tr key={`cat-${feature.category}-${index}`}>
                    <td className="px-5 pt-10 pb-3 text-start" colSpan={1}>
                      <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                        {feature.category}
                      </p>
                    </td>
                    <td />
                    <td />
                    <td />
                  </tr>
                ) : (
                  <tr key={`row-${feature.name}-${index}`}>
                    <td className="px-5 py-3.5 text-start">
                      <p className="text-sm font-medium text-foreground">
                        {feature.name}
                      </p>
                    </td>
                    {(feature.access ?? []).map((accessValue, accessIndex) => (
                      <td
                        key={`${feature.name}-${accessIndex}`}
                        className="relative px-4 py-3.5 text-center"
                      >
                        <AccessCell value={accessValue} />
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}


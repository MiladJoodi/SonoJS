"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  RadioGroup,
  RadioGroupItem,
} from "@sonojs/ui/components/radio-group"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$19",
    blurb: "For solo builders",
    features: ["1 workspace", "3 seats", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    blurb: "For growing teams",
    features: ["Unlimited projects", "10 seats", "Priority email"],
    current: true,
  },
  {
    id: "team",
    name: "Team",
    price: "$99",
    blurb: "For orgs shipping often",
    features: ["Unlimited seats", "SSO", "Dedicated support"],
  },
] as const

type PlanId = (typeof PLANS)[number]["id"]

export default function BillingSettings({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [plan, setPlan] = React.useState<PlanId>("pro")

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <section
        className="w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        aria-labelledby="billing-settings-03-heading"
      >
        <header className="border-b border-border/70 px-5 py-4 sm:px-6">
          <h1
            id="billing-settings-03-heading"
            className="text-base font-semibold tracking-tight text-start"
          >
            Change plan
          </h1>
          <p className="mt-1 text-sm text-muted-foreground text-start">
            Pick a plan. You can switch again anytime before the next renewal.
          </p>
        </header>

        <div className="px-5 py-5 sm:px-6">
          <RadioGroup
            value={plan}
            onValueChange={(value) => setPlan(value as PlanId)}
            className="gap-3"
            aria-label="Plans"
          >
            {PLANS.map((item) => {
              const selected = plan === item.id
              const inputId = `billing-settings-03-${item.id}`
              return (
                <label
                  key={item.id}
                  htmlFor={inputId}
                  className={cn(
                    "block cursor-pointer rounded-[12px] border p-4 transition-colors",
                    selected
                      ? "border-primary/40 bg-primary/5 ring-2 ring-primary/15"
                      : "border-border/70 hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem
                      id={inputId}
                      value={item.id}
                      className="mt-1 cursor-pointer"
                    />
                    <div className="min-w-0 flex-1 text-start">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {item.name}
                        </span>
                        {"current" in item && item.current ? (
                          <Badge variant="secondary">Current</Badge>
                        ) : null}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {item.blurb}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {item.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <CheckIcon
                              className="size-3.5 shrink-0 text-foreground"
                              aria-hidden
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="shrink-0 text-end">
                      <span
                        dir="ltr"
                        className="text-lg font-semibold text-foreground"
                      >
                        {item.price}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        /mo
                      </span>
                    </p>
                  </div>
                </label>
              )
            })}
          </RadioGroup>
        </div>

        <Separator />

        <div className="flex flex-col-reverse gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-end sm:px-6">
          <Button type="button" variant="ghost" className="cursor-pointer">
            Cancel
          </Button>
          <Button type="button" className="cursor-pointer">
            Continue with {PLANS.find((p) => p.id === plan)?.name}
          </Button>
        </div>
      </section>
    </div>
  )
}

"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

const triggerClass = cn(
  "h-10 min-h-10 flex-1 rounded-none border-0 px-4 text-sm font-medium",
  "text-muted-foreground shadow-none after:hidden after:opacity-0",
  "hover:text-foreground",
  "data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none",
  "first:rounded-s-[12px] last:rounded-e-[12px]"
)

function PlanCard({
  name,
  price,
  period,
  features,
  featured,
}: {
  name: string
  price: string
  period: string
  features: string[]
  featured?: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-[12px] border p-5",
        featured
          ? "border-primary/50 bg-primary/5"
          : "border-border/70 bg-canvas/50"
      )}
    >
      <p className="text-sm font-medium text-foreground">{name}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {price}
        <span className="text-sm font-normal text-muted-foreground">
          {" "}
          / {period}
        </span>
      </p>
      <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
        {features.map((f) => (
          <li key={f}>· {f}</li>
        ))}
      </ul>
      <Button
        className="mt-5 h-[46px] w-full rounded-[12px]"
        variant={featured ? "default" : "outline"}
      >
        Choose {name}
      </Button>
    </div>
  )
}

export default function TabsBlock({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto min-w-0 w-full max-w-3xl rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 md:p-6",
        className
      )}
      style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
      {...props}
    >
      <Tabs defaultValue="yearly" className="w-full items-center gap-6">
        <div className="w-full space-y-2 text-center">
          <h3 className="text-h4 text-foreground">Choose a billing cycle</h3>
          <p className="text-sm text-muted-foreground">
            Switch plans anytime. Yearly saves two months.
          </p>
        </div>

        <TabsList
          variant="line"
          aria-label="Billing cycle"
          className="mx-auto h-auto w-full max-w-md gap-0 overflow-x-auto overflow-y-hidden rounded-[12px] border border-border bg-canvas p-0"
        >
          <TabsTrigger value="monthly" className={triggerClass}>
            Monthly
          </TabsTrigger>
          <TabsTrigger
            value="yearly"
            className={cn(triggerClass, "border-s border-border")}
          >
            Yearly
            <span className="ms-1.5 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
              -17%
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="lifetime"
            className={cn(triggerClass, "border-s border-border")}
          >
            Lifetime
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="mt-0 w-full">
          <div className="grid gap-3 sm:grid-cols-2">
            <PlanCard
              name="Pro"
              price="$39"
              period="mo"
              features={["Unlimited projects", "Shared themes", "Email support"]}
            />
            <PlanCard
              name="Business"
              price="$79"
              period="mo"
              featured
              features={[
                "Everything in Pro",
                "SSO + audit log",
                "Priority support",
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="yearly" className="mt-0 w-full">
          <div className="grid gap-3 sm:grid-cols-2">
            <PlanCard
              name="Pro"
              price="$32"
              period="mo"
              features={["Unlimited projects", "Shared themes", "Email support"]}
            />
            <PlanCard
              name="Business"
              price="$66"
              period="mo"
              featured
              features={[
                "Everything in Pro",
                "SSO + audit log",
                "Priority support",
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="lifetime" className="mt-0 w-full">
          <div className="mx-auto max-w-md">
            <PlanCard
              name="Founder"
              price="$899"
              period="once"
              featured
              features={[
                "All Business features forever",
                "Early access releases",
                "Private Slack channel",
              ]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

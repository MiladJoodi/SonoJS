"use client"

import * as React from "react"
import { CheckIcon, CircleCheckIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import {
  RadioGroup,
  RadioGroupItem,
} from "@sonojs/ui/components/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const ORGANIZATIONS = [
  { value: "acme", label: "Acme, Inc." },
  { value: "hero", label: "Hero Labs" },
  { value: "rose", label: "Rose Holding" },
] as const

const REGIONS = [
  { value: "iad1", label: "US East (Virginia)" },
  { value: "sfo1", label: "US West (Oregon)" },
  { value: "fra1", label: "EU Central (Frankfurt)" },
  { value: "lhr1", label: "EU West (London)" },
  { value: "sin1", label: "Asia Pacific (Singapore)" },
] as const

const PLANS = [
  {
    id: "creator",
    name: "Creator",
    price: "$15",
    isRecommended: false,
    features: [
      "1 workspace, up to 3 members",
      "5GB asset storage",
      "Community support",
    ],
  },
  {
    id: "team",
    name: "Team",
    price: "$49",
    isRecommended: true,
    features: [
      "10 seats with role controls",
      "50GB asset storage",
      "Priority email support",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    price: "$99",
    isRecommended: false,
    features: [
      "Unlimited seats and workspaces",
      "250GB asset storage",
      "Dedicated account manager",
    ],
  },
] as const

const TIPS = [
  "Pick the region closest to your team",
  "You can change plan anytime",
  "Invite teammates right after create",
] as const

type PlanId = (typeof PLANS)[number]["id"]

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden>
      *
    </span>
  )
}

export default function WorkspaceSetup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [organization, setOrganization] = React.useState("acme")
  const [region, setRegion] = React.useState("iad1")
  const [plan, setPlan] = React.useState<PlanId>("team")

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-16",
        className
      )}
      {...props}
    >
      <form
        className="mx-auto w-full max-w-5xl"
        onSubmit={(event) => event.preventDefault()}
        aria-labelledby="workspace-setup-02-heading"
      >
        <header className="mb-8 text-start">
          <h1
            id="workspace-setup-02-heading"
            className="text-balance text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Create a workspace
          </h1>
          <p className="mt-1.5 max-w-2xl text-pretty text-sm text-muted-foreground">
            Choose an organization, region, and plan. You can invite teammates
            when you’re done.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-8 lg:col-span-7">
            <div className="space-y-5 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <Field className="md:w-1/3">
                  <FieldLabel htmlFor="workspace-setup-02-org">
                    Organization
                  </FieldLabel>
                  <Select
                    value={organization}
                    onValueChange={setOrganization}
                  >
                    <SelectTrigger
                      id="workspace-setup-02-org"
                      className="w-full cursor-pointer"
                    >
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORGANIZATIONS.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="cursor-pointer"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field className="md:w-2/3">
                  <FieldLabel htmlFor="workspace-setup-02-name">
                    Workspace name <RequiredMark />
                  </FieldLabel>
                  <Input
                    id="workspace-setup-02-name"
                    name="workspaceName"
                    type="text"
                    autoComplete="organization"
                    placeholder="Acme Design"
                    required
                    aria-required="true"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="workspace-setup-02-region">
                  Region
                </FieldLabel>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger
                    id="workspace-setup-02-region"
                    className="w-full cursor-pointer"
                  >
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className="cursor-pointer"
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>
                  Closest region usually means lower latency and clearer data
                  residency.
                </FieldDescription>
              </Field>
            </div>

            <div>
              <h2
                id="workspace-setup-02-plan-heading"
                className="text-balance font-medium"
              >
                Plan <RequiredMark />
              </h2>
              <RadioGroup
                className="mt-4 gap-3"
                value={plan}
                onValueChange={(value) => setPlan(value as PlanId)}
                aria-labelledby="workspace-setup-02-plan-heading"
              >
                {PLANS.map((item) => {
                  const selected = plan === item.id
                  const inputId = `workspace-setup-02-plan-${item.id}`
                  return (
                    <label
                      key={item.id}
                      htmlFor={inputId}
                      className={cn(
                        "relative block cursor-pointer overflow-hidden rounded-[12px] border bg-card transition-colors",
                        selected
                          ? "border-primary/40 shadow-soft ring-2 ring-primary/20"
                          : "border-border/70"
                      )}
                    >
                      <div className="flex items-start gap-4 px-5 py-4">
                        <RadioGroupItem
                          id={inputId}
                          value={item.id}
                          className="mt-1 cursor-pointer"
                        />
                        <div className="min-w-0 flex-1 text-start">
                          <p className="flex flex-wrap items-center gap-2 leading-6">
                            <span className="font-semibold text-foreground">
                              {item.name}
                            </span>
                            {item.isRecommended ? (
                              <Badge variant="secondary">Recommended</Badge>
                            ) : null}
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {item.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <CheckIcon
                                  className="mt-0.5 size-4 shrink-0"
                                  aria-hidden
                                />
                                <span>{feature}</span>
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
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft lg:sticky lg:top-6">
              <h2 className="text-sm font-semibold text-foreground">
                Before you create
              </h2>
              <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">
                Plans scale from solo creators to agencies. Every plan includes
                shared projects and role-aware invites.
              </p>
              <ul className="mt-4 space-y-1">
                {TIPS.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 py-1.5 text-foreground"
                  >
                    <CircleCheckIcon
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button type="button" variant="ghost" className="cursor-pointer">
            Cancel
          </Button>
          <Button type="submit" className="cursor-pointer">
            Create workspace
          </Button>
        </div>
      </form>
    </div>
  )
}

"use client"

import * as React from "react"
import {
  CheckIcon,
  CircleCheckIcon,
  ExternalLinkIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Card, CardContent } from "@sonojs/ui/components/card"
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

const HIGHLIGHTS = [
  "Ship registry components with one CLI command",
  "RTL-ready blocks that match your design tokens",
  "Team workspaces with shared private components",
] as const

const ORGANIZATIONS = [
  { value: "acme", label: "Acme, Inc." },
  { value: "hero", label: "Hero Labs" },
  { value: "rose", label: "Rose Holding" },
] as const

const REGIONS = [
  {
    value: "iad1",
    label: "us-east-1 (Washington, D.C., USA)",
  },
  {
    value: "sfo1",
    label: "us-west-1 (San Francisco, USA)",
  },
  {
    value: "fra1",
    label: "eu-central-1 (Frankfurt, Germany)",
  },
  {
    value: "lhr1",
    label: "eu-west-2 (London, United Kingdom)",
  },
  {
    value: "sin1",
    label: "ap-southeast-1 (Singapore)",
  },
] as const

const PLANS = [
  {
    id: "creator",
    name: "Creator",
    price: "$15",
    href: "/docs",
    isRecommended: false,
    features: [
      "1 workspace, up to 3 members",
      "Public registry installs",
      "5GB asset storage",
      "Community support",
    ],
  },
  {
    id: "team",
    name: "Team",
    price: "$49",
    href: "/docs",
    isRecommended: true,
    features: [
      "Unlimited private components",
      "10 seats with role controls",
      "50GB asset storage",
      "Priority email support",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    price: "$99",
    href: "/docs",
    isRecommended: false,
    features: [
      "Unlimited seats and workspaces",
      "Client portal access",
      "250GB asset storage",
      "White-label docs theme",
      "Dedicated account manager",
    ],
  },
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
}: React.ComponentProps<"section">) {
  const [organization, setOrganization] = React.useState("acme")
  const [region, setRegion] = React.useState("iad1")
  const [plan, setPlan] = React.useState<PlanId>("team")

  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden bg-white dark:bg-background py-10 text-foreground sm:py-12",
        className
      )}
      aria-labelledby="workspace-setup-02-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-16%] size-[24rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <form
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        onSubmit={(event) => event.preventDefault()}
      >
        <header className="text-start">
          <p className="mb-2 text-sm font-medium tracking-wide text-primary">
            Workspace
          </p>
          <h1
            id="workspace-setup-02-heading"
            className="text-balance text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Create a new SonoJS workspace
          </h1>
          <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground">
            Pick an organization, region, and plan. You can invite teammates
            right after the workspace is ready.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="space-y-5 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6 md:space-y-6">
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
                      className="w-full"
                    >
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORGANIZATIONS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
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
                    placeholder="Acme Design System"
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
                    className="w-full"
                  >
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>
                  Choose the region closest to your team for lower latency and
                  data residency.
                </FieldDescription>
              </Field>
            </div>

            <h2
              id="workspace-setup-02-plan-heading"
              className="mt-10 text-balance font-medium"
            >
              Plan type <RequiredMark />
            </h2>
            <RadioGroup
              className="mt-4 gap-4"
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
                        ? "border-primary/40 ring-2 ring-primary/20"
                        : "border-border/70"
                    )}
                  >
                    <div className="flex items-start gap-4 px-5 py-4 sm:px-6">
                      <RadioGroupItem
                        id={inputId}
                        value={item.id}
                        className="mt-1"
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
                                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                                aria-hidden
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-border/70 bg-muted/40 px-5 py-3 sm:px-6">
                      <a
                        href={item.href}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline hover:underline-offset-4"
                        onClick={(event) => event.stopPropagation()}
                      >
                        Learn more
                        <ExternalLinkIcon className="size-3.5" aria-hidden />
                      </a>
                      <p className="shrink-0">
                        <span
                          dir="ltr"
                          className="text-lg font-semibold text-foreground"
                        >
                          {item.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /mo
                        </span>
                      </p>
                    </div>
                  </label>
                )
              })}
            </RadioGroup>
          </div>

          <aside className="lg:col-span-5">
            <Card className="border-border/70 bg-muted/40 shadow-none">
              <CardContent className="p-6">
                <h2 className="text-balance text-sm font-semibold text-foreground">
                  Choose the right plan for your team
                </h2>
                <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">
                  Plans scale with how you use SonoJS — from solo creators to
                  agencies shipping client design systems. Every plan includes
                  the CLI, RTL blocks, and token-aligned components.
                </p>
                <ul className="mt-4 space-y-1">
                  {HIGHLIGHTS.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 py-1.5 text-foreground"
                    >
                      <CircleCheckIcon
                        className="mt-0.5 size-5 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/docs"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline hover:underline-offset-4"
                >
                  Compare plans
                  <ExternalLinkIcon className="size-3.5" aria-hidden />
                </a>
              </CardContent>
            </Card>
          </aside>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Create workspace</Button>
        </div>
      </form>
    </section>
  )
}

"use client"

import * as React from "react"
import {
  Building2Icon,
  CheckIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
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
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

const PLANS = [
  {
    id: "starter",
    title: "Starter",
    description: "Ship with the public registry while you evaluate the system.",
    price: "Free",
    priceHint: "forever",
    footnote: null,
    popular: false,
    icon: SparklesIcon,
    perks: ["1 workspace", "Community support", "Public installs"],
  },
  {
    id: "team",
    title: "Team",
    description: "Private components and priority email for product squads.",
    price: "$49",
    priceHint: "/month",
    footnote: "1",
    popular: true,
    icon: UsersIcon,
    perks: ["10 seats", "Private components", "Priority email"],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "SSO, a private mirror, and a dedicated success manager.",
    price: "Custom",
    priceHint: "quote",
    footnote: "2",
    popular: false,
    icon: Building2Icon,
    perks: ["SSO / SAML", "Private mirror", "Success manager"],
  },
] as const

type PlanId = (typeof PLANS)[number]["id"]

const COMPANY_SIZES = [
  { value: "1-9", label: "1–9" },
  { value: "10-50", label: "10–50" },
  { value: "51-250", label: "51–250" },
  { value: "250+", label: "250+" },
] as const

const USE_CASES = [
  { value: "design-system", label: "Design system / UI kit" },
  { value: "product-app", label: "Product application" },
  { value: "agency", label: "Agency / client work" },
  { value: "opensource", label: "Open source" },
  { value: "other", label: "Other" },
] as const

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden>
      *
    </span>
  )
}

export default function ApplicationForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [plan, setPlan] = React.useState<PlanId>("starter")
  const [companySize, setCompanySize] = React.useState("")
  const [useCase, setUseCase] = React.useState("")
  const [terms, setTerms] = React.useState(false)

  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden bg-canvas py-10 text-foreground sm:py-14",
        className
      )}
      aria-labelledby="application-form-01-heading"
      {...props}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute start-1/2 top-[-18%] size-[24rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <header className="text-start">
          <p className="mb-2 text-sm font-medium tracking-wide text-primary">
            Early access
          </p>
          <h1
            id="application-form-01-heading"
            className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Apply for SonoJS early access
          </h1>
          <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">
            Tell us about your team and pick a plan. We review applications
            within two business days — no credit card required to apply.
          </p>
        </header>

        <form
          className="mt-8 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-01-first-name">
                First name <RequiredMark />
              </FieldLabel>
              <Input
                id="application-form-01-first-name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Emma"
                required
                aria-required="true"
              />
            </Field>

            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-01-last-name">
                Last name <RequiredMark />
              </FieldLabel>
              <Input
                id="application-form-01-last-name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Crown"
                required
                aria-required="true"
              />
            </Field>

            <Field className="col-span-full">
              <FieldLabel htmlFor="application-form-01-email">
                Work email <RequiredMark />
              </FieldLabel>
              <Input
                id="application-form-01-email"
                name="email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="emma@acme.com"
                required
                aria-required="true"
              />
              <FieldDescription>
                We’ll send your invite and waitlist updates here.
              </FieldDescription>
            </Field>

            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-01-company">
                Company <RequiredMark />
              </FieldLabel>
              <Input
                id="application-form-01-company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Acme Inc."
                required
                aria-required="true"
              />
            </Field>

            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-01-size">
                Company size
              </FieldLabel>
              <Select value={companySize} onValueChange={setCompanySize}>
                <SelectTrigger
                  id="application-form-01-size"
                  className="w-full cursor-pointer"
                >
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_SIZES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field className="col-span-full">
              <FieldLabel htmlFor="application-form-01-use-case">
                Primary use case
              </FieldLabel>
              <Select value={useCase} onValueChange={setUseCase}>
                <SelectTrigger
                  id="application-form-01-use-case"
                  className="w-full cursor-pointer"
                >
                  <SelectValue placeholder="What are you building?" />
                </SelectTrigger>
                <SelectContent>
                  {USE_CASES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Separator className="col-span-full my-2" />

            <div className="col-span-full space-y-4">
              <div className="space-y-1">
                <FieldLabel
                  id="application-form-01-plan-label"
                  className="text-sm font-semibold text-foreground"
                >
                  Select a plan <RequiredMark />
                </FieldLabel>
                <p className="text-sm text-muted-foreground">
                  You can change this after approval — pick what fits today.
                </p>
              </div>

              <RadioGroup
                value={plan}
                onValueChange={(value) => setPlan(value as PlanId)}
                className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
                aria-labelledby="application-form-01-plan-label"
              >
                {PLANS.map((item) => {
                  const selected = plan === item.id
                  const inputId = `application-form-01-plan-${item.id}`
                  const Icon = item.icon
                  return (
                    <label
                      key={item.id}
                      htmlFor={inputId}
                      className={cn(
                        "group/plan relative flex min-h-[46px] cursor-pointer flex-col gap-4 overflow-hidden rounded-[12px] border border-border/70 bg-background p-4 transition-[border-color,box-shadow,background-color]",
                        "hover:border-border hover:bg-muted/40",
                        "has-focus-visible:ring-[3px] has-focus-visible:ring-ring/40",
                        selected &&
                          "border-primary bg-primary/5 shadow-soft ring-1 ring-primary/30 hover:border-primary hover:bg-primary/5"
                      )}
                    >
                      {item.popular ? (
                        <Badge className="absolute end-3 top-3 rounded-full">
                          Popular
                        </Badge>
                      ) : null}

                      <div className="flex items-start justify-between gap-3 pe-16 sm:pe-0">
                        <span
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-border/70 bg-card text-muted-foreground transition-colors",
                            selected &&
                              "border-primary/30 bg-primary/10 text-primary"
                          )}
                        >
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <RadioGroupItem
                          id={inputId}
                          value={item.id}
                          className="mt-1 cursor-pointer"
                        />
                      </div>

                      <div className="min-w-0 space-y-1 text-start">
                        <p className="text-sm font-semibold text-foreground">
                          {item.title}
                          {item.footnote ? (
                            <sup className="ms-0.5 text-xs text-muted-foreground">
                              {item.footnote}
                            </sup>
                          ) : null}
                        </p>
                        <p className="text-pretty text-sm leading-5 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>

                      <p
                        dir="ltr"
                        className="flex items-baseline gap-1 text-start tabular-nums"
                      >
                        <span className="text-2xl font-semibold tracking-tight text-foreground">
                          {item.price}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.priceHint}
                        </span>
                      </p>

                      <ul className="mt-auto space-y-2 border-t border-border/60 pt-3">
                        {item.perks.map((perk) => (
                          <li
                            key={perk}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckIcon
                              className={cn(
                                "mt-0.5 size-3.5 shrink-0",
                                selected ? "text-primary" : "text-foreground/50"
                              )}
                              aria-hidden
                            />
                            <span className="min-w-0 text-start">{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </label>
                  )
                })}
              </RadioGroup>

              <div className="space-y-1">
                <FieldDescription>
                  <sup>1</sup> Billed monthly after approval. Cancel anytime
                  during early access.
                </FieldDescription>
                <FieldDescription>
                  <sup>2</sup> We’ll schedule a short call — no credit card
                  required to apply.
                </FieldDescription>
              </div>
            </div>

            <Field className="col-span-full">
              <FieldLabel htmlFor="application-form-01-notes">
                Anything else?
              </FieldLabel>
              <Textarea
                id="application-form-01-notes"
                name="notes"
                rows={3}
                placeholder="Timeline, stack constraints, or links we should see…"
              />
            </Field>

            <div className="col-span-full flex items-start gap-3">
              <Checkbox
                id="application-form-01-terms"
                checked={terms}
                onCheckedChange={(v) => setTerms(v === true)}
                className="mt-0.5 cursor-pointer"
              />
              <label
                htmlFor="application-form-01-terms"
                className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  early access terms
                </a>{" "}
                and privacy policy.
              </label>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button type="button" variant="outline" className="cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer" disabled={!terms}>
              Submit application
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  BriefcaseBusinessIcon,
  CpuIcon,
  StoreIcon,
} from "lucide-react"

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

const PARTNERSHIP_TYPES = [
  {
    id: "reseller",
    title: "Reseller",
    eyebrow: "Go-to-market",
    description: "Sell SonoJS to your customers with margin and enablement.",
    icon: StoreIcon,
    outcomes: ["Partner margin", "Sales enablement", "Deal desk support"],
  },
  {
    id: "technology",
    title: "Technology",
    eyebrow: "Product",
    description: "Integrate or co-ship with a shared roadmap and APIs.",
    icon: CpuIcon,
    outcomes: ["API access", "Co-marketing", "Shared roadmap"],
  },
  {
    id: "agency",
    title: "Agency",
    eyebrow: "Services",
    description: "Build client work on SonoJS with partner pricing.",
    icon: BriefcaseBusinessIcon,
    outcomes: ["Partner pricing", "Certified builds", "Priority support"],
  },
] as const

type PartnershipId = (typeof PARTNERSHIP_TYPES)[number]["id"]

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "other", label: "Other" },
] as const

const COMPANY_SIZES = [
  { value: "1-9", label: "1–9" },
  { value: "10-50", label: "10–50" },
  { value: "51-250", label: "51–250" },
  { value: "250+", label: "250+" },
] as const

const QUARTERS = [
  { value: "q1", label: "Q1" },
  { value: "q2", label: "Q2" },
  { value: "q3", label: "Q3" },
  { value: "q4", label: "Q4" },
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
  const [partnership, setPartnership] =
    React.useState<PartnershipId>("reseller")
  const [country, setCountry] = React.useState("")
  const [size, setSize] = React.useState("")
  const [quarter, setQuarter] = React.useState("")
  const [terms, setTerms] = React.useState(false)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="application-form-03-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl">
        <header className="text-start">
          <p className="mb-2 text-sm font-medium tracking-wide text-primary">
            Partnerships
          </p>
          <h1
            id="application-form-03-heading"
            className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Apply to partner with us
          </h1>
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-6 text-muted-foreground">
            Tell us about your company and how you’d like to work together. Our
            partnerships team replies within five business days.
          </p>
        </header>

        <form
          className="mt-8 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-03-legal">
                Legal company name <RequiredMark />
              </FieldLabel>
              <Input
                id="application-form-03-legal"
                name="legalName"
                autoComplete="organization"
                placeholder="Acme Partners LLC"
                required
              />
            </Field>

            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-03-website">
                Website <RequiredMark />
              </FieldLabel>
              <Input
                id="application-form-03-website"
                name="website"
                type="url"
                dir="ltr"
                placeholder="https://acme.com"
                required
              />
            </Field>

            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-03-country">
                Country <RequiredMark />
              </FieldLabel>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger
                  id="application-form-03-country"
                  className="w-full cursor-pointer"
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-03-size">
                Company size
              </FieldLabel>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger
                  id="application-form-03-size"
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

            <Separator className="col-span-full my-2" />

            <div className="col-span-full space-y-4">
              <div className="space-y-1">
                <FieldLabel
                  id="application-form-03-type-label"
                  className="text-sm font-semibold"
                >
                  Partnership type <RequiredMark />
                </FieldLabel>
                <p className="text-sm text-muted-foreground">
                  Choose the motion that best matches how you go to market.
                </p>
              </div>
              <RadioGroup
                value={partnership}
                onValueChange={(v) => setPartnership(v as PartnershipId)}
                className="grid grid-cols-1 gap-3 md:grid-cols-3"
                aria-labelledby="application-form-03-type-label"
              >
                {PARTNERSHIP_TYPES.map((item) => {
                  const selected = partnership === item.id
                  const inputId = `application-form-03-type-${item.id}`
                  const Icon = item.icon
                  return (
                    <label
                      key={item.id}
                      htmlFor={inputId}
                      className={cn(
                        "group/type relative flex min-h-[46px] cursor-pointer flex-col gap-4 rounded-[12px] border border-border/70 bg-background p-4 transition-[border-color,box-shadow,background-color]",
                        "hover:border-border hover:bg-muted/40",
                        "has-focus-visible:ring-[3px] has-focus-visible:ring-ring/40",
                        selected &&
                          "border-primary bg-primary/5 shadow-soft ring-1 ring-primary/30 hover:border-primary hover:bg-primary/5"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={cn(
                            "flex size-11 shrink-0 items-center justify-center rounded-[12px] border border-dashed border-border/80 bg-card text-muted-foreground transition-colors",
                            selected &&
                              "border-solid border-primary/40 bg-primary/10 text-primary"
                          )}
                        >
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <RadioGroupItem
                          id={inputId}
                          value={item.id}
                          className="mt-1 cursor-pointer"
                        />
                      </div>

                      <div className="min-w-0 space-y-1.5 text-start">
                        <p className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                          {item.eyebrow}
                        </p>
                        <p className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground">
                          {item.title}
                          <ArrowUpRightIcon
                            className={cn(
                              "size-3.5 text-muted-foreground opacity-0 transition-opacity icon-dir",
                              "group-hover/type:opacity-100",
                              selected && "text-primary opacity-100"
                            )}
                            aria-hidden
                          />
                        </p>
                        <p className="text-pretty text-sm leading-5 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>

                      <ul className="mt-auto space-y-1.5 border-t border-border/60 pt-3">
                        {item.outcomes.map((outcome) => (
                          <li
                            key={outcome}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <span
                              className={cn(
                                "size-1.5 shrink-0 rounded-full bg-foreground/30",
                                selected && "bg-primary"
                              )}
                              aria-hidden
                            />
                            <span className="min-w-0 text-start">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </label>
                  )
                })}
              </RadioGroup>
            </div>

            <Field className="col-span-full">
              <FieldLabel htmlFor="application-form-03-brief">
                How would you work with us? <RequiredMark />
              </FieldLabel>
              <Textarea
                id="application-form-03-brief"
                name="brief"
                rows={4}
                placeholder="Channels, audience, and what a successful first year looks like…"
                required
              />
            </Field>

            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-03-quarter">
                Preferred start quarter
              </FieldLabel>
              <Select value={quarter} onValueChange={setQuarter}>
                <SelectTrigger
                  id="application-form-03-quarter"
                  className="w-full cursor-pointer"
                >
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  {QUARTERS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldDescription>
                Approximate — we confirm timing after review.
              </FieldDescription>
            </Field>

            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-03-contact">
                Partner contact email <RequiredMark />
              </FieldLabel>
              <Input
                id="application-form-03-contact"
                name="contactEmail"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="partners@acme.com"
                required
              />
            </Field>

            <div className="col-span-full flex items-start gap-3">
              <Checkbox
                id="application-form-03-terms"
                checked={terms}
                onCheckedChange={(v) => setTerms(v === true)}
                className="mt-0.5 cursor-pointer"
              />
              <label
                htmlFor="application-form-03-terms"
                className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
              >
                I agree to the partner program terms and NDA for evaluation
                materials.
              </label>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button type="button" variant="outline" className="cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer" disabled={!terms}>
              Submit partnership request
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

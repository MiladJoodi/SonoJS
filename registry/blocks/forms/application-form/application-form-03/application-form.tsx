"use client"

import * as React from "react"

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
    description: "Sell SonoJS to your customers with margin and enablement.",
  },
  {
    id: "technology",
    title: "Technology",
    description: "Integrate or co-ship product with shared roadmap.",
  },
  {
    id: "agency",
    title: "Agency",
    description: "Build client work on SonoJS with partner pricing.",
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
              <FieldLabel
                id="application-form-03-type-label"
                className="text-sm font-semibold"
              >
                Partnership type <RequiredMark />
              </FieldLabel>
              <RadioGroup
                value={partnership}
                onValueChange={(v) => setPartnership(v as PartnershipId)}
                className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                aria-labelledby="application-form-03-type-label"
              >
                {PARTNERSHIP_TYPES.map((item) => {
                  const selected = partnership === item.id
                  const inputId = `application-form-03-type-${item.id}`
                  return (
                    <label
                      key={item.id}
                      htmlFor={inputId}
                      className={cn(
                        "flex cursor-pointer flex-col gap-2 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft transition-colors",
                        selected && "border-primary bg-primary/5"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium">{item.title}</span>
                        <RadioGroupItem
                          id={inputId}
                          value={item.id}
                          className="mt-0.5 cursor-pointer"
                        />
                      </div>
                      <p className="text-pretty text-sm text-muted-foreground">
                        {item.description}
                      </p>
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

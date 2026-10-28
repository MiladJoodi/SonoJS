"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Field,
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

const STEPS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Background" },
  { id: 3, label: "Goals" },
] as const

const EXPERIENCE = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const

const HEARD = [
  { value: "friend", label: "Friend / colleague" },
  { value: "social", label: "Social media" },
  { value: "search", label: "Search" },
  { value: "newsletter", label: "Newsletter" },
  { value: "other", label: "Other" },
] as const

const COHORTS = [
  {
    id: "spring",
    title: "Spring cohort",
    description: "Starts March · 8 weeks · evening sessions",
  },
  {
    id: "fall",
    title: "Fall cohort",
    description: "Starts September · 8 weeks · evening sessions",
  },
] as const

type CohortId = (typeof COHORTS)[number]["id"]

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
  const [step, setStep] = React.useState(1)
  const [experience, setExperience] = React.useState("")
  const [heard, setHeard] = React.useState("")
  const [cohort, setCohort] = React.useState<CohortId>("spring")
  const [terms, setTerms] = React.useState(false)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="application-form-04-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl">
        <header className="text-start">
          <p className="mb-2 text-sm font-medium tracking-wide text-primary">
            Academy
          </p>
          <h1
            id="application-form-04-heading"
            className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Enroll in the design systems cohort
          </h1>
          <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">
            Three short steps. You’ll get a confirmation email after you submit.
          </p>
        </header>

        <form
          className="mt-8 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
          onSubmit={(event) => event.preventDefault()}
        >
          <nav
            aria-label="Enrollment steps"
            className="sticky top-0 z-10 border-b border-border/70 bg-card/95 px-4 py-4 backdrop-blur-sm sm:px-6"
          >
            <ol className="flex items-center gap-2 sm:gap-3">
              {STEPS.map((item, index) => {
                const done = step > item.id
                const current = step === item.id
                return (
                  <li
                    key={item.id}
                    className="flex min-w-0 flex-1 items-center gap-2"
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                        done && "bg-primary text-primary-foreground",
                        current &&
                          "bg-primary text-primary-foreground ring-2 ring-primary/30",
                        !done &&
                          !current &&
                          "bg-muted text-muted-foreground"
                      )}
                      aria-current={current ? "step" : undefined}
                    >
                      {done ? (
                        <Check className="size-3.5" aria-hidden />
                      ) : (
                        item.id
                      )}
                    </span>
                    <span
                      className={cn(
                        "hidden truncate text-sm font-medium sm:inline",
                        current ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                    {index < STEPS.length - 1 ? (
                      <span
                        aria-hidden
                        className="ms-auto hidden h-px min-w-4 flex-1 bg-border sm:block"
                      />
                    ) : null}
                  </li>
                )
              })}
            </ol>
          </nav>

          <div className="space-y-4 p-6 sm:p-8">
            {step === 1 ? (
              <>
                <Field>
                  <FieldLabel htmlFor="application-form-04-name">
                    Full name <RequiredMark />
                  </FieldLabel>
                  <Input
                    id="application-form-04-name"
                    name="fullName"
                    autoComplete="name"
                    placeholder="Sam Rivera"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="application-form-04-email">
                    Email <RequiredMark />
                  </FieldLabel>
                  <Input
                    id="application-form-04-email"
                    name="email"
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    placeholder="sam@example.com"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="application-form-04-city">
                    City
                  </FieldLabel>
                  <Input
                    id="application-form-04-city"
                    name="city"
                    autoComplete="address-level2"
                    placeholder="Berlin"
                  />
                </Field>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <Field>
                  <FieldLabel htmlFor="application-form-04-role">
                    Current role <RequiredMark />
                  </FieldLabel>
                  <Input
                    id="application-form-04-role"
                    name="role"
                    placeholder="Product designer"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="application-form-04-experience">
                    Experience level <RequiredMark />
                  </FieldLabel>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger
                      id="application-form-04-experience"
                      className="w-full cursor-pointer"
                    >
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="application-form-04-heard">
                    How did you hear about us?
                  </FieldLabel>
                  <Select value={heard} onValueChange={setHeard}>
                    <SelectTrigger
                      id="application-form-04-heard"
                      className="w-full cursor-pointer"
                    >
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {HEARD.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <Field>
                  <FieldLabel htmlFor="application-form-04-goals">
                    What do you want to learn? <RequiredMark />
                  </FieldLabel>
                  <Textarea
                    id="application-form-04-goals"
                    name="goals"
                    rows={4}
                    placeholder="Tokens, component APIs, docs culture…"
                    required
                  />
                </Field>

                <div className="space-y-3">
                  <FieldLabel
                    id="application-form-04-cohort-label"
                    className="text-sm font-semibold"
                  >
                    Cohort <RequiredMark />
                  </FieldLabel>
                  <RadioGroup
                    value={cohort}
                    onValueChange={(v) => setCohort(v as CohortId)}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                    aria-labelledby="application-form-04-cohort-label"
                  >
                    {COHORTS.map((item) => {
                      const selected = cohort === item.id
                      const inputId = `application-form-04-cohort-${item.id}`
                      return (
                        <label
                          key={item.id}
                          htmlFor={inputId}
                          className={cn(
                            "flex cursor-pointer flex-col gap-2 rounded-[12px] border border-border/70 p-4 shadow-soft transition-colors",
                            selected && "border-primary bg-primary/5"
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-sm font-medium">
                              {item.title}
                            </span>
                            <RadioGroupItem
                              id={inputId}
                              value={item.id}
                              className="mt-0.5 cursor-pointer"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </label>
                      )
                    })}
                  </RadioGroup>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <Checkbox
                    id="application-form-04-terms"
                    checked={terms}
                    onCheckedChange={(v) => setTerms(v === true)}
                    className="mt-0.5 cursor-pointer"
                  />
                  <label
                    htmlFor="application-form-04-terms"
                    className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
                  >
                    I agree to the cohort terms and code of conduct.
                  </label>
                </div>
              </>
            ) : null}
          </div>

          <Separator />

          <div className="flex flex-col-reverse gap-3 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 sm:pt-6">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              disabled={step === 1}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
            >
              Back
            </Button>
            {step < 3 ? (
              <Button
                type="button"
                className="cursor-pointer"
                onClick={() => setStep((s) => Math.min(3, s + 1))}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={!terms}
              >
                Submit enrollment
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

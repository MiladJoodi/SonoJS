"use client"

import * as React from "react"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

const EXPERIENCE = [
  { value: "0-2", label: "0–2 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "6-9", label: "6–9 years" },
  { value: "10+", label: "10+ years" },
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
  const [experience, setExperience] = React.useState("")
  const [consent, setConsent] = React.useState(false)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="application-form-02-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl">
        <header className="text-start">
          <p className="mb-2 text-sm font-medium tracking-wide text-primary">
            Careers
          </p>
          <h1
            id="application-form-02-heading"
            className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Apply for Product Designer
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="rounded-full border-transparent bg-primary/10 text-primary"
            >
              Remote
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full border-transparent bg-muted text-muted-foreground"
            >
              Full-time
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full border-transparent bg-muted text-muted-foreground"
            >
              Design
            </Badge>
          </div>
          <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground">
            Share a bit about yourself. We review every application and reply
            within one week.
          </p>
        </header>

        <form
          className="mt-8 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-02-name">
                Full name <RequiredMark />
              </FieldLabel>
              <Input
                id="application-form-02-name"
                name="fullName"
                autoComplete="name"
                placeholder="Jordan Lee"
                required
              />
            </Field>

            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-02-email">
                Email <RequiredMark />
              </FieldLabel>
              <Input
                id="application-form-02-email"
                name="email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="jordan@example.com"
                required
              />
            </Field>

            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-02-phone">Phone</FieldLabel>
              <Input
                id="application-form-02-phone"
                name="phone"
                type="tel"
                dir="ltr"
                autoComplete="tel"
                placeholder="+1 555 0100"
              />
            </Field>

            <Field className="col-span-full sm:col-span-3">
              <FieldLabel htmlFor="application-form-02-experience">
                Experience <RequiredMark />
              </FieldLabel>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger
                  id="application-form-02-experience"
                  className="w-full cursor-pointer"
                >
                  <SelectValue placeholder="Years of experience" />
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

            <Field className="col-span-full">
              <FieldLabel htmlFor="application-form-02-portfolio">
                Portfolio or LinkedIn <RequiredMark />
              </FieldLabel>
              <Input
                id="application-form-02-portfolio"
                name="portfolio"
                type="url"
                dir="ltr"
                placeholder="https://…"
                required
              />
            </Field>

            <Field className="col-span-full">
              <FieldLabel htmlFor="application-form-02-resume">
                Resume link
              </FieldLabel>
              <Input
                id="application-form-02-resume"
                name="resume"
                type="url"
                dir="ltr"
                placeholder="https://drive.google.com/…"
              />
              <FieldDescription>
                PDF preferred. Or paste a public Drive / Dropbox link.
              </FieldDescription>
            </Field>

            <Field className="col-span-full">
              <FieldLabel htmlFor="application-form-02-cover">
                Cover note
              </FieldLabel>
              <Textarea
                id="application-form-02-cover"
                name="cover"
                rows={4}
                placeholder="Why this role, and what you’d ship in the first 90 days…"
              />
            </Field>

            <div className="col-span-full flex items-start gap-3">
              <Checkbox
                id="application-form-02-consent"
                checked={consent}
                onCheckedChange={(v) => setConsent(v === true)}
                className="mt-0.5 cursor-pointer"
              />
              <label
                htmlFor="application-form-02-consent"
                className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
              >
                I consent to SonoJS storing my application for hiring purposes.
              </label>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button type="button" variant="outline" className="cursor-pointer">
              Save draft
            </Button>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={!consent}
            >
              Submit application
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@sonojs/ui/components/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const ROLES = [
  { value: "founder", label: "Founder / CEO" },
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "marketing", label: "Marketing" },
  { value: "ops", label: "Operations" },
  { value: "other", label: "Other" },
] as const

const TEAM_SIZES = [
  { value: "1", label: "Just me" },
  { value: "2-10", label: "2–10 people" },
  { value: "11-50", label: "11–50 people" },
  { value: "51-200", label: "51–200 people" },
  { value: "200+", label: "200+ people" },
] as const

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "de", label: "Germany" },
  { value: "nl", label: "Netherlands" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "in", label: "India" },
  { value: "au", label: "Australia" },
  { value: "other", label: "Other" },
] as const

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
}

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
  const [workspaceName, setWorkspaceName] = React.useState("")
  const [slug, setSlug] = React.useState("")
  const [slugTouched, setSlugTouched] = React.useState(false)
  const [role, setRole] = React.useState("")
  const [teamSize, setTeamSize] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [accepted, setAccepted] = React.useState(false)

  const onWorkspaceNameChange = (value: string) => {
    setWorkspaceName(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden bg-white dark:bg-background py-10 text-foreground sm:py-12",
        className
      )}
      aria-labelledby="workspace-setup-01-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[24rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <header className="text-start">
          <p className="mb-2 text-sm font-medium tracking-wide text-primary">
            Workspace
          </p>
          <h1
            id="workspace-setup-01-heading"
            className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Create your workspace
          </h1>
          <p className="mt-2 text-pretty text-sm text-muted-foreground">
            Set up your team’s SonoJS workspace — invite members and ship UI
            after you create it.
          </p>
        </header>

        <form
          className="mt-8 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8"
          onSubmit={(event) => event.preventDefault()}
          noValidate
        >
          <FieldGroup className="gap-6">
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <Field className="col-span-full sm:col-span-3">
                <FieldLabel htmlFor="workspace-setup-01-first-name">
                  First name <RequiredMark />
                </FieldLabel>
                <Input
                  id="workspace-setup-01-first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Jordan"
                  required
                  aria-required="true"
                />
              </Field>

              <Field className="col-span-full sm:col-span-3">
                <FieldLabel htmlFor="workspace-setup-01-last-name">
                  Last name <RequiredMark />
                </FieldLabel>
                <Input
                  id="workspace-setup-01-last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Lee"
                  required
                  aria-required="true"
                />
              </Field>

              <Field className="col-span-full">
                <FieldLabel htmlFor="workspace-setup-01-email">
                  Work email <RequiredMark />
                </FieldLabel>
                <Input
                  id="workspace-setup-01-email"
                  name="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  placeholder="jordan@acme.com"
                  required
                  aria-required="true"
                />
                <FieldDescription>
                  We’ll send the invite link and billing receipts here.
                </FieldDescription>
              </Field>

              <Field className="col-span-full">
                <FieldLabel htmlFor="workspace-setup-01-workspace">
                  Workspace name <RequiredMark />
                </FieldLabel>
                <Input
                  id="workspace-setup-01-workspace"
                  name="workspaceName"
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Design System"
                  value={workspaceName}
                  onChange={(e) => onWorkspaceNameChange(e.target.value)}
                  required
                  aria-required="true"
                />
              </Field>

              <Field className="col-span-full">
                <FieldLabel htmlFor="workspace-setup-01-slug">
                  Workspace URL <RequiredMark />
                </FieldLabel>
                <InputGroup dir="ltr">
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>app.sonojs.com/</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="workspace-setup-01-slug"
                    name="workspaceSlug"
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="acme"
                    value={slug}
                    onChange={(e) => {
                      setSlugTouched(true)
                      setSlug(slugify(e.target.value))
                    }}
                    required
                    aria-required="true"
                    aria-describedby="workspace-setup-01-slug-hint"
                  />
                </InputGroup>
                <FieldDescription id="workspace-setup-01-slug-hint">
                  Lowercase letters, numbers, and hyphens. You can change this
                  later in settings.
                </FieldDescription>
              </Field>

              <Field className="col-span-full sm:col-span-3">
                <FieldLabel htmlFor="workspace-setup-01-role">
                  Your role <RequiredMark />
                </FieldLabel>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger
                    id="workspace-setup-01-role"
                    className="w-full"
                    aria-required="true"
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field className="col-span-full sm:col-span-3">
                <FieldLabel htmlFor="workspace-setup-01-team-size">
                  Team size <RequiredMark />
                </FieldLabel>
                <Select value={teamSize} onValueChange={setTeamSize}>
                  <SelectTrigger
                    id="workspace-setup-01-team-size"
                    className="w-full"
                    aria-required="true"
                  >
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_SIZES.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field className="col-span-full sm:col-span-3">
                <FieldLabel htmlFor="workspace-setup-01-country">
                  Country / region <RequiredMark />
                </FieldLabel>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger
                    id="workspace-setup-01-country"
                    className="w-full"
                    aria-required="true"
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
                <FieldDescription>
                  Used for tax and data-residency defaults.
                </FieldDescription>
              </Field>

              <Field className="col-span-full sm:col-span-3">
                <FieldLabel htmlFor="workspace-setup-01-phone">
                  Phone{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  id="workspace-setup-01-phone"
                  name="phone"
                  type="tel"
                  dir="ltr"
                  autoComplete="tel"
                  placeholder="+1 415 555 0199"
                />
              </Field>
            </div>

            <Separator />

            <Field orientation="horizontal" className="items-start gap-3">
              <Checkbox
                id="workspace-setup-01-terms"
                checked={accepted}
                onCheckedChange={(value) => setAccepted(value === true)}
                aria-required="true"
              />
              <div className="grid gap-1.5 leading-none">
                <FieldLabel
                  htmlFor="workspace-setup-01-terms"
                  className="font-normal"
                >
                  I agree to the Terms of Service and Privacy Policy{" "}
                  <RequiredMark />
                </FieldLabel>
                <FieldDescription>
                  You can invite teammates right after the workspace is created.
                </FieldDescription>
              </div>
            </Field>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={!accepted}>
                Create workspace
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    </section>
  )
}

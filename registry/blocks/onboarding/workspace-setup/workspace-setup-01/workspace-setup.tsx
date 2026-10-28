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
}: React.ComponentProps<"div">) {
  const [workspaceName, setWorkspaceName] = React.useState("")
  const [slug, setSlug] = React.useState("")
  const [slugTouched, setSlugTouched] = React.useState(false)
  const [role, setRole] = React.useState("")
  const [teamSize, setTeamSize] = React.useState("")
  const [accepted, setAccepted] = React.useState(false)

  const onWorkspaceNameChange = (value: string) => {
    setWorkspaceName(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-16",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-lg">
        <form
          className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
          onSubmit={(event) => event.preventDefault()}
          noValidate
          aria-labelledby="workspace-setup-01-heading"
        >
          <header className="border-b border-border/70 px-5 py-5 text-start sm:px-8 sm:py-6">
            <h1
              id="workspace-setup-01-heading"
              className="text-balance text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Create your workspace
            </h1>
            <p className="mt-1.5 text-pretty text-sm text-muted-foreground">
              Name it, pick a URL, and tell us a bit about your team.
            </p>
          </header>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="workspace-setup-01-name">
                  Full name <RequiredMark />
                </FieldLabel>
                <Input
                  id="workspace-setup-01-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Jordan Lee"
                  required
                  aria-required="true"
                />
              </Field>

              <Field>
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
                  We’ll send invites and billing receipts here.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="workspace-setup-01-workspace">
                  Workspace name <RequiredMark />
                </FieldLabel>
                <Input
                  id="workspace-setup-01-workspace"
                  name="workspaceName"
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Design"
                  value={workspaceName}
                  onChange={(e) => onWorkspaceNameChange(e.target.value)}
                  required
                  aria-required="true"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="workspace-setup-01-slug">
                  Workspace URL <RequiredMark />
                </FieldLabel>
                <InputGroup dir="ltr">
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>app.example.com/</InputGroupText>
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
                  Lowercase letters, numbers, and hyphens.
                </FieldDescription>
              </Field>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="workspace-setup-01-role">
                    Your role <RequiredMark />
                  </FieldLabel>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger
                      id="workspace-setup-01-role"
                      className="w-full cursor-pointer"
                      aria-required="true"
                    >
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((item) => (
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

                <Field>
                  <FieldLabel htmlFor="workspace-setup-01-team-size">
                    Team size <RequiredMark />
                  </FieldLabel>
                  <Select value={teamSize} onValueChange={setTeamSize}>
                    <SelectTrigger
                      id="workspace-setup-01-team-size"
                      className="w-full cursor-pointer"
                      aria-required="true"
                    >
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEAM_SIZES.map((item) => (
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
              </div>

              <Separator />

              <Field orientation="horizontal" className="items-start gap-3">
                <Checkbox
                  id="workspace-setup-01-terms"
                  checked={accepted}
                  onCheckedChange={(value) => setAccepted(value === true)}
                  className="cursor-pointer"
                  aria-required="true"
                />
                <div className="grid gap-1 leading-none">
                  <FieldLabel
                    htmlFor="workspace-setup-01-terms"
                    className="cursor-pointer font-normal"
                  >
                    I agree to the Terms of Service and Privacy Policy{" "}
                    <RequiredMark />
                  </FieldLabel>
                  <FieldDescription>
                    You can invite teammates right after create.
                  </FieldDescription>
                </div>
              </Field>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!accepted}
                  className="cursor-pointer disabled:cursor-not-allowed"
                >
                  Create workspace
                </Button>
              </div>
            </FieldGroup>
          </div>
        </form>
      </div>
    </div>
  )
}

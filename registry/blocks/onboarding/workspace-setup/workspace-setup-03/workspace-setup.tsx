"use client"

import * as React from "react"
import {
  Building2Icon,
  CheckIcon,
  LayersIcon,
  UsersIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@sonojs/ui/components/input-group"
import { Input } from "@sonojs/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { cn } from "@/lib/utils"

const ROLES = [
  { value: "founder", label: "Founder / CEO" },
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "other", label: "Other" },
] as const

const POINTS = [
  { icon: UsersIcon, text: "Invite your team in one click" },
  { icon: LayersIcon, text: "Shared projects from day one" },
  { icon: Building2Icon, text: "Roles that match how you work" },
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
      <div className="mx-auto grid w-full max-w-4xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-2">
        <aside className="relative flex flex-col justify-between gap-8 bg-zinc-950 p-6 text-zinc-50 sm:p-8">
          <div className="space-y-4 text-start">
            <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary/20 text-primary">
              <Building2Icon className="size-5" aria-hidden />
            </span>
            <div className="space-y-2">
              <h1 className="text-h3 font-semibold tracking-tight">
                A home for your team
              </h1>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
                Create a workspace, claim a URL, and start collaborating —
                without a multi-step signup.
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {POINTS.map((item) => {
              const Icon = item.icon
              return (
                <li
                  key={item.text}
                  className="flex items-center gap-3 text-sm text-zinc-300"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white/10 text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  {item.text}
                </li>
              )
            })}
          </ul>

          <p className="flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-zinc-500">
            <CheckIcon className="size-3.5 shrink-0 text-primary" aria-hidden />
            Free to create · Upgrade anytime
          </p>
        </aside>

        <form
          className="flex min-w-0 flex-col p-5 sm:p-8"
          onSubmit={(event) => event.preventDefault()}
          noValidate
          aria-labelledby="workspace-setup-03-heading"
        >
          <header className="mb-6 text-start">
            <h2
              id="workspace-setup-03-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Create workspace
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A few details and you’re in.
            </p>
          </header>

          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel htmlFor="workspace-setup-03-workspace">
                Workspace name <RequiredMark />
              </FieldLabel>
              <Input
                id="workspace-setup-03-workspace"
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
              <FieldLabel htmlFor="workspace-setup-03-slug">
                Workspace URL <RequiredMark />
              </FieldLabel>
              <InputGroup dir="ltr">
                <InputGroupAddon align="inline-start">
                  <InputGroupText>app.example.com/</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="workspace-setup-03-slug"
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
                />
              </InputGroup>
              <FieldDescription>
                You can change this later in settings.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="workspace-setup-03-role">
                Your role <RequiredMark />
              </FieldLabel>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger
                  id="workspace-setup-03-role"
                  className="w-full cursor-pointer"
                  aria-required="true"
                >
                  <SelectValue placeholder="Select your role" />
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

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Button type="submit" className="w-full cursor-pointer sm:flex-1">
                Create workspace
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="cursor-pointer sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}

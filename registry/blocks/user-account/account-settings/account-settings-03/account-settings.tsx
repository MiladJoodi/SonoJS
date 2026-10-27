"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
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

const TIMEZONES = [
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Berlin", label: "Central Europe (CET)" },
  { value: "Asia/Dubai", label: "Gulf (GST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "UTC", label: "UTC" },
] as const

const TEAM_ALERTS = [
  {
    id: "account-settings-03-join-requests",
    name: "teamJoinRequests",
    label: "Team join requests",
    defaultChecked: true,
  },
  {
    id: "account-settings-03-role-changes",
    name: "teamRoleChanges",
    label: "Role and permission changes",
    defaultChecked: true,
  },
  {
    id: "account-settings-03-activity-digest",
    name: "teamActivityDigest",
    label: "Weekly team activity digest",
    defaultChecked: false,
  },
] as const

const USAGE_ALERTS = [
  {
    id: "account-settings-03-api-quota",
    name: "apiQuota",
    label: "API quota warnings (80% / 100%)",
    defaultChecked: true,
  },
  {
    id: "account-settings-03-cli-failures",
    name: "cliFailures",
    label: "Failed `sonojs add` installs",
    defaultChecked: true,
  },
  {
    id: "account-settings-03-registry-storage",
    name: "registryStorage",
    label: "Registry storage nearing limit",
    defaultChecked: true,
  },
  {
    id: "account-settings-03-billing-threshold",
    name: "billingThreshold",
    label: "Billing usage threshold",
    defaultChecked: false,
  },
] as const

function SectionIntro({
  title,
  description,
  titleId,
}: {
  title: string
  description: string
  titleId: string
}) {
  return (
    <div className="text-start">
      <h2
        id={titleId}
        className="text-balance font-semibold text-foreground"
      >
        {title}
      </h2>
      <p className="mt-1 text-pretty text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

function CheckboxRow({
  id,
  name,
  label,
  defaultChecked,
}: {
  id: string
  name: string
  label: string
  defaultChecked?: boolean
}) {
  const [checked, setChecked] = React.useState(!!defaultChecked)
  return (
    <div className="flex items-center gap-3 py-1.5">
      <Checkbox
        id={id}
        name={name}
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />
      <FieldLabel htmlFor={id} className="font-normal">
        {label}
      </FieldLabel>
    </div>
  )
}

export default function AccountSettings({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [timezone, setTimezone] = React.useState("America/New_York")
  const [visibility, setVisibility] = React.useState("invite")

  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden bg-white dark:bg-background py-10 text-foreground sm:py-12",
        className
      )}
      aria-labelledby="account-settings-03-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-16%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-start sm:mb-10">
          <p className="mb-2 text-sm font-medium tracking-wide text-primary">
            Settings
          </p>
          <h1
            id="account-settings-03-heading"
            className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Account, workspace & alerts
          </h1>
          <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
            Keep your profile current, set workspace defaults, and choose which
            team and usage emails you get.
          </p>
        </header>

        <form
          className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10"
            role="group"
            aria-labelledby="account-settings-03-personal-title"
          >
            <SectionIntro
              titleId="account-settings-03-personal-title"
              title="Personal information"
              description="How you appear to teammates and where we send account mail."
            />
            <div className="md:col-span-2 md:max-w-3xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                <Field className="col-span-full sm:col-span-3">
                  <FieldLabel htmlFor="account-settings-03-first-name">
                    First name
                  </FieldLabel>
                  <Input
                    id="account-settings-03-first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    defaultValue="Emma"
                    placeholder="Emma"
                  />
                </Field>
                <Field className="col-span-full sm:col-span-3">
                  <FieldLabel htmlFor="account-settings-03-last-name">
                    Last name
                  </FieldLabel>
                  <Input
                    id="account-settings-03-last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    defaultValue="Crown"
                    placeholder="Crown"
                  />
                </Field>
                <Field className="col-span-full">
                  <FieldLabel htmlFor="account-settings-03-email">
                    Work email
                  </FieldLabel>
                  <Input
                    id="account-settings-03-email"
                    name="email"
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    defaultValue="emma@acme.com"
                    placeholder="emma@acme.com"
                  />
                  <FieldDescription>
                    Used for login, invites, and billing receipts.
                  </FieldDescription>
                </Field>
                <Field className="col-span-full sm:col-span-3">
                  <FieldLabel htmlFor="account-settings-03-timezone">
                    Timezone
                  </FieldLabel>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger
                      id="account-settings-03-timezone"
                      className="w-full"
                    >
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Schedules and digests use this timezone.
                  </FieldDescription>
                </Field>
                <Field className="col-span-full sm:col-span-3">
                  <FieldLabel htmlFor="account-settings-03-role">
                    Role
                  </FieldLabel>
                  <Input
                    id="account-settings-03-role"
                    name="role"
                    type="text"
                    defaultValue="Workspace admin"
                    disabled
                  />
                  <FieldDescription>
                    Only an organization owner can change roles.
                  </FieldDescription>
                </Field>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10"
            role="group"
            aria-labelledby="account-settings-03-workspace-title"
          >
            <SectionIntro
              titleId="account-settings-03-workspace-title"
              title="Workspace settings"
              description="Defaults for your team’s SonoJS workspace name and who can find it."
            />
            <div className="md:col-span-2 md:max-w-3xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                <Field className="col-span-full sm:col-span-3">
                  <FieldLabel htmlFor="account-settings-03-workspace-name">
                    Workspace name
                  </FieldLabel>
                  <Input
                    id="account-settings-03-workspace-name"
                    name="workspaceName"
                    type="text"
                    autoComplete="organization"
                    defaultValue="Acme Design System"
                    placeholder="Acme Design System"
                  />
                </Field>
                <Field className="col-span-full sm:col-span-3">
                  <FieldLabel htmlFor="account-settings-03-visibility">
                    Visibility
                  </FieldLabel>
                  <Select value={visibility} onValueChange={setVisibility}>
                    <SelectTrigger
                      id="account-settings-03-visibility"
                      className="w-full"
                    >
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">
                        Private — members only
                      </SelectItem>
                      <SelectItem value="invite">
                        Invite-only — link required
                      </SelectItem>
                      <SelectItem value="public">
                        Public — discoverable
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field className="col-span-full">
                  <FieldLabel htmlFor="account-settings-03-workspace-description">
                    Internal description
                  </FieldLabel>
                  <Textarea
                    id="account-settings-03-workspace-description"
                    name="workspaceDescription"
                    rows={4}
                    defaultValue="Shared components, tokens, and docs for the Acme product team."
                    placeholder="What this workspace is for…"
                    className="min-h-24 resize-y"
                  />
                  <FieldDescription>
                    Shown only to members — not on public pages or the registry.
                  </FieldDescription>
                </Field>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10"
            role="group"
            aria-labelledby="account-settings-03-notify-title"
          >
            <SectionIntro
              titleId="account-settings-03-notify-title"
              title="Alert preferences"
              description="Pick the team and usage emails you want. Security and billing receipts always send."
            />
            <div className="md:col-span-2 md:max-w-3xl space-y-8">
              <FieldSet>
                <legend className="text-sm font-medium text-foreground">
                  Team
                </legend>
                <FieldDescription className="mt-1">
                  Membership, roles, and collaboration activity.
                </FieldDescription>
                <div className="mt-3">
                  {TEAM_ALERTS.map((item) => (
                    <CheckboxRow key={item.id} {...item} />
                  ))}
                </div>
              </FieldSet>

              <FieldSet>
                <legend className="text-sm font-medium text-foreground">
                  Usage
                </legend>
                <FieldDescription className="mt-1">
                  Quotas, CLI installs, storage, and spend thresholds.
                </FieldDescription>
                <div className="mt-3">
                  {USAGE_ALERTS.map((item) => (
                    <CheckboxRow key={item.id} {...item} />
                  ))}
                </div>
              </FieldSet>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button type="button" variant="outline">
              Discard
            </Button>
            <Button type="submit">Save settings</Button>
          </div>
        </form>
      </div>
    </section>
  )
}

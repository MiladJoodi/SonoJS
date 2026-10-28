"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
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

const DIGEST_OPTIONS = [
  {
    value: "weekly",
    id: "account-settings-02-digest-weekly",
    label: "Weekly digest",
    hint: "Product updates and tips every Monday",
  },
  {
    value: "monthly",
    id: "account-settings-02-digest-monthly",
    label: "Monthly summary",
    hint: "One email with highlights and changelog",
  },
  {
    value: "important",
    id: "account-settings-02-digest-important",
    label: "Important only",
    hint: "Security alerts and billing — nothing else",
  },
  {
    value: "never",
    id: "account-settings-02-digest-never",
    label: "Never",
    hint: "Turn off marketing and product emails",
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

export default function AccountSettings({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [timezone, setTimezone] = React.useState("America/New_York")
  const [visibility, setVisibility] = React.useState("invite")
  const [digest, setDigest] = React.useState("monthly")

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas py-8 text-foreground sm:py-10",
        className
      )}
      aria-labelledby="account-settings-02-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-1.5 text-start">
          <h1
            id="account-settings-02-heading"
            className="text-h3 font-semibold tracking-tight"
          >
            Account & workspace
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Update your profile, workspace defaults, and email digest.
          </p>
        </header>

        <form
          className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10"
            role="group"
            aria-labelledby="account-settings-02-personal-title"
          >
            <SectionIntro
              titleId="account-settings-02-personal-title"
              title="Personal information"
              description="How you appear to teammates and where we send account mail."
            />
            <div className="md:col-span-2 md:max-w-3xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                <Field className="col-span-full sm:col-span-3">
                  <FieldLabel htmlFor="account-settings-02-first-name">
                    First name
                  </FieldLabel>
                  <Input
                    id="account-settings-02-first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    defaultValue="Emma"
                    placeholder="Emma"
                  />
                </Field>
                <Field className="col-span-full sm:col-span-3">
                  <FieldLabel htmlFor="account-settings-02-last-name">
                    Last name
                  </FieldLabel>
                  <Input
                    id="account-settings-02-last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    defaultValue="Crown"
                    placeholder="Crown"
                  />
                </Field>
                <Field className="col-span-full">
                  <FieldLabel htmlFor="account-settings-02-email">
                    Work email
                  </FieldLabel>
                  <Input
                    id="account-settings-02-email"
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
                  <FieldLabel htmlFor="account-settings-02-timezone">
                    Timezone
                  </FieldLabel>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger
                      id="account-settings-02-timezone"
                      className="w-full cursor-pointer"
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
                  <FieldLabel htmlFor="account-settings-02-role">
                    Role
                  </FieldLabel>
                  <Input
                    id="account-settings-02-role"
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
            aria-labelledby="account-settings-02-workspace-title"
          >
            <SectionIntro
              titleId="account-settings-02-workspace-title"
              title="Workspace settings"
              description="Defaults for your team’s SonoJS workspace name and who can find it."
            />
            <div className="md:col-span-2 md:max-w-3xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                <Field className="col-span-full sm:col-span-3">
                  <FieldLabel htmlFor="account-settings-02-workspace-name">
                    Workspace name
                  </FieldLabel>
                  <Input
                    id="account-settings-02-workspace-name"
                    name="workspaceName"
                    type="text"
                    autoComplete="organization"
                    defaultValue="Acme Design System"
                    placeholder="Acme Design System"
                  />
                </Field>
                <Field className="col-span-full sm:col-span-3">
                  <FieldLabel htmlFor="account-settings-02-visibility">
                    Visibility
                  </FieldLabel>
                  <Select value={visibility} onValueChange={setVisibility}>
                    <SelectTrigger
                      id="account-settings-02-visibility"
                      className="w-full cursor-pointer"
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
                  <FieldLabel htmlFor="account-settings-02-workspace-description">
                    Internal description
                  </FieldLabel>
                  <Textarea
                    id="account-settings-02-workspace-description"
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
            aria-labelledby="account-settings-02-notify-title"
          >
            <SectionIntro
              titleId="account-settings-02-notify-title"
              title="Email preferences"
              description="Choose how often you get product updates. Security and billing emails always send."
            />
            <div className="md:col-span-2 md:max-w-3xl">
              <FieldSet>
                <legend className="text-sm font-medium text-foreground">
                  Product digest
                </legend>
                <FieldDescription
                  id="account-settings-02-digest-description"
                  className="mt-2"
                >
                  Changelog, tips, and new block announcements from SonoJS.
                </FieldDescription>
                <RadioGroup
                  className="mt-6 gap-4"
                  value={digest}
                  onValueChange={setDigest}
                  aria-describedby="account-settings-02-digest-description"
                >
                  {DIGEST_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-start gap-3"
                    >
                      <RadioGroupItem
                        id={option.id}
                        value={option.value}
                        className="mt-0.5 cursor-pointer"
                      />
                      <div className="grid gap-0.5">
                        <FieldLabel
                          htmlFor={option.id}
                          className="font-normal"
                        >
                          {option.label}
                        </FieldLabel>
                        <FieldDescription>{option.hint}</FieldDescription>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </FieldSet>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button type="button" variant="outline" className="cursor-pointer">
              Discard
            </Button>
            <Button type="submit" className="cursor-pointer">
              Save settings
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

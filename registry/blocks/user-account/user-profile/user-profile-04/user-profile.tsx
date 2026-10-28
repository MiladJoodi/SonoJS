"use client"

import * as React from "react"
import { BellIcon, LockIcon, UserIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
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

import avatarImg from "./images/avatar.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const NAV = [
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon },
  { id: "security", label: "Security", icon: LockIcon },
] as const

const TIMEZONES = [
  { value: "america-la", label: "Pacific Time (PT)" },
  { value: "america-ny", label: "Eastern Time (ET)" },
  { value: "europe-berlin", label: "Central European Time (CET)" },
  { value: "asia-tokyo", label: "Japan Standard Time (JST)" },
] as const

export default function UserProfile({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [section, setSection] = React.useState<(typeof NAV)[number]["id"]>(
    "profile"
  )
  const [timezone, setTimezone] = React.useState("europe-berlin")

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-8 text-foreground dark:bg-background sm:px-6 sm:py-10",
        className
      )}
      aria-labelledby="user-profile-04-heading"
      {...props}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card sm:flex-row">
        <aside className="border-b border-border/70 sm:w-52 sm:shrink-0 sm:border-e sm:border-b-0">
          <div className="flex items-center gap-3 border-b border-border/70 p-4">
            <Avatar className="size-10">
              <AvatarImage src={assetSrc(avatarImg)} alt="Noah Park" />
              <AvatarFallback>NP</AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-start">
              <p className="truncate text-sm font-semibold">Noah Park</p>
              <p className="truncate text-xs text-muted-foreground">
                Account settings
              </p>
            </div>
          </div>
          <nav aria-label="Account sections" className="p-2">
            <ul className="space-y-0.5">
              {NAV.map((item) => {
                const Icon = item.icon
                const active = section === item.id
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setSection(item.id)}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="size-3.5 shrink-0" aria-hidden />
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 flex-1 p-5 sm:p-6">
          <header className="text-start">
            <h1
              id="user-profile-04-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Profile
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Update how you appear across the workspace.
            </p>
          </header>

          <Separator className="my-5" />

          {section === "profile" ? (
            <form
              className="space-y-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="user-profile-04-name">
                    Display name
                  </FieldLabel>
                  <Input
                    id="user-profile-04-name"
                    name="name"
                    defaultValue="Noah Park"
                    autoComplete="name"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="user-profile-04-email">Email</FieldLabel>
                  <Input
                    id="user-profile-04-email"
                    name="email"
                    type="email"
                    dir="ltr"
                    defaultValue="noah@acme.com"
                    autoComplete="email"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="user-profile-04-bio">Bio</FieldLabel>
                <Textarea
                  id="user-profile-04-bio"
                  name="bio"
                  rows={3}
                  defaultValue="Product designer focused on systems, accessibility, and calm interfaces."
                />
                <FieldDescription>
                  Short blurb shown on your public profile.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="user-profile-04-tz">Timezone</FieldLabel>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger
                    id="user-profile-04-tz"
                    className="w-full cursor-pointer"
                  >
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button type="submit" className="cursor-pointer">
                  Save changes
                </Button>
              </div>
            </form>
          ) : (
            <div className="rounded-[12px] border border-dashed border-border/70 bg-muted/20 px-4 py-10 text-center">
              <p className="text-sm font-medium">
                {NAV.find((n) => n.id === section)?.label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Switch back to Profile to edit your public details.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4 cursor-pointer"
                onClick={() => setSection("profile")}
              >
                Back to Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

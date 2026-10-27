"use client"

import * as React from "react"
import { BellIcon, KeyIcon, ShieldIcon, UserIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import { Switch } from "@sonojs/ui/components/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

import avatarImg from "./images/avatar.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const NAV = [
  { value: "profile", label: "Profile", icon: UserIcon },
  { value: "security", label: "Security", icon: ShieldIcon },
  { value: "notifications", label: "Notifications", icon: BellIcon },
  { value: "api", label: "API Keys", icon: KeyIcon },
] as const

export default function AccountSettings({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "w-full min-w-0 bg-white dark:bg-background py-10 text-foreground",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2 text-start">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Account Settings
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your profile, security, and workspace preferences.
          </p>
        </div>

        <Tabs
          defaultValue="profile"
          orientation="vertical"
          className="flex flex-col gap-8 md:flex-row md:items-start"
        >
          <div className="w-full shrink-0 md:w-64">
            <TabsList
              aria-label="Account settings sections"
              className="h-auto w-full flex-row justify-start gap-1 overflow-x-auto bg-transparent p-0 md:flex-col md:overflow-visible"
            >
              {NAV.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="justify-start data-[state=active]:bg-muted"
                >
                  <item.icon aria-hidden />
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="min-w-0 flex-1">
            <TabsContent value="profile" className="mt-0">
              <Card className="gap-0 border-border/70 py-0 shadow-soft">
                <CardHeader className="border-b border-border/70 py-6">
                  <CardTitle>Public Profile</CardTitle>
                  <CardDescription>
                    This information will be displayed publicly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-6">
                  <FieldGroup className="gap-6">
                    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                      <Avatar className="size-20" size="lg">
                        <AvatarImage
                          src={assetSrc(avatarImg)}
                          alt="Alex Rivera"
                        />
                        <AvatarFallback>AR</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start gap-2">
                        <div className="flex flex-wrap gap-2">
                          <Button type="button" size="sm">
                            Change Avatar
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          JPG, GIF or PNG. 1MB max.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="account-settings-01-fname">
                          First Name
                        </FieldLabel>
                        <Input
                          id="account-settings-01-fname"
                          name="firstName"
                          defaultValue="Alex"
                          autoComplete="given-name"
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="account-settings-01-lname">
                          Last Name
                        </FieldLabel>
                        <Input
                          id="account-settings-01-lname"
                          name="lastName"
                          defaultValue="Rivera"
                          autoComplete="family-name"
                        />
                      </Field>
                    </div>

                    <Field>
                      <FieldLabel htmlFor="account-settings-01-email">
                        Email Address
                      </FieldLabel>
                      <Input
                        id="account-settings-01-email"
                        name="email"
                        type="email"
                        defaultValue="alex.rivera@example.com"
                        autoComplete="email"
                        dir="ltr"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="account-settings-01-bio">
                        Bio
                      </FieldLabel>
                      <Textarea
                        id="account-settings-01-bio"
                        name="bio"
                        rows={4}
                        defaultValue="Frontend engineer and UI designer."
                      />
                      <FieldDescription>
                        Brief description for your profile. URLs are
                        hyperlinked.
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </CardContent>
                <CardFooter className="justify-end border-t border-border/70 bg-muted/40 py-4">
                  <Button type="button">Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-0 space-y-6">
              <Card className="gap-0 border-border/70 py-0 shadow-soft">
                <CardHeader className="border-b border-border/70 py-6">
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Please enter your current password to change your password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-6">
                  <FieldGroup className="gap-4">
                    <Field>
                      <FieldLabel htmlFor="account-settings-01-current">
                        Current Password
                      </FieldLabel>
                      <Input
                        id="account-settings-01-current"
                        name="currentPassword"
                        type="password"
                        autoComplete="current-password"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="account-settings-01-new">
                        New Password
                      </FieldLabel>
                      <Input
                        id="account-settings-01-new"
                        name="newPassword"
                        type="password"
                        autoComplete="new-password"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="account-settings-01-confirm">
                        Confirm New Password
                      </FieldLabel>
                      <Input
                        id="account-settings-01-confirm"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                      />
                    </Field>
                  </FieldGroup>
                </CardContent>
                <CardFooter className="justify-end border-t border-border/70 bg-muted/40 py-4">
                  <Button type="button">Update Password</Button>
                </CardFooter>
              </Card>

              <Card className="gap-0 border-destructive/20 py-0 shadow-soft">
                <CardHeader className="border-b border-border/70 py-6">
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible and destructive actions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="min-w-0 text-start">
                      <h4 className="mb-1 text-sm font-semibold text-foreground">
                        Delete Account
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="shrink-0 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card className="gap-0 border-border/70 py-0 shadow-soft">
                <CardHeader className="border-b border-border/70 py-6">
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Choose what we&apos;re allowed to send you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y divide-border/70" role="list">
                    <li className="flex items-center justify-between gap-4 p-6">
                      <div className="min-w-0 pe-4 text-start">
                        <h4 className="mb-1 text-sm font-semibold text-foreground">
                          Marketing Emails
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new products, features, and more.
                        </p>
                      </div>
                      <Switch
                        defaultChecked
                        aria-label="Marketing emails"
                      />
                    </li>
                    <li className="flex items-center justify-between gap-4 p-6">
                      <div className="min-w-0 pe-4 text-start">
                        <h4 className="mb-1 text-sm font-semibold text-foreground">
                          Security Emails
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about your account security.
                        </p>
                      </div>
                      <Switch
                        defaultChecked
                        disabled
                        aria-label="Security emails"
                      />
                    </li>
                    <li className="flex items-center justify-between gap-4 p-6">
                      <div className="min-w-0 pe-4 text-start">
                        <h4 className="mb-1 text-sm font-semibold text-foreground">
                          Activity Digest
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          A weekly summary of activity on your workspaces.
                        </p>
                      </div>
                      <Switch aria-label="Activity digest" />
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="mt-0">
              <Card className="gap-0 border-border/70 py-0 shadow-soft">
                <CardHeader className="border-b border-border/70 py-6">
                  <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="min-w-0 space-y-1.5 text-start">
                      <CardTitle>API Keys</CardTitle>
                      <CardDescription>
                        Manage API keys to access our APIs.
                      </CardDescription>
                    </div>
                    <Button type="button" size="sm" className="shrink-0">
                      Create Key
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y divide-border/70" role="list">
                    <li className="flex w-full flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
                      <div className="min-w-0 space-y-1 text-start">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-semibold text-foreground">
                            Production Key
                          </h4>
                          <Badge
                            variant="secondary"
                            className="border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                          >
                            Active
                          </Badge>
                        </div>
                        <p
                          dir="ltr"
                          className="break-all font-mono text-sm text-muted-foreground"
                        >
                          pk_live_*************************
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Created Oct 24, 2024
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                      >
                        Revoke
                      </Button>
                    </li>
                    <li className="flex w-full flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
                      <div className="min-w-0 space-y-1 text-start">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-semibold text-foreground">
                            Test Key
                          </h4>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <p
                          dir="ltr"
                          className="break-all font-mono text-sm text-muted-foreground"
                        >
                          pk_test_*************************
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Created Jan 12, 2025
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                      >
                        Revoke
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  )
}

"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

const triggerClass = cn(
  "relative top-px h-10 min-h-10 flex-none rounded-none border-0 border-b-2 border-transparent",
  "bg-transparent px-4 text-sm font-medium text-muted-foreground shadow-none",
  "after:hidden after:opacity-0 hover:text-foreground",
  "data-[state=active]:border-foreground data-[state=active]:bg-transparent",
  "data-[state=active]:text-foreground data-[state=active]:shadow-none",
  "dark:data-[state=active]:bg-transparent"
)

export default function TabsBlock({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto min-w-0 w-full max-w-2xl overflow-x-clip rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 md:p-6",
        className
      )}
      style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
      {...props}
    >
      <Tabs defaultValue="general" className="min-w-0 w-full gap-6">
        <div className="space-y-1">
          <h3 className="text-h4 text-foreground">Account settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage how Sara Reed appears across the workspace.
          </p>
        </div>

        <TabsList
          variant="line"
          aria-label="Account settings"
          className="no-scrollbar h-auto max-w-full min-w-0 w-full justify-start gap-1 overflow-x-auto overflow-y-hidden rounded-none border-b border-border bg-transparent p-0"
        >
          <TabsTrigger value="general" className={triggerClass}>
            General
          </TabsTrigger>
          <TabsTrigger value="security" className={triggerClass}>
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className={triggerClass}>
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className={triggerClass}>
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tabs02-name">Display name</Label>
              <Input id="tabs02-name" defaultValue="Sara Reed" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tabs02-email">Email</Label>
              <Input
                id="tabs02-email"
                type="email"
                defaultValue="sara@sonojs.dev"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tabs02-role">Role</Label>
            <Input id="tabs02-role" defaultValue="Product designer" />
          </div>
          <Button className="h-[46px] rounded-[12px]">Save changes</Button>
        </TabsContent>

        <TabsContent value="security" className="mt-0 space-y-4">
          <div className="rounded-[12px] border border-border/70 p-4">
            <p className="text-sm font-medium text-foreground">
              Two-factor authentication
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Protect the account with an authenticator app.
            </p>
            <Button variant="outline" className="mt-3 h-10 rounded-[12px]">
              Enable 2FA
            </Button>
          </div>
          <div className="rounded-[12px] border border-border/70 p-4">
            <p className="text-sm font-medium text-foreground">
              Active sessions
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              2 devices signed in · Last active 12 minutes ago
            </p>
            <Button variant="ghost" className="mt-2 h-10 px-0 text-destructive">
              Sign out everywhere
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0 space-y-3">
          {[
            ["Product updates", "Release notes and new component alerts"],
            ["Mentions", "When someone tags you in a comment"],
            ["Billing", "Invoices and payment failures"],
          ].map(([title, body]) => (
            <label
              key={title}
              className="flex cursor-pointer items-start justify-between gap-4 rounded-[12px] border border-border/70 p-4"
            >
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {title}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {body}
                </span>
              </span>
              <input
                type="checkbox"
                defaultChecked={title !== "Billing"}
                className="mt-1 size-4 cursor-pointer accent-primary"
              />
            </label>
          ))}
        </TabsContent>

        <TabsContent value="billing" className="mt-0 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-border/70 bg-muted/40 p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Team plan</p>
              <p className="text-sm text-muted-foreground">
                Renews on Nov 12 · Visa ···· 4242
              </p>
            </div>
            <Button variant="outline" className="h-10 rounded-[12px]">
              Manage plan
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Invoices are emailed to sara@sonojs.dev after each renewal.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

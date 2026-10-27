"use client"

import * as React from "react"
import {
  BellIcon,
  CreditCardIcon,
  Link2Icon,
  ShieldIcon,
  TriangleAlertIcon,
  UserIcon,
} from "lucide-react"

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
  "h-10 min-h-10 flex-none justify-start gap-2.5 rounded-md border-0 border-b-[3px] border-transparent whitespace-nowrap",
  "bg-transparent px-3 text-start text-sm font-medium text-muted-foreground shadow-none",
  "after:hidden after:opacity-0",
  "hover:bg-background/70 hover:text-foreground",
  "data-[state=active]:border-primary data-[state=active]:bg-background",
  "data-[state=active]:text-primary data-[state=active]:shadow-none",
  "sm:w-full sm:border-b-0 sm:border-s-[3px]",
  "[&_svg]:size-4"
)

const nav = [
  { value: "profile", label: "Profile", icon: UserIcon },
  { value: "security", label: "Security", icon: ShieldIcon },
  { value: "notifications", label: "Notifications", icon: BellIcon },
  { value: "integrations", label: "Integrations", icon: Link2Icon },
  { value: "billing", label: "Billing", icon: CreditCardIcon },
  { value: "danger", label: "Danger zone", icon: TriangleAlertIcon },
] as const

export default function TabsBlock({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [orientation, setOrientation] = React.useState<
    "horizontal" | "vertical"
  >("horizontal")

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)")
    const apply = () => setOrientation(mq.matches ? "vertical" : "horizontal")
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  return (
    <div
      className={cn(
        "mx-auto min-w-0 w-full max-w-3xl overflow-x-clip rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 md:p-6",
        className
      )}
      style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
      {...props}
    >
      <Tabs
        defaultValue="profile"
        orientation={orientation}
        className="min-w-0 w-full flex-col items-stretch gap-5 sm:flex-row sm:items-stretch sm:gap-6"
      >
        <div className="w-full min-w-0 shrink-0 sm:w-52">
          <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Settings
          </p>
          <TabsList
            variant="line"
            aria-label="Settings navigation"
            className="no-scrollbar h-auto w-full min-w-0 flex-row flex-nowrap justify-start gap-0.5 overflow-x-auto overflow-y-hidden rounded-[12px] bg-muted p-1.5 sm:flex-col sm:overflow-visible"
          >
            {nav.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className={triggerClass}
              >
                <item.icon aria-hidden />
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="min-w-0 flex-1 rounded-[12px] border border-border/70 bg-card p-5">
          <TabsContent value="profile" className="mt-0 space-y-4">
            <div>
              <h4 className="text-base font-semibold text-foreground">
                Profile
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Public details shown on comments and shared docs.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tabs12-name">Full name</Label>
                <Input id="tabs12-name" defaultValue="Sara Reed" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tabs12-handle">Handle</Label>
                <Input id="tabs12-handle" defaultValue="@sarareed" />
              </div>
            </div>
            <Button className="h-[46px] rounded-[12px]">Update profile</Button>
          </TabsContent>

          <TabsContent value="security" className="mt-0 space-y-4">
            <h4 className="text-base font-semibold text-foreground">Security</h4>
            <div className="rounded-[12px] border border-border/70 p-4">
              <p className="text-sm font-medium text-foreground">Password</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Last changed 64 days ago
              </p>
              <Button variant="outline" className="mt-3 h-10 rounded-[12px]">
                Change password
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0 space-y-3">
            <h4 className="text-base font-semibold text-foreground">
              Notifications
            </h4>
            {["Email digests", "Desktop push", "SMS for billing"].map(
              (label) => (
                <label
                  key={label}
                  className="flex cursor-pointer items-center justify-between rounded-md border border-border/70 px-3 py-2.5 text-sm"
                >
                  <span className="text-foreground">{label}</span>
                  <input
                    type="checkbox"
                    defaultChecked={label !== "SMS for billing"}
                    className="size-4 cursor-pointer accent-primary"
                  />
                </label>
              )
            )}
          </TabsContent>

          <TabsContent value="integrations" className="mt-0 space-y-2">
            <h4 className="mb-3 text-base font-semibold text-foreground">
              Integrations
            </h4>
            {[
              ["GitHub", "Connected"],
              ["Slack", "Connected"],
              ["Linear", "Not connected"],
            ].map(([name, state]) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2.5 text-sm"
              >
                <span className="font-medium text-foreground">{name}</span>
                <span
                  className={cn(
                    state === "Connected"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-muted-foreground"
                  )}
                >
                  {state}
                </span>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="billing" className="mt-0 space-y-3">
            <h4 className="text-base font-semibold text-foreground">Billing</h4>
            <p className="text-sm text-muted-foreground">
              Team plan · Next invoice Nov 12 · $290.00
            </p>
            <Button variant="outline" className="h-10 rounded-[12px]">
              View invoices
            </Button>
          </TabsContent>

          <TabsContent value="danger" className="mt-0 space-y-3">
            <h4 className="text-base font-semibold text-destructive">
              Danger zone
            </h4>
            <p className="text-sm text-muted-foreground">
              Deleting the workspace removes projects, members, and billing
              history. This cannot be undone.
            </p>
            <Button variant="destructive" className="h-10 rounded-[12px]">
              Delete workspace
            </Button>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

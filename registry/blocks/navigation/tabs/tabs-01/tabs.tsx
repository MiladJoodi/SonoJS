"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

const triggerClass = cn(
  "h-10 min-h-10 flex-none rounded-none border-0 border-b-2 border-transparent",
  "bg-transparent px-4 text-sm font-medium text-muted-foreground shadow-none",
  "after:hidden after:opacity-0 hover:text-foreground",
  "data-[state=active]:border-primary data-[state=active]:bg-transparent",
  "data-[state=active]:text-primary data-[state=active]:shadow-none",
  "dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-primary"
)

export default function TabsBlock({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto min-w-0 w-full max-w-2xl rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 md:p-6",
        className
      )}
      {...props}
    >
      <div className="mb-5 space-y-1">
        <p className="text-sm font-semibold text-foreground">Product</p>
        <p className="text-sm text-muted-foreground">
          SonoJS UI kit for shipping production interfaces faster.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full gap-5">
        <TabsList
          variant="line"
          aria-label="Product sections"
          className="no-scrollbar h-auto max-w-full min-w-0 w-full justify-start gap-0 overflow-x-auto overflow-y-hidden rounded-none border-b border-border/70 bg-transparent p-0"
        >
          <TabsTrigger value="overview" className={triggerClass}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="features" className={triggerClass}>
            Features
          </TabsTrigger>
          <TabsTrigger value="pricing" className={triggerClass}>
            Pricing
          </TabsTrigger>
          <TabsTrigger value="faq" className={triggerClass}>
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 space-y-3">
          <h4 className="text-base font-semibold text-foreground">
            Built for real product teams
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Copy-source components with RTL, dark mode, and registry installs —
            so design and engineering stay aligned from day one.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {["Accessible primitives", "Token-driven scale", "CLI install", "Docs + blocks"].map(
              (item) => (
                <li
                  key={item}
                  className="rounded-md border border-border/70 bg-muted/40 px-3 py-2 text-sm text-foreground"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </TabsContent>

        <TabsContent value="features" className="mt-0 space-y-3">
          <h4 className="text-base font-semibold text-foreground">
            What ships in the kit
          </h4>
          <div className="space-y-2">
            {[
              ["Forms", "Inputs, selects, calendars, and validation layouts."],
              ["Overlays", "Dialog, sheet, popover, and command surfaces."],
              ["Data", "Tables, charts, and empty states that match the system."],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-md border border-border/70 px-3 py-2.5"
              >
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="mt-0 space-y-3">
          <h4 className="text-base font-semibold text-foreground">
            Simple team pricing
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[12px] border border-border/70 p-4">
              <p className="text-sm font-medium text-foreground">Starter</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                $0
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / seat
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Open components for personal and OSS projects.
              </p>
            </div>
            <div className="rounded-[12px] border border-primary/40 bg-primary/5 p-4">
              <p className="text-sm font-medium text-foreground">Team</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                $29
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / seat
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Private registry, shared themes, and priority support.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="mt-0 space-y-3">
          <h4 className="text-base font-semibold text-foreground">
            Common questions
          </h4>
          {[
            [
              "Can I customize tokens?",
              "Yes — radius, heights, and colors come from CSS variables.",
            ],
            [
              "Does it support RTL?",
              "Every installable control is built with logical properties.",
            ],
          ].map(([q, a]) => (
            <div key={q} className="border-b border-border/70 pb-3 last:border-0">
              <p className="text-sm font-medium text-foreground">{q}</p>
              <p className="mt-1 text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

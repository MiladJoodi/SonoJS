"use client"

import type * as React from "react"
import {
  AlignLeftIcon,
  PaletteIcon,
  SparklesIcon,
  SquareIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "@sonojs/ui/components/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

const triggerClass = cn(
  "size-11 min-h-11 flex-1 rounded-none border-0 p-0 text-muted-foreground shadow-none",
  "after:hidden after:opacity-0 hover:bg-muted/70 hover:text-foreground",
  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
  "data-[state=active]:shadow-none data-[state=active]:hover:bg-primary",
  "data-[state=active]:hover:text-primary-foreground",
  "dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground",
  "first:rounded-s-[10px] last:rounded-e-[10px]",
  "[&_svg]:size-4"
)

export default function TabsBlock({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto flex min-w-0 w-full max-w-xl flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft sm:flex-row",
        className
      )}
      {...props}
    >
      <div className="flex min-h-48 flex-1 items-center justify-center bg-muted/40 p-6">
        <div className="mx-auto w-full max-w-[12rem] rounded-md border border-border bg-background p-4 shadow-sm">
          <div className="mx-auto h-2 w-2/3 rounded-full bg-primary/80" />
          <div className="mt-3 space-y-1.5">
            <div className="mx-auto h-1.5 w-full rounded-full bg-muted" />
            <div className="mx-auto h-1.5 w-5/6 rounded-full bg-muted" />
            <div className="mx-auto h-1.5 w-4/6 rounded-full bg-muted" />
          </div>
        </div>
      </div>

      <Tabs
        defaultValue="layout"
        className="w-full gap-0 border-t border-border/70 sm:w-56 sm:shrink-0 sm:border-s sm:border-t-0"
      >
        <div className="border-b border-border/70 p-3">
          <p className="text-center text-xs font-medium text-muted-foreground">
            Inspector
          </p>
          <TabsList
            aria-label="Editor tools"
            className="mt-2 h-auto w-full justify-stretch gap-0 overflow-x-auto overflow-y-hidden rounded-[12px] border border-border/70 bg-muted p-0"
          >
            <TabsTrigger
              value="layout"
              aria-label="Layout"
              className={triggerClass}
            >
              <SquareIcon aria-hidden />
            </TabsTrigger>
            <TabsTrigger
              value="type"
              aria-label="Typography"
              className={cn(triggerClass, "border-s border-border/70")}
            >
              <AlignLeftIcon aria-hidden className="icon-dir" />
            </TabsTrigger>
            <TabsTrigger
              value="color"
              aria-label="Color"
              className={cn(triggerClass, "border-s border-border/70")}
            >
              <PaletteIcon aria-hidden />
            </TabsTrigger>
            <TabsTrigger
              value="effects"
              aria-label="Effects"
              className={cn(triggerClass, "border-s border-border/70")}
            >
              <SparklesIcon aria-hidden />
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="space-y-3 p-3">
          <TabsContent value="layout" className="mt-0 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Padding</Label>
              <input
                type="range"
                defaultValue={16}
                className="w-full cursor-pointer accent-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Radius</Label>
              <input
                type="range"
                defaultValue={12}
                className="w-full cursor-pointer accent-primary"
              />
            </div>
          </TabsContent>

          <TabsContent value="type" className="mt-0 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Size</Label>
              <select className="h-10 w-full cursor-pointer rounded-md border border-border/70 bg-background px-2 text-sm">
                <option>14 / Body</option>
                <option>16 / Lead</option>
                <option>24 / Title</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Weight</Label>
              <select className="h-10 w-full cursor-pointer rounded-md border border-border/70 bg-background px-2 text-sm">
                <option>Regular</option>
                <option>Medium</option>
                <option>Semibold</option>
              </select>
            </div>
          </TabsContent>

          <TabsContent value="color" className="mt-0">
            <div className="mx-auto grid w-fit grid-cols-5 gap-2">
              {[
                "bg-primary",
                "bg-foreground",
                "bg-emerald-500",
                "bg-amber-500",
                "bg-rose-500",
              ].map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={c}
                  className={cn(
                    "size-8 cursor-pointer rounded-full ring-offset-background",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    c
                  )}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="effects" className="mt-0 space-y-2">
            {["Soft shadow", "Border", "Backdrop blur"].map((fx) => (
              <label
                key={fx}
                className="flex cursor-pointer items-center justify-between text-sm"
              >
                <span className="text-foreground">{fx}</span>
                <input
                  type="checkbox"
                  defaultChecked={fx !== "Backdrop blur"}
                  className="size-4 cursor-pointer accent-primary"
                />
              </label>
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

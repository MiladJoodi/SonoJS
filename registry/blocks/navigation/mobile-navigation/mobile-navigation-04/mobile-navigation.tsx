"use client"

import * as React from "react"
import {
  HomeIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const sideItems = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "search", label: "Search", icon: SearchIcon },
] as const

const endItems = [
  { id: "settings", label: "Settings", icon: SettingsIcon },
  { id: "profile", label: "Profile", icon: UserIcon },
] as const

type ItemId =
  | (typeof sideItems)[number]["id"]
  | (typeof endItems)[number]["id"]
  | "create"

export default function MobileNavigation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState<ItemId>("home")

  return (
    <div
      className={cn(
        "relative flex min-h-[22rem] w-full flex-col overflow-hidden rounded-[12px] border border-border/70 bg-background",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 pb-8 text-center">
        <p className="text-sm font-medium text-foreground">
          {active === "create" ? "Create" : active[0].toUpperCase() + active.slice(1)}
        </p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Floating dock with a center primary action.
        </p>
      </div>

      <div className="px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <nav
          aria-label="Mobile"
          className="mx-auto flex h-16 max-w-md items-center rounded-full border border-border/70 bg-card px-1.5 shadow-md">
          <div className="grid h-full flex-1 grid-cols-5">
            {sideItems.map((item) => {
              const Icon = item.icon
              const isActive = active === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex h-full min-w-0 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full",
                    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon aria-hidden className="size-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              )
            })}

            <div className="flex items-center justify-center">
              <button
                type="button"
                aria-label="Create"
                aria-current={active === "create" ? "page" : undefined}
                onClick={() => setActive("create")}
                className={cn(
                  "inline-flex size-11 cursor-pointer items-center justify-center rounded-full",
                  "bg-primary text-primary-foreground shadow-md shadow-primary/25",
                  "transition-transform hover:scale-[1.03]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <PlusIcon aria-hidden className="size-5" strokeWidth={2.5} />
              </button>
            </div>

            {endItems.map((item) => {
              const Icon = item.icon
              const isActive = active === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex h-full min-w-0 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full",
                    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon aria-hidden className="size-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}

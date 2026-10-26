"use client"

import * as React from "react"
import {
  FolderIcon,
  HomeIcon,
  LayersIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "projects", label: "Projects", icon: FolderIcon },
  { id: "team", label: "Team", icon: UsersIcon },
  { id: "boards", label: "Boards", icon: LayersIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
] as const

type ItemId = (typeof items)[number]["id"]

export default function MobileNavigation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState<ItemId>("projects")
  const activeItem = items.find((item) => item.id === active)

  return (
    <div
      className={cn(
        "relative flex min-h-[22rem] w-full flex-col overflow-hidden rounded-[12px] border border-border/70 bg-background",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="text-sm font-medium text-foreground">
          {activeItem?.label}
        </p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Full-width tabs with a top primary accent on the active item.
        </p>
      </div>

      <nav
        aria-label="Mobile"
        className="border-t border-border/70 bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
      >
        <div className="mx-auto grid h-[4.25rem] max-w-lg grid-cols-5">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative inline-flex h-full min-w-0 cursor-pointer flex-col items-center justify-center gap-1 px-1",
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 top-0 h-0.5 rounded-full bg-primary transition-opacity duration-200",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
                <Icon
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span
                  className={cn(
                    "max-w-full truncate text-[11px] font-medium tracking-wide transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

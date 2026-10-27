"use client"

import * as React from "react"
import {
  HomeIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "search", label: "Search", icon: SearchIcon },
  { id: "bag", label: "Bag", icon: ShoppingBagIcon },
  { id: "profile", label: "Profile", icon: UserIcon },
] as const

type ItemId = (typeof items)[number]["id"]

export default function MobileNavigation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState<ItemId>("home")
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
          Classic edge-to-edge tab bar with icon and label.
        </p>
      </div>

      <nav
        aria-label="Mobile"
        className="border-t border-border/70 bg-card pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-20px_rgba(0,0,0,0.35)]">
        <div className="mx-auto grid h-[4.25rem] max-w-lg grid-cols-4">
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
                  "inline-flex h-full min-w-0 cursor-pointer flex-col items-center justify-center gap-1 px-2",
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <Icon
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "max-w-full truncate text-[11px] font-medium",
                    isActive ? "text-primary" : "text-muted-foreground"
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

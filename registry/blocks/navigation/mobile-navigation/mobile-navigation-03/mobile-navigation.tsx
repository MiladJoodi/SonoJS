"use client"

import * as React from "react"
import {
  ClapperboardIcon,
  HomeIcon,
  RadioIcon,
  StoreIcon,
  UserRoundIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "watch", label: "Watch", icon: ClapperboardIcon },
  { id: "live", label: "Live", icon: RadioIcon },
  { id: "market", label: "Market", icon: StoreIcon },
  { id: "profile", label: "Profile", icon: UserRoundIcon },
] as const

type ItemId = (typeof items)[number]["id"]

export default function MobileNavigation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState<ItemId>("watch")
  const activeIndex = items.findIndex((item) => item.id === active)
  const activeItem = items[activeIndex]

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
          Five tabs with a sliding primary indicator under the active item.
        </p>
      </div>

      <nav
        aria-label="Mobile"
        className="border-t border-border/70 bg-card pb-[env(safe-area-inset-bottom)]"
      >
        <div className="relative mx-auto grid h-[4.25rem] max-w-lg grid-cols-5">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-border/80"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out"
            style={{
              width: "16%",
              insetInlineStart: `calc(${activeIndex} * 20% + 2%)`,
            }}
          />
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
                  "relative z-10 inline-flex h-full min-w-0 cursor-pointer flex-col items-center justify-center gap-1 px-1",
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <Icon
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0",
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

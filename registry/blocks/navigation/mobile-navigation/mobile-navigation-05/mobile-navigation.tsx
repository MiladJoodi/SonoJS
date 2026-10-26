"use client"

import * as React from "react"
import {
  BellIcon,
  HomeIcon,
  MailIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  { id: "home", label: "Home", icon: HomeIcon, badge: 0 },
  { id: "search", label: "Search", icon: SearchIcon, badge: 0 },
  { id: "mail", label: "Mail", icon: MailIcon, badge: 3 },
  { id: "alerts", label: "Alerts", icon: BellIcon, badge: 12 },
  { id: "profile", label: "Profile", icon: UserIcon, badge: 0 },
] as const

type ItemId = (typeof items)[number]["id"]

export default function MobileNavigation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState<ItemId>("mail")
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
          Tab bar with unread badges on Mail and Alerts.
        </p>
      </div>

      <nav
        aria-label="Mobile"
        className="border-t border-border/70 bg-card pb-[env(safe-area-inset-bottom)]"
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
                  "inline-flex h-full min-w-0 cursor-pointer flex-col items-center justify-center gap-1 px-1",
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <span className="relative">
                  <Icon
                    aria-hidden
                    className={cn(
                      "size-5 shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  {item.badge > 0 ? (
                    <span className="absolute -end-2.5 -top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  ) : null}
                </span>
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

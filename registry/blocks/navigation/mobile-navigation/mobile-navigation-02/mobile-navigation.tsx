"use client"

import * as React from "react"
import {
  CompassIcon,
  HouseIcon,
  MessageCircleIcon,
  UserRoundIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  { id: "home", label: "Home", icon: HouseIcon },
  { id: "explore", label: "Explore", icon: CompassIcon },
  { id: "inbox", label: "Inbox", icon: MessageCircleIcon },
  { id: "you", label: "You", icon: UserRoundIcon },
] as const

type ItemId = (typeof items)[number]["id"]

export default function MobileNavigation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState<ItemId>("explore")
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
          Soft muted bar with a filled pill on the active tab.
        </p>
      </div>

      <nav
        aria-label="Mobile"
        className="border-t border-border/70 bg-muted/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm"
      >
        <div className="mx-auto flex h-[4.5rem] max-w-lg items-center gap-1 px-2">
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
                  "inline-flex h-14 min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-[12px] px-2",
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}>
                <Icon aria-hidden className="size-5 shrink-0" />
                <span className="max-w-full truncate text-[11px] font-medium">
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

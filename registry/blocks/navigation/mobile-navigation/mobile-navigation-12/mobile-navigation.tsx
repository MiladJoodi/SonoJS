"use client"

import * as React from "react"
import {
  CompassIcon,
  HouseIcon,
  MessageCircleIcon,
  SearchIcon,
  UserRoundIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  { id: "home", label: "Home", icon: HouseIcon },
  { id: "explore", label: "Explore", icon: CompassIcon },
  { id: "search", label: "Search", icon: SearchIcon },
  { id: "chat", label: "Chat", icon: MessageCircleIcon },
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
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 pb-8 text-center">
        <p className="text-sm font-medium text-foreground">
          {activeItem?.label}
        </p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Morphing dock — the active tab blooms into a labeled droplet.
        </p>
      </div>

      <div className="px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <nav
          aria-label="Mobile"
          className="mx-auto flex h-[3.75rem] max-w-sm items-center gap-1 rounded-full border border-border/60 bg-card/90 p-1.5 shadow-lg shadow-black/10 backdrop-blur-xl dark:shadow-black/40"
        >
          {items.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "min-w-0 flex-[1.85] gap-2 bg-primary px-4 text-primary-foreground shadow-md shadow-primary/30"
                    : "size-12 shrink-0 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon
                  aria-hidden
                  className="size-[18px] shrink-0"
                  strokeWidth={isActive ? 2.35 : 1.75}
                />
                <span
                  className={cn(
                    "truncate text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "max-w-24 opacity-100"
                      : "sr-only max-w-0 opacity-0"
                  )}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

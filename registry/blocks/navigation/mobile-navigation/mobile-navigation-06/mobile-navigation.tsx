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
  { id: "inbox", label: "Inbox", icon: MessageCircleIcon },
  { id: "you", label: "You", icon: UserRoundIcon },
] as const

type ItemId = (typeof items)[number]["id"]

export default function MobileNavigation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState<ItemId>("home")
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
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 pb-8 text-center">
        <p className="text-sm font-medium text-foreground">
          {activeItem?.label}
        </p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Frosted floating dock with a sliding active pill and labels.
        </p>
      </div>

      <div className="px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <nav
          aria-label="Mobile"
          className={cn(
            "relative mx-auto grid h-[4.5rem] max-w-md grid-cols-5 overflow-hidden rounded-2xl border border-border/60",
            "bg-background/75 shadow-lg shadow-black/10 backdrop-blur-xl",
            "dark:bg-card/80 dark:shadow-black/40"
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-1.5 rounded-xl bg-primary/15 transition-all duration-300 ease-out dark:bg-primary/25"
            style={{
              width: "calc((100% - 0.75rem) / 5)",
              insetInlineStart: `calc(0.375rem + ${activeIndex} * ((100% - 0.75rem) / 5))`,
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
                  "relative z-10 inline-flex h-full cursor-pointer flex-col items-center justify-center gap-1",
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon
                  aria-hidden
                  strokeWidth={isActive ? 2.25 : 1.75}
                  className="size-5"
                />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

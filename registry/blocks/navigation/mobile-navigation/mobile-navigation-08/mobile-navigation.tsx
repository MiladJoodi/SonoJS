"use client"

import * as React from "react"
import {
  BookmarkIcon,
  HomeIcon,
  LayoutGridIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "saved", label: "Saved", icon: BookmarkIcon },
  { id: "discover", label: "Discover", icon: SparklesIcon },
  { id: "apps", label: "Apps", icon: LayoutGridIcon },
  { id: "profile", label: "Profile", icon: UserIcon },
] as const

type ItemId = (typeof items)[number]["id"]

export default function MobileNavigation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState<ItemId>("discover")
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
          Compact pill dock — the active tab expands to show its label.
        </p>
      </div>

      <div className="px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <nav
          aria-label="Mobile"
          className="mx-auto flex h-14 max-w-sm items-center justify-center gap-1 rounded-full border border-border/70 bg-card p-1.5 shadow-md"
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
                  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full transition-all duration-300 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "min-w-0 flex-[1.6] bg-foreground px-3.5 text-background"
                    : "size-11 shrink-0 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon
                  aria-hidden
                  className="size-[18px] shrink-0"
                  strokeWidth={isActive ? 2.25 : 1.75}
                />
                <span
                  className={cn(
                    "truncate text-sm font-medium transition-all duration-300",
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

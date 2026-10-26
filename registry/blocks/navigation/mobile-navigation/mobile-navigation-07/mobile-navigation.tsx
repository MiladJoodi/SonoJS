"use client"

import * as React from "react"
import {
  HomeIcon,
  PlusIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const sideItems = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "search", label: "Search", icon: SearchIcon },
] as const

const endItems = [
  { id: "bag", label: "Bag", icon: ShoppingBagIcon },
  { id: "account", label: "Account", icon: UserIcon },
] as const

type ItemId =
  | (typeof sideItems)[number]["id"]
  | (typeof endItems)[number]["id"]
  | "create"

function TabButton({
  item,
  isActive,
  onSelect,
}: {
  item: {
    id: string
    label: string
    icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  }
  isActive: boolean
  onSelect: () => void
}) {
  const Icon = item.icon
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={isActive ? "page" : undefined}
      className="relative z-10 inline-flex h-full min-w-0 cursor-pointer flex-col items-center justify-center gap-0.5 px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
}

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
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 pb-10 text-center">
        <p className="text-sm font-medium text-foreground">
          {active === "create"
            ? "Create"
            : active[0].toUpperCase() + active.slice(1)}
        </p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Bottom tabs with a raised center create button.
        </p>
      </div>

      <nav
        aria-label="Mobile"
        className="relative pb-[env(safe-area-inset-bottom)]"
      >
        <div className="relative mx-auto h-[5.25rem] w-full max-w-lg">
          <div className="absolute inset-x-0 bottom-0 h-16 border-t border-border/70 bg-card" />

          <div className="absolute inset-x-0 bottom-0 grid h-16 grid-cols-5">
            {sideItems.map((item) => (
              <TabButton
                key={item.id}
                item={item}
                isActive={active === item.id}
                onSelect={() => setActive(item.id)}
              />
            ))}

            <div className="relative z-20 flex justify-center">
              <button
                type="button"
                aria-label="Create"
                aria-current={active === "create" ? "page" : undefined}
                onClick={() => setActive("create")}
                className={cn(
                  "absolute -top-7 inline-flex size-14 cursor-pointer items-center justify-center rounded-full",
                  "bg-primary text-primary-foreground shadow-lg shadow-primary/30",
                  "ring-[6px] ring-background transition-transform hover:scale-105",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <PlusIcon aria-hidden className="size-6" strokeWidth={2.5} />
              </button>
            </div>

            {endItems.map((item) => (
              <TabButton
                key={item.id}
                item={item}
                isActive={active === item.id}
                onSelect={() => setActive(item.id)}
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

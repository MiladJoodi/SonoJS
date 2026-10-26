"use client"

import * as React from "react"
import {
  HeartIcon,
  HouseIcon,
  PlusSquareIcon,
  SearchIcon,
  UserRoundIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  { id: "home", label: "Home", icon: HouseIcon },
  { id: "search", label: "Search", icon: SearchIcon },
  { id: "post", label: "Post", icon: PlusSquareIcon },
  { id: "likes", label: "Likes", icon: HeartIcon },
  { id: "profile", label: "Profile", icon: UserRoundIcon },
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
          Blur chrome tab bar with filled active glyphs and always-on labels.
        </p>
      </div>

      <nav
        aria-label="Mobile"
        className={cn(
          "relative border-t border-black/10 bg-background/72 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-2xl backdrop-saturate-150",
          "dark:border-white/10 dark:bg-background/55"
        )}
      >
        <div className="mx-auto grid h-[3.05rem] max-w-lg grid-cols-5 pt-1">
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
                  "inline-flex h-full min-w-0 cursor-pointer flex-col items-center justify-center gap-0.5 px-1",
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <Icon
                  aria-hidden
                  strokeWidth={isActive ? 0 : 1.75}
                  className={cn(
                    "size-[22px] shrink-0 transition-[color,transform] duration-200",
                    isActive
                      ? "scale-[1.02] fill-primary text-primary"
                      : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "max-w-full truncate text-[10px] font-medium leading-none tracking-tight",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
        <div
          aria-hidden
          className="mx-auto mb-1 h-1 w-[8.25rem] rounded-full bg-foreground/85"
        />
      </nav>
    </div>
  )
}

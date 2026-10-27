"use client"

import * as React from "react"
import {
  Disc3Icon,
  HouseIcon,
  MicIcon,
  RadioIcon,
  SearchIcon,
  UserRoundIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  { id: "home", label: "Home", icon: HouseIcon },
  { id: "search", label: "Search", icon: SearchIcon },
  { id: "live", label: "Live", icon: RadioIcon },
  { id: "library", label: "Library", icon: Disc3Icon },
  { id: "you", label: "You", icon: UserRoundIcon },
] as const

type ItemId = (typeof items)[number]["id"]

const islandCopy: Record<
  ItemId,
  { tone: "idle" | "live" | "play"; title: string; detail: string }
> = {
  home: {
    tone: "idle",
    title: "Tonight · 3 sets",
    detail: "Recommended for you",
  },
  search: {
    tone: "idle",
    title: "Trending: lo-fi",
    detail: "12k listening now",
  },
  live: {
    tone: "live",
    title: "Recording…",
    detail: "Studio A · 00:42",
  },
  library: {
    tone: "play",
    title: "Now playing",
    detail: "Midnight Drive — Nora",
  },
  you: {
    tone: "idle",
    title: "Sara Reed",
    detail: "Pro · Sync on",
  },
}

export default function MobileNavigation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState<ItemId>("live")
  const island = islandCopy[active]
  const activeItem = items.find((item) => item.id === active)

  return (
    <div
      className={cn(
        "relative flex min-h-[22rem] w-full flex-col overflow-hidden rounded-[12px] border border-border/70 bg-background",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 pb-16 text-center">
        <p className="text-sm font-medium text-foreground">
          {activeItem?.label}
        </p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Live status capsule that morphs with the active tab.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[5.75rem] z-20 flex justify-center px-4">
        <div
          className={cn(
            "pointer-events-auto flex h-11 max-w-[18rem] items-center gap-2.5 rounded-full px-3.5 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            island.tone === "live" &&
              "w-[min(100%,17rem)] bg-foreground text-background",
            island.tone === "play" &&
              "w-[min(100%,17.5rem)] bg-primary text-primary-foreground",
            island.tone === "idle" &&
              "w-[min(100%,15.5rem)] border border-border/70 bg-card text-foreground"
          )}>
          {island.tone === "live" ? (
            <span className="relative flex size-2.5 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-500 opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-rose-500" />
            </span>
          ) : island.tone === "play" ? (
            <MicIcon aria-hidden className="size-3.5 shrink-0 opacity-90" />
          ) : (
            <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
          )}
          <span className="min-w-0 flex-1 text-start">
            <span className="block truncate text-[11px] font-semibold leading-tight">
              {island.title}
            </span>
            <span
              className={cn(
                "block truncate text-[10px] leading-tight opacity-80",
                island.tone === "idle" && "text-muted-foreground opacity-100"
              )}
            >
              {island.detail}
            </span>
          </span>
        </div>
      </div>

      <nav
        aria-label="Mobile"
        className="relative z-10 border-t border-border/70 bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
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
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon
                  aria-hidden
                  className="size-5"
                  strokeWidth={isActive ? 2.25 : 1.75}
                />
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

"use client"

import * as React from "react"
import {
  BellIcon,
  HomeIcon,
  MailIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"

const items = [
  { id: "home", label: "Home", icon: HomeIcon, badge: 0 },
  { id: "search", label: "Search", icon: SearchIcon, badge: 0 },
  { id: "compose", label: "Compose", icon: PlusIcon, badge: 0, primary: true },
  { id: "mail", label: "Mail", icon: MailIcon, badge: 3 },
  { id: "alerts", label: "Alerts", icon: BellIcon, badge: 12 },
] as const

type ItemId = (typeof items)[number]["id"] | "profile"

export default function MobileNavigation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState<ItemId>("home")

  const title =
    active === "profile"
      ? "Sara Reed"
      : active === "compose"
        ? "Compose"
        : items.find((item) => item.id === active)?.label ?? "Home"

  return (
    <div
      className={cn(
        "relative flex min-h-[22rem] w-full flex-col overflow-hidden rounded-[12px] border border-border/70 bg-background",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 pb-8 text-center">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Productivity dock with badges, compose action, and profile avatar.
        </p>
      </div>

      <div className="px-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <nav
          aria-label="Mobile"
          className={cn(
            "mx-auto flex h-[4.25rem] max-w-md items-center gap-1 rounded-[1.25rem]",
            "border border-border/70 bg-card p-1.5 shadow-lg shadow-black/10 dark:shadow-black/40"
          )}>
          <div className="grid h-full min-w-0 flex-1 grid-cols-5 gap-0.5">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = active === item.id
              const isPrimary = "primary" in item && item.primary

              if (isPrimary) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setActive(item.id)}
                    className={cn(
                      "mx-auto inline-flex size-11 cursor-pointer items-center justify-center self-center rounded-[12px]",
                      "bg-primary text-primary-foreground shadow-md shadow-primary/25",
                      "transition-transform hover:scale-[1.03]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    )}
                  >
                    <Icon aria-hidden className="size-5" strokeWidth={2.5} />
                  </button>
                )
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-full min-w-0 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-[12px] transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  )}
                >
                  <span className="relative">
                    <Icon aria-hidden className="size-5" />
                    {item.badge > 0 ? (
                      <span className="absolute -end-2 -top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">
                        {item.badge > 9 ? "9+" : item.badge}
                      </span>
                    ) : null}
                  </span>
                  <span className="max-w-full truncate text-[10px] font-medium">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            aria-label="Sara Reed, online"
            aria-current={active === "profile" ? "page" : undefined}
            onClick={() => setActive("profile")}
            className={cn(
              "relative ms-0.5 inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full",
              "ring-2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active === "profile"
                ? "ring-primary"
                : "ring-border hover:ring-primary/60"
            )}
          >
            <Avatar className="size-10">
              <AvatarFallback className="bg-primary/15 text-sm font-semibold text-primary">
                SR
              </AvatarFallback>
            </Avatar>
            <span
              aria-hidden
              className="absolute end-0.5 bottom-0.5 size-2.5 rounded-full border-2 border-card bg-emerald-500"
            />
          </button>
        </nav>
      </div>
    </div>
  )
}

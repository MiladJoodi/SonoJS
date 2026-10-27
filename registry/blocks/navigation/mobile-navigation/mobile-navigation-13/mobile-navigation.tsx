"use client"

import * as React from "react"
import {
  ArchiveIcon,
  BellIcon,
  BookmarkIcon,
  CircleHelpIcon,
  CompassIcon,
  EllipsisIcon,
  HomeIcon,
  MessageCircleIcon,
  SettingsIcon,
  WalletIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sonojs/ui/components/sheet"

const primary = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "explore", label: "Explore", icon: CompassIcon },
  { id: "inbox", label: "Inbox", icon: MessageCircleIcon },
] as const

const overflow = [
  { label: "Wallet", icon: WalletIcon, hint: "Cards & payouts" },
  { label: "Saved", icon: BookmarkIcon, hint: "Collections" },
  { label: "Alerts", icon: BellIcon, hint: "Push & email" },
  { label: "Archive", icon: ArchiveIcon, hint: "Hidden items" },
  { label: "Settings", icon: SettingsIcon, hint: "Account" },
  { label: "Help", icon: CircleHelpIcon, hint: "Guides" },
] as const

type PrimaryId = (typeof primary)[number]["id"]
type Screen = PrimaryId | "overflow"

export default function MobileNavigation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState<Screen>("home")
  const [open, setOpen] = React.useState(false)

  const title =
    active === "overflow"
      ? "More"
      : (primary.find((item) => item.id === active)?.label ?? "Home")

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
          Three primary tabs; everything else lives in a bottom overflow sheet.
        </p>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <div className="px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <nav
            aria-label="Mobile"
            className="mx-auto flex h-14 max-w-sm items-center gap-1 rounded-full border border-border/70 bg-card p-1.5 shadow-soft"

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
            {primary.map((item) => {
              const Icon = item.icon
              const isActive = active === item.id && !open
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActive(item.id)
                    setOpen(false)
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex h-full min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full px-2",
                    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon aria-hidden className="size-4 shrink-0" />
                  <span className="truncate text-xs font-medium">
                    {item.label}
                  </span>
                </button>
              )
            })}

            <SheetTrigger asChild>
              <button
                type="button"
                onClick={() => setActive("overflow")}
                aria-current={active === "overflow" || open ? "page" : undefined}
                className={cn(
                  "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full",
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active === "overflow" || open
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                )}
              >
                <EllipsisIcon aria-hidden className="size-5" />
                <span className="sr-only">More destinations</span>
              </button>
            </SheetTrigger>
          </nav>
        </div>

        <SheetContent
          side="bottom"
          className="mx-auto max-w-md gap-0 rounded-t-[1.25rem] p-0"
        >
          <SheetHeader className="border-b border-border/70 px-5 py-4 text-start">
            <SheetTitle>More</SheetTitle>
            <SheetDescription>
              Secondary destinations kept off the primary bar.
            </SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-2 p-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {overflow.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-border/70 bg-card p-3 text-start transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-muted text-foreground">
                    <Icon aria-hidden className="size-4" />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {item.hint}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

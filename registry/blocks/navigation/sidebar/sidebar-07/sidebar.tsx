"use client"

import type * as React from "react"
import {
  CircleDollarSignIcon,
  CreditCardIcon,
  HomeIcon,
  MailIcon,
  PanelLeftCloseIcon,
  SearchIcon,
  SettingsIcon,
  SquarePlusIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"

const linkClass =
  "flex cursor-pointer items-center gap-2.5 rounded-[12px] px-3 py-2 text-sm font-medium text-foreground/80 outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"

const activeLinkClass =
  "flex cursor-pointer items-center gap-2.5 rounded-[12px] bg-muted px-3 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"

const iconClass = "size-[18px] shrink-0"

const badgeClass =
  "ms-auto flex h-5 items-center justify-center rounded-full border border-border/70 bg-card px-2 text-[11px] font-semibold text-foreground"

type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  current?: boolean
  badge?: string
}

const items: NavItem[] = [
  { label: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { label: "Audience", href: "#", icon: UsersIcon },
  { label: "Posts", href: "#", icon: SquarePlusIcon, badge: "4" },
  { label: "Inbox", href: "#", icon: MailIcon, badge: "10" },
  { label: "Earnings and taxes", href: "#", icon: CircleDollarSignIcon },
  { label: "Refunds", href: "#", icon: CreditCardIcon },
  { label: "Profile", href: "#", icon: UserIcon },
  { label: "Settings", href: "#", icon: SettingsIcon },
]

export default function Sidebar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-h-[28rem] w-full flex-col bg-background md:flex-row", className)}
      {...props}
    >
      <aside className="flex w-full max-w-xs shrink-0 flex-col overflow-auto border-b border-border/70 bg-card px-4 py-6 md:border-b-0 md:border-e">
        <div className="mb-8">
          <div className="mb-6 flex flex-wrap items-center">
            <div
              className="flex size-9 items-center justify-center rounded-full border border-primary bg-primary text-xl font-semibold text-primary-foreground"
              aria-hidden
            >
              J
            </div>
            <div className="ms-4 min-w-0">
              <p className="text-sm font-semibold text-foreground">Sara Reed</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                D.IN Medicine
              </p>
            </div>
            <button
              type="button"
              aria-label="Collapse sidebar"
              className="ms-auto cursor-pointer rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <PanelLeftCloseIcon className="size-3.5 icon-dir" aria-hidden />
            </button>
          </div>

          <form className="w-full max-w-xs" role="search">
            <InputGroup className="h-auto rounded-[12px] shadow-none">
              <InputGroupInput
                id="sidebar-search"
                type="search"
                placeholder="Search..."
                className="h-auto py-2.5"
              />
              <InputGroupAddon align="inline-end">
                <SearchIcon className="size-4" aria-hidden />
              </InputGroupAddon>
            </InputGroup>
            <label htmlFor="sidebar-search" className="sr-only">
              Search
            </label>
          </form>
        </div>

        <nav aria-label="Primary sidebar">
          <ul className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={item.current ? activeLinkClass : linkClass}
                  >
                    <Icon className={iconClass} aria-hidden />
                    {item.label}
                    {item.badge ? (
                      <span className={badgeClass}>{item.badge}</span>
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-lg text-balance text-h3 text-foreground">
          User header sidebar with search
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Initials avatar, search field, icon nav, and count badges on Posts and
          Inbox.
        </p>
      </main>
    </div>
  )
}

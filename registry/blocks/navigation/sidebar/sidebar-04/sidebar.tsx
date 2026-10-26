"use client"

import type * as React from "react"
import {
  ChevronDownIcon,
  CircleArrowRightIcon,
  CircleDollarSignIcon,
  ClockIcon,
  CreditCardIcon,
  HomeIcon,
  InfoIcon,
  SettingsIcon,
  SquarePlusIcon,
  UserIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@sonojs/ui/components/collapsible"
import logoAsset from "./logo.svg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const logoSrc = assetSrc(logoAsset)

const linkClass =
  "flex cursor-pointer items-center gap-2.5 rounded-[12px] px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"

const activeLinkClass =
  "flex cursor-pointer items-center gap-2.5 rounded-[12px] bg-muted px-3 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"

const triggerClass = cn(
  "flex w-full cursor-pointer items-center gap-2.5 rounded-[12px] px-3 py-2 text-start text-sm font-medium text-foreground/80 outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
  // Closed: point toward inline-end (LTR →, RTL ←). Open: point down.
  "[&[data-state=open]>svg:last-child]:rotate-0",
  "[&[data-state=closed]>svg:last-child]:-rotate-90",
  "rtl:[&[data-state=closed]>svg:last-child]:rotate-90"
)

const iconClass = "size-[18px] shrink-0"

type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

type NavGroup = {
  title: string
  icon: React.ComponentType<{ className?: string }>
  defaultOpen?: boolean
  items: NavItem[]
}

const groups: NavGroup[] = [
  {
    title: "Information",
    icon: InfoIcon,
    defaultOpen: true,
    items: [
      { label: "Audience", href: "#", icon: UsersIcon },
      { label: "Posts", href: "#", icon: SquarePlusIcon },
      { label: "Schedules", href: "#", icon: ClockIcon },
    ],
  },
  {
    title: "Income",
    icon: WalletIcon,
    items: [
      { label: "Earnings and taxes", href: "#", icon: CircleDollarSignIcon },
      { label: "Refunds", href: "#", icon: CreditCardIcon },
    ],
  },
  {
    title: "Actions",
    icon: CircleArrowRightIcon,
    items: [
      { label: "Profile", href: "#", icon: UserIcon },
      { label: "Settings", href: "#", icon: SettingsIcon },
    ],
  },
]

function Brand() {
  return (
    <a
      href="#"
      className="mb-8 flex min-w-9 cursor-pointer items-center gap-2 px-3 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Sono"
    >
      <img
        src={logoSrc}
        alt=""
        width={28}
        height={32}
        className="h-8 w-auto shrink-0"
      />
      <span className="text-sm font-semibold tracking-tight text-foreground">
        Sono
      </span>
    </a>
  )
}

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
        <Brand />

        <nav aria-label="Primary sidebar">
          <ul className="mb-2 space-y-1">
            <li>
              <a href="#" aria-current="page" className={activeLinkClass}>
                <HomeIcon className={iconClass} aria-hidden />
                Dashboard
              </a>
            </li>
          </ul>

          {groups.map((group) => {
            const GroupIcon = group.icon
            return (
              <Collapsible
                key={group.title}
                defaultOpen={group.defaultOpen}
                className="group/collapsible"
              >
                <CollapsibleTrigger className={triggerClass}>
                  <GroupIcon
                    className={cn(
                      iconClass,
                      group.icon === CircleArrowRightIcon && "icon-dir"
                    )}
                    aria-hidden
                  />
                  <span className="flex-1">{group.title}</span>
                  <ChevronDownIcon
                    className="size-3 shrink-0 transition-transform duration-300 ease-out"
                    aria-hidden
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="my-1 space-y-1 px-3">
                    {group.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <li key={item.label}>
                          <a href={item.href} className={linkClass}>
                            <Icon className={iconClass} aria-hidden />
                            {item.label}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </nav>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-lg text-balance text-h3 text-foreground">
          Collapsible icon sidebar
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Dashboard plus Information, Income, and Actions groups that expand
          and collapse.
        </p>
      </main>
    </div>
  )
}

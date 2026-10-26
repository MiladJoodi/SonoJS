"use client"

import type * as React from "react"
import {
  BellIcon,
  ChevronDownIcon,
  CircleDollarSignIcon,
  ClockIcon,
  CreditCardIcon,
  HomeIcon,
  InfoIcon,
  MailIcon,
  MessageSquareIcon,
  PanelLeftCloseIcon,
  SquarePlusIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@sonojs/ui/components/collapsible"
import { Separator } from "@sonojs/ui/components/separator"
import chat1 from "./chat-1.webp"
import chat2 from "./chat-2.webp"
import chat3 from "./chat-3.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const chatImages = [assetSrc(chat1), assetSrc(chat2), assetSrc(chat3)]

const linkClass =
  "flex cursor-pointer items-center gap-2.5 rounded-[12px] px-3 py-2 text-sm font-medium text-foreground/80 outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"

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

const badgeClass =
  "ms-auto flex h-5 items-center justify-center rounded-full border border-border/70 bg-card px-2 text-[11px] font-semibold text-foreground"

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
        <div className="flex flex-wrap items-center">
          <div
            className="flex size-9 items-center justify-center rounded-full border border-primary bg-primary text-xl font-semibold text-primary-foreground"
            aria-hidden
          >
            S
          </div>
          <div className="ms-4 min-w-0">
            <p className="text-sm font-semibold text-foreground">Sara Reed</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Member</p>
          </div>
          <button
            type="button"
            aria-label="Collapse sidebar"
            className="ms-auto cursor-pointer rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <PanelLeftCloseIcon className="size-3.5 icon-dir" aria-hidden />
          </button>
        </div>

        <Separator className="my-6" />

        <nav aria-label="Primary sidebar">
          <ul className="space-y-2">
            <li>
              <a href="#" aria-current="page" className={activeLinkClass}>
                <HomeIcon className={iconClass} aria-hidden />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className={linkClass}>
                <BellIcon className={iconClass} aria-hidden />
                Notifications
                <span className={badgeClass}>10</span>
              </a>
            </li>
            <li>
              <a href="#" className={linkClass}>
                <MailIcon className={iconClass} aria-hidden />
                Messages
                <span className={badgeClass}>4</span>
              </a>
            </li>
            <li className="relative">
              <a href="#" className={cn(linkClass, "pe-24")}>
                <MessageSquareIcon className={iconClass} aria-hidden />
                Chat
              </a>
              <div className="pointer-events-none absolute end-3 top-1/2 flex -translate-y-1/2 items-center justify-center">
                {chatImages.map((src, i) => (
                  <Avatar
                    key={src + i}
                    className={cn(
                      "relative size-6 shrink-0 rounded-full border border-border",
                      i === 0 && "z-10 -me-2",
                      i === 1 && "z-20 -me-2",
                      i === 2 && "z-30 -me-1"
                    )}
                  >
                    <AvatarImage src={src} alt="" />
                    <AvatarFallback className="text-[10px]">
                      {String.fromCharCode(65 + i)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <button
                  type="button"
                  aria-label="Add to chat"
                  className="pointer-events-auto relative z-40 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-muted-foreground/20 text-base font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  +
                </button>
              </div>
            </li>
          </ul>

          <div className="mt-2">
            {groups.map((group) => {
              const GroupIcon = group.icon
              return (
                <Collapsible
                  key={group.title}
                  defaultOpen={group.defaultOpen}
                  className="group/collapsible"
                >
                  <CollapsibleTrigger className={triggerClass}>
                    <GroupIcon className={iconClass} aria-hidden />
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
          </div>
        </nav>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-lg text-balance text-h3 text-foreground">
          Card sidebar with chat stack
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Card-surface sidebar, notification badges, stacked chat avatars, and
          collapsible Information and Income groups.
        </p>
      </main>
    </div>
  )
}

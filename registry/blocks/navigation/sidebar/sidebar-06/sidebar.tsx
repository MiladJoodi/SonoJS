"use client"

import type * as React from "react"
import {
  CircleDollarSignIcon,
  ClockIcon,
  CreditCardIcon,
  HomeIcon,
  PanelLeftCloseIcon,
  SettingsIcon,
  SquarePlusIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Separator } from "@sonojs/ui/components/separator"
import avatarAsset from "./avatar.webp"
import logoAsset from "./logo.svg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const avatarImage = assetSrc(avatarAsset)
const logoSrc = assetSrc(logoAsset)

const linkClass =
  "flex cursor-pointer items-center gap-2.5 border-e-4 border-transparent px-6 py-3 text-sm font-medium text-foreground/80 outline-none transition-all hover:border-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"

const activeLinkClass =
  "flex cursor-pointer items-center gap-2.5 border-e-4 border-foreground bg-muted px-6 py-3 text-sm font-medium text-foreground outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring"

const iconClass = "size-[18px] shrink-0"

type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  current?: boolean
}

const items: NavItem[] = [
  { label: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { label: "Audience", href: "#", icon: UsersIcon },
  { label: "Posts", href: "#", icon: SquarePlusIcon },
  { label: "Schedules", href: "#", icon: ClockIcon },
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
      <aside className="flex w-full max-w-xs shrink-0 flex-col overflow-auto border-b border-border/70 bg-card py-6 md:border-b-0 md:border-e">
        <div className="relative flex flex-wrap items-center gap-4 px-4">
          <a
            href="#"
            className="flex flex-1 cursor-pointer flex-wrap items-center gap-2 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Sono"
          >
            <img
              src={logoSrc}
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0"
            />
            <span className="text-base font-semibold text-muted-foreground">
              Sono
            </span>
          </a>
          <button
            type="button"
            aria-label="Collapse sidebar"
            className="cursor-pointer rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <PanelLeftCloseIcon className="size-3.5 icon-dir" aria-hidden />
          </button>
        </div>

        <Separator className="my-6" />

        <nav aria-label="Primary sidebar" className="flex-1">
          <ul className="space-y-0.5">
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
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <a
          href="#"
          className="mt-6 flex cursor-pointer flex-wrap items-center gap-4 px-4 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar className="size-10 rounded-[12px] border border-border/70">
            <AvatarImage src={avatarImage} alt="" />
            <AvatarFallback className="rounded-[12px]">SR</AvatarFallback>
          </Avatar>
          <span className="min-w-0">
            <span className="block text-sm font-medium text-foreground">
              Sara Reed
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Active free account
            </span>
          </span>
        </a>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-lg text-balance text-h3 text-foreground">
          End-accent icon sidebar
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Flat icon list with end-edge accent on the active item, collapse
          control, and profile footer.
        </p>
      </main>
    </div>
  )
}

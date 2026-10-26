"use client"

import type * as React from "react"
import {
  ChartNoAxesCombinedIcon,
  CreditCardIcon,
  HomeIcon,
  MailIcon,
  MessageCircleWarningIcon,
  PackageIcon,
  PanelLeftCloseIcon,
  SettingsIcon,
  UserIcon,
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
  "flex cursor-pointer items-center gap-2.5 rounded-md text-sm font-medium text-foreground/80 outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"

const activeLinkClass =
  "flex cursor-pointer items-center gap-2.5 rounded-md text-sm font-medium text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"

const iconClass = "size-[18px] shrink-0"

type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  current?: boolean
}

const insights: NavItem[] = [
  { label: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { label: "Insight", href: "#", icon: ChartNoAxesCombinedIcon },
  { label: "People & Terms", href: "#", icon: MessageCircleWarningIcon },
]

const shared: NavItem[] = [
  { label: "Product", href: "#", icon: PackageIcon },
  { label: "Inbox", href: "#", icon: MailIcon },
  { label: "Refunds", href: "#", icon: CreditCardIcon },
]

const account: NavItem[] = [
  { label: "Profile", href: "#", icon: UserIcon },
  { label: "Settings", href: "#", icon: SettingsIcon },
]

function NavList({ items }: { items: NavItem[] }) {
  return (
    <ul className="space-y-4 px-2">
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
        <nav className="flex h-full flex-col" aria-label="Primary sidebar">
          <div className="relative flex h-full flex-col">
            <div className="relative flex flex-wrap items-center gap-4">
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

            <div>
              <div className="mb-4 text-sm text-muted-foreground">Insights</div>
              <NavList items={insights} />
            </div>

            <Separator className="my-6" />

            <div className="flex-1">
              <div className="mb-4 text-sm text-muted-foreground">Shared</div>
              <NavList items={shared} />
            </div>

            <div className="mt-4">
              <NavList items={account} />

              <Separator className="my-6" />

              <a
                href="#"
                className="flex cursor-pointer flex-wrap items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            </div>
          </div>
        </nav>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-lg text-balance text-h3 text-foreground">
          Insights and Shared sidebar
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Labeled Insights and Shared groups, collapse control, and a profile
          footer.
        </p>
      </main>
    </div>
  )
}

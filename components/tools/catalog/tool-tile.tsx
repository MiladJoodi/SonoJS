import type { ReactNode } from "react"
import Link from "next/link"
import {
  FlagIcon,
  GlobeIcon,
  PenLineIcon,
  SendIcon,
  ServerIcon,
  ShieldCheckIcon,
  type LucideIcon,
} from "lucide-react"

import { siteConfig } from "@/lib/config"
import type { ToolsNavItem } from "@/lib/tools-nav"
import { toolHref, toolsDisplayDescription } from "@/lib/tools-nav"
import { cn } from "@/lib/utils"

const TOOL_ICONS: Record<string, LucideIcon> = {
  [toolHref("endpoints")]: SendIcon,
  [siteConfig.links.mockApi]: ServerIcon,
  [toolHref("markdown-editor")]: PenLineIcon,
  [toolHref("flags")]: FlagIcon,
  [toolHref("geo")]: GlobeIcon,
  [toolHref("captcha")]: ShieldCheckIcon,
}

const TILE_CLASS = cn(
  "flex w-full cursor-pointer items-center gap-3 rounded-md border border-border/70 bg-card p-2.5 text-start transition-colors",
  "hover:border-border hover:bg-muted/40",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
)

function TileBody({ item }: { item: ToolsNavItem }) {
  const Icon = TOOL_ICONS[item.href]
  return (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-muted text-foreground">
        {Icon ? <Icon className="size-4" aria-hidden /> : null}
      </span>
      <span className="min-w-0 flex-1 space-y-0.5">
        <span className="block text-sm font-medium text-foreground">
          {item.title}
        </span>
        <span className="block truncate text-xs leading-snug text-muted-foreground">
          {toolsDisplayDescription(item)}
        </span>
      </span>
    </>
  )
}

export function ToolTile({ item }: { item: ToolsNavItem }) {
  const body = <TileBody item={item} />

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={TILE_CLASS}
      >
        {body}
      </a>
    )
  }

  return (
    <Link href={item.href} prefetch={false} className={TILE_CLASS}>
      {body}
    </Link>
  )
}

export function ToolsCatalogGrid({ children }: { children: ReactNode }) {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  )
}
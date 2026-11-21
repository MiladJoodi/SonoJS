"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BoxIcon,
  ChevronDownIcon,
  GalleryHorizontalEndIcon,
  LayoutGridIcon,
  LayoutTemplateIcon,
  MousePointer2Icon,
  PercentIcon,
  PlugIcon,
  SparklesIcon,
  StoreIcon,
  WallpaperIcon,
  type LucideIcon,
} from "lucide-react"

import {
  flattenSiteNavEntries,
  isSiteNavDropdown,
  type SiteNavEntry,
  type SiteNavItem,
} from "@/lib/config"
import { cn } from "@/lib/utils"

const linkClass =
  "relative inline-flex cursor-pointer items-center px-2.5 py-1 text-sm font-medium"
const idleClass = "text-muted-foreground hover:text-foreground"
const activeClass =
  "text-primary underline decoration-primary decoration-2 underline-offset-8"

const NAV_ICONS: Record<string, LucideIcon> = {
  "/docs/components": LayoutGridIcon,
  "/templates": StoreIcon,
  "/websites": LayoutTemplateIcon,
  "/ai": SparklesIcon,
  "/cursors": MousePointer2Icon,
  "/backgrounds": WallpaperIcon,
  "/3d": BoxIcon,
  "/promo": PercentIcon,
  "/carousels": GalleryHorizontalEndIcon,
  "/docs/mcp": PlugIcon,
}

function pathIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavLink({
  item,
  active,
}: {
  item: SiteNavItem
  active: boolean
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={cn(linkClass, idleClass)}
      >
        {item.label}
      </a>
    )
  }

  return (
    <Link
      href={item.href}
      prefetch={false}
      aria-current={active ? "page" : undefined}
      className={cn(linkClass, active ? activeClass : idleClass)}
    >
      {item.label}
    </Link>
  )
}

function DropdownTile({
  item,
  active,
}: {
  item: SiteNavItem
  active: boolean
}) {
  const Icon = NAV_ICONS[item.href]
  const className = cn(
    "flex w-full cursor-pointer items-center gap-3 rounded-[12px] p-2.5 no-underline outline-none transition-colors",
    "hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring",
    active && "bg-muted/40"
  )

  const body = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-muted text-foreground">
        {Icon ? (
          <Icon className="size-4" aria-hidden />
        ) : (
          <span className="text-xs font-semibold">{item.label.slice(0, 1)}</span>
        )}
      </span>
      <span className="min-w-0 flex-1 space-y-0.5 text-start whitespace-nowrap">
        <span
          className={cn(
            "block text-sm font-medium text-foreground",
            active && "text-primary"
          )}
        >
          {item.label}
        </span>
        {item.description ? (
          <span className="block text-xs leading-snug text-muted-foreground">
            {item.description}
          </span>
        ) : null}
      </span>
    </>
  )

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={className}
      >
        {body}
      </a>
    )
  }

  return (
    <Link
      href={item.href}
      prefetch={false}
      aria-current={active ? "page" : undefined}
      className={className}
    >
      {body}
    </Link>
  )
}

function NavDropdown({
  entry,
  pathname,
}: {
  entry: Extract<SiteNavEntry, { sections: unknown }>
  pathname: string
}) {
  const childHrefs = entry.sections.flatMap((s) => s.items.map((i) => i.href))
  const active = childHrefs.some((href) => pathIsActive(pathname, href))
  const isProducts = entry.label === "Products"
  const itemCount = childHrefs.length
  const panelId = React.useId()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          linkClass,
          "gap-1 outline-none",
          active ? activeClass : open ? "text-foreground" : idleClass
        )}
      >
        {entry.label}
        <ChevronDownIcon
          className={cn(
            "size-3.5 opacity-70 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {/*
        In-tree panel + hover open / leave close. No focus-within pin, so a
        click does not leave the menu stuck open after the pointer exits.
      */}
      <div
        id={panelId}
        role="menu"
        className={cn(
          "absolute start-0 top-full z-50 pt-2 transition-[opacity,visibility] duration-150",
          open
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        )}
      >
        <div className="w-max max-w-[calc(100vw-2rem)] overflow-hidden rounded-[14px] border border-border/70 bg-popover p-2 shadow-soft">
          <div className="space-y-3 p-1">
            {entry.sections.map((section, index) => (
              <div key={section.title ?? index} className="space-y-1.5">
                {section.title ? (
                  <div className="px-3 pt-1 text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                    {section.title}
                  </div>
                ) : null}
                <div
                  className={cn(
                    "grid gap-1",
                    !isProducts && itemCount > 2
                      ? "sm:grid-cols-2"
                      : "grid-cols-1"
                  )}
                >
                  {section.items.map((item) => (
                    <DropdownTile
                      key={item.href}
                      item={item}
                      active={
                        !item.external && pathIsActive(pathname, item.href)
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: SiteNavEntry[]
}) {
  const pathname = usePathname()
  const flat = flattenSiteNavEntries(items)
  const activeHref = flat
    .filter((item) => !item.external && pathIsActive(pathname, item.href))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href

  return (
    <nav className={cn("items-center gap-0", className)} {...props}>
      {items.map((entry) => {
        if (isSiteNavDropdown(entry)) {
          return (
            <NavDropdown
              key={entry.label}
              entry={entry}
              pathname={pathname}
            />
          )
        }

        return (
          <NavLink
            key={entry.href}
            item={entry}
            active={!entry.external && entry.href === activeHref}
          />
        )
      })}
    </nav>
  )
}

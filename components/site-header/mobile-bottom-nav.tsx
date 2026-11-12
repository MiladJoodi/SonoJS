"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpenIcon,
  BoxIcon,
  ChartAreaIcon,
  EllipsisIcon,
  GalleryHorizontalEndIcon,
  HouseIcon,
  LayoutGridIcon,
  LayoutTemplateIcon,
  MousePointer2Icon,
  PlugIcon,
  ShapesIcon,
  SparklesIcon,
  StoreIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react"

import {
  getMobileBottomNavActive,
  getMobileMoreNavItems,
  isMobileBottomNavMore,
  mobileBottomNav,
  MOBILE_BOTTOM_NAV_CLEARANCE,
  shouldShowMobileBottomNav,
} from "@/lib/mobile-nav"
import { cn } from "@/lib/utils"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@sonojs/ui/components/drawer"

const TAB_ICONS: Record<string, LucideIcon> = {
  components: LayoutGridIcon,
  blocks: LayoutTemplateIcon,
  templates: StoreIcon,
  charts: ChartAreaIcon,
  more: EllipsisIcon,
}

const MORE_ICONS: Record<string, LucideIcon> = {
  "/": HouseIcon,
  "/docs": BookOpenIcon,
  "/docs/mcp": PlugIcon,
  "/ai": SparklesIcon,
  "/cursors": MousePointer2Icon,
  "/3d": BoxIcon,
  "/carousels": GalleryHorizontalEndIcon,
  "/tools": WrenchIcon,
  "https://icons.sonojs.com": ShapesIcon,
}

/**
 * Instagram / YouTube style: bare icon + caption, no pill chrome.
 * Active = primary stroke + label; idle = muted.
 */
function TabGlyph({
  Icon,
  active,
}: {
  Icon: LucideIcon
  active: boolean
}) {
  return (
    <Icon
      aria-hidden
      strokeWidth={active ? 2.25 : 1.75}
      absoluteStrokeWidth
      className={cn(
        "size-[22px] shrink-0 transition-colors duration-150",
        active ? "text-primary" : "text-muted-foreground"
      )}
    />
  )
}

const tabHitClass =
  "inline-flex h-full min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 px-0.5 transition-opacity duration-150 active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"

export function MobileBottomNav() {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = React.useState(false)
  const show = shouldShowMobileBottomNav(pathname)
  const active = React.useMemo(
    () => getMobileBottomNavActive(pathname),
    [pathname]
  )
  const moreItems = React.useMemo(() => getMobileMoreNavItems(), [])

  React.useEffect(() => {
    setMoreOpen(false)
  }, [pathname])

  if (!show) return null

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none shrink-0 lg:hidden"
        style={{ height: MOBILE_BOTTOM_NAV_CLEARANCE }}
      />

      <nav
        data-mobile-bottom-nav=""
        aria-label="Mobile"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 lg:hidden",
          "border-t border-border/70 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80",
          "pb-[env(safe-area-inset-bottom,0px)]"
        )}
      >
        <div className="mx-auto flex h-12 max-w-lg items-stretch">
          {mobileBottomNav.map((item) => {
            const Icon = TAB_ICONS[item.id] ?? EllipsisIcon
            const isActive = active.tabId === item.id

            const label = (
              <span
                className={cn(
                  "max-w-full truncate text-[10px] leading-none tracking-tight",
                  isActive
                    ? "font-semibold text-primary"
                    : "font-medium text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            )

            if (isMobileBottomNavMore(item)) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMoreOpen(true)}
                  aria-current={isActive ? "page" : undefined}
                  aria-expanded={moreOpen}
                  aria-haspopup="dialog"
                  className={tabHitClass}
                >
                  <TabGlyph Icon={Icon} active={isActive} />
                  {label}
                </button>
              )
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                prefetch={false}
                aria-current={isActive ? "page" : undefined}
                className={tabHitClass}
              >
                <TabGlyph Icon={Icon} active={isActive} />
                {label}
              </Link>
            )
          })}
        </div>
      </nav>

      <Drawer open={moreOpen} onOpenChange={setMoreOpen} direction="bottom">
        <DrawerContent className="max-h-[min(80vh,32rem)]">
          <DrawerHeader className="text-start">
            <DrawerTitle>Browse</DrawerTitle>
            <DrawerDescription className="sr-only">
              Additional site sections
            </DrawerDescription>
          </DrawerHeader>
          <nav className="grid grid-cols-2 gap-2 px-3 pb-[max(2rem,calc(1.25rem+env(safe-area-inset-bottom,0px)))]">
            {moreItems.map((item) => {
              const Icon = MORE_ICONS[item.href]
              const isActive =
                !item.external && item.href === active.moreHref
              const rowClass = cn(
                "flex h-12 cursor-pointer flex-row items-center gap-2.5 rounded-[12px] border border-border/60 bg-card px-3 text-start transition-colors",
                isActive
                  ? "border-primary/30 bg-primary/8 text-primary"
                  : "text-foreground/90 hover:bg-muted/50"
              )
              const content = (
                <>
                  <span
                    className={cn(
                      "inline-flex size-7 shrink-0 items-center justify-center rounded-full",
                      isActive ? "bg-primary/15" : "bg-muted/70"
                    )}
                  >
                    {Icon ? (
                      <Icon className="size-3.5 shrink-0" aria-hidden />
                    ) : null}
                  </span>
                  <span className="min-w-0 truncate text-[13px] font-medium leading-none">
                    {item.label}
                  </span>
                </>
              )

              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    onClick={() => setMoreOpen(false)}
                    className={rowClass}
                  >
                    {content}
                  </a>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={() => setMoreOpen(false)}
                  className={rowClass}
                >
                  {content}
                </Link>
              )
            })}
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  )
}

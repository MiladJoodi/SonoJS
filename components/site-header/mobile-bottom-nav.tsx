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
  MOBILE_BOTTOM_NAV_DOCK_HEIGHT,
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
  ai: SparklesIcon,
  charts: ChartAreaIcon,
  more: EllipsisIcon,
}

const MORE_ICONS: Record<string, LucideIcon> = {
  "/": HouseIcon,
  "/docs": BookOpenIcon,
  "/docs/mcp": PlugIcon,
  "/cursors": MousePointer2Icon,
  "/3d": BoxIcon,
  "/carousels": GalleryHorizontalEndIcon,
  "/marketplace": StoreIcon,
  "/tools": WrenchIcon,
  "https://icons.sonojs.com": ShapesIcon,
}

/** v1 — soft pill active, stroke icons, no fill clutter. */
function TabGlyph({
  Icon,
  active,
}: {
  Icon: LucideIcon
  active: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-full transition-[background-color,transform] duration-200",
        active ? "scale-100 bg-primary/12" : "bg-transparent"
      )}
    >
      <Icon
        aria-hidden
        strokeWidth={active ? 2 : 1.75}
        className={cn(
          "size-[1.125rem] shrink-0 transition-colors duration-200",
          active ? "text-primary" : "text-muted-foreground"
        )}
      />
    </span>
  )
}

const tabHitClass =
  "inline-flex h-full min-w-0 cursor-pointer flex-col items-center justify-center gap-0.5 px-1 transition-transform duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"

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

      <div
        data-mobile-bottom-nav=""
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 lg:hidden",
          "pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]"
        )}
      >
        <nav
          aria-label="Mobile"
          className={cn(
            "pointer-events-auto mx-auto max-w-md overflow-hidden rounded-[1.25rem]",
            "border border-border/60 bg-background/80 shadow-soft backdrop-blur-2xl backdrop-saturate-150",
            "dark:border-white/10 dark:bg-background/60"
          )}
          style={{ height: MOBILE_BOTTOM_NAV_DOCK_HEIGHT }}
        >
          <div className="grid h-full grid-cols-5">
            {mobileBottomNav.map((item) => {
              const Icon = TAB_ICONS[item.id] ?? EllipsisIcon
              const isActive = active.tabId === item.id

              const label = (
                <span
                  className={cn(
                    "max-w-full truncate text-[11px] font-medium leading-none tracking-tight transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground"
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
      </div>

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

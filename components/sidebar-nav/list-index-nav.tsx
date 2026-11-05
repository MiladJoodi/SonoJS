"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@sonojs/ui/components/drawer"

export type ListIndexAdjacentLink = {
  href: string
  title: string
}

/** Same chrome as DocsAdjacentPager — round outline prev/next. */
const PAGER_BTN_CLASS =
  "size-8 shrink-0 rounded-full border-border/70 bg-card shadow-none hover:bg-canvas"

/**
 * Mobile catalog index — sticky Browse bar + bottom sheet + optional prev/next.
 * Desktop sidebars stay separate; this is `lg:hidden` only.
 */
export function ListIndexNav({
  browseLabel = "Browse Components",
  drawerTitle,
  current,
  previous,
  next,
  children,
  className,
  /** Workspace shells sit below SiteHeader already - skip sticky header offset. */
  flush = false,
}: {
  /** Sticky trigger label, e.g. "Browse Components". */
  browseLabel?: string
  /** Sheet title (defaults to browseLabel). */
  drawerTitle?: string
  current?: string | null
  previous?: ListIndexAdjacentLink | null
  next?: ListIndexAdjacentLink | null
  children: React.ReactNode
  className?: string
  flush?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const sheetTitle = drawerTitle ?? browseLabel
  const sheetId = "list-index-sheet"

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Scroll active row inside the sheet only — never the page behind.
  React.useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => {
      const list = listRef.current
      if (!list) return
      const active =
        list.querySelector<HTMLElement>("[data-active]") ??
        list.querySelector<HTMLElement>('[aria-current="page"]')
      if (!active) return
      const listRect = list.getBoundingClientRect()
      const activeRect = active.getBoundingClientRect()
      const delta =
        activeRect.top -
        listRect.top -
        list.clientHeight / 2 +
        activeRect.height / 2
      list.scrollTop += delta
    }, 80)
    return () => window.clearTimeout(id)
  }, [open, pathname])

  return (
    <>
      <div
        data-list-index-nav=""
        className={cn(
          "z-40 border-b border-border/80 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/80 lg:hidden",
          flush
            ? "relative top-0 shrink-0"
            : "sticky top-(--header-height) transition-[top] duration-300 ease-out [[data-header-hidden]_&]:top-0",
          className
        )}
      >
        <div
          className={cn(
            "workspace-shell flex h-11 items-center gap-0.5",
            flush && "pe-[9.5rem]"
          )}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls={sheetId}
            aria-label={
              current
                ? `${browseLabel}. Current: ${current}`
                : browseLabel
            }
            className={cn(
              "flex h-9 min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-md px-0 text-start outline-none",
              "hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <ListIcon
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <span className="truncate text-sm font-medium leading-none text-foreground">
              {browseLabel}
            </span>
            <ChevronDownIcon
              aria-hidden
              className={cn(
                "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </button>

          <div className="flex shrink-0 items-center gap-2">
            {previous ? (
              <Button
                variant="outline"
                size="icon-xs"
                className={PAGER_BTN_CLASS}
                asChild
              >
                <Link
                  href={previous.href}
                  prefetch={false}
                  aria-label={`Prev: ${previous.title}`}
                >
                  <ChevronLeftIcon className="size-3.5 icon-dir" />
                </Link>
              </Button>
            ) : null}
            {next ? (
              <Button
                variant="outline"
                size="icon-xs"
                className={PAGER_BTN_CLASS}
                asChild
              >
                <Link
                  href={next.href}
                  prefetch={false}
                  aria-label={`Next: ${next.title}`}
                >
                  <ChevronRightIcon className="size-3.5 icon-dir" />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen} direction="bottom">
        <DrawerContent
          id={sheetId}
          className="max-h-[min(88svh,40rem)] gap-0"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <DrawerHeader className="border-b border-border/60 px-4 py-3 text-start">
            <DrawerTitle className="text-base">{sheetTitle}</DrawerTitle>
            <DrawerDescription className="sr-only">
              Search and jump to a page in {sheetTitle}
            </DrawerDescription>
          </DrawerHeader>
          <div
            ref={listRef}
            className="no-scrollbar overflow-y-auto overscroll-contain px-2 pt-2 pb-[max(6rem,calc(4.5rem+env(safe-area-inset-bottom,0px)))]"
          >
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

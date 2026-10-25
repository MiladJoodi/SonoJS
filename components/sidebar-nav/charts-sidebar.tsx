"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  CHARTS_GALLERY_ACTIVE_EVENT,
  chartGallerySectionId,
} from "@/components/charts"
import {
  chartsNav,
  getChartsActiveCategoryId,
  getChartsCurrentLabel,
} from "@/lib/charts-nav"
import type { ChartCategory } from "@/lib/charts-catalog"
import { isChartCategory } from "@/lib/charts-catalog"
import { cn } from "@/lib/utils"
import { ListIndexNav } from "@/components/sidebar-nav/list-index-nav"
import {
  matchesNavQuery,
  normalizeNavSearch,
  SidebarNavSearch,
} from "@/components/sidebar-nav/search"
import {
  SIDEBAR_COLLAPSIBLE_CONTENT_CLASS,
  SIDEBAR_EMPTY_CLASS,
  SIDEBAR_GROUP_COUNT_CLASS,
  SIDEBAR_GROUP_TRIGGER_CLASS,
  SIDEBAR_ITEM_ACTIVE,
  SIDEBAR_NESTED_ITEM_CLASS,
  SIDEBAR_NESTED_RAIL_CLASS,
  SIDEBAR_CONTENT_CLASS,
  SIDEBAR_SEARCH_INPUT_CLASS,
  SIDEBAR_SEARCH_WRAP_CLASS,
  SIDEBAR_SHELL_CLASS,
  SIDEBAR_TOP_LINK_CLASS,
  SidebarNavBullet,
  SidebarNavChevron,
  SidebarNavLabel,
  sidebarItemStateClass,
} from "@/components/sidebar-nav/ui"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@sonojs/ui/components/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@sonojs/ui/components/sidebar"

const OPEN_GROUPS_KEY = "sonojs-charts-sidebar-open"

function readOpenGroups(): Record<string, boolean> {
  if (typeof window === "undefined") return {}
  try {
    const raw = sessionStorage.getItem(OPEN_GROUPS_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, boolean>
  } catch {
    return {}
  }
}

function writeOpenGroups(next: Record<string, boolean>) {
  try {
    sessionStorage.setItem(OPEN_GROUPS_KEY, JSON.stringify(next))
  } catch {
    // ignore quota / private mode
  }
}

function readGalleryHashCategory(): ChartCategory | null {
  if (typeof window === "undefined") return null
  const hash = window.location.hash.replace(/^#chart-type-/, "")
  return isChartCategory(hash) ? hash : null
}

/**
 * FarsiUI pattern:
 * - Gallery (`/charts`): flat category list — click scrolls, no expand/collapse.
 * - Detail (view / category routes): collapsible folders; active category stays open;
 *   open state is user-toggled (+ session), not fight with scroll.
 */
function ChartsSidebarBody({ className }: { className?: string }) {
  const pathname = usePathname()
  const galleryMode = pathname === "/charts"
  const [query, setQuery] = React.useState("")
  const normalized = normalizeNavSearch(query)
  const routeCategoryId = getChartsActiveCategoryId(pathname)
  const [galleryCategoryId, setGalleryCategoryId] =
    React.useState<ChartCategory | null>(null)

  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    () => (routeCategoryId ? { [routeCategoryId]: true } : {})
  )

  React.useLayoutEffect(() => {
    if (galleryMode) {
      setGalleryCategoryId(readGalleryHashCategory())
      return
    }
    const saved = readOpenGroups()
    setOpenGroups({
      ...saved,
      ...(routeCategoryId ? { [routeCategoryId]: true } : {}),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount
  }, [])

  React.useEffect(() => {
    if (!galleryMode) {
      setGalleryCategoryId(null)
      return
    }
    const onActive = (event: Event) => {
      const id = (event as CustomEvent<{ id: ChartCategory | null }>).detail?.id
      if (id == null) {
        setGalleryCategoryId(null)
        return
      }
      if (isChartCategory(id)) setGalleryCategoryId(id)
    }
    const onHash = () => setGalleryCategoryId(readGalleryHashCategory())
    window.addEventListener(CHARTS_GALLERY_ACTIVE_EVENT, onActive)
    window.addEventListener("hashchange", onHash)
    setGalleryCategoryId(readGalleryHashCategory())
    return () => {
      window.removeEventListener(CHARTS_GALLERY_ACTIVE_EVENT, onActive)
      window.removeEventListener("hashchange", onHash)
    }
  }, [galleryMode])

  React.useEffect(() => {
    if (galleryMode || !routeCategoryId) return
    setOpenGroups((prev) => {
      if (prev[routeCategoryId]) return prev
      const next = { ...prev, [routeCategoryId]: true }
      writeOpenGroups(next)
      return next
    })
  }, [galleryMode, routeCategoryId])

  const setGroupOpen = React.useCallback((id: string, next: boolean) => {
    setOpenGroups((prev) => {
      const updated = { ...prev, [id]: next }
      writeOpenGroups(updated)
      return updated
    })
  }, [])

  const scrollGalleryToCategory = React.useCallback((category: ChartCategory) => {
    window.history.replaceState(null, "", `#${chartGallerySectionId(category)}`)
    setGalleryCategoryId(category)
    window.dispatchEvent(
      new CustomEvent("sonojs:charts-gallery-scroll-to", {
        detail: { id: category },
      })
    )
  }, [])

  const filtered = React.useMemo(() => {
    return chartsNav
      .map((group) => {
        const items = group.items.filter(
          (item) =>
            !normalized ||
            matchesNavQuery(item.title, normalized) ||
            matchesNavQuery(item.id, normalized) ||
            matchesNavQuery(group.title, normalized)
        )
        const categoryMatch =
          !normalized || matchesNavQuery(group.title, normalized)

        if (normalized && !categoryMatch && items.length === 0) {
          return null
        }

        return {
          ...group,
          items:
            normalized && categoryMatch && items.length === 0
              ? group.items
              : items,
        }
      })
      .filter((group): group is NonNullable<typeof group> => group != null)
  }, [normalized])

  React.useEffect(() => {
    if (galleryMode || !normalized) return
    setOpenGroups((prev) => {
      const next = { ...prev }
      for (const group of filtered) {
        next[group.id] = true
      }
      writeOpenGroups(next)
      return next
    })
  }, [galleryMode, normalized, filtered])

  const showIndex = matchesNavQuery("Charts", normalized) || !normalized

  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      <div className={SIDEBAR_SEARCH_WRAP_CLASS}>
        <SidebarNavSearch
          value={query}
          onValueChange={setQuery}
          onClear={() => setQuery("")}
          inputClassName={SIDEBAR_SEARCH_INPUT_CLASS}
        />
      </div>
      <SidebarContent className={SIDEBAR_CONTENT_CLASS}>
        {filtered.length === 0 && !showIndex ? (
          <p className={SIDEBAR_EMPTY_CLASS}>No matches</p>
        ) : (
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {showIndex ? (
                  <SidebarMenuItem>
                    <Link
                      href="/charts"
                      prefetch={false}
                      onClick={(event) => {
                        if (!galleryMode) return
                        event.preventDefault()
                        window.history.replaceState(null, "", "/charts")
                        setGalleryCategoryId(null)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                      data-active={
                        (galleryMode && !galleryCategoryId) || undefined
                      }
                      className={cn(
                        SIDEBAR_TOP_LINK_CLASS,
                        sidebarItemStateClass(
                          galleryMode && !galleryCategoryId
                        )
                      )}
                    >
                      <SidebarNavBullet />
                      <SidebarNavLabel label="All charts" />
                    </Link>
                  </SidebarMenuItem>
                ) : null}

                {galleryMode
                  ? filtered.map((group) => {
                      const active = galleryCategoryId === group.id
                      return (
                        <SidebarMenuItem key={group.id}>
                          <button
                            type="button"
                            onClick={() => scrollGalleryToCategory(group.id)}
                            className={cn(
                              SIDEBAR_GROUP_TRIGGER_CLASS,
                              "w-full cursor-pointer",
                              active && SIDEBAR_ITEM_ACTIVE
                            )}
                          >
                            <group.icon
                              className="size-3.5 shrink-0 opacity-80"
                              aria-hidden
                            />
                            <span className="min-w-0 flex-1 truncate text-start">
                              {group.title}
                            </span>
                            <span className={SIDEBAR_GROUP_COUNT_CLASS}>
                              {group.items.length}
                            </span>
                          </button>
                        </SidebarMenuItem>
                      )
                    })
                  : filtered.map((group) => {
                      const folderActive = routeCategoryId === group.id
                      const isSearching = Boolean(normalized)
                      const open = isSearching
                        ? true
                        : (openGroups[group.id] ?? false)

                      return (
                        <SidebarMenuItem key={group.id}>
                          <Collapsible
                            open={open}
                            onOpenChange={(next) => {
                              if (isSearching) return
                              setGroupOpen(group.id, next)
                            }}
                            className="group/charts-folder"
                          >
                            <CollapsibleTrigger
                              className={cn(
                                SIDEBAR_GROUP_TRIGGER_CLASS,
                                folderActive && SIDEBAR_ITEM_ACTIVE
                              )}
                            >
                              <group.icon
                                className="size-3.5 shrink-0 opacity-80"
                                aria-hidden
                              />
                              <span className="min-w-0 flex-1 truncate text-start">
                                {group.title}
                              </span>
                              <span className={SIDEBAR_GROUP_COUNT_CLASS}>
                                {group.items.length}
                              </span>
                              <SidebarNavChevron group="charts-folder" />
                            </CollapsibleTrigger>
                            <CollapsibleContent
                              className={SIDEBAR_COLLAPSIBLE_CONTENT_CLASS}
                            >
                              <div className={SIDEBAR_NESTED_RAIL_CLASS}>
                                {group.items.map((item) => {
                                  const active = pathname === item.href
                                  return (
                                    <Link
                                      key={item.id}
                                      href={item.href}
                                      prefetch={false}
                                      data-active={active || undefined}
                                      title={
                                        item.status === "pending"
                                          ? "Pending"
                                          : undefined
                                      }
                                      className={cn(
                                        SIDEBAR_NESTED_ITEM_CLASS,
                                        sidebarItemStateClass(active),
                                        item.status === "pending" &&
                                          !active &&
                                          "opacity-70"
                                      )}
                                    >
                                      <SidebarNavBullet
                                        featured={item.featured}
                                      />
                                      <SidebarNavLabel label={item.title} />
                                    </Link>
                                  )
                                })}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </SidebarMenuItem>
                      )
                    })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </div>
  )
}

export function ChartsSidebar() {
  return (
    <Sidebar collapsible="none" className={SIDEBAR_SHELL_CLASS}>
      <ChartsSidebarBody />
    </Sidebar>
  )
}

export function ChartsListIndex() {
  const pathname = usePathname()
  const current = getChartsCurrentLabel(pathname)

  return (
    <ListIndexNav title="Charts" current={current}>
      <ChartsSidebarBody />
    </ListIndexNav>
  )
}

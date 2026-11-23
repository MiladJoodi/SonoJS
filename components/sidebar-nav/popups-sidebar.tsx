"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ListIndexNav } from "@/components/sidebar-nav/list-index-nav"
import {
  matchesNavQuery,
  normalizeNavSearch,
  SidebarNavSearch,
} from "@/components/sidebar-nav/search"
import {
  SIDEBAR_CONTENT_CLASS,
  SIDEBAR_EMPTY_CLASS,
  SIDEBAR_NESTED_ITEM_CLASS,
  SIDEBAR_SEARCH_INPUT_CLASS,
  SIDEBAR_SEARCH_WRAP_CLASS,
  SIDEBAR_SHELL_CLASS,
  SIDEBAR_TOP_LINK_CLASS,
  SIDEBAR_ITEM_ACTIVE,
  SidebarNavBadge,
  SidebarNavBullet,
  SidebarNavLabel,
  sidebarItemStateClass,
} from "@/components/sidebar-nav/ui"
import {
  getPopupsAdjacent,
  getPopupsCurrentLabel,
  POPUPS_FEATURED_GROUP,
  popupsNav,
} from "@/lib/popups-nav"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@sonojs/ui/components/sidebar"

function PopupsSidebarBody({ className }: { className?: string }) {
  const pathname = usePathname()
  const [query, setQuery] = React.useState("")
  const normalized = normalizeNavSearch(query)

  const featuredHrefs = React.useMemo(() => {
    const featured = popupsNav.groups.find(
      (group) => group.title === POPUPS_FEATURED_GROUP
    )
    return new Set(featured?.pages.map((page) => page.href) ?? [])
  }, [])

  const filteredGroups = React.useMemo(() => {
    if (!normalized) return popupsNav.groups
    return popupsNav.groups
      .map((group) => ({
        ...group,
        pages: group.pages.filter(
          (page) =>
            matchesNavQuery(page.title, normalized) ||
            matchesNavQuery(page.href, normalized)
        ),
      }))
      .filter((group) => group.pages.length > 0)
  }, [normalized])

  const showTop = !normalized

  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
      <div className={SIDEBAR_SEARCH_WRAP_CLASS}>
        <SidebarNavSearch
          value={query}
          onValueChange={setQuery}
          onClear={() => setQuery("")}
          placeholder="Search promo…"
          inputClassName={SIDEBAR_SEARCH_INPUT_CLASS}
        />
      </div>
      <SidebarContent className={SIDEBAR_CONTENT_CLASS}>
        {filteredGroups.length === 0 && !showTop ? (
          <p className={SIDEBAR_EMPTY_CLASS}>No matches.</p>
        ) : (
          <>
            {showTop
              ? popupsNav.top.map((item) => {
                  const active = pathname === item.href
                  return (
                    <SidebarGroup key={item.href} className="p-0">
                      <SidebarGroupContent>
                        <SidebarMenu className="gap-0.5">
                          <SidebarMenuItem>
                            <Link
                              href={item.href}
                              prefetch={false}
                              data-active={active || undefined}
                              className={cn(
                                SIDEBAR_TOP_LINK_CLASS,
                                active && SIDEBAR_ITEM_ACTIVE
                              )}
                            >
                              {item.title}
                            </Link>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  )
                })
              : null}

            {filteredGroups.map((group, groupIndex) => (
              <SidebarGroup
                key={group.title || `group-${groupIndex}`}
                className="p-0"
              >
                {group.title && group.title !== POPUPS_FEATURED_GROUP ? (
                  <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground">
                    {group.title}
                  </SidebarGroupLabel>
                ) : null}
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0.5">
                    {group.pages.map((page) => {
                      const pathActive = pathname === page.href
                      const active =
                        pathActive &&
                        (group.title === POPUPS_FEATURED_GROUP ||
                          !featuredHrefs.has(page.href))
                      return (
                        <SidebarMenuItem key={`${group.title}-${page.href}`}>
                          <Link
                            href={page.href}
                            prefetch={false}
                            data-active={active || undefined}
                            className={cn(
                              SIDEBAR_NESTED_ITEM_CLASS,
                              "ms-0",
                              sidebarItemStateClass(active)
                            )}
                          >
                            <SidebarNavBullet featured={page.featured} />
                            <SidebarNavLabel label={page.title} />
                            {page.badge === "new" ? (
                              <SidebarNavBadge>New</SidebarNavBadge>
                            ) : null}
                          </Link>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </>
        )}
      </SidebarContent>
    </div>
  )
}

export function PopupsSidebar() {
  return (
    <Sidebar collapsible="none" className={SIDEBAR_SHELL_CLASS}>
      <PopupsSidebarBody />
    </Sidebar>
  )
}

export function PopupsListIndex() {
  const pathname = usePathname()
  const current = getPopupsCurrentLabel(pathname)
  const { previous, next } = getPopupsAdjacent(pathname)

  return (
    <ListIndexNav
      browseLabel="Browse Popups"
      drawerTitle="Promo"
      current={current}
      previous={previous}
      next={next}
    >
      <PopupsSidebarBody />
    </ListIndexNav>
  )
}

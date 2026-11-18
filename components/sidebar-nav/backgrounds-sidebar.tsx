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
  BACKGROUNDS_FEATURED_GROUP,
  backgroundsNav,
  getBackgroundsAdjacent,
  getBackgroundsCurrentLabel,
} from "@/lib/backgrounds-nav"
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

function BackgroundsSidebarBody({ className }: { className?: string }) {
  const pathname = usePathname()
  const [query, setQuery] = React.useState("")
  const normalized = normalizeNavSearch(query)

  const featuredHrefs = React.useMemo(() => {
    const featured = backgroundsNav.groups.find(
      (group) => group.title === BACKGROUNDS_FEATURED_GROUP
    )
    return new Set(featured?.pages.map((page) => page.href) ?? [])
  }, [])

  const filteredGroups = React.useMemo(() => {
    if (!normalized) return backgroundsNav.groups
    return backgroundsNav.groups
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
          placeholder="Search backgrounds…"
          inputClassName={SIDEBAR_SEARCH_INPUT_CLASS}
        />
      </div>
      <SidebarContent className={SIDEBAR_CONTENT_CLASS}>
        {filteredGroups.length === 0 && !showTop ? (
          <p className={SIDEBAR_EMPTY_CLASS}>No matches.</p>
        ) : (
          <>
            {showTop
              ? backgroundsNav.top.map((item) => {
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
                {group.title ? (
                  <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground">
                    {group.title === BACKGROUNDS_FEATURED_GROUP
                      ? "Featured 🔥"
                      : group.title}
                  </SidebarGroupLabel>
                ) : null}
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0.5">
                    {group.pages.map((page) => {
                      const pathActive = pathname === page.href
                      const active =
                        pathActive &&
                        (group.title === BACKGROUNDS_FEATURED_GROUP ||
                          !featuredHrefs.has(page.href))
                      return (
                        <SidebarMenuItem key={page.href}>
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

export function BackgroundsSidebar() {
  return (
    <Sidebar collapsible="none" className={SIDEBAR_SHELL_CLASS}>
      <BackgroundsSidebarBody />
    </Sidebar>
  )
}

export function BackgroundsListIndex() {
  const pathname = usePathname()
  const current = getBackgroundsCurrentLabel(pathname)
  const { previous, next } = getBackgroundsAdjacent(pathname)

  return (
    <ListIndexNav
      browseLabel="Browse Backgrounds"
      drawerTitle="Backgrounds"
      current={current}
      previous={previous}
      next={next}
    >
      <BackgroundsSidebarBody />
    </ListIndexNav>
  )
}

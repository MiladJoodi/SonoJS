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
  SIDEBAR_SEARCH_INPUT_CLASS,
  SIDEBAR_SEARCH_WRAP_CLASS,
  SIDEBAR_SHELL_CLASS,
  SIDEBAR_TOP_LINK_CLASS,
  SidebarNavBadge,
  SidebarNavBullet,
  SidebarNavLabel,
  sidebarItemStateClass,
} from "@/components/sidebar-nav/ui"
import {
  getToolsAdjacent,
  getToolsCurrentLabel,
  toolsNav,
} from "@/lib/tools-nav"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@sonojs/ui/components/sidebar"

function ToolsSidebarBody({ className }: { className?: string }) {
  const pathname = usePathname()
  const [query, setQuery] = React.useState("")
  const normalized = normalizeNavSearch(query)

  const filtered = toolsNav.filter(
    (item) =>
      matchesNavQuery(item.title, normalized) ||
      matchesNavQuery(item.description, normalized)
  )

  const showIndex = matchesNavQuery("Tools", normalized)

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
                      href="/tools"
                      prefetch={false}
                      data-active={pathname === "/tools" || undefined}
                      className={cn(
                        SIDEBAR_TOP_LINK_CLASS,
                        sidebarItemStateClass(pathname === "/tools")
                      )}
                    >
                      <SidebarNavBullet />
                      <SidebarNavLabel label="All tools" />
                    </Link>
                  </SidebarMenuItem>
                ) : null}
                {filtered.map((item) => {
                  const active = !item.external && pathname === item.href
                  const className = cn(
                    SIDEBAR_TOP_LINK_CLASS,
                    sidebarItemStateClass(active)
                  )
                  return (
                    <SidebarMenuItem key={item.href}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={className}
                        >
                          <SidebarNavBullet featured={item.featured} />
                          <span className="flex min-w-0 flex-1 items-center gap-2">
                            <SidebarNavLabel label={item.title} />
                            {item.badge === "new" ? (
                              <SidebarNavBadge>New</SidebarNavBadge>
                            ) : null}
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          prefetch={false}
                          data-active={active || undefined}
                          className={className}
                        >
                          <SidebarNavBullet featured={item.featured} />
                          <span className="flex min-w-0 flex-1 items-center gap-2">
                            <SidebarNavLabel label={item.title} />
                            {item.badge === "new" ? (
                              <SidebarNavBadge>New</SidebarNavBadge>
                            ) : null}
                          </span>
                        </Link>
                      )}
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

export function ToolsSidebar({ className }: { className?: string }) {
  return (
    <Sidebar
      id="tools-sidebar"
      collapsible="none"
      className={cn(SIDEBAR_SHELL_CLASS, className)}
    >
      <ToolsSidebarBody />
    </Sidebar>
  )
}

export function ToolsListIndex({ flush = false }: { flush?: boolean }) {
  const pathname = usePathname()
  const current = getToolsCurrentLabel(pathname)
  const { previous, next } = getToolsAdjacent(pathname)

  return (
    <ListIndexNav
      browseLabel="Browse Tools"
      drawerTitle="Tools"
      current={current}
      previous={previous}
      next={next}
      flush={flush}
    >
      <ToolsSidebarBody />
    </ListIndexNav>
  )
}

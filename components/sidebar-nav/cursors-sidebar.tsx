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
  SidebarNavBullet,
  SidebarNavLabel,
  sidebarItemStateClass,
} from "@/components/sidebar-nav/ui"
import { cursorsNav, getCursorsCurrentLabel } from "@/lib/cursors-nav"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@sonojs/ui/components/sidebar"

function CursorsSidebarBody({ className }: { className?: string }) {
  const pathname = usePathname()
  const [query, setQuery] = React.useState("")
  const normalized = normalizeNavSearch(query)

  const filtered = React.useMemo(() => {
    if (!normalized) return cursorsNav
    return cursorsNav.filter(
      (item) =>
        matchesNavQuery(item.title, normalized) ||
        matchesNavQuery(item.id, normalized)
    )
  }, [normalized])

  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
      <div className={SIDEBAR_SEARCH_WRAP_CLASS}>
        <SidebarNavSearch
          value={query}
          onValueChange={setQuery}
          onClear={() => setQuery("")}
          placeholder="Search cursors…"
          inputClassName={SIDEBAR_SEARCH_INPUT_CLASS}
        />
      </div>
      <SidebarContent className={SIDEBAR_CONTENT_CLASS}>
        {filtered.length === 0 ? (
          <p className={SIDEBAR_EMPTY_CLASS}>No matches.</p>
        ) : (
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {!normalized ? (
                  <SidebarMenuItem>
                    <Link
                      href="/cursors"
                      prefetch={false}
                      data-active={pathname === "/cursors" || undefined}
                      className={cn(
                        SIDEBAR_TOP_LINK_CLASS,
                        pathname === "/cursors" && SIDEBAR_ITEM_ACTIVE
                      )}
                    >
                      All cursors
                    </Link>
                  </SidebarMenuItem>
                ) : null}

                {filtered.map((item) => {
                  const active = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.id}>
                      <Link
                        href={item.href}
                        prefetch={false}
                        data-active={active || undefined}
                        title={
                          item.status === "pending" ? "Pending" : undefined
                        }
                        className={cn(
                          SIDEBAR_NESTED_ITEM_CLASS,
                          "ms-0",
                          sidebarItemStateClass(active),
                          item.status === "pending" &&
                            !active &&
                            "opacity-70"
                        )}
                      >
                        <SidebarNavBullet featured={item.featured} />
                        <SidebarNavLabel label={item.title} />
                      </Link>
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

export function CursorsSidebar() {
  return (
    <Sidebar collapsible="none" className={SIDEBAR_SHELL_CLASS}>
      <CursorsSidebarBody />
    </Sidebar>
  )
}

export function CursorsListIndex() {
  const pathname = usePathname()
  const current = getCursorsCurrentLabel(pathname)

  return (
    <ListIndexNav title="Cursors" current={current}>
      <CursorsSidebarBody />
    </ListIndexNav>
  )
}

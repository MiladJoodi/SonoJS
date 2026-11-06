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
  SIDEBAR_ITEM_ACTIVE,
  SIDEBAR_NESTED_ITEM_CLASS,
  SIDEBAR_SEARCH_INPUT_CLASS,
  SIDEBAR_SEARCH_WRAP_CLASS,
  SIDEBAR_SHELL_CLASS,
  SIDEBAR_TOP_LINK_CLASS,
  SidebarNavBullet,
  SidebarNavLabel,
  sidebarItemStateClass,
} from "@/components/sidebar-nav/ui"
import {
  getLegalAdjacent,
  getLegalCurrentLabel,
  legalNav,
} from "@/lib/legal-nav"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@sonojs/ui/components/sidebar"

function LegalSidebarBody({ className }: { className?: string }) {
  const pathname = usePathname()
  const [query, setQuery] = React.useState("")
  const normalized = normalizeNavSearch(query)

  const filtered = React.useMemo(() => {
    if (!normalized) return legalNav
    return legalNav.filter(
      (item) =>
        matchesNavQuery(item.title, normalized) ||
        matchesNavQuery(item.id, normalized) ||
        matchesNavQuery(item.description, normalized)
    )
  }, [normalized])

  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
      <div className={SIDEBAR_SEARCH_WRAP_CLASS}>
        <SidebarNavSearch
          value={query}
          onValueChange={setQuery}
          onClear={() => setQuery("")}
          placeholder="Search legal…"
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
                      href="/legal"
                      prefetch={false}
                      data-active={pathname === "/legal" || undefined}
                      className={cn(
                        SIDEBAR_TOP_LINK_CLASS,
                        pathname === "/legal" && SIDEBAR_ITEM_ACTIVE
                      )}
                    >
                      Overview
                    </Link>
                  </SidebarMenuItem>
                ) : null}

                {filtered.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`)
                  return (
                    <SidebarMenuItem key={item.id}>
                      <Link
                        href={item.href}
                        prefetch={false}
                        data-active={active || undefined}
                        className={cn(
                          SIDEBAR_NESTED_ITEM_CLASS,
                          "ms-0",
                          sidebarItemStateClass(active)
                        )}
                      >
                        <SidebarNavBullet />
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

export function LegalSidebar() {
  return (
    <Sidebar collapsible="none" className={SIDEBAR_SHELL_CLASS}>
      <LegalSidebarBody />
    </Sidebar>
  )
}

export function LegalListIndex() {
  const pathname = usePathname()
  const current = getLegalCurrentLabel(pathname)
  const { previous, next } = getLegalAdjacent(pathname)

  return (
    <ListIndexNav
      browseLabel="Browse Legal"
      drawerTitle="Legal"
      current={current}
      previous={previous}
      next={next}
    >
      <LegalSidebarBody />
    </ListIndexNav>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  componentsNav,
  docsNav,
  getDocsCurrentLabel,
  isComponentsDocsPath,
  type DocsNavGroup,
  type DocsNavPage,
} from "@/lib/docs-nav"
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

function isTopLinkActive(pathname: string, page: DocsNavPage) {
  if (page.href === "/docs" || page.href === "/docs/components") {
    return pathname === page.href
  }
  return pathname === page.href || pathname.startsWith(`${page.href}/`)
}

function DocsSidebarBody({ className }: { className?: string }) {
  const pathname = usePathname()
  const [query, setQuery] = React.useState("")
  const [openMap, setOpenMap] = React.useState<Record<string, boolean>>({})
  const normalized = normalizeNavSearch(query)
  const isSearching = normalized.length > 0
  const nav = isComponentsDocsPath(pathname) ? componentsNav : docsNav

  const filteredGroups = nav.groups
    .map((group: DocsNavGroup) => ({
      ...group,
      pages: group.pages.filter(
        (page) =>
          matchesNavQuery(page.title, normalized) ||
          matchesNavQuery(group.title, normalized)
      ),
    }))
    .filter((group) => group.pages.length > 0)

  const filteredTop = nav.top.filter((page) =>
    matchesNavQuery(page.title, normalized)
  )

  const isEmpty = filteredTop.length === 0 && filteredGroups.length === 0
  const showSearch = isComponentsDocsPath(pathname) || nav.top.length > 6

  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      {showSearch ? (
        <div className={SIDEBAR_SEARCH_WRAP_CLASS}>
          <SidebarNavSearch
            value={query}
            onValueChange={setQuery}
            onClear={() => setQuery("")}
            inputClassName={SIDEBAR_SEARCH_INPUT_CLASS}
          />
        </div>
      ) : null}
      <SidebarContent className={SIDEBAR_CONTENT_CLASS}>
        {isEmpty ? (
          <p className={SIDEBAR_EMPTY_CLASS}>No matches</p>
        ) : (
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredTop.map((page) => {
                  const active = isTopLinkActive(pathname, page)
                  return (
                    <SidebarMenuItem key={page.href}>
                      <Link
                        href={page.href}
                        prefetch={false}
                        data-active={active || undefined}
                        className={cn(
                          SIDEBAR_TOP_LINK_CLASS,
                          sidebarItemStateClass(active)
                        )}
                      >
                        <SidebarNavBullet featured={page.featured} />
                        <SidebarNavLabel label={page.title} />
                      </Link>
                    </SidebarMenuItem>
                  )
                })}
                {filteredGroups.map((group) => {
                  const open = isSearching
                    ? true
                    : (openMap[group.title] ?? true)
                  return (
                    <SidebarMenuItem key={group.title}>
                      <Collapsible
                        open={open}
                        onOpenChange={(next) => {
                          if (isSearching) return
                          setOpenMap((prev) => ({
                            ...prev,
                            [group.title]: next,
                          }))
                        }}
                        className="group/docs-folder"
                      >
                        <CollapsibleTrigger
                          className={SIDEBAR_GROUP_TRIGGER_CLASS}
                        >
                          <span className="min-w-0 flex-1 truncate text-start">
                            {group.title}
                          </span>
                          <span className={SIDEBAR_GROUP_COUNT_CLASS}>
                            {group.pages.length}
                          </span>
                          <SidebarNavChevron group="docs-folder" />
                        </CollapsibleTrigger>
                        <CollapsibleContent
                          className={SIDEBAR_COLLAPSIBLE_CONTENT_CLASS}
                        >
                          <div className={SIDEBAR_NESTED_RAIL_CLASS}>
                            {group.pages.map((page) => {
                              const active =
                                pathname === page.href ||
                                pathname.startsWith(`${page.href}/`)
                              return (
                                <Link
                                  key={page.href}
                                  href={page.href}
                                  prefetch={false}
                                  data-active={active || undefined}
                                  className={cn(
                                    SIDEBAR_NESTED_ITEM_CLASS,
                                    sidebarItemStateClass(active)
                                  )}
                                >
                                  <SidebarNavBullet
                                    featured={page.featured}
                                  />
                                  <SidebarNavLabel label={page.title} />
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

export function DocsSidebar() {
  return (
    <Sidebar collapsible="none" className={SIDEBAR_SHELL_CLASS}>
      <DocsSidebarBody />
    </Sidebar>
  )
}

export function DocsListIndex() {
  const pathname = usePathname()
  const current = getDocsCurrentLabel(pathname)
  const title = isComponentsDocsPath(pathname) ? "Components" : "Docs"

  return (
    <ListIndexNav title={title} current={current}>
      <DocsSidebarBody />
    </ListIndexNav>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PanelLeftIcon } from "lucide-react"

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
  SidebarNavBullet,
  SidebarNavLabel,
  sidebarItemStateClass,
} from "@/components/sidebar-nav/ui"
import { getToolsCurrentLabel, toolsNav } from "@/lib/tools-nav"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@sonojs/ui/components/sidebar"

export function ToolsSidebarToggle({
  open,
  onToggle,
  className,
}: {
  open: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "size-8 shrink-0 text-muted-foreground hover:text-foreground",
        className
      )}
      aria-expanded={open}
      aria-controls="tools-sidebar"
      aria-label={open ? "Hide tools sidebar" : "Show tools sidebar"}
      onClick={onToggle}
    >
      <PanelLeftIcon className="size-4 icon-dir" />
    </Button>
  )
}

function ToolsSidebarBody({
  className,
  trailing,
}: {
  className?: string
  trailing?: React.ReactNode
}) {
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
      <div
        className={cn(
          SIDEBAR_SEARCH_WRAP_CLASS,
          trailing && "flex items-center gap-1"
        )}
      >
        <div className="min-w-0 flex-1">
          <SidebarNavSearch
            value={query}
            onValueChange={setQuery}
            onClear={() => setQuery("")}
            inputClassName={SIDEBAR_SEARCH_INPUT_CLASS}
          />
        </div>
        {trailing}
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
                  const active = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.href}>
                      <Link
                        href={item.href}
                        prefetch={false}
                        data-active={active || undefined}
                        className={cn(
                          SIDEBAR_TOP_LINK_CLASS,
                          sidebarItemStateClass(active)
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

export function ToolsSidebar({
  onToggle,
  className,
}: {
  onToggle: () => void
  className?: string
}) {
  return (
    <Sidebar
      id="tools-sidebar"
      collapsible="none"
      className={cn(className ?? SIDEBAR_SHELL_CLASS)}
    >
      <ToolsSidebarBody
        trailing={<ToolsSidebarToggle open onToggle={onToggle} />}
      />
    </Sidebar>
  )
}

export function ToolsListIndex({ flush = false }: { flush?: boolean }) {
  const pathname = usePathname()
  const current = getToolsCurrentLabel(pathname)

  return (
    <ListIndexNav title="Tools" current={current} flush={flush}>
      <ToolsSidebarBody />
    </ListIndexNav>
  )
}

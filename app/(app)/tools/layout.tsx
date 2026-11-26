"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import {
  SIDEBAR_LAYOUT_MAIN_CLASS,
  ToolsListIndex,
  ToolsSidebar,
} from "@/components/sidebar-nav"
import { cn } from "@/lib/utils"
import { SidebarProvider } from "@sonojs/ui/components/sidebar"

import "@/styles/site-extended.css"

export default function ToolsLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const isWorkspace = pathname.startsWith("/tools/")

  return (
    <div
      className={cn(
        "flex flex-col",
        isWorkspace
          ? "h-[calc(100svh-var(--header-height))] overflow-hidden"
          : "flex-1"
      )}
    >
      <ToolsListIndex flush={isWorkspace} />
      <div className="workspace-shell flex min-h-0 min-w-0 flex-1 flex-col">
        <SidebarProvider
          className={cn(
            "flex w-full min-w-0 gap-(--sidebar-content-gap) px-0",
            isWorkspace ? "h-full min-h-0" : "min-h-min flex-1 items-start"
          )}
        >
          <ToolsDesktopSidebar isWorkspace={isWorkspace} />
          <div
            data-workspace-main=""
            className={cn(
              "relative min-w-0 flex-1",
              isWorkspace
                ? "flex h-full min-h-0 flex-col overflow-hidden"
                : SIDEBAR_LAYOUT_MAIN_CLASS
            )}
          >
            {children}
          </div>
        </SidebarProvider>
      </div>
    </div>
  )
}

function ToolsDesktopSidebar({ isWorkspace }: { isWorkspace: boolean }) {
  return (
    <div
      className={cn(
        "hidden w-(--sidebar-width) shrink-0 lg:block",
        isWorkspace
          ? "h-full min-h-0"
          : "sticky top-[calc(var(--header-height)+0.6rem)] h-[calc(100svh-var(--header-height)-2rem)] self-start"
      )}
    >
      <ToolsSidebar
        className={cn(
          isWorkspace &&
            "static top-auto z-0 h-full max-h-none w-full min-h-0"
        )}
      />
    </div>
  )
}
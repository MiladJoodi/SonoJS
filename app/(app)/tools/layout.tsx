"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import {
  SIDEBAR_LAYOUT_MAIN_CLASS,
  ToolsListIndex,
  ToolsSidebar,
  ToolsSidebarToggle,
} from "@/components/sidebar-nav"
import { cn } from "@/lib/utils"
import { SidebarProvider } from "@sonojs/ui/components/sidebar"

const TOOLS_SIDEBAR_KEY = "sonojs-tools-sidebar"
const SIDEBAR_MOTION = "200ms linear"

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isWorkspace = pathname.startsWith("/tools/")
  const [open, setOpen] = React.useState(true)
  const [motion, setMotion] = React.useState(false)

  React.useLayoutEffect(() => {
    if (window.localStorage.getItem(TOOLS_SIDEBAR_KEY) === "closed") {
      setOpen(false)
    }
  }, [])

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setMotion(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  function toggleSidebar() {
    setOpen((current) => {
      const next = !current
      window.localStorage.setItem(TOOLS_SIDEBAR_KEY, next ? "open" : "closed")
      return next
    })
  }

  const slide = motion
    ? `width ${SIDEBAR_MOTION}, margin-inline-end ${SIDEBAR_MOTION}`
    : "none"

  return (
    <div
      className={cn(
        "flex flex-col",
        isWorkspace
          ? "h-[calc(100svh-var(--header-height))] overflow-hidden"
          : "flex-1"
      )}
    >
      {/* Same mobile index as docs/blocks: bar → sheet from the start edge */}
      <ToolsListIndex flush={isWorkspace} />
      <div className="workspace-shell flex min-h-0 min-w-0 flex-1 flex-col">
        <SidebarProvider
          className={cn(
            "flex w-full min-w-0 px-0",
            isWorkspace ? "h-full min-h-0" : "min-h-min flex-1 items-start"
          )}
        >
          <div
            className={cn(
              "hidden shrink-0 overflow-hidden lg:block",
              isWorkspace
                ? "h-full"
                : "sticky top-[calc(var(--header-height)+0.6rem)] h-[calc(100svh-var(--header-height)-2rem)] self-start"
            )}
            style={{
              width: open ? "var(--sidebar-width)" : "0px",
              marginInlineEnd: open ? "var(--sidebar-content-gap)" : "0px",
              transition: slide,
            }}
          >
            <ToolsSidebar
              onToggle={toggleSidebar}
              className="relative flex h-full w-(--sidebar-width) min-h-0 overflow-hidden bg-transparent"
            />
          </div>
          <div
            data-workspace-main=""
            className={cn(
              "relative min-w-0 flex-1",
              isWorkspace
                ? "flex h-full min-h-0 flex-col overflow-hidden"
                : SIDEBAR_LAYOUT_MAIN_CLASS
            )}
            style={{
              paddingInlineStart: open ? "0px" : "3rem",
              transition: motion
                ? `padding-inline-start ${SIDEBAR_MOTION}`
                : "none",
            }}
          >
            <div
              inert={open}
              className="absolute z-40 hidden lg:flex"
              style={{
                insetInlineStart: "0.25rem",
                top: "0.5rem",
                opacity: open ? 0 : 1,
                transition: motion ? `opacity ${SIDEBAR_MOTION}` : "none",
              }}
            >
              <ToolsSidebarToggle open={false} onToggle={toggleSidebar} />
            </div>
            {children}
          </div>
        </SidebarProvider>
      </div>
    </div>
  )
}

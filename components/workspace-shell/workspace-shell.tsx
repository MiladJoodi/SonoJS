"use client"

import * as React from "react"

import { SIDEBAR_LAYOUT_MAIN_CLASS } from "@/components/sidebar-nav"
import {
  WorkspaceOfferRail,
  type WorkspaceOfferRailMode,
} from "@/components/workspace-offer-rail"
import { cn } from "@/lib/utils"
import { SidebarProvider } from "@sonojs/ui/components/sidebar"

import { WorkspacePanelToggle } from "./panel-toggle"
import {
  useWorkspacePanels,
  WorkspacePanelsProvider,
} from "./panels"

const PANEL_MOTION = "220ms ease"

function WorkspaceShellInner({
  sidebar,
  children,
  providerClassName,
  showOfferRail = true,
  offerRailMode = "full",
}: {
  sidebar: React.ReactNode
  children: React.ReactNode
  providerClassName?: string
  showOfferRail?: boolean
  offerRailMode?: WorkspaceOfferRailMode
}) {
  const { rightOpen, toggleRight, headerActionsMounted } = useWorkspacePanels()
  const [motion, setMotion] = React.useState(false)
  const [fallbackReady, setFallbackReady] = React.useState(false)

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setMotion(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  React.useLayoutEffect(() => {
    setFallbackReady(true)
  }, [])

  const slide = motion
    ? `width ${PANEL_MOTION}, margin-inline-start ${PANEL_MOTION}, opacity ${PANEL_MOTION}`
    : "none"

  // Fallback toggle only on pages without DocsAdjacentPager chrome.
  const showFallbackToggle =
    showOfferRail && fallbackReady && !headerActionsMounted

  return (
    <SidebarProvider
      className={cn(
        "flex min-h-min w-full min-w-0 flex-1 items-start px-0",
        providerClassName
      )}
    >
      <div
        className={cn(
          "hidden w-(--sidebar-width) shrink-0 lg:block",
          "sticky top-[calc(var(--header-height)+0.6rem)] h-[calc(100svh-var(--header-height)-2rem)] self-start",
          "me-(--sidebar-content-gap)"
        )}
      >
        {sidebar}
      </div>

      <div
        data-workspace-main=""
        className={cn(
          SIDEBAR_LAYOUT_MAIN_CLASS,
          "relative min-w-0 flex-1",
          showOfferRail && !rightOpen && "xl:pe-10"
        )}
      >
        {showFallbackToggle ? (
          <div className="absolute end-1 top-2 z-40">
            <WorkspacePanelToggle open={rightOpen} onToggle={toggleRight} />
          </div>
        ) : null}
        {children}
      </div>

      {showOfferRail ? (
        <div
          className={cn(
            "hidden shrink-0 xl:block",
            /* Same sticky pattern as the left sidebar — overflow-hidden breaks sticky. */
            "sticky top-[calc(var(--header-height)+0.6rem)] self-start",
            "max-h-[calc(100svh-var(--header-height)-2rem)]",
            rightOpen ? "overflow-x-hidden overflow-y-auto" : "overflow-hidden"
          )}
          style={{
            width: rightOpen ? "var(--offer-rail-width)" : "0px",
            marginInlineStart: rightOpen ? "var(--sidebar-content-gap)" : "0px",
            opacity: rightOpen ? 1 : 0,
            transition: slide,
          }}
        >
          <div className="w-(--offer-rail-width) min-w-(--offer-rail-width)">
            <WorkspaceOfferRail mode={offerRailMode} />
          </div>
        </div>
      ) : null}
    </SidebarProvider>
  )
}

/**
 * Shared docs/gallery chrome: fixed left nav + collapsible desktop right rail.
 */
export function WorkspaceShell({
  sidebar,
  children,
  listIndex,
  providerClassName,
  showOfferRail = true,
  offerRailMode = "full",
}: {
  sidebar: React.ReactNode
  children: React.ReactNode
  listIndex?: React.ReactNode
  providerClassName?: string
  showOfferRail?: boolean
  /** `toc` = On this page + contribute only (no offer card). */
  offerRailMode?: WorkspaceOfferRailMode
}) {
  return (
    <div className="flex flex-1 flex-col">
      {listIndex}
      <div className="workspace-shell flex flex-1 flex-col">
        <WorkspacePanelsProvider>
          <WorkspaceShellInner
            sidebar={sidebar}
            providerClassName={providerClassName}
            showOfferRail={showOfferRail}
            offerRailMode={offerRailMode}
          >
            {children}
          </WorkspaceShellInner>
        </WorkspacePanelsProvider>
      </div>
    </div>
  )
}

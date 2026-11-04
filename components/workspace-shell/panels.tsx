"use client"

import * as React from "react"

import { SITE_TOOLTIP_DELAY_MS } from "@/lib/site-tooltip"
import { TooltipProvider } from "@sonojs/ui/components/tooltip"

const RIGHT_KEY = "sonojs-workspace-right"

type WorkspacePanelsValue = {
  rightOpen: boolean
  setRightOpen: (open: boolean) => void
  toggleRight: () => void
  /** True when DocsAdjacentPager (or similar) owns the panel toggles. */
  headerActionsMounted: boolean
  registerHeaderActions: () => () => void
}

const WorkspacePanelsContext =
  React.createContext<WorkspacePanelsValue | null>(null)

function readStored(key: string, fallback: boolean) {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === "closed") return false
    if (raw === "open") return true
  } catch {
    /* ignore */
  }
  return fallback
}

function writeStored(key: string, open: boolean) {
  try {
    window.localStorage.setItem(key, open ? "open" : "closed")
  } catch {
    /* ignore */
  }
}

export function WorkspacePanelsProvider({
  children,
  defaultRightOpen = true,
}: {
  children: React.ReactNode
  defaultRightOpen?: boolean
}) {
  const [rightOpen, setRightOpenState] = React.useState(defaultRightOpen)
  const [hydrated, setHydrated] = React.useState(false)
  const [headerActionsCount, setHeaderActionsCount] = React.useState(0)

  const registerHeaderActions = React.useCallback(() => {
    setHeaderActionsCount((n) => n + 1)
    return () => setHeaderActionsCount((n) => Math.max(0, n - 1))
  }, [])

  React.useLayoutEffect(() => {
    setRightOpenState(readStored(RIGHT_KEY, defaultRightOpen))
    setHydrated(true)
  }, [defaultRightOpen])

  const setRightOpen = React.useCallback((open: boolean) => {
    setRightOpenState(open)
    writeStored(RIGHT_KEY, open)
  }, [])

  const toggleRight = React.useCallback(() => {
    setRightOpen(!rightOpen)
  }, [rightOpen, setRightOpen])

  // Ctrl+] right — physical key (layout-independent).
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey) {
        return
      }
      if (event.code !== "BracketRight") return

      const target = event.target
      if (target instanceof HTMLElement) {
        const tag = target.tagName
        if (
          target.isContentEditable ||
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT"
        ) {
          return
        }
      }

      event.preventDefault()
      toggleRight()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [toggleRight])

  const value = React.useMemo<WorkspacePanelsValue>(
    () => ({
      rightOpen,
      setRightOpen,
      toggleRight,
      headerActionsMounted: headerActionsCount > 0,
      registerHeaderActions,
    }),
    [
      rightOpen,
      setRightOpen,
      toggleRight,
      headerActionsCount,
      registerHeaderActions,
    ]
  )

  return (
    <WorkspacePanelsContext.Provider value={value}>
      <TooltipProvider delayDuration={SITE_TOOLTIP_DELAY_MS}>
        <div
          data-workspace-panels=""
          data-right={rightOpen ? "open" : "closed"}
          data-hydrated={hydrated ? "" : undefined}
          className="contents"
        >
          {children}
        </div>
      </TooltipProvider>
    </WorkspacePanelsContext.Provider>
  )
}

export function useWorkspacePanels() {
  const ctx = React.useContext(WorkspacePanelsContext)
  if (!ctx) {
    throw new Error("useWorkspacePanels must be used within WorkspacePanelsProvider")
  }
  return ctx
}

export function useWorkspacePanelsOptional() {
  return React.useContext(WorkspacePanelsContext)
}

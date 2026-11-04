"use client"

import * as React from "react"

import {
  getLoginDemoLoader,
  type LoginDemoId,
} from "@/app/(app)/blocks/authentication/login/login-demo-loaders"
import { cn } from "@/lib/utils"

/** Matches existing login docs wrappers around each form. */
export type LoginDemoLayout = "card" | "full" | "canvas"

function LoginDemoShell({
  layout,
  children,
}: {
  layout: LoginDemoLayout
  children: React.ReactNode
}) {
  if (layout === "card") {
    return (
      <div className="flex w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    )
  }
  if (layout === "canvas") {
    return (
      <div className="flex w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
        {children}
      </div>
    )
  }
  return children
}

/**
 * Login docs only: load a registry form when near the viewport (or immediately
 * when `eager`). Placeholder keeps BlockExample stage height (no CLS).
 */
export function LoginDemoLazy({
  name,
  layout = "full",
  eager = false,
  className,
}: {
  name: LoginDemoId
  layout?: LoginDemoLayout
  /** Load on mount (above-the-fold). */
  eager?: boolean
  className?: string
}) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = React.useState(eager)
  const [Demo, setDemo] = React.useState<React.ComponentType | null>(null)

  React.useEffect(() => {
    if (eager) {
      setShouldLoad(true)
      return
    }
    const node = rootRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "600px 0px", threshold: 0 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [eager])

  React.useEffect(() => {
    if (!shouldLoad || Demo) return
    const load = getLoginDemoLoader(name)
    if (!load) return

    let cancelled = false
    load()
      .then((mod) => {
        if (!cancelled) setDemo(() => mod.default)
      })
      .catch(() => {
        // Keep empty stage - height already reserved.
      })

    return () => {
      cancelled = true
    }
  }, [shouldLoad, Demo, name])

  return (
    <div
      ref={rootRef}
      className={cn(
        // Real box so IntersectionObserver positions are not zero-height.
        "w-full min-h-[28rem]",
        className
      )}
    >
      <LoginDemoShell layout={layout}>
        {Demo ? <Demo /> : null}
      </LoginDemoShell>
    </div>
  )
}

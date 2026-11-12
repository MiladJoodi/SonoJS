"use client"

import * as React from "react"

import { loadHomeBelowFoldCss } from "@/components/home/home-below-fold-css"
import { cn } from "@/lib/utils"

type ModuleMap = Record<string, unknown>

function resolveExport<T>(
  mod: ModuleMap,
  exportName?: string
): React.ComponentType<T> | null {
  if (exportName) {
    const named = mod[exportName]
    if (typeof named === "function") return named as React.ComponentType<T>
  }
  const fallback =
    ("default" in mod && mod.default) ||
    Object.values(mod).find((value) => typeof value === "function")
  if (typeof fallback !== "function") return null
  return fallback as React.ComponentType<T>
}

type LazyWhenVisibleProps<T extends object = Record<string, never>> = {
  /** Dynamic import that returns the demo module. */
  loader: () => Promise<ModuleMap>
  /** Named export to mount (defaults to `default` / first function export). */
  exportName?: string
  /** Props forwarded to the loaded component. */
  componentProps?: T
  /** Stable box so IntersectionObserver + CLS stay correct. */
  className?: string
  /**
   * Critical geometry that must not wait on deferred BTF utilities
   * (e.g. maxWidth + aspectRatio for the 3D orbit).
   */
  style?: React.CSSProperties
  /** Load immediately (above-the-fold / already visible). */
  eager?: boolean
  /** Expand viewport rootMargin before load (default ~1 screen). */
  rootMargin?: string
  /** Optional placeholder while waiting / loading (same size as className box). */
  placeholder?: React.ReactNode
  /**
   * Wait for homepage below-fold CSS before mounting the island (default true).
   * Prevents FOUC when the user scrolls quickly into a deferred section.
   */
  waitForBelowFoldCss?: boolean
}

/**
 * Homepage demos: keep section chrome as RSC; hydrate the heavy island only
 * when near the viewport (or immediately when `eager`).
 */
export function LazyWhenVisible<T extends object = Record<string, never>>({
  loader,
  exportName,
  componentProps,
  className,
  style,
  eager = false,
  rootMargin = "480px 0px",
  placeholder = null,
  waitForBelowFoldCss = true,
}: LazyWhenVisibleProps<T>) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const loaderRef = React.useRef(loader)
  loaderRef.current = loader
  const [shouldLoad, setShouldLoad] = React.useState(eager)
  const [Comp, setComp] = React.useState<React.ComponentType<T> | null>(null)

  React.useEffect(() => {
    if (eager) {
      setShouldLoad(true)
      return
    }
    const node = rootRef.current
    if (!node) return

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold: 0 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [eager, rootMargin])

  React.useEffect(() => {
    if (!shouldLoad || Comp) return

    let cancelled = false
    const run = async () => {
      try {
        if (waitForBelowFoldCss) {
          await loadHomeBelowFoldCss()
        }
        if (cancelled) return
        const mod = await loaderRef.current()
        if (cancelled) return
        const resolved = resolveExport<T>(mod, exportName)
        if (resolved) setComp(() => resolved)
      } catch {
        // Keep reserved box - height already set via className.
      }
    }
    void run()

    return () => {
      cancelled = true
    }
  }, [shouldLoad, Comp, exportName, waitForBelowFoldCss])

  return (
    <div
      ref={rootRef}
      className={cn("w-full min-w-0", className)}
      style={style}
    >
      {Comp ? <Comp {...(componentProps as T)} /> : placeholder}
    </div>
  )
}

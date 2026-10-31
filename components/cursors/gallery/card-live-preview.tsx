"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { getCursorDemoLoader } from "@/registry/cursors/demo-loaders"

type CursorModule = Record<string, unknown>

function resolveDemo(mod: CursorModule): React.ComponentType | null {
  const Comp =
    ("default" in mod && mod.default) ||
    Object.values(mod).find((value) => typeof value === "function")
  if (!Comp || typeof Comp !== "function") return null
  return Comp as React.ComponentType
}

/**
 * Lazy-loads a cursor demo into a compact gallery thumb.
 * Parent should mount this only while the card is hovered.
 */
export function CardLivePreview({
  id,
  className,
}: {
  id: string
  className?: string
}) {
  const load = getCursorDemoLoader(id)
  const [Demo, setDemo] = React.useState<React.ComponentType | null>(null)

  React.useEffect(() => {
    if (!load) return
    let cancelled = false
    setDemo(null)

    load()
      .then((mod) => {
        if (cancelled) return
        const Comp = resolveDemo(mod)
        if (Comp) setDemo(() => Comp)
      })
      .catch(() => {
        /* leave empty — icon underneath remains as fallback */
      })

    return () => {
      cancelled = true
    }
  }, [load])

  if (!load) return null

  return (
    <div
      aria-hidden
      data-sono-cursor-thumb=""
      className={cn(
        "absolute inset-0 overflow-hidden",
        // Fit tall demo stages into the thumb
        "[&>div]:h-full! [&>div]:min-h-0! [&>div]:max-h-full!",
        className
      )}
    >
      {/* Thumb-only: strip chrome; let pointer pass through anchors so the card isn’t nested <a><a>. */}
      <style>{`
        [data-sono-cursor-thumb] p,
        [data-sono-cursor-thumb] button {
          display: none !important;
        }
        [data-sono-cursor-thumb] a {
          pointer-events: none !important;
        }
      `}</style>
      {Demo ? <Demo /> : null}
    </div>
  )
}

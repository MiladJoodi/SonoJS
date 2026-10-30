"use client"

import * as React from "react"

import { LoadingRing } from "@/components/sono-loader"
import { cn } from "@/lib/utils"
import { getCursorDemoLoader } from "@/registry/cursors/demo-loaders"

const STAGE_CLASS = "relative w-full min-w-0"
const STAGE_LOADING_MIN = "min-h-[28rem] sm:min-h-[32rem]"

type CursorModule = Record<string, unknown>

function resolveDemo(mod: CursorModule): React.ComponentType | null {
  const Comp =
    ("default" in mod && mod.default) ||
    Object.values(mod).find((value) => typeof value === "function")
  if (!Comp || typeof Comp !== "function") return null
  return Comp as React.ComponentType
}

export function CursorDemo({ id }: { id: string }) {
  const load = getCursorDemoLoader(id)

  if (!load) {
    return (
      <p className="text-sm text-destructive">No loader for this cursor.</p>
    )
  }

  return <CursorDemoLoader key={id} load={load} />
}

function CursorDemoSplash({ active }: { active: boolean }) {
  const [gone, setGone] = React.useState(false)

  React.useEffect(() => {
    if (active) setGone(false)
  }, [active])

  if (gone) return null

  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ease-out",
        active ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      role="status"
      aria-label="Loading cursor"
      aria-hidden={!active}
      onTransitionEnd={(event) => {
        if (event.propertyName === "opacity" && !active) {
          setGone(true)
        }
      }}
    >
      <LoadingRing size={40} showLabel label="Loading…" />
    </div>
  )
}

function CursorDemoLoader({ load }: { load: () => Promise<CursorModule> }) {
  const [Demo, setDemo] = React.useState<React.ComponentType | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [revealed, setRevealed] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    setDemo(null)
    setError(null)
    setRevealed(false)

    load()
      .then((mod) => {
        if (cancelled) return
        const Comp = resolveDemo(mod)
        if (!Comp) {
          setError("Demo export not found.")
          return
        }
        setDemo(() => Comp)
        requestAnimationFrame(() => {
          if (!cancelled) setRevealed(true)
        })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : "Failed to load demo.")
      })

    return () => {
      cancelled = true
    }
  }, [load])

  return (
    <div
      className={cn(STAGE_CLASS, !Demo && !error && STAGE_LOADING_MIN)}
    >
      <CursorDemoSplash active={!revealed && !error} />
      {error ? (
        <p className="p-6 text-sm text-destructive">{error}</p>
      ) : Demo ? (
        <Demo />
      ) : null}
    </div>
  )
}

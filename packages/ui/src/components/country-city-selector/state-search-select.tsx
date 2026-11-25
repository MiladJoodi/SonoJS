"use client"

import * as React from "react"
import type { State } from "@sonojs/geo"

import { cn } from "@sonojs/ui/lib/utils"

import {
  fetchSearchStates,
  fetchStateById,
  prefetchStatesByCountry,
} from "./geo-data"
import { PickerPopoverList } from "./picker-popover-list"

export type StateSearchSelectProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> & {
  countryIso?: string | null
  stateId?: number | null
  defaultStateId?: number | null
  onStateChange?: (stateId: number | null, state?: State | null) => void
  disabled?: boolean
  placeholder?: string
  emptyMessage?: string
  geoDataBaseUrl?: string
  className?: string
  id?: string
}

function StateSearchSelect({
  countryIso,
  stateId: stateIdProp,
  defaultStateId = null,
  onStateChange,
  disabled = false,
  placeholder = "Choose state / province",
  emptyMessage = "No states found.",
  geoDataBaseUrl,
  className,
  id,
  ...props
}: StateSearchSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [listQuery, setListQuery] = React.useState("")
  const [results, setResults] = React.useState<State[]>([])
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "ready" | "error"
  >("idle")
  const [uncontrolled, setUncontrolled] = React.useState<number | null>(
    defaultStateId
  )
  const [selectedState, setSelectedState] = React.useState<State | null>(null)
  const requestIdRef = React.useRef(0)

  const isControlled = stateIdProp !== undefined
  const selectedId = isControlled ? stateIdProp : uncontrolled
  const locked = disabled || !countryIso

  const setSelectedStateId = React.useCallback(
    (id: number | null, state?: State | null) => {
      if (!isControlled) setUncontrolled(id)
      setSelectedState(state ?? null)
      onStateChange?.(id, state ?? null)
    },
    [isControlled, onStateChange]
  )

  React.useEffect(() => {
    setListQuery("")
    setResults([])
    setStatus("idle")
    setOpen(false)
    if (!countryIso) {
      setSelectedState(null)
      if (!isControlled) setUncontrolled(null)
    }
  }, [countryIso, isControlled])

  React.useEffect(() => {
    prefetchStatesByCountry(countryIso, geoDataBaseUrl)
  }, [countryIso, geoDataBaseUrl])

  React.useEffect(() => {
    if (!countryIso || selectedId == null) return
    if (selectedState?.id === selectedId) return
    let cancelled = false
    void fetchStateById(selectedId, countryIso, geoDataBaseUrl).then(
      (state) => {
        if (!cancelled && state) setSelectedState(state)
      }
    )
    return () => {
      cancelled = true
    }
  }, [countryIso, geoDataBaseUrl, selectedId, selectedState?.id])

  React.useEffect(() => {
    if (!open || locked || !countryIso) return

    const requestId = ++requestIdRef.current
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          setStatus("loading")
          const hits = await fetchSearchStates(
            listQuery,
            countryIso,
            geoDataBaseUrl,
            80
          )
          if (requestId !== requestIdRef.current) return
          setResults(hits)
          setStatus("ready")
        } catch {
          if (requestId !== requestIdRef.current) return
          setResults([])
          setStatus("error")
        }
      })()
    }, listQuery.trim() ? 200 : 0)

    return () => window.clearTimeout(timer)
  }, [countryIso, geoDataBaseUrl, listQuery, locked, open])

  const triggerLabel = selectedState ? (
    <span className="truncate">{selectedState.name}</span>
  ) : (
    <span className="text-muted-foreground">
      {countryIso ? placeholder : "Select a country first"}
    </span>
  )

  return (
    <div
      id={id}
      data-slot="state-search-select"
      className={cn("w-full", className)}
      {...props}
    >
      <PickerPopoverList
        disabled={locked}
        open={open}
        onOpenChange={setOpen}
        listQuery={listQuery}
        onListQueryChange={setListQuery}
        searchPlaceholder="Search state / province…"
        triggerLabel={triggerLabel}
        triggerAriaLabel="State or province"
        emptyMessage={
          status === "error" ? "Could not load states." : emptyMessage
        }
        loading={open && status === "loading"}
        items={results}
        getKey={(s) => String(s.id)}
        isSelected={(s) => s.id === selectedId}
        onPick={(state) => setSelectedStateId(state.id, state)}
        renderItem={(state) => (
          <>
            <span className="min-w-0 flex-1 truncate text-start">
              {state.name}
            </span>
            {state.iso2 ? (
              <span className="text-muted-foreground tabular-nums">
                {state.iso2}
              </span>
            ) : null}
          </>
        )}
      />
    </div>
  )
}

export { StateSearchSelect }
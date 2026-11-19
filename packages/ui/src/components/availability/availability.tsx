"use client"

import * as React from "react"

import { useDirection } from "@sonojs/ui/hooks/use-direction"
import { cn } from "@sonojs/ui/lib/utils"

import {
  createSlotId,
  DAY_LABELS,
  formatSlotRange,
  formatTimeLabel,
  getWeekDays,
  mergeAllSlots,
  normalizeSlot,
  snapMinutes,
  type AvailabilitySlot,
} from "./lib"

export type { AvailabilitySlot }

const ROW_PX = 24
const VIEWPORT_MAX_PX = 280

export type AvailabilityProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "children"
> & {
  value?: AvailabilitySlot[]
  defaultValue?: AvailabilitySlot[]
  onValueChange?: (slots: AvailabilitySlot[]) => void
  /** Week start: `0` Sunday, `1` Monday. Default `1`. */
  weekStartsOn?: 0 | 1
  dayStartMinutes?: number
  dayEndMinutes?: number
  slotMinutes?: number
  disabled?: boolean
  readOnly?: boolean
}

type DragMode =
  | { type: "paint"; day: number; anchor: number; draftId: string }
  | { type: "resize"; id: string; edge: "start" | "end" }

function Availability({
  value: valueProp,
  defaultValue = [],
  onValueChange,
  weekStartsOn = 1,
  dayStartMinutes = 8 * 60,
  dayEndMinutes = 20 * 60,
  slotMinutes = 30,
  disabled = false,
  readOnly = false,
  className,
  ...props
}: AvailabilityProps) {
  const { isRtl } = useDirection()
  const gridRef = React.useRef<HTMLDivElement>(null)
  const [uncontrolled, setUncontrolled] =
    React.useState<AvailabilitySlot[]>(defaultValue)
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [drag, setDrag] = React.useState<DragMode | null>(null)
  const dragRef = React.useRef<DragMode | null>(null)
  const slotsRef = React.useRef<AvailabilitySlot[]>([])

  const isControlled = valueProp !== undefined
  const slots = isControlled ? valueProp : uncontrolled

  React.useEffect(() => {
    slotsRef.current = slots
  }, [slots])

  React.useEffect(() => {
    dragRef.current = drag
  }, [drag])

  const interactive = !disabled && !readOnly
  const totalMinutes = Math.max(0, dayEndMinutes - dayStartMinutes)
  const rowCount = Math.max(1, Math.ceil(totalMinutes / slotMinutes))
  const gridHeight = rowCount * ROW_PX
  const weekDays = React.useMemo(
    () => getWeekDays(weekStartsOn),
    [weekStartsOn]
  )
  const displayDays = isRtl ? [...weekDays].reverse() : weekDays

  const hourMarks = React.useMemo(() => {
    const marks: number[] = []
    for (let m = dayStartMinutes; m <= dayEndMinutes; m += 60) {
      marks.push(m)
    }
    return marks
  }, [dayEndMinutes, dayStartMinutes])

  const publishSlots = React.useCallback(
    (next: AvailabilitySlot[], merge: boolean) => {
      const normalized = next
        .map((slot) =>
          normalizeSlot(slot, { dayStartMinutes, dayEndMinutes, slotMinutes })
        )
        .filter((slot): slot is AvailabilitySlot => slot != null)
      const finalSlots = merge ? mergeAllSlots(normalized) : normalized
      if (!isControlled) setUncontrolled(finalSlots)
      onValueChange?.(finalSlots)
    },
    [
      dayEndMinutes,
      dayStartMinutes,
      isControlled,
      onValueChange,
      slotMinutes,
    ]
  )

  const minutesFromClientY = React.useCallback(
    (clientY: number) => {
      const el = gridRef.current
      if (!el) return dayStartMinutes
      const rect = el.getBoundingClientRect()
      const y = clientY - rect.top
      const ratio = Math.max(0, Math.min(1, y / rect.height))
      const raw = dayStartMinutes + ratio * totalMinutes
      return snapMinutes(raw, slotMinutes)
    },
    [dayStartMinutes, slotMinutes, totalMinutes]
  )

  React.useEffect(() => {
    if (!drag || !interactive) return

    const onMove = (event: PointerEvent) => {
      const current = dragRef.current
      if (!current) return
      const minutes = minutesFromClientY(event.clientY)

      if (current.type === "paint") {
        const start = Math.min(current.anchor, minutes)
        const end = Math.max(
          start + slotMinutes,
          Math.max(current.anchor, minutes) + slotMinutes
        )
        const draft: AvailabilitySlot = {
          id: current.draftId,
          day: current.day,
          startMinutes: start,
          endMinutes: Math.min(dayEndMinutes, end),
        }
        const without = slotsRef.current.filter((s) => s.id !== current.draftId)
        publishSlots([...without, draft], false)
        return
      }

      const next = slotsRef.current.map((slot) => {
        if (slot.id !== current.id) return slot
        if (current.edge === "start") {
          return {
            ...slot,
            startMinutes: Math.min(minutes, slot.endMinutes - slotMinutes),
          }
        }
        return {
          ...slot,
          endMinutes: Math.max(minutes, slot.startMinutes + slotMinutes),
        }
      })
      publishSlots(next, false)
    }

    const onUp = () => {
      publishSlots(slotsRef.current, true)
      setDrag(null)
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
    }
  }, [
    dayEndMinutes,
    drag,
    interactive,
    minutesFromClientY,
    publishSlots,
    slotMinutes,
  ])

  React.useEffect(() => {
    if (!selectedId || !interactive) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Delete" && event.key !== "Backspace") return
      const tag = (event.target as HTMLElement | null)?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return
      event.preventDefault()
      publishSlots(
        slotsRef.current.filter((s) => s.id !== selectedId),
        true
      )
      setSelectedId(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [interactive, publishSlots, selectedId])

  const startPaint = (day: number, clientY: number) => {
    if (!interactive) return
    const anchor = minutesFromClientY(clientY)
    const draftId = createSlotId()
    const draft: AvailabilitySlot = {
      id: draftId,
      day,
      startMinutes: anchor,
      endMinutes: Math.min(dayEndMinutes, anchor + slotMinutes),
    }
    setSelectedId(draftId)
    setDrag({ type: "paint", day, anchor, draftId })
    publishSlots([...slotsRef.current, draft], false)
  }

  const slotTop = (startMinutes: number) =>
    ((startMinutes - dayStartMinutes) / totalMinutes) * 100
  const slotHeight = (startMinutes: number, endMinutes: number) =>
    ((endMinutes - startMinutes) / totalMinutes) * 100

  return (
    <div
      data-slot="availability"
      data-disabled={disabled ? "" : undefined}
      data-readonly={readOnly ? "" : undefined}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-xs",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <div
        className="overflow-auto overscroll-contain"
        style={{ maxHeight: VIEWPORT_MAX_PX }}
      >
        <div className="sticky top-0 z-20 grid grid-cols-[52px_1fr] border-b border-border/70 bg-card">
          <div className="border-e border-border/70 bg-card" aria-hidden />
          <div className="grid grid-cols-7 bg-card">
            {displayDays.map((day) => (
              <div
                key={day}
                className="border-e border-border/70 px-1 py-2 text-center text-xs font-medium text-muted-foreground last:border-e-0"
              >
                {DAY_LABELS[day]}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[52px_1fr]">
          <div
            className="relative border-e border-border/70"
            style={{ height: gridHeight }}
            aria-hidden
          >
            {hourMarks.map((mark) => (
              <div
                key={mark}
                className="absolute inset-x-0 pe-2 text-end text-[10px] leading-none text-muted-foreground"
                style={{
                  top: `${((mark - dayStartMinutes) / totalMinutes) * 100}%`,
                  transform:
                    mark === dayStartMinutes
                      ? "translateY(2px)"
                      : "translateY(-50%)",
                }}
              >
                {formatTimeLabel(mark)}
              </div>
            ))}
          </div>

          <div
            ref={gridRef}
            className="relative grid grid-cols-7"
            style={{ height: gridHeight }}
          >
            {Array.from({ length: rowCount }).map((_, row) => (
              <div
                key={row}
                className="pointer-events-none absolute inset-x-0 border-b border-border/40"
                style={{ top: row * ROW_PX, height: ROW_PX }}
                aria-hidden
              />
            ))}

            {displayDays.map((day, colIndex) => (
              <div
                key={day}
                className={cn(
                  "relative h-full min-h-0 border-e border-border/70 last:border-e-0",
                  interactive
                    ? "cursor-crosshair"
                    : disabled
                      ? "cursor-not-allowed"
                      : undefined
                )}
                style={{ gridColumn: colIndex + 1 }}
                onPointerDown={(event) => {
                  if (!interactive) return
                  if (
                    (event.target as HTMLElement).closest(
                      "[data-slot=availability-slot]"
                    )
                  ) {
                    return
                  }
                  event.preventDefault()
                  startPaint(day, event.clientY)
                }}
              >
                {slots
                  .filter((slot) => slot.day === day)
                  .map((slot) => {
                    const selected = selectedId === slot.id
                    return (
                      <div
                        key={slot.id}
                        data-slot="availability-slot"
                        data-selected={selected ? "" : undefined}
                        role="button"
                        tabIndex={interactive ? 0 : -1}
                        aria-label={`${DAY_LABELS[slot.day]} ${formatSlotRange(slot.startMinutes, slot.endMinutes)}`}
                        className={cn(
                          "absolute inset-x-1 z-10 overflow-hidden rounded-md border border-primary/40 bg-primary/15 px-1.5 py-0.5 text-start text-[10px] leading-tight text-foreground shadow-xs outline-none",
                          interactive && "cursor-pointer",
                          selected && "ring-2 ring-ring"
                        )}
                        style={{
                          top: `${slotTop(slot.startMinutes)}%`,
                          height: `${slotHeight(slot.startMinutes, slot.endMinutes)}%`,
                        }}
                        onPointerDown={(event) => {
                          if (!interactive) return
                          event.stopPropagation()
                          setSelectedId(slot.id)
                        }}
                        onKeyDown={(event) => {
                          if (!interactive) return
                          if (
                            event.key === "Delete" ||
                            event.key === "Backspace"
                          ) {
                            event.preventDefault()
                            publishSlots(
                              slots.filter((s) => s.id !== slot.id),
                              true
                            )
                            setSelectedId(null)
                          }
                        }}
                      >
                        <span className="block truncate font-medium">
                          {formatSlotRange(
                            slot.startMinutes,
                            slot.endMinutes
                          )}
                        </span>
                        {interactive ? (
                          <>
                            <span
                              data-slot="availability-resize"
                              className="absolute inset-x-0 top-0 h-2 cursor-ns-resize"
                              onPointerDown={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                                setSelectedId(slot.id)
                                setDrag({
                                  type: "resize",
                                  id: slot.id,
                                  edge: "start",
                                })
                              }}
                            />
                            <span
                              data-slot="availability-resize"
                              className="absolute inset-x-0 bottom-0 h-2 cursor-ns-resize"
                              onPointerDown={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                                setSelectedId(slot.id)
                                setDrag({
                                  type: "resize",
                                  id: slot.id,
                                  edge: "end",
                                })
                              }}
                            />
                          </>
                        ) : null}
                      </div>
                    )
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Availability }

"use client"

import * as React from "react"

import { ScrollArea } from "@sonojs/ui/components/scroll-area"
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

const ROW_PX = 28

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
  slotsRef.current = slots
  dragRef.current = drag

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

  const setSlots = React.useCallback(
    (next: AvailabilitySlot[]) => {
      const merged = mergeAllSlots(next)
      if (!isControlled) setUncontrolled(merged)
      onValueChange?.(merged)
    },
    [isControlled, onValueChange]
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

  const commitSlots = React.useCallback(
    (next: AvailabilitySlot[]) => {
      const normalized = next
        .map((slot) =>
          normalizeSlot(slot, { dayStartMinutes, dayEndMinutes, slotMinutes })
        )
        .filter((slot): slot is AvailabilitySlot => slot != null)
      setSlots(normalized)
    },
    [dayEndMinutes, dayStartMinutes, setSlots, slotMinutes]
  )

  React.useEffect(() => {
    if (!drag || !interactive) return

    const onMove = (event: PointerEvent) => {
      const current = dragRef.current
      if (!current) return
      const minutes = minutesFromClientY(event.clientY)

      if (current.type === "paint") {
        const start = Math.min(current.anchor, minutes)
        const end = Math.max(current.anchor, minutes) + slotMinutes
        const draft: AvailabilitySlot = {
          id: current.draftId,
          day: current.day,
          startMinutes: start,
          endMinutes: end,
        }
        const without = slotsRef.current.filter((s) => s.id !== current.draftId)
        commitSlots([...without, draft])
        return
      }

      const target = slotsRef.current.find((s) => s.id === current.id)
      if (!target) return
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
      commitSlots(next)
    }

    const onUp = () => {
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
  }, [commitSlots, drag, interactive, minutesFromClientY, slotMinutes])

  React.useEffect(() => {
    if (!selectedId || !interactive) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Delete" && event.key !== "Backspace") return
      const tag = (event.target as HTMLElement | null)?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return
      event.preventDefault()
      commitSlots(slotsRef.current.filter((s) => s.id !== selectedId))
      setSelectedId(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [commitSlots, interactive, selectedId])

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
    commitSlots([...slotsRef.current, draft])
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
        "w-full overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-xs",
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-[56px_1fr] border-b border-border/70">
        <div className="border-e border-border/70" aria-hidden />
        <div className="grid grid-cols-7">
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

      <ScrollArea className="h-[min(28rem,70vh)]">
        <div className="grid grid-cols-[56px_1fr]">
          <div
            className="relative border-e border-border/70"
            style={{ height: gridHeight }}
            aria-hidden
          >
            {hourMarks.map((mark) => (
              <div
                key={mark}
                className="absolute inset-x-0 -translate-y-1/2 pe-2 text-end text-[10px] text-muted-foreground"
                style={{
                  top: `${((mark - dayStartMinutes) / totalMinutes) * 100}%`,
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
                  "relative border-e border-border/70 last:border-e-0",
                  interactive && "cursor-crosshair"
                )}
                style={{ gridColumn: colIndex + 1 }}
                onPointerDown={(event) => {
                  if (!interactive) return
                  if ((event.target as HTMLElement).closest("[data-slot=availability-slot]")) {
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
                          "absolute inset-x-1 z-10 overflow-hidden rounded-md border border-primary/40 bg-primary/15 px-1.5 py-1 text-start text-[10px] leading-tight text-foreground shadow-xs outline-none",
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
                          if (event.key === "Delete" || event.key === "Backspace") {
                            event.preventDefault()
                            commitSlots(slots.filter((s) => s.id !== slot.id))
                            setSelectedId(null)
                          }
                        }}
                      >
                        <span className="block truncate font-medium">
                          {formatSlotRange(slot.startMinutes, slot.endMinutes)}
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
      </ScrollArea>
    </div>
  )
}

export { Availability }

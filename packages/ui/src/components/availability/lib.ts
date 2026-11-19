export type AvailabilitySlot = {
  id: string
  /** 0 = Sunday … 6 = Saturday (JS `Date#getDay`). */
  day: number
  startMinutes: number
  endMinutes: number
}

export const DAY_LABELS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const

export function createSlotId() {
  return `slot-${Math.random().toString(36).slice(2, 10)}`
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function snapMinutes(value: number, slotMinutes: number) {
  return Math.round(value / slotMinutes) * slotMinutes
}

export function formatTimeLabel(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const h12 = ((hours + 11) % 12) + 1
  const suffix = hours >= 12 ? "PM" : "AM"
  if (minutes === 0) return `${h12} ${suffix}`
  return `${h12}:${String(minutes).padStart(2, "0")} ${suffix}`
}

export function formatSlotRange(startMinutes: number, endMinutes: number) {
  return `${formatTimeLabel(startMinutes)} – ${formatTimeLabel(endMinutes)}`
}

/** Ordered day indices for the header / columns. */
export function getWeekDays(weekStartsOn: 0 | 1): number[] {
  const days: number[] = []
  for (let i = 0; i < 7; i++) {
    days.push((weekStartsOn + i) % 7)
  }
  return days
}

export function mergeDaySlots(slots: AvailabilitySlot[]): AvailabilitySlot[] {
  if (slots.length <= 1) return slots
  const sorted = [...slots].sort((a, b) => a.startMinutes - b.startMinutes)
  const out: AvailabilitySlot[] = []
  for (const slot of sorted) {
    const last = out[out.length - 1]
    if (!last || slot.startMinutes > last.endMinutes) {
      out.push({ ...slot })
      continue
    }
    last.endMinutes = Math.max(last.endMinutes, slot.endMinutes)
  }
  return out
}

export function mergeAllSlots(slots: AvailabilitySlot[]): AvailabilitySlot[] {
  const byDay = new Map<number, AvailabilitySlot[]>()
  for (const slot of slots) {
    const list = byDay.get(slot.day) ?? []
    list.push(slot)
    byDay.set(slot.day, list)
  }
  const merged: AvailabilitySlot[] = []
  for (const [, list] of byDay) {
    merged.push(...mergeDaySlots(list))
  }
  return merged.sort((a, b) => a.day - b.day || a.startMinutes - b.startMinutes)
}

export function normalizeSlot(
  slot: AvailabilitySlot,
  opts: {
    dayStartMinutes: number
    dayEndMinutes: number
    slotMinutes: number
  }
): AvailabilitySlot | null {
  let start = snapMinutes(slot.startMinutes, opts.slotMinutes)
  let end = snapMinutes(slot.endMinutes, opts.slotMinutes)
  start = clamp(start, opts.dayStartMinutes, opts.dayEndMinutes)
  end = clamp(end, opts.dayStartMinutes, opts.dayEndMinutes)
  if (end <= start) return null
  return { ...slot, startMinutes: start, endMinutes: end }
}

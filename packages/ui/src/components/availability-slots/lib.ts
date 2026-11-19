export type AvailabilityTimeSlot = {
  id: string
  /** Minutes from midnight. */
  startMinutes: number
  /** Optional end; defaults to start + duration when building labels. */
  endMinutes?: number
  label?: string
  disabled?: boolean
}

export function formatTimeLabel(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const h12 = ((hours + 11) % 12) + 1
  const suffix = hours >= 12 ? "PM" : "AM"
  if (minutes === 0) return `${h12}:00 ${suffix}`
  return `${h12}:${String(minutes).padStart(2, "0")} ${suffix}`
}

export function formatTimeSlotLabel(
  startMinutes: number,
  endMinutes?: number
) {
  if (endMinutes == null || endMinutes <= startMinutes) {
    return formatTimeLabel(startMinutes)
  }
  return `${formatTimeLabel(startMinutes)} – ${formatTimeLabel(endMinutes)}`
}

/**
 * Expand free ranges into bookable starts (Cal.com-style).
 * `durationMinutes` is the meeting length; `stepMinutes` is the grid step.
 */
export function expandRangesToTimeSlots(
  ranges: { startMinutes: number; endMinutes: number }[],
  durationMinutes: number,
  stepMinutes = durationMinutes
): AvailabilityTimeSlot[] {
  const duration = Math.max(1, durationMinutes)
  const step = Math.max(1, stepMinutes)
  const out: AvailabilityTimeSlot[] = []

  for (const range of ranges) {
    for (
      let start = range.startMinutes;
      start + duration <= range.endMinutes;
      start += step
    ) {
      const end = start + duration
      out.push({
        id: `${start}-${end}`,
        startMinutes: start,
        endMinutes: end,
        label: formatTimeLabel(start),
      })
    }
  }

  return out
}

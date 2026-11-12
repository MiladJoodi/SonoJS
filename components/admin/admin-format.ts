export function formatCents(amountCents: number, currency = "usd"): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amountCents / 100)
  } catch {
    return `${(amountCents / 100).toFixed(2)} ${currency}`
  }
}

/** Compact integer for admin KPI cards (`1,234`). */
export function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(n)
}

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

/** Year-first local datetime: `2026-11-06 03:34:48` */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—"
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return "—"
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
}

/** Year-first local date only: `2026-11-06` */
export function formatDateOnly(iso: string | null | undefined): string {
  if (!iso) return "—"
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return "—"
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

export function isManualSubId(id: string | null | undefined): boolean {
  return Boolean(id?.startsWith("sub_manual_"))
}

/** Shared admin table chrome — headers + cells both start-aligned. */
export const adminThClass =
  "px-2 py-2 text-start text-xs font-medium text-muted-foreground"

export const adminTdClass = "px-2 py-2.5 text-start align-middle"

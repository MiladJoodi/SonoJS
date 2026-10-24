import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SliceConfig = Record<string, { label?: ReactNode } | undefined>

/** Shared pie tooltip row — color swatch + slice label + en Intl value. */
export function pieTooltipRow({
  value,
  label,
  locale,
  color,
}: {
  value: number | string
  label: ReactNode
  locale: string
  color?: string
}) {
  return (
    <div className="flex w-full min-w-[8rem] items-center gap-2">
      {color ? (
        <span
          className="size-2.5 shrink-0 rounded-[2px]"
          style={{ background: color }}
          aria-hidden
        />
      ) : null}
      <div className="flex flex-1 items-center justify-between gap-4 leading-none">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums text-foreground">
          {new Intl.NumberFormat(locale).format(Math.round(Number(value)))}
        </span>
      </div>
    </div>
  )
}

type PayloadLike = {
  name?: unknown
  color?: string
  dataKey?: unknown
  payload?: Record<string, unknown>
}

/** Resolve slice label/color from chart config + payload `nameKey`. */
export function pieSliceTooltip(
  value: unknown,
  item: PayloadLike,
  {
    locale,
    config,
    nameKey,
  }: {
    locale: string
    config: SliceConfig
    nameKey: string
  }
) {
  const payload = item.payload
  const key = String(payload?.[nameKey] ?? item.name ?? "")
  const label = config[key]?.label ?? key
  const color =
    (typeof payload?.fill === "string" ? payload.fill : undefined) ??
    item.color
  return pieTooltipRow({
    value: Number(value),
    label,
    locale,
    color,
  })
}

/**
 * Radial ring tooltip — does not rely on ChartTooltipContent's
 * `formatter && item.name` gate (RadialBar often names the dataKey).
 * Pass `dir` from `useChartDir()` (plot island is `dir="ltr"`).
 */
export function RadialProvinceTooltipContent({
  active,
  payload,
  className,
  locale = "en",
  dir = "ltr",
  config,
  nameKey = "province",
  valueKey = "sales",
}: {
  active?: boolean
  payload?: ReadonlyArray<PayloadLike>
  className?: string
  locale?: string
  dir?: "ltr" | "rtl"
  config: SliceConfig
  nameKey?: string
  valueKey?: string
}) {
  if (!active || !payload?.length) return null

  const item = payload[0]!
  const raw = item.payload
  const value = Number(
    item.value ?? (raw ? raw[valueKey] : undefined) ?? NaN
  )
  if (!Number.isFinite(value)) return null

  return (
    <div
      dir={dir}
      className={cn(
        "pointer-events-none grid min-w-[9rem] items-start gap-1.5 rounded-md border border-border bg-background px-2.5 py-2 text-xs shadow-sm",
        className
      )}
    >
      {pieSliceTooltip(value, item, { locale, config, nameKey })}
    </div>
  )
}

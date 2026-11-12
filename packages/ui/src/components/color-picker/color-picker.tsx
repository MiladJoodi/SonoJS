"use client"

import * as React from "react"
import { CheckIcon, CopyIcon, PipetteIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@sonojs/ui/lib/utils"

import {
  type ColorFormat,
  type HsvaColor,
  DEFAULT_SWATCHES,
  colorsEqual,
  formatColor,
  hsvaToHex,
  hsvaToRgba,
  parseColor,
} from "./color-utils"

export type ColorPickerProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (
    value: string,
    meta: { hsva: HsvaColor; format: ColorFormat }
  ) => void
  format?: ColorFormat
  defaultFormat?: ColorFormat
  onFormatChange?: (format: ColorFormat) => void
  swatches?: string[]
  swatchColumns?: number
  disabledSwatches?: string[]
  recentColors?: string[]
  defaultRecentColors?: string[]
  onRecentColorsChange?: (colors: string[]) => void
  showOpacity?: boolean
  showEyeDropper?: boolean
  showCopy?: boolean
  showFormatSelect?: boolean
  showSwatches?: boolean
  showRecent?: boolean
  disabled?: boolean
  readOnly?: boolean
  className?: string
  /** Narrower panel for form rows. */
  compact?: boolean
}

const FORMATS: ColorFormat[] = ["hex", "hex8", "rgb", "rgba", "hsl", "hsla"]

const EyeDropperCtor =
  typeof window !== "undefined"
    ? (
        window as Window & {
          EyeDropper?: new () => {
            open: () => Promise<{ sRGBHex: string }>
          }
        }
      ).EyeDropper
    : undefined

function useEyeDropperSupported() {
  const [ok, setOk] = React.useState(false)
  React.useEffect(() => {
    setOk(typeof EyeDropperCtor === "function")
  }, [])
  return ok
}

function SaturationArea({
  hsva,
  disabled,
  readOnly,
  onChange,
}: {
  hsva: HsvaColor
  disabled?: boolean
  readOnly?: boolean
  onChange: (next: Partial<HsvaColor>) => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const hueColor = hsvaToHex({ h: hsva.h, s: 100, v: 100, a: 1 })

  const updateFromPointer = React.useCallback(
    (clientX: number, clientY: number) => {
      const el = ref.current
      if (!el || disabled || readOnly) return
      const rect = el.getBoundingClientRect()
      const x = clamp01((clientX - rect.left) / rect.width)
      const y = clamp01((clientY - rect.top) / rect.height)
      onChange({ s: x * 100, v: (1 - y) * 100 })
    },
    [disabled, readOnly, onChange]
  )

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={disabled || readOnly ? -1 : 0}
      aria-label="Saturation and brightness"
      aria-valuetext={`Saturation ${Math.round(hsva.s)}%, brightness ${Math.round(hsva.v)}%`}
      data-slot="color-picker-saturation"
      className={cn(
        "relative h-40 w-full cursor-crosshair touch-none overflow-hidden rounded-md border border-border/70",
        (disabled || readOnly) && "pointer-events-none cursor-not-allowed opacity-50"
      )}
      style={{
        backgroundImage: `
          linear-gradient(to top, #000, transparent),
          linear-gradient(to right, #fff, transparent),
          linear-gradient(${hueColor}, ${hueColor})
        `,
      }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        updateFromPointer(e.clientX, e.clientY)
      }}
      onPointerMove={(e) => {
        if (e.buttons !== 1) return
        updateFromPointer(e.clientX, e.clientY)
      }}
      onKeyDown={(e) => {
        if (disabled || readOnly) return
        const step = e.shiftKey ? 5 : 1
        if (e.key === "ArrowRight") {
          e.preventDefault()
          onChange({ s: Math.min(100, hsva.s + step) })
        } else if (e.key === "ArrowLeft") {
          e.preventDefault()
          onChange({ s: Math.max(0, hsva.s - step) })
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          onChange({ v: Math.min(100, hsva.v + step) })
        } else if (e.key === "ArrowDown") {
          e.preventDefault()
          onChange({ v: Math.max(0, hsva.v - step) })
        }
      }}
    >
      <div
        className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
        style={{
          left: `${hsva.s}%`,
          top: `${100 - hsva.v}%`,
          backgroundColor: hsvaToHex(hsva, false),
        }}
      />
    </div>
  )
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function SwatchButton({
  color,
  selected,
  disabled,
  onSelect,
}: {
  color: string
  selected?: boolean
  disabled?: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-label={`Select ${color}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "size-7 cursor-pointer rounded-md border border-border/70 shadow-xs transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100",
        selected && "ring-2 ring-ring ring-offset-2 ring-offset-background"
      )}
      style={{
        backgroundColor: color,
        backgroundImage:
          parseColor(color)?.a !== undefined && (parseColor(color)?.a ?? 1) < 1
            ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
            : undefined,
        backgroundSize: "8px 8px",
        backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
      }}
    />
  )
}

function ColorPicker({
  value: valueProp,
  defaultValue = "#3B82F6",
  onValueChange,
  format: formatProp,
  defaultFormat = "hex",
  onFormatChange,
  swatches = DEFAULT_SWATCHES,
  swatchColumns = 6,
  disabledSwatches = [],
  recentColors: recentProp,
  defaultRecentColors = [],
  onRecentColorsChange,
  showOpacity = false,
  showEyeDropper = false,
  showCopy = true,
  showFormatSelect = true,
  showSwatches = false,
  showRecent = false,
  disabled = false,
  readOnly = false,
  className,
  compact = false,
}: ColorPickerProps) {
  const eyeDropperOk = useEyeDropperSupported()
  const isValueControlled = valueProp !== undefined
  const isFormatControlled = formatProp !== undefined
  const isRecentControlled = recentProp !== undefined

  const [uncontrolledHsva, setUncontrolledHsva] = React.useState(
    () => parseColor(defaultValue) ?? { h: 217, s: 91, v: 96, a: 1 }
  )
  const [uncontrolledFormat, setUncontrolledFormat] =
    React.useState<ColorFormat>(defaultFormat)
  const [uncontrolledRecent, setUncontrolledRecent] =
    React.useState<string[]>(defaultRecentColors)
  const [draft, setDraft] = React.useState("")
  const [copied, setCopied] = React.useState(false)

  const format = isFormatControlled ? formatProp : uncontrolledFormat
  const recent = isRecentControlled ? recentProp : uncontrolledRecent

  const hsva = React.useMemo(() => {
    if (!isValueControlled) return uncontrolledHsva
    return parseColor(valueProp) ?? uncontrolledHsva
  }, [isValueControlled, valueProp, uncontrolledHsva])

  const formatted = formatColor(hsva, format)
  const rgba = hsvaToRgba(hsva)

  React.useEffect(() => {
    setDraft(formatted)
  }, [formatted])

  const commitHsva = React.useCallback(
    (next: HsvaColor, pushRecent = false) => {
      if (disabled || readOnly) return
      if (!isValueControlled) setUncontrolledHsva(next)
      const out = formatColor(next, format)
      onValueChange?.(out, { hsva: next, format })
      if (pushRecent && showRecent) {
        const hex = hsvaToHex(next, next.a < 1)
        const nextRecent = [
          hex,
          ...recent.filter((c) => !colorsEqual(c, hex)),
        ].slice(0, 8)
        if (!isRecentControlled) setUncontrolledRecent(nextRecent)
        onRecentColorsChange?.(nextRecent)
      }
    },
    [
      disabled,
      readOnly,
      isValueControlled,
      format,
      onValueChange,
      showRecent,
      recent,
      isRecentControlled,
      onRecentColorsChange,
    ]
  )

  const patchHsva = React.useCallback(
    (partial: Partial<HsvaColor>) => {
      commitHsva({ ...hsva, ...partial })
    },
    [commitHsva, hsva]
  )

  const setFormat = (next: ColorFormat) => {
    if (!isFormatControlled) setUncontrolledFormat(next)
    onFormatChange?.(next)
    const out = formatColor(hsva, next)
    onValueChange?.(out, { hsva, format: next })
    setDraft(out)
  }

  const commitDraft = () => {
    const parsed = parseColor(draft)
    if (!parsed) {
      setDraft(formatted)
      return
    }
    commitHsva(parsed, true)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  const handleEyeDropper = async () => {
    if (!EyeDropperCtor || disabled || readOnly) return
    try {
      const dropper = new EyeDropperCtor()
      const result = await dropper.open()
      const parsed = parseColor(result.sRGBHex)
      if (parsed) commitHsva(parsed, true)
    } catch {
      // user cancelled or unsupported
    }
  }

  const locked = disabled || readOnly

  return (
    <div
      data-slot="color-picker"
      data-compact={compact ? "true" : undefined}
      className={cn(
        "flex w-full flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-3 shadow-soft",
        compact ? "max-w-[220px] p-2.5" : "max-w-[280px]",
        className
      )}
    >
      <SaturationArea
        hsva={hsva}
        disabled={disabled}
        readOnly={readOnly}
        onChange={patchHsva}
      />

      <div className="flex items-center gap-2">
        <div
          className="size-10 shrink-0 overflow-hidden rounded-md border border-border/70"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #c4c4c4 25%, transparent 25%), linear-gradient(-45deg, #c4c4c4 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #c4c4c4 75%), linear-gradient(-45deg, transparent 75%, #c4c4c4 75%)",
            backgroundSize: "8px 8px",
            backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
          }}
        >
          <div
            className="size-full"
            style={{ backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})` }}
          />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <Slider
            min={0}
            max={360}
            step={1}
            value={[hsva.h]}
            disabled={locked}
            onValueChange={([h]) => patchHsva({ h })}
            className="[&_[data-slot=slider-track]]:h-2.5 [&_[data-slot=slider-track]]:bg-[linear-gradient(to_right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)] [&_[data-slot=slider-range]]:bg-transparent"
            aria-label="Hue"
          />
          {showOpacity ? (
            <div className="space-y-1">
              <Slider
                min={0}
                max={100}
                step={1}
                value={[Math.round(hsva.a * 100)]}
                disabled={locked}
                onValueChange={([pct]) => patchHsva({ a: pct / 100 })}
                className="[&_[data-slot=slider-track]]:h-2.5 [&_[data-slot=slider-track]]:bg-[linear-gradient(45deg,#c4c4c4_25%,transparent_25%),linear-gradient(-45deg,#c4c4c4_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#c4c4c4_75%),linear-gradient(-45deg,transparent_75%,#c4c4c4_75%)] [&_[data-slot=slider-track]]:bg-[length:8px_8px] [&_[data-slot=slider-range]]:bg-transparent"
                aria-label="Opacity"
                style={
                  {
                    // colored overlay via CSS variable on track using box-shadow hack avoided —
                    // show percent below
                  } as React.CSSProperties
                }
              />
              <p className="text-xs text-muted-foreground">
                Opacity {Math.round(hsva.a * 100)}%
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {showFormatSelect ? (
          <div className="flex flex-wrap gap-1">
            {FORMATS.map((f) => (
              <Button
                key={f}
                type="button"
                size="xs"
                variant={format === f ? "secondary" : "ghost"}
                disabled={locked}
                className="h-7 cursor-pointer px-2 uppercase"
                onClick={() => setFormat(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        ) : null}

        <InputGroup data-disabled={disabled ? "true" : undefined}>
          <InputGroupInput
            value={draft}
            readOnly={readOnly}
            disabled={disabled}
            spellCheck={false}
            aria-label="Color value"
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitDraft}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                commitDraft()
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            {showEyeDropper && eyeDropperOk ? (
              <InputGroupButton
                size="icon-xs"
                disabled={locked}
                aria-label="Pick color from screen"
                onClick={() => {
                  void handleEyeDropper()
                }}
              >
                <PipetteIcon className="size-3.5" />
              </InputGroupButton>
            ) : null}
            {showCopy ? (
              <InputGroupButton
                size="icon-xs"
                disabled={disabled}
                aria-label={copied ? "Copied" : "Copy color"}
                onClick={() => {
                  void handleCopy()
                }}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </InputGroupButton>
            ) : null}
          </InputGroupAddon>
        </InputGroup>
      </div>

      {showRecent && recent.length > 0 ? (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Recent</p>
          <div
            className="grid gap-1.5"
            style={{
              gridTemplateColumns: `repeat(${swatchColumns}, minmax(0, 1fr))`,
            }}
          >
            {recent.map((c) => (
              <SwatchButton
                key={c}
                color={c}
                selected={colorsEqual(c, formatted)}
                disabled={locked}
                onSelect={() => {
                  const parsed = parseColor(c)
                  if (parsed) commitHsva(parsed)
                }}
              />
            ))}
          </div>
        </div>
      ) : null}

      {showSwatches ? (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Swatches</p>
          <div
            className="grid gap-1.5"
            style={{
              gridTemplateColumns: `repeat(${swatchColumns}, minmax(0, 1fr))`,
            }}
          >
            {swatches.map((c) => {
              const isDisabled =
                locked ||
                disabledSwatches.some((d) => colorsEqual(d, c))
              return (
                <SwatchButton
                  key={c}
                  color={c}
                  selected={colorsEqual(c, formatted)}
                  disabled={isDisabled}
                  onSelect={() => {
                    const parsed = parseColor(c)
                    if (parsed) commitHsva(parsed, true)
                  }}
                />
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { ColorPicker }

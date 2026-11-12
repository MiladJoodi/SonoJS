"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  ColorPicker,
  generateHarmony,
  type ColorHarmony,
} from "@sonojs/ui/components/color-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { cn } from "@sonojs/ui/lib/utils"

const HARMONIES: { value: ColorHarmony; label: string }[] = [
  { value: "complementary", label: "Complementary" },
  { value: "analogous", label: "Analogous" },
  { value: "triadic", label: "Triadic" },
  { value: "split-complementary", label: "Split complementary" },
  { value: "tetradic", label: "Tetradic" },
  { value: "monochromatic", label: "Monochromatic" },
]

export type ColorPaletteProps = {
  baseColor?: string
  defaultBaseColor?: string
  onBaseColorChange?: (color: string) => void
  harmony?: ColorHarmony
  defaultHarmony?: ColorHarmony
  onHarmonyChange?: (harmony: ColorHarmony) => void
  disabled?: boolean
  className?: string
}

function ColorPalette({
  baseColor: baseProp,
  defaultBaseColor = "#3B82F6",
  onBaseColorChange,
  harmony: harmonyProp,
  defaultHarmony = "analogous",
  onHarmonyChange,
  disabled = false,
  className,
}: ColorPaletteProps) {
  const isBaseControlled = baseProp !== undefined
  const isHarmonyControlled = harmonyProp !== undefined
  const [baseUncontrolled, setBaseUncontrolled] =
    React.useState(defaultBaseColor)
  const [harmonyUncontrolled, setHarmonyUncontrolled] =
    React.useState<ColorHarmony>(defaultHarmony)
  const [copied, setCopied] = React.useState<string | null>(null)

  const base = isBaseControlled ? baseProp : baseUncontrolled
  const harmony = isHarmonyControlled ? harmonyProp : harmonyUncontrolled
  const colors = React.useMemo(
    () => generateHarmony(base, harmony),
    [base, harmony]
  )

  const setBase = (color: string) => {
    if (disabled) return
    if (!isBaseControlled) setBaseUncontrolled(color)
    onBaseColorChange?.(color)
  }

  const setHarmony = (next: ColorHarmony) => {
    if (disabled) return
    if (!isHarmonyControlled) setHarmonyUncontrolled(next)
    onHarmonyChange?.(next)
  }

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopied(color)
      window.setTimeout(() => setCopied(null), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div
      data-slot="color-palette"
      className={cn(
        "flex w-full max-w-md flex-col gap-4 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={disabled}
              aria-label="Pick base color"
              className="size-12 shrink-0 cursor-pointer rounded-md border border-border/70 shadow-xs disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: base }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto border-0 bg-transparent p-0 shadow-none">
            <ColorPicker
              value={base}
              onValueChange={setBase}
              compact
              showCopy
            />
          </PopoverContent>
        </Popover>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-foreground">Base color</p>
          <p className="font-mono text-xs text-muted-foreground">{base}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {HARMONIES.map((item) => (
          <Button
            key={item.value}
            type="button"
            size="xs"
            variant={harmony === item.value ? "secondary" : "outline"}
            disabled={disabled}
            className="h-8 cursor-pointer"
            onClick={() => setHarmony(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${Math.min(colors.length, 4)}, minmax(0, 1fr))`,
        }}
      >
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            disabled={disabled}
            onClick={() => {
              void copyColor(color)
            }}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-md border border-border/70 text-start transition-colors hover:border-border disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span
              className="h-16 w-full"
              style={{ backgroundColor: color }}
            />
            <span className="flex items-center justify-between gap-1 bg-card px-2 py-1.5 font-mono text-[11px] text-muted-foreground">
              {color}
              {copied === color ? (
                <CheckIcon className="size-3.5 text-emerald-500" />
              ) : (
                <CopyIcon className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export { ColorPalette, HARMONIES }

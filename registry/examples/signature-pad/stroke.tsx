"use client"

import * as React from "react"

import { Label } from "@sonojs/ui/components/label"
import { Slider } from "@sonojs/ui/components/slider"
import { SignaturePad } from "@sonojs/ui/components/signature-pad"

const COLORS = [
  { label: "Black", value: "#0a0a0a" },
  { label: "Blue", value: "#1d4ed8" },
  { label: "Ink", value: "#334155" },
]

export function SignaturePadStroke() {
  const [strokeWidth, setStrokeWidth] = React.useState(2.5)
  const [penColor, setPenColor] = React.useState(COLORS[0]!.value)

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Pen color">
        {COLORS.map((c) => {
          const selected = penColor === c.value
          return (
            <button
              key={c.value}
              type="button"
              aria-pressed={selected}
              className={
                selected
                  ? "cursor-pointer rounded-md border border-primary bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground"
                  : "cursor-pointer rounded-md border border-border/70 bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
              }
              onClick={() => setPenColor(c.value)}
            >
              {c.label}
            </button>
          )
        })}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="sig-width">Stroke</Label>
          <span className="text-xs text-muted-foreground">
            {strokeWidth.toFixed(1)}
          </span>
        </div>
        <Slider
          id="sig-width"
          min={1}
          max={5}
          step={0.1}
          value={[strokeWidth]}
          onValueChange={(v) => setStrokeWidth(v[0] ?? 2)}
        />
      </div>
      <SignaturePad
        guide="Sign here"
        penColor={penColor}
        strokeWidth={strokeWidth}
      />
    </div>
  )
}

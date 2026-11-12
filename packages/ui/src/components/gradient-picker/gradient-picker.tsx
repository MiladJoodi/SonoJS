"use client"

import * as React from "react"
import { CheckIcon, CopyIcon, PlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { ColorPicker } from "@sonojs/ui/components/color-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { Slider } from "@sonojs/ui/components/slider"
import { ToggleGroup, ToggleGroupItem } from "@sonojs/ui/components/toggle-group"
import { cn } from "@sonojs/ui/lib/utils"

export type GradientType = "linear" | "radial"

export type GradientStop = {
  id: string
  color: string
  position: number
}

export type GradientValue = {
  type: GradientType
  angle: number
  stops: GradientStop[]
}

export type GradientPickerProps = {
  value?: GradientValue
  defaultValue?: GradientValue
  onValueChange?: (value: GradientValue, css: string) => void
  disabled?: boolean
  className?: string
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export const DEFAULT_GRADIENT: GradientValue = {
  type: "linear",
  angle: 90,
  stops: [
    { id: "a", color: "#3B82F6", position: 0 },
    { id: "b", color: "#8B5CF6", position: 100 },
  ],
}

export function gradientToCss(value: GradientValue): string {
  const stops = [...value.stops]
    .sort((a, b) => a.position - b.position)
    .map((s) => `${s.color} ${Math.round(s.position)}%`)
    .join(", ")
  if (value.type === "radial") {
    return `radial-gradient(circle, ${stops})`
  }
  return `linear-gradient(${Math.round(value.angle)}deg, ${stops})`
}

function GradientPicker({
  value: valueProp,
  defaultValue = DEFAULT_GRADIENT,
  onValueChange,
  disabled = false,
  className,
}: GradientPickerProps) {
  const isControlled = valueProp !== undefined
  const [uncontrolled, setUncontrolled] =
    React.useState<GradientValue>(defaultValue)
  const [copied, setCopied] = React.useState(false)
  const value = isControlled ? valueProp : uncontrolled
  const css = gradientToCss(value)

  const commit = (next: GradientValue) => {
    if (disabled) return
    if (!isControlled) setUncontrolled(next)
    onValueChange?.(next, gradientToCss(next))
  }

  const updateStop = (id: string, patch: Partial<GradientStop>) => {
    commit({
      ...value,
      stops: value.stops.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    })
  }

  const addStop = () => {
    if (value.stops.length >= 6) return
    const mid = Math.round(
      value.stops.reduce((sum, s) => sum + s.position, 0) / value.stops.length
    )
    commit({
      ...value,
      stops: [
        ...value.stops,
        { id: createId(), color: "#FFFFFF", position: mid },
      ],
    })
  }

  const removeStop = (id: string) => {
    if (value.stops.length <= 2) return
    commit({ ...value, stops: value.stops.filter((s) => s.id !== id) })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div
      data-slot="gradient-picker"
      className={cn(
        "flex w-full max-w-md flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft",
        className
      )}
    >
      <div
        className="h-24 w-full rounded-md border border-border/70"
        style={{ backgroundImage: css }}
        aria-label="Gradient preview"
      />

      <ToggleGroup
        type="single"
        value={value.type}
        disabled={disabled}
        onValueChange={(next) => {
          if (next === "linear" || next === "radial") {
            commit({ ...value, type: next })
          }
        }}
        variant="outline"
        className="w-full"
      >
        <ToggleGroupItem value="linear" className="flex-1 cursor-pointer">
          Linear
        </ToggleGroupItem>
        <ToggleGroupItem value="radial" className="flex-1 cursor-pointer">
          Radial
        </ToggleGroupItem>
      </ToggleGroup>

      {value.type === "linear" ? (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Angle</span>
            <span>{Math.round(value.angle)}°</span>
          </div>
          <Slider
            min={0}
            max={360}
            step={1}
            value={[value.angle]}
            disabled={disabled}
            onValueChange={([angle]) => commit({ ...value, angle })}
            aria-label="Gradient angle"
          />
        </div>
      ) : null}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">Stops</p>
          <Button
            type="button"
            size="xs"
            variant="outline"
            disabled={disabled || value.stops.length >= 6}
            className="cursor-pointer"
            onClick={addStop}
          >
            <PlusIcon className="size-3.5" />
            Add
          </Button>
        </div>
        <ul className="space-y-2">
          {[...value.stops]
            .sort((a, b) => a.position - b.position)
            .map((stop) => (
              <li
                key={stop.id}
                className="flex items-center gap-2 rounded-md border border-border/60 p-2"
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      disabled={disabled}
                      aria-label={`Edit stop color ${stop.color}`}
                      className="size-8 shrink-0 cursor-pointer rounded-md border border-border/70 disabled:cursor-not-allowed disabled:opacity-50"
                      style={{ backgroundColor: stop.color }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto border-0 bg-transparent p-0 shadow-none">
                    <ColorPicker
                      value={stop.color}
                      onValueChange={(color) =>
                        updateStop(stop.id, { color })
                      }
                      showOpacity
                      showCopy
                      compact
                    />
                  </PopoverContent>
                </Popover>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Position</span>
                    <span>{Math.round(stop.position)}%</span>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[stop.position]}
                    disabled={disabled}
                    onValueChange={([position]) =>
                      updateStop(stop.id, { position })
                    }
                  />
                </div>
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  disabled={disabled || value.stops.length <= 2}
                  className="size-8 shrink-0 cursor-pointer"
                  aria-label="Remove stop"
                  onClick={() => removeStop(stop.id)}
                >
                  <Trash2Icon className="size-3.5" />
                </Button>
              </li>
            ))}
        </ul>
      </div>

      <div className="flex items-start gap-2 rounded-md border border-border/60 bg-muted/30 p-2">
        <code className="min-w-0 flex-1 break-all font-mono text-xs text-foreground">
          {css}
        </code>
        <Button
          type="button"
          size="icon-xs"
          variant="outline"
          className="size-8 shrink-0 cursor-pointer"
          aria-label={copied ? "Copied" : "Copy CSS"}
          disabled={disabled}
          onClick={() => {
            void handleCopy()
          }}
        >
          {copied ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
        </Button>
      </div>
    </div>
  )
}

export { GradientPicker }

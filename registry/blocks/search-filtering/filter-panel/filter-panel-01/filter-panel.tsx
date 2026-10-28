"use client"

import * as React from "react"
import {
  BookmarkIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  FilterIcon,
  RotateCcwIcon,
  SaveIcon,
  SlidersHorizontalIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

const STATUS_OPTIONS = [
  "Active",
  "Draft",
  "Archived",
  "Pending Review",
  "Scheduled",
] as const
const CATEGORY_OPTIONS = [
  "Analytics",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
  "HR",
] as const
const REGION_OPTIONS = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East",
] as const
const OWNER_OPTIONS = [
  "Alice Johnson",
  "Bob Smith",
  "Carol White",
  "David Lee",
  "Eva Garcia",
] as const

const DATE_SHORTCUTS = [
  "Last 7d",
  "Last 30d",
  "This quarter",
  "This year",
] as const

const SAVED_PRESETS = [
  {
    id: "p1",
    name: "Q2 Marketing",
    filters: ["Marketing", "Active", "Europe"],
    date: "Jun 15, 2026",
  },
  {
    id: "p2",
    name: "Sales YTD",
    filters: ["Sales", "Active", "North America"],
    date: "Jun 1, 2026",
  },
  {
    id: "p3",
    name: "HR Archive",
    filters: ["HR", "Archived"],
    date: "May 20, 2026",
  },
]

type MultiSelectProp = "status" | "category" | "region" | "owner"

function MultiSelect({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: readonly string[]
  selected: Set<string>
  onToggle: (v: string) => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-haspopup="listbox"
          className={cn(
            "flex h-[46px] w-full cursor-pointer items-center justify-between rounded-md border bg-card px-3 text-sm transition-colors",
            open
              ? "border-ring ring-2 ring-ring/30"
              : "border-border/70 hover:border-border"
          )}
        >
          <span
            className={cn(
              selected.size === 0
                ? "text-muted-foreground"
                : "font-medium text-foreground"
            )}
          >
            {selected.size === 0
              ? `Select ${label.toLowerCase()}…`
              : `${selected.size} selected`}
          </span>
          <ChevronDownIcon
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] max-h-52 overflow-y-auto p-1"
      >
        <div role="listbox" aria-multiselectable="true" aria-label={label}>
          {options.map((opt) => {
            const isSelected = selected.has(opt)
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => onToggle(opt)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted",
                  isSelected
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                )}
              >
                {opt}
                {isSelected ? (
                  <CheckIcon className="size-4 text-primary" aria-hidden />
                ) : null}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function FilterPanel({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [dateFrom, setDateFrom] = React.useState("2026-01-01")
  const [dateTo, setDateTo] = React.useState("2026-06-23")
  const [selected, setSelected] = React.useState<
    Record<MultiSelectProp, Set<string>>
  >({
    status: new Set(["Active"]),
    category: new Set(),
    region: new Set(),
    owner: new Set(),
  })
  const [revenueRange, setRevenueRange] = React.useState<[number, number]>([
    10, 80,
  ])
  const [recordsRange, setRecordsRange] = React.useState<[number, number]>([
    500, 7500,
  ])
  const [savedPresets, setSavedPresets] = React.useState(SAVED_PRESETS)
  const [presetName, setPresetName] = React.useState("")
  const [saved, setSaved] = React.useState(false)

  const toggleOption = React.useCallback(
    (prop: MultiSelectProp, value: string) => {
      setSelected((prev) => {
        const next = new Set(prev[prop])
        if (next.has(value)) next.delete(value)
        else next.add(value)
        return { ...prev, [prop]: next }
      })
    },
    []
  )

  const activeFilterCount =
    Object.values(selected).reduce((a, s) => a + s.size, 0) +
    (revenueRange[0] > 0 || revenueRange[1] < 100 ? 1 : 0) +
    (recordsRange[0] > 0 || recordsRange[1] < 10000 ? 1 : 0)

  const clearAll = () => {
    setSelected({
      status: new Set(),
      category: new Set(),
      region: new Set(),
      owner: new Set(),
    })
    setRevenueRange([0, 100])
    setRecordsRange([0, 10000])
    setDateFrom("2026-01-01")
    setDateTo("2026-06-23")
  }

  const handleSavePreset = () => {
    if (!presetName.trim()) return
    const chips = [
      ...Array.from(selected.category),
      ...Array.from(selected.status),
      ...Array.from(selected.region),
    ].slice(0, 3)
    setSavedPresets((prev) => [
      {
        id: `p${Date.now()}`,
        name: presetName.trim(),
        filters: chips.length ? chips : ["Custom"],
        date: "Jun 23, 2026",
      },
      ...prev,
    ])
    setPresetName("")
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  const applyPreset = (filters: string[]) => {
    setSelected({
      status: new Set(
        filters.filter((value) =>
          (STATUS_OPTIONS as readonly string[]).includes(value)
        )
      ),
      category: new Set(
        filters.filter((value) =>
          (CATEGORY_OPTIONS as readonly string[]).includes(value)
        )
      ),
      region: new Set(
        filters.filter((value) =>
          (REGION_OPTIONS as readonly string[]).includes(value)
        )
      ),
      owner: new Set(
        filters.filter((value) =>
          (OWNER_OPTIONS as readonly string[]).includes(value)
        )
      ),
    })
  }

  const dimensions: {
    prop: MultiSelectProp
    label: string
    options: readonly string[]
  }[] = [
    { prop: "status", label: "Status", options: STATUS_OPTIONS },
    { prop: "category", label: "Category", options: CATEGORY_OPTIONS },
    { prop: "region", label: "Region", options: REGION_OPTIONS },
    { prop: "owner", label: "Owner", options: OWNER_OPTIONS },
  ]

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-8 text-foreground dark:bg-background",
        className
      )}
      aria-labelledby="filter-panel-01-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-start">
            <div className="mb-1 flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-[10px] bg-primary/10 text-primary">
                <FilterIcon className="size-4" aria-hidden />
              </span>
              <h1
                id="filter-panel-01-heading"
                className="text-2xl font-semibold tracking-tight text-foreground"
              >
                Report Filters
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Configure filters to build your custom report.
            </p>
          </div>
          {activeFilterCount > 0 ? (
            <Button type="button" variant="ghost" onClick={clearAll}>
              <RotateCcwIcon className="size-4" aria-hidden />
              Reset all
              <Badge variant="secondary" className="ms-1 font-semibold">
                {activeFilterCount}
              </Badge>
            </Button>
          ) : null}
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main panel */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-border/70 shadow-soft">
              {/* Date range */}
              <div className="border-b border-border/70 p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <CalendarIcon className="size-4 text-primary" aria-hidden />
                  <h2 className="text-sm font-semibold text-foreground">
                    Date Range
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="grid gap-1.5 text-start">
                    <Label htmlFor="filter-panel-01-from">From</Label>
                    <Input
                      id="filter-panel-01-from"
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      dir="ltr"
                    />
                  </div>
                  <div className="grid gap-1.5 text-start">
                    <Label htmlFor="filter-panel-01-to">To</Label>
                    <Input
                      id="filter-panel-01-to"
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {DATE_SHORTCUTS.map((label) => (
                    <button
                      key={label}
                      type="button"
                      className="cursor-pointer rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div className="border-b border-border/70 p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <SlidersHorizontalIcon
                    className="size-4 text-primary"
                    aria-hidden
                  />
                  <h2 className="text-sm font-semibold text-foreground">
                    Dimensions
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {dimensions.map(({ prop, label, options }) => (
                    <div key={prop} className="text-start">
                      <Label className="mb-1.5 block">{label}</Label>
                      <MultiSelect
                        label={label}
                        options={options}
                        selected={selected[prop]}
                        onToggle={(v) => toggleOption(prop, v)}
                      />
                      {selected[prop].size > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {Array.from(selected[prop]).map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => toggleOption(prop, v)}
                              className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                            >
                              {v}
                              <XIcon className="size-3" aria-hidden />
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ranges */}
              <div className="p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-2">
                  <SlidersHorizontalIcon
                    className="size-4 text-primary"
                    aria-hidden
                  />
                  <h2 className="text-sm font-semibold text-foreground">
                    Numeric Ranges
                  </h2>
                </div>
                <div className="space-y-7">
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-xs text-muted-foreground">
                        Revenue ($K)
                      </p>
                      <p
                        dir="ltr"
                        className="text-xs font-semibold tabular-nums text-foreground"
                      >
                        ${revenueRange[0]}K — ${revenueRange[1]}K
                      </p>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={revenueRange}
                      onValueChange={(value) => {
                        if (value.length >= 2) {
                          setRevenueRange([value[0]!, value[1]!])
                        }
                      }}
                      aria-label="Revenue range"
                    />
                  </div>
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-xs text-muted-foreground">
                        Record Count
                      </p>
                      <p
                        dir="ltr"
                        className="text-xs font-semibold tabular-nums text-foreground"
                      >
                        {recordsRange[0].toLocaleString("en-US")} —{" "}
                        {recordsRange[1].toLocaleString("en-US")}
                      </p>
                    </div>
                    <Slider
                      min={0}
                      max={10000}
                      step={100}
                      value={recordsRange}
                      onValueChange={(value) => {
                        if (value.length >= 2) {
                          setRecordsRange([value[0]!, value[1]!])
                        }
                      }}
                      aria-label="Record count range"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button type="button" className="px-8">
                Apply filters
                {activeFilterCount > 0 ? (
                  <span
                    dir="ltr"
                    className="ms-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary-foreground/20 px-1.5 text-xs font-semibold"
                  >
                    {activeFilterCount}
                  </span>
                ) : null}
              </Button>
              <Button type="button" variant="outline" onClick={clearAll}>
                <RotateCcwIcon className="size-4" aria-hidden />
                Reset
              </Button>
            </div>
          </div>

          {/* Presets */}
          <Card className="overflow-hidden border-border/70 shadow-soft">
            <CardHeader className="border-b border-border/70 py-4">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <BookmarkIcon className="size-4 text-primary" aria-hidden />
                Saved presets
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border/70 p-0">
              {savedPresets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex flex-col gap-1.5 px-5 py-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      className="cursor-pointer rounded-sm text-start text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={() => applyPreset(preset.filters)}
                    >
                      {preset.name}
                    </button>
                    <Button
                      type="button"
                      size="icon-xs"
                      variant="ghost"
                      aria-label={`Remove ${preset.name}`}
                      className="size-8 text-muted-foreground"
                      onClick={() =>
                        setSavedPresets((p) =>
                          p.filter((x) => x.id !== preset.id)
                        )
                      }
                    >
                      <XIcon className="size-3.5" aria-hidden />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {preset.filters.map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <p
                    dir="ltr"
                    className="text-xs text-muted-foreground"
                  >
                    {preset.date}
                  </p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-2 border-t border-border/70 bg-muted/30 py-4">
              <p className="text-xs font-semibold text-foreground">
                Save current filters
              </p>
              <div className="flex gap-2">
                <Input
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  placeholder="Preset name…"
                  aria-label="Preset name"
                  className="h-10"
                />
                <Button
                  type="button"
                  size="icon-sm"
                  aria-label="Save preset"
                  disabled={!presetName.trim()}
                  onClick={handleSavePreset}
                  className={cn(
                    saved &&
                      "border-transparent bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300"
                  )}
                  variant={saved ? "outline" : "default"}
                >
                  {saved ? (
                    <CheckIcon className="size-4" aria-hidden />
                  ) : (
                    <SaveIcon className="size-4" aria-hidden />
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

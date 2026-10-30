"use client"

import * as React from "react"
import {
  ChartColumnIcon,
  ChevronDownIcon,
  Columns3Icon,
  CrosshairIcon,
  DollarSignIcon,
  EyeIcon,
  GaugeIcon,
  SearchIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Label } from "@sonojs/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { RadioGroup, RadioGroupItem } from "@sonojs/ui/components/radio-group"
import { Separator } from "@sonojs/ui/components/separator"
import { Switch } from "@sonojs/ui/components/switch"
import { cn } from "@/lib/utils"

const NAV = [
  { id: "columns", label: "Columns", icon: Columns3Icon },
  { id: "intent", label: "Intent", icon: CrosshairIcon },
  { id: "serp", label: "SERP", icon: SearchIcon },
  { id: "metrics", label: "Metrics", icon: GaugeIcon },
  { id: "display", label: "Display", icon: EyeIcon },
  { id: "chart", label: "Chart", icon: ChartColumnIcon },
] as const

type NavId = (typeof NAV)[number]["id"]

const COLUMNS = [
  { id: "keyword", label: "Keyword" },
  { id: "intent", label: "Intent" },
  { id: "volume", label: "Volume" },
  { id: "cpc", label: "CPC" },
  { id: "position", label: "Position" },
  { id: "url", label: "URL" },
  { id: "serp", label: "SERP" },
] as const

const INTENT = [
  { id: "informational", label: "Informational" },
  { id: "commercial", label: "Commercial" },
  { id: "transactional", label: "Transactional" },
  { id: "navigational", label: "Navigational" },
] as const

const SERP_FEATURES = [
  { id: "featured", label: "Featured snippet" },
  { id: "paa", label: "People also ask" },
  { id: "images", label: "Image pack" },
  { id: "video", label: "Video" },
  { id: "local", label: "Local pack" },
  { id: "sitelinks", label: "Sitelinks" },
] as const

function CheckRow({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (next: boolean) => void
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-md border border-transparent px-2 py-1.5 transition-colors hover:bg-muted/50",
        checked && "border-border/60 bg-muted/40"
      )}
    >
      <Checkbox
        id={id}
        checked={checked}
        className="cursor-pointer"
        onCheckedChange={(v) => onCheckedChange(v === true)}
      />
      <span className="text-sm">{label}</span>
    </label>
  )
}

function SwitchRow({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (next: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border/70 px-3 py-2.5">
      <Label htmlFor={id} className="cursor-pointer font-normal leading-snug">
        {label}
      </Label>
      <Switch
        id={id}
        checked={checked}
        className="cursor-pointer"
        onCheckedChange={onCheckedChange}
      />
    </div>
  )
}

function PillRadios({
  name,
  value,
  onValueChange,
  options,
}: {
  name: string
  value: string
  onValueChange: (v: string) => void
  options: readonly { id: string; label: string }[]
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className="flex flex-wrap gap-1.5"
      aria-label={name}
    >
      {options.map((option) => {
        const id = `${name}-${option.id}`
        const on = value === option.id
        return (
          <div key={option.id} className="relative">
            <RadioGroupItem
              value={option.id}
              id={id}
              className="peer sr-only"
            />
            <Label
              htmlFor={id}
              className={cn(
                "inline-flex cursor-pointer items-center rounded-full border border-border/70 px-2.5 py-1 text-xs font-medium transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground",
                on && "border-primary bg-primary text-primary-foreground"
              )}
            >
              {option.label}
            </Label>
          </div>
        )
      })}
    </RadioGroup>
  )
}

function toggleSet(
  setter: React.Dispatch<React.SetStateAction<Set<string>>>,
  value: string,
  on: boolean
) {
  setter((prev) => {
    const next = new Set(prev)
    if (on) next.add(value)
    else next.delete(value)
    return next
  })
}

export default function AdvancedFilters03() {
  const [open, setOpen] = React.useState(false)
  const [section, setSection] = React.useState<NavId>("columns")

  const [columns, setColumns] = React.useState<Set<string>>(
    () => new Set(["keyword", "volume", "cpc", "position", "url"])
  )
  const [intent, setIntent] = React.useState<Set<string>>(
    () => new Set(["commercial", "transactional"])
  )
  const [serpMode, setSerpMode] = React.useState("organic")
  const [serpFeatures, setSerpFeatures] = React.useState<Set<string>>(
    () => new Set(["featured", "paa"])
  )
  const [startPosition, setStartPosition] = React.useState("top10")
  const [volume, setVolume] = React.useState("1k+")
  const [cpc, setCpc] = React.useState("any")

  const [showKeywordTags, setShowKeywordTags] = React.useState(true)
  const [showSerpIcons, setShowSerpIcons] = React.useState(true)
  const [smartZoom, setSmartZoom] = React.useState(true)
  const [rowHeight, setRowHeight] = React.useState("comfortable")
  const [chartShowTags, setChartShowTags] = React.useState(false)
  const [chartShowSerpIcons, setChartShowSerpIcons] = React.useState(true)
  const [applyAllProjects, setApplyAllProjects] = React.useState(false)

  const activeCount =
    columns.size +
    intent.size +
    serpFeatures.size +
    (serpMode !== "all" ? 1 : 0) +
    (startPosition !== "any" ? 1 : 0) +
    (volume !== "any" ? 1 : 0) +
    (cpc !== "any" ? 1 : 0)

  const reset = () => {
    setColumns(new Set(["keyword", "volume", "cpc", "position", "url"]))
    setIntent(new Set(["commercial", "transactional"]))
    setSerpMode("organic")
    setSerpFeatures(new Set(["featured", "paa"]))
    setStartPosition("top10")
    setVolume("1k+")
    setCpc("any")
    setShowKeywordTags(true)
    setShowSerpIcons(true)
    setSmartZoom(true)
    setRowHeight("comfortable")
    setChartShowTags(false)
    setChartShowSerpIcons(true)
    setApplyAllProjects(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" className="max-w-full cursor-pointer gap-2">
          <Columns3Icon className="size-4 shrink-0 opacity-80" aria-hidden />
          <span className="truncate">SEO filters</span>
          {activeCount > 0 ? (
            <Badge
              variant="secondary"
              className="shrink-0 border-transparent bg-primary-foreground/15 text-primary-foreground tabular-nums"
            >
              {activeCount}
            </Badge>
          ) : null}
          <ChevronDownIcon
            className={cn(
              "size-4 shrink-0 opacity-70 transition-transform",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        collisionPadding={16}
        className="w-[min(100vw-1.5rem,28rem)] max-w-[calc(100vw-1.5rem)] overflow-hidden border-border/70 p-0 shadow-soft"
      >
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border/70 px-3 py-3 sm:px-3.5">
          <div className="min-w-0 flex-1 text-start">
            <p className="text-sm font-semibold">Keyword console</p>
            <p className="text-xs text-muted-foreground">
              Navigate sections — denser than a scroll wall
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 shrink-0 cursor-pointer px-2 text-xs"
            onClick={reset}
          >
            Reset
          </Button>
        </div>

        <div className="flex min-h-0 flex-col sm:flex-row">
          <nav
            className="flex shrink-0 gap-1 overflow-x-auto overscroll-x-contain border-b border-border/70 bg-muted/25 p-1.5 [scrollbar-width:none] sm:w-[7.25rem] sm:flex-col sm:overflow-x-visible sm:overflow-y-auto sm:border-e sm:border-b-0 [&::-webkit-scrollbar]:hidden"
            aria-label="Filter sections"
          >
            {NAV.map((item) => {
              const Icon = item.icon
              const on = section === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
                  className={cn(
                    "flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-2 text-start text-xs font-medium whitespace-nowrap transition-colors sm:w-full sm:px-2",
                    on
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <Icon className="size-3.5 shrink-0 opacity-70" aria-hidden />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="min-h-0 min-w-0 max-h-[min(38dvh,15rem)] flex-1 space-y-3 overflow-y-auto overscroll-contain p-3 sm:max-h-[min(42dvh,16rem)] sm:p-3.5">
            {section === "columns" ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Visible columns
                </p>
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {COLUMNS.map((col) => (
                    <CheckRow
                      key={col.id}
                      id={`af-03-col-${col.id}`}
                      label={col.label}
                      checked={columns.has(col.id)}
                      onCheckedChange={(on) =>
                        toggleSet(setColumns, col.id, on)
                      }
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {section === "intent" ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Search intent
                </p>
                <div className="grid grid-cols-1 gap-1">
                  {INTENT.map((item) => (
                    <CheckRow
                      key={item.id}
                      id={`af-03-intent-${item.id}`}
                      label={item.label}
                      checked={intent.has(item.id)}
                      onCheckedChange={(on) =>
                        toggleSet(setIntent, item.id, on)
                      }
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {section === "serp" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Result type
                  </p>
                  <PillRadios
                    name="af-03-serp"
                    value={serpMode}
                    onValueChange={setSerpMode}
                    options={[
                      { id: "all", label: "All" },
                      { id: "organic", label: "Organic" },
                      { id: "paid", label: "Paid" },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Features
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {SERP_FEATURES.map((item) => (
                      <CheckRow
                        key={item.id}
                        id={`af-03-feat-${item.id}`}
                        label={item.label}
                        checked={serpFeatures.has(item.id)}
                        onCheckedChange={(on) =>
                          toggleSet(setSerpFeatures, item.id, on)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {section === "metrics" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    <GaugeIcon className="size-3" aria-hidden />
                    Start position
                  </p>
                  <PillRadios
                    name="af-03-pos"
                    value={startPosition}
                    onValueChange={setStartPosition}
                    options={[
                      { id: "any", label: "Any" },
                      { id: "top3", label: "Top 3" },
                      { id: "top10", label: "Top 10" },
                      { id: "top20", label: "Top 20" },
                      { id: "11-50", label: "11–50" },
                      { id: "51+", label: "51+" },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Volume
                  </p>
                  <PillRadios
                    name="af-03-vol"
                    value={volume}
                    onValueChange={setVolume}
                    options={[
                      { id: "any", label: "Any" },
                      { id: "0-100", label: "0–100" },
                      { id: "101-1k", label: "101–1K" },
                      { id: "1k+", label: "1K+" },
                      { id: "10k+", label: "10K+" },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    <DollarSignIcon className="size-3" aria-hidden />
                    CPC
                  </p>
                  <PillRadios
                    name="af-03-cpc"
                    value={cpc}
                    onValueChange={setCpc}
                    options={[
                      { id: "any", label: "Any" },
                      { id: "low", label: "< $1" },
                      { id: "mid", label: "$1–$5" },
                      { id: "high", label: "$5+" },
                    ]}
                  />
                </div>
              </div>
            ) : null}

            {section === "display" ? (
              <div className="space-y-2.5">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Table chrome
                </p>
                <SwitchRow
                  id="af-03-add-tags"
                  label="Show tags in keywords"
                  checked={showKeywordTags}
                  onCheckedChange={setShowKeywordTags}
                />
                <SwitchRow
                  id="af-03-add-serp"
                  label="Show SERP feature icons"
                  checked={showSerpIcons}
                  onCheckedChange={setShowSerpIcons}
                />
              </div>
            ) : null}

            {section === "chart" ? (
              <div className="space-y-2.5">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Positions chart
                </p>
                <SwitchRow
                  id="af-03-chart-zoom"
                  label="Smart zoom"
                  checked={smartZoom}
                  onCheckedChange={setSmartZoom}
                />
                <div className="space-y-2 rounded-md border border-border/70 p-3">
                  <p className="text-sm font-medium">Row height</p>
                  <PillRadios
                    name="af-03-row"
                    value={rowHeight}
                    onValueChange={setRowHeight}
                    options={[
                      { id: "compact", label: "Compact" },
                      { id: "comfortable", label: "Comfortable" },
                      { id: "spacious", label: "Spacious" },
                    ]}
                  />
                </div>
                <SwitchRow
                  id="af-03-chart-tags"
                  label="Show tags in keywords"
                  checked={chartShowTags}
                  onCheckedChange={setChartShowTags}
                />
                <SwitchRow
                  id="af-03-chart-serp"
                  label="Show SERP feature icons"
                  checked={chartShowSerpIcons}
                  onCheckedChange={setChartShowSerpIcons}
                />
                <SwitchRow
                  id="af-03-chart-all"
                  label="Apply to all projects"
                  checked={applyAllProjects}
                  onCheckedChange={setApplyAllProjects}
                />
              </div>
            ) : null}
          </div>
        </div>

        <Separator />
        <div className="flex flex-col-reverse gap-2 px-3 py-3 sm:flex-row sm:items-center sm:justify-end sm:px-3.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-10 cursor-pointer sm:h-9"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            className="h-10 cursor-pointer sm:h-9"
            onClick={() => setOpen(false)}
          >
            Apply filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

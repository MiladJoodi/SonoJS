"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  GitBranchPlusIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const PROPERTIES = [
  { id: "referring-domain", label: "Referring domain", placeholder: "example.com" },
  { id: "target-url", label: "Target URL", placeholder: "https://…" },
  { id: "anchor-text", label: "Anchor text", placeholder: "click here" },
  { id: "page-title", label: "Page title", placeholder: "Page title" },
  { id: "ip-address", label: "IP address", placeholder: "203.0.113.1" },
] as const

const OPERATORS = [
  { id: "exact", label: "exactly matches" },
  { id: "contains", label: "contains" },
  { id: "starts", label: "starts with" },
  { id: "ends", label: "ends with" },
  { id: "not-contains", label: "does not contain" },
] as const

type ModeId = "include" | "exclude"
type PropertyId = (typeof PROPERTIES)[number]["id"]
type OperatorId = (typeof OPERATORS)[number]["id"]

type PropertyRow = {
  id: string
  mode: ModeId
  property: PropertyId
  operator: OperatorId
  value: string
}

let rowSeq = 0
function createRow(partial?: Partial<Omit<PropertyRow, "id">>): PropertyRow {
  rowSeq += 1
  return {
    id: `prop-${rowSeq}`,
    mode: "include",
    property: "referring-domain",
    operator: "exact",
    value: "",
    ...partial,
  }
}

function propertyMeta(id: PropertyId) {
  return PROPERTIES.find((p) => p.id === id) ?? PROPERTIES[0]!
}

export default function AdvancedFilters05() {
  const [open, setOpen] = React.useState(false)
  const [rows, setRows] = React.useState<PropertyRow[]>(() => [
    createRow({ value: "notion.so" }),
  ])

  const filledCount = rows.filter((r) => r.value.trim().length > 0).length

  const updateRow = (id: string, patch: Partial<PropertyRow>) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch } : row))
    )
  }

  const removeRow = (id: string) => {
    setRows((prev) => (prev.length <= 1 ? [createRow()] : prev.filter((r) => r.id !== id)))
  }

  const addRow = () => setRows((prev) => [...prev, createRow()])

  const clearAll = () => setRows([createRow()])

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button type="button" className="max-w-full cursor-pointer gap-2">
          <GitBranchPlusIcon className="size-4 shrink-0 opacity-80" aria-hidden />
          <span className="truncate">Property rules</span>
          {filledCount > 0 ? (
            <Badge
              variant="secondary"
              className="shrink-0 border-transparent bg-primary-foreground/15 text-primary-foreground tabular-nums"
            >
              {filledCount}
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
        className="box-border w-[min(100vw-1.5rem,22rem)] max-w-[calc(100vw-1.5rem)] overflow-hidden border-border/70 p-0 shadow-soft"
      >
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border/70 px-3 py-2.5">
          <div className="min-w-0 flex-1 text-start">
            <p className="text-sm font-semibold">Filter by properties</p>
            <p className="text-xs text-muted-foreground">
              Rules combined with AND
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 shrink-0 cursor-pointer px-2 text-xs"
            disabled={filledCount === 0 && rows.length <= 1}
            onClick={clearAll}
          >
            Clear
          </Button>
        </div>

        <div className="max-h-[min(34dvh,14rem)] overflow-y-auto overscroll-contain px-3 py-2.5">
          <div className="relative space-y-0">
            {rows.map((row, index) => {
              const meta = propertyMeta(row.property)
              return (
                <React.Fragment key={row.id}>
                  {index > 0 ? (
                    <div className="relative flex items-center justify-center py-1.5">
                      <div className="absolute inset-x-6 top-1/2 h-px bg-border/70" aria-hidden />
                      <span className="relative rounded-full border border-border/70 bg-card px-2 py-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                        and
                      </span>
                    </div>
                  ) : null}

                  <div
                    className={cn(
                      "relative overflow-hidden rounded-md border border-border/70 bg-card",
                      "before:absolute before:inset-y-0 before:start-0 before:w-1 before:rounded-s-md",
                      row.mode === "include"
                        ? "before:bg-emerald-500"
                        : "before:bg-red-500"
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-2.5 py-1.5 ps-3.5">
                      <div className="flex items-center gap-0.5 rounded-md bg-muted/50 p-0.5">
                        <button
                          type="button"
                          onClick={() => updateRow(row.id, { mode: "include" })}
                          className={cn(
                            "h-7 cursor-pointer rounded-sm px-2 text-xs font-medium transition-colors",
                            row.mode === "include"
                              ? "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          Include
                        </button>
                        <button
                          type="button"
                          onClick={() => updateRow(row.id, { mode: "exclude" })}
                          className={cn(
                            "h-7 cursor-pointer rounded-sm px-2 text-xs font-medium transition-colors",
                            row.mode === "exclude"
                              ? "bg-red-500/15 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          Exclude
                        </button>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-7 shrink-0 cursor-pointer text-muted-foreground hover:text-destructive"
                        aria-label={`Delete rule ${index + 1}`}
                        onClick={() => removeRow(row.id)}
                      >
                        <Trash2Icon className="size-3.5" aria-hidden />
                      </Button>
                    </div>

                    <div className="space-y-2 px-2.5 py-2.5 ps-3.5">
                      <div className="grid gap-2">
                        <div className="space-y-1">
                          <Label
                            htmlFor={`af-05-property-${row.id}`}
                            className="text-xs"
                          >
                            Property
                          </Label>
                          <Select
                            value={row.property}
                            onValueChange={(value) =>
                              updateRow(row.id, {
                                property: value as PropertyId,
                              })
                            }
                          >
                            <SelectTrigger
                              id={`af-05-property-${row.id}`}
                              size="sm"
                              className="w-full"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {PROPERTIES.map((property) => (
                                <SelectItem
                                  key={property.id}
                                  value={property.id}
                                >
                                  {property.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label
                            htmlFor={`af-05-operator-${row.id}`}
                            className="text-xs"
                          >
                            Match
                          </Label>
                          <Select
                            value={row.operator}
                            onValueChange={(value) =>
                              updateRow(row.id, {
                                operator: value as OperatorId,
                              })
                            }
                          >
                            <SelectTrigger
                              id={`af-05-operator-${row.id}`}
                              size="sm"
                              className="w-full"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {OPERATORS.map((operator) => (
                                <SelectItem
                                  key={operator.id}
                                  value={operator.id}
                                >
                                  {operator.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor={`af-05-value-${row.id}`}
                          className="text-xs"
                        >
                          Value
                        </Label>
                        <Input
                          id={`af-05-value-${row.id}`}
                          value={row.value}
                          placeholder={meta.placeholder}
                          onChange={(e) =>
                            updateRow(row.id, { value: e.target.value })
                          }
                          className="h-9 font-mono text-sm"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </div>

        <Separator />
        <div className="flex items-center gap-2 px-3 py-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 cursor-pointer gap-1.5"
            onClick={addRow}
          >
            <PlusIcon className="size-4" aria-hidden />
            Add
          </Button>
          <Button
            type="button"
            size="sm"
            className="ms-auto h-9 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

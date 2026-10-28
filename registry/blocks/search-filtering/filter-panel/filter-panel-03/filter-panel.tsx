"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronDownIcon,
  FilterIcon,
  RotateCcwIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { Separator } from "@sonojs/ui/components/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

const STATUS = ["Open", "In progress", "Done", "Blocked"] as const
const PRIORITY = ["Low", "Medium", "High", "Urgent"] as const
const ASSIGNEE = [
  "Alex Rivera",
  "Jordan Lee",
  "Sam Okonkwo",
  "Taylor Chen",
] as const
const ROWS = [
  {
    id: "TSK-1042",
    title: "Fix checkout tax rounding",
    status: "In progress",
    priority: "High",
    assignee: "Alex Rivera",
    updated: "2h ago",
  },
  {
    id: "TSK-1038",
    title: "Add webhook retry policy",
    status: "Open",
    priority: "Medium",
    assignee: "Jordan Lee",
    updated: "Yesterday",
  },
  {
    id: "TSK-1031",
    title: "Document invoice VAT fields",
    status: "Done",
    priority: "Low",
    assignee: "Sam Okonkwo",
    updated: "3d ago",
  },
  {
    id: "TSK-1024",
    title: "Investigate flaky CI on Windows",
    status: "Blocked",
    priority: "Urgent",
    assignee: "Taylor Chen",
    updated: "5d ago",
  },
  {
    id: "TSK-1019",
    title: "Ship filter panel variants",
    status: "In progress",
    priority: "High",
    assignee: "Alex Rivera",
    updated: "1h ago",
  },
] as const

type Dim = "status" | "priority" | "assignee"

function DimPopover({
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
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="cursor-pointer gap-1.5"
        >
          {label}
          {selected.size > 0 ? (
            <Badge variant="secondary" className="ms-0.5">
              {selected.size}
            </Badge>
          ) : null}
          <ChevronDownIcon className="size-3.5 opacity-60" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-52 p-1">
        <div role="listbox" aria-label={label} aria-multiselectable>
          {options.map((opt) => {
            const on = selected.has(opt)
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={on}
                onClick={() => onToggle(opt)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted",
                  on ? "font-medium text-primary" : "text-foreground"
                )}
              >
                {opt}
                {on ? <CheckIcon className="size-4" aria-hidden /> : null}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

/** Data-table filter toolbar with active chips above rows. */
export default function FilterPanel({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [selected, setSelected] = React.useState<Record<Dim, Set<string>>>({
    status: new Set(["Open", "In progress"]),
    priority: new Set(),
    assignee: new Set(),
  })

  const toggle = (dim: Dim, value: string) => {
    setSelected((prev) => {
      const next = new Set(prev[dim])
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return { ...prev, [dim]: next }
    })
  }

  const chips = (
    [
      ...Array.from(selected.status).map((v) => ({ dim: "status" as const, v })),
      ...Array.from(selected.priority).map((v) => ({
        dim: "priority" as const,
        v,
      })),
      ...Array.from(selected.assignee).map((v) => ({
        dim: "assignee" as const,
        v,
      })),
    ] as const
  )

  const clearAll = () =>
    setSelected({
      status: new Set(),
      priority: new Set(),
      assignee: new Set(),
    })

  const filtered = ROWS.filter((row) => {
    if (selected.status.size && !selected.status.has(row.status)) return false
    if (selected.priority.size && !selected.priority.has(row.priority))
      return false
    if (selected.assignee.size && !selected.assignee.has(row.assignee))
      return false
    return true
  })

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-8 text-foreground dark:bg-background",
        className
      )}
      aria-labelledby="filter-panel-03-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="flex flex-col gap-3 border-b border-border/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-2 text-start">
              <FilterIcon className="size-4 text-primary" aria-hidden />
              <h1
                id="filter-panel-03-heading"
                className="text-base font-semibold"
              >
                Tasks
              </h1>
              <Badge variant="secondary" dir="ltr">
                {filtered.length}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <DimPopover
                label="Status"
                options={STATUS}
                selected={selected.status}
                onToggle={(v) => toggle("status", v)}
              />
              <DimPopover
                label="Priority"
                options={PRIORITY}
                selected={selected.priority}
                onToggle={(v) => toggle("priority", v)}
              />
              <DimPopover
                label="Assignee"
                options={ASSIGNEE}
                selected={selected.assignee}
                onToggle={(v) => toggle("assignee", v)}
              />
              <Separator orientation="vertical" className="hidden h-6 sm:block" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="cursor-pointer gap-1.5"
                disabled={chips.length === 0}
                onClick={clearAll}
              >
                <RotateCcwIcon className="size-3.5" aria-hidden />
                Reset
              </Button>
            </div>
          </div>

          {chips.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 border-b border-border/70 bg-muted/30 px-4 py-3 sm:px-5">
              {chips.map(({ dim, v }) => (
                <button
                  key={`${dim}-${v}`}
                  type="button"
                  onClick={() => toggle(dim, v)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs font-medium transition-colors hover:border-primary/40"
                >
                  <span className="text-muted-foreground capitalize">{dim}:</span>
                  {v}
                  <XIcon className="size-3 opacity-60" aria-hidden />
                </button>
              ))}
            </div>
          ) : null}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead className="text-end">Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-mono text-xs" dir="ltr">
                      {row.id}
                    </TableCell>
                    <TableCell className="max-w-[16rem] truncate font-medium text-start">
                      {row.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{row.status}</Badge>
                    </TableCell>
                    <TableCell>{row.priority}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.assignee}
                    </TableCell>
                    <TableCell className="text-end text-muted-foreground" dir="ltr">
                      {row.updated}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No tasks match these filters.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  )
}

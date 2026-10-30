"use client"

import * as React from "react"
import {
  Columns3Icon,
  DownloadIcon,
  FilterIcon,
  PlusIcon,
  SaveIcon,
  SearchIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Input } from "@sonojs/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

type Severity = "info" | "warn" | "critical"
type AuditRow = {
  id: string
  actor: string
  action: string
  resource: string
  severity: Severity
  createdAt: string
  success: boolean
}
type Field = "actor" | "action" | "resource" | "severity" | "createdAt" | "success"
type Join = "and" | "or"
type Operator =
  | "contains" | "not_contains" | "is" | "is_empty" | "is_not"
  | "before" | "after" | "between"
type Condition = {
  kind: "condition"
  id: string
  field: Field
  operator: Operator
  value: string
  valueEnd: string
}
type QueryGroup = {
  kind: "group"
  id: string
  join: Join
  children: Array<Condition | QueryGroup>
}
type SortRule = { field: Field; direction: "asc" | "desc" }
type ColumnKey = "actor" | "action" | "resource" | "severity" | "createdAt" | "success"
type SavedQuery = { id: string; name: string; query: QueryGroup }

const STORAGE_KEY = "sonojs:table-toolbar:saved-queries"
const AUDIT_ROWS: AuditRow[] = [
  { id: "evt-1001", actor: "Ava Chen", action: "Signed in", resource: "Admin console", severity: "info", createdAt: "2026-03-28T09:12:00Z", success: true },
  { id: "evt-1002", actor: "Ben Ortiz", action: "Updated role", resource: "Carla Moss", severity: "warn", createdAt: "2026-03-28T08:45:00Z", success: true },
  { id: "evt-1003", actor: "System", action: "Blocked request", resource: "API gateway", severity: "critical", createdAt: "2026-03-28T08:11:00Z", success: false },
  { id: "evt-1004", actor: "Elena Voss", action: "Deleted token", resource: "Production API", severity: "warn", createdAt: "2026-03-27T16:03:00Z", success: true },
]

const FIELD_LABEL: Record<Field, string> = {
  actor: "Actor",
  action: "Action",
  resource: "Resource",
  severity: "Severity",
  createdAt: "Created at",
  success: "Success",
}
const FIELDS = Object.keys(FIELD_LABEL) as Field[]
const TEXT_OPERATORS: Operator[] = ["contains", "not_contains", "is", "is_empty"]
const SELECT_OPERATORS: Operator[] = ["is", "is_not"]
const DATE_OPERATORS: Operator[] = ["before", "after", "between"]
const OPERATOR_LABEL: Record<Operator, string> = {
  contains: "contains",
  not_contains: "does not contain",
  is: "is",
  is_empty: "is empty",
  is_not: "is not",
  before: "before",
  after: "after",
  between: "between",
}
const COLUMNS: Array<{ key: ColumnKey; label: string }> = FIELDS.map((key) => ({
  key,
  label: FIELD_LABEL[key],
}))
let nextId = 1

function id(prefix: string) {
  nextId += 1
  return `${prefix}-${nextId}`
}
function createCondition(): Condition {
  return { kind: "condition", id: id("condition"), field: "actor", operator: "contains", value: "", valueEnd: "" }
}
function createQuery(): QueryGroup {
  return { kind: "group", id: id("group"), join: "and", children: [createCondition()] }
}
function operatorsFor(field: Field): Operator[] {
  if (field === "severity") return SELECT_OPERATORS
  if (field === "createdAt") return DATE_OPERATORS
  if (field === "success") return ["is"]
  return TEXT_OPERATORS
}
function cloneQuery(query: QueryGroup): QueryGroup {
  return JSON.parse(JSON.stringify(query)) as QueryGroup
}
function updateCondition(group: QueryGroup, conditionId: string, patch: Partial<Condition>): QueryGroup {
  return {
    ...group,
    children: group.children.map((child) => {
      if (child.kind === "group") return updateCondition(child, conditionId, patch)
      return child.id === conditionId ? { ...child, ...patch } : child
    }),
  }
}
function removeNode(group: QueryGroup, nodeId: string): QueryGroup {
  return {
    ...group,
    children: group.children
      .filter((child) => child.id !== nodeId)
      .map((child) => child.kind === "group" ? removeNode(child, nodeId) : child),
  }
}
function conditionMatches(row: AuditRow, condition: Condition) {
  const raw = row[condition.field]
  const text = String(raw).toLowerCase()
  const value = condition.value.toLowerCase()
  if (condition.operator === "is_empty") return text.length === 0
  if (condition.field === "createdAt") {
    const time = new Date(String(raw)).getTime()
    const start = new Date(condition.value).getTime()
    const end = new Date(condition.valueEnd).getTime()
    if (Number.isNaN(start)) return true
    if (condition.operator === "before") return time < start
    if (condition.operator === "after") return time > start
    return Number.isNaN(end) || (time >= start && time <= end + 86_399_999)
  }
  if (!condition.value) return true
  if (condition.operator === "contains") return text.includes(value)
  if (condition.operator === "not_contains") return !text.includes(value)
  if (condition.operator === "is_not") return text !== value
  return text === value
}
function evaluateGroup(row: AuditRow, group: QueryGroup): boolean {
  if (group.children.length === 0) return true
  const results = group.children.map((child) =>
    child.kind === "group" ? evaluateGroup(row, child) : conditionMatches(row, child)
  )
  return group.join === "and" ? results.every(Boolean) : results.some(Boolean)
}
function allConditions(group: QueryGroup): Condition[] {
  return group.children.flatMap((child) =>
    child.kind === "group" ? allConditions(child) : [child]
  )
}
function conditionSummary(condition: Condition) {
  const suffix = condition.operator === "is_empty"
    ? ""
    : condition.operator === "between"
      ? ` ${condition.value || "…"} and ${condition.valueEnd || "…"}`
      : ` ${condition.value || "…"}`
  return `${FIELD_LABEL[condition.field]} ${OPERATOR_LABEL[condition.operator]}${suffix}`
}
function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`
}
function exportCsv(rows: AuditRow[]) {
  const csv = [
    ["ID", ...COLUMNS.map((column) => column.label)].map(csvCell).join(","),
    ...rows.map((row) =>
      [row.id, row.actor, row.action, row.resource, row.severity, row.createdAt, String(row.success)]
        .map(csvCell).join(",")
    ),
  ].join("\n")
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = "filtered-audit-log.csv"
  anchor.click()
  URL.revokeObjectURL(url)
}

function ConditionEditor({
  condition,
  onChange,
  onRemove,
}: {
  condition: Condition
  onChange: (patch: Partial<Condition>) => void
  onRemove: () => void
}) {
  const operators = operatorsFor(condition.field)
  return (
    <div className="grid gap-2 rounded-[12px] border border-border/70 bg-card p-2 md:grid-cols-[150px_170px_minmax(160px,1fr)_auto]">
      <Select
        value={condition.field}
        onValueChange={(value) => {
          const field = value as Field
          const defaultValue = field === "severity" ? "info" : field === "success" ? "true" : ""
          onChange({ field, operator: operatorsFor(field)[0], value: defaultValue, valueEnd: "" })
        }}
      >
        <SelectTrigger size="sm" className="w-full cursor-pointer" aria-label="Condition field"><SelectValue /></SelectTrigger>
        <SelectContent>{FIELDS.map((field) => <SelectItem key={field} value={field}>{FIELD_LABEL[field]}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={condition.operator} onValueChange={(value) => onChange({ operator: value as Operator })}>
        <SelectTrigger size="sm" className="w-full cursor-pointer" aria-label="Condition operator"><SelectValue /></SelectTrigger>
        <SelectContent>{operators.map((operator) => <SelectItem key={operator} value={operator}>{OPERATOR_LABEL[operator]}</SelectItem>)}</SelectContent>
      </Select>
      <div className="flex gap-2">
        {condition.operator === "is_empty" ? (
          <div className="flex h-10 flex-1 items-center px-3 text-sm text-muted-foreground">No value needed</div>
        ) : condition.field === "severity" ? (
          <Select value={condition.value || "info"} onValueChange={(value) => onChange({ value })}>
            <SelectTrigger size="sm" className="w-full cursor-pointer" aria-label="Severity value"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="info">Info</SelectItem><SelectItem value="warn">Warn</SelectItem><SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        ) : condition.field === "success" ? (
          <Select value={condition.value || "true"} onValueChange={(value) => onChange({ value })}>
            <SelectTrigger size="sm" className="w-full cursor-pointer" aria-label="Success value"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="true">True</SelectItem><SelectItem value="false">False</SelectItem></SelectContent>
          </Select>
        ) : (
          <>
            <Input
              type={condition.field === "createdAt" ? "date" : "text"}
              value={condition.value}
              onChange={(event) => onChange({ value: event.target.value })}
              placeholder="Value"
              className="h-10 min-w-0"
              aria-label="Condition value"
            />
            {condition.operator === "between" ? (
              <Input type="date" value={condition.valueEnd} onChange={(event) => onChange({ valueEnd: event.target.value })} className="h-10 min-w-0" aria-label="Condition end value" />
            ) : null}
          </>
        )}
      </div>
      <Button type="button" variant="ghost" size="icon-sm" className="size-10 cursor-pointer text-muted-foreground" onClick={onRemove} aria-label="Remove condition">
        <Trash2Icon className="size-4" aria-hidden />
      </Button>
    </div>
  )
}

export default function TableToolbar05({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [search, setSearch] = React.useState("")
  const [draft, setDraft] = React.useState<QueryGroup>(() => createQuery())
  const [applied, setApplied] = React.useState<QueryGroup>(() => ({ kind: "group", id: "applied", join: "and", children: [] }))
  const [savedQueries, setSavedQueries] = React.useState<SavedQuery[]>([])
  const [sorts, setSorts] = React.useState<SortRule[]>([])
  const [visible, setVisible] = React.useState<Record<ColumnKey, boolean>>({
    actor: true, action: true, resource: true, severity: true, createdAt: true, success: true,
  })

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored) setSavedQueries(JSON.parse(stored) as SavedQuery[])
      } catch {
        setSavedQueries([])
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const filtered = React.useMemo(() => {
    const needle = search.trim().toLowerCase()
    const result = AUDIT_ROWS.filter((row) => {
      const matchesSearch = !needle || [row.actor, row.action, row.resource, row.severity]
        .some((value) => value.toLowerCase().includes(needle))
      return matchesSearch && evaluateGroup(row, applied)
    })
    return [...result].sort((a, b) => {
      for (const sort of sorts) {
        const left = a[sort.field]
        const right = b[sort.field]
        const comparison = String(left).localeCompare(String(right))
        if (comparison !== 0) return sort.direction === "asc" ? comparison : -comparison
      }
      return 0
    })
  }, [applied, search, sorts])

  const setGroup = (groupId: string, updater: (group: QueryGroup) => QueryGroup) => {
    const visit = (group: QueryGroup): QueryGroup => group.id === groupId
      ? updater(group)
      : { ...group, children: group.children.map((child) => child.kind === "group" ? visit(child) : child) }
    setDraft(visit)
  }
  const resetQuery = () => {
    const next = createQuery()
    setDraft(next)
    setApplied({ kind: "group", id: "applied", join: "and", children: [] })
  }
  const saveQuery = () => {
    const next: SavedQuery = {
      id: id("saved"),
      name: `Saved query ${savedQueries.length + 1}`,
      query: cloneQuery(draft),
    }
    const updated = [...savedQueries, next]
    setSavedQueries(updated)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }
  const addSort = () => {
    if (sorts.length >= 2) return
    const field = FIELDS.find((item) => !sorts.some((sort) => sort.field === item)) ?? "createdAt"
    setSorts((current) => [...current, { field, direction: "asc" }])
  }

  const renderGroup = (group: QueryGroup, nested = false) => (
    <div key={group.id} className={cn("space-y-2", nested && "rounded-[12px] border border-border/70 bg-muted/30 p-3")}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{nested ? "Nested group" : "Match"}</span>
        <div className="inline-flex rounded-lg border border-border/70 bg-card p-0.5">
          {(["and", "or"] as Join[]).map((join) => (
            <button
              key={join}
              type="button"
              className={cn("h-7 cursor-pointer rounded-md px-2 text-xs font-medium uppercase", group.join === join ? "bg-foreground text-background" : "text-muted-foreground")}
              onClick={() => setGroup(group.id, (current) => ({ ...current, join }))}
            >
              {join}
            </button>
          ))}
        </div>
        {nested ? (
          <Button type="button" variant="ghost" size="sm" className="cursor-pointer text-muted-foreground sm:ms-auto" onClick={() => setDraft((current) => removeNode(current, group.id))}>
            Remove group
          </Button>
        ) : null}
      </div>
      {group.children.map((child) => child.kind === "group" ? renderGroup(child, true) : (
        <ConditionEditor
          key={child.id}
          condition={child}
          onChange={(patch) => setDraft((current) => updateCondition(current, child.id, patch))}
          onRemove={() => setDraft((current) => removeNode(current, child.id))}
        />
      ))}
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" className="cursor-pointer gap-2" onClick={() => setGroup(group.id, (current) => ({ ...current, children: [...current.children, createCondition()] }))}>
          <PlusIcon className="size-4" aria-hidden /> Add condition
        </Button>
        {!nested ? (
          <Button type="button" variant="outline" size="sm" className="cursor-pointer gap-2" onClick={() => setDraft((current) => ({ ...current, children: [...current.children, { kind: "group", id: id("group"), join: "and", children: [createCondition()] }] }))}>
            <PlusIcon className="size-4" aria-hidden /> Add group
          </Button>
        ) : null}
      </div>
    </div>
  )

  return (
    <div className={cn("w-full min-w-0", className)} {...props}>
      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="space-y-4 border-b border-border/70 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-start">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Audit log</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">Build, save, sort, and export precise audit queries.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" className="cursor-pointer gap-2" onClick={() => exportCsv(filtered)}>
                <DownloadIcon className="size-4" aria-hidden /> Export CSV
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button type="button" variant="outline" className="cursor-pointer gap-2"><Columns3Icon className="size-4" aria-hidden /> Columns</Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Visible columns</DropdownMenuLabel><DropdownMenuSeparator />
                  {COLUMNS.map((column) => (
                    <DropdownMenuCheckboxItem key={column.key} checked={visible[column.key]} className="cursor-pointer" onCheckedChange={(checked) => setVisible((current) => ({ ...current, [column.key]: checked === true }))}>
                      {column.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="relative max-w-md">
            <SearchIcon className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the audit log…" className="ps-9" aria-label="Search audit log" />
          </div>

          <div className="space-y-3 rounded-[12px] border border-border/70 bg-muted/20 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <FilterIcon className="size-4 text-muted-foreground" aria-hidden />
              <p className="text-sm font-medium">Structured query</p>
              <div className="flex flex-wrap gap-2 sm:ms-auto">
                <Select onValueChange={(savedId) => {
                  const saved = savedQueries.find((item) => item.id === savedId)
                  if (saved) setDraft(cloneQuery(saved.query))
                }}>
                  <SelectTrigger size="sm" className="w-44 cursor-pointer" aria-label="Load saved query"><SelectValue placeholder="Load saved query" /></SelectTrigger>
                  <SelectContent>
                    {savedQueries.length ? savedQueries.map((saved) => <SelectItem key={saved.id} value={saved.id}>{saved.name}</SelectItem>) : <SelectItem value="none" disabled>No saved queries</SelectItem>}
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" size="sm" className="cursor-pointer gap-2" onClick={saveQuery}><SaveIcon className="size-4" aria-hidden /> Save query</Button>
              </div>
            </div>
            {renderGroup(draft)}
            <div className="flex flex-wrap justify-end gap-2 border-t border-border/70 pt-3">
              <Button type="button" variant="ghost" size="sm" className="cursor-pointer" onClick={resetQuery}>Reset query</Button>
              <Button type="button" size="sm" className="cursor-pointer" onClick={() => setApplied(cloneQuery(draft))}>Apply query</Button>
            </div>
          </div>

          {allConditions(applied).length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Active query</span>
              {allConditions(applied).map((condition) => (
                <Badge key={condition.id} variant="secondary" className="h-7 gap-1 rounded-full pe-1 ps-2.5 font-normal">
                  {conditionSummary(condition)}
                  <button type="button" className="inline-flex size-5 cursor-pointer items-center justify-center rounded-full hover:bg-foreground/10" aria-label={`Remove ${conditionSummary(condition)}`} onClick={() => {
                    setApplied((current) => removeNode(current, condition.id))
                    setDraft((current) => removeNode(current, condition.id))
                  }}>
                    <XIcon className="size-3" aria-hidden />
                  </button>
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">Multi-sort</span>
              <Button type="button" variant="outline" size="sm" disabled={sorts.length >= 2} className="cursor-pointer disabled:cursor-not-allowed" onClick={addSort}>Add sort</Button>
              {sorts.length ? <Button type="button" variant="ghost" size="sm" className="cursor-pointer text-muted-foreground" onClick={() => setSorts([])}>Clear</Button> : null}
            </div>
            {sorts.map((sort, index) => (
              <div key={`${sort.field}-${index}`} className="flex flex-wrap gap-2">
                <Select value={sort.field} onValueChange={(value) => setSorts((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, field: value as Field } : item))}>
                  <SelectTrigger size="sm" className="w-40 cursor-pointer" aria-label={`Sort ${index + 1} field`}><SelectValue /></SelectTrigger>
                  <SelectContent>{FIELDS.map((field) => <SelectItem key={field} value={field} disabled={sorts.some((item, itemIndex) => itemIndex !== index && item.field === field)}>{FIELD_LABEL[field]}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={sort.direction} onValueChange={(value) => setSorts((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, direction: value as "asc" | "desc" } : item))}>
                  <SelectTrigger size="sm" className="w-32 cursor-pointer" aria-label={`Sort ${index + 1} direction`}><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="asc">Ascending</SelectItem><SelectItem value="desc">Descending</SelectItem></SelectContent>
                </Select>
                <Button type="button" variant="ghost" size="icon-sm" className="size-10 cursor-pointer" aria-label={`Remove sort ${index + 1}`} onClick={() => setSorts((current) => current.filter((_, itemIndex) => itemIndex !== index))}><XIcon className="size-4" aria-hidden /></Button>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {visible.actor ? <TableHead>Actor</TableHead> : null}
                {visible.action ? <TableHead>Action</TableHead> : null}
                {visible.resource ? <TableHead>Resource</TableHead> : null}
                {visible.severity ? <TableHead>Severity</TableHead> : null}
                {visible.createdAt ? <TableHead>Created at</TableHead> : null}
                {visible.success ? <TableHead>Result</TableHead> : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={Math.max(1, Object.values(visible).filter(Boolean).length)} className="h-32 text-center text-muted-foreground">No audit events match this query.</TableCell>
                </TableRow>
              ) : filtered.map((row) => (
                <TableRow key={row.id}>
                  {visible.actor ? <TableCell className="font-medium">{row.actor}</TableCell> : null}
                  {visible.action ? <TableCell>{row.action}</TableCell> : null}
                  {visible.resource ? <TableCell className="text-muted-foreground">{row.resource}</TableCell> : null}
                  {visible.severity ? <TableCell><Badge variant="outline" className={cn("rounded-full capitalize", row.severity === "critical" ? "border-transparent bg-rose-500/10 text-rose-700 dark:text-rose-400" : row.severity === "warn" ? "border-transparent bg-amber-500/10 text-amber-700 dark:text-amber-400" : "border-transparent bg-sky-500/10 text-sky-700 dark:text-sky-400")}>{row.severity}</Badge></TableCell> : null}
                  {visible.createdAt ? <TableCell dir="ltr" className="text-start tabular-nums text-muted-foreground">{new Date(row.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" })}</TableCell> : null}
                  {visible.success ? <TableCell><Badge variant="outline" className={cn("rounded-full", row.success ? "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "border-transparent bg-rose-500/10 text-rose-700 dark:text-rose-400")}>{row.success ? "Success" : "Failed"}</Badge></TableCell> : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="border-t border-border/70 px-4 py-3 text-sm text-muted-foreground sm:px-5">
          Showing {filtered.length} of {AUDIT_ROWS.length} events
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  CheckIcon,
  Columns3Icon,
  CopyIcon,
  EllipsisIcon,
  PencilIcon,
  PlusIcon,
  RotateCcwIcon,
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Input } from "@sonojs/ui/components/input"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

type ProjectStatus = "active" | "archived" | "done"
type Priority = "low" | "med" | "high"
type StatusFilter = ProjectStatus | "all"
type SortKey = "title" | "updatedAt"
type SortDirection = "asc" | "desc"
type ColumnKey = "status" | "priority" | "assignee" | "updatedAt"

type Project = {
  id: string
  title: string
  status: ProjectStatus
  priority: Priority
  assignee: string
  updatedAt: string
}

type ViewState = {
  query: string
  status: StatusFilter
  sort: {
    key: SortKey
    direction: SortDirection
  }
  visible: Record<ColumnKey, boolean>
}

type SavedView = ViewState & {
  id: string
  name: string
}

const STORAGE_KEY = "sonojs:table-toolbar:saved-views"

const PROJECTS: Project[] = [
  { id: "p1", title: "Analytics dashboard", status: "active", priority: "high", assignee: "Ava Chen", updatedAt: "2026-10-28" },
  { id: "p2", title: "Billing portal refresh", status: "active", priority: "med", assignee: "Ben Ortiz", updatedAt: "2026-10-26" },
  { id: "p3", title: "Brand asset migration", status: "archived", priority: "low", assignee: "Carla Moss", updatedAt: "2026-09-18" },
  { id: "p4", title: "Customer onboarding", status: "done", priority: "high", assignee: "Diego Park", updatedAt: "2026-10-21" },
]

const DEFAULT_VISIBLE: Record<ColumnKey, boolean> = {
  status: true,
  priority: true,
  assignee: true,
  updatedAt: true,
}

const DEFAULT_SORT: ViewState["sort"] = {
  key: "updatedAt",
  direction: "desc",
}

const DEFAULT_VIEWS: {
  id: string
  name: string
  status: StatusFilter
}[] = [
  { id: "all", name: "All", status: "all" },
  { id: "active", name: "Active", status: "active" },
  { id: "archived", name: "Archived", status: "archived" },
]

const COLUMNS: { key: ColumnKey; label: string }[] = [
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "assignee", label: "Assignee" },
  { key: "updatedAt", label: "Updated" },
]

const STATUS_META: Record<
  ProjectStatus,
  { label: string; className: string; dot: string }
> = {
  active: {
    label: "Active",
    className:
      "border-transparent bg-blue-500/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  archived: {
    label: "Archived",
    className: "border-transparent bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  done: {
    label: "Done",
    className:
      "border-transparent bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
}

const PRIORITY_META: Record<
  Priority,
  { label: string; className: string }
> = {
  low: {
    label: "Low",
    className: "border-border/70 bg-transparent text-muted-foreground",
  },
  med: {
    label: "Medium",
    className:
      "border-transparent bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  },
  high: {
    label: "High",
    className:
      "border-transparent bg-rose-500/10 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
  },
}

function copyVisible(visible: Record<ColumnKey, boolean>) {
  return { ...visible }
}

function isSavedView(value: unknown): value is SavedView {
  if (!value || typeof value !== "object") return false
  const view = value as Partial<SavedView>
  return (
    typeof view.id === "string" &&
    typeof view.name === "string" &&
    typeof view.query === "string" &&
    ["all", "active", "archived", "done"].includes(String(view.status)) &&
    !!view.sort &&
    ["title", "updatedAt"].includes(String(view.sort.key)) &&
    ["asc", "desc"].includes(String(view.sort.direction)) &&
    !!view.visible &&
    COLUMNS.every(({ key }) => typeof view.visible?.[key] === "boolean")
  )
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status]
  return (
    <Badge
      variant="outline"
      className={cn("h-6 gap-1.5 rounded-full px-2", meta.className)}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </Badge>
  )
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const meta = PRIORITY_META[priority]
  return (
    <Badge
      variant="outline"
      className={cn("h-6 rounded-full px-2 font-normal", meta.className)}
    >
      {meta.label}
    </Badge>
  )
}

function SortIcon({
  column,
  sort,
}: {
  column: SortKey
  sort: ViewState["sort"]
}) {
  if (sort.key !== column) {
    return <ArrowUpDownIcon className="size-3.5" aria-hidden />
  }
  return sort.direction === "asc" ? (
    <ArrowUpIcon className="size-3.5" aria-hidden />
  ) : (
    <ArrowDownIcon className="size-3.5" aria-hidden />
  )
}

export default function TableToolbar03({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<StatusFilter>("all")
  const [sort, setSort] = React.useState<ViewState["sort"]>(DEFAULT_SORT)
  const [visible, setVisible] =
    React.useState<Record<ColumnKey, boolean>>(DEFAULT_VISIBLE)
  const [savedViews, setSavedViews] = React.useState<SavedView[]>([])
  const [selectedViewId, setSelectedViewId] = React.useState("all")
  const [hydrated, setHydrated] = React.useState(false)
  const [createOpen, setCreateOpen] = React.useState(false)
  const [newViewName, setNewViewName] = React.useState("")

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed: unknown = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            setSavedViews(parsed.filter(isSavedView))
          }
        }
      } catch {
        setSavedViews([])
      } finally {
        setHydrated(true)
      }
    }, 0)
    return () => window.clearTimeout(timeout)
  }, [])

  React.useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedViews))
    } catch {
      // Storage can be unavailable in private or restricted browser contexts.
    }
  }, [hydrated, savedViews])

  const currentState = (): ViewState => ({
    query,
    status,
    sort: { ...sort },
    visible: copyVisible(visible),
  })

  const applyState = (state: ViewState) => {
    setQuery(state.query)
    setStatus(state.status)
    setSort({ ...state.sort })
    setVisible(copyVisible(state.visible))
  }

  const selectDefaultView = (id: string, nextStatus: StatusFilter) => {
    setSelectedViewId(id)
    applyState({
      query: "",
      status: nextStatus,
      sort: { ...DEFAULT_SORT },
      visible: copyVisible(DEFAULT_VISIBLE),
    })
  }

  const selectSavedView = (view: SavedView) => {
    setSelectedViewId(view.id)
    applyState(view)
  }

  const createView = () => {
    const name = newViewName.trim()
    if (!name) return
    const view: SavedView = {
      id: `view-${Date.now()}`,
      name,
      ...currentState(),
    }
    setSavedViews((current) => [...current, view])
    setSelectedViewId(view.id)
    setNewViewName("")
    setCreateOpen(false)
  }

  const saveCurrentView = () => {
    setSavedViews((current) =>
      current.map((view) =>
        view.id === selectedViewId
          ? { ...view, ...currentState(), id: view.id, name: view.name }
          : view
      )
    )
  }

  const renameView = (view: SavedView) => {
    const nextName = window.prompt("Rename view", view.name)?.trim()
    if (!nextName) return
    setSavedViews((current) =>
      current.map((item) =>
        item.id === view.id ? { ...item, name: nextName } : item
      )
    )
  }

  const duplicateView = (view: SavedView) => {
    const copy: SavedView = {
      ...view,
      id: `view-${Date.now()}`,
      name: `${view.name} copy`,
      sort: { ...view.sort },
      visible: copyVisible(view.visible),
    }
    setSavedViews((current) => [...current, copy])
    setSelectedViewId(copy.id)
    applyState(copy)
  }

  const deleteView = (view: SavedView) => {
    setSavedViews((current) =>
      current.filter((item) => item.id !== view.id)
    )
    if (selectedViewId === view.id) {
      selectDefaultView("all", "all")
    }
  }

  const selectedCustomView = savedViews.find(
    (view) => view.id === selectedViewId
  )

  const resetSelectedView = () => {
    const defaultView = DEFAULT_VIEWS.find(
      (view) => view.id === selectedViewId
    )
    if (defaultView) {
      selectDefaultView(defaultView.id, defaultView.status)
      return
    }
    if (selectedCustomView) {
      applyState(selectedCustomView)
    }
  }

  const clearFilters = () => {
    setQuery("")
    setStatus("all")
  }

  const toggleSort = (key: SortKey) => {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  const rows = PROJECTS.filter((project) => {
    if (status !== "all" && project.status !== status) return false
    const normalizedQuery = query.trim().toLowerCase()
    return (
      !normalizedQuery ||
      project.title.toLowerCase().includes(normalizedQuery) ||
      project.assignee.toLowerCase().includes(normalizedQuery)
    )
  }).sort((a, b) => {
    const comparison =
      sort.key === "title"
        ? a.title.localeCompare(b.title)
        : a.updatedAt.localeCompare(b.updatedAt)
    return sort.direction === "asc" ? comparison : -comparison
  })

  const visibleColumnCount =
    1 + Object.values(visible).filter(Boolean).length
  const hasFilters = query.trim() !== "" || status !== "all"

  return (
    <div className={cn("w-full min-w-0", className)} {...props}>
      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex flex-col gap-4 border-b border-border/70 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-start">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Projects
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Save reusable filters, sorting, and column layouts.
              </p>
            </div>

            <Popover open={createOpen} onOpenChange={setCreateOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer gap-2"
                >
                  <PlusIcon className="size-4" aria-hidden />
                  Create view
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72">
                <p className="text-sm font-medium">Create a custom view</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  The current filters, sort, and columns will be saved.
                </p>
                <Input
                  value={newViewName}
                  onChange={(event) => setNewViewName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") createView()
                  }}
                  placeholder="View name"
                  className="mt-3"
                  aria-label="View name"
                />
                <div className="mt-3 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => setCreateOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="cursor-pointer gap-2"
                    disabled={!newViewName.trim()}
                    onClick={createView}
                  >
                    <CheckIcon className="size-4" aria-hidden />
                    Create
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div
            role="tablist"
            aria-label="Project views"
            className="flex flex-wrap items-center gap-1.5"
          >
            {DEFAULT_VIEWS.map((view) => {
              const selected = selectedViewId === view.id
              return (
                <button
                  key={view.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={cn(
                    "inline-flex h-9 cursor-pointer items-center rounded-full border px-3 text-sm font-medium transition-colors",
                    selected
                      ? "border-transparent bg-foreground text-background"
                      : "border-border/70 bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                  onClick={() => selectDefaultView(view.id, view.status)}
                >
                  {view.name}
                </button>
              )
            })}
            {savedViews.map((view) => {
              const selected = selectedViewId === view.id
              return (
                <button
                  key={view.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={cn(
                    "inline-flex h-9 cursor-pointer items-center rounded-full border px-3 text-sm font-medium transition-colors",
                    selected
                      ? "border-transparent bg-foreground text-background"
                      : "border-border/70 bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                  onClick={() => selectSavedView(view)}
                >
                  {view.name}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-sm">
              <SearchIcon
                aria-hidden
                className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects or assignees…"
                className="ps-9"
                aria-label="Search projects"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as StatusFilter)}
              >
                <SelectTrigger
                  className="w-37.5 cursor-pointer"
                  aria-label="Filter status"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer gap-2"
                  >
                    <Columns3Icon className="size-4" aria-hidden />
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {COLUMNS.map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.key}
                      className="cursor-pointer"
                      checked={visible[column.key]}
                      onCheckedChange={(checked) =>
                        setVisible((current) => ({
                          ...current,
                          [column.key]: checked === true,
                        }))
                      }
                    >
                      {column.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {selectedCustomView ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer gap-2"
                    onClick={saveCurrentView}
                  >
                    <SaveIcon className="size-4" aria-hidden />
                    Save view
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="cursor-pointer"
                        aria-label={`Actions for ${selectedCustomView.name}`}
                      >
                        <EllipsisIcon className="size-4" aria-hidden />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem
                        className="cursor-pointer gap-2"
                        onSelect={() => renameView(selectedCustomView)}
                      >
                        <PencilIcon className="size-4" aria-hidden />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer gap-2"
                        onSelect={() => duplicateView(selectedCustomView)}
                      >
                        <CopyIcon className="size-4" aria-hidden />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                        onSelect={() => deleteView(selectedCustomView)}
                      >
                        <Trash2Icon className="size-4" aria-hidden />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : null}

              {hasFilters ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="cursor-pointer gap-2 text-muted-foreground"
                  onClick={clearFilters}
                >
                  <XIcon className="size-4" aria-hidden />
                  Clear
                </Button>
              ) : null}
              <Button
                type="button"
                variant="ghost"
                className="cursor-pointer gap-2 text-muted-foreground"
                onClick={resetSelectedView}
              >
                <RotateCcwIcon className="size-4" aria-hidden />
                Reset
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-180">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-1.5 font-medium hover:text-foreground"
                    onClick={() => toggleSort("title")}
                  >
                    Project
                    <SortIcon column="title" sort={sort} />
                  </button>
                </TableHead>
                {visible.status ? <TableHead>Status</TableHead> : null}
                {visible.priority ? <TableHead>Priority</TableHead> : null}
                {visible.assignee ? <TableHead>Assignee</TableHead> : null}
                {visible.updatedAt ? (
                  <TableHead className="text-end">
                    <button
                      type="button"
                      className="inline-flex cursor-pointer items-center gap-1.5 font-medium hover:text-foreground"
                      onClick={() => toggleSort("updatedAt")}
                    >
                      Updated
                      <SortIcon column="updatedAt" sort={sort} />
                    </button>
                  </TableHead>
                ) : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={visibleColumnCount}
                    className="h-28 text-center text-muted-foreground"
                  >
                    No projects match this view.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium text-foreground">
                      {project.title}
                    </TableCell>
                    {visible.status ? (
                      <TableCell>
                        <StatusBadge status={project.status} />
                      </TableCell>
                    ) : null}
                    {visible.priority ? (
                      <TableCell>
                        <PriorityBadge priority={project.priority} />
                      </TableCell>
                    ) : null}
                    {visible.assignee ? (
                      <TableCell className="text-muted-foreground">
                        {project.assignee}
                      </TableCell>
                    ) : null}
                    {visible.updatedAt ? (
                      <TableCell className="text-end">
                        <span
                          dir="ltr"
                          className="tabular-nums text-muted-foreground"
                        >
                          {project.updatedAt}
                        </span>
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="border-t border-border/70 px-4 py-3 text-sm text-muted-foreground sm:px-5">
          Showing {rows.length} of {PROJECTS.length} projects
        </div>
      </div>
    </div>
  )
}

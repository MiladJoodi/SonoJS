"use client"

import * as React from "react"
import {
  Columns3Icon,
  PlusIcon,
  SearchIcon,
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

type Status = "active" | "invited" | "suspended"
type Role = "admin" | "editor" | "viewer"

type User = {
  id: string
  name: string
  email: string
  role: Role
  status: Status
  lastActive: string
}

const USERS: User[] = [
  { id: "u1", name: "Ava Chen", email: "ava@northwind.dev", role: "admin", status: "active", lastActive: "Mar 28, 2026" },
  { id: "u2", name: "Ben Ortiz", email: "ben@northwind.dev", role: "editor", status: "active", lastActive: "Mar 27, 2026" },
  { id: "u3", name: "Carla Moss", email: "carla@acme.co", role: "viewer", status: "invited", lastActive: "—" },
  { id: "u4", name: "Elena Voss", email: "elena@harbor.health", role: "admin", status: "suspended", lastActive: "Mar 10, 2026" },
]

const STATUS_META: Record<Status, { label: string; className: string; dot: string }> = {
  active: {
    label: "Active",
    className: "border-transparent bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  invited: {
    label: "Invited",
    className: "border-transparent bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  suspended: {
    label: "Suspended",
    className: "border-transparent bg-rose-500/10 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
    dot: "bg-rose-500",
  },
}

const ROLE_LABEL: Record<Role, string> = {
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
}

type ColKey = "name" | "role" | "status" | "lastActive"

const COLUMNS: { key: ColKey; label: string }[] = [
  { key: "name", label: "User" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "lastActive", label: "Last active" },
]

function StatusBadge({ status }: { status: Status }) {
  const m = STATUS_META[status]
  return (
    <Badge variant="outline" className={cn("h-6 gap-1.5 rounded-full px-2", m.className)}>
      <span aria-hidden className={cn("size-1.5 rounded-full", m.dot)} />
      {m.label}
    </Badge>
  )
}

export default function TableToolbar01({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<Status | "all">("all")
  const [role, setRole] = React.useState<Role | "all">("all")
  const [visible, setVisible] = React.useState<Record<ColKey, boolean>>({
    name: true,
    role: true,
    status: true,
    lastActive: true,
  })
  const [rows, setRows] = React.useState(USERS)
  const [addedNote, setAddedNote] = React.useState<string | null>(null)

  const filtered = rows.filter((u) => {
    if (status !== "all" && u.status !== status) return false
    if (role !== "all" && u.role !== role) return false
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  })

  const activeChips: { id: string; label: string; clear: () => void }[] = []
  if (status !== "all") {
    activeChips.push({
      id: "status",
      label: `Status: ${STATUS_META[status].label}`,
      clear: () => setStatus("all"),
    })
  }
  if (role !== "all") {
    activeChips.push({
      id: "role",
      label: `Role: ${ROLE_LABEL[role]}`,
      clear: () => setRole("all"),
    })
  }
  if (query.trim()) {
    activeChips.push({
      id: "q",
      label: `Search: ${query.trim()}`,
      clear: () => setQuery(""),
    })
  }

  const clearAll = () => {
    setQuery("")
    setStatus("all")
    setRole("all")
  }

  const addUser = () => {
    const id = `u${rows.length + 1}`
    const next: User = {
      id,
      name: "New teammate",
      email: `new${rows.length + 1}@northwind.dev`,
      role: "viewer",
      status: "invited",
      lastActive: "—",
    }
    setRows((prev) => [next, ...prev])
    setAddedNote(`Invited ${next.email}`)
    window.setTimeout(() => setAddedNote(null), 2400)
  }

  return (
    <div className={cn("w-full min-w-0", className)} {...props}>
      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex flex-col gap-4 border-b border-border/70 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-start">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Team members
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Search, filter by status or role, and manage columns.
              </p>
            </div>
            <Button type="button" className="h-[46px] cursor-pointer gap-2" onClick={addUser}>
              <PlusIcon className="size-4" aria-hidden />
              Add member
            </Button>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative w-full max-w-sm">
              <SearchIcon
                aria-hidden
                className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or email…"
                className="ps-9"
                aria-label="Search team members"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as Status | "all")}
              >
                <SelectTrigger className="w-[140px] cursor-pointer" aria-label="Filter status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="invited">Invited</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={role} onValueChange={(v) => setRole(v as Role | "all")}>
                <SelectTrigger className="w-[140px] cursor-pointer" aria-label="Filter role">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button" variant="outline" className="cursor-pointer gap-2">
                    <Columns3Icon className="size-4" aria-hidden />
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {COLUMNS.map((col) => (
                    <DropdownMenuCheckboxItem
                      key={col.key}
                      className="cursor-pointer"
                      checked={visible[col.key]}
                      onCheckedChange={(checked) =>
                        setVisible((prev) => ({ ...prev, [col.key]: checked === true }))
                      }
                      disabled={col.key === "name"}
                    >
                      {col.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {activeChips.length > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="cursor-pointer text-muted-foreground"
                  onClick={clearAll}
                >
                  Clear filters
                </Button>
              ) : null}
            </div>
          </div>

          {activeChips.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {activeChips.map((chip) => (
                <Badge
                  key={chip.id}
                  variant="secondary"
                  className="h-7 gap-1 rounded-full pe-1 ps-2.5 font-normal"
                >
                  {chip.label}
                  <button
                    type="button"
                    className="inline-flex size-5 cursor-pointer items-center justify-center rounded-full hover:bg-foreground/10"
                    aria-label={`Remove ${chip.label}`}
                    onClick={chip.clear}
                  >
                    <XIcon className="size-3" aria-hidden />
                  </button>
                </Badge>
              ))}
            </div>
          ) : null}

          {addedNote ? (
            <p className="text-sm text-emerald-700 dark:text-emerald-400" role="status">
              {addedNote}
            </p>
          ) : null}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {visible.name ? <TableHead>User</TableHead> : null}
                {visible.role ? <TableHead>Role</TableHead> : null}
                {visible.status ? <TableHead>Status</TableHead> : null}
                {visible.lastActive ? (
                  <TableHead className="text-end">Last active</TableHead>
                ) : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={Object.values(visible).filter(Boolean).length || 1}
                    className="h-28 text-center text-muted-foreground"
                  >
                    No members match these filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((u) => (
                  <TableRow key={u.id}>
                    {visible.name ? (
                      <TableCell>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground">{u.name}</p>
                          <p dir="ltr" className="truncate text-xs text-muted-foreground text-start">
                            {u.email}
                          </p>
                        </div>
                      </TableCell>
                    ) : null}
                    {visible.role ? (
                      <TableCell className="text-muted-foreground">
                        {ROLE_LABEL[u.role]}
                      </TableCell>
                    ) : null}
                    {visible.status ? (
                      <TableCell>
                        <StatusBadge status={u.status} />
                      </TableCell>
                    ) : null}
                    {visible.lastActive ? (
                      <TableCell
                        dir="ltr"
                        className="text-end tabular-nums text-muted-foreground"
                      >
                        {u.lastActive}
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="border-t border-border/70 px-4 py-3 text-sm text-muted-foreground sm:px-5">
          Showing {filtered.length} of {rows.length} members
        </div>
      </div>
    </div>
  )
}

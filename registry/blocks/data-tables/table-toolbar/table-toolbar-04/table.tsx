"use client"

import * as React from "react"
import {
  ArchiveIcon,
  DownloadIcon,
  SearchIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@sonojs/ui/components/alert-dialog"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

type Status = "active" | "pending" | "archived"
type Team = "Platform" | "Design" | "Growth" | "Support"
type Member = {
  id: string
  name: string
  email: string
  status: Status
  team: Team
}

const MEMBERS: Member[] = [
  { id: "m01", name: "Ava Chen", email: "ava@northwind.dev", status: "active", team: "Platform" },
  { id: "m02", name: "Ben Ortiz", email: "ben@northwind.dev", status: "active", team: "Growth" },
  { id: "m03", name: "Carla Moss", email: "carla@acme.co", status: "pending", team: "Design" },
  { id: "m04", name: "Elena Voss", email: "elena@harbor.health", status: "archived", team: "Support" },
]

const STATUSES: Status[] = ["active", "pending", "archived"]
const TEAMS: Team[] = ["Platform", "Design", "Growth", "Support"]
const STATUS_STYLE: Record<Status, string> = {
  active: "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  pending: "border-transparent bg-amber-500/10 text-amber-700 dark:text-amber-400",
  archived: "border-transparent bg-muted text-muted-foreground",
}

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`
}

function downloadCsv(rows: Member[]) {
  const csv = [
    ["ID", "Name", "Email", "Status", "Team"].map(csvCell).join(","),
    ...rows.map((row) =>
      [row.id, row.name, row.email, row.status, row.team].map(csvCell).join(",")
    ),
  ].join("\n")
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = "selected-team-access.csv"
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function TableToolbar04({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [rows, setRows] = React.useState(MEMBERS)
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<Status | "all">("all")
  const [selected, setSelected] = React.useState<Set<string>>(new Set())

  const visibleRows = rows.filter((row) => {
    if (status !== "all" && row.status !== status) return false
    const needle = query.trim().toLowerCase()
    return (
      !needle ||
      row.name.toLowerCase().includes(needle) ||
      row.email.toLowerCase().includes(needle) ||
      row.team.toLowerCase().includes(needle)
    )
  })
  const selectedRows = rows.filter((row) => selected.has(row.id))
  const allVisibleSelected =
    visibleRows.length > 0 && visibleRows.every((row) => selected.has(row.id))
  const someVisibleSelected = visibleRows.some((row) => selected.has(row.id))

  const toggleAll = (checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current)
      visibleRows.forEach((row) => {
        if (checked) next.add(row.id)
        else next.delete(row.id)
      })
      return next
    })
  }
  const toggleOne = (id: string, checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }
  const updateSelected = (patch: Partial<Pick<Member, "status" | "team">>) => {
    setRows((current) =>
      current.map((row) => selected.has(row.id) ? { ...row, ...patch } : row)
    )
  }
  const deleteSelected = () => {
    setRows((current) => current.filter((row) => !selected.has(row.id)))
    setSelected(new Set())
  }

  return (
    <div className={cn("w-full min-w-0", className)} {...props}>
      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="border-b border-border/70 p-4 sm:p-5">
          <div className="mb-4 text-start">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Team access
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Select teammates to update access in bulk.
            </p>
          </div>

          {selected.size === 0 ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full max-w-sm">
                <SearchIcon className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search name, email, or team…"
                  className="ps-9"
                  aria-label="Search team access"
                />
              </div>
              <Select value={status} onValueChange={(value) => setStatus(value as Status | "all")}>
                <SelectTrigger className="w-full cursor-pointer sm:w-40" aria-label="Filter by status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {STATUSES.map((item) => (
                    <SelectItem key={item} value={item} className="capitalize">{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="sm:ms-auto text-sm text-muted-foreground">
                {visibleRows.length} of {rows.length} members
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2 rounded-[12px] border border-primary/20 bg-primary/5 p-2">
              <p className="px-2 text-sm font-medium tabular-nums">
                {selected.size} selected
              </p>
              <Button type="button" variant="ghost" size="sm" className="cursor-pointer" onClick={() => setSelected(new Set())}>
                Deselect
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button" variant="outline" size="sm" className="cursor-pointer">Change status</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Set status</DropdownMenuLabel>
                  {STATUSES.map((item) => (
                    <DropdownMenuItem key={item} className="cursor-pointer capitalize" onSelect={() => updateSelected({ status: item })}>
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button" variant="outline" size="sm" className="cursor-pointer gap-2">
                    <UsersIcon className="size-4" aria-hidden /> Assign team
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Assign selected to</DropdownMenuLabel>
                  {TEAMS.map((team) => (
                    <DropdownMenuItem key={team} className="cursor-pointer" onSelect={() => updateSelected({ team })}>
                      {team}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button type="button" variant="outline" size="sm" className="cursor-pointer gap-2" onClick={() => downloadCsv(selectedRows)}>
                <DownloadIcon className="size-4" aria-hidden /> Export selected
              </Button>
              <Button type="button" variant="outline" size="sm" className="cursor-pointer gap-2" onClick={() => updateSelected({ status: "archived" })}>
                <ArchiveIcon className="size-4" aria-hidden /> Archive
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="destructive" size="sm" className="cursor-pointer gap-2 sm:ms-auto">
                    <Trash2Icon className="size-4" aria-hidden /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete selected members?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This permanently removes {selected.size} member{selected.size === 1 ? "" : "s"} from team access.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" className="cursor-pointer" onClick={deleteSelected}>
                      Delete members
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12 pe-0">
                  <Checkbox
                    checked={allVisibleSelected ? true : someVisibleSelected ? "indeterminate" : false}
                    onCheckedChange={(value) => toggleAll(value === true)}
                    className="cursor-pointer"
                    aria-label="Select all visible members"
                  />
                </TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Team</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRows.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    No team members match these filters.
                  </TableCell>
                </TableRow>
              ) : visibleRows.map((row) => (
                <TableRow key={row.id} data-state={selected.has(row.id) ? "selected" : undefined}>
                  <TableCell className="pe-0">
                    <Checkbox
                      checked={selected.has(row.id)}
                      onCheckedChange={(value) => toggleOne(row.id, value === true)}
                      className="cursor-pointer"
                      aria-label={`Select ${row.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">{row.name}</p>
                    <p dir="ltr" className="text-start text-xs text-muted-foreground">{row.email}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("rounded-full capitalize", STATUS_STYLE[row.status])}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.team}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

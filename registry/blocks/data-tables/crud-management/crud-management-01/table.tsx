"use client"

import * as React from "react"
import {
  ActivityIcon,
  CheckCircle2Icon,
  DownloadIcon,
  EllipsisIcon,
  MailIcon,
  PencilIcon,
  PlusIcon,
  RotateCcwIcon,
  SearchIcon,
  ShieldAlertIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@sonojs/ui/components/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@sonojs/ui/components/alert-dialog"
import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sonojs/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Field, FieldError } from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@sonojs/ui/components/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@sonojs/ui/components/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

type Role = "owner" | "admin" | "manager" | "member" | "viewer"
type Status = "active" | "invited" | "suspended"
type Activity = { id: string; label: string; at: string }
type User = {
  id: string
  name: string
  email: string
  role: Role
  team: string
  status: Status
  avatarInitials: string
  lastActive: string
  createdAt: string
  notes?: string
  activity: Activity[]
}
type FormValues = Pick<User, "name" | "email" | "role" | "team" | "notes">
type FormErrors = Partial<Record<keyof FormValues, string>>
type Notice = { tone: "success" | "error"; text: string }
type PendingAction = { kind: "delete" | "suspend"; ids: string[] } | null
type DeletedSnapshot = { entries: { user: User; index: number }[] }

const ROLES: Role[] = ["owner", "admin", "manager", "member", "viewer"]
const STATUSES: Status[] = ["active", "invited", "suspended"]
const ROLE_DESCRIPTION: Record<Role, string> = {
  owner: "Full workspace control, billing, and ownership.",
  admin: "Manage users, teams, settings, and integrations.",
  manager: "Manage team members and shared projects.",
  member: "Create, edit, and collaborate on assigned work.",
  viewer: "Read-only access to shared workspace content.",
}
const STATUS_STYLE: Record<Status, string> = {
  active: "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  invited: "border-transparent bg-amber-500/10 text-amber-700 dark:text-amber-400",
  suspended: "border-transparent bg-destructive/10 text-destructive",
}
const ROLE_STYLE: Record<Role, string> = {
  owner: "border-transparent bg-violet-500/10 text-violet-700 dark:text-violet-400",
  admin: "border-transparent bg-blue-500/10 text-blue-700 dark:text-blue-400",
  manager: "border-transparent bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
  member: "border-border bg-card text-foreground",
  viewer: "border-transparent bg-muted text-muted-foreground",
}
const EMPTY_FORM: FormValues = {
  name: "",
  email: "",
  role: "member",
  team: "",
  notes: "",
}
const PAGE_SIZE = 5

const SEED_USERS: User[] = [
  {
    id: "USR-1048", name: "Maya Chen", email: "maya@northstar.io", role: "owner",
    team: "Leadership", status: "active", avatarInitials: "MC", lastActive: "2026-10-30T13:42:00Z",
    createdAt: "2025-02-14", notes: "Workspace founder and billing contact.",
    activity: [{ id: "a1", label: "Updated workspace security settings", at: "2026-10-29T16:20:00Z" }],
  },
  {
    id: "USR-1047", name: "Noah Williams", email: "noah@northstar.io", role: "admin",
    team: "Operations", status: "active", avatarInitials: "NW", lastActive: "2026-10-30T12:15:00Z",
    createdAt: "2025-04-03", activity: [{ id: "a2", label: "Invited two new members", at: "2026-10-28T09:10:00Z" }],
  },
  {
    id: "USR-1046", name: "Aisha Rahman", email: "aisha@northstar.io", role: "manager",
    team: "Product", status: "active", avatarInitials: "AR", lastActive: "2026-10-30T10:06:00Z",
    createdAt: "2025-06-18", notes: "Leads the product organization.",
    activity: [{ id: "a3", label: "Changed project access", at: "2026-10-27T14:45:00Z" }],
  },
  {
    id: "USR-1045", name: "Leo Martins", email: "leo@northstar.io", role: "member",
    team: "Engineering", status: "active", avatarInitials: "LM", lastActive: "2026-10-29T22:31:00Z",
    createdAt: "2025-09-09", activity: [{ id: "a4", label: "Joined Engineering", at: "2025-09-09T08:00:00Z" }],
  },
  {
    id: "USR-1044", name: "Sofia Petrova", email: "sofia@northstar.io", role: "viewer",
    team: "Finance", status: "invited", avatarInitials: "SP", lastActive: "",
    createdAt: "2026-10-26", notes: "Quarterly reporting access.",
    activity: [{ id: "a5", label: "Invitation created", at: "2026-10-26T11:32:00Z" }],
  },
  {
    id: "USR-1043", name: "Ethan Brooks", email: "ethan@northstar.io", role: "member",
    team: "Support", status: "suspended", avatarInitials: "EB", lastActive: "2026-10-12T07:55:00Z",
    createdAt: "2025-11-21", activity: [{ id: "a6", label: "Access suspended", at: "2026-10-14T15:00:00Z" }],
  },
  {
    id: "USR-1042", name: "Priya Nair", email: "priya@northstar.io", role: "manager",
    team: "Marketing", status: "active", avatarInitials: "PN", lastActive: "2026-10-30T08:19:00Z",
    createdAt: "2026-01-12", activity: [{ id: "a7", label: "Created campaign workspace", at: "2026-10-25T10:40:00Z" }],
  },
  {
    id: "USR-1041", name: "Jon Bell", email: "jon@northstar.io", role: "member",
    team: "Design", status: "invited", avatarInitials: "JB", lastActive: "",
    createdAt: "2026-10-29", activity: [{ id: "a8", label: "Invitation created", at: "2026-10-29T17:05:00Z" }],
  },
]

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function formatDate(value: string, withTime = false) {
  if (!value) return "Never"
  return new Intl.DateTimeFormat("en", withTime
    ? { dateStyle: "medium", timeStyle: "short" }
    : { dateStyle: "medium" }
  ).format(new Date(value))
}

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("")
}

function downloadCsv(filename: string, rows: Record<string, string>[]) {
  const headers = Object.keys(rows[0] ?? {})
  const esc = (value: string) => `"${value.replace(/"/g, '""')}"`
  const body = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => esc(row[header] ?? "")).join(",")),
  ].join("\n")
  const blob = new Blob([body], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

function csvRows(users: User[]): Record<string, string>[] {
  return users.map((user) => ({
    ID: user.id, Name: user.name, Email: user.email, Role: user.role,
    Team: user.team, Status: user.status, "Last active": user.lastActive,
    Created: user.createdAt, Notes: user.notes ?? "",
  }))
}

function validateForm(values: FormValues, users: User[], editingId?: string) {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = "Name is required."
  if (!values.email.trim()) errors.email = "Email is required."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address."
  else if (users.some((user) => user.id !== editingId && user.email.toLowerCase() === values.email.trim().toLowerCase())) {
    errors.email = "A user with this email already exists."
  }
  if (!values.team.trim()) errors.team = "Team is required."
  return errors
}

function UserFields({
  values,
  errors,
  onChange,
}: {
  values: FormValues
  errors: FormErrors
  onChange: (patch: Partial<FormValues>) => void
}) {
  return (
    <div className="grid gap-4">
      <Field data-invalid={Boolean(errors.name)}>
        <Label htmlFor="user-name">Name</Label>
        <Input id="user-name" value={values.name} onChange={(event) => onChange({ name: event.target.value })} aria-invalid={Boolean(errors.name)} />
        <FieldError>{errors.name}</FieldError>
      </Field>
      <Field data-invalid={Boolean(errors.email)}>
        <Label htmlFor="user-email">Email</Label>
        <Input id="user-email" type="email" value={values.email} onChange={(event) => onChange({ email: event.target.value })} aria-invalid={Boolean(errors.email)} />
        <FieldError>{errors.email}</FieldError>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <Label htmlFor="user-role">Role</Label>
          <Select value={values.role} onValueChange={(value) => onChange({ role: value as Role })}>
            <SelectTrigger id="user-role" className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>{ROLES.map((role) => <SelectItem key={role} value={role}>{titleCase(role)}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field data-invalid={Boolean(errors.team)}>
          <Label htmlFor="user-team">Team</Label>
          <Input id="user-team" value={values.team} onChange={(event) => onChange({ team: event.target.value })} aria-invalid={Boolean(errors.team)} />
          <FieldError>{errors.team}</FieldError>
        </Field>
      </div>
      <Field>
        <Label htmlFor="user-notes">Notes</Label>
        <Textarea id="user-notes" value={values.notes ?? ""} onChange={(event) => onChange({ notes: event.target.value })} placeholder="Optional context for administrators" />
      </Field>
    </div>
  )
}

export default function CrudManagement01({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [users, setUsers] = React.useState<User[]>(SEED_USERS)
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<Status | "all">("all")
  const [role, setRole] = React.useState<Role | "all">("all")
  const [dateFrom, setDateFrom] = React.useState("")
  const [dateTo, setDateTo] = React.useState("")
  const [sort, setSort] = React.useState("newest")
  const [page, setPage] = React.useState(1)
  const [notice, setNotice] = React.useState<Notice | null>(null)
  const [detailId, setDetailId] = React.useState<string | null>(null)
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const [inviteForm, setInviteForm] = React.useState<FormValues>(EMPTY_FORM)
  const [inviteErrors, setInviteErrors] = React.useState<FormErrors>({})
  const [submitting, setSubmitting] = React.useState(false)
  const [editId, setEditId] = React.useState<string | null>(null)
  const [editForm, setEditForm] = React.useState<FormValues>(EMPTY_FORM)
  const [editErrors, setEditErrors] = React.useState<FormErrors>({})
  const [roleId, setRoleId] = React.useState<string | null>(null)
  const [nextRole, setNextRole] = React.useState<Role>("member")
  const [bulkRole, setBulkRole] = React.useState<Role>("member")
  const [pendingAction, setPendingAction] = React.useState<PendingAction>(null)
  const [deleted, setDeleted] = React.useState<DeletedSnapshot | null>(null)
  const undoTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => () => {
    if (undoTimer.current) clearTimeout(undoTimer.current)
  }, [])

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    return users
      .filter((user) =>
        (!needle || [user.name, user.email, user.id].some((value) => value.toLowerCase().includes(needle))) &&
        (status === "all" || user.status === status) &&
        (role === "all" || user.role === role) &&
        (!dateFrom || user.createdAt >= dateFrom) &&
        (!dateTo || user.createdAt <= dateTo)
      )
      .sort((a, b) => {
        if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt)
        if (sort === "name") return a.name.localeCompare(b.name)
        if (sort === "last-active") return b.lastActive.localeCompare(a.lastActive)
        return b.createdAt.localeCompare(a.createdAt)
      })
  }, [users, query, status, role, dateFrom, dateTo, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const selectedUsers = users.filter((user) => selected.has(user.id))
  const detailUser = users.find((user) => user.id === detailId) ?? null
  const roleUser = users.find((user) => user.id === roleId) ?? null
  const allPageSelected = paged.length > 0 && paged.every((user) => selected.has(user.id))
  const somePageSelected = paged.some((user) => selected.has(user.id))
  const hasFilters = Boolean(query || status !== "all" || role !== "all" || dateFrom || dateTo)

  const resetFilters = () => {
    setQuery(""); setStatus("all"); setRole("all"); setDateFrom(""); setDateTo(""); setPage(1)
  }
  const updateSelection = (ids: string[], checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current)
      ids.forEach((id) => checked ? next.add(id) : next.delete(id))
      return next
    })
  }
  const wouldRemoveLastOwner = (ids: string[]) => {
    const owners = users.filter((user) => user.role === "owner")
    return owners.length > 0 && owners.every((owner) => ids.includes(owner.id))
  }
  const updateUsers = (ids: string[], patch: Partial<Pick<User, "role" | "status">>, label: string) => {
    setUsers((current) => current.map((user) => ids.includes(user.id)
      ? { ...user, ...patch, activity: [{ id: crypto.randomUUID(), label, at: new Date().toISOString() }, ...user.activity] }
      : user
    ))
  }
  const requestSuspend = (ids: string[]) => {
    if (wouldRemoveLastOwner(ids)) {
      setNotice({ tone: "error", text: "The last remaining Owner cannot be suspended." })
      return
    }
    setPendingAction({ kind: "suspend", ids })
  }
  const requestDelete = (ids: string[]) => {
    if (wouldRemoveLastOwner(ids)) {
      setNotice({ tone: "error", text: "The last remaining Owner cannot be deleted." })
      return
    }
    setPendingAction({ kind: "delete", ids })
  }
  const confirmPending = () => {
    if (!pendingAction) return
    if (pendingAction.kind === "suspend") {
      updateUsers(pendingAction.ids, { status: "suspended" }, "Access suspended")
      setNotice({ tone: "success", text: `${pendingAction.ids.length} user${pendingAction.ids.length === 1 ? "" : "s"} suspended.` })
    } else {
      const entries = users.flatMap((user, index) => pendingAction.ids.includes(user.id) ? [{ user, index }] : [])
      setUsers((current) => current.filter((user) => !pendingAction.ids.includes(user.id)))
      setSelected((current) => new Set([...current].filter((id) => !pendingAction.ids.includes(id))))
      if (pendingAction.ids.includes(detailId ?? "")) setDetailId(null)
      setDeleted({ entries })
      setNotice({ tone: "success", text: `${entries.length} user${entries.length === 1 ? "" : "s"} deleted. Undo is available for 8 seconds.` })
      if (undoTimer.current) clearTimeout(undoTimer.current)
      undoTimer.current = setTimeout(() => setDeleted(null), 8000)
    }
    setPendingAction(null)
  }
  const undoDelete = () => {
    if (!deleted) return
    setUsers((current) => {
      const restored = [...current]
      deleted.entries.sort((a, b) => a.index - b.index).forEach(({ user, index }) => restored.splice(Math.min(index, restored.length), 0, user))
      return restored
    })
    if (undoTimer.current) clearTimeout(undoTimer.current)
    undoTimer.current = null
    setDeleted(null)
    setNotice({ tone: "success", text: "Deleted users restored." })
  }
  const submitInvite = async (event: React.FormEvent) => {
    event.preventDefault()
    const errors = validateForm(inviteForm, users)
    setInviteErrors(errors)
    if (Object.keys(errors).length) return
    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 650))
    const now = new Date().toISOString()
    const user: User = {
      ...inviteForm, id: `USR-${Date.now().toString().slice(-6)}`, email: inviteForm.email.trim().toLowerCase(),
      name: inviteForm.name.trim(), team: inviteForm.team.trim(), notes: inviteForm.notes?.trim(),
      status: "invited", avatarInitials: initials(inviteForm.name), lastActive: "", createdAt: now.slice(0, 10),
      activity: [{ id: crypto.randomUUID(), label: "Invitation created", at: now }],
    }
    setUsers((current) => [user, ...current])
    setInviteForm(EMPTY_FORM); setSubmitting(false); setInviteOpen(false)
    setNotice({ tone: "success", text: `${user.name} was added with invitation pending.` })
  }
  const openEdit = (user: User) => {
    setEditId(user.id)
    setEditForm({ name: user.name, email: user.email, role: user.role, team: user.team, notes: user.notes ?? "" })
    setEditErrors({})
  }
  const submitEdit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!editId) return
    const errors = validateForm(editForm, users, editId)
    setEditErrors(errors)
    if (Object.keys(errors).length) return
    setUsers((current) => current.map((user) => user.id === editId ? {
      ...user, ...editForm, name: editForm.name.trim(), email: editForm.email.trim().toLowerCase(),
      team: editForm.team.trim(), notes: editForm.notes?.trim(), avatarInitials: initials(editForm.name),
      activity: [{ id: crypto.randomUUID(), label: "Profile updated", at: new Date().toISOString() }, ...user.activity],
    } : user))
    setEditId(null)
    setNotice({ tone: "success", text: "User profile updated." })
  }
  const changeRole = () => {
    if (!roleId) return
    setUsers((current) => current.map((user) => user.id === roleId ? {
      ...user, role: nextRole,
      activity: [{ id: crypto.randomUUID(), label: `Role changed to ${titleCase(nextRole)}`, at: new Date().toISOString() }, ...user.activity],
    } : user))
    setRoleId(null)
    setNotice({ tone: "success", text: `Role changed to ${titleCase(nextRole)}.` })
  }

  return (
    <div className={cn("w-full min-w-0 space-y-5", className)} {...props}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-start">
          <h2 className="text-2xl font-semibold tracking-tight">Users</h2>
          <p className="mt-1 text-sm text-muted-foreground">Invite, update, suspend, and delete users.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => { setInviteErrors({}); setInviteOpen(true) }}><PlusIcon />Invite User</Button>
          <Button variant="outline" onClick={() => downloadCsv("users.csv", csvRows(users))}><DownloadIcon />Export Users</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline" size="icon" aria-label="More user actions"><EllipsisIcon /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>More</DropdownMenuLabel>
              <DropdownMenuItem onSelect={resetFilters}>Clear all filters</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setNotice({ tone: "success", text: "User list refreshed from local data." })}>Refresh list</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {notice && (
        <Alert variant={notice.tone === "error" ? "destructive" : "default"}>
          {notice.tone === "error" ? <ShieldAlertIcon /> : <CheckCircle2Icon className="text-emerald-600" />}
          <AlertTitle>{notice.tone === "error" ? "Action unavailable" : "Update complete"}</AlertTitle>
          <AlertDescription>{notice.text}</AlertDescription>
          <AlertAction className="flex gap-1">
            {deleted && <Button size="xs" variant="outline" onClick={undoDelete}><RotateCcwIcon />Undo</Button>}
            <Button size="icon-xs" variant="ghost" onClick={() => setNotice(null)} aria-label="Dismiss message"><XIcon /></Button>
          </AlertAction>
        </Alert>
      )}

      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="space-y-3 border-b border-border/70 p-4">
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-[minmax(240px,1fr)_160px_160px_155px_155px_170px_auto]">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="ps-9" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search name, email, or ID" aria-label="Search users" />
            </div>
            <Select value={status} onValueChange={(value) => { setStatus(value as Status | "all"); setPage(1) }}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All statuses</SelectItem>{STATUSES.map((item) => <SelectItem key={item} value={item}>{titleCase(item)}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={role} onValueChange={(value) => { setRole(value as Role | "all"); setPage(1) }}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Role" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All roles</SelectItem>{ROLES.map((item) => <SelectItem key={item} value={item}>{titleCase(item)}</SelectItem>)}</SelectContent>
            </Select>
            <Input type="date" value={dateFrom} onChange={(event) => { setDateFrom(event.target.value); setPage(1) }} aria-label="Created from" />
            <Input type="date" value={dateTo} onChange={(event) => { setDateTo(event.target.value); setPage(1) }} aria-label="Created to" />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest created</SelectItem><SelectItem value="oldest">Oldest created</SelectItem>
                <SelectItem value="name">Name A–Z</SelectItem><SelectItem value="last-active">Recently active</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" onClick={resetFilters} disabled={!hasFilters}>Clear</Button>
          </div>
          {hasFilters && (
            <div className="flex flex-wrap gap-2">
              {query && <Badge variant="secondary">Search: {query}<button className="cursor-pointer disabled:cursor-not-allowed" onClick={() => setQuery("")} aria-label="Remove search filter"><XIcon /></button></Badge>}
              {status !== "all" && <Badge variant="secondary">Status: {status}<button className="cursor-pointer" onClick={() => setStatus("all")} aria-label="Remove status filter"><XIcon /></button></Badge>}
              {role !== "all" && <Badge variant="secondary">Role: {role}<button className="cursor-pointer" onClick={() => setRole("all")} aria-label="Remove role filter"><XIcon /></button></Badge>}
              {dateFrom && <Badge variant="secondary">From: {dateFrom}<button className="cursor-pointer" onClick={() => setDateFrom("")} aria-label="Remove start date filter"><XIcon /></button></Badge>}
              {dateTo && <Badge variant="secondary">To: {dateTo}<button className="cursor-pointer" onClick={() => setDateTo("")} aria-label="Remove end date filter"><XIcon /></button></Badge>}
            </div>
          )}
        </div>

        {selected.size > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-b border-border/70 bg-muted/40 p-3">
            <span className="me-auto text-sm font-medium">{selected.size} selected</span>
            <Select value={bulkRole} onValueChange={(value) => setBulkRole(value as Role)}>
              <SelectTrigger size="sm" className="w-37.5"><SelectValue /></SelectTrigger>
              <SelectContent>{ROLES.map((item) => <SelectItem key={item} value={item}>{titleCase(item)}</SelectItem>)}</SelectContent>
            </Select>
            <Button size="sm" variant="outline" onClick={() => { updateUsers([...selected], { role: bulkRole }, `Role changed to ${titleCase(bulkRole)}`); setNotice({ tone: "success", text: "Selected roles updated." }) }}>Change role</Button>
            <Button size="sm" variant="outline" onClick={() => updateUsers([...selected], { status: "active" }, "Access activated")}>Activate</Button>
            <Button size="sm" variant="outline" onClick={() => requestSuspend([...selected])}>Suspend</Button>
            <Button size="sm" variant="outline" onClick={() => downloadCsv("selected-users.csv", csvRows(selectedUsers))}><DownloadIcon />Export selected</Button>
            <Button size="sm" variant="destructive" onClick={() => requestDelete([...selected])}><Trash2Icon />Delete selected</Button>
          </div>
        )}

        {paged.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox checked={allPageSelected ? true : somePageSelected ? "indeterminate" : false} onCheckedChange={(checked) => updateSelection(paged.map((user) => user.id), checked === true)} aria-label="Select page" /></TableHead>
                <TableHead>User</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead>
                <TableHead>Last active</TableHead><TableHead>Created</TableHead><TableHead className="w-10"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((user) => (
                <TableRow key={user.id} data-state={selected.has(user.id) ? "selected" : undefined}>
                  <TableCell><Checkbox checked={selected.has(user.id)} onCheckedChange={(checked) => updateSelection([user.id], checked === true)} aria-label={`Select ${user.name}`} /></TableCell>
                  <TableCell>
                    <button className="flex cursor-pointer items-center gap-3 text-start" onClick={() => setDetailId(user.id)}>
                      <Avatar><AvatarFallback>{user.avatarInitials}</AvatarFallback></Avatar>
                      <span><span className="block font-medium">{user.name}</span><span className="block text-xs text-muted-foreground">{user.id}</span></span>
                    </button>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell><Badge className={ROLE_STYLE[user.role]}>{titleCase(user.role)}</Badge></TableCell>
                  <TableCell><Badge className={STATUS_STYLE[user.status]}>{titleCase(user.status)}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(user.lastActive, true)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label={`Actions for ${user.name}`}><EllipsisIcon /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setDetailId(user.id)}>View details</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => openEdit(user)}><PencilIcon />Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => { setRoleId(user.id); setNextRole(user.role) }}>Change role</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "suspended"
                          ? <DropdownMenuItem onSelect={() => updateUsers([user.id], { status: "active" }, "Access activated")}>Activate</DropdownMenuItem>
                          : <DropdownMenuItem onSelect={() => requestSuspend([user.id])}>Suspend</DropdownMenuItem>}
                        <DropdownMenuItem variant="destructive" onSelect={() => requestDelete([user.id])}><Trash2Icon />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
            <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted"><SearchIcon className="size-5 text-muted-foreground" /></span>
            <h3 className="font-medium">No users found</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">No users match the current search and filters.</p>
            <Button className="mt-4" variant="outline" onClick={resetFilters}>Clear filters</Button>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">Showing {filtered.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}</p>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" className={cn(currentPage === 1 && "pointer-events-none opacity-50")} onClick={(event) => { event.preventDefault(); setPage((value) => Math.max(1, value - 1)) }} /></PaginationItem>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                <PaginationItem key={number}><PaginationLink href="#" isActive={number === currentPage} onClick={(event) => { event.preventDefault(); setPage(number) }}>{number}</PaginationLink></PaginationItem>
              ))}
              <PaginationItem><PaginationNext href="#" className={cn(currentPage === pageCount && "pointer-events-none opacity-50")} onClick={(event) => { event.preventDefault(); setPage((value) => Math.min(pageCount, value + 1)) }} /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <form onSubmit={submitInvite}>
            <DialogHeader><DialogTitle>Invite user</DialogTitle><DialogDescription>Add a user to the workspace. Their status will be invitation pending.</DialogDescription></DialogHeader>
            <div className="py-5"><UserFields values={inviteForm} errors={inviteErrors} onChange={(patch) => setInviteForm((current) => ({ ...current, ...patch }))} /></div>
            <DialogFooter><Button type="button" variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button><Button type="submit" disabled={submitting}>{submitting ? "Adding…" : "Add user"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editId)} onOpenChange={(open) => !open && setEditId(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <form onSubmit={submitEdit}>
            <DialogHeader><DialogTitle>Edit user</DialogTitle><DialogDescription>Update profile and workspace details.</DialogDescription></DialogHeader>
            <div className="py-5"><UserFields values={editForm} errors={editErrors} onChange={(patch) => setEditForm((current) => ({ ...current, ...patch }))} /></div>
            <DialogFooter><Button type="button" variant="outline" onClick={() => setEditId(null)}>Cancel</Button><Button type="submit">Save changes</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(roleId)} onOpenChange={(open) => !open && setRoleId(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Change role</DialogTitle><DialogDescription>Choose access for {roleUser?.name}.</DialogDescription></DialogHeader>
          <div className="space-y-3 py-2">
            <Select value={nextRole} onValueChange={(value) => setNextRole(value as Role)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>{ROLES.map((item) => <SelectItem key={item} value={item}>{titleCase(item)}</SelectItem>)}</SelectContent>
            </Select>
            <div className="rounded-md bg-muted p-3 text-sm"><p className="font-medium">{titleCase(nextRole)} permissions</p><p className="mt-1 text-muted-foreground">{ROLE_DESCRIPTION[nextRole]}</p></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setRoleId(null)}>Cancel</Button><Button onClick={changeRole}>Change role</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={Boolean(detailUser)} onOpenChange={(open) => !open && setDetailId(null)}>
        <SheetContent side="end" className="w-full overflow-y-auto sm:max-w-lg">
          {detailUser && (
            <>
              <SheetHeader className="border-b border-border/70 p-5">
                <div className="flex items-center gap-3">
                  <Avatar size="lg"><AvatarFallback>{detailUser.avatarInitials}</AvatarFallback></Avatar>
                  <div className="min-w-0 text-start"><SheetTitle>{detailUser.name}</SheetTitle><SheetDescription className="truncate">{detailUser.email}</SheetDescription></div>
                </div>
              </SheetHeader>
              <div className="space-y-6 p-5">
                <div className="flex flex-wrap gap-2"><Badge className={STATUS_STYLE[detailUser.status]}>{titleCase(detailUser.status)}</Badge><Badge className={ROLE_STYLE[detailUser.role]}>{titleCase(detailUser.role)}</Badge></div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-muted-foreground">Team</p><p className="mt-1 font-medium">{detailUser.team}</p></div>
                  <div><p className="text-muted-foreground">User ID</p><p className="mt-1 font-medium">{detailUser.id}</p></div>
                  <div><p className="text-muted-foreground">Created</p><p className="mt-1 font-medium">{formatDate(detailUser.createdAt)}</p></div>
                  <div><p className="text-muted-foreground">Last active</p><p className="mt-1 font-medium">{formatDate(detailUser.lastActive, true)}</p></div>
                </div>
                <Separator />
                <div><h4 className="text-sm font-medium">Contact</h4><p className="mt-2 text-sm text-muted-foreground">{detailUser.email}</p></div>
                <div><h4 className="text-sm font-medium">Notes</h4><p className="mt-2 text-sm text-muted-foreground">{detailUser.notes || "No notes added."}</p></div>
                <Separator />
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-medium"><ActivityIcon className="size-4" />Activity</h4>
                  <div className="mt-3 space-y-4">
                    {detailUser.activity.map((item) => <div key={item.id} className="border-s border-border ps-4"><p className="text-sm">{item.label}</p><p className="mt-1 text-xs text-muted-foreground">{formatDate(item.at, true)}</p></div>)}
                  </div>
                </div>
              </div>
              <SheetFooter className="border-t border-border/70 p-5">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => openEdit(detailUser)}><PencilIcon />Edit</Button>
                  <Button variant="outline" onClick={() => { setRoleId(detailUser.id); setNextRole(detailUser.role) }}>Change Role</Button>
                  {detailUser.status === "suspended"
                    ? <Button variant="outline" onClick={() => updateUsers([detailUser.id], { status: "active" }, "Access activated")}>Activate</Button>
                    : <Button variant="outline" onClick={() => requestSuspend([detailUser.id])}>Suspend</Button>}
                  {detailUser.status === "invited" && <Button variant="outline" onClick={() => setNotice({ tone: "success", text: `Invitation resend simulated for ${detailUser.email}; no email was sent.` })}><MailIcon />Resend invitation</Button>}
                  <Button className="col-span-2" variant="destructive" onClick={() => requestDelete([detailUser.id])}><Trash2Icon />Delete user</Button>
                </div>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={Boolean(pendingAction)} onOpenChange={(open) => !open && setPendingAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{pendingAction?.kind === "delete" ? "Delete user access?" : "Suspend user access?"}</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAction?.kind === "delete"
                ? "This removes the selected users. You can undo the deletion for about 8 seconds."
                : "Selected users will immediately lose workspace access until reactivated."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmPending}>{pendingAction?.kind === "delete" ? "Delete" : "Suspend"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

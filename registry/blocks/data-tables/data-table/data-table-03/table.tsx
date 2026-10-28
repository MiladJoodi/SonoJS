"use client"

import * as React from "react"
import {
  ArrowUpDownIcon,
  EllipsisIcon,
  FilterIcon,
  SearchIcon,
  UserPlusIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Input } from "@sonojs/ui/components/input"
import { Switch } from "@sonojs/ui/components/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

type Role = "Owner" | "Admin" | "Member" | "Billing"
type SortKey = "name" | "role" | "lastActive"

type Member = {
  id: string
  name: string
  email: string
  initials: string
  role: Role
  lastActive: string
  active: boolean
}

const ROLE_STYLES: Record<Role, string> = {
  Owner:
    "border-transparent bg-violet-500/10 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  Admin:
    "border-transparent bg-sky-500/10 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  Member: "border-transparent bg-muted text-muted-foreground",
  Billing:
    "border-transparent bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
}

const MEMBERS: Member[] = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex@sonojs.dev",
    initials: "AR",
    role: "Owner",
    lastActive: "Just now",
    active: true,
  },
  {
    id: "2",
    name: "Sam Chen",
    email: "sam@sonojs.dev",
    initials: "SC",
    role: "Admin",
    lastActive: "12 min ago",
    active: true,
  },
  {
    id: "3",
    name: "Jordan Lee",
    email: "jordan@sonojs.dev",
    initials: "JL",
    role: "Member",
    lastActive: "Yesterday",
    active: true,
  },
  {
    id: "4",
    name: "Morgan Blake",
    email: "morgan@sonojs.dev",
    initials: "MB",
    role: "Billing",
    lastActive: "2 days ago",
    active: true,
  },
  {
    id: "5",
    name: "Riley Quinn",
    email: "riley@sonojs.dev",
    initials: "RQ",
    role: "Member",
    lastActive: "Mar 10, 2026",
    active: false,
  },
  {
    id: "6",
    name: "Casey Ng",
    email: "casey@sonojs.dev",
    initials: "CN",
    role: "Admin",
    lastActive: "Mar 8, 2026",
    active: false,
  },
]

/** iOS system green — inline so it never gets dropped by Tailwind/twMerge. */
const IOS_GREEN = "#34C759"

function AccessSwitch({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean
  onCheckedChange: (next: boolean) => void
  label: string
}) {
  return (
    <Switch
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={label}
      className="cursor-pointer"
      style={checked ? { backgroundColor: IOS_GREEN } : undefined}
    />
  )
}

function RoleBadge({ role }: { role: Role }) {
  return (
    <Badge
      variant="outline"
      className={cn("h-6 rounded-full px-2.5", ROLE_STYLES[role])}
    >
      {role}
    </Badge>
  )
}

function MemberMenu({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="size-8 cursor-pointer rounded-lg text-muted-foreground"
          aria-label={`Actions for ${name}`}
        >
          <EllipsisIcon className="size-4" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem className="cursor-pointer">
          View profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Change role
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Reset password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
          Remove access
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MemberCard({
  member,
  onActiveChange,
}: {
  member: Member
  onActiveChange: (next: boolean) => void
}) {
  return (
    <li className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft">
      <div className="flex items-start gap-3">
        <Avatar className="size-10">
          <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
            {member.initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-medium text-foreground">
                {member.name}
              </p>
              <p
                dir="ltr"
                className="truncate text-xs text-muted-foreground text-start"
              >
                {member.email}
              </p>
            </div>
            <RoleBadge role={member.role} />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Last active{" "}
              <span dir="ltr" className="text-foreground">
                {member.lastActive}
              </span>
            </p>
            <div className="flex items-center gap-2">
              <AccessSwitch
                checked={member.active}
                onCheckedChange={onActiveChange}
                label={`Toggle access for ${member.name}`}
              />
              <MemberMenu name={member.name} />
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function DataTable03({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [query, setQuery] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState<Role | "All">("All")
  const [sortKey, setSortKey] = React.useState<SortKey>("name")
  const [sortAsc, setSortAsc] = React.useState(true)
  const [members, setMembers] = React.useState(MEMBERS)

  const roles: Array<Role | "All"> = [
    "All",
    "Owner",
    "Admin",
    "Member",
    "Billing",
  ]

  const rows = members
    .filter((m) => {
      if (roleFilter !== "All" && m.role !== roleFilter) return false
      const q = query.trim().toLowerCase()
      if (!q) return true
      return (
        m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
      )
    })
    .slice()
    .sort((a, b) => {
      const dir = sortAsc ? 1 : -1
      if (sortKey === "name") return a.name.localeCompare(b.name) * dir
      if (sortKey === "role") return a.role.localeCompare(b.role) * dir
      return a.lastActive.localeCompare(b.lastActive) * dir
    })

  const activeCount = members.filter((m) => m.active).length

  const cycleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v)
    else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const setActive = (id: string, next: boolean) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: next } : m))
    )
  }

  return (
    <div className={cn("w-full min-w-0", className)} {...props}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-start">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Team access
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              <span className="tabular-nums text-foreground">{activeCount}</span>{" "}
              of{" "}
              <span className="tabular-nums text-foreground">
                {members.length}
              </span>{" "}
              members currently active.
            </p>
          </div>
          <Button type="button" className="h-10 cursor-pointer gap-2 rounded-lg">
            <UserPlusIcon className="size-4" aria-hidden />
            Invite member
          </Button>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-sm">
            <SearchIcon
              aria-hidden
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email…"
              className="h-10 ps-9"
              aria-label="Search team members"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <FilterIcon className="size-3.5" aria-hidden />
              Role
            </span>
            {roles.map((role) => {
              const active = roleFilter === role
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setRoleFilter(role)}
                  className={cn(
                    "inline-flex h-8 cursor-pointer items-center rounded-full border px-3 text-xs font-medium transition-colors",
                    active
                      ? "border-transparent bg-foreground text-background"
                      : "border-border/70 bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  {role}
                </button>
              )
            })}
          </div>
        </div>

        <ul className="flex flex-col gap-3 md:hidden">
          {rows.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onActiveChange={(next) => setActive(member.id, next)}
            />
          ))}
          {rows.length === 0 ? (
            <li className="rounded-[12px] border border-dashed border-border/70 px-4 py-10 text-center text-sm text-muted-foreground">
              No members match your search.
            </li>
          ) : null}
        </ul>

        <div className="hidden rounded-[12px] border border-border/70 bg-card shadow-soft md:block">
          <Table className="min-w-200">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium">
                  <button
                    type="button"
                    onClick={() => cycleSort("name")}
                    className="inline-flex cursor-pointer items-center gap-1.5 hover:text-foreground"
                  >
                    Member
                    <ArrowUpDownIcon className="size-3.5 opacity-60" aria-hidden />
                  </button>
                </TableHead>
                <TableHead className="font-medium">
                  <button
                    type="button"
                    onClick={() => cycleSort("role")}
                    className="inline-flex cursor-pointer items-center gap-1.5 hover:text-foreground"
                  >
                    Role
                    <ArrowUpDownIcon className="size-3.5 opacity-60" aria-hidden />
                  </button>
                </TableHead>
                <TableHead className="font-medium">
                  <button
                    type="button"
                    onClick={() => cycleSort("lastActive")}
                    className="inline-flex cursor-pointer items-center gap-1.5 hover:text-foreground"
                  >
                    Last active
                    <ArrowUpDownIcon className="size-3.5 opacity-60" aria-hidden />
                  </button>
                </TableHead>
                <TableHead className="font-medium">Access</TableHead>
                <TableHead className="w-12">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((member) => (
                <TableRow key={member.id} className="group">
                  <TableCell>
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {member.name}
                        </p>
                        <p
                          dir="ltr"
                          className="truncate text-xs text-muted-foreground text-start"
                        >
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={member.role} />
                  </TableCell>
                  <TableCell>
                    <span
                      dir="ltr"
                      className="text-sm tabular-nums text-muted-foreground"
                    >
                      {member.lastActive}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AccessSwitch
                        checked={member.active}
                        onCheckedChange={(next) => setActive(member.id, next)}
                        label={`Toggle access for ${member.name}`}
                      />
                      <span className="text-xs text-muted-foreground">
                        {member.active ? "On" : "Off"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-end">
                    <MemberMenu name={member.name} />
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={5}
                    className="h-28 text-center text-muted-foreground"
                  >
                    No members match your search.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

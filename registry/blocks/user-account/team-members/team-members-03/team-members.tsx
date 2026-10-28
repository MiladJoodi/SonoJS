"use client"

import * as React from "react"
import {
  EllipsisIcon,
  MailIcon,
  PlusIcon,
  SearchIcon,
  UserMinusIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
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
import { Tabs, TabsList, TabsTrigger } from "@sonojs/ui/components/tabs"
import { cn } from "@/lib/utils"

import avatar01 from "./images/avatar-01.webp"
import avatar02 from "./images/avatar-02.webp"
import avatar03 from "./images/avatar-03.webp"
import avatar04 from "./images/avatar-04.webp"
import avatar05 from "./images/avatar-05.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type Role = "Owner" | "Admin" | "Member" | "Viewer"
type Status = "Active" | "Invited"

type Member = {
  id: string
  name: string
  email: string
  role: Role
  status: Status
  initials: string
  avatar: string
}

const MEMBERS: Member[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@acme.co",
    role: "Owner",
    status: "Active",
    initials: "AJ",
    avatar: assetSrc(avatar01),
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@acme.co",
    role: "Admin",
    status: "Active",
    initials: "BS",
    avatar: assetSrc(avatar02),
  },
  {
    id: "3",
    name: "Charlie Davis",
    email: "charlie@acme.co",
    role: "Member",
    status: "Active",
    initials: "CD",
    avatar: assetSrc(avatar03),
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@acme.co",
    role: "Member",
    status: "Invited",
    initials: "DP",
    avatar: assetSrc(avatar04),
  },
  {
    id: "5",
    name: "Evan Cole",
    email: "evan@acme.co",
    role: "Viewer",
    status: "Invited",
    initials: "EC",
    avatar: assetSrc(avatar05),
  },
]

function statusBadge(status: Status) {
  if (status === "Active") {
    return "border-0 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  }
  return "border-0 bg-amber-500/10 text-amber-700 dark:text-amber-300"
}

function MemberRow({ member }: { member: Member }) {
  return (
    <li className="flex items-center gap-3 border-b border-border/70 px-4 py-3 last:border-b-0 sm:px-5">
      <Avatar size="default" className="overflow-hidden">
        <AvatarImage src={member.avatar} alt={member.name} />
        <AvatarFallback>{member.initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 text-start">
        <p className="truncate text-sm font-medium">{member.name}</p>
        <p className="truncate text-xs text-muted-foreground" dir="ltr">
          {member.email}
        </p>
      </div>
      <Badge
        variant="secondary"
        className="hidden border-0 bg-muted text-muted-foreground sm:inline-flex"
      >
        {member.role}
      </Badge>
      <Badge variant="secondary" className={statusBadge(member.status)}>
        {member.status}
      </Badge>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="cursor-pointer"
            aria-label={`Manage ${member.name}`}
          >
            <EllipsisIcon className="size-4" aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          {member.status === "Invited" ? (
            <DropdownMenuItem className="cursor-pointer">
              <MailIcon className="size-4" aria-hidden />
              Resend invite
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              disabled={member.role === "Owner"}
            >
              Change role
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            disabled={member.role === "Owner"}
          >
            <UserMinusIcon className="size-4" aria-hidden />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  )
}

export default function TeamMembers({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [query, setQuery] = React.useState("")
  const [tab, setTab] = React.useState("all")

  const filtered = MEMBERS.filter((m) => {
    const q = query.trim().toLowerCase()
    const matchesQuery =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q)
    const matchesTab =
      tab === "all" ||
      (tab === "active" && m.status === "Active") ||
      (tab === "invited" && m.status === "Invited")
    return matchesQuery && matchesTab
  })

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-8 text-foreground sm:px-6 sm:py-10",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 text-start">
            <h1 className="text-h3 font-semibold tracking-tight">
              Team members
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Search and filter by status.
            </p>
          </div>
          <Button type="button" className="cursor-pointer gap-1.5 self-start">
            <PlusIcon className="size-4" aria-hidden />
            Invite
          </Button>
        </div>

        <section className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="space-y-3 border-b border-border/70 p-4 sm:p-5">
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or email"
                className="ps-9"
                dir="ltr"
                aria-label="Search members"
              />
            </div>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList variant="line" className="w-full justify-start">
                <TabsTrigger value="all" className="cursor-pointer">
                  All
                </TabsTrigger>
                <TabsTrigger value="active" className="cursor-pointer">
                  Active
                </TabsTrigger>
                <TabsTrigger value="invited" className="cursor-pointer">
                  Invited
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <ul>
            {filtered.length === 0 ? (
              <li className="px-4 py-10 text-center text-sm text-muted-foreground sm:px-5">
                No members match your filters.
              </li>
            ) : (
              filtered.map((member) => (
                <MemberRow key={member.id} member={member} />
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  )
}

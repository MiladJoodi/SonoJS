"use client"

import * as React from "react"
import {
  EllipsisIcon,
  MailIcon,
  PlusIcon,
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
import { Progress } from "@sonojs/ui/components/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

import avatar01 from "./images/avatar-01.webp"
import avatar02 from "./images/avatar-02.webp"
import avatar03 from "./images/avatar-03.webp"
import avatar04 from "./images/avatar-04.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type Role = "Owner" | "Admin" | "Member"
type Status = "Active" | "Invited"

type Member = {
  id: string
  name: string
  email: string
  role: Role
  status: Status
  initials: string
  lastActive: string
  avatar: string
}

const SEAT_LIMIT = 10
const MEMBERS: Member[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@acme.co",
    role: "Owner",
    status: "Active",
    initials: "AJ",
    lastActive: "Just now",
    avatar: assetSrc(avatar01),
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@acme.co",
    role: "Admin",
    status: "Active",
    initials: "BS",
    lastActive: "2h ago",
    avatar: assetSrc(avatar02),
  },
  {
    id: "3",
    name: "Charlie Davis",
    email: "charlie@acme.co",
    role: "Member",
    status: "Active",
    initials: "CD",
    lastActive: "Yesterday",
    avatar: assetSrc(avatar03),
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@acme.co",
    role: "Member",
    status: "Invited",
    initials: "DP",
    lastActive: "—",
    avatar: assetSrc(avatar04),
  },
]

export default function TeamMembers({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const used = MEMBERS.length
  const pct = Math.round((used / SEAT_LIMIT) * 100)

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-8 text-foreground sm:px-6 sm:py-10",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 text-start">
            <h1 className="text-h3 font-semibold tracking-tight">
              Seats & members
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track plan seats and who is using them.
            </p>
          </div>
          <Button type="button" className="cursor-pointer gap-1.5 self-start">
            <PlusIcon className="size-4" aria-hidden />
            Invite member
          </Button>
        </div>

        <section className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-start">
              <p className="text-sm font-medium">Team seats</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Pro plan · upgrade for more seats
              </p>
            </div>
            <p className="text-sm font-semibold tabular-nums" dir="ltr">
              {used} / {SEAT_LIMIT} used
            </p>
          </div>
          <Progress value={pct} className="mt-4 h-2" />
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="border-0 bg-muted text-muted-foreground"
            >
              {SEAT_LIMIT - used} available
            </Badge>
            <a
              href="#"
              className="cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Manage billing
            </a>
          </div>
        </section>

        <section className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="ps-5 sm:ps-6">Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last active</TableHead>
                  <TableHead className="w-12 pe-5 text-end sm:pe-6">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MEMBERS.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="ps-5 sm:ps-6">
                      <div className="flex items-center gap-3">
                        <Avatar size="default" className="overflow-hidden">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 text-start">
                          <p className="truncate text-sm font-medium">
                            {member.name}
                          </p>
                          <p
                            className="truncate text-xs text-muted-foreground"
                            dir="ltr"
                          >
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{member.role}</span>
                      {member.status === "Invited" ? (
                        <Badge
                          variant="secondary"
                          className="ms-2 border-0 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                        >
                          Invited
                        </Badge>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <span
                        className="text-sm text-muted-foreground"
                        dir="ltr"
                      >
                        {member.lastActive}
                      </span>
                    </TableCell>
                    <TableCell className="pe-5 text-end sm:pe-6">
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  )
}

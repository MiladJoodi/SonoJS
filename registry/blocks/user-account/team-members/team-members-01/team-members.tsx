"use client"

import * as React from "react"
import {
  EllipsisIcon,
  MailIcon,
  PlusIcon,
  ShieldIcon,
  Trash2Icon,
  UserIcon,
  UserMinusIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@sonojs/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "@sonojs/ui/components/field"
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

import avatar01 from "./images/avatar-01.webp"
import avatar02 from "./images/avatar-02.webp"
import avatar03 from "./images/avatar-03.webp"
import avatar04 from "./images/avatar-04.webp"

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
]

function statusBadge(status: Status) {
  if (status === "Active") {
    return "border-0 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  }
  return "border-0 bg-amber-500/10 text-amber-700 dark:text-amber-300"
}

function InviteDialog() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="cursor-pointer gap-1.5">
          <PlusIcon className="size-4" aria-hidden />
          Invite member
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 sm:max-w-md">
        <DialogHeader className="border-b border-border/70 px-6 py-5 text-start">
          <DialogTitle>Invite to team</DialogTitle>
          <DialogDescription>
            Send an email invitation to add someone to this workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-5">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="team-members-01-email">
                Email address
              </FieldLabel>
              <Input
                id="team-members-01-email"
                type="email"
                dir="ltr"
                placeholder="colleague@company.com"
                autoComplete="email"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="team-members-01-role">Role</FieldLabel>
              <Select defaultValue="member">
                <SelectTrigger
                  id="team-members-01-role"
                  className="w-full cursor-pointer"
                >
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin — full access</SelectItem>
                  <SelectItem value="member">
                    Member — can edit projects
                  </SelectItem>
                  <SelectItem value="viewer">Viewer — read only</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </div>
        <DialogFooter className="border-t border-border/70 px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Send invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function MemberActions({ member }: { member: Member }) {
  const isOwner = member.role === "Owner"
  return (
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
      <DropdownMenuContent align="end" className="w-48">
        {member.status === "Invited" ? (
          <DropdownMenuItem className="cursor-pointer">
            <MailIcon className="size-4" aria-hidden />
            Resend invite
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={isOwner}
          >
            <ShieldIcon className="size-4" aria-hidden />
            Change role
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          disabled={isOwner}
        >
          {member.status === "Invited" ? (
            <>
              <Trash2Icon className="size-4" aria-hidden />
              Revoke invite
            </>
          ) : (
            <>
              <UserMinusIcon className="size-4" aria-hidden />
              Remove member
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function TeamMembers({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const active = MEMBERS.filter((m) => m.status === "Active").length
  const invited = MEMBERS.filter((m) => m.status === "Invited").length

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
              Team members
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage people, roles, and pending invitations.
            </p>
          </div>
          <InviteDialog />
        </div>

        <section className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="flex flex-col gap-1 border-b border-border/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="text-start">
              <h2 className="text-sm font-semibold">Workspace team</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {active} active
                {invited > 0 ? ` · ${invited} pending` : null}
              </p>
            </div>
            <Badge
              variant="secondary"
              className="w-fit border-0 bg-muted text-muted-foreground"
            >
              4 of 10 seats
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="ps-5 sm:ps-6">Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12 pe-5 text-end sm:pe-6">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MEMBERS.map((member) => {
                  const privileged =
                    member.role === "Owner" || member.role === "Admin"
                  return (
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
                        <div className="flex items-center gap-2">
                          {privileged ? (
                            <ShieldIcon
                              className="size-3.5 text-primary"
                              aria-hidden
                            />
                          ) : (
                            <UserIcon
                              className="size-3.5 text-muted-foreground"
                              aria-hidden
                            />
                          )}
                          <span className="text-sm font-medium">
                            {member.role}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={statusBadge(member.status)}
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="pe-5 text-end sm:pe-6">
                        <MemberActions member={member} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  )
}

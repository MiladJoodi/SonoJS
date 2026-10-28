"use client"

import * as React from "react"
import { MailIcon, SendIcon, UserMinusIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
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

export default function TeamMembers({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-8 text-foreground sm:px-6 sm:py-10",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="text-start">
          <h1 className="text-h3 font-semibold tracking-tight">
            Invite teammates
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add people by email — no modal, send right from the page.
          </p>
        </div>

        <form
          className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="grid min-w-0 flex-1 gap-2 text-start">
              <Label htmlFor="team-members-05-email">Email</Label>
              <Input
                id="team-members-05-email"
                type="email"
                dir="ltr"
                placeholder="colleague@company.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="grid w-full gap-2 text-start sm:w-40">
              <Label htmlFor="team-members-05-role">Role</Label>
              <Select defaultValue="member">
                <SelectTrigger
                  id="team-members-05-role"
                  className="w-full cursor-pointer"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="cursor-pointer gap-1.5 sm:shrink-0">
              <SendIcon className="size-4" aria-hidden />
              Send invite
            </Button>
          </div>
        </form>

        <section className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="border-b border-border/70 px-4 py-3 sm:px-5">
            <h2 className="text-sm font-semibold">Current team</h2>
          </div>
          <ul>
            {MEMBERS.map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-3 border-b border-border/70 px-4 py-3 last:border-b-0 sm:px-5"
              >
                <Avatar size="default" className="overflow-hidden">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 text-start">
                  <p className="truncate text-sm font-medium">{member.name}</p>
                  <p
                    className="truncate text-xs text-muted-foreground"
                    dir="ltr"
                  >
                    {member.email}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="hidden border-0 bg-muted text-muted-foreground sm:inline-flex"
                >
                  {member.role}
                </Badge>
                <Badge
                  variant="secondary"
                  className={statusBadge(member.status)}
                >
                  {member.status}
                </Badge>
                {member.status === "Invited" ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="cursor-pointer"
                    aria-label={`Resend invite to ${member.name}`}
                  >
                    <MailIcon className="size-4" aria-hidden />
                  </Button>
                ) : member.role !== "Owner" ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="cursor-pointer text-destructive hover:text-destructive"
                    aria-label={`Remove ${member.name}`}
                  >
                    <UserMinusIcon className="size-4" aria-hidden />
                  </Button>
                ) : (
                  <span className="size-7" aria-hidden />
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

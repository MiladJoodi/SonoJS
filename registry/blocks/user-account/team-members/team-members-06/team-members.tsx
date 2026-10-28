"use client"

import * as React from "react"
import {
  ClockIcon,
  EllipsisIcon,
  MailIcon,
  PlusIcon,
  UserMinusIcon,
  XIcon,
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

function MemberAvatar({
  member,
  className,
}: {
  member: Member
  className?: string
}) {
  return (
    <Avatar size="default" className={cn("overflow-hidden", className)}>
      <AvatarImage src={member.avatar} alt={member.name} />
      <AvatarFallback>{member.initials}</AvatarFallback>
    </Avatar>
  )
}

export default function TeamMembers({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const active = MEMBERS.filter((m) => m.status === "Active")
  const invited = MEMBERS.filter((m) => m.status === "Invited")

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-8 text-foreground sm:px-6 sm:py-10",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3 text-start">
            <div className="flex -space-x-2 rtl:space-x-reverse">
              {active.map((m) => (
                <MemberAvatar
                  key={m.id}
                  member={m}
                  className="ring-2 ring-canvas"
                />
              ))}
            </div>
            <div className="min-w-0">
              <h1 className="text-h3 font-semibold tracking-tight">
                Team members
              </h1>
              <p className="text-sm text-muted-foreground">
                {active.length} active · {invited.length} pending
              </p>
            </div>
          </div>
          <Button type="button" className="cursor-pointer gap-1.5 self-start">
            <PlusIcon className="size-4" aria-hidden />
            Invite
          </Button>
        </div>

        {invited.length > 0 ? (
          <section className="rounded-[12px] border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2 text-start">
              <ClockIcon
                className="size-4 text-amber-700 dark:text-amber-300"
                aria-hidden
              />
              <h2 className="text-sm font-semibold text-foreground">
                Pending invitations
              </h2>
            </div>
            <ul className="space-y-2">
              {invited.map((member) => (
                <li
                  key={member.id}
                  className="flex flex-col gap-3 rounded-[12px] border border-border/70 bg-card px-3 py-3 sm:flex-row sm:items-center sm:gap-3"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <MemberAvatar member={member} />
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
                  <Badge
                    variant="secondary"
                    className="w-fit border-0 bg-muted text-muted-foreground"
                  >
                    {member.role}
                  </Badge>
                  <div className="flex items-center gap-1.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-9 cursor-pointer gap-1.5"
                    >
                      <MailIcon className="size-3.5" aria-hidden />
                      Resend
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-9 cursor-pointer"
                      aria-label={`Revoke invite for ${member.name}`}
                    >
                      <XIcon className="size-4" aria-hidden />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="border-b border-border/70 px-4 py-3 sm:px-5">
            <h2 className="text-sm font-semibold text-start">Active members</h2>
          </div>
          <ul>
            {active.map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-3 border-b border-border/70 px-4 py-3 last:border-b-0 sm:px-5"
              >
                <MemberAvatar member={member} />
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
                  className="border-0 bg-primary/10 text-primary"
                >
                  {member.role}
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
                    <DropdownMenuItem
                      className="cursor-pointer"
                      disabled={member.role === "Owner"}
                    >
                      Change role
                    </DropdownMenuItem>
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
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

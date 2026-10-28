"use client"

import * as React from "react"
import {
  EllipsisIcon,
  MailIcon,
  PlusIcon,
  ShieldIcon,
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
  title: string
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
    title: "Founder",
    avatar: assetSrc(avatar01),
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@acme.co",
    role: "Admin",
    status: "Active",
    initials: "BS",
    title: "Engineering",
    avatar: assetSrc(avatar02),
  },
  {
    id: "3",
    name: "Charlie Davis",
    email: "charlie@acme.co",
    role: "Member",
    status: "Active",
    initials: "CD",
    title: "Design",
    avatar: assetSrc(avatar03),
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@acme.co",
    role: "Viewer",
    status: "Invited",
    initials: "DP",
    title: "Marketing",
    avatar: assetSrc(avatar04),
  },
  {
    id: "5",
    name: "Evan Cole",
    email: "evan@acme.co",
    role: "Member",
    status: "Active",
    initials: "EC",
    title: "Product",
    avatar: assetSrc(avatar05),
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
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 text-start">
            <h1 className="text-h3 font-semibold tracking-tight">People</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Everyone with access to this workspace.
            </p>
          </div>
          <Button type="button" className="cursor-pointer gap-1.5 self-start">
            <PlusIcon className="size-4" aria-hidden />
            Invite
          </Button>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MEMBERS.map((member) => (
            <li
              key={member.id}
              className="flex flex-col gap-4 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar size="default" className="overflow-hidden">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 text-start">
                    <p className="truncate text-sm font-semibold">
                      {member.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {member.title}
                    </p>
                  </div>
                </div>
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
                        <ShieldIcon className="size-4" aria-hidden />
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
              </div>

              <p
                className="truncate text-xs text-muted-foreground"
                dir="ltr"
              >
                {member.email}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className="border-0 bg-primary/10 text-primary"
                >
                  {member.role}
                </Badge>
                <Badge
                  variant="secondary"
                  className={statusBadge(member.status)}
                >
                  {member.status}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

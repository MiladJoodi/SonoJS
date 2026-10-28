"use client"

import type * as React from "react"
import {
  Building2Icon,
  CalendarIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import avatarImg from "./images/avatar.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const MEMBER = {
  name: "Noah Park",
  email: "noah.park@acme.com",
  role: "Staff Designer",
  department: "Design Systems",
  org: "Acme",
  team: "Design",
  availability: "Available",
  reportsTo: "Priya Shah",
  location: "Berlin · CET",
} as const

const SKILLS = [
  "Design systems",
  "Figma",
  "Accessibility",
  "Workshops",
] as const

export default function UserProfile({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "flex w-full min-w-0 items-center justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="user-profile-06-heading"
      {...props}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 px-5 py-3">
          <p className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            <Building2Icon className="size-3.5" aria-hidden />
            {MEMBER.org} · {MEMBER.team}
          </p>
          <Badge
            variant="outline"
            className="rounded-full border-transparent bg-primary/10 font-normal text-primary"
          >
            <span
              className="me-1.5 size-1.5 rounded-full bg-primary"
              aria-hidden
            />
            {MEMBER.availability}
          </Badge>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <Avatar className="size-16 shrink-0 sm:size-[4.5rem]">
              <AvatarImage src={assetSrc(avatarImg)} alt={MEMBER.name} />
              <AvatarFallback className="text-lg">NP</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <h1
                  id="user-profile-06-heading"
                  className="text-lg font-semibold tracking-tight"
                >
                  {MEMBER.name}
                </h1>
                <Badge variant="secondary">{MEMBER.role}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
                {MEMBER.email}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {MEMBER.department} · {MEMBER.location}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="button" className="flex-1 cursor-pointer">
              <MessageSquareIcon className="size-4" aria-hidden />
              Message
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 cursor-pointer"
            >
              <CalendarIcon className="size-4" aria-hidden />
              Book time
            </Button>
          </div>

          <Separator />

          <div className="text-start">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Skills
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="rounded-full border-border/70 font-normal"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-[12px] border border-border/70 bg-muted/20 px-3 py-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <UsersIcon className="size-3.5" aria-hidden />
            </span>
            <div className="min-w-0 text-start">
              <p className="text-xs text-muted-foreground">Reports to</p>
              <p className="text-sm font-medium">{MEMBER.reportsTo}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

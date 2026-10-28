"use client"

import type * as React from "react"
import { UserPlusIcon, UsersIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@sonojs/ui/components/empty"
import { cn } from "@/lib/utils"

export default function EmptyState({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="empty-state-05-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
          <div>
            <h2 className="text-sm font-semibold">Team</h2>
            <p className="text-xs text-muted-foreground">
              Design systems · 0 members
            </p>
          </div>
          <Button type="button" size="sm" className="cursor-pointer">
            <UserPlusIcon className="size-3.5" aria-hidden />
            Invite
          </Button>
        </div>

        <div className="flex justify-center gap-2 border-b border-border/70 px-4 py-5 sm:px-5">
          {[0, 1, 2].map((i) => (
            <Avatar
              key={i}
              className="size-10 border border-dashed border-border/70 bg-muted/40"
            >
              <AvatarFallback className="bg-transparent text-muted-foreground/40">
                ·
              </AvatarFallback>
            </Avatar>
          ))}
        </div>

        <Empty className="min-h-[220px] border-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UsersIcon aria-hidden />
            </EmptyMedia>
            <EmptyTitle id="empty-state-05-heading">
              Invite your team
            </EmptyTitle>
            <EmptyDescription>
              Add collaborators so they can review components, leave comments,
              and ship together.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button type="button" className="cursor-pointer">
              <UserPlusIcon className="size-4" aria-hidden />
              Invite members
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </section>
  )
}

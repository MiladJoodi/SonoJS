"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  HomeIcon,
  LockKeyholeIcon,
  MailIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

export default function AccessDenied({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "flex min-h-[min(40rem,100svh)] w-full flex-col items-center justify-center bg-canvas px-4 py-12 text-foreground sm:px-6",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="border-b border-border/70 bg-muted/30 px-6 py-8 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-border/70 bg-card">
              <LockKeyholeIcon
                className="size-5 text-muted-foreground"
                aria-hidden
              />
            </div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Error 403
            </p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight">
              This page is restricted
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              You&apos;re signed in, but this workspace resource needs a higher
              role. Ask an admin for access, or switch accounts.
            </p>
          </div>

          <div className="space-y-5 px-6 py-5">
            <div className="rounded-lg border border-border/70 bg-canvas px-3.5 py-3 text-start">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Tried to open
              </p>
              <p className="mt-1 truncate text-sm font-medium" dir="ltr">
                Workspace › Settings › Billing
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-border/70 px-3.5 py-3">
              <Avatar size="default">
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 text-start">
                <p className="truncate text-sm font-medium">Alex Rivera</p>
                <p className="truncate text-xs text-muted-foreground">
                  alex@example.com
                </p>
              </div>
              <Badge variant="secondary">Viewer</Badge>
            </div>

            <div className="flex flex-col gap-2">
              <Button type="button" className="w-full gap-2">
                <MailIcon className="size-4" aria-hidden />
                Request access
              </Button>
              <Button type="button" variant="outline" className="w-full gap-2">
                Switch account
              </Button>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button type="button" variant="ghost" size="sm" className="gap-1.5">
                  <ArrowLeftIcon className="icon-dir size-3.5" aria-hidden />
                  Go back
                </Button>
                <Button type="button" variant="ghost" size="sm" className="gap-1.5">
                  <HomeIcon className="size-3.5" aria-hidden />
                  Home
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <p className="px-6 py-3 text-center text-xs text-muted-foreground">
            Forbidden · Trace{" "}
            <span className="font-mono tabular-nums" dir="ltr">
              REQ-8K2M9X-PQL
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}

"use client"

import Link from "next/link"
import { useClerk, useUser } from "@clerk/nextjs"
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"

import { PlanIcon } from "@/components/icons/plan/plan-icon"
import { getUserPlan, getViewerPlanId } from "@/lib/access"
import { getAuthReturnPath } from "@/lib/auth-return-path"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"

function initials(name?: string | null, email?: string | null) {
  if (name?.trim()) {
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")
  }
  return email?.[0]?.toUpperCase() ?? "?"
}

/** SonoJS user menu — avatar shell immediately; details fill in when Clerk user is ready. */
export function UserMenu() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const ready = Boolean(isLoaded && user)

  const name = user?.fullName
  const email = user?.primaryEmailAddress?.emailAddress
  const metadata = user?.publicMetadata
  const isPro = ready ? getUserPlan(metadata) === "pro" : false
  const planId = ready ? getViewerPlanId(metadata) : "free"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="size-8 cursor-pointer rounded-full border border-border/70 bg-card p-0 shadow-none hover:bg-canvas"
          aria-label="Account menu"
          aria-busy={!ready}
        >
          <Avatar className="size-8">
            {ready && user?.imageUrl ? (
              <AvatarImage src={user.imageUrl} alt="" />
            ) : null}
            <AvatarFallback
              className={cn(
                "text-[11px]",
                !ready && "animate-pulse bg-muted text-muted-foreground"
              )}
            >
              {ready ? (
                initials(name, email)
              ) : (
                <UserIcon className="size-3.5 opacity-50" aria-hidden />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {ready && user ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex min-w-0 flex-col gap-0.5">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-sm font-medium text-foreground">
                    {name || "Account"}
                  </span>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-medium tracking-tight",
                      planId === "pro-yearly" && "bg-primary/10 text-primary",
                      planId === "pro-monthly" &&
                        "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
                      planId === "free" && "bg-muted text-muted-foreground"
                    )}
                  >
                    <PlanIcon plan={planId} className="size-3" />
                    {isPro ? "Pro" : "Free"}
                  </span>
                </div>
                {email ? (
                  <span className="truncate text-xs text-muted-foreground" dir="ltr">
                    {email}
                  </span>
                ) : null}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer py-2.5">
              <Link href="/account">
                <SettingsIcon className="size-4" />
                Account settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer py-2.5"
              onSelect={() => {
                void signOut({ redirectUrl: getAuthReturnPath() })
              }}
            >
              <LogOutIcon className="size-4" />
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuLabel className="font-normal">
            <span className="text-sm text-muted-foreground">Loading account…</span>
          </DropdownMenuLabel>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

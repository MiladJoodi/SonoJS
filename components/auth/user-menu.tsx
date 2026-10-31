"use client"

import Link from "next/link"
import { useClerk, useUser } from "@clerk/nextjs"
import { LogOutIcon, SettingsIcon } from "lucide-react"

import { PlanIcon } from "@/components/icons/plan-icon"
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
import { Skeleton } from "@sonojs/ui/components/skeleton"

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

/** SonoJS user menu — no Clerk UserButton chrome. */
export function UserMenu() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()

  if (!isLoaded || !user) {
    return (
      <Skeleton
        className="size-8 shrink-0 rounded-full"
        aria-hidden
        aria-busy="true"
      />
    )
  }

  const name = user.fullName
  const email = user.primaryEmailAddress?.emailAddress
  const metadata = user.publicMetadata
  const isPro = getUserPlan(metadata) === "pro"
  const planId = getViewerPlanId(metadata)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="size-8 cursor-pointer rounded-full border border-border/70 bg-card p-0 shadow-none hover:bg-canvas"
          aria-label="Account menu"
        >
          <Avatar className="size-8">
            <AvatarImage src={user.imageUrl} alt="" />
            <AvatarFallback className="text-[11px]">
              {initials(name, email)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
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
              <span className="truncate text-xs text-muted-foreground">
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

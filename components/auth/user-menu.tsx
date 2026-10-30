"use client"

import Link from "next/link"
import { useClerk, useUser } from "@clerk/nextjs"
import { LogOutIcon, SettingsIcon } from "lucide-react"

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
          <div className="flex flex-col gap-0.5">
            <span className="truncate text-sm font-medium text-foreground">
              {name || "Account"}
            </span>
            {email ? (
              <span className="truncate text-xs text-muted-foreground">
                {email}
              </span>
            ) : null}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/account">
            <SettingsIcon className="size-4" />
            Account settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onSelect={() => {
            void signOut({ redirectUrl: "/" })
          }}
        >
          <LogOutIcon className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

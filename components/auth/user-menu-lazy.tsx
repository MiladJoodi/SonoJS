"use client"

import * as React from "react"

import { UserIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"

/**
 * Loads UserMenu (+ plan/billing hooks) only when the signed-in branch mounts.
 * Placeholder matches the avatar trigger footprint to avoid header CLS.
 */
export function UserMenuLazy() {
  const [Menu, setMenu] = React.useState<React.ComponentType | null>(null)

  React.useEffect(() => {
    let cancelled = false
    import("@/components/auth/user-menu")
      .then((mod) => {
        if (!cancelled) setMenu(() => mod.UserMenu)
      })
      .catch(() => {
        /* keep shell */
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (!Menu) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="size-8 cursor-pointer rounded-full border border-border/70 bg-card p-0 shadow-none"
        aria-label="Account menu"
        aria-busy
        aria-disabled
      >
        <Avatar className="size-8">
          <AvatarFallback
            className={cn("animate-pulse bg-muted text-muted-foreground text-[11px]")}
          >
            <UserIcon className="size-3.5 opacity-50" aria-hidden />
          </AvatarFallback>
        </Avatar>
      </Button>
    )
  }

  return <Menu />
}

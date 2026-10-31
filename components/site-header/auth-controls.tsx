"use client"

import * as React from "react"
import { useAuth } from "@clerk/nextjs"

import {
  AuthDialog,
  type AuthDialogMode,
  UserMenu,
} from "@/components/auth"
import { useEnsureUserPlan } from "@/hooks/use-ensure-user-plan"
import { Button } from "@sonojs/ui/components/button"
import { Skeleton } from "@sonojs/ui/components/skeleton"

/** Header auth — one control; dialog switches sign-in ↔ sign-up. */
export function AuthControls() {
  const { isLoaded, isSignedIn } = useAuth()
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState<AuthDialogMode>("sign-in")

  // Default missing plan → Free; expire Pro when planExpiresAt has passed.
  useEnsureUserPlan()

  // Close the auth dialog as soon as the session becomes active.
  React.useEffect(() => {
    if (isSignedIn && open) setOpen(false)
  }, [isSignedIn, open])

  if (!isLoaded) {
    return (
      <Skeleton
        className="size-8 shrink-0 rounded-full"
        aria-hidden
        aria-busy="true"
      />
    )
  }

  if (isSignedIn) {
    return <UserMenu />
  }

  return (
    <AuthDialog
      open={open}
      onOpenChange={setOpen}
      defaultMode={mode}
      trigger={
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 cursor-pointer rounded-md px-2.5 text-[12.5px] font-medium"
          onClick={() => setMode("sign-in")}
        >
          Sign in
        </Button>
      }
    />
  )
}

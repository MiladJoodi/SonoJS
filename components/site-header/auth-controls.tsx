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

/**
 * Header auth chrome.
 * Server session hint → instant Sign in / avatar shell before Clerk JS finishes.
 */
export function AuthControls({
  initialSignedIn = false,
}: {
  /** From server auth cookie — first paint without waiting on Clerk JS. */
  initialSignedIn?: boolean
}) {
  const { isLoaded, isSignedIn } = useAuth()
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState<AuthDialogMode>("sign-in")

  useEnsureUserPlan()

  React.useEffect(() => {
    if (isSignedIn && open) setOpen(false)
  }, [isSignedIn, open])

  const signedIn = isLoaded ? Boolean(isSignedIn) : initialSignedIn

  if (signedIn) {
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
          aria-busy={!isLoaded}
        >
          Sign in
        </Button>
      }
    />
  )
}

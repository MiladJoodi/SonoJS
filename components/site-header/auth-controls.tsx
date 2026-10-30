"use client"

import * as React from "react"
import { useAuth } from "@clerk/nextjs"

import {
  AuthDialog,
  type AuthDialogMode,
  UserMenu,
} from "@/components/auth"
import { Button } from "@sonojs/ui/components/button"
import { Skeleton } from "@sonojs/ui/components/skeleton"

/** Header auth — one control; dialog switches sign-in ↔ sign-up. */
export function AuthControls() {
  const { isLoaded, isSignedIn } = useAuth()
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState<AuthDialogMode>("sign-in")

  // Close the auth dialog as soon as the session becomes active (e.g. OAuth popup).
  React.useEffect(() => {
    if (isSignedIn && open) setOpen(false)
  }, [isSignedIn, open])

  return (
    <>
      {!isLoaded ? (
        <Skeleton
          className="size-8 shrink-0 rounded-full"
          aria-hidden
          aria-busy="true"
        />
      ) : isSignedIn ? (
        <UserMenu />
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 cursor-pointer rounded-md px-2.5 text-[12.5px] font-medium"
          onClick={() => {
            setMode("sign-in")
            setOpen(true)
          }}
        >
          Sign in
        </Button>
      )}
      <AuthDialog open={open} onOpenChange={setOpen} defaultMode={mode} />
    </>
  )
}

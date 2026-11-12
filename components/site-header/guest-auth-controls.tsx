"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@sonojs/ui/components/button"

type AuthDialogComp = typeof import("@/components/auth/auth-dialog").AuthDialog
type AuthDialogMode = "sign-in" | "sign-up" | "forgot-password"

/**
 * Signed-out header auth - no Clerk hooks.
 * Auth dialog (and its UI Dialog chunk) loads only when Sign in is opened.
 */
export function GuestAuthControls() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState<AuthDialogMode>("sign-in")
  const [AuthDialog, setAuthDialog] = React.useState<AuthDialogComp | null>(
    null
  )

  const openSignIn = React.useCallback(() => {
    setMode("sign-in")
    setOpen(true)
    if (AuthDialog) return
    void import("@/components/auth/auth-dialog")
      .then((mod) => {
        setAuthDialog(() => mod.AuthDialog)
      })
      .catch(() => {
        /* dialog optional until retry */
      })
  }, [AuthDialog])

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 cursor-pointer rounded-md px-2.5 text-[12.5px] font-medium"
        onClick={openSignIn}
      >
        Sign in
      </Button>
      {AuthDialog ? (
        <AuthDialog
          open={open}
          onOpenChange={setOpen}
          defaultMode={mode}
          onSuccess={() => {
            router.refresh()
          }}
        />
      ) : null}
    </>
  )
}

"use client"

import * as React from "react"

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { SignInForm } from "@/components/auth/sign-in-form"
import { SignUpForm } from "@/components/auth/sign-up-form"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@sonojs/ui/components/dialog"

export type AuthDialogMode = "sign-in" | "sign-up" | "forgot-password"

export function AuthDialog({
  open,
  onOpenChange,
  defaultMode = "sign-in",
  trigger,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultMode?: AuthDialogMode
  /** Prefer DialogTrigger so the open click does not dismiss the overlay. */
  trigger?: React.ReactNode
}) {
  const [mode, setMode] = React.useState<AuthDialogMode>(defaultMode)

  React.useEffect(() => {
    if (open) setMode(defaultMode)
  }, [open, defaultMode])

  const close = React.useCallback(() => onOpenChange(false), [onOpenChange])

  const title =
    mode === "sign-up"
      ? "Create an account"
      : mode === "forgot-password"
        ? "Forgot password"
        : "Sign in"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        showCloseButton
        className="gap-0 overflow-y-auto border-border/70 p-6 sm:p-8"
        style={{ maxWidth: "min(28rem, calc(100% - 2rem))" }}
        onOpenAutoFocus={(event) => {
          // Avoid stealing focus in a way that can bounce the dialog closed.
          event.preventDefault()
          const root = event.currentTarget
          const focusable = root.querySelector<HTMLElement>(
            "input:not([disabled]),button:not([disabled])"
          )
          focusable?.focus()
        }}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {mode === "sign-in" ? (
          <SignInForm
            layout="plain"
            onSwitchMode={() => setMode("sign-up")}
            onForgotPassword={() => setMode("forgot-password")}
            onSuccess={close}
          />
        ) : mode === "sign-up" ? (
          <SignUpForm
            layout="plain"
            onSwitchMode={() => setMode("sign-in")}
            onSuccess={close}
          />
        ) : (
          <ForgotPasswordForm
            layout="plain"
            onBackToSignIn={() => setMode("sign-in")}
            onSuccess={close}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

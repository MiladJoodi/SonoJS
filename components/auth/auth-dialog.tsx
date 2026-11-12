"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@sonojs/ui/components/dialog"
import { Spinner } from "@sonojs/ui/components/spinner"

export type AuthDialogMode = "sign-in" | "sign-up" | "forgot-password"

type SignInFormComp = typeof import("./sign-in-form").SignInForm
type SignUpFormComp = typeof import("./sign-up-form").SignUpForm
type ForgotPasswordFormComp =
  typeof import("./forgot-password-form").ForgotPasswordForm

type AuthForms = {
  SignInForm: SignInFormComp
  SignUpForm: SignUpFormComp
  ForgotPasswordForm: ForgotPasswordFormComp
}

function AuthFormSkeleton() {
  return (
    <div
      className="flex min-h-[22rem] w-full items-center justify-center"
      aria-busy
      aria-label="Loading sign in"
    >
      <Spinner className="size-5 text-muted-foreground" />
    </div>
  )
}

/**
 * Auth modal - form modules load only after the dialog opens so signed-out
 * pages do not pay for SignIn/SignUp/ForgotPassword up front.
 */
export function AuthDialog({
  open,
  onOpenChange,
  defaultMode = "sign-in",
  trigger,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultMode?: AuthDialogMode
  /** Prefer DialogTrigger so the open click does not dismiss the overlay. */
  trigger?: React.ReactNode
  /** After a successful sign-in / sign-up (dialog already closed). */
  onSuccess?: () => void
}) {
  const [mode, setMode] = React.useState<AuthDialogMode>(defaultMode)
  const [forms, setForms] = React.useState<AuthForms | null>(null)

  React.useEffect(() => {
    if (open) setMode(defaultMode)
  }, [open, defaultMode])

  React.useEffect(() => {
    if (!open || forms) return

    let cancelled = false
    Promise.all([
      import("@/components/auth/sign-in-form"),
      import("@/components/auth/sign-up-form"),
      import("@/components/auth/forgot-password-form"),
    ])
      .then(([signIn, signUp, forgot]) => {
        if (cancelled) return
        setForms({
          SignInForm: signIn.SignInForm,
          SignUpForm: signUp.SignUpForm,
          ForgotPasswordForm: forgot.ForgotPasswordForm,
        })
      })
      .catch(() => {
        /* keep skeleton */
      })

    return () => {
      cancelled = true
    }
  }, [open, forms])

  const handleSuccess = React.useCallback(() => {
    onOpenChange(false)
    onSuccess?.()
  }, [onOpenChange, onSuccess])

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
          const root = event.currentTarget as HTMLElement | null
          const focusable = root?.querySelector<HTMLElement>(
            "input:not([disabled]),button:not([disabled])"
          )
          focusable?.focus()
        }}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {!open ? null : !forms ? (
          <AuthFormSkeleton />
        ) : mode === "sign-in" ? (
          <forms.SignInForm
            layout="plain"
            onSwitchMode={() => setMode("sign-up")}
            onForgotPassword={() => setMode("forgot-password")}
            onSuccess={handleSuccess}
          />
        ) : mode === "sign-up" ? (
          <forms.SignUpForm
            layout="plain"
            onSwitchMode={() => setMode("sign-in")}
            onSuccess={handleSuccess}
          />
        ) : (
          <forms.ForgotPasswordForm
            layout="plain"
            onBackToSignIn={() => setMode("sign-in")}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

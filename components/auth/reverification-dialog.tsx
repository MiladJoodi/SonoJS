"use client"

import * as React from "react"
import { useSession } from "@clerk/nextjs"
import { isClerkAPIResponseError } from "@clerk/nextjs/errors"
import type {
  EmailCodeFactor,
  PasswordFactor,
  SessionVerificationLevel,
  SessionVerificationResource,
} from "@clerk/nextjs/types"

import { AuthCardHeader, AuthFieldError } from "@/components/auth/auth-card"
import { Button } from "@sonojs/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@sonojs/ui/components/dialog"
import { Input } from "@sonojs/ui/components/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@sonojs/ui/components/input-otp"
import { Label } from "@sonojs/ui/components/label"
import { Spinner } from "@sonojs/ui/components/spinner"

export type ReverificationRequest = {
  level: SessionVerificationLevel | undefined
  complete: () => void
  cancel: () => void
}

type FactorMode = "email_code" | "password" | "totp"

function clerkMessage(err: unknown, fallback: string) {
  if (isClerkAPIResponseError(err)) {
    return (
      err.errors[0]?.longMessage ||
      err.errors[0]?.message ||
      err.message ||
      fallback
    )
  }
  if (err instanceof Error && err.message) return err.message
  return fallback
}

function pickEmailFactor(
  verification: SessionVerificationResource
): EmailCodeFactor | undefined {
  return verification.supportedFirstFactors?.find(
    (factor): factor is EmailCodeFactor => factor.strategy === "email_code"
  )
}

function hasPasswordFactor(
  verification: SessionVerificationResource
): boolean {
  return Boolean(
    verification.supportedFirstFactors?.some(
      (factor): factor is PasswordFactor => factor.strategy === "password"
    )
  )
}

/**
 * SonoJS-styled step-up verification. Used via useReverification
 * `onNeedsReverification` so Clerk’s default modal never opens.
 */
export function ReverificationDialog({
  request,
  onDismiss,
}: {
  request: ReverificationRequest | null
  onDismiss: () => void
}) {
  const { session } = useSession()
  const open = request !== null

  const [mode, setMode] = React.useState<FactorMode | "loading" | "unavailable">(
    "loading"
  )
  const [emailFactor, setEmailFactor] = React.useState<EmailCodeFactor | null>(
    null
  )
  const [code, setCode] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)
  const startedRef = React.useRef(false)

  const resetLocal = React.useCallback(() => {
    setMode("loading")
    setEmailFactor(null)
    setCode("")
    setPassword("")
    setError(null)
    setBusy(false)
    startedRef.current = false
  }, [])

  React.useEffect(() => {
    if (!open) {
      resetLocal()
      return
    }

    if (!session || startedRef.current) return
    startedRef.current = true

    let cancelled = false

    void (async () => {
      try {
        const level = request?.level ?? "first_factor"
        const verification = await session.startVerification({ level })
        if (cancelled) return

        if (verification.status === "complete") {
          request?.complete()
          onDismiss()
          return
        }

        if (verification.status === "needs_first_factor") {
          const email = pickEmailFactor(verification)
          if (email) {
            await session.prepareFirstFactorVerification({
              strategy: "email_code",
              emailAddressId: email.emailAddressId,
            })
            if (cancelled) return
            setEmailFactor(email)
            setMode("email_code")
            return
          }

          if (hasPasswordFactor(verification)) {
            setMode("password")
            return
          }

          setMode("unavailable")
          setError("No verification method is available for this account.")
          return
        }

        if (verification.status === "needs_second_factor") {
          const totp = verification.supportedSecondFactors?.find(
            (factor) => factor.strategy === "totp"
          )
          if (totp) {
            setMode("totp")
            return
          }
          setMode("unavailable")
          setError("Additional verification is required but unavailable here.")
          return
        }

        setMode("unavailable")
        setError("Could not start verification.")
      } catch (err) {
        if (cancelled) return
        setMode("unavailable")
        setError(clerkMessage(err, "Could not start verification."))
      }
    })()

    return () => {
      cancelled = true
    }
  }, [open, session, request, onDismiss, resetLocal])

  const handleOpenChange = (next: boolean) => {
    if (next) return
    request?.cancel()
    onDismiss()
  }

  const finishIfComplete = (verification: SessionVerificationResource) => {
    if (verification.status === "complete") {
      request?.complete()
      onDismiss()
      return true
    }
    if (verification.status === "needs_second_factor") {
      const totp = verification.supportedSecondFactors?.find(
        (factor) => factor.strategy === "totp"
      )
      if (totp) {
        setCode("")
        setPassword("")
        setMode("totp")
        return true
      }
      setError("Additional verification is required but unavailable here.")
      return true
    }
    return false
  }

  const submitEmailCode = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!session || code.length < 6) return
    setBusy(true)
    setError(null)
    try {
      const verification = await session.attemptFirstFactorVerification({
        strategy: "email_code",
        code,
      })
      if (!finishIfComplete(verification)) {
        setError("Incorrect code. Try again.")
      }
    } catch (err) {
      setError(clerkMessage(err, "Incorrect code. Try again."))
    } finally {
      setBusy(false)
    }
  }

  const submitPassword = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!session || !password) return
    setBusy(true)
    setError(null)
    try {
      const verification = await session.attemptFirstFactorVerification({
        strategy: "password",
        password,
      })
      if (!finishIfComplete(verification)) {
        setError("Incorrect password. Try again.")
      }
    } catch (err) {
      setError(clerkMessage(err, "Incorrect password. Try again."))
    } finally {
      setBusy(false)
    }
  }

  const submitTotp = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!session || code.length < 6) return
    setBusy(true)
    setError(null)
    try {
      const verification = await session.attemptSecondFactorVerification({
        strategy: "totp",
        code,
      })
      if (!finishIfComplete(verification)) {
        setError("Incorrect code. Try again.")
      }
    } catch (err) {
      setError(clerkMessage(err, "Incorrect code. Try again."))
    } finally {
      setBusy(false)
    }
  }

  const resendEmailCode = async () => {
    if (!session || !emailFactor) return
    setBusy(true)
    setError(null)
    try {
      await session.prepareFirstFactorVerification({
        strategy: "email_code",
        emailAddressId: emailFactor.emailAddressId,
      })
    } catch (err) {
      setError(clerkMessage(err, "Could not resend the code."))
    } finally {
      setBusy(false)
    }
  }

  const title =
    mode === "password"
      ? "Confirm it’s you"
      : mode === "totp"
        ? "Authenticator code"
        : "Verify it’s you"

  const description =
    mode === "password"
      ? "Enter your password to continue."
      : mode === "totp"
        ? "Enter the code from your authenticator app."
        : mode === "email_code" && emailFactor
          ? `Enter the code we sent to ${emailFactor.safeIdentifier}.`
          : mode === "unavailable"
            ? "Verification could not continue."
            : "Preparing verification…"

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className="gap-0 overflow-y-auto border-border/70 p-6 sm:p-8"
        style={{ maxWidth: "min(28rem, calc(100% - 2rem))" }}
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          const root = event.currentTarget as HTMLElement | null
          const focusable = root?.querySelector<HTMLElement>(
            "input:not([disabled]),button:not([disabled])"
          )
          focusable?.focus()
        }}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="flex w-full flex-col gap-6">
          <AuthCardHeader title={title} description={description} />

          {mode === "loading" ? (
            <div className="flex items-center justify-center py-6">
              <Spinner className="size-5 text-muted-foreground" />
            </div>
          ) : null}

          {mode === "email_code" ? (
            <form className="flex flex-col gap-4" onSubmit={submitEmailCode}>
              <div className="grid gap-2">
                <Label htmlFor="reverify-email-code">Code</Label>
                <InputOTP
                  id="reverify-email-code"
                  maxLength={6}
                  value={code}
                  onChange={setCode}
                  disabled={busy}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <AuthFieldError message={error} />
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer shadow-none"
                disabled={busy || code.length < 6}
              >
                {busy ? <Spinner className="size-4" /> : "Continue"}
              </Button>
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <button
                  type="button"
                  className="cursor-pointer text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  disabled={busy}
                  onClick={() => void resendEmailCode()}
                >
                  Resend code
                </button>
                <button
                  type="button"
                  className="cursor-pointer text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  disabled={busy}
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : null}

          {mode === "password" ? (
            <form className="flex flex-col gap-4" onSubmit={submitPassword}>
              <div className="grid gap-2">
                <Label htmlFor="reverify-password">Password</Label>
                <Input
                  id="reverify-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={busy}
                  required
                  className="shadow-none"
                />
                <AuthFieldError message={error} />
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer shadow-none"
                disabled={busy || !password}
              >
                {busy ? <Spinner className="size-4" /> : "Continue"}
              </Button>
              <button
                type="button"
                className="cursor-pointer self-start text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                disabled={busy}
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </button>
            </form>
          ) : null}

          {mode === "totp" ? (
            <form className="flex flex-col gap-4" onSubmit={submitTotp}>
              <div className="grid gap-2">
                <Label htmlFor="reverify-totp">Code</Label>
                <InputOTP
                  id="reverify-totp"
                  maxLength={6}
                  value={code}
                  onChange={setCode}
                  disabled={busy}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <AuthFieldError message={error} />
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer shadow-none"
                disabled={busy || code.length < 6}
              >
                {busy ? <Spinner className="size-4" /> : "Continue"}
              </Button>
              <button
                type="button"
                className="cursor-pointer self-start text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                disabled={busy}
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </button>
            </form>
          ) : null}

          {mode === "unavailable" ? (
            <div className="flex flex-col gap-4">
              <AuthFieldError message={error} />
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer shadow-none"
                onClick={() => handleOpenChange(false)}
              >
                Close
              </Button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

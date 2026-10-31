"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth, useSignUp } from "@clerk/nextjs"

import {
  AuthCard,
  AuthCardHeader,
  AuthFieldError,
} from "@/components/auth/auth-card"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Spinner } from "@sonojs/ui/components/spinner"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@sonojs/ui/components/input-otp"

function navigateHome(
  router: ReturnType<typeof useRouter>,
  decorateUrl: (path: string) => string
) {
  const url = decorateUrl("/")
  if (url.startsWith("http")) {
    window.location.href = url
  } else {
    router.push(url)
  }
}

/** Finishes an in-progress OAuth / SSO sign-up (missing name, legal, email code, …). */
export function SignUpContinueForm() {
  const { isSignedIn } = useAuth()
  const { signUp, errors, fetchStatus } = useSignUp()
  const router = useRouter()
  const [code, setCode] = React.useState("")
  const [legalAccepted, setLegalAccepted] = React.useState(false)
  const [formError, setFormError] = React.useState<string | null>(null)
  const [emailCodeSent, setEmailCodeSent] = React.useState(false)
  const busy = fetchStatus === "fetching"
  const finishing = React.useRef(false)

  const finalize = React.useCallback(async () => {
    if (!signUp || finishing.current) return
    finishing.current = true
    try {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Session task pending — still leave the continue page.
            router.replace("/")
            return
          }
          navigateHome(router, decorateUrl)
        },
      })
      // Fallback if navigate did not run.
      if (!window.location.pathname.startsWith("/sign-up")) return
      router.replace("/")
    } catch (err) {
      console.error(err)
      setFormError("Could not finish sign-up. Try again.")
    } finally {
      finishing.current = false
    }
  }, [router, signUp])

  React.useEffect(() => {
    if (isSignedIn) {
      router.replace("/")
      return
    }
    if (!signUp) return
    if (signUp.status === "complete") {
      void finalize()
      return
    }
    if (signUp.status !== "missing_requirements") {
      router.replace("/sign-up")
    }
  }, [finalize, isSignedIn, router, signUp])

  if (
    !signUp ||
    isSignedIn ||
    signUp.status === "complete" ||
    signUp.status !== "missing_requirements"
  ) {
    return (
      <AuthCard className="items-center justify-center py-16">
        <Spinner className="size-5 text-muted-foreground" />
      </AuthCard>
    )
  }

  const missing = signUp.missingFields ?? []
  const missingKeys = missing as string[]
  const missingSet = new Set(missingKeys)
  const needsEmailCode =
    emailCodeSent || signUp.unverifiedFields.includes("email_address")
  const needsFirst = missingSet.has("first_name")
  const needsLast = missingSet.has("last_name")
  const needsLegal = missingSet.has("legal_acceptance")
  const needsPhone = missingSet.has("phone_number")
  const needsUsername = missingSet.has("username")
  const handled = new Set([
    "first_name",
    "last_name",
    "legal_acceptance",
    "phone_number",
    "password",
    "email_address",
    "username",
  ])
  const unknownMissing = missingKeys.filter((f) => !handled.has(f))

  const handleVerifyEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)
    const { error } = await signUp.verifications.verifyEmailCode({ code })
    if (error) {
      setFormError(error.message)
      return
    }
    if (signUp.status === "complete") {
      await finalize()
      return
    }
    setFormError(
      signUp.missingFields?.length
        ? `Still needed: ${signUp.missingFields.join(", ")}`
        : "Email verified, but sign-up is not complete yet."
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    if (needsLegal && !legalAccepted) {
      setFormError("Accept the terms to continue.")
      return
    }

    const form = new FormData(event.currentTarget)
    const payload: {
      firstName?: string
      lastName?: string
      phoneNumber?: string
      username?: string
      legalAccepted?: boolean
    } = {}

    if (needsFirst) payload.firstName = String(form.get("firstName") ?? "").trim()
    if (needsLast) payload.lastName = String(form.get("lastName") ?? "").trim()
    if (needsPhone) payload.phoneNumber = String(form.get("phoneNumber") ?? "").trim()
    if (needsUsername) {
      payload.username = String(form.get("username") ?? "").trim()
    }
    // Always send when required — OAuth continue often only needs this.
    if (needsLegal) payload.legalAccepted = true

    if (Object.keys(payload).length === 0 && unknownMissing.length === 0) {
      // Nothing to PATCH — try finalize anyway (edge status).
      if (signUp.status === "complete") {
        await finalize()
        return
      }
      setFormError(
        missing.length
          ? `Unsupported required fields: ${missing.join(", ")}`
          : "Nothing to update. Try signing in instead."
      )
      return
    }

    if (unknownMissing.length > 0 && Object.keys(payload).length === 0) {
      setFormError(`Unsupported required fields: ${unknownMissing.join(", ")}`)
      return
    }

    const { error } = await signUp.update(payload)
    if (error) {
      setFormError(error.message)
      console.error(JSON.stringify(error, null, 2))
      return
    }

    if (signUp.status === "complete") {
      await finalize()
      return
    }

    if (signUp.unverifiedFields.includes("email_address")) {
      const { error: codeError } = await signUp.verifications.sendEmailCode()
      if (codeError) {
        setFormError(codeError.message)
        return
      }
      setEmailCodeSent(true)
      return
    }

    setFormError(
      signUp.missingFields?.length
        ? `Still needed: ${signUp.missingFields.join(", ")}`
        : `Sign-up stuck in status: ${signUp.status}`
    )
  }

  if (needsEmailCode && missing.length === 0) {
    return (
      <AuthCard>
        <AuthCardHeader
          title="Verify your email"
          description="Enter the 6-digit code we sent you."
        />
        <form className="flex flex-col gap-4" onSubmit={handleVerifyEmail}>
          <div className="grid gap-2">
            <Label htmlFor="continue-code">Code</Label>
            <InputOTP
              id="continue-code"
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
            <AuthFieldError
              message={errors.fields.code?.message ?? formError}
            />
          </div>
          <Button type="submit" className="w-full shadow-none" disabled={busy}>
            {busy ? <Spinner className="size-4" /> : "Verify"}
          </Button>
          <button
            type="button"
            className="cursor-pointer text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            disabled={busy}
            onClick={() => void signUp.verifications.sendEmailCode()}
          >
            Resend code
          </button>
        </form>
        <div id="clerk-captcha" />
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <AuthCardHeader
        title="Almost done"
        description="Finish a couple of details to create your account."
      />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {(needsFirst || needsLast) && (
          <div className="grid gap-4 sm:grid-cols-2">
            {needsFirst ? (
              <div className="grid gap-2">
                <Label htmlFor="continue-first">First name</Label>
                <Input
                  id="continue-first"
                  name="firstName"
                  autoComplete="given-name"
                  defaultValue={signUp.firstName ?? ""}
                  required
                  disabled={busy}
                  className="shadow-none"
                />
                <AuthFieldError message={errors.fields.firstName?.message} />
              </div>
            ) : null}
            {needsLast ? (
              <div className="grid gap-2">
                <Label htmlFor="continue-last">Last name</Label>
                <Input
                  id="continue-last"
                  name="lastName"
                  autoComplete="family-name"
                  defaultValue={signUp.lastName ?? ""}
                  required
                  disabled={busy}
                  className="shadow-none"
                />
                <AuthFieldError message={errors.fields.lastName?.message} />
              </div>
            ) : null}
          </div>
        )}

        {needsPhone ? (
          <div className="grid gap-2">
            <Label htmlFor="continue-phone">Phone</Label>
            <Input
              id="continue-phone"
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              defaultValue={signUp.phoneNumber ?? ""}
              required
              disabled={busy}
              className="shadow-none"
            />
            <AuthFieldError message={errors.fields.phoneNumber?.message} />
          </div>
        ) : null}

        {needsUsername ? (
          <div className="grid gap-2">
            <Label htmlFor="continue-username">Username</Label>
            <Input
              id="continue-username"
              name="username"
              autoComplete="username"
              defaultValue={signUp.username ?? ""}
              required
              disabled={busy}
              className="shadow-none"
            />
            <AuthFieldError message={errors.fields.username?.message} />
          </div>
        ) : null}

        {needsLegal ? (
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <Checkbox
              checked={legalAccepted}
              onCheckedChange={(v) => setLegalAccepted(v === true)}
              disabled={busy}
              className="mt-0.5"
              required
            />
            <span className="text-muted-foreground">
              I agree to the terms of service and privacy policy.
            </span>
          </label>
        ) : null}

        {unknownMissing.length > 0 ? (
          <p className="text-sm text-destructive">
            Extra required fields from Clerk: {unknownMissing.join(", ")}. Check
            Dashboard → User & authentication.
          </p>
        ) : null}

        <Button type="submit" className="mt-1 w-full shadow-none" disabled={busy}>
          {busy ? <Spinner className="size-4" /> : "Continue"}
        </Button>
        <AuthFieldError
          message={formError ?? errors.global?.[0]?.message ?? null}
        />
      </form>

      {/* Bot / CAPTCHA mount for Clerk challenges */}
      <div id="clerk-captcha" />

      <p className="text-center text-sm text-muted-foreground">
        <Link
          href="/sign-in"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Back to sign in
        </Link>
      </p>
    </AuthCard>
  )
}

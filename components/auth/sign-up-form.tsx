"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth, useSignUp } from "@clerk/nextjs"

import {
  AuthCard,
  AuthCardHeader,
  AuthFieldError,
  type AuthFormProps,
} from "@/components/auth/auth-card"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Spinner } from "@sonojs/ui/components/spinner"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@sonojs/ui/components/input-otp"

function navigateAfterAuth(
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

export function SignUpForm({
  layout = "card",
  onSwitchMode,
  onSuccess,
}: AuthFormProps = {}) {
  const { isSignedIn } = useAuth()
  const { signUp, errors, fetchStatus } = useSignUp()
  const router = useRouter()
  const [code, setCode] = React.useState("")
  const busy = fetchStatus === "fetching"

  React.useEffect(() => {
    if (!isSignedIn) return
    if (onSuccess) {
      onSuccess()
      return
    }
    router.replace("/")
  }, [isSignedIn, onSuccess, router])

  if (!signUp || isSignedIn) {
    return (
      <AuthCard layout={layout} className="items-center justify-center py-16">
        <Spinner className="size-5 text-muted-foreground" />
      </AuthCard>
    )
  }

  const needsEmailCode =
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const firstName = String(form.get("firstName") ?? "")
    const lastName = String(form.get("lastName") ?? "")
    const emailAddress = String(form.get("email") ?? "")
    const password = String(form.get("password") ?? "")

    const { error } = await signUp.password({
      emailAddress,
      password,
      firstName,
      lastName,
    })
    if (error) return
    await signUp.verifications.sendEmailCode()
  }

  const handleVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await signUp.verifications.verifyEmailCode({ code })
    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) return
          if (onSuccess) {
            onSuccess()
            return
          }
          navigateAfterAuth(router, decorateUrl)
        },
      })
    }
  }

  if (needsEmailCode) {
    return (
      <AuthCard layout={layout}>
        <AuthCardHeader
          title="Verify your email"
          description="Enter the 6-digit code we sent you."
        />
        <form className="flex flex-col gap-4" onSubmit={handleVerify}>
          <div className="grid gap-2">
            <Label htmlFor="sign-up-code">Code</Label>
            <InputOTP
              id="sign-up-code"
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
            <AuthFieldError message={errors.fields.code?.message} />
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
      </AuthCard>
    )
  }

  return (
    <AuthCard layout={layout}>
      <AuthCardHeader
        title="Create an account"
        description="Name, email, and a password. That’s all."
      />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="sign-up-first">First name</Label>
            <Input
              id="sign-up-first"
              name="firstName"
              autoComplete="given-name"
              placeholder="Cameron"
              required
              disabled={busy}
              className="shadow-none"
            />
            <AuthFieldError message={errors.fields.firstName?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sign-up-last">Last name</Label>
            <Input
              id="sign-up-last"
              name="lastName"
              autoComplete="family-name"
              placeholder="Williamson"
              required
              disabled={busy}
              className="shadow-none"
            />
            <AuthFieldError message={errors.fields.lastName?.message} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sign-up-email">Email</Label>
          <Input
            id="sign-up-email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="name@example.com"
            required
            disabled={busy}
            className="shadow-none"
          />
          <AuthFieldError message={errors.fields.emailAddress?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sign-up-password">Password</Label>
          <Input
            id="sign-up-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            required
            disabled={busy}
            className="shadow-none"
          />
          <AuthFieldError message={errors.fields.password?.message} />
        </div>
        <Button type="submit" className="mt-1 w-full shadow-none" disabled={busy}>
          {busy ? <Spinner className="size-4" /> : "Create account"}
        </Button>
        {errors.global?.[0] ? (
          <AuthFieldError message={errors.global[0].message} />
        ) : null}
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        {onSwitchMode ? (
          <button
            type="button"
            className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            onClick={onSwitchMode}
          >
            Sign in
          </button>
        ) : (
          <Link
            href="/sign-in"
            className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        )}
      </p>
    </AuthCard>
  )
}

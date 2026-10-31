"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth, useSignIn } from "@clerk/nextjs"

import {
  AuthCard,
  AuthCardHeader,
  AuthFieldError,
  type AuthFormProps,
} from "@/components/auth/auth-card"
import { getAuthReturnPath } from "@/lib/auth-return-path"
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
  const url = decorateUrl(getAuthReturnPath())
  if (url.startsWith("http")) {
    window.location.href = url
  } else {
    router.push(url)
  }
}

export type ForgotPasswordFormProps = AuthFormProps & {
  /** Return to sign-in (dialog) instead of routing. */
  onBackToSignIn?: () => void
}

export function ForgotPasswordForm({
  layout = "card",
  onSuccess,
  onBackToSignIn,
}: ForgotPasswordFormProps = {}) {
  const { isSignedIn } = useAuth()
  const { signIn, errors, fetchStatus } = useSignIn()
  const router = useRouter()
  const [emailAddress, setEmailAddress] = React.useState("")
  const [code, setCode] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [codeSent, setCodeSent] = React.useState(false)
  const busy = fetchStatus === "fetching"

  React.useEffect(() => {
    if (!isSignedIn) return
    if (onSuccess) {
      onSuccess()
      router.refresh()
      return
    }
    router.replace(getAuthReturnPath())
  }, [isSignedIn, onSuccess, router])

  if (!signIn || isSignedIn) {
    return (
      <AuthCard layout={layout} className="items-center justify-center py-16">
        <Spinner className="size-5 text-muted-foreground" />
      </AuthCard>
    )
  }

  const finalize = async () => {
    await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) return
        router.refresh()
        if (onSuccess) {
          onSuccess()
          return
        }
        navigateAfterAuth(router, decorateUrl)
      },
    })
  }

  const sendCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { error: createError } = await signIn.create({
      identifier: emailAddress,
    })
    if (createError) return

    const { error: sendError } =
      await signIn.resetPasswordEmailCode.sendCode()
    if (sendError) return

    setCodeSent(true)
  }

  const verifyCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await signIn.resetPasswordEmailCode.verifyCode({ code })
  }

  const submitNewPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password,
      signOutOfOtherSessions: true,
    })
    if (error) return

    if (signIn.status === "complete") {
      await finalize()
    }
  }

  const backLink = onBackToSignIn ? (
    <button
      type="button"
      className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
      onClick={() => {
        void signIn.reset()
        onBackToSignIn()
      }}
    >
      Back to sign in
    </button>
  ) : (
    <Link
      href="/sign-in"
      className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
    >
      Back to sign in
    </Link>
  )

  if (signIn.status === "needs_new_password") {
    return (
      <AuthCard layout={layout}>
        <AuthCardHeader
          title="Choose a new password"
          description="Enter a new password for your account."
        />
        <form className="flex flex-col gap-4" onSubmit={submitNewPassword}>
          <div className="grid gap-2">
            <Label htmlFor="forgot-password-new">New password</Label>
            <Input
              id="forgot-password-new"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              required
              disabled={busy}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-none"
            />
            <AuthFieldError message={errors.fields.password?.message} />
          </div>
          <Button type="submit" className="w-full shadow-none" disabled={busy}>
            {busy ? <Spinner className="size-4" /> : "Update password"}
          </Button>
          {errors.global?.[0] ? (
            <AuthFieldError message={errors.global[0].message} />
          ) : null}
        </form>
        <p className="text-center text-sm text-muted-foreground">{backLink}</p>
      </AuthCard>
    )
  }

  if (codeSent) {
    return (
      <AuthCard layout={layout}>
        <AuthCardHeader
          title="Check your email"
          description="Enter the reset code we sent you."
        />
        <form className="flex flex-col gap-4" onSubmit={verifyCode}>
          <div className="grid gap-2">
            <Label htmlFor="forgot-password-code">Code</Label>
            <InputOTP
              id="forgot-password-code"
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
            {busy ? <Spinner className="size-4" /> : "Verify code"}
          </Button>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <button
              type="button"
              className="cursor-pointer text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              disabled={busy}
              onClick={() => void signIn.resetPasswordEmailCode.sendCode()}
            >
              Resend code
            </button>
            <button
              type="button"
              className="cursor-pointer text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              disabled={busy}
              onClick={() => {
                void signIn.reset()
                setCodeSent(false)
                setCode("")
              }}
            >
              Start over
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-muted-foreground">{backLink}</p>
      </AuthCard>
    )
  }

  return (
    <AuthCard layout={layout}>
      <AuthCardHeader
        title="Forgot password?"
        description="We’ll email you a code to reset it."
      />
      <form className="flex flex-col gap-4" onSubmit={sendCode}>
        <div className="grid gap-2">
          <Label htmlFor="forgot-password-email">Email</Label>
          <Input
            id="forgot-password-email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="name@example.com"
            required
            disabled={busy}
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="shadow-none"
          />
          <AuthFieldError message={errors.fields.identifier?.message} />
        </div>
        <Button type="submit" className="mt-1 w-full shadow-none" disabled={busy}>
          {busy ? <Spinner className="size-4" /> : "Send reset code"}
        </Button>
        {errors.global?.[0] ? (
          <AuthFieldError message={errors.global[0].message} />
        ) : null}
      </form>
      <p className="text-center text-sm text-muted-foreground">{backLink}</p>
    </AuthCard>
  )
}

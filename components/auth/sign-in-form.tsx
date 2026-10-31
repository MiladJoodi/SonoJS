"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth, useSignIn } from "@clerk/nextjs"

import { GithubIcon } from "@/registry/icons/github"
import { GoogleIcon } from "@/registry/icons/google"
import {
  AuthCard,
  AuthCardHeader,
  AuthFieldError,
  type AuthFormProps,
} from "@/components/auth/auth-card"
import {
  getAuthReturnPath,
  rememberAuthReturnPath,
} from "@/lib/auth-return-path"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
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

export function SignInForm({
  layout = "card",
  onSwitchMode,
  onSuccess,
  onForgotPassword,
}: AuthFormProps = {}) {
  const { isSignedIn } = useAuth()
  const { signIn, errors, fetchStatus } = useSignIn()
  const router = useRouter()
  const [code, setCode] = React.useState("")
  const [emailAddress, setEmailAddress] = React.useState("")
  const [magicLinkSent, setMagicLinkSent] = React.useState(false)
  const [magicLinkError, setMagicLinkError] = React.useState<string | null>(
    null
  )
  const [oauthError, setOauthError] = React.useState<string | null>(null)
  const busy = fetchStatus === "fetching"
  const magicLinkAbort = React.useRef(false)

  React.useEffect(() => {
    if (!isSignedIn) return
    if (onSuccess) {
      onSuccess()
      router.refresh()
      return
    }
    router.replace(getAuthReturnPath())
  }, [isSignedIn, onSuccess, router])

  React.useEffect(() => {
    return () => {
      magicLinkAbort.current = true
    }
  }, [])

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

  const handlePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = String(form.get("email") ?? emailAddress)
    const password = String(form.get("password") ?? "")

    const { error } = await signIn.password({
      emailAddress: email,
      password,
    })
    if (error) return

    if (signIn.status === "complete") {
      await finalize()
      return
    }

    if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors?.find(
        (factor) => factor.strategy === "email_code"
      )
      if (emailCodeFactor) await signIn.mfa.sendEmailCode()
    }
  }

  const handleMagicLink = async () => {
    const email = emailAddress.trim()
    if (!email) {
      setMagicLinkError("Enter your email first.")
      return
    }

    magicLinkAbort.current = false
    setMagicLinkError(null)

    const verificationUrl = `${window.location.origin}/sign-in/verify`
    const { error } = await signIn.emailLink.sendLink({
      emailAddress: email,
      verificationUrl,
    })
    if (error) {
      setMagicLinkError(error.message)
      return
    }

    setMagicLinkSent(true)

    const { error: waitError } = await signIn.emailLink.waitForVerification()
    if (magicLinkAbort.current) return
    if (waitError) {
      setMagicLinkSent(false)
      setMagicLinkError(waitError.message)
      return
    }

    if (signIn.firstFactorVerification.status === "expired") {
      setMagicLinkSent(false)
      setMagicLinkError("That link expired. Request a new one.")
      return
    }

    if (signIn.status === "complete") {
      await finalize()
    }
  }

  const cancelMagicLink = async () => {
    magicLinkAbort.current = true
    setMagicLinkSent(false)
    setMagicLinkError(null)
    await signIn.reset()
  }

  const handleVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await signIn.mfa.verifyEmailCode({ code })
    if (signIn.status === "complete") await finalize()
  }

  const handleOAuth = async (strategy: "oauth_google" | "oauth_github") => {
    setOauthError(null)
    // Full-page redirect — reliable with Google/GitHub (no popup / COOP).
    const returnTo = rememberAuthReturnPath()
    const { error } = await signIn.sso({
      strategy,
      redirectCallbackUrl: "/sso-callback",
      redirectUrl: returnTo,
    })
    if (error) {
      setOauthError(error.message)
      console.error(JSON.stringify(error, null, 2))
    }
  }

  if (signIn.status === "needs_client_trust") {
    return (
      <AuthCard layout={layout}>
        <AuthCardHeader
          title="Verify it’s you"
          description="Enter the code we sent to your email."
        />
        <form className="flex flex-col gap-4" onSubmit={handleVerify}>
          <div className="grid gap-2">
            <Label htmlFor="sign-in-code">Code</Label>
            <InputOTP
              id="sign-in-code"
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
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <button
              type="button"
              className="cursor-pointer text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              disabled={busy}
              onClick={() => void signIn.mfa.sendEmailCode()}
            >
              Resend code
            </button>
            <button
              type="button"
              className="cursor-pointer text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              disabled={busy}
              onClick={() => void signIn.reset()}
            >
              Start over
            </button>
          </div>
        </form>
      </AuthCard>
    )
  }

  if (magicLinkSent) {
    return (
      <AuthCard layout={layout}>
        <AuthCardHeader
          title="Check your email"
          description={`We sent a magic link to ${emailAddress || "your inbox"}. Open it to finish signing in.`}
        />
        <div className="flex flex-col items-center gap-4 py-2">
          <Spinner className="size-5 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            Waiting for you to open the link…
          </p>
          <button
            type="button"
            className="cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            onClick={() => void cancelMagicLink()}
          >
            Start over
          </button>
        </div>
      </AuthCard>
    )
  }

  const forgotControl = onForgotPassword ? (
    <button
      type="button"
      className="ms-auto cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      onClick={onForgotPassword}
    >
      Forgot password?
    </button>
  ) : (
    <Link
      href="/forgot-password"
      className="ms-auto cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
    >
      Forgot password?
    </Link>
  )

  return (
    <AuthCard layout={layout}>
      <AuthCardHeader
        title="Sign in"
        description="Password, magic link, or a social account."
      />

      <form className="flex flex-col gap-4" onSubmit={handlePassword}>
        <div className="grid gap-2">
          <Label htmlFor="sign-in-email">Email</Label>
          <Input
            id="sign-in-email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="name@example.com"
            required
            disabled={busy}
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value)
              if (magicLinkError) setMagicLinkError(null)
            }}
            className="shadow-none"
          />
          <AuthFieldError
            message={
              errors.fields.identifier?.message ?? magicLinkError
            }
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-3">
            <Label htmlFor="sign-in-password">Password</Label>
            {forgotControl}
          </div>
          <Input
            id="sign-in-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
            disabled={busy}
            className="shadow-none"
          />
          <AuthFieldError message={errors.fields.password?.message} />
        </div>
        <Button type="submit" className="mt-1 w-full shadow-none" disabled={busy}>
          {busy ? <Spinner className="size-4" /> : "Sign in"}
        </Button>
        {errors.global?.[0] ? (
          <AuthFieldError message={errors.global[0].message} />
        ) : null}
      </form>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          className="border-border/70 bg-card shadow-none hover:bg-muted"
          disabled={busy}
          onClick={() => void handleOAuth("oauth_google")}
        >
          <GoogleIcon />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-border/70 bg-card shadow-none hover:bg-muted"
          disabled={busy}
          onClick={() => void handleOAuth("oauth_github")}
        >
          <GithubIcon />
          GitHub
        </Button>
      </div>
      {oauthError ? <AuthFieldError message={oauthError} /> : null}

      <Button
        type="button"
        variant="outline"
        className="w-full border-border/70 bg-card shadow-none hover:bg-muted"
        disabled={busy}
        onClick={() => void handleMagicLink()}
      >
        {busy ? <Spinner className="size-4" /> : "Email me a magic link"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        New here?{" "}
        {onSwitchMode ? (
          <button
            type="button"
            className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            onClick={onSwitchMode}
          >
            Create an account
          </button>
        ) : (
          <Link
            href="/sign-up"
            className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        )}
      </p>
    </AuthCard>
  )
}

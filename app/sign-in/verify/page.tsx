"use client"

import * as React from "react"
import Link from "next/link"
import { useSignIn } from "@clerk/nextjs"

import { AuthCard, AuthCardHeader, AuthPageShell } from "@/components/auth"
import { Spinner } from "@sonojs/ui/components/spinner"

export default function SignInEmailLinkVerifyPage() {
  const { signIn } = useSignIn()
  const verification = signIn?.emailLink.verification
  const [waited, setWaited] = React.useState(false)

  React.useEffect(() => {
    const t = window.setTimeout(() => setWaited(true), 2500)
    return () => window.clearTimeout(t)
  }, [])

  if (!signIn) {
    return (
      <AuthPageShell>
        <AuthCard className="items-center justify-center py-16">
          <Spinner className="size-5 text-muted-foreground" />
        </AuthCard>
      </AuthPageShell>
    )
  }

  if (!verification) {
    return (
      <AuthPageShell>
        <AuthCard>
          {waited ? (
            <>
              <AuthCardHeader
                title="No link to verify"
                description="Open the magic link from your email, or request a new one."
              />
              <Link
                href="/sign-in"
                className="cursor-pointer text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                Back to sign in
              </Link>
            </>
          ) : (
            <div className="flex items-center justify-center py-16">
              <Spinner className="size-5 text-muted-foreground" />
            </div>
          )}
        </AuthCard>
      </AuthPageShell>
    )
  }

  if (verification.status === "failed") {
    return (
      <AuthPageShell>
        <AuthCard>
          <AuthCardHeader
            title="Link failed"
            description="This email link could not be verified."
          />
          <Link
            href="/sign-in"
            className="cursor-pointer text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Back to sign in
          </Link>
        </AuthCard>
      </AuthPageShell>
    )
  }

  if (verification.status === "expired") {
    return (
      <AuthPageShell>
        <AuthCard>
          <AuthCardHeader
            title="Link expired"
            description="Request a new magic link from the sign-in page."
          />
          <Link
            href="/sign-in"
            className="cursor-pointer text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Back to sign in
          </Link>
        </AuthCard>
      </AuthPageShell>
    )
  }

  if (verification.status === "client_mismatch") {
    return (
      <AuthPageShell>
        <AuthCard>
          <AuthCardHeader
            title="Wrong browser"
            description="Open the link on the same device and browser where you started sign-in."
          />
          <Link
            href="/sign-in"
            className="cursor-pointer text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Back to sign in
          </Link>
        </AuthCard>
      </AuthPageShell>
    )
  }

  return (
    <AuthPageShell>
      <AuthCard>
        <AuthCardHeader
          title="You’re signed in"
          description="You can close this tab and return to the app."
        />
      </AuthCard>
    </AuthPageShell>
  )
}

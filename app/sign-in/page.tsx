import type { Metadata } from "next"

import { AuthPageShell } from "@/components/auth/auth-card"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
  alternates: { canonical: "/sign-in" },
}

export default function SignInPage() {
  return (
    <AuthPageShell>
      <SignInForm />
    </AuthPageShell>
  )
}

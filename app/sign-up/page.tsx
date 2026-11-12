import type { Metadata } from "next"

import { AuthPageShell } from "@/components/auth/auth-card"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign up",
  robots: { index: false, follow: false },
  alternates: { canonical: "/sign-up" },
}

export default function SignUpPage() {
  return (
    <AuthPageShell>
      <SignUpForm />
    </AuthPageShell>
  )
}

import type { Metadata } from "next"

import { AuthPageShell, SignInForm } from "@/components/auth"

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

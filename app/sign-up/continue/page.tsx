import type { Metadata } from "next"

import { AuthPageShell, SignUpContinueForm } from "@/components/auth"

export const metadata: Metadata = {
  title: "Continue sign up",
  robots: { index: false, follow: false },
  alternates: { canonical: "/sign-up/continue" },
}

export default function SignUpContinuePage() {
  return (
    <AuthPageShell>
      <SignUpContinueForm />
    </AuthPageShell>
  )
}

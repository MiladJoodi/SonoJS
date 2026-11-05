import type { Metadata } from "next"

import { AuthPageShell, SignUpForm } from "@/components/auth"

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

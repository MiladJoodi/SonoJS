import type { Metadata } from "next"

import { AuthPageShell } from "@/components/auth/auth-card"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot password",
  robots: { index: false, follow: false },
  alternates: { canonical: "/forgot-password" },
}

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell>
      <ForgotPasswordForm />
    </AuthPageShell>
  )
}

import type { Metadata } from "next"

import { AuthPageShell, ForgotPasswordForm } from "@/components/auth"

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

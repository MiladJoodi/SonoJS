import { AuthPageShell, ForgotPasswordForm } from "@/components/auth"

export const metadata = {
  title: "Forgot password",
}

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell>
      <ForgotPasswordForm />
    </AuthPageShell>
  )
}

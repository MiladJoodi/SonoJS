import { AuthPageShell, SignUpContinueForm } from "@/components/auth"

export const metadata = {
  title: "Continue sign up",
}

export default function SignUpContinuePage() {
  return (
    <AuthPageShell>
      <SignUpContinueForm />
    </AuthPageShell>
  )
}

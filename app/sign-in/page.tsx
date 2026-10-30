import { AuthPageShell, SignInForm } from "@/components/auth"

export const metadata = {
  title: "Sign in",
}

export default function SignInPage() {
  return (
    <AuthPageShell>
      <SignInForm />
    </AuthPageShell>
  )
}

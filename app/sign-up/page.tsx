import { AuthPageShell, SignUpForm } from "@/components/auth"

export const metadata = {
  title: "Sign up",
}

export default function SignUpPage() {
  return (
    <AuthPageShell>
      <SignUpForm />
    </AuthPageShell>
  )
}

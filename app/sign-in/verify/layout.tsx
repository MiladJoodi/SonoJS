import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Verify sign-in",
  robots: { index: false, follow: false },
  alternates: { canonical: "/sign-in/verify" },
}

export default function SignInVerifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

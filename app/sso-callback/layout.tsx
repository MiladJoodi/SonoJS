import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign-in callback",
  robots: { index: false, follow: false },
  alternates: { canonical: "/sso-callback" },
}

export default function SsoCallbackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

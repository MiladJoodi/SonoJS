import type { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { AccountSettings } from "@/components/auth/account-settings"

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
}

export default async function AccountPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  return <AccountSettings />
}

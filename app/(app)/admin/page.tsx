import type { Metadata } from "next"

import { AdminOverview } from "@/components/admin/admin-overview"
import { withAdminPage } from "@/lib/admin-page"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
}

export default async function AdminPage() {
  return withAdminPage("/admin", () => <AdminOverview />)
}

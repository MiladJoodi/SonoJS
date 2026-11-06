import type { Metadata } from "next"

import { AdminUsersPanel } from "@/components/admin/admin-users-panel"
import { withAdminPage } from "@/lib/admin-page"

export const metadata: Metadata = {
  title: "Admin · Users",
  robots: { index: false, follow: false },
}

export default async function AdminUsersPage() {
  return withAdminPage("/admin/users", () => <AdminUsersPanel />)
}

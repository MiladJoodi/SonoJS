import type { Metadata } from "next"

import { AdminAccessPanel } from "@/components/admin/admin-access-panel"
import { withAdminPage } from "@/lib/admin-page"

export const metadata: Metadata = {
  title: "Admin · Access",
  robots: { index: false, follow: false },
}

export default async function AdminAccessPage() {
  return withAdminPage("/admin/access", () => <AdminAccessPanel />)
}

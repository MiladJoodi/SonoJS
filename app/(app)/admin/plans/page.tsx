import type { Metadata } from "next"

import { AdminPlansPanel } from "@/components/admin/admin-plans-panel"
import { withAdminPage } from "@/lib/admin-page"

export const metadata: Metadata = {
  title: "Admin · Plans",
  robots: { index: false, follow: false },
}

export default async function AdminPlansPage() {
  return withAdminPage("/admin/plans", () => <AdminPlansPanel />)
}

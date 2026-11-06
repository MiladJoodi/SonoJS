import type { Metadata } from "next"

import { AdminPaymentsPanel } from "@/components/admin/admin-payments-panel"
import { withAdminPage } from "@/lib/admin-page"

export const metadata: Metadata = {
  title: "Admin · Payments",
  robots: { index: false, follow: false },
}

export default async function AdminPaymentsPage() {
  return withAdminPage("/admin/payments", () => <AdminPaymentsPanel />)
}

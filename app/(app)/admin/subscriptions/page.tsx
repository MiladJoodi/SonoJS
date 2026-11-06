import type { Metadata } from "next"

import { AdminSubscriptionsPanel } from "@/components/admin/admin-subscriptions-panel"
import { withAdminPage } from "@/lib/admin-page"

export const metadata: Metadata = {
  title: "Admin · Subscriptions",
  robots: { index: false, follow: false },
}

export default async function AdminSubscriptionsPage() {
  return withAdminPage("/admin/subscriptions", () => (
    <AdminSubscriptionsPanel />
  ))
}

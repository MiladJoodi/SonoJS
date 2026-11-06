import type { Metadata } from "next"

import { AdminStripePanel } from "@/components/admin/admin-stripe-panel"
import { withAdminPage } from "@/lib/admin-page"

export const metadata: Metadata = {
  title: "Admin · Stripe health",
  robots: { index: false, follow: false },
}

export default async function AdminStripePage() {
  return withAdminPage("/admin/stripe", () => <AdminStripePanel />)
}

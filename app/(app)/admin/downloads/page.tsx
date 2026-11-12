import type { Metadata } from "next"

import { AdminDownloadsPanel } from "@/components/admin/admin-downloads-panel"
import { withAdminPage } from "@/lib/admin-page"

export const metadata: Metadata = {
  title: "Admin · Downloads",
  robots: { index: false, follow: false },
}

export default async function AdminDownloadsPage() {
  return withAdminPage("/admin/downloads", () => <AdminDownloadsPanel />)
}

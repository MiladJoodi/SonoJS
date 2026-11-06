import type { Metadata } from "next"

import { AdminUserDetailPanel } from "@/components/admin/admin-user-detail"
import { withAdminPage } from "@/lib/admin-page"

export const metadata: Metadata = {
  title: "Admin · User",
  robots: { index: false, follow: false },
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function AdminUserDetailPage({ params }: PageProps) {
  const { id } = await params
  return withAdminPage(`/admin/users/${id}`, () => (
    <AdminUserDetailPanel userId={id} />
  ))
}

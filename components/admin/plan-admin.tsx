"use client"

import { AdminUsersPanel } from "@/components/admin/admin-users-panel"

/** @deprecated Use AdminUsersPanel via /admin/users */
export function PlanAdmin(_props: { adminEmail: string }) {
  return <AdminUsersPanel />
}

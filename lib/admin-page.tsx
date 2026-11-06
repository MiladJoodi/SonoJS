import "server-only"

import Link from "next/link"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

import { AdminShell } from "@/components/admin/admin-shell"
import { AdminAuthError, requireAdmin } from "@/lib/admin"
import { Button } from "@sonojs/ui/components/button"

export async function withAdminPage(
  pathname: string,
  render: (admin: { email: string; clerkUserId: string }) => ReactNode
) {
  try {
    const admin = await requireAdmin()
    return (
      <main className="min-h-[60vh] w-full bg-canvas text-foreground">
        <AdminShell adminEmail={admin.email} pathname={pathname}>
          {render(admin)}
        </AdminShell>
      </main>
    )
  } catch (err) {
    if (err instanceof AdminAuthError && err.status === 401) {
      redirect("/sign-in")
    }

    return (
      <main className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4 bg-canvas px-4 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Not admin</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Your account is not listed in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            ADMIN_EMAILS
          </code>
          . Add your Clerk login email to{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            .env.local
          </code>{" "}
          and restart the server.
        </p>
        <Button asChild variant="outline" className="cursor-pointer">
          <Link href="/">Back home</Link>
        </Button>
      </main>
    )
  }
}

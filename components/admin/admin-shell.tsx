import type { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

const NAV = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/downloads", label: "Downloads" },
  { href: "/admin/subscriptions", label: "Subscriptions" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/plans", label: "Plans" },
  { href: "/admin/stripe", label: "Stripe health" },
] as const

export function AdminShell({
  adminEmail,
  pathname,
  children,
}: {
  adminEmail: string
  pathname: string
  children: ReactNode
}) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 lg:px-8">
      <header className="space-y-3 text-start">
        <div className="space-y-1">
          <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-semibold tracking-[-0.03em]">
            Admin
          </h1>
          <p className="text-sm text-muted-foreground">
            Signed in as <span dir="ltr">{adminEmail}</span>
          </p>
        </div>
        <nav className="flex flex-wrap gap-1.5" aria-label="Admin sections">
          {NAV.map((item) => {
            const exact = "exact" in item && item.exact
            const active = exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </header>
      {children}
    </div>
  )
}

"use client"

import { usePathname } from "next/navigation"

import { siteConfig } from "@/lib/config"

export function SiteFooter() {
  const pathname = usePathname()
  if (
    pathname === "/tools/endpoints" ||
    pathname.startsWith("/tools/endpoints/")
  ) {
    return null
  }

  return (
    <footer className="border-t border-border/60 py-8">
      <div className="workspace-shell text-center text-sm text-muted-foreground">
        {siteConfig.name} — component library docs
      </div>
    </footer>
  )
}

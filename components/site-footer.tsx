"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/lib/config"

const footerLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/blocks", label: "Blocks" },
  { href: "/charts", label: "Charts" },
] as const

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
      <div className="workspace-shell flex flex-col items-center gap-4 text-sm text-muted-foreground">
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
        <p className="text-center">
          {siteConfig.name} — component library docs
        </p>
      </div>
    </footer>
  )
}

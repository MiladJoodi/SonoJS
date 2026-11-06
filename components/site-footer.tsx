"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/lib/config"

const footerLinks = [
  ...siteConfig.footerNavItems,
  { href: siteConfig.legal.root, label: "Legal" },
  {
    href: siteConfig.links.telegram || siteConfig.links.contact,
    label: "Contact",
    external: Boolean(siteConfig.links.telegram),
  },
] as const

export function SiteFooter() {
  const pathname = usePathname()
  if (pathname.startsWith("/tools/")) {
    return null
  }

  return (
    <footer className="border-t border-border/60 py-10">
      <div className="workspace-shell flex flex-col items-center gap-4 text-center text-sm text-muted-foreground">
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {footerLinks.map((link) =>
            "external" in link && link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer transition-colors hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="cursor-pointer transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  )
}

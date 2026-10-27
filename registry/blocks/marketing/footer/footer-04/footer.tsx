import type * as React from "react"

import { FacebookIcon } from "@/registry/icons/facebook"
import { GithubIcon } from "@/registry/icons/github"
import { LinkedinIcon } from "@/registry/icons/linkedin"
import { XIcon } from "@/registry/icons/x"
import { cn } from "@/lib/utils"
import logoAsset from "./logo.svg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const logoSrc = assetSrc(logoAsset)

const columns = [
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Support", href: "#" },
      { label: "Client Portal", href: "#" },
      { label: "Resources", href: "#" },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Hubspot", href: "#" },
      { label: "Integration Services", href: "#" },
      { label: "Marketing Glossary", href: "#" },
      { label: "UIPath", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Portfolio", href: "#" },
      { label: "Events", href: "#" },
    ],
  },
  {
    title: "Additional",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Sitemap", href: "#" },
      { label: "Contact", href: "#" },
      { label: "News", href: "#" },
    ],
  },
] as const

const legalLinks = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Security", href: "#" },
] as const

const social = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "GitHub", href: "#", Icon: GithubIcon },
] as const

const linkClass = cn(
  "cursor-pointer rounded-md transition-colors",
  "text-muted-foreground hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
)

const socialClass = cn(
  "inline-flex size-11 cursor-pointer items-center justify-center rounded-md",
  "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
  "[&_path]:fill-current"
)

export default function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn(
        "border-t border-border/70 bg-card px-4 py-14 text-foreground md:px-8 md:py-16",
        className
      )}
      {...props}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)] md:gap-12">
          <div className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
            <a
              href="#"
              className="inline-flex cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <img src={logoSrc} alt="SonoJS" className="h-12 w-auto" />
            </a>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              SonoJS is a library of pre-designed UI components built for
              Tailwind CSS. It offers a collection of versatile and
              ready-to-use components.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} aria-label={label} className={socialClass}>
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 xl:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/70 pt-6 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            © SonoJS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

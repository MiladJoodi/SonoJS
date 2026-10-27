import type * as React from "react"

import { FacebookIcon } from "@/registry/icons/facebook"
import { GithubIcon } from "@/registry/icons/github"
import { LinkedinIcon } from "@/registry/icons/linkedin"
import { XIcon } from "@/registry/icons/x"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
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
      { label: "Marketo Integration", href: "#" },
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
  "inline-flex size-11 cursor-pointer items-center justify-center rounded-md border border-white/10",
  "text-foreground transition-colors hover:bg-white/10",
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
        "dark bg-zinc-950 px-4 py-14 text-foreground md:px-8 md:py-16",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <a
              href="#"
              className="inline-flex cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <img src={logoSrc} alt="SonoJS" className="h-12 w-auto" />
            </a>

            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  Address
                </dt>
                <dd className="mt-1 leading-relaxed text-muted-foreground">
                  123 Market Street, Suite 45, San Francisco
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a href="tel:+14155552671" className={linkClass}>
                    +1 415 555 2671
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  Email
                </dt>
                <dd className="mt-1">
                  <a href="mailto:support@sonojs.com" className={linkClass}>
                    support@sonojs.com
                  </a>
                </dd>
              </div>
            </dl>

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

          <div className="rounded-[12px] border border-white/10 bg-white/5 p-6 shadow-soft"
              style={{
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
            <h3 className="text-base font-semibold text-foreground">
              Join Our Newsletter
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Subscribe to our newsletter and stay up to date with the latest
              news and updates.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="h-[46px] min-w-0 flex-1"
              />
              <Button
                type="button"
                className="h-[46px] w-full shrink-0 cursor-pointer sm:w-auto"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-white/10 pt-10 sm:max-w-xl sm:grid-cols-2">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
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

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
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

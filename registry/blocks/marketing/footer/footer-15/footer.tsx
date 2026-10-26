import type * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { DribbbleIcon } from "@/registry/icons/dribbble"
import { FacebookIcon } from "@/registry/icons/facebook"
import { GithubIcon } from "@/registry/icons/github"
import { InstagramIcon } from "@/registry/icons/instagram"
import { XIcon } from "@/registry/icons/x"
import { cn } from "@/lib/utils"
import logoAsset from "./logo.svg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const logoSrc = assetSrc(logoAsset)

const aboutLinks = [
  { label: "Company History", href: "#" },
  { label: "Meet the Team", href: "#" },
  { label: "Employee Handbook", href: "#" },
  { label: "Careers", href: "#" },
] as const

const serviceLinks = [
  { label: "Web Development", href: "#" },
  { label: "Web Design", href: "#" },
  { label: "Marketing", href: "#" },
  { label: "Google Ads", href: "#" },
] as const

const resourceLinks = [
  { label: "Online Guides", href: "#" },
  { label: "Conference Notes", href: "#" },
  { label: "Forum", href: "#" },
  { label: "Downloads", href: "#" },
  { label: "Upcoming Events", href: "#" },
] as const

const helpfulLinks = [
  { label: "FAQs", href: "#" },
  { label: "Support", href: "#" },
] as const

const social = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "GitHub", href: "#", Icon: GithubIcon },
  { label: "Dribbble", href: "#", Icon: DribbbleIcon },
] as const

const linkClass = cn(
  "cursor-pointer rounded-md text-muted-foreground transition-colors hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
)

const socialClass = cn(
  "inline-flex size-11 cursor-pointer items-center justify-center rounded-md text-primary transition-colors",
  "hover:bg-primary/10 hover:text-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
  "[&_path]:fill-current"
)

function LinkColumn({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <div className="text-start">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={linkClass}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer className={cn("bg-card", className)} {...props}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[12px] border border-primary/20 bg-primary px-6 py-8 shadow-soft sm:flex-row sm:items-center sm:px-8">
          <div className="text-start">
            <p className="text-xs font-medium tracking-wide text-primary-foreground/80 uppercase">
              Careers
            </p>
            <p className="mt-1 text-h3 text-primary-foreground">
              Make your next career move
            </p>
          </div>
          <a
            href="#"
            className={cn(
              "inline-flex h-[46px] shrink-0 cursor-pointer items-center gap-2 rounded-[12px] bg-primary-foreground px-6 text-sm font-medium text-primary shadow-soft",
              "transition-colors hover:bg-primary-foreground/90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            )}
          >
            <span>Let&apos;s get started</span>
            <ArrowRightIcon aria-hidden className="icon-dir size-4" />
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <LinkColumn title="About Us" links={aboutLinks} />
          <LinkColumn title="Our Services" links={serviceLinks} />
          <LinkColumn title="Resources" links={resourceLinks} />
          <LinkColumn title="Helpful Links" links={helpfulLinks} />
        </div>

        <div className="mt-12 border-t border-border/70 pt-8">
          <ul className="flex flex-wrap justify-end gap-1">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  rel="noreferrer"
                  target="_blank"
                  className={socialClass}
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <a
              href="#"
              aria-label="SonoJS"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <img src={logoSrc} alt="" className="h-8 w-auto" />
              <span className="text-lg font-semibold text-foreground">SonoJS</span>
            </a>
            <p className="text-center text-sm text-muted-foreground sm:text-end">
              Copyright © 2026. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

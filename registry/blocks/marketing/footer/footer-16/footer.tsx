import type * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { FacebookIcon } from "@/registry/icons/facebook"
import { InstagramIcon } from "@/registry/icons/instagram"
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

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Partners", href: "#" },
] as const

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Safety Information", href: "#" },
  { label: "Cancellation Options", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Accessibility", href: "#" },
] as const

const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Sitemap", href: "#" },
] as const

const social = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
] as const

const linkClass = cn(
  "cursor-pointer rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
)

const socialClass = cn(
  "inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-colors",
  "hover:border-foreground/30 hover:bg-muted hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
  "[&_path]:fill-current"
)

export default function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer className={cn("bg-card", className)} {...props}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="max-w-xs text-start">
            <a
              href="#"
              aria-label="SonoJS"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <img src={logoSrc} alt="" className="h-8 w-auto" />
              <span className="text-lg font-semibold text-foreground">SonoJS</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Components you install and own. Short updates, no noise.
            </p>
            <ul className="mt-4 flex flex-wrap items-center gap-2">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    rel="noreferrer"
                    target="_blank"
                    className={socialClass}
                  >
                    <Icon className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-start">
            <p className="text-xs font-semibold tracking-wider text-foreground uppercase">
              Company
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-start">
            <p className="text-xs font-semibold tracking-wider text-foreground uppercase">
              Support
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-sm text-start">
            <p className="text-xs font-semibold tracking-wider text-foreground uppercase">
              Stay updated
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Subscribe for inspiration and special offers.
            </p>
            <form
              action="#"
              className="mt-4 flex max-w-sm overflow-hidden rounded-[12px] border border-border/70 bg-background shadow-soft focus-within:ring-2 focus-within:ring-ring/40"
            >
              <label htmlFor="footer-16-email" className="sr-only">
                Email
              </label>
              <Input
                id="footer-16-email"
                type="email"
                name="email"
                placeholder="Your email"
                autoComplete="email"
                className="h-[46px] min-w-0 flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Subscribe"
                className="h-[46px] w-[46px] shrink-0 rounded-none"
              >
                <ArrowRightIcon aria-hidden className="icon-dir size-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/70 py-5 text-sm text-muted-foreground sm:flex-row">
          <p>
            © 2026{" "}
            <a href="#" className={linkClass}>
              SonoJS
            </a>
            . All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-4">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

import type * as React from "react"
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

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
  "inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-primary/30 bg-transparent text-primary transition-colors",
  "hover:border-primary hover:bg-primary hover:text-primary-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
  "[&_path]:fill-current"
)

const contactClass = cn(
  "inline-flex cursor-pointer items-center justify-start gap-2 rounded-md text-muted-foreground transition-colors hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
)

export default function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer className={cn("bg-card", className)} {...props}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="rounded-[12px] border border-border/70 bg-background/50 p-6 text-start shadow-soft"
              style={{
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
            <a
              href="#"
              aria-label="SonoJS"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <img src={logoSrc} alt="" className="h-8 w-auto" />
              <span className="text-lg font-semibold text-foreground">SonoJS</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground sm:max-w-xs">
              A studio footer for teams who want the brand, the work, and a
              direct line — address, phone, and mail in one place.
            </p>
            <ul className="mt-6 flex flex-wrap justify-start gap-2">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    rel="noreferrer"
                    target="_blank"
                    className={socialClass}
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div className="text-start">
              <p className="text-sm font-medium text-foreground">About</p>
              <ul className="mt-4 space-y-3 text-sm">
                {aboutLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-start">
              <p className="text-sm font-medium text-foreground">Services</p>
              <ul className="mt-4 space-y-3 text-sm">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-start">
              <p className="text-sm font-medium text-foreground">Helpful</p>
              <ul className="mt-4 space-y-3 text-sm">
                {helpfulLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#"
                    className="group inline-flex cursor-pointer items-center justify-start gap-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                      Live Chat
                    </span>
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/75 opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-primary" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-start">
              <p className="text-sm font-medium text-foreground">Contact</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href="mailto:hello@sonojs.com" className={contactClass}>
                    <MailIcon aria-hidden className="size-4 shrink-0 text-foreground" />
                    <span>hello@sonojs.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:0123456789" className={contactClass}>
                    <PhoneIcon aria-hidden className="size-4 shrink-0 text-foreground" />
                    <span>0123456789</span>
                  </a>
                </li>
                <li className="inline-flex items-start justify-start gap-2 text-muted-foreground">
                  <MapPinIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-foreground" />
                  <address className="text-start not-italic">
                    213 Lane, London, United Kingdom
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 SonoJS</p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <a
              href="#"
              className="cursor-pointer text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              Terms & Conditions
            </a>
            <span aria-hidden>·</span>
            <a
              href="#"
              className="cursor-pointer text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

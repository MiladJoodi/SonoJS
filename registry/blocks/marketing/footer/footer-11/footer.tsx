import type * as React from "react"

import { DribbbleIcon } from "@/registry/icons/dribbble"
import { FacebookIcon } from "@/registry/icons/facebook"
import { GithubIcon } from "@/registry/icons/github"
import { InstagramIcon } from "@/registry/icons/instagram"
import { XIcon } from "@/registry/icons/x"
import { cn } from "@/lib/utils"
import panelImage from "./images/panel.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const panelSrc = assetSrc(panelImage)

const services = [
  { label: "1on1 Coaching", href: "#" },
  { label: "Company Review", href: "#" },
  { label: "Accounts Review", href: "#" },
  { label: "HR Consulting", href: "#" },
  { label: "SEO Optimisation", href: "#" },
] as const

const company = [
  { label: "About", href: "#" },
  { label: "Meet the Team", href: "#" },
  { label: "Accounts Review", href: "#" },
] as const

const legalLinks = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookies", href: "#" },
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
  "inline-flex size-11 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors",
  "hover:bg-muted hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
  "[&_path]:fill-current"
)

export default function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn("bg-card lg:grid lg:grid-cols-5", className)}
      {...props}
    >
      <div className="relative h-72 overflow-hidden lg:col-span-2 lg:h-auto lg:min-h-[30rem]">
        <img
          src={panelSrc}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/35 to-foreground/15"
        />
        <div
          aria-hidden
          className="absolute inset-y-0 end-0 hidden w-32 bg-[linear-gradient(to_inline-end,transparent,color-mix(in_oklab,var(--card)_85%,transparent),var(--card))] lg:block"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 lg:hidden">
          <p className="text-sm font-medium text-primary-foreground">
            Talk with the team
          </p>
          <p className="mt-1 text-xs text-primary-foreground/80">
            Studio hours &amp; support below
          </p>
        </div>
      </div>

      <div className="px-4 py-12 text-start sm:px-6 lg:col-span-3 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div className="rounded-[12px] border border-border/70 bg-background/50 p-5 shadow-soft sm:p-6">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Call us
            </p>
            <a
              href="tel:0123456789"
              className="mt-2 block cursor-pointer text-h2 text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              0123456789
            </a>
            <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
              <li>Monday to Friday: 10am – 5pm</li>
              <li>Weekend: 10am – 3pm</li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-1">
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
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-foreground">Services</p>
              <ul className="mt-4 space-y-3 text-sm">
                {services.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Company</p>
              <ul className="mt-4 space-y-3 text-sm">
                {company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/70 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground">© 2026 SonoJS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

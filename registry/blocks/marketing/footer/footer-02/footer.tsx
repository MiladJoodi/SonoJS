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

const usefulLinks = [
  { label: "Featured", href: "#" },
  { label: "New Arrivals", href: "#" },
  { label: "Collections", href: "#" },
] as const

const informationLinks = [
  { label: "About Us", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Sale", href: "#" },
  { label: "Documentation", href: "#" },
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
        "border-t border-border/70 bg-card px-4 py-10 text-foreground md:px-8 md:py-12",
        className
      )}
      {...props}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          <a
            href="#"
            className="inline-flex h-[46px] shrink-0 cursor-pointer items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <img src={logoSrc} alt="SonoJS" className="h-7 w-auto" />
          </a>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:gap-12 md:max-w-xl">
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground">
                Useful links
              </h3>
              <ul className="space-y-2 text-sm">
                {usefulLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground">
                Information
              </h3>
              <ul className="space-y-2 text-sm">
                {informationLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="flex flex-wrap gap-1">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} aria-label={label} className={socialClass}>
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 border-t border-border/70 pt-6 text-sm text-muted-foreground">
          © SonoJS. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

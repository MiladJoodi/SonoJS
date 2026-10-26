import type * as React from "react"

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

const navLinks = [
  { label: "About", href: "#" },
  { label: "Careers", href: "#" },
  { label: "History", href: "#" },
  { label: "Services", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Blog", href: "#" },
] as const

const social = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "GitHub", href: "#", Icon: GithubIcon },
  { label: "Dribbble", href: "#", Icon: DribbbleIcon },
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
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <a
          href="#"
          aria-label="SonoJS"
          className="inline-flex cursor-pointer items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <img src={logoSrc} alt="" className="h-8 w-auto" />
          <span className="text-lg font-semibold text-foreground">SonoJS</span>
        </a>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          Installable components for product teams. Copy the source, keep the
          tokens, and ship interfaces that stay yours.
        </p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
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

        <p className="mt-10 text-xs text-muted-foreground">© 2026 SonoJS</p>
      </div>
    </footer>
  )
}

import type * as React from "react"

import { FacebookIcon } from "@/registry/icons/facebook"
import { GithubIcon } from "@/registry/icons/github"
import { LinkedinIcon } from "@/registry/icons/linkedin"
import { XIcon } from "@/registry/icons/x"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Company", href: "#" },
] as const

const social = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "GitHub", href: "#", Icon: GithubIcon },
] as const

const linkClass = cn(
  "cursor-pointer rounded-md text-sm tracking-wide transition-colors",
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
        "dark bg-zinc-950 px-4 py-20 text-foreground md:px-8 md:py-24",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex w-full flex-col items-center rounded-[12px] border border-white/10 bg-white/5 px-6 py-8 shadow-soft"
              style={{
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Stay connected
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} aria-label={label} className={socialClass}>
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          © SonoJS. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

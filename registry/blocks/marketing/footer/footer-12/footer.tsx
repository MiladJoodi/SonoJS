import type * as React from "react"

import { DribbbleIcon } from "@/registry/icons/dribbble"
import { FacebookIcon } from "@/registry/icons/facebook"
import { GithubIcon } from "@/registry/icons/github"
import { InstagramIcon } from "@/registry/icons/instagram"
import { XIcon } from "@/registry/icons/x"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"

const columns = [
  {
    title: "Services",
    links: [
      { label: "Marketing", href: "#" },
      { label: "Graphic Design", href: "#" },
      { label: "App Development", href: "#" },
      { label: "Web Development", href: "#" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "History", href: "#" },
      { label: "Our Team", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Live Chat", href: "#" },
    ],
  },
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
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-h2 text-foreground">
            Want us to email you with the latest blockbuster news?
          </h2>
          <form
            action="#"
            className="mx-auto mt-8 flex w-full max-w-lg flex-col gap-2 sm:relative sm:rounded-full sm:border sm:border-border/70 sm:bg-background sm:p-1.5 sm:shadow-soft sm:focus-within:ring-2 sm:focus-within:ring-ring/40"
            style={{
              boxShadow:
                "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
            }}
          >
            <label className="sr-only" htmlFor="footer-12-email">
              Email
            </label>
            <Input
              id="footer-12-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="h-12 w-full rounded-full border-border/70 bg-background shadow-soft sm:border-0 sm:bg-transparent sm:pe-36 sm:ps-5 sm:shadow-none sm:focus-visible:ring-0"
            />
            <Button
              type="submit"
              className="h-11 w-full rounded-full px-5 sm:absolute sm:end-2 sm:top-1/2 sm:w-auto sm:-translate-y-1/2"
            >
              Subscribe
            </Button>
          </form>
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto max-w-md text-center lg:ms-0 lg:me-0 lg:max-w-none lg:text-start">
            <p className="text-base leading-relaxed text-muted-foreground">
              SonoJS ships the components, blocks, and patterns you install
              into your own app — kept in your repo, ready for both writing
              directions.
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className={socialClass}
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 text-start sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-medium text-foreground">
                  {column.title}
                </p>
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

        <p className="mt-16 border-t border-border/70 pt-8 text-center text-xs text-muted-foreground">
          © SonoJS 2026. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

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
      { label: "1on1 Coaching", href: "#" },
      { label: "Company Review", href: "#" },
      { label: "Accounts Review", href: "#" },
      { label: "HR Consulting", href: "#" },
      { label: "SEO Optimisation", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Meet the Team", href: "#" },
      { label: "Accounts Review", href: "#" },
    ],
  },
  {
    title: "Helpful Links",
    links: [
      { label: "Contact", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Live Chat", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Accessibility", href: "#" },
      { label: "Returns Policy", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Hiring Statistics", href: "#" },
    ],
  },
  {
    title: "Downloads",
    links: [
      { label: "Marketing Calendar", href: "#" },
      { label: "SEO Infographics", href: "#" },
    ],
  },
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

function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-8 w-auto text-primary", className)}
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer className={cn("bg-card", className)} {...props}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl rounded-[12px] border border-border/70 bg-background/50 p-6 shadow-soft sm:p-8">
          <a
            href="#"
            aria-label="SonoJS"
            className="inline-flex cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <BrandMark />
          </a>
          <h2 className="mt-6 text-h1 text-foreground">Get the latest news</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Product notes, release highlights, and practical SonoJS patterns —
            a short email when there is something worth opening.
          </p>
          <form
            action="#"
            className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-center"
          >
            <label htmlFor="footer-10-email" className="sr-only">
              Email
            </label>
            <Input
              id="footer-10-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="h-[46px] min-w-0 border-border/70 sm:flex-1"
            />
            <Button type="submit" className="h-[46px] w-full shrink-0 sm:w-auto">
              Sign up
            </Button>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {columns.map((column) => (
            <div key={column.title} className="text-start">
              <p className="text-sm font-medium text-foreground">{column.title}</p>
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

        <ul className="mt-10 flex flex-wrap items-center gap-1">
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

        <div className="mt-8 flex flex-col gap-4 border-t border-border/70 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SonoJS. All rights reserved.</p>
          <ul className="flex flex-wrap gap-4">
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

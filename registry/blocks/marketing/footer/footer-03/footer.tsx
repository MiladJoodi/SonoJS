import type * as React from "react"

import { FacebookIcon } from "@/registry/icons/facebook"
import { LinkedinIcon } from "@/registry/icons/linkedin"
import { XIcon } from "@/registry/icons/x"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

const columns = [
  {
    title: "Resources",
    links: [
      { label: "Graphic Design Tools", href: "#" },
      { label: "Video Editing Tools", href: "#" },
      { label: "Image Enhancer", href: "#" },
      { label: "Remove Backgrounds", href: "#" },
      { label: "Photo Enhancement", href: "#" },
      { label: "Explore All Tools", href: "#" },
    ],
  },
  {
    title: "Helpful Links",
    links: [
      { label: "Subscription Plans", href: "#" },
      { label: "Our Story", href: "#" },
      { label: "Developer API", href: "#" },
      { label: "Career Opportunities", href: "#" },
      { label: "Become a Contributor", href: "#" },
      { label: "Brand Guidelines", href: "#" },
      { label: "Upcoming Events", href: "#" },
      { label: "Search Insights", href: "#" },
      { label: "Latest Articles", href: "#" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Terms & Conditions", href: "#" },
      { label: "User Agreement", href: "#" },
      { label: "Data Privacy Policy", href: "#" },
      { label: "Copyright Notice", href: "#" },
      { label: "Cookie Usage Policy", href: "#" },
      { label: "Manage Cookies", href: "#" },
    ],
  },
] as const

const social = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "X", href: "#", Icon: XIcon },
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
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-10">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
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

          <div className="col-span-1 flex h-fit flex-col rounded-[12px] border border-white/10 bg-white/5 p-6 shadow-soft sm:col-span-2 xl:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Newsletter
            </p>
            <h3 className="mt-3 text-base font-semibold text-foreground">
              Social Media
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Get exclusive assets sent straight to your inbox
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} aria-label={label} className={socialClass}>
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 h-[46px] w-full cursor-pointer">
              <a href="#">Sign up</a>
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © SonoJS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

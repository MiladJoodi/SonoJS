import type * as React from "react"

import { cn } from "@/lib/utils"

const columns = [
  {
    title: "Quick Links",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Newsroom", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press Kit", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "#" },
      { label: "Testing Automation", href: "#" },
      { label: "AWS Development Services", href: "#" },
      { label: "Mobile App Development", href: "#" },
      { label: "UI/UX Design", href: "#" },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Hubspot", href: "#" },
      { label: "Marketo Integration Services", href: "#" },
      { label: "Marketing Glossary", href: "#" },
      { label: "UIPath", href: "#" },
      { label: "Salesforce", href: "#" },
      { label: "Zapier Integration", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Accessibility", href: "#" },
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Learn more", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
] as const

const linkClass = cn(
  "cursor-pointer rounded-md transition-colors",
  "text-muted-foreground hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
)

export default function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn(
        "bg-card px-4 py-12 text-foreground md:px-8 md:py-16",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <div
          aria-hidden
          className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-primary/45 to-transparent"
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-wide text-foreground">
                {column.title}
              </h3>
              <ul className="space-y-3 text-sm">
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

        <div className="mt-12 border-t border-border/70 pt-6">
          <p className="text-start text-sm text-muted-foreground">
            © SonoJS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

import type * as React from "react"

import { cn } from "@/lib/utils"

type LinkItem = { label: string; href: string }
type Section = { title: string; links: LinkItem[] }
type Column = { sections: Section[] }

const columns: Column[] = [
  {
    sections: [
      {
        title: "Explore Our Products",
        links: [
          { label: "Gadgets", href: "#" },
          { label: "Laptops", href: "#" },
          { label: "Tablets", href: "#" },
          { label: "Smartphones", href: "#" },
          { label: "Smartwatches", href: "#" },
          { label: "Wireless Headphones", href: "#" },
          { label: "Home Entertainment", href: "#" },
          { label: "Tracking Devices", href: "#" },
          { label: "Gifts", href: "#" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Your Account",
        links: [
          { label: "Manage Your Account", href: "#" },
          { label: "Account Settings", href: "#" },
          { label: "Sign In", href: "#" },
        ],
      },
      {
        title: "About Us",
        links: [
          { label: "Company News", href: "#" },
          { label: "Leadership Team", href: "#" },
          { label: "Join Our Team", href: "#" },
          { label: "Investors", href: "#" },
          { label: "Our Values", href: "#" },
          { label: "Events", href: "#" },
          { label: "Contact Us", href: "#" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Our Stores",
        links: [
          { label: "Find a Location", href: "#" },
          { label: "Customer Service", href: "#" },
          { label: "Workshops", href: "#" },
          { label: "Group Bookings", href: "#" },
          { label: "Trade-In Program", href: "#" },
          { label: "Purchase Options", href: "#" },
          { label: "Recycle", href: "#" },
          { label: "Order Updates", href: "#" },
          { label: "Shopping Assistance", href: "#" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "For Businesses",
        links: [
          { label: "Solutions for Business", href: "#" },
          { label: "Shop for Business", href: "#" },
        ],
      },
      {
        title: "For Education",
        links: [
          { label: "Educational Discounts", href: "#" },
          { label: "Shop for Schools", href: "#" },
          { label: "University Discounts", href: "#" },
        ],
      },
      {
        title: "For Healthcare",
        links: [
          { label: "Devices in Healthcare", href: "#" },
          { label: "Medical Devices", href: "#" },
          { label: "Health Features on Devices", href: "#" },
        ],
      },
    ],
  },
]

const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Sales Terms", href: "#" },
  { label: "Legal Notices", href: "#" },
  { label: "Sitemap", href: "#" },
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
        "border-t border-border/70 bg-card px-4 py-14 text-foreground md:px-8 md:py-16",
        className
      )}
      {...props}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-4">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-8">
              {column.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
                    {section.title}
                  </h3>
                  <ul className="space-y-2 text-sm leading-5">
                    {section.links.map((link) => (
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
          ))}
        </div>

        <div className="mt-14 border-t border-border/70 pt-8 text-center">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            © SonoJS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

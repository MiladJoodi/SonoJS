"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"
import logoAsset from "./logo.svg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const logoSrc = assetSrc(logoAsset)

const linkClass =
  "block cursor-pointer rounded-[12px] px-3 py-2 text-sm font-medium text-foreground/80 outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"

const activeLinkClass =
  "block cursor-pointer rounded-[12px] bg-muted px-3 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"

const sectionTitleClass =
  "px-3 text-sm font-semibold text-primary"

type NavSection = {
  title: string
  items: { label: string; href: string }[]
}

const sections: NavSection[] = [
  {
    title: "Information",
    items: [
      { label: "Audience", href: "#" },
      { label: "Posts", href: "#" },
      { label: "Schedules", href: "#" },
    ],
  },
  {
    title: "Income",
    items: [
      { label: "Earnings and taxes", href: "#" },
      { label: "Refunds", href: "#" },
      { label: "Declines", href: "#" },
    ],
  },
  {
    title: "Actions",
    items: [
      { label: "Profile", href: "#" },
      { label: "Settings", href: "#" },
    ],
  },
]

function Brand() {
  return (
    <a
      href="#"
      className="mb-8 flex min-w-9 cursor-pointer items-center gap-2 px-3 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Sono"
    >
      <img
        src={logoSrc}
        alt=""
        width={28}
        height={32}
        className="h-8 w-auto shrink-0"
      />
      <span className="text-sm font-semibold tracking-tight text-foreground">
        Sono
      </span>
    </a>
  )
}

export default function Sidebar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-h-[28rem] w-full flex-col bg-background md:flex-row", className)}
      {...props}
    >
      <aside className="flex w-full max-w-xs shrink-0 flex-col overflow-auto border-b border-border/70 bg-card px-4 py-6 md:border-b-0 md:border-e">
        <Brand />

        <nav aria-label="Primary sidebar">
          <ul className="space-y-1">
            <li>
              <a href="#" aria-current="page" className={activeLinkClass}>
                Dashboard
              </a>
            </li>
          </ul>

          {sections.map((section) => (
            <div key={section.title} className="mt-6">
              <div className={sectionTitleClass}>{section.title}</div>
              <ul className="mt-2 space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className={linkClass}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-lg text-balance text-h3 text-foreground">
          Simple sectioned sidebar
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Dashboard link plus Information, Income, and Actions groups.
        </p>
      </main>
    </div>
  )
}

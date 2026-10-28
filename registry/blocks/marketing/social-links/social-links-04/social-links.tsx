"use client"

import type * as React from "react"
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  BoxesIcon,
  Code2Icon,
  LayoutTemplateIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import logo from "./images/logo.svg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const LINKS = [
  {
    label: "Documentation",
    href: "#",
    icon: BookOpenIcon,
  },
  {
    label: "Components",
    href: "#",
    icon: BoxesIcon,
  },
  {
    label: "Blocks",
    href: "#",
    icon: LayoutTemplateIcon,
  },
  {
    label: "GitHub",
    href: "#",
    icon: Code2Icon,
  },
] as const

export default function SocialLinks({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-12",
        className
      )}
      aria-labelledby="social-links-04-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-sm">
        <div className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-7">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <a
                href="#"
                className="inline-flex cursor-pointer items-center gap-2 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={assetSrc(logo)}
                  alt=""
                  width={20}
                  height={22}
                  className="h-[22px] w-auto shrink-0"
                />
                <span className="text-sm font-bold leading-none tracking-tight text-foreground">
                  Sono
                </span>
              </a>

              <div className="space-y-1">
                <h1
                  id="social-links-04-heading"
                  className="text-lg font-semibold tracking-tight text-foreground"
                >
                  SonoJS
                </h1>
                <p className="text-sm text-muted-foreground">
                  Component library docs
                </p>
              </div>
            </div>

            <ul className="flex w-full flex-col gap-2" role="list">
              {LINKS.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex h-[46px] w-full cursor-pointer items-center gap-3 rounded-md border border-border/70 bg-card px-3 text-start text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <Icon
                        className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground"
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1 truncate">
                        {link.label}
                      </span>
                      <ArrowUpRightIcon
                        className="size-3.5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-foreground"
                        aria-hidden
                      />
                    </a>
                  </li>
                )
              })}
            </ul>

            <Button asChild className="h-[46px] w-full cursor-pointer rounded-md">
              <a href="#">Get started</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

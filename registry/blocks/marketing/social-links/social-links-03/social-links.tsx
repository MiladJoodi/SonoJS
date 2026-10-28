"use client"

import type * as React from "react"
import {
  ArrowUpRightIcon,
  Code2Icon,
  GlobeIcon,
  LayersIcon,
  MailIcon,
  MapPinIcon,
  PenToolIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import cover from "./images/cover.webp"
import logo from "./images/logo.svg"
import portrait from "./images/portrait.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const LINKS = [
  {
    label: "Portfolio",
    href: "#",
    note: "Selected work 2024–26",
    icon: GlobeIcon,
  },
  {
    label: "Design kits",
    href: "#",
    note: "Free UI systems",
    icon: PenToolIcon,
  },
  {
    label: "Shots",
    href: "#",
    note: "Process & craft",
    icon: LayersIcon,
  },
  {
    label: "Source",
    href: "#",
    note: "Open components",
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
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="social-links-03-heading"
      {...props}
    >
      <div className="mx-auto grid w-full max-w-4xl overflow-hidden rounded-[20px] border border-border/70 bg-card shadow-soft md:grid-cols-12">
        {/* Media column */}
        <div className="relative min-h-56 md:col-span-5 md:min-h-full">
          <img
            src={assetSrc(cover)}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-black/25"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4 text-start md:inset-x-auto md:start-0 md:top-0 md:bottom-0 md:flex-col md:items-start md:justify-between md:p-5">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/85 px-2.5 py-1 shadow-soft backdrop-blur-md dark:bg-zinc-950/80">
              <img src={assetSrc(logo)} alt="" className="size-3.5" />
              <span className="text-[11px] font-medium text-foreground">
                Built with Sono
              </span>
            </div>

            <div className="hidden max-w-[12rem] rounded-[14px] border border-white/20 bg-white/90 p-3 shadow-soft backdrop-blur-md md:block dark:bg-zinc-950/85">
              <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Link deck
              </p>
              <p className="mt-1 text-sm leading-snug text-foreground">
                Everything I ship — in one place.
              </p>
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="flex flex-col gap-6 p-5 sm:p-7 md:col-span-7 md:p-8">
          <header className="flex items-start gap-4 text-start">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-[14px] border border-border/70 shadow-soft sm:size-16">
              <img
                src={assetSrc(portrait)}
                alt=""
                className="size-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1
                  id="social-links-03-heading"
                  className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                >
                  Jordan Hale
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
                <span dir="ltr">@jordanhale</span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPinIcon className="size-3.5" aria-hidden />
                  Lisbon
                </span>
              </p>
              <p className="mt-2 truncate text-sm text-muted-foreground">
                Product designer · systems, motion, marketing UI.
              </p>
            </div>
          </header>

          <ul className="flex flex-col gap-2.5" role="list">
            {LINKS.map((link) => {
              const Icon = link.icon
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex cursor-pointer items-center gap-3.5 rounded-[14px] border border-border/70 bg-canvas px-3.5 py-3 text-start transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card hover:shadow-soft dark:bg-muted/20"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-primary/10 text-primary transition-transform group-hover:scale-105">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {link.label}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {link.note}
                      </span>
                    </span>
                    <ArrowUpRightIcon
                      className="size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border/70 pt-5">
            <Button asChild className="h-10 cursor-pointer gap-2 rounded-[12px]">
              <a href="#">
                <MailIcon className="size-4" aria-hidden />
                Say hello
              </a>
            </Button>
            <a
              href="#"
              className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <img src={assetSrc(logo)} alt="" className="size-4" />
              Powered by SonoJS
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

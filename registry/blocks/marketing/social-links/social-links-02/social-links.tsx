"use client"

import type * as React from "react"
import {
  ArrowUpRightIcon,
  Code2Icon,
  MailIcon,
  PlayCircleIcon,
  Share2Icon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import cover from "./images/cover.webp"
import logo from "./images/logo.svg"
import portrait from "./images/portrait.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DESTINATIONS = [
  {
    label: "Open source",
    href: "#",
    meta: "Repos & blocks",
    icon: Code2Icon,
  },
  {
    label: "Tutorials",
    href: "#",
    meta: "Watch & ship",
    icon: PlayCircleIcon,
  },
  {
    label: "Updates",
    href: "#",
    meta: "Weekly drops",
    icon: SparklesIcon,
  },
  {
    label: "Community",
    href: "#",
    meta: "Ask & share",
    icon: UsersIcon,
  },
] as const

const RAIL = [
  { label: "Share", icon: Share2Icon, href: "#" },
  { label: "Mail", icon: MailIcon, href: "#" },
] as const

export default function SocialLinks({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative w-full min-w-0 overflow-hidden bg-zinc-950 px-4 py-10 text-zinc-50 sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="social-links-02-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in oklab, #2563eb 45%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-md">
        <article className="overflow-hidden rounded-[20px] border border-white/10 bg-zinc-900/80 shadow-soft backdrop-blur-md">
          {/* Cover */}
          <div className="relative h-36 sm:h-40">
            <img
              src={assetSrc(cover)}
              alt=""
              className="size-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent"
            />
            <div className="absolute start-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 backdrop-blur-md">
              <img
                src={assetSrc(logo)}
                alt=""
                className="size-4"
              />
              <span className="text-[11px] font-medium tracking-wide text-white/90">
                SonoJS
              </span>
            </div>
          </div>

          {/* Identity */}
          <div className="relative px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="-mt-10 flex items-end justify-between gap-3">
              <div className="relative size-20 overflow-hidden rounded-[16px] border-[3px] border-zinc-950 shadow-soft ring-1 ring-white/10">
                <img
                  src={assetSrc(portrait)}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <div className="mb-1 flex items-center gap-1.5">
                {RAIL.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:border-primary/40 hover:bg-primary/15 hover:text-white"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4 text-start">
              <h1
                id="social-links-02-heading"
                className="text-xl font-semibold tracking-tight text-white"
              >
                Maya Chen
              </h1>
              <p className="mt-0.5 text-sm text-zinc-400" dir="ltr">
                @maya · Design engineer at Sono
              </p>
              <p className="mt-2 truncate text-sm text-zinc-500">
                Shipping UI that feels finished on day one.
              </p>
            </div>

            <ul className="mt-5 grid grid-cols-2 gap-2.5" role="list">
              {DESTINATIONS.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group flex cursor-pointer items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.04] p-3 text-start transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/10"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-zinc-200 group-hover:text-primary">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-white">
                          {item.label}
                        </span>
                        <span className="block truncate text-[11px] text-zinc-500">
                          {item.meta}
                        </span>
                      </span>
                      <ArrowUpRightIcon
                        className="size-3.5 shrink-0 text-zinc-600 transition-colors group-hover:text-primary"
                        aria-hidden
                      />
                    </a>
                  </li>
                )
              })}
            </ul>

            <a
              href="#"
              className="mt-4 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <img src={assetSrc(logo)} alt="" className="size-4 brightness-0 invert" />
              Browse SonoJS blocks
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}

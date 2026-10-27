"use client"

import type * as React from "react"
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CameraIcon,
  Code2Icon,
  GlobeIcon,
  LibraryIcon,
  MailIcon,
  MessageSquareIcon,
  PlayCircleIcon,
  Share2Icon,
  SparklesIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { cn } from "@/lib/utils"

type LinkTone = "primary" | "violet" | "rose" | "sky" | "emerald"

type ProfileLink = {
  label: string
  href: string
  description: string
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  tone: LinkTone
  featured?: boolean
}

const TONE: Record<
  LinkTone,
  { well: string; ring: string; glow: string; arrow: string }
> = {
  primary: {
    well: "bg-primary/12 text-primary",
    ring: "group-hover:border-primary/35",
    glow: "group-hover:shadow-[0_18px_40px_-24px_color-mix(in_oklab,var(--primary)_55%,transparent)]",
    arrow: "group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  },
  violet: {
    well: "bg-violet-500/12 text-violet-600 dark:text-violet-300",
    ring: "group-hover:border-violet-500/35",
    glow: "group-hover:shadow-[0_18px_40px_-24px_rgb(139_92_246_/_0.45)]",
    arrow: "group-hover:text-violet-600 dark:group-hover:text-violet-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  },
  rose: {
    well: "bg-rose-500/12 text-rose-600 dark:text-rose-300",
    ring: "group-hover:border-rose-500/35",
    glow: "group-hover:shadow-[0_18px_40px_-24px_rgb(244_63_94_/_0.45)]",
    arrow: "group-hover:text-rose-600 dark:group-hover:text-rose-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  },
  sky: {
    well: "bg-sky-500/12 text-sky-600 dark:text-sky-300",
    ring: "group-hover:border-sky-500/35",
    glow: "group-hover:shadow-[0_18px_40px_-24px_rgb(14_165_233_/_0.45)]",
    arrow: "group-hover:text-sky-600 dark:group-hover:text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  },
  emerald: {
    well: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
    ring: "group-hover:border-emerald-500/35",
    glow: "group-hover:shadow-[0_18px_40px_-24px_rgb(16_185_129_/_0.45)]",
    arrow: "group-hover:text-emerald-600 dark:group-hover:text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  },
}

const LINKS: ProfileLink[] = [
  {
    label: "Our Main Website",
    href: "#",
    description: "Product, docs, and the full component story",
    icon: GlobeIcon,
    tone: "primary",
    featured: true,
  },
  {
    label: "Community Discord",
    href: "#",
    description: "Ask questions and share what you’re building",
    icon: MessageSquareIcon,
    tone: "violet",
  },
  {
    label: "Watch our Tutorial",
    href: "#",
    description: "Install, theme, and ship your first block",
    icon: PlayCircleIcon,
    tone: "rose",
  },
  {
    label: "Read the Docs",
    href: "#",
    description: "API reference, patterns, and examples",
    icon: LibraryIcon,
    tone: "sky",
  },
]

const SOCIALS = [
  { label: "Share", icon: Share2Icon, href: "#" },
  { label: "Code", icon: Code2Icon, href: "#" },
  { label: "Photos", icon: CameraIcon, href: "#" },
  { label: "Work", icon: BriefcaseIcon, href: "#" },
  { label: "Email", icon: MailIcon, href: "#" },
] as const

export default function SocialLinks({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative isolate min-h-svh w-full min-w-0 overflow-hidden bg-canvas px-4 py-20 text-foreground sm:px-6",
        className
      )}
      aria-labelledby="social-links-01-heading"
      {...props}
    >
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-12%] size-[34rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute end-[-10%] top-[28%] size-[22rem] rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute start-[-8%] bottom-[8%] size-[18rem] rounded-full bg-violet-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 12%, transparent) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-md">
        <div className="rounded-[20px] border border-border/70 bg-card/80 p-6 shadow-soft backdrop-blur-md sm:p-8">
          <div className="flex flex-col items-center gap-8">
            {/* Profile */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-full bg-linear-to-br from-primary/25 via-sky-400/15 to-transparent blur-md"
                />
                <Avatar className="relative size-24 ring-4 ring-primary/15 transition-[box-shadow] duration-300 hover:ring-primary/30">
                  <AvatarFallback className="bg-primary text-2xl font-semibold text-primary-foreground">
                    SJ
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -end-0.5 -bottom-0.5 flex size-6 items-center justify-center rounded-full border-[3px] border-card bg-emerald-500">
                  <span className="size-1.5 animate-pulse rounded-full bg-white" />
                  <span className="sr-only">Online</span>
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <h1
                    id="social-links-01-heading"
                    className="text-2xl font-semibold tracking-tight text-foreground"
                  >
                    SonoJS
                  </h1>
                  <Badge
                    variant="outline"
                    className="border-transparent bg-primary/10 font-semibold text-primary"
                  >
                    <SparklesIcon className="size-3" aria-hidden />
                    Studio
                  </Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground" dir="ltr">
                  @sonojs
                </p>
              </div>

              <p className="max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
                Beautiful, production-ready React components — copy the source,
                keep the craft.
              </p>
            </div>

            {/* Social chips */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-muted/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-soft"
                >
                  <Icon className="size-[18px]" aria-hidden />
                </a>
              ))}
            </div>

            {/* Link stack */}
            <ul className="flex w-full flex-col gap-3" role="list">
              {LINKS.map((link) => {
                const Icon = link.icon
                const tone = TONE[link.tone]
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        "group relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-[14px] border border-border/70 bg-card p-3.5 text-start shadow-xs transition-all duration-300 hover:-translate-y-0.5",
                        tone.ring,
                        tone.glow
                      )}
                    >
                      {link.featured ? (
                        <span
                          aria-hidden
                          className="absolute inset-y-0 start-0 w-1 bg-primary"
                        />
                      ) : null}
                      <span
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-[12px] transition-transform duration-300 group-hover:scale-105",
                          tone.well
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold text-foreground">
                            {link.label}
                          </span>
                          {link.featured ? (
                            <Badge
                              variant="outline"
                              className="h-5 border-transparent bg-amber-500/15 px-1.5 text-[10px] font-semibold text-amber-800 dark:text-amber-300"
                            >
                              Featured
                            </Badge>
                          ) : null}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                          {link.description}
                        </span>
                      </span>
                      <ArrowUpRightIcon
                        className={cn(
                          "size-4 shrink-0 text-muted-foreground/40 transition-all duration-300",
                          tone.arrow
                        )}
                        aria-hidden
                      />
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Soft CTA strip */}
            <div className="flex w-full items-start gap-3 rounded-[14px] border border-dashed border-border/70 bg-muted/30 px-4 py-3 text-start">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpenIcon className="size-3.5" aria-hidden />
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                New this week: portfolio, changelog, and reading-progress
                blocks — explore the full catalog.
              </p>
            </div>

            {/* Brand mark */}
            <div
              className="flex items-center gap-2 pt-2 text-muted-foreground/50 select-none"
              aria-hidden
            >
              <span className="flex size-5 items-center justify-center rounded-md bg-foreground/80 text-[10px] font-bold text-background">
                S
              </span>
              <span className="text-xs font-medium tracking-wide">
                Powered by SonoJS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import type * as React from "react"
import { MapPinIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import avatarImg from "./images/avatar.avif"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const USER = {
  name: "Maya Chen",
  title: "Staff Design Engineer",
  location: "San Francisco, CA",
  summary:
    "I connect design and engineering — tokens, component APIs, and documentation that teams actually ship with.",
} as const

const EXPERIENCE = [
  {
    role: "Staff Design Engineer",
    company: "Sono Labs",
    dates: "2023 — Present",
    detail:
      "Lead the design-system program across web. Own accessibility reviews and registry releases.",
  },
  {
    role: "Senior Product Designer",
    company: "Northwind",
    dates: "2020 — 2023",
    detail:
      "Shipped onboarding and billing surfaces. Introduced shared Figma ↔ code token pipelines.",
  },
  {
    role: "Product Designer",
    company: "Brightlane",
    dates: "2017 — 2020",
    detail:
      "Designed B2B dashboards and established the first component inventory.",
  },
] as const

const SKILLS = [
  "Design systems",
  "TypeScript",
  "React",
  "Accessibility",
  "Documentation",
  "Figma",
] as const

export default function UserProfile({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="user-profile-05-heading"
      {...props}
    >
      <article className="mx-auto w-full max-w-2xl">
        <header className="flex flex-col gap-4 text-start sm:flex-row sm:items-start sm:gap-5">
          <Avatar className="size-20 shrink-0 sm:size-24">
            <AvatarImage src={assetSrc(avatarImg)} alt={USER.name} />
            <AvatarFallback className="text-lg">MC</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h1
              id="user-profile-05-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              {USER.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-primary">
              {USER.title}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPinIcon className="size-3.5 shrink-0" aria-hidden />
              {USER.location}
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
              {USER.summary}
            </p>
          </div>
        </header>

        <Separator className="my-8" />

        <section aria-labelledby="user-profile-05-experience">
          <h2
            id="user-profile-05-experience"
            className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
          >
            Experience
          </h2>
          <ol className="mt-5 space-y-4">
            {EXPERIENCE.map((job, index) => (
              <li key={job.company} className="flex gap-3 sm:gap-4">
                <div
                  className="flex w-3 shrink-0 flex-col items-center"
                  aria-hidden
                >
                  <span
                    className={cn(
                      "mt-4 size-2.5 shrink-0 rounded-full bg-primary",
                      index === 0 && "ring-2 ring-primary/25"
                    )}
                  />
                  {index < EXPERIENCE.length - 1 ? (
                    <span className="mt-1 w-px flex-1 bg-border" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 rounded-[12px] border border-border/70 bg-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold">{job.role}</h3>
                    <span
                      dir="ltr"
                      className="text-xs tabular-nums text-muted-foreground"
                    >
                      {job.dates}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {job.company}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {job.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <Separator className="my-8" />

        <section aria-labelledby="user-profile-05-skills">
          <h2
            id="user-profile-05-skills"
            className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
          >
            Skills
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="rounded-full border-border/70 font-normal"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      </article>
    </section>
  )
}

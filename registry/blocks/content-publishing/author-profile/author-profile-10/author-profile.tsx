"use client"

import * as React from "react"
import {
  GlobeIcon,
  Link2Icon,
  RssIcon,
  Share2Icon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { ButtonGroup } from "@sonojs/ui/components/button-group"
import { cn } from "@/lib/utils"

import portrait01 from "./images/portrait-01.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const AUTHOR = {
  name: "Maya Chen",
  handle: "@mayachen",
  initials: "MC",
  role: "Senior Engineer",
  company: "Northwind",
  bio: "Building the future of web apps. OSS contributor, design systems nerd, and occasional blogger.",
  portrait: assetSrc(portrait01),
  chips: [
    { label: "GitHub", icon: Link2Icon },
    { label: "Website", icon: GlobeIcon },
    { label: "Newsletter", icon: RssIcon },
    { label: "React", icon: null },
    { label: "Design Systems", icon: null },
  ],
}

export default function AuthorProfile({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [following, setFollowing] = React.useState(false)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-background py-14 text-foreground sm:py-20",
        className
      )}
      aria-labelledby="author-profile-10-heading"
      {...props}
    >
      <div className="mx-auto flex max-w-md justify-center px-4 sm:px-6">
        <article className="relative w-full overflow-visible rounded-[12px] border border-border/70 bg-card px-6 pt-10 pb-7 text-center shadow-soft sm:px-8 sm:pt-12 sm:pb-8">
          <div className="pointer-events-none absolute start-0 end-0 top-0 z-10 flex -translate-y-1/2 justify-center">
            <Badge className="pointer-events-auto border-transparent bg-amber-500 text-amber-950 shadow-sm">
              Top writer
            </Badge>
          </div>

          <div className="mx-auto mb-5 flex justify-center">
            <Avatar className="size-24 ring-4 ring-background sm:size-28">
              <AvatarImage src={AUTHOR.portrait} alt="" />
              <AvatarFallback className="text-xl">
                {AUTHOR.initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <h1
            id="author-profile-10-heading"
            className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            {AUTHOR.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
            {AUTHOR.handle}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {AUTHOR.role} at{" "}
            <span className="font-medium text-foreground">
              {AUTHOR.company}
            </span>
          </p>

          <p className="mx-auto mt-4 line-clamp-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {AUTHOR.bio}
          </p>

          <div className="mt-6 flex justify-center">
            <ButtonGroup aria-label="Profile actions">
              <Button
                type="button"
                variant={following ? "outline" : "default"}
                aria-pressed={following}
                className="cursor-pointer"
                onClick={() => setFollowing((f) => !f)}
              >
                <UsersIcon className="size-3.5" aria-hidden />
                {following ? "Following" : "Follow"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                aria-label="Share profile"
                onClick={() => {}}
              >
                <Share2Icon className="size-3.5" aria-hidden />
                Share
              </Button>
            </ButtonGroup>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {AUTHOR.chips.map((chip) => {
              const Icon = chip.icon
              return (
                <button
                  key={chip.label}
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  {Icon ? <Icon className="size-3.5" aria-hidden /> : null}
                  {chip.label}
                </button>
              )
            })}
          </div>
        </article>
      </div>
    </section>
  )
}

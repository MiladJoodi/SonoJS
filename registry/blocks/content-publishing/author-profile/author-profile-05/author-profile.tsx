"use client"

import * as React from "react"
import { UsersIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import cover01 from "./images/cover-01.webp"
import portrait01 from "./images/portrait-01.webp"
import portrait02 from "./images/portrait-02.webp"
import portrait03 from "./images/portrait-03.webp"
import portrait04 from "./images/portrait-04.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type SideAuthor = {
  id: number
  name: string
  handle: string
  initials: string
  role: string
  portrait: string
  posts: number
}

const FEATURED = {
  name: "Maya Chen",
  handle: "@mayachen",
  initials: "MC",
  role: "Senior Engineer",
  company: "Northwind",
  bio: "Design systems, React, and the craft of shipping accessible UI.",
  followers: 12400,
  posts: 142,
  tags: ["React", "TypeScript", "Design Systems"],
  portrait: assetSrc(portrait01),
  cover: assetSrc(cover01),
}

const ALSO_WRITING: SideAuthor[] = [
  {
    id: 2,
    name: "Ravi Sharma",
    handle: "@ravisharma",
    initials: "RS",
    role: "Staff Engineer",
    portrait: assetSrc(portrait02),
    posts: 89,
  },
  {
    id: 3,
    name: "Asha Okafor",
    handle: "@ashaokafor",
    initials: "AO",
    role: "Product Designer",
    portrait: assetSrc(portrait03),
    posts: 67,
  },
  {
    id: 4,
    name: "Jonas Berg",
    handle: "@jonasberg",
    initials: "JB",
    role: "Design Engineer",
    portrait: assetSrc(portrait04),
    posts: 38,
  },
]

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

function SideAuthorCard({ author }: { author: SideAuthor }) {
  const [following, setFollowing] = React.useState(false)

  return (
    <article className="flex items-center gap-3 rounded-[12px] border border-border/70 bg-card p-3 shadow-soft transition-colors hover:border-primary/30">
      <Avatar className="size-11 shrink-0">
        <AvatarImage src={author.portrait} alt="" />
        <AvatarFallback>{author.initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 text-start">
        <p className="truncate text-sm font-semibold text-foreground">
          {author.name}
        </p>
        <p className="truncate text-xs text-muted-foreground">{author.role}</p>
        <p className="truncate text-xs text-muted-foreground" dir="ltr">
          {author.handle} · {author.posts} posts
        </p>
      </div>
      <Button
        type="button"
        size="sm"
        variant={following ? "outline" : "default"}
        aria-pressed={following}
        className="shrink-0 cursor-pointer"
        onClick={() => setFollowing((f) => !f)}
      >
        {following ? "Following" : "Follow"}
      </Button>
    </article>
  )
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
      aria-labelledby="author-profile-05-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl text-start">
          <p className="mb-2 text-sm font-medium text-primary">Spotlight</p>
          <h1
            id="author-profile-05-heading"
            className="text-h1 font-semibold tracking-tight text-foreground"
          >
            Featured writer this week
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A cinematic look at the people shaping our editorial calendar.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <article className="group relative overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:col-span-3">
            <div className="relative aspect-[16/10] overflow-hidden bg-muted sm:aspect-[16/9]">
              <img
                src={FEATURED.cover}
                alt=""
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="mb-3 flex flex-wrap gap-2">
                  {FEATURED.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="border-transparent bg-white/15 text-white backdrop-blur-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <Avatar className="size-12 ring-2 ring-white/40">
                    <AvatarImage src={FEATURED.portrait} alt="" />
                    <AvatarFallback className="bg-muted text-foreground">
                      {FEATURED.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 text-start">
                    <p className="truncate text-lg font-semibold text-white sm:text-xl">
                      {FEATURED.name}
                    </p>
                    <p className="truncate text-sm text-white/75" dir="ltr">
                      {FEATURED.handle}
                    </p>
                  </div>
                </div>

                <p className="mb-2 text-sm text-white/85">
                  {FEATURED.role} at {FEATURED.company}
                </p>
                <p className="mb-4 max-w-lg text-sm leading-relaxed text-white/70">
                  {FEATURED.bio}
                </p>
                <p className="mb-4 text-xs text-white/65">
                  <span dir="ltr" className="tabular-nums">
                    {formatCount(FEATURED.followers)}
                  </span>{" "}
                  followers ·{" "}
                  <span dir="ltr" className="tabular-nums">
                    {FEATURED.posts}
                  </span>{" "}
                  posts
                </p>

                <Button
                  type="button"
                  variant={following ? "secondary" : "default"}
                  aria-pressed={following}
                  className="cursor-pointer"
                  onClick={() => setFollowing((f) => !f)}
                >
                  <UsersIcon className="size-4" aria-hidden />
                  {following ? "Following" : "Follow"}
                </Button>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-3 lg:col-span-2">
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Also writing
            </h2>
            <div className="flex flex-col gap-3">
              {ALSO_WRITING.map((author) => (
                <SideAuthorCard key={author.id} author={author} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

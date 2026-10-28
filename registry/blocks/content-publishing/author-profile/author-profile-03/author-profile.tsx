"use client"

import * as React from "react"
import {
  ExternalLinkIcon,
  GlobeIcon,
  HeartIcon,
  Link2Icon,
  MessageSquareIcon,
  RssIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import portrait02 from "./images/portrait-02.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const AUTHOR = {
  name: "Ravi Sharma",
  handle: "@ravisharma",
  initials: "RS",
  role: "Staff Engineer",
  company: "Orbit",
  bio: "Passionate about developer tooling and performance. Writes about Rust, React, and bundle sizes — with a bias toward measurable wins.",
  followers: 8700,
  posts: 89,
  portrait: assetSrc(portrait02),
  links: [
    { icon: Link2Icon, label: "GitHub", href: "#" },
    { icon: GlobeIcon, label: "Website", href: "#" },
    { icon: RssIcon, label: "Newsletter", href: "#" },
  ],
  tags: ["Rust", "Performance", "Bundlers"],
  recentPosts: [
    {
      title: "Profiling React renders: a practical guide",
      likes: 287,
      comments: 19,
      date: "Oct 8, 2026",
    },
    {
      title: "My Rust journey after 10 years of JS",
      likes: 541,
      comments: 67,
      date: "Sep 21, 2026",
    },
    {
      title: "Cutting bundle size without cutting features",
      likes: 198,
      comments: 24,
      date: "Aug 30, 2026",
    },
  ],
}

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
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
      aria-labelledby="author-profile-03-heading"
      {...props}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
          <div className="overflow-hidden rounded-[12px] border border-border/70 bg-muted shadow-soft">
            <div className="aspect-[3/4] w-full">
              <img
                src={AUTHOR.portrait}
                alt=""
                className="size-full object-cover"
                aria-hidden
              />
            </div>
          </div>

          <div className="flex flex-col text-start lg:py-4">
            <Avatar className="mb-5 size-14 ring-2 ring-border/70 lg:hidden">
              <AvatarImage src={AUTHOR.portrait} alt="" />
              <AvatarFallback>{AUTHOR.initials}</AvatarFallback>
            </Avatar>

            <p className="mb-2 text-sm font-medium text-primary">Author</p>
            <h1
              id="author-profile-03-heading"
              className="text-h1 font-semibold tracking-tight text-foreground"
            >
              {AUTHOR.name}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground" dir="ltr">
              {AUTHOR.handle}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {AUTHOR.role} at{" "}
              <span className="font-semibold text-foreground">
                {AUTHOR.company}
              </span>
            </p>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {AUTHOR.bio}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {AUTHOR.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              <span dir="ltr" className="font-semibold tabular-nums text-foreground">
                {formatCount(AUTHOR.followers)}
              </span>{" "}
              followers ·{" "}
              <span dir="ltr" className="font-semibold tabular-nums text-foreground">
                {AUTHOR.posts}
              </span>{" "}
              posts
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant={following ? "outline" : "default"}
                aria-pressed={following}
                className="cursor-pointer"
                onClick={() => setFollowing((f) => !f)}
              >
                <UsersIcon className="size-4" aria-hidden />
                {following ? "Following" : "Follow"}
              </Button>

              <div className="flex flex-wrap gap-2">
                {AUTHOR.links.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => e.preventDefault()}
                    aria-label={label}
                    className="inline-flex size-[46px] cursor-pointer items-center justify-center rounded-[12px] border border-border/70 bg-card text-muted-foreground shadow-soft transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              Recent posts
            </h2>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              View all
              <ExternalLinkIcon className="icon-dir size-3" aria-hidden />
            </a>
          </div>
          <ul className="divide-y divide-border/70" role="list">
            {AUTHOR.recentPosts.map((post) => (
              <li key={post.title}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted/50"
                >
                  <div className="min-w-0 flex-1 text-start">
                    <p className="text-sm font-medium text-foreground">
                      {post.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground" dir="ltr">
                      {post.date}
                    </p>
                  </div>
                  <span className="mt-0.5 flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                    <span
                      dir="ltr"
                      className="inline-flex items-center gap-1 tabular-nums"
                    >
                      <HeartIcon className="size-3.5" aria-hidden />
                      {post.likes}
                    </span>
                    <span
                      dir="ltr"
                      className="inline-flex items-center gap-1 tabular-nums"
                    >
                      <MessageSquareIcon className="size-3.5" aria-hidden />
                      {post.comments}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

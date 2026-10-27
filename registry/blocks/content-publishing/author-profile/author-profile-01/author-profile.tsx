"use client"

import * as React from "react"
import {
  BookOpenIcon,
  CalendarIcon,
  ExternalLinkIcon,
  GlobeIcon,
  HeartIcon,
  Link2Icon,
  MapPinIcon,
  MessageSquareIcon,
  RssIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type SocialLink = {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
  href: string
}

type Author = {
  id: number
  name: string
  handle: string
  initials: string
  role: string
  company: string
  bio: string
  location: string
  joined: string
  followers: number
  following: number
  posts: number
  band: "primary" | "muted" | "emerald"
  links: SocialLink[]
  tags: string[]
  recentPosts: { title: string; likes: number; comments: number }[]
  featured?: boolean
}

const AUTHORS: Author[] = [
  {
    id: 1,
    name: "Maya Chen",
    handle: "@mayachen",
    initials: "MC",
    role: "Senior Engineer",
    company: "Northwind",
    bio: "Building the future of web apps. OSS contributor, design systems nerd, and occasional blogger.",
    location: "San Francisco, CA",
    joined: "March 2021",
    followers: 12400,
    following: 384,
    posts: 142,
    band: "primary",
    links: [
      { icon: Link2Icon, label: "GitHub", href: "#" },
      { icon: GlobeIcon, label: "Website", href: "#" },
      { icon: RssIcon, label: "Newsletter", href: "#" },
    ],
    tags: ["React", "TypeScript", "Design Systems", "Open Source"],
    recentPosts: [
      {
        title: "Why I switched from CSS Modules to utility-first CSS",
        likes: 428,
        comments: 34,
      },
      {
        title: "Building accessible component libraries from scratch",
        likes: 312,
        comments: 21,
      },
      {
        title: "The real cost of design system maintenance",
        likes: 195,
        comments: 18,
      },
    ],
    featured: true,
  },
  {
    id: 2,
    name: "Ravi Sharma",
    handle: "@ravisharma",
    initials: "RS",
    role: "Staff Engineer",
    company: "Orbit",
    bio: "Passionate about developer tooling and performance. Writes about Rust, React, and bundle sizes.",
    location: "Remote (Berlin)",
    joined: "July 2020",
    followers: 8700,
    following: 220,
    posts: 89,
    band: "muted",
    links: [
      { icon: Link2Icon, label: "GitHub", href: "#" },
      { icon: GlobeIcon, label: "Website", href: "#" },
    ],
    tags: ["Rust", "Performance", "Bundlers", "React"],
    recentPosts: [
      {
        title: "Profiling React renders: a practical guide",
        likes: 287,
        comments: 19,
      },
      {
        title: "My Rust journey after 10 years of JS",
        likes: 541,
        comments: 67,
      },
    ],
  },
  {
    id: 3,
    name: "Asha Okafor",
    handle: "@ashaokafor",
    initials: "AO",
    role: "Product Designer",
    company: "Studio",
    bio: "Designing tools designers use. Accessibility advocate and color theory enthusiast.",
    location: "Lagos, Nigeria",
    joined: "January 2022",
    followers: 6100,
    following: 415,
    posts: 67,
    band: "emerald",
    links: [
      { icon: GlobeIcon, label: "Website", href: "#" },
      { icon: RssIcon, label: "Newsletter", href: "#" },
    ],
    tags: ["UX Design", "Accessibility", "Color Theory"],
    recentPosts: [
      {
        title: "Why your color system is broken (and how to fix it)",
        likes: 634,
        comments: 52,
      },
      {
        title: "Accessible design tokens from day one",
        likes: 219,
        comments: 14,
      },
    ],
  },
]

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

const BAND: Record<Author["band"], string> = {
  primary: "bg-primary",
  muted: "bg-muted-foreground/40",
  emerald: "bg-emerald-500",
}

const STAT_SHELL: Record<Author["band"], string> = {
  primary: "border-primary/20 bg-primary/5",
  muted: "border-border/70 bg-muted/50",
  emerald: "border-emerald-500/20 bg-emerald-500/5",
}

function AuthorCard({ author }: { author: Author }) {
  const [following, setFollowing] = React.useState(false)

  return (
    <article className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft transition-shadow">
      <div className={cn("h-2 w-full", BAND[author.band])} aria-hidden />

      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="relative">
            <Avatar className="size-16">
              <AvatarFallback className="text-base">
                {author.initials}
              </AvatarFallback>
            </Avatar>
            {author.featured ? (
              <span className="absolute -end-1 -bottom-1 flex size-5 items-center justify-center rounded-full border-2 border-card bg-amber-400 text-amber-950">
                <StarIcon className="size-2.5 fill-current" aria-hidden />
                <span className="sr-only">Featured</span>
              </span>
            ) : null}
          </div>
          <Button
            type="button"
            size="sm"
            variant={following ? "outline" : "default"}
            aria-pressed={following}
            onClick={() => setFollowing((f) => !f)}
          >
            <UsersIcon className="size-3.5" aria-hidden />
            {following ? "Following" : "Follow"}
          </Button>
        </div>

        <div className="mb-3 text-start">
          <div className="mb-0.5 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">
              {author.name}
            </h3>
            {author.featured ? (
              <Badge className="border-transparent bg-amber-500/15 text-amber-800 dark:text-amber-300">
                Featured
              </Badge>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground" dir="ltr">
            {author.handle}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {author.role} at{" "}
            <span className="font-semibold text-foreground">
              {author.company}
            </span>
          </p>
        </div>

        <p className="mb-4 line-clamp-3 text-start text-sm leading-relaxed text-muted-foreground">
          {author.bio}
        </p>

        <ul className="mb-4 space-y-2" role="list">
          <li className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPinIcon className="size-3.5 shrink-0" aria-hidden />
            {author.location}
          </li>
          <li className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarIcon className="size-3.5 shrink-0" aria-hidden />
            Joined {author.joined}
          </li>
        </ul>

        <div
          className={cn(
            "mb-4 grid grid-cols-3 overflow-hidden rounded-[12px] border",
            STAT_SHELL[author.band]
          )}
        >
          {(
            [
              ["Followers", formatCount(author.followers)],
              ["Following", formatCount(author.following)],
              ["Posts", String(author.posts)],
            ] as const
          ).map(([label, value], i) => (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center py-3",
                i < 2 && "border-e border-border/70"
              )}
            >
              <p
                dir="ltr"
                className="text-base font-bold tabular-nums text-foreground"
              >
                {value}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {author.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {author.links.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md border border-border/70 bg-muted/40 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              <Icon className="size-3.5" aria-hidden />
            </a>
          ))}
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <BookOpenIcon
              className="size-3.5 text-muted-foreground"
              aria-hidden
            />
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Recent Posts
            </p>
          </div>
          <ul className="space-y-1" role="list">
            {author.recentPosts.map((post) => (
              <li key={post.title}>
                <a
                  href="#"
                  className="group/post -mx-2.5 flex cursor-pointer items-start justify-between gap-3 rounded-md p-2.5 transition-colors hover:bg-muted/50"
                >
                  <span className="min-w-0 flex-1 text-start text-xs leading-snug text-muted-foreground transition-colors group-hover/post:text-foreground">
                    {post.title}
                  </span>
                  <span className="mt-0.5 flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                    <span
                      dir="ltr"
                      className="inline-flex items-center gap-1 tabular-nums"
                    >
                      <HeartIcon className="size-3" aria-hidden />
                      {post.likes}
                    </span>
                    <span
                      dir="ltr"
                      className="inline-flex items-center gap-1 tabular-nums"
                    >
                      <MessageSquareIcon className="size-3" aria-hidden />
                      {post.comments}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70 px-6 py-3">
        <a
          href="#"
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          View full profile
          <ExternalLinkIcon className="size-3" aria-hidden />
        </a>
      </div>
    </article>
  )
}

export default function AuthorProfile({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas py-16 text-foreground sm:py-24",
        className
      )}
      aria-labelledby="author-profile-01-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4 font-semibold">
            Our Authors
          </Badge>
          <h1
            id="author-profile-01-heading"
            className="text-h1 font-semibold tracking-tight text-foreground"
          >
            Meet the people behind the content
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Our authors are practitioners — engineers, designers, and builders
            sharing real-world experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AUTHORS.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      </div>
    </section>
  )
}

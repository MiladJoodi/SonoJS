"use client"

import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type TypeAuthor = {
  name: string
  handle: string
  role: string
  location: string
  joined: string
  bio: string
  links: { label: string; href: string }[]
}

const AUTHORS: TypeAuthor[] = [
  {
    name: "Maya Chen",
    handle: "@mayachen",
    role: "Senior Engineer",
    location: "San Francisco",
    joined: "March 2021",
    bio: "Building the future of web apps. OSS contributor, design systems nerd, and occasional blogger.",
    links: [
      { label: "Essays", href: "#" },
      { label: "Talks", href: "#" },
      { label: "Newsletter", href: "#" },
    ],
  },
  {
    name: "Ravi Sharma",
    handle: "@ravisharma",
    role: "Staff Engineer",
    location: "Berlin",
    joined: "July 2020",
    bio: "Passionate about developer tooling and performance. Writes about Rust, React, and bundle sizes.",
    links: [
      { label: "Notes", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    name: "Asha Okafor",
    handle: "@ashaokafor",
    role: "Product Designer",
    location: "Lagos",
    joined: "January 2022",
    bio: "Designing tools designers use. Accessibility advocate and color theory enthusiast.",
    links: [
      { label: "Portfolio", href: "#" },
      { label: "Reading list", href: "#" },
    ],
  },
]

function TypeBio({
  author,
  featured,
}: {
  author: TypeAuthor
  featured?: boolean
}) {
  const [following, setFollowing] = React.useState(false)

  return (
    <article
      className={cn(
        "border-b border-border/70 py-10 first:pt-0 last:border-b-0 last:pb-0",
        featured && "pb-12"
      )}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 max-w-2xl text-start">
          <h2
            className={cn(
              "font-semibold tracking-tight text-foreground",
              featured ? "text-h1" : "text-h2"
            )}
          >
            {author.name}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground" dir="ltr">
            {author.handle}
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {author.bio}
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            <span>{author.role}</span>
            <span aria-hidden className="mx-2 text-border">
              ·
            </span>
            <span>{author.location}</span>
            <span aria-hidden className="mx-2 text-border">
              ·
            </span>
            <span dir="ltr">Joined {author.joined}</span>
          </p>
          {author.links.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" role="list">
              {author.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                    <ArrowUpRightIcon
                      className="icon-dir size-3.5 text-muted-foreground"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <Button
          type="button"
          variant="ghost"
          aria-pressed={following}
          className="shrink-0 cursor-pointer self-start border border-border/70"
          onClick={() => setFollowing((f) => !f)}
        >
          {following ? "Following" : "Follow"}
        </Button>
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
        "w-full min-w-0 bg-white py-14 text-foreground sm:py-20 dark:bg-background",
        className
      )}
      aria-labelledby="author-profile-07-heading"
      {...props}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-border/70 pb-8 text-start">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Contributors
          </p>
          <h1
            id="author-profile-07-heading"
            className="text-h2 font-semibold tracking-tight text-foreground"
          >
            Writers in their own words
          </h1>
        </header>

        <div>
          {AUTHORS.map((author, i) => (
            <TypeBio
              key={author.handle}
              author={author}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

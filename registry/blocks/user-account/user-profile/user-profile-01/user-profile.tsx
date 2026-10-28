"use client"

import * as React from "react"
import {
  BookOpenIcon,
  CalendarIcon,
  ExternalLinkIcon,
  GitForkIcon,
  Link2Icon,
  MapPinIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  StarIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"
import { cn } from "@/lib/utils"

import avatarImg from "./images/avatar.avif"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const USER = {
  name: "Maya Chen",
  username: "@mayachen",
  bio: "Full-stack developer passionate about design systems and accessible UI. Building open-source UI kits in public.",
  location: "San Francisco, CA",
  website: "mayachen.dev",
  joinDate: "March 2022",
  following: 234,
  followers: 1842,
} as const

const STATS = [
  { label: "Repositories", value: "48" },
  { label: "Stars Earned", value: "2.4k" },
  { label: "Contributions", value: "1,203" },
  { label: "Pull Requests", value: "87" },
] as const

const PINNED_REPOS = [
  {
    name: "sono-ui",
    description:
      "Production-ready React component library with accessible primitives and a clear token scale.",
    language: "TypeScript",
    stars: 1204,
    forks: 89,
    dotClass: "bg-sky-500",
  },
  {
    name: "design-system-starter",
    description:
      "Opinionated starter template for building design systems with accessible primitives and Tailwind CSS.",
    language: "TypeScript",
    stars: 387,
    forks: 42,
    dotClass: "bg-sky-500",
  },
  {
    name: "oklch-tools",
    description:
      "CLI and browser tools for working with oklch perceptual color space in CSS.",
    language: "JavaScript",
    stars: 156,
    forks: 18,
    dotClass: "bg-amber-500",
  },
  {
    name: "react-router-workshop",
    description:
      "Hands-on workshop code for React Router with SSR, data loading, and form actions.",
    language: "TypeScript",
    stars: 98,
    forks: 31,
    dotClass: "bg-sky-500",
  },
] as const

const ACTIVITY = [
  {
    type: "commit",
    repo: "sono-ui",
    message: "feat: add oklch color preview to theme switcher",
    time: "2 hours ago",
  },
  {
    type: "pr",
    repo: "radix-ui/primitives",
    message: "fix: correct aria-label for Dialog close button",
    time: "Yesterday",
  },
  {
    type: "star",
    repo: "tailwindlabs/tailwindcss",
    message: "starred repository",
    time: "2 days ago",
  },
  {
    type: "issue",
    repo: "sono-ui",
    message: "fix: Slider thumb focus ring not visible in Safari",
    time: "3 days ago",
  },
  {
    type: "commit",
    repo: "design-system-starter",
    message: "docs: add migration guide from Tailwind v3",
    time: "4 days ago",
  },
] as const

const SKILLS = [
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Node.js",
  "CSS",
  "Design Systems",
] as const

function ActivityIcon({ type }: { type: string }) {
  const map: Record<
    string,
    { icon: React.ReactNode; className: string }
  > = {
    commit: {
      icon: <BookOpenIcon aria-hidden className="size-3" />,
      className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    pr: {
      icon: <GitForkIcon aria-hidden className="size-3" />,
      className: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    star: {
      icon: <StarIcon aria-hidden className="size-3" />,
      className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    issue: {
      icon: <MessageSquareIcon aria-hidden className="size-3" />,
      className: "bg-primary/10 text-primary",
    },
  }
  const entry = map[type] ?? map.commit
  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full",
        entry.className
      )}
    >
      {entry.icon}
    </div>
  )
}

export default function UserProfile({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [following, setFollowing] = React.useState(false)

  return (
    <main
      className={cn(
        "w-full min-w-0 bg-white pb-8 text-foreground dark:bg-background sm:pb-10",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-5xl px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-20 sm:size-24">
              <AvatarImage src={assetSrc(avatarImg)} alt={USER.name} />
              <AvatarFallback className="text-lg">MC</AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-start">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {USER.name}
              </h1>
              <p className="text-sm text-muted-foreground">{USER.username}</p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={following ? "outline" : "default"}
              className="flex-1 justify-center sm:flex-none"
              onClick={() => setFollowing((v) => !v)}
            >
              {following ? "Following" : "Follow"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 justify-center sm:flex-none"
            >
              Edit Profile
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label="More options"
              className="shrink-0"
            >
              <MoreHorizontalIcon aria-hidden />
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="min-w-0">
            <div className="flex flex-col gap-6">
              <div className="text-start">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {USER.bio}
                </p>
                <ul className="mt-4 space-y-2" role="list">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPinIcon
                      className="size-4 shrink-0"
                      aria-hidden
                    />
                    {USER.location}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Link2Icon
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                    <a
                      href={`https://${USER.website}`}
                      className="cursor-pointer text-primary hover:underline"
                      dir="ltr"
                    >
                      {USER.website}
                    </a>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon
                      className="size-4 shrink-0"
                      aria-hidden
                    />
                    Joined {USER.joinDate}
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-start">
                  <p className="text-sm font-bold tabular-nums text-foreground">
                    {USER.followers.toLocaleString("en-US")}
                  </p>
                  <p className="text-xs text-muted-foreground">followers</p>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="text-start">
                  <p className="text-sm font-bold tabular-nums text-foreground">
                    {USER.following}
                  </p>
                  <p className="text-xs text-muted-foreground">following</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[12px] border border-border/70 bg-card p-3"
                  >
                    <p
                      dir="ltr"
                      className="text-lg font-semibold tabular-nums text-foreground"
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="text-start">
                <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Top Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <Tabs defaultValue="repos" className="gap-0">
              <TabsList
                variant="line"
                aria-label="Profile sections"
                className="h-auto w-full max-w-full justify-start gap-0 overflow-x-auto rounded-none bg-transparent p-0"
              >
                <TabsTrigger value="repos">Repositories</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="stars">Starred</TabsTrigger>
              </TabsList>

              <TabsContent value="repos" className="mt-6">
                <p className="mb-4 text-start text-sm text-muted-foreground">
                  {PINNED_REPOS.length} public repositories
                </p>
                <ul className="space-y-3" role="list">
                  {PINNED_REPOS.map((repo) => (
                    <li key={repo.name}>
                      <button
                        type="button"
                        className="group w-full cursor-pointer rounded-[12px] border border-border/70 bg-card p-5 text-start transition-colors hover:border-primary/20"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 flex-wrap items-center gap-2">
                              <span className="text-sm font-semibold text-primary group-hover:underline">
                                {repo.name}
                              </span>
                              <Badge variant="outline">Public</Badge>
                            </div>
                            <ExternalLinkIcon
                              className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                              aria-hidden
                            />
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {repo.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                            <span className="inline-flex items-center gap-2 text-xs">
                              <span
                                className={cn(
                                  "size-2.5 rounded-full",
                                  repo.dotClass
                                )}
                                aria-hidden
                              />
                              {repo.language}
                            </span>
                            <span
                              dir="ltr"
                              className="inline-flex items-center gap-1 text-xs tabular-nums"
                            >
                              <StarIcon className="size-3.5" aria-hidden />
                              {repo.stars.toLocaleString("en-US")}
                            </span>
                            <span
                              dir="ltr"
                              className="inline-flex items-center gap-1 text-xs tabular-nums"
                            >
                              <GitForkIcon className="size-3.5" aria-hidden />
                              {repo.forks}
                            </span>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <ul
                  className="divide-y divide-border/70 overflow-hidden rounded-[12px] border border-border/70 bg-card"
                  role="list"
                >
                  {ACTIVITY.map((item) => (
                    <li
                      key={`${item.type}-${item.repo}-${item.time}`}
                      className="flex items-start gap-3 px-4 py-3"
                    >
                      <ActivityIcon type={item.type} />
                      <div className="min-w-0 flex-1 text-start">
                        <p className="text-sm">
                          <span className="font-medium text-primary">
                            {item.repo}
                          </span>{" "}
                          <span className="text-muted-foreground">
                            — {item.message}
                          </span>
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="stars" className="mt-6">
                <ul className="space-y-3" role="list">
                  {PINNED_REPOS.slice(0, 3).map((repo) => (
                    <li
                      key={repo.name}
                      className="rounded-[12px] border border-border/70 bg-card p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 text-start">
                          <p
                            dir="ltr"
                            className="text-sm font-semibold text-primary"
                          >
                            {USER.username.replace(/^@/, "")}/{repo.name}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {repo.description}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="xs"
                          aria-label={`Unstar ${repo.name}`}
                          className="shrink-0 text-amber-600 hover:bg-amber-500/10 hover:text-amber-700 dark:text-amber-400"
                        >
                          <StarIcon className="size-3" aria-hidden />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

    </main>
  )
}

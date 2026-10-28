"use client"

import * as React from "react"
import {
  ActivityIcon,
  HeartIcon,
  MapPinIcon,
  MessageSquareIcon,
  UsersIcon,
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
  location: "San Francisco, CA",
  joined: "March 2021",
  portrait: assetSrc(portrait01),
  tags: ["React", "TypeScript", "Design Systems"],
  recentPosts: [
    {
      title: "Why I switched from CSS Modules to utility-first CSS",
      date: "Oct 12, 2026",
      likes: 428,
      comments: 34,
    },
    {
      title: "Building accessible component libraries from scratch",
      date: "Sep 28, 2026",
      likes: 312,
      comments: 21,
    },
    {
      title: "Token pipelines that survive a rebrand",
      date: "Sep 4, 2026",
      likes: 256,
      comments: 18,
    },
  ],
  activity: [
    {
      id: 1,
      text: "Published “Why I switched from CSS Modules to utility-first CSS”",
      time: "2d ago",
    },
    {
      id: 2,
      text: "Liked Ravi Sharma’s “Profiling React renders”",
      time: "4d ago",
    },
    {
      id: 3,
      text: "Followed Asha Okafor",
      time: "1w ago",
    },
    {
      id: 4,
      text: "Commented on Jonas Berg’s direction-aware components note",
      time: "2w ago",
    },
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
      aria-labelledby="author-profile-06-heading"
      {...props}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex min-w-0 items-center gap-4">
              <Avatar className="size-16 shrink-0 ring-2 ring-border/70">
                <AvatarImage src={AUTHOR.portrait} alt="" />
                <AvatarFallback className="text-base">
                  {AUTHOR.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 text-start">
                <h1
                  id="author-profile-06-heading"
                  className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                >
                  {AUTHOR.name}
                </h1>
                <p className="text-sm text-muted-foreground" dir="ltr">
                  {AUTHOR.handle}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {AUTHOR.role} at{" "}
                  <span className="font-medium text-foreground">
                    {AUTHOR.company}
                  </span>
                </p>
              </div>
            </div>
            <Button
              type="button"
              size="sm"
              variant={following ? "outline" : "default"}
              aria-pressed={following}
              className="w-full cursor-pointer sm:w-auto"
              onClick={() => setFollowing((f) => !f)}
            >
              <UsersIcon className="size-3.5" aria-hidden />
              {following ? "Following" : "Follow"}
            </Button>
          </div>

          <Separator />

          <div className="p-5 sm:p-6">
            <Tabs defaultValue="posts" className="min-w-0 w-full gap-5">
              <TabsList
                aria-label="Author workspace"
                className="w-full justify-start"
              >
                <TabsTrigger value="posts" className="cursor-pointer">
                  Posts
                </TabsTrigger>
                <TabsTrigger value="about" className="cursor-pointer">
                  About
                </TabsTrigger>
                <TabsTrigger value="activity" className="cursor-pointer">
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="mt-0 space-y-1">
                <ul className="divide-y divide-border/70" role="list">
                  {AUTHOR.recentPosts.map((post) => (
                    <li key={post.title}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="group -mx-2 flex cursor-pointer flex-col gap-2 rounded-md px-2 py-3.5 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0 text-start">
                          <p className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                            {post.title}
                          </p>
                          <p
                            className="mt-1 text-xs text-muted-foreground"
                            dir="ltr"
                          >
                            {post.date}
                          </p>
                        </div>
                        <span className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
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
                            <MessageSquareIcon
                              className="size-3.5"
                              aria-hidden
                            />
                            {post.comments}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="about" className="mt-0 space-y-5">
                <p className="text-start text-sm leading-relaxed text-muted-foreground">
                  {AUTHOR.bio}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinIcon className="size-4 shrink-0" aria-hidden />
                  <span>{AUTHOR.location}</span>
                </div>
                <p className="text-xs text-muted-foreground" dir="ltr">
                  Joined {AUTHOR.joined}
                </p>
                <div className="flex flex-wrap gap-2">
                  {AUTHOR.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-0">
                <ul className="space-y-3" role="list">
                  {AUTHOR.activity.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-start gap-3 rounded-[12px] border border-border/70 bg-muted/30 px-3.5 py-3"
                    >
                      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ActivityIcon className="size-3.5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1 text-start">
                        <p className="text-sm text-foreground">{item.text}</p>
                        <p
                          className="mt-1 text-xs text-muted-foreground"
                          dir="ltr"
                        >
                          {item.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}

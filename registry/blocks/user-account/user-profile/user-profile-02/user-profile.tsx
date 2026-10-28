"use client"

import * as React from "react"
import {
  FolderGit2Icon,
  GlobeIcon,
  MailIcon,
  MessageSquareIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import avatarImg from "./images/avatar.avif"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const USER = {
  name: "Maya Chen",
  username: "@mayachen",
  role: "Design systems · Open source",
  bio: "Building accessible UI kits and sharing the process in public.",
  followers: "12.4k",
  following: "318",
  posts: "86",
} as const

export default function UserProfile({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [following, setFollowing] = React.useState(false)

  return (
    <section
      className={cn(
        "flex w-full min-w-0 items-center justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="user-profile-02-heading"
      {...props}
    >
      <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <Avatar className="size-24 sm:size-28">
            <AvatarImage src={assetSrc(avatarImg)} alt={USER.name} />
            <AvatarFallback className="text-lg">MC</AvatarFallback>
          </Avatar>

          <h1
            id="user-profile-02-heading"
            className="mt-4 text-xl font-semibold tracking-tight"
          >
            {USER.name}
          </h1>
          <p className="text-sm text-muted-foreground">{USER.username}</p>
          <Badge
            variant="outline"
            className="mt-3 rounded-full border-transparent bg-primary/10 text-primary"
          >
            {USER.role}
          </Badge>
          <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            {USER.bio}
          </p>

          <dl className="mt-6 grid w-full grid-cols-3 gap-2 border-y border-border/70 py-4">
            <div>
              <dt className="text-xs text-muted-foreground">Followers</dt>
              <dd
                dir="ltr"
                className="mt-0.5 text-sm font-semibold tabular-nums"
              >
                {USER.followers}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Following</dt>
              <dd
                dir="ltr"
                className="mt-0.5 text-sm font-semibold tabular-nums"
              >
                {USER.following}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Posts</dt>
              <dd
                dir="ltr"
                className="mt-0.5 text-sm font-semibold tabular-nums"
              >
                {USER.posts}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center justify-center gap-2">
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="size-10 cursor-pointer"
              aria-label="GitHub"
            >
              <FolderGit2Icon className="size-4" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="size-10 cursor-pointer"
              aria-label="Website"
            >
              <GlobeIcon className="size-4" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="size-10 cursor-pointer"
              aria-label="Email"
            >
              <MailIcon className="size-4" aria-hidden />
            </Button>
          </div>

          <div className="mt-5 flex w-full flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              className="flex-1 cursor-pointer"
              variant={following ? "outline" : "default"}
              onClick={() => setFollowing((v) => !v)}
            >
              {following ? "Following" : "Follow"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 cursor-pointer"
            >
              <MessageSquareIcon className="size-4" aria-hidden />
              Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

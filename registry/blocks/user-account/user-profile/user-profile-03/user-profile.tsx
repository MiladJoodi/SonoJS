"use client"

import type * as React from "react"
import {
  BoxesIcon,
  ComponentIcon,
  Link2Icon,
  MapPinIcon,
  PaletteIcon,
  SparklesIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import avatarImg from "./images/avatar.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const USER = {
  name: "Noah Park",
  username: "@noahpark",
  title: "Product designer & systems lead",
  bio: "I shape tokens, component APIs, and docs culture for product teams shipping weekly.",
  location: "Berlin, DE",
  website: "noahpark.design",
} as const

const PROJECTS = [
  {
    name: "Atlas Tokens",
    description: "Shared color, type, and space scale across web and native.",
    icon: PaletteIcon,
  },
  {
    name: "Prism Kit",
    description: "Accessible React primitives with a clear density ladder.",
    icon: ComponentIcon,
  },
  {
    name: "Studio Blocks",
    description: "Composable page sections for marketing and onboarding.",
    icon: BoxesIcon,
  },
  {
    name: "Motion Specs",
    description: "Duration and easing tokens with live preview embeds.",
    icon: SparklesIcon,
  },
] as const

export default function UserProfile({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white text-foreground dark:bg-background",
        className
      )}
      aria-labelledby="user-profile-03-heading"
      {...props}
    >
      <div
        className="h-16 bg-gradient-to-br from-primary/35 via-primary/10 to-muted sm:h-20"
        aria-hidden
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-8 flex flex-col gap-4 sm:-mt-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <Avatar className="size-20 ring-4 ring-white dark:ring-background sm:size-24">
              <AvatarImage src={assetSrc(avatarImg)} alt={USER.name} />
              <AvatarFallback className="text-lg">NP</AvatarFallback>
            </Avatar>
            <div className="mb-0.5 min-w-0 pb-0.5">
              <h1
                id="user-profile-03-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                {USER.name}
              </h1>
              <p className="text-sm text-muted-foreground">{USER.username}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pb-0.5">
            <Button type="button" size="sm" className="cursor-pointer">
              Follow
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="cursor-pointer"
            >
              Share profile
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 pb-10 lg:grid-cols-5">
          <aside className="space-y-4 text-start lg:col-span-2">
            <div>
              <p className="text-sm font-medium">{USER.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {USER.bio}
              </p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPinIcon className="size-3.5 shrink-0" aria-hidden />
                {USER.location}
              </li>
              <li className="flex items-center gap-2">
                <Link2Icon className="size-3.5 shrink-0" aria-hidden />
                <a
                  href={`https://${USER.website}`}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {USER.website}
                </a>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Design systems</Badge>
              <Badge variant="secondary">Accessibility</Badge>
              <Badge variant="secondary">Docs</Badge>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold">Featured work</h2>
              <span className="text-xs text-muted-foreground">4 projects</span>
            </div>
            <Separator className="mb-4" />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PROJECTS.map((project) => {
                const Icon = project.icon
                return (
                  <li key={project.name}>
                    <button
                      type="button"
                      className="flex h-full w-full cursor-pointer flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-4 text-start transition-colors hover:border-primary/30"
                    >
                      <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className="text-sm font-semibold">
                        {project.name}
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

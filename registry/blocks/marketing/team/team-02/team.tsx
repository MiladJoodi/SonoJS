import type * as React from "react"

import { cn } from "@/lib/utils"

import team01 from "./images/team-01.webp"
import team02 from "./images/team-02.webp"
import team03 from "./images/team-03.webp"
import team04 from "./images/team-04.webp"
import team05 from "./images/team-05.webp"
import team06 from "./images/team-06.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function LinkedInIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-full fill-current", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0" />
    </svg>
  )
}

function XIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-full fill-current", className)}
      viewBox="0 0 1226.37 1226.37"
      aria-hidden="true"
      {...props}
    >
      <path d="M727.348 519.284 1174.075 0h-105.86L680.322 450.887 370.513 0H13.185l468.492 681.821L13.185 1226.37h105.866l409.625-476.152 327.181 476.152h357.328L727.322 519.284zM582.35 687.828l-47.468-67.894-377.686-540.24H319.8l304.797 435.991 47.468 67.894 396.2 566.721H905.661L582.35 687.854z" />
    </svg>
  )
}

const SOCIAL_ICONS = {
  linkedin: LinkedInIcon,
  x: XIcon,
} as const

type SocialPlatform = keyof typeof SOCIAL_ICONS

const DEFAULT_MEMBERS = [
  {
    name: "Amelia Hart",
    role: "Head of Engineering",
    image: assetSrc(team01),
    bio: "Leads platform architecture and ships resilient systems used by millions every day.",
    socials: { linkedin: "#", x: "#" } satisfies Record<SocialPlatform, string>,
  },
  {
    name: "Marcus Chen",
    role: "Product Design Lead",
    image: assetSrc(team02),
    bio: "Shapes product vision through craft, clarity, and obsessive attention to detail.",
    socials: { linkedin: "#", x: "#" } satisfies Record<SocialPlatform, string>,
  },
  {
    name: "Sofia Alvarez",
    role: "Brand Designer",
    image: assetSrc(team03),
    bio: "Builds visual systems that feel timeless—typography, motion, and narrative as one.",
    socials: { linkedin: "#", x: "#" } satisfies Record<SocialPlatform, string>,
  },
  {
    name: "Noah Patel",
    role: "Frontend Architect",
    image: assetSrc(team04),
    bio: "Turns complex interfaces into fast, accessible experiences across every screen.",
    socials: { linkedin: "#", x: "#" } satisfies Record<SocialPlatform, string>,
  },
  {
    name: "Elena Rossi",
    role: "Growth Marketing",
    image: assetSrc(team05),
    bio: "Connects product stories to the right audiences with precision and restraint.",
    socials: { linkedin: "#", x: "#" } satisfies Record<SocialPlatform, string>,
  },
  {
    name: "James Okonkwo",
    role: "Platform Engineer",
    image: assetSrc(team06),
    bio: "Owns reliability and developer experience so the whole org can move faster.",
    socials: { linkedin: "#", x: "#" } satisfies Record<SocialPlatform, string>,
  },
]

export default function Team({
  title = "The people behind the product",
  eyebrow = "Leadership",
  description = "A focused crew of builders, designers, and operators who care deeply about craft and outcomes.",
  members = DEFAULT_MEMBERS,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  eyebrow?: string
  description?: string
  members?: {
    name: string
    role: string
    image: string
    bio: string
    socials: Partial<Record<SocialPlatform, string>>
  }[]
}) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="team-heading"
      {...props}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h2
            id="team-heading"
            className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            {title}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <ul className="mx-auto grid max-w-sm gap-5 sm:max-w-xl sm:grid-cols-2 md:max-w-full md:grid-cols-3 md:gap-6">
          {members.map((member) => (
            <li
              key={member.name}
              className="group flex flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]"
            >
              <div className="aspect-[5/4] overflow-hidden bg-muted">
                <img
                  src={member.image}
                  className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  alt={member.name}
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 text-start">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {(
                    Object.entries(member.socials) as [SocialPlatform, string][]
                  ).map(([platform, url]) => {
                    const Icon = SOCIAL_ICONS[platform]
                    if (!Icon || !url) return null
                    return (
                      <li key={platform}>
                        <a
                          href={url}
                          className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                          aria-label={platform}
                        >
                          <Icon />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

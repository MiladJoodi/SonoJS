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

const DEFAULT_MEMBERS = [
  {
    id: 1,
    name: "Amelia Hart",
    role: "Head of Engineering",
    image: assetSrc(team01),
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Product Design Lead",
    image: assetSrc(team02),
  },
  {
    id: 3,
    name: "Sofia Alvarez",
    role: "Brand Designer",
    image: assetSrc(team03),
  },
  {
    id: 4,
    name: "Noah Patel",
    role: "Frontend Architect",
    image: assetSrc(team04),
  },
  {
    id: 5,
    name: "Elena Rossi",
    role: "Growth Marketing",
    image: assetSrc(team05),
  },
  {
    id: 6,
    name: "James Okonkwo",
    role: "Platform Engineer",
    image: assetSrc(team06),
  },
  {
    id: 7,
    name: "Lina Berg",
    role: "User Research",
    image: assetSrc(team01),
  },
  {
    id: 8,
    name: "Omar Farid",
    role: "Data Science",
    image: assetSrc(team02),
  },
]

export default function Team({
  title = "Hover and discover",
  eyebrow = "Interactive",
  description = "Tight circular portraits that lift and layer on hover—playful without losing polish.",
  members = DEFAULT_MEMBERS,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  eyebrow?: string
  description?: string
  members?: {
    id: number
    name: string
    role: string
    image: string
  }[]
}) {
  return (
    <section
      className={cn("w-full px-4 md:px-6", className)}
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

        <ul className="grid grid-cols-2 gap-4 overflow-visible md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {members.map((member) => (
            <li
              key={member.id}
              className="group rounded-[12px] border border-border/70 bg-card px-3 py-5 shadow-soft transition-transform duration-500 hover:z-10 hover:scale-105 sm:px-4 sm:py-6"
            >
              <div className="mx-auto size-28 overflow-hidden rounded-full bg-muted ring-1 ring-border/60 sm:size-36">
                <img
                  src={member.image}
                  className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
                  alt={member.name}
                  loading="lazy"
                />
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

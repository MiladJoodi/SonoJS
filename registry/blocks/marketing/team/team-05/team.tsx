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
    img: assetSrc(team01),
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Product Design Lead",
    img: assetSrc(team02),
  },
  {
    id: 3,
    name: "Sofia Alvarez",
    role: "Brand Designer",
    img: assetSrc(team03),
  },
  {
    id: 4,
    name: "Noah Patel",
    role: "Frontend Architect",
    img: assetSrc(team04),
  },
  {
    id: 5,
    name: "Elena Rossi",
    role: "Growth Marketing",
    img: assetSrc(team05),
  },
  {
    id: 6,
    name: "James Okonkwo",
    role: "Platform Engineer",
    img: assetSrc(team06),
  },
  {
    id: 7,
    name: "Lina Berg",
    role: "User Research",
    img: assetSrc(team01),
  },
  {
    id: 8,
    name: "Omar Farid",
    role: "Data Science",
    img: assetSrc(team02),
  },
]

export default function Team({
  title = "Quiet confidence",
  eyebrow = "Collective",
  description = "Minimal avatars, generous space—let the portraits and titles do the work.",
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
    img: string
  }[]
}) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="team-heading"
      {...props}
    >
      <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
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

      <ul className="mx-auto grid max-w-xl grid-cols-2 gap-x-8 gap-y-14 md:max-w-3xl md:grid-cols-3 lg:max-w-5xl lg:grid-cols-4">
        {members.map((member) => (
          <li key={member.id} className="group text-center">
            <div className="mx-auto size-28 overflow-hidden rounded-full bg-muted ring-1 ring-border/70 transition-transform duration-500 group-hover:scale-[1.03] sm:size-32">
              <img
                src={member.img}
                className="size-full object-cover object-top"
                alt={member.name}
                loading="lazy"
              />
            </div>

            <div className="mt-5">
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {member.name}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

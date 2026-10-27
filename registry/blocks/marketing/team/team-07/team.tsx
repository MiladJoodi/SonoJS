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
    img: assetSrc(team02),
  },
  {
    id: 8,
    name: "Omar Farid",
    role: "Data Science",
    img: assetSrc(team01),
  },
  {
    id: 9,
    name: "Priya Nair",
    role: "Customer Success",
    img: assetSrc(team03),
  },
]

export default function Team({
  title = "Who you’ll work with",
  eyebrow = "Roster",
  description = "A calm directory layout—avatars and titles in a soft band that reads well at any width.",
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
      className={cn("w-full bg-muted/40 px-6 py-14 md:py-16", className)}
      aria-labelledby="team-heading"
      {...props}
    >
      <div className="mx-auto sm:max-w-2xl lg:max-w-5xl">
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

        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-3">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex flex-col items-center gap-4 max-sm:text-center sm:flex-row sm:gap-5 sm:text-start"
            >
              <div className="size-20 shrink-0 overflow-hidden rounded-full border border-border/70 bg-card shadow-soft sm:size-24"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
                <img
                  src={member.img}
                  className="size-full object-cover object-top"
                  alt={member.name}
                  loading="lazy"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-primary">
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

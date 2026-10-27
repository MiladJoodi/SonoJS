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
    location: "San Francisco",
    role: "Head of Engineering",
    img: assetSrc(team01),
  },
  {
    id: 2,
    name: "Marcus Chen",
    location: "Singapore",
    role: "Product Design Lead",
    img: assetSrc(team02),
  },
  {
    id: 3,
    name: "Sofia Alvarez",
    location: "Madrid",
    role: "Brand Designer",
    img: assetSrc(team03),
  },
  {
    id: 4,
    name: "Noah Patel",
    location: "London",
    role: "Frontend Architect",
    img: assetSrc(team06),
  },
  {
    id: 5,
    name: "Elena Rossi",
    location: "Milan",
    role: "Growth Marketing",
    img: assetSrc(team05),
  },
  {
    id: 6,
    name: "James Okonkwo",
    location: "Lagos",
    role: "Platform Engineer",
    img: assetSrc(team04),
  },
]

export default function Team({
  title = "Around the world",
  eyebrow = "Locations",
  members = DEFAULT_MEMBERS,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  eyebrow?: string
  members?: {
    id: number
    name: string
    location: string
    role: string
    img: string
  }[]
}) {
  return (
    <section
      className={cn("w-full px-4 md:px-6", className)}
      aria-labelledby="team-heading"
      {...props}
    >
      <div className="mx-auto max-sm:max-w-sm sm:max-w-2xl lg:max-w-5xl">
        <div className="mb-12 text-start md:mb-14">
          <p className="mb-3 text-sm font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h2
            id="team-heading"
            className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            {title}
          </h2>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <li
              key={member.id}
              className="group relative grid grid-cols-3 items-center rounded-[12px] bg-muted/50 p-3 sm:p-4"
            >
              <div className="col-span-2 min-h-[190px] overflow-hidden rounded-[10px] bg-muted">
                <img
                  src={member.img}
                  className="size-full min-h-[190px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  alt={member.name}
                  loading="lazy"
                />
              </div>

              <div className="absolute end-3 z-10 min-w-[132px] max-w-[calc(100%-1.25rem)] rounded-[12px] border border-border/70 bg-card p-4 text-start shadow-soft transition-transform duration-300 group-hover:-translate-y-0.5 sm:end-4 sm:min-w-[140px]"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
                <h3 className="text-sm font-semibold tracking-tight text-foreground">
                  {member.name}
                </h3>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {member.location}
                </span>
                <p className="mt-3 text-xs font-medium text-primary">
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

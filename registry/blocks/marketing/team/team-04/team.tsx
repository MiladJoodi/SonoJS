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
    role: "Engineering",
    image: assetSrc(team01),
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Design",
    image: assetSrc(team02),
  },
  {
    id: 3,
    name: "Sofia Alvarez",
    role: "Brand",
    image: assetSrc(team03),
  },
  {
    id: 4,
    name: "Noah Patel",
    role: "Frontend",
    image: assetSrc(team04),
  },
  {
    id: 5,
    name: "Elena Rossi",
    role: "Marketing",
    image: assetSrc(team05),
  },
  {
    id: 6,
    name: "James Okonkwo",
    role: "Platform",
    image: assetSrc(team06),
  },
  {
    id: 7,
    name: "Lina Berg",
    role: "Research",
    image: assetSrc(team01),
  },
  {
    id: 8,
    name: "Omar Farid",
    role: "Data",
    image: assetSrc(team02),
  },
]

export default function Team({
  title = "A gallery of makers",
  eyebrow = "Directory",
  description = "Compact portrait tiles for denser team pages—still airy, still premium.",
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
      className={cn("w-full bg-canvas px-4 py-12 md:px-8 md:py-16", className)}
      style={{ backgroundColor: "var(--canvas, #f3f3f4)" }}
      aria-labelledby="team-heading"
      {...props}
    >
      <div className="mx-auto max-w-xl md:max-w-3xl lg:max-w-6xl">
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

        <ul className="mx-auto grid max-w-xs gap-5 sm:max-w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {members.map((member) => (
            <li
              key={member.id}
              className="group overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]"

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
              <div className="aspect-square w-full overflow-hidden bg-muted">
                <img
                  src={member.image}
                  className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  alt={member.name}
                  loading="lazy"
                />
              </div>
              <div className="space-y-1 p-4 text-start">
                <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

import type * as React from "react"

import { cn } from "@/lib/utils"

import team01 from "./images/team-01.webp"
import team03 from "./images/team-03.webp"
import team04 from "./images/team-04.webp"
import team05 from "./images/team-05.webp"

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

const DEFAULT_MEMBERS = [
  {
    id: 1,
    name: "Amelia Hart",
    role: "Head of Engineering",
    bio: "Leads platform architecture and ships resilient systems used by millions every day.",
    image: assetSrc(team01),
    linkedin: "#",
    x: "#",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Product Design Lead",
    bio: "Shapes product vision through craft, clarity, and obsessive attention to detail.",
    image: assetSrc(team03),
    linkedin: "#",
    x: "#",
  },
  {
    id: 3,
    name: "Sofia Alvarez",
    role: "Brand Designer",
    bio: "Builds visual systems that feel timeless—typography, motion, and narrative as one.",
    image: assetSrc(team04),
    linkedin: "#",
    x: "#",
  },
  {
    id: 4,
    name: "Noah Patel",
    role: "Frontend Architect",
    bio: "Turns complex interfaces into fast, accessible experiences across every screen.",
    image: assetSrc(team05),
    linkedin: "#",
    x: "#",
  },
]

export default function Team({
  title = "Editorial profiles",
  eyebrow = "Featured",
  description = "Horizontal split cards with room for a short bio—magazine energy, product polish.",
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
    bio: string
    image: string
    linkedin: string
    x: string
  }[]
}) {
  return (
    <section
      className={cn("w-full px-4 md:px-6", className)}
      aria-labelledby="team-heading"
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-6xl">
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

        <ul className="mx-auto grid max-w-sm gap-5 sm:max-w-full lg:grid-cols-2 lg:gap-6">
          {members.map((member) => (
            <li
              key={member.id}
              className="group flex flex-col items-stretch overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] sm:flex-row"

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
              <div className="w-full shrink-0 overflow-hidden bg-muted sm:min-h-60 sm:w-52 sm:self-stretch lg:w-56">
                <img
                  src={member.image}
                  className="size-full min-h-48 object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] sm:min-h-60"
                  alt={member.name}
                  loading="lazy"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col p-5 text-start sm:p-6">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  {member.role}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  <li>
                    <a
                      href={member.linkedin}
                      className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href={member.x}
                      className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                      aria-label="X"
                    >
                      <XIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

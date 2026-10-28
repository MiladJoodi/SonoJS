"use client"

import type * as React from "react"
import {
  ActivityIcon,
  HeartHandshakeIcon,
  ShoppingBagIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const metrics: {
  value: string
  label: string
  icon: LucideIcon
}[] = [
  {
    value: "400+",
    label: "Unique visitors",
    icon: UsersIcon,
  },
  {
    value: "450+",
    label: "Total sales",
    icon: ShoppingBagIcon,
  },
  {
    value: "500+",
    label: "Customer satisfaction",
    icon: HeartHandshakeIcon,
  },
  {
    value: "600+",
    label: "System uptime hours",
    icon: ActivityIcon,
  },
]

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full bg-canvas px-4 py-12 text-foreground sm:px-6 md:px-8 md:py-16",
        className
      )}
      aria-label="Key metrics"
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[12px] bg-card shadow-soft">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((item, index) => {
            const Icon = item.icon
            return (
              <li
                key={item.label}
                className={cn(
                  "flex flex-col items-start gap-4 px-6 py-8 text-start sm:px-7 sm:py-10",
                  index > 0 && "border-t border-border/70 sm:border-t-0",
                  index % 2 === 1 && "sm:border-s",
                  index >= 2 && "lg:border-t-0",
                  index > 0 && "lg:border-s"
                )}
              >
                <span className="inline-flex size-10 items-center justify-center rounded-[10px] bg-muted text-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <dl className="min-w-0">
                  <dd
                    className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl"
                    dir="ltr"
                  >
                    {item.value}
                  </dd>
                  <dt className="mt-2 text-sm font-medium text-muted-foreground">
                    {item.label}
                  </dt>
                </dl>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

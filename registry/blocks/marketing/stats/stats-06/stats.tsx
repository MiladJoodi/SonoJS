"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

import avatar1 from "./images/avatar-1.webp"
import avatar2 from "./images/avatar-2.webp"
import avatar3 from "./images/avatar-3.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const metrics = [
  {
    value: "120",
    label: "Partners Joined",
    avatar: avatar3,
  },
  {
    value: "300+",
    label: "Projects Done",
    avatar: avatar2,
  },
  {
    value: "10+",
    label: "Years of Experience",
    avatar: avatar1,
  },
]

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="stats-heading"
      {...props}
    >
      <style>{`
        .stats-06-band {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          background-color: #0b1220;
        }
        .stats-06-band .stats-06-orb-blue {
          position: absolute;
          top: 0;
          inset-inline-end: 0;
          margin-top: -18rem;
          width: 37rem;
          height: 37rem;
          border-radius: 9999px;
          background-image: linear-gradient(to top, #3b82f6, #0c1a4a);
          filter: blur(64px);
          pointer-events: none;
        }
        .stats-06-band .stats-06-orb-purple {
          position: absolute;
          top: 0;
          inset-inline-end: 0;
          margin-inline-end: 28rem;
          width: 37rem;
          height: 37rem;
          border-radius: 9999px;
          background-image: linear-gradient(to top, #9333ea, #0c1a4a);
          filter: blur(64px);
          pointer-events: none;
        }
        .stats-06-band .stats-06-item {
          border-color: rgba(255, 255, 255, 0.15);
        }
      `}</style>

      <div className="stats-06-band w-full px-4 py-12 sm:px-6 md:px-8 md:py-16">
        <div className="stats-06-orb-blue" aria-hidden="true" />
        <div className="stats-06-orb-purple" aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
            <h2
              id="stats-heading"
              className="mb-3 text-2xl font-semibold tracking-tight text-white md:text-4xl"
            >
              Achievements So far
            </h2>
            <p className="mx-auto max-w-md text-sm text-slate-400 md:text-base">
              Nunc et tellus non erat accumsan aliquam eget non mi. Integer
              fringilla pellentesque finibus..
            </p>
          </div>

          <ul className="mx-auto grid max-w-sm grid-cols-1 lg:max-w-none lg:grid-cols-3">
            {metrics.map((item, index) => {
              const isLast = index === metrics.length - 1
              return (
                <li
                  key={item.label}
                  className={cn(
                    "stats-06-item px-4",
                    !isLast &&
                      "mb-8 border-b pb-8 lg:mb-0 lg:border-b-0 lg:border-e lg:pb-0"
                  )}
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={assetSrc(item.avatar)}
                      alt=""
                      aria-hidden
                      className="size-14 shrink-0 object-contain md:size-16"
                      loading="lazy"
                    />
                    <div className="ms-4 text-start md:ms-5">
                      <span
                        className="block text-3xl font-semibold tabular-nums text-slate-100 md:text-5xl"
                        dir="ltr"
                      >
                        {item.value}
                      </span>
                      <span className="text-sm font-medium text-slate-400">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

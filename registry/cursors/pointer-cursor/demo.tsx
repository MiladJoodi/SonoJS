"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"

import { Pointer } from "./pointer-cursor"

function Tile({
  title,
  hint,
  children,
}: {
  title: string
  hint: string
  children?: ReactNode
}) {
  return (
    <div className="relative rounded-lg border border-border/70 bg-card p-3 shadow-soft">
      <div className="flex h-28 flex-col items-center justify-center gap-0.5 text-center sm:h-32">
        <h3 className="text-sm font-semibold sm:text-base">{title}</h3>
        <p className="text-xs text-muted-foreground sm:text-sm">{hint}</p>
      </div>
      {children ?? <Pointer />}
    </div>
  )
}

export default function PointerCursorDemo() {
  return (
    <div className="w-full bg-white p-3 dark:bg-zinc-950 sm:p-4">
      <div className="mx-auto grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
        <Tile title="Animated" hint="children + motion">
          <Pointer>
            <motion.div
              animate={{
                scale: [0.8, 1, 0.8],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-pink-600"
              >
                <motion.path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="currentColor"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </motion.div>
          </Pointer>
        </Tile>

        <Tile title="Colored" hint="className on default arrow">
          <Pointer className="fill-blue-500" />
        </Tile>

        <Tile title="Custom shape" hint="children = SVG">
          <Pointer>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" className="fill-purple-500" />
              <circle cx="12" cy="12" r="5" className="fill-white" />
            </svg>
          </Pointer>
        </Tile>

        <Tile title="Emoji" hint="children = emoji">
          <Pointer>
            <div className="text-2xl">👆</div>
          </Pointer>
        </Tile>
      </div>
    </div>
  )
}

"use client"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { cn } from "@/lib/utils"
import { Magnetic } from "./magnetic-cursor"

const CARDS = [
  { label: "Pull", hint: "Near me" },
  { label: "Tilt", hint: "3D lean" },
  { label: "Glow", hint: "Hover" },
] as const

export default function MagneticCursorDemo() {
  return (
    <div
      className={`${CURSOR_STAGE_LIGHT} flex cursor-default flex-col items-center justify-center gap-8`}
      style={{ perspective: 900 }}
    >
      <div className="flex flex-wrap items-center justify-center gap-6 px-6">
        {CARDS.map((card) => (
          <Magnetic key={card.label} magneticDistance={160} strength={0.5} tilt={12}>
            {(hovering) => (
              <div
                className={cn(
                  "flex size-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-[12px] border text-sm font-semibold outline-none transition-colors duration-300",
                  hovering
                    ? "scale-[1.03] border-primary bg-primary text-primary-foreground shadow-[0_0_40px_color-mix(in_oklab,var(--primary)_40%,transparent)]"
                    : "border-border/70 bg-card text-foreground shadow-soft"
                )}
              >
                <span>{card.label}</span>
                <span
                  className={cn(
                    "text-[10px] font-medium uppercase tracking-wider",
                    hovering
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {card.hint}
                </span>
              </div>
            )}
          </Magnetic>
        ))}
      </div>
      <p className="pointer-events-none text-sm text-muted-foreground">
        Move near the cards
      </p>
    </div>
  )
}

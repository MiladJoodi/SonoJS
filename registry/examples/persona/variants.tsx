"use client"

import * as React from "react"

import type { PersonaVariant } from "@sonojs/ui/components/persona"
import { Persona } from "@sonojs/ui/components/persona"

const variants: PersonaVariant[] = [
  "obsidian",
  "command",
  "glint",
  "halo",
  "mana",
  "opal",
]

export function PersonaVariants() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6 p-8">
      {variants.map((variant) => (
        <div
          key={variant}
          className="flex flex-col items-center gap-2"
        >
          <Persona className="size-20" state="idle" variant={variant} />
          <span className="text-caption capitalize text-muted-foreground">
            {variant}
          </span>
        </div>
      ))}
    </div>
  )
}
